function $a(o, e) {
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
const Rt = "TradeX-Chart", zt = "TX", Ba = "tradeXutils", Nn = "tradeXmenus", Ua = "tradeXmenu", Dn = "tradeXdividers", In = "tradeXwindows", za = "tradeXwindow", Rn = "tradeXprogress", Va = 500, Wa = "stream_None", vi = "stream_Listening", kn = "stream_Started", Fa = "stream_Stopped", Ga = "stream_Error", Ds = "stream_candleFirst", Ke = "stream_candleUpdate", Is = "stream_candleNew", qa = 250, Ya = 8, Xa = 2, ja = 2, us = 18, Gt = 100, Ht = /^(\d*\.?\d+)\s?(px|em|ex|%|in|cn|mm|pt|pc+)$/igm;
function P(o) {
  return Array.isArray(o);
}
function N(o) {
  return o && typeof o == "function";
}
function w(o) {
  return typeof o == "object" && !Array.isArray(o) && o !== null;
}
function x(o) {
  return typeof o == "number" && !isNaN(o);
}
function F(o) {
  return typeof o == "boolean";
}
function C(o) {
  return typeof o == "string";
}
function sp(o) {
  return !!o && (w(o) || N(o)) && N(o.then);
}
function _n(o) {
  return !(o && o.constructor === Function) || o.prototype === void 0 ? !1 : Function.prototype !== Object.getPrototypeOf(o) ? !0 : Object.getOwnPropertyNames(o.prototype).length > 1;
}
const Lr = ["id", "class", "style", "alt", "width", "height", "title"], Ar = [...Lr, "name", "type", "value", "default", "placeholder", "max", "min", "maxlenght", "src", "checked", "disabled", "pattern", "readonly", "required", "size", "step", "multiple", "autofocus", "list", "autocomplete"], Or = ["button", "color", "date", "datetime-local", "email", "file", "hidden", "image", "month", "number", "password", "radio", "range", "reset", "search", "submit", "tel", "text", "time", "url", "week"];
function Ka(o, e = document) {
  return e.getElementById(o);
}
function Za(o, e = document) {
  return e.getElementsByClassName(o);
}
function Qa(o, e = document) {
  return e.getElementsByName(o);
}
function Ja(o, e = document) {
  return e.getElementsByTagName(o);
}
function Nr(o, e = document) {
  return e.querySelector(o);
}
function Dr(o, e = document) {
  return e.querySelectorAll(o);
}
function el(o) {
  return typeof Node == "object" ? o instanceof Node : o && typeof o == "object" && typeof o.nodeType == "number" && typeof o.nodeName == "string";
}
function Y(o) {
  return typeof HTMLElement == "object" ? o instanceof HTMLElement : o && typeof o == "object" && o !== null && o.nodeType === 1 && typeof o.nodeName == "string";
}
function lt(o) {
  return Y(o) ? !!o && !!(o.offsetWidth || o.offsetHeight || o.getClientRects().length) : !1;
}
function Rs(o) {
  if (!Y(o))
    return !1;
  const e = o.getBoundingClientRect();
  return e.top >= 0 && e.left >= 0 && e.bottom <= (window.innerHeight || document.documentElement.clientHeight) && e.right <= (window.innerWidth || document.documentElement.clientWidth);
}
function tl(o) {
  if (!Y(o))
    return !1;
  const e = getComputedStyle(o);
  if (e.display === "none" || e.visibility !== "visible" || parseFloat(e.opacity) < 0.1 || o.offsetWidth + o.offsetHeight + o.getBoundingClientRect().height + o.getBoundingClientRect().width === 0)
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
}
function ks(o, e) {
  if (_s(o)) {
    var i = window.URL || window.webkitURL || window;
    o = new Blob([o], { type: "image/svg+xml" }), o = i.createObjectURL(o);
  }
  const s = new Image();
  if (s.src = o, N(e))
    s.complete ? e(s) : (s.onload = () => e(s), s.onerror = () => e(!1));
  else
    return new Promise(function(n, r) {
      s.complete ? n(s) : (s.onload = () => n(s), s.onerror = () => r(!1));
    });
}
function _s(o) {
  return C(o) ? /<\s*svg[^>]*>(.*?)<\s*\/\s*svg>/.test(o) : !1;
}
function il(o) {
  return new Promise((e) => {
    if (document.querySelector(o))
      return e(document.querySelector(o));
    const i = new MutationObserver((s) => {
      document.querySelector(o) && (i.disconnect(), e(document.querySelector(o)));
    });
    i.observe(document.body, {
      childList: !0,
      subtree: !0
    });
  });
}
function se(o) {
  if (!Y(o))
    return !1;
  let e = 0, i = 0, s = o;
  for (; s && s.tagName.toLowerCase() != "body" && !isNaN(s.offsetLeft) && !isNaN(s.offsetTop); )
    e += s.offsetLeft - s.scrollLeft, i += s.offsetTop - s.scrollTop, s = s.offsetParent;
  const n = o.getBoundingClientRect();
  let r = n.right - n.left, a = n.bottom - n.top, l = lt(o), h = Rs(o);
  return {
    top: i,
    bottom: i + a,
    left: e,
    right: e + r,
    width: r,
    height: a,
    visible: l,
    viewport: h
  };
}
function sl(o, e) {
  if (!Y(o) || !Y(o))
    return !1;
  const i = se(o), s = se(e);
  return {
    x: i.top - s.top,
    y: i.left - s.left,
    el1Location: i,
    el2Location: s
  };
}
function Ir(o) {
  if (!C(o))
    return !1;
  const e = document.createElement("template");
  return o = o.trim(), e.innerHTML = o, e.content.firstChild;
}
function nl(o) {
  if (!C(o))
    return !1;
  const e = document.createElement("template");
  return e.innerHTML = o, e.content.childNodes;
}
function ft(o, e, i) {
  if (!_s(o) || !x(i?.w) || !x(i?.h))
    return !1;
  let s = i.w, n = i.h, r = document.createElement("canvas");
  r.width = s, r.height = n;
  let a = Ir(o);
  a.style.fill = e, a.setAttribute("width", s), a.setAttribute("height", n), a.xmlns = "http://www.w3.org/2000/svg";
  let l = new XMLSerializer().serializeToString(a), f = "data:image/svg+xml;base64," + btoa(l), v = new Image();
  return v.setAttribute("width", s), v.setAttribute("height", n), v.onload = () => {
    r.getContext("2d").drawImage(v, 0, 0, s, n);
  }, v.src = f, v;
}
function rl(o) {
  if (!Y(o))
    return !1;
  const e = (s) => {
    !o.contains(s.target) && lt(o) && (o.style.display = "none", i());
  }, i = () => {
    document.removeEventListener("click", e);
  };
  document.addEventListener("click", e);
}
function ol(o, e) {
  if (!Y(o))
    return !1;
  const i = (n) => {
    !o.contains(n.target) && lt(o) && (e(), s());
  }, s = () => {
    document.removeEventListener("click", i);
  };
  document.addEventListener("click", i);
}
function Rr(o, e) {
  let i, s;
  if (C(o))
    i = document.getElementById(o);
  else if (Y(o))
    i = o;
  else
    return !1;
  const n = (i.ownerDocument || document).defaultView;
  return C(e) ? (n && n.getComputedStyle ? (e = e.replace(/([A-Z])/g, "-$1").toLowerCase(), s = document.defaultView.getComputedStyle(i, null).getPropertyValue(e)) : i.currentStyle && (s = i.currentStyle[e]), s) : !1;
}
function al(o, e, i, s) {
  let n = Hs(o, e, i, s);
  if (n)
    n.i >= 0 ? n.rules[n.i].style[n.property] = n.value : _r(n.styleSheet, n.selector, n.rules, n.index);
  else
    return;
}
function ll(o, e, i) {
  let s = Hs(o, e, i, "");
  (s.styleSheet.deleteRule || s.styleSheet.removeRule)(s.i);
}
function Hs(o, e, i, s) {
  if (!o || !w(o))
    return null;
  if (o.constructor.name == "HTMLStyleElement")
    o = o.sheet;
  else if (o.constructor.name != "CSSStyleSheet")
    return null;
  let n = kr(e, i, s);
  e = n[0], i = n[1], s = n[2];
  const r = o.cssRules || o.rules;
  for (var a = r.length - 1; a > 0 && r[a].selectorText !== e; --a)
    ;
  return { styleSheet: o, rules: r, selector: e, property: i, value: s, i: a };
}
function kr(o, e, i) {
  return [
    o = o.toLowerCase().replace(/\s+/g, " "),
    e = e.toLowerCase(),
    i = i.toLowerCase()
  ];
}
function _r(o, e, i, s) {
  o.insertRule ? o.insertRule(e + "{" + i + "}", s) : o.addRule(e, i, s);
}
function $s(o, e) {
  return !Y(o) || !C(e) ? null : o.classList.contains(e) ? o : $s(o.parentElement, e);
}
function Hr(o, e) {
  let i = C(e?.entry) ? e?.entry : "", s = C(e?.label) ? e?.label : i || "", n = `<label for="${i}">${s}</label><input id="${i}" class="subject" `;
  for (let r in e)
    (Ar.includes(r) || /^(data-[^\t\n\f \/>"'=]+)/g.test(r)) && (n += `${r}="${e[r]}" `);
  return n += `>
`;
}
const np = {
  addCSSRule: _r,
  addStyleRule: al,
  deleteStyleRule: ll,
  elementDimPos: se,
  elementsDistance: sl,
  findByClass: Za,
  findByID: Ka,
  findByName: Qa,
  findBySelector: Nr,
  findBySelectorAll: Dr,
  findStyleRule: Hs,
  findTargetParentWithClass: $s,
  fndByTag: Ja,
  getStyle: Rr,
  hideOnClickOutside: rl,
  htmlAttr: Lr,
  htmlInput: Hr,
  htmlToElement: Ir,
  htmlToElements: nl,
  inputAttr: Ar,
  inputTypes: Or,
  isElement: Y,
  isImage: ks,
  isInViewport: Rs,
  isNode: el,
  isSVG: _s,
  isVisible: lt,
  isVisibleToUser: tl,
  onClickOutside: ol,
  styleRuleSanitize: kr,
  svgToImage: ft,
  waitForElm: il
}, hl = typeof window < "u" && typeof window.document < "u";
typeof process < "u" && process.versions != null && process.versions.node != null;
typeof window < "u" && window.name === "nodejs" || navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom");
const cl = ((o) => "onorientationchange" in o || o.matchMedia("(any-pointer:coarse)").matches || !!navigator.maxTouchPoints || !!navigator.msMaxTouchPoints || "ontouchstart" in o || o.DocumentTouch && document instanceof o.DocumentTouch)(typeof window < "u" ? window : {}), ul = {
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
    x(e) && (this.#e = e);
  }
  get x() {
    return this.#e;
  }
  set y(e) {
    x(e) && (this.#t = e);
  }
  get y() {
    return this.#t;
  }
  clone() {
    return new st(this.x, this.y);
  }
}
function dl(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
}
var $r = { exports: {} };
/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
(function(o) {
  (function(e, i, s, n) {
    var r = ["", "webkit", "Moz", "MS", "ms", "o"], a = i.createElement("div"), l = "function", h = Math.round, m = Math.abs, f = Date.now;
    function v(c, u, p) {
      return setTimeout(D(c, p), u);
    }
    function T(c, u, p) {
      return Array.isArray(c) ? (E(c, p[u], p), !0) : !1;
    }
    function E(c, u, p) {
      var g;
      if (c)
        if (c.forEach)
          c.forEach(u, p);
        else if (c.length !== n)
          for (g = 0; g < c.length; )
            u.call(p, c[g], g, c), g++;
        else
          for (g in c)
            c.hasOwnProperty(g) && u.call(p, c[g], g, c);
    }
    function M(c, u, p) {
      var g = "DEPRECATED METHOD: " + u + `
` + p + ` AT 
`;
      return function() {
        var b = new Error("get-stack-trace"), S = b && b.stack ? b.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace", A = e.console && (e.console.warn || e.console.log);
        return A && A.call(e.console, g, S), c.apply(this, arguments);
      };
    }
    var I;
    typeof Object.assign != "function" ? I = function(u) {
      if (u === n || u === null)
        throw new TypeError("Cannot convert undefined or null to object");
      for (var p = Object(u), g = 1; g < arguments.length; g++) {
        var b = arguments[g];
        if (b !== n && b !== null)
          for (var S in b)
            b.hasOwnProperty(S) && (p[S] = b[S]);
      }
      return p;
    } : I = Object.assign;
    var re = M(function(u, p, g) {
      for (var b = Object.keys(p), S = 0; S < b.length; )
        (!g || g && u[b[S]] === n) && (u[b[S]] = p[b[S]]), S++;
      return u;
    }, "extend", "Use `assign`."), me = M(function(u, p) {
      return re(u, p, !0);
    }, "merge", "Use `assign`.");
    function _(c, u, p) {
      var g = u.prototype, b;
      b = c.prototype = Object.create(g), b.constructor = c, b._super = g, p && I(b, p);
    }
    function D(c, u) {
      return function() {
        return c.apply(u, arguments);
      };
    }
    function L(c, u) {
      return typeof c == l ? c.apply(u && u[0] || n, u) : c;
    }
    function oe(c, u) {
      return c === n ? u : c;
    }
    function X(c, u, p) {
      E(ut(u), function(g) {
        c.addEventListener(g, p, !1);
      });
    }
    function ae(c, u, p) {
      E(ut(u), function(g) {
        c.removeEventListener(g, p, !1);
      });
    }
    function pe(c, u) {
      for (; c; ) {
        if (c == u)
          return !0;
        c = c.parentNode;
      }
      return !1;
    }
    function fe(c, u) {
      return c.indexOf(u) > -1;
    }
    function ut(c) {
      return c.trim().split(/\s+/g);
    }
    function Ge(c, u, p) {
      if (c.indexOf && !p)
        return c.indexOf(u);
      for (var g = 0; g < c.length; ) {
        if (p && c[g][p] == u || !p && c[g] === u)
          return g;
        g++;
      }
      return -1;
    }
    function ei(c) {
      return Array.prototype.slice.call(c, 0);
    }
    function hn(c, u, p) {
      for (var g = [], b = [], S = 0; S < c.length; ) {
        var A = u ? c[S][u] : c[S];
        Ge(b, A) < 0 && g.push(c[S]), b[S] = A, S++;
      }
      return p && (u ? g = g.sort(function(j, te) {
        return j[u] > te[u];
      }) : g = g.sort()), g;
    }
    function ti(c, u) {
      for (var p, g, b = u[0].toUpperCase() + u.slice(1), S = 0; S < r.length; ) {
        if (p = r[S], g = p ? p + b : u, g in c)
          return g;
        S++;
      }
      return n;
    }
    var sa = 1;
    function na() {
      return sa++;
    }
    function cn(c) {
      var u = c.ownerDocument || c;
      return u.defaultView || u.parentWindow || e;
    }
    var ra = /mobile|tablet|ip(ad|hone|od)|android/i, un = "ontouchstart" in e, oa = ti(e, "PointerEvent") !== n, aa = un && ra.test(navigator.userAgent), Pt = "touch", la = "pen", Wi = "mouse", ha = "kinect", ca = 25, ee = 1, Ze = 2, z = 4, le = 8, ii = 1, Mt = 2, Lt = 4, At = 8, Ot = 16, Ie = Mt | Lt, Qe = At | Ot, dn = Ie | Qe, mn = ["x", "y"], si = ["clientX", "clientY"];
    function ge(c, u) {
      var p = this;
      this.manager = c, this.callback = u, this.element = c.element, this.target = c.options.inputTarget, this.domHandler = function(g) {
        L(c.options.enable, [c]) && p.handler(g);
      }, this.init();
    }
    ge.prototype = {
      handler: function() {
      },
      init: function() {
        this.evEl && X(this.element, this.evEl, this.domHandler), this.evTarget && X(this.target, this.evTarget, this.domHandler), this.evWin && X(cn(this.element), this.evWin, this.domHandler);
      },
      destroy: function() {
        this.evEl && ae(this.element, this.evEl, this.domHandler), this.evTarget && ae(this.target, this.evTarget, this.domHandler), this.evWin && ae(cn(this.element), this.evWin, this.domHandler);
      }
    };
    function ua(c) {
      var u, p = c.options.inputClass;
      return p ? u = p : oa ? u = Gi : aa ? u = oi : un ? u = qi : u = ri, new u(c, da);
    }
    function da(c, u, p) {
      var g = p.pointers.length, b = p.changedPointers.length, S = u & ee && g - b === 0, A = u & (z | le) && g - b === 0;
      p.isFirst = !!S, p.isFinal = !!A, S && (c.session = {}), p.eventType = u, ma(c, p), c.emit("hammer.input", p), c.recognize(p), c.session.prevInput = p;
    }
    function ma(c, u) {
      var p = c.session, g = u.pointers, b = g.length;
      p.firstInput || (p.firstInput = pn(u)), b > 1 && !p.firstMultiple ? p.firstMultiple = pn(u) : b === 1 && (p.firstMultiple = !1);
      var S = p.firstInput, A = p.firstMultiple, q = A ? A.center : S.center, j = u.center = fn(g);
      u.timeStamp = f(), u.deltaTime = u.timeStamp - S.timeStamp, u.angle = Fi(q, j), u.distance = ni(q, j), pa(p, u), u.offsetDirection = yn(u.deltaX, u.deltaY);
      var te = gn(u.deltaTime, u.deltaX, u.deltaY);
      u.overallVelocityX = te.x, u.overallVelocityY = te.y, u.overallVelocity = m(te.x) > m(te.y) ? te.x : te.y, u.scale = A ? ya(A.pointers, g) : 1, u.rotation = A ? ga(A.pointers, g) : 0, u.maxPointers = p.prevInput ? u.pointers.length > p.prevInput.maxPointers ? u.pointers.length : p.prevInput.maxPointers : u.pointers.length, fa(p, u);
      var ke = c.element;
      pe(u.srcEvent.target, ke) && (ke = u.srcEvent.target), u.target = ke;
    }
    function pa(c, u) {
      var p = u.center, g = c.offsetDelta || {}, b = c.prevDelta || {}, S = c.prevInput || {};
      (u.eventType === ee || S.eventType === z) && (b = c.prevDelta = {
        x: S.deltaX || 0,
        y: S.deltaY || 0
      }, g = c.offsetDelta = {
        x: p.x,
        y: p.y
      }), u.deltaX = b.x + (p.x - g.x), u.deltaY = b.y + (p.y - g.y);
    }
    function fa(c, u) {
      var p = c.lastInterval || u, g = u.timeStamp - p.timeStamp, b, S, A, q;
      if (u.eventType != le && (g > ca || p.velocity === n)) {
        var j = u.deltaX - p.deltaX, te = u.deltaY - p.deltaY, ke = gn(g, j, te);
        S = ke.x, A = ke.y, b = m(ke.x) > m(ke.y) ? ke.x : ke.y, q = yn(j, te), c.lastInterval = u;
      } else
        b = p.velocity, S = p.velocityX, A = p.velocityY, q = p.direction;
      u.velocity = b, u.velocityX = S, u.velocityY = A, u.direction = q;
    }
    function pn(c) {
      for (var u = [], p = 0; p < c.pointers.length; )
        u[p] = {
          clientX: h(c.pointers[p].clientX),
          clientY: h(c.pointers[p].clientY)
        }, p++;
      return {
        timeStamp: f(),
        pointers: u,
        center: fn(u),
        deltaX: c.deltaX,
        deltaY: c.deltaY
      };
    }
    function fn(c) {
      var u = c.length;
      if (u === 1)
        return {
          x: h(c[0].clientX),
          y: h(c[0].clientY)
        };
      for (var p = 0, g = 0, b = 0; b < u; )
        p += c[b].clientX, g += c[b].clientY, b++;
      return {
        x: h(p / u),
        y: h(g / u)
      };
    }
    function gn(c, u, p) {
      return {
        x: u / c || 0,
        y: p / c || 0
      };
    }
    function yn(c, u) {
      return c === u ? ii : m(c) >= m(u) ? c < 0 ? Mt : Lt : u < 0 ? At : Ot;
    }
    function ni(c, u, p) {
      p || (p = mn);
      var g = u[p[0]] - c[p[0]], b = u[p[1]] - c[p[1]];
      return Math.sqrt(g * g + b * b);
    }
    function Fi(c, u, p) {
      p || (p = mn);
      var g = u[p[0]] - c[p[0]], b = u[p[1]] - c[p[1]];
      return Math.atan2(b, g) * 180 / Math.PI;
    }
    function ga(c, u) {
      return Fi(u[1], u[0], si) + Fi(c[1], c[0], si);
    }
    function ya(c, u) {
      return ni(u[0], u[1], si) / ni(c[0], c[1], si);
    }
    var va = {
      mousedown: ee,
      mousemove: Ze,
      mouseup: z
    }, wa = "mousedown", ba = "mousemove mouseup";
    function ri() {
      this.evEl = wa, this.evWin = ba, this.pressed = !1, ge.apply(this, arguments);
    }
    _(ri, ge, {
      handler: function(u) {
        var p = va[u.type];
        p & ee && u.button === 0 && (this.pressed = !0), p & Ze && u.which !== 1 && (p = z), this.pressed && (p & z && (this.pressed = !1), this.callback(this.manager, p, {
          pointers: [u],
          changedPointers: [u],
          pointerType: Wi,
          srcEvent: u
        }));
      }
    });
    var xa = {
      pointerdown: ee,
      pointermove: Ze,
      pointerup: z,
      pointercancel: le,
      pointerout: le
    }, Ca = {
      2: Pt,
      3: la,
      4: Wi,
      5: ha
    }, vn = "pointerdown", wn = "pointermove pointerup pointercancel";
    e.MSPointerEvent && !e.PointerEvent && (vn = "MSPointerDown", wn = "MSPointerMove MSPointerUp MSPointerCancel");
    function Gi() {
      this.evEl = vn, this.evWin = wn, ge.apply(this, arguments), this.store = this.manager.session.pointerEvents = [];
    }
    _(Gi, ge, {
      handler: function(u) {
        var p = this.store, g = !1, b = u.type.toLowerCase().replace("ms", ""), S = xa[b], A = Ca[u.pointerType] || u.pointerType, q = A == Pt, j = Ge(p, u.pointerId, "pointerId");
        S & ee && (u.button === 0 || q) ? j < 0 && (p.push(u), j = p.length - 1) : S & (z | le) && (g = !0), !(j < 0) && (p[j] = u, this.callback(this.manager, S, {
          pointers: p,
          changedPointers: [u],
          pointerType: A,
          srcEvent: u
        }), g && p.splice(j, 1));
      }
    });
    var Ta = {
      touchstart: ee,
      touchmove: Ze,
      touchend: z,
      touchcancel: le
    }, Sa = "touchstart", Ea = "touchstart touchmove touchend touchcancel";
    function bn() {
      this.evTarget = Sa, this.evWin = Ea, this.started = !1, ge.apply(this, arguments);
    }
    _(bn, ge, {
      handler: function(u) {
        var p = Ta[u.type];
        if (p === ee && (this.started = !0), !!this.started) {
          var g = Pa.call(this, u, p);
          p & (z | le) && g[0].length - g[1].length === 0 && (this.started = !1), this.callback(this.manager, p, {
            pointers: g[0],
            changedPointers: g[1],
            pointerType: Pt,
            srcEvent: u
          });
        }
      }
    });
    function Pa(c, u) {
      var p = ei(c.touches), g = ei(c.changedTouches);
      return u & (z | le) && (p = hn(p.concat(g), "identifier", !0)), [p, g];
    }
    var Ma = {
      touchstart: ee,
      touchmove: Ze,
      touchend: z,
      touchcancel: le
    }, La = "touchstart touchmove touchend touchcancel";
    function oi() {
      this.evTarget = La, this.targetIds = {}, ge.apply(this, arguments);
    }
    _(oi, ge, {
      handler: function(u) {
        var p = Ma[u.type], g = Aa.call(this, u, p);
        g && this.callback(this.manager, p, {
          pointers: g[0],
          changedPointers: g[1],
          pointerType: Pt,
          srcEvent: u
        });
      }
    });
    function Aa(c, u) {
      var p = ei(c.touches), g = this.targetIds;
      if (u & (ee | Ze) && p.length === 1)
        return g[p[0].identifier] = !0, [p, p];
      var b, S, A = ei(c.changedTouches), q = [], j = this.target;
      if (S = p.filter(function(te) {
        return pe(te.target, j);
      }), u === ee)
        for (b = 0; b < S.length; )
          g[S[b].identifier] = !0, b++;
      for (b = 0; b < A.length; )
        g[A[b].identifier] && q.push(A[b]), u & (z | le) && delete g[A[b].identifier], b++;
      if (q.length)
        return [
          hn(S.concat(q), "identifier", !0),
          q
        ];
    }
    var Oa = 2500, xn = 25;
    function qi() {
      ge.apply(this, arguments);
      var c = D(this.handler, this);
      this.touch = new oi(this.manager, c), this.mouse = new ri(this.manager, c), this.primaryTouch = null, this.lastTouches = [];
    }
    _(qi, ge, {
      handler: function(u, p, g) {
        var b = g.pointerType == Pt, S = g.pointerType == Wi;
        if (!(S && g.sourceCapabilities && g.sourceCapabilities.firesTouchEvents)) {
          if (b)
            Na.call(this, p, g);
          else if (S && Da.call(this, g))
            return;
          this.callback(u, p, g);
        }
      },
      destroy: function() {
        this.touch.destroy(), this.mouse.destroy();
      }
    });
    function Na(c, u) {
      c & ee ? (this.primaryTouch = u.changedPointers[0].identifier, Cn.call(this, u)) : c & (z | le) && Cn.call(this, u);
    }
    function Cn(c) {
      var u = c.changedPointers[0];
      if (u.identifier === this.primaryTouch) {
        var p = { x: u.clientX, y: u.clientY };
        this.lastTouches.push(p);
        var g = this.lastTouches, b = function() {
          var S = g.indexOf(p);
          S > -1 && g.splice(S, 1);
        };
        setTimeout(b, Oa);
      }
    }
    function Da(c) {
      for (var u = c.srcEvent.clientX, p = c.srcEvent.clientY, g = 0; g < this.lastTouches.length; g++) {
        var b = this.lastTouches[g], S = Math.abs(u - b.x), A = Math.abs(p - b.y);
        if (S <= xn && A <= xn)
          return !0;
      }
      return !1;
    }
    var Tn = ti(a.style, "touchAction"), Sn = Tn !== n, En = "compute", Pn = "auto", Yi = "manipulation", Je = "none", Nt = "pan-x", Dt = "pan-y", ai = Ra();
    function Xi(c, u) {
      this.manager = c, this.set(u);
    }
    Xi.prototype = {
      set: function(c) {
        c == En && (c = this.compute()), Sn && this.manager.element.style && ai[c] && (this.manager.element.style[Tn] = c), this.actions = c.toLowerCase().trim();
      },
      update: function() {
        this.set(this.manager.options.touchAction);
      },
      compute: function() {
        var c = [];
        return E(this.manager.recognizers, function(u) {
          L(u.options.enable, [u]) && (c = c.concat(u.getTouchAction()));
        }), Ia(c.join(" "));
      },
      preventDefaults: function(c) {
        var u = c.srcEvent, p = c.offsetDirection;
        if (this.manager.session.prevented) {
          u.preventDefault();
          return;
        }
        var g = this.actions, b = fe(g, Je) && !ai[Je], S = fe(g, Dt) && !ai[Dt], A = fe(g, Nt) && !ai[Nt];
        if (b) {
          var q = c.pointers.length === 1, j = c.distance < 2, te = c.deltaTime < 250;
          if (q && j && te)
            return;
        }
        if (!(A && S) && (b || S && p & Ie || A && p & Qe))
          return this.preventSrc(u);
      },
      preventSrc: function(c) {
        this.manager.session.prevented = !0, c.preventDefault();
      }
    };
    function Ia(c) {
      if (fe(c, Je))
        return Je;
      var u = fe(c, Nt), p = fe(c, Dt);
      return u && p ? Je : u || p ? u ? Nt : Dt : fe(c, Yi) ? Yi : Pn;
    }
    function Ra() {
      if (!Sn)
        return !1;
      var c = {}, u = e.CSS && e.CSS.supports;
      return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function(p) {
        c[p] = u ? e.CSS.supports("touch-action", p) : !0;
      }), c;
    }
    var li = 1, ye = 2, dt = 4, qe = 8, $e = qe, It = 16, Re = 32;
    function Be(c) {
      this.options = I({}, this.defaults, c || {}), this.id = na(), this.manager = null, this.options.enable = oe(this.options.enable, !0), this.state = li, this.simultaneous = {}, this.requireFail = [];
    }
    Be.prototype = {
      defaults: {},
      set: function(c) {
        return I(this.options, c), this.manager && this.manager.touchAction.update(), this;
      },
      recognizeWith: function(c) {
        if (T(c, "recognizeWith", this))
          return this;
        var u = this.simultaneous;
        return c = hi(c, this), u[c.id] || (u[c.id] = c, c.recognizeWith(this)), this;
      },
      dropRecognizeWith: function(c) {
        return T(c, "dropRecognizeWith", this) ? this : (c = hi(c, this), delete this.simultaneous[c.id], this);
      },
      requireFailure: function(c) {
        if (T(c, "requireFailure", this))
          return this;
        var u = this.requireFail;
        return c = hi(c, this), Ge(u, c) === -1 && (u.push(c), c.requireFailure(this)), this;
      },
      dropRequireFailure: function(c) {
        if (T(c, "dropRequireFailure", this))
          return this;
        c = hi(c, this);
        var u = Ge(this.requireFail, c);
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
        function g(b) {
          u.manager.emit(b, c);
        }
        p < qe && g(u.options.event + Mn(p)), g(u.options.event), c.additionalEvent && g(c.additionalEvent), p >= qe && g(u.options.event + Mn(p));
      },
      tryEmit: function(c) {
        if (this.canEmit())
          return this.emit(c);
        this.state = Re;
      },
      canEmit: function() {
        for (var c = 0; c < this.requireFail.length; ) {
          if (!(this.requireFail[c].state & (Re | li)))
            return !1;
          c++;
        }
        return !0;
      },
      recognize: function(c) {
        var u = I({}, c);
        if (!L(this.options.enable, [this, u])) {
          this.reset(), this.state = Re;
          return;
        }
        this.state & ($e | It | Re) && (this.state = li), this.state = this.process(u), this.state & (ye | dt | qe | It) && this.tryEmit(u);
      },
      process: function(c) {
      },
      getTouchAction: function() {
      },
      reset: function() {
      }
    };
    function Mn(c) {
      return c & It ? "cancel" : c & qe ? "end" : c & dt ? "move" : c & ye ? "start" : "";
    }
    function Ln(c) {
      return c == Ot ? "down" : c == At ? "up" : c == Mt ? "left" : c == Lt ? "right" : "";
    }
    function hi(c, u) {
      var p = u.manager;
      return p ? p.get(c) : c;
    }
    function Ee() {
      Be.apply(this, arguments);
    }
    _(Ee, Be, {
      defaults: {
        pointers: 1
      },
      attrTest: function(c) {
        var u = this.options.pointers;
        return u === 0 || c.pointers.length === u;
      },
      process: function(c) {
        var u = this.state, p = c.eventType, g = u & (ye | dt), b = this.attrTest(c);
        return g && (p & le || !b) ? u | It : g || b ? p & z ? u | qe : u & ye ? u | dt : ye : Re;
      }
    });
    function ci() {
      Ee.apply(this, arguments), this.pX = null, this.pY = null;
    }
    _(ci, Ee, {
      defaults: {
        event: "pan",
        threshold: 10,
        pointers: 1,
        direction: dn
      },
      getTouchAction: function() {
        var c = this.options.direction, u = [];
        return c & Ie && u.push(Dt), c & Qe && u.push(Nt), u;
      },
      directionTest: function(c) {
        var u = this.options, p = !0, g = c.distance, b = c.direction, S = c.deltaX, A = c.deltaY;
        return b & u.direction || (u.direction & Ie ? (b = S === 0 ? ii : S < 0 ? Mt : Lt, p = S != this.pX, g = Math.abs(c.deltaX)) : (b = A === 0 ? ii : A < 0 ? At : Ot, p = A != this.pY, g = Math.abs(c.deltaY))), c.direction = b, p && g > u.threshold && b & u.direction;
      },
      attrTest: function(c) {
        return Ee.prototype.attrTest.call(this, c) && (this.state & ye || !(this.state & ye) && this.directionTest(c));
      },
      emit: function(c) {
        this.pX = c.deltaX, this.pY = c.deltaY;
        var u = Ln(c.direction);
        u && (c.additionalEvent = this.options.event + u), this._super.emit.call(this, c);
      }
    });
    function ji() {
      Ee.apply(this, arguments);
    }
    _(ji, Ee, {
      defaults: {
        event: "pinch",
        threshold: 0,
        pointers: 2
      },
      getTouchAction: function() {
        return [Je];
      },
      attrTest: function(c) {
        return this._super.attrTest.call(this, c) && (Math.abs(c.scale - 1) > this.options.threshold || this.state & ye);
      },
      emit: function(c) {
        if (c.scale !== 1) {
          var u = c.scale < 1 ? "in" : "out";
          c.additionalEvent = this.options.event + u;
        }
        this._super.emit.call(this, c);
      }
    });
    function Ki() {
      Be.apply(this, arguments), this._timer = null, this._input = null;
    }
    _(Ki, Be, {
      defaults: {
        event: "press",
        pointers: 1,
        time: 251,
        threshold: 9
      },
      getTouchAction: function() {
        return [Pn];
      },
      process: function(c) {
        var u = this.options, p = c.pointers.length === u.pointers, g = c.distance < u.threshold, b = c.deltaTime > u.time;
        if (this._input = c, !g || !p || c.eventType & (z | le) && !b)
          this.reset();
        else if (c.eventType & ee)
          this.reset(), this._timer = v(function() {
            this.state = $e, this.tryEmit();
          }, u.time, this);
        else if (c.eventType & z)
          return $e;
        return Re;
      },
      reset: function() {
        clearTimeout(this._timer);
      },
      emit: function(c) {
        this.state === $e && (c && c.eventType & z ? this.manager.emit(this.options.event + "up", c) : (this._input.timeStamp = f(), this.manager.emit(this.options.event, this._input)));
      }
    });
    function Zi() {
      Ee.apply(this, arguments);
    }
    _(Zi, Ee, {
      defaults: {
        event: "rotate",
        threshold: 0,
        pointers: 2
      },
      getTouchAction: function() {
        return [Je];
      },
      attrTest: function(c) {
        return this._super.attrTest.call(this, c) && (Math.abs(c.rotation) > this.options.threshold || this.state & ye);
      }
    });
    function Qi() {
      Ee.apply(this, arguments);
    }
    _(Qi, Ee, {
      defaults: {
        event: "swipe",
        threshold: 10,
        velocity: 0.3,
        direction: Ie | Qe,
        pointers: 1
      },
      getTouchAction: function() {
        return ci.prototype.getTouchAction.call(this);
      },
      attrTest: function(c) {
        var u = this.options.direction, p;
        return u & (Ie | Qe) ? p = c.overallVelocity : u & Ie ? p = c.overallVelocityX : u & Qe && (p = c.overallVelocityY), this._super.attrTest.call(this, c) && u & c.offsetDirection && c.distance > this.options.threshold && c.maxPointers == this.options.pointers && m(p) > this.options.velocity && c.eventType & z;
      },
      emit: function(c) {
        var u = Ln(c.offsetDirection);
        u && this.manager.emit(this.options.event + u, c), this.manager.emit(this.options.event, c);
      }
    });
    function ui() {
      Be.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0;
    }
    _(ui, Be, {
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
        return [Yi];
      },
      process: function(c) {
        var u = this.options, p = c.pointers.length === u.pointers, g = c.distance < u.threshold, b = c.deltaTime < u.time;
        if (this.reset(), c.eventType & ee && this.count === 0)
          return this.failTimeout();
        if (g && b && p) {
          if (c.eventType != z)
            return this.failTimeout();
          var S = this.pTime ? c.timeStamp - this.pTime < u.interval : !0, A = !this.pCenter || ni(this.pCenter, c.center) < u.posThreshold;
          this.pTime = c.timeStamp, this.pCenter = c.center, !A || !S ? this.count = 1 : this.count += 1, this._input = c;
          var q = this.count % u.taps;
          if (q === 0)
            return this.hasRequireFailures() ? (this._timer = v(function() {
              this.state = $e, this.tryEmit();
            }, u.interval, this), ye) : $e;
        }
        return Re;
      },
      failTimeout: function() {
        return this._timer = v(function() {
          this.state = Re;
        }, this.options.interval, this), Re;
      },
      reset: function() {
        clearTimeout(this._timer);
      },
      emit: function() {
        this.state == $e && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input));
      }
    });
    function Ue(c, u) {
      return u = u || {}, u.recognizers = oe(u.recognizers, Ue.defaults.preset), new Ji(c, u);
    }
    Ue.VERSION = "2.0.7", Ue.defaults = {
      domEvents: !1,
      touchAction: En,
      enable: !0,
      inputTarget: null,
      inputClass: null,
      preset: [
        [Zi, { enable: !1 }],
        [ji, { enable: !1 }, ["rotate"]],
        [Qi, { direction: Ie }],
        [ci, { direction: Ie }, ["swipe"]],
        [ui],
        [ui, { event: "doubletap", taps: 2 }, ["tap"]],
        [Ki]
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
    var ka = 1, An = 2;
    function Ji(c, u) {
      this.options = I({}, Ue.defaults, u || {}), this.options.inputTarget = this.options.inputTarget || c, this.handlers = {}, this.session = {}, this.recognizers = [], this.oldCssProps = {}, this.element = c, this.input = ua(this), this.touchAction = new Xi(this, this.options.touchAction), On(this, !0), E(this.options.recognizers, function(p) {
        var g = this.add(new p[0](p[1]));
        p[2] && g.recognizeWith(p[2]), p[3] && g.requireFailure(p[3]);
      }, this);
    }
    Ji.prototype = {
      set: function(c) {
        return I(this.options, c), c.touchAction && this.touchAction.update(), c.inputTarget && (this.input.destroy(), this.input.target = c.inputTarget, this.input.init()), this;
      },
      stop: function(c) {
        this.session.stopped = c ? An : ka;
      },
      recognize: function(c) {
        var u = this.session;
        if (!u.stopped) {
          this.touchAction.preventDefaults(c);
          var p, g = this.recognizers, b = u.curRecognizer;
          (!b || b && b.state & $e) && (b = u.curRecognizer = null);
          for (var S = 0; S < g.length; )
            p = g[S], u.stopped !== An && (!b || p == b || p.canRecognizeWith(b)) ? p.recognize(c) : p.reset(), !b && p.state & (ye | dt | qe) && (b = u.curRecognizer = p), S++;
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
        if (T(c, "add", this))
          return this;
        var u = this.get(c.options.event);
        return u && this.remove(u), this.recognizers.push(c), c.manager = this, this.touchAction.update(), c;
      },
      remove: function(c) {
        if (T(c, "remove", this))
          return this;
        if (c = this.get(c), c) {
          var u = this.recognizers, p = Ge(u, c);
          p !== -1 && (u.splice(p, 1), this.touchAction.update());
        }
        return this;
      },
      on: function(c, u) {
        if (c !== n && u !== n) {
          var p = this.handlers;
          return E(ut(c), function(g) {
            p[g] = p[g] || [], p[g].push(u);
          }), this;
        }
      },
      off: function(c, u) {
        if (c !== n) {
          var p = this.handlers;
          return E(ut(c), function(g) {
            u ? p[g] && p[g].splice(Ge(p[g], u), 1) : delete p[g];
          }), this;
        }
      },
      emit: function(c, u) {
        this.options.domEvents && _a(c, u);
        var p = this.handlers[c] && this.handlers[c].slice();
        if (!(!p || !p.length)) {
          u.type = c, u.preventDefault = function() {
            u.srcEvent.preventDefault();
          };
          for (var g = 0; g < p.length; )
            p[g](u), g++;
        }
      },
      destroy: function() {
        this.element && On(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null;
      }
    };
    function On(c, u) {
      var p = c.element;
      if (p.style) {
        var g;
        E(c.options.cssProps, function(b, S) {
          g = ti(p.style, S), u ? (c.oldCssProps[g] = p.style[g], p.style[g] = b) : p.style[g] = c.oldCssProps[g] || "";
        }), u || (c.oldCssProps = {});
      }
    }
    function _a(c, u) {
      var p = i.createEvent("Event");
      p.initEvent(c, !0, !0), p.gesture = u, u.target.dispatchEvent(p);
    }
    I(Ue, {
      INPUT_START: ee,
      INPUT_MOVE: Ze,
      INPUT_END: z,
      INPUT_CANCEL: le,
      STATE_POSSIBLE: li,
      STATE_BEGAN: ye,
      STATE_CHANGED: dt,
      STATE_ENDED: qe,
      STATE_RECOGNIZED: $e,
      STATE_CANCELLED: It,
      STATE_FAILED: Re,
      DIRECTION_NONE: ii,
      DIRECTION_LEFT: Mt,
      DIRECTION_RIGHT: Lt,
      DIRECTION_UP: At,
      DIRECTION_DOWN: Ot,
      DIRECTION_HORIZONTAL: Ie,
      DIRECTION_VERTICAL: Qe,
      DIRECTION_ALL: dn,
      Manager: Ji,
      Input: ge,
      TouchAction: Xi,
      TouchInput: oi,
      MouseInput: ri,
      PointerEventInput: Gi,
      TouchMouseInput: qi,
      SingleTouchInput: bn,
      Recognizer: Be,
      AttrRecognizer: Ee,
      Tap: ui,
      Pan: ci,
      Swipe: Qi,
      Pinch: ji,
      Rotate: Zi,
      Press: Ki,
      on: X,
      off: ae,
      each: E,
      merge: me,
      extend: re,
      assign: I,
      inherit: _,
      bindFn: D,
      prefixed: ti
    });
    var Ha = typeof e < "u" ? e : typeof self < "u" ? self : {};
    Ha.Hammer = Ue, typeof n == "function" && n.amd ? n(function() {
      return Ue;
    }) : o.exports ? o.exports = Ue : e[s] = Ue;
  })(window, document, "Hammer");
})($r);
var Qt = $r.exports;
const ml = dl(Qt), _e = /* @__PURE__ */ $a({
  __proto__: null,
  default: ml
}, [Qt]), Br = 1, Ur = 2, ds = 4, pl = {
  mousedown: Br,
  mousemove: Ur,
  mouseup: ds
};
function fl(o, e) {
  for (let i = 0; i < o.length; i++)
    if (e(o[i]))
      return !0;
  return !1;
}
function gl(o) {
  const e = o.prototype.handler;
  o.prototype.handler = function(s) {
    const n = this.store;
    s.button > 0 && s.type === "pointerdown" && (fl(n, (r) => r.pointerId === s.pointerId) || n.push(s)), e.call(this, s);
  };
}
function yl(o) {
  o.prototype.handler = function(i) {
    let s = pl[i.type];
    s & Br && i.button >= 0 && (this.pressed = !0), s & Ur && i.which === 0 && (s = ds), this.pressed && (s & ds && (this.pressed = !1), this.callback(this.manager, s, {
      pointers: [i],
      changedPointers: [i],
      pointerType: "mouse",
      srcEvent: i
    }));
  };
}
gl(Qt.PointerEventInput);
yl(Qt.MouseInput);
const vl = Qt.Manager;
let _i = class {
  constructor(e, i, s) {
    this.element = e, this.callback = i, this.options = { enable: !0, ...s };
  }
};
const wl = _e ? [
  [_e.Pan, { event: "tripan", pointers: 3, threshold: 0, enable: !1 }],
  [_e.Rotate, { enable: !1 }],
  [_e.Pinch, { enable: !1 }],
  [_e.Swipe, { enable: !1 }],
  [_e.Pan, { threshold: 0, enable: !1 }],
  [_e.Press, { enable: !1 }],
  [_e.Tap, { event: "doubletap", taps: 2, enable: !1 }],
  [_e.Tap, { event: "anytap", enable: !1 }],
  [_e.Tap, { enable: !1 }]
] : null, Hn = {
  tripan: ["rotate", "pinch", "pan"],
  rotate: ["pinch"],
  pinch: ["pan"],
  pan: ["press", "doubletap", "anytap", "tap"],
  doubletap: ["anytap"],
  anytap: ["tap"]
}, bl = {
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
}, Bs = {
  KEY_EVENTS: ["keydown", "keyup"],
  MOUSE_EVENTS: ["mousedown", "mousemove", "mouseup", "mouseover", "mouseout", "mouseleave"],
  WHEEL_EVENTS: [
    "wheel",
    "mousewheel"
  ]
}, Cl = {
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
}, $n = {
  click: "tap",
  anyclick: "anytap",
  dblclick: "doubletap",
  mousedown: "pointerdown",
  mousemove: "pointermove",
  mouseup: "pointerup",
  mouseover: "pointerover",
  mouseout: "pointerout",
  mouseleave: "pointerleave"
}, Tl = typeof navigator < "u" && navigator.userAgent ? navigator.userAgent.toLowerCase() : "", pt = typeof window < "u" ? window : global;
let ps = !1;
try {
  const o = {
    get passive() {
      return ps = !0, !0;
    }
  };
  pt.addEventListener("test", null, o), pt.removeEventListener("test", null);
} catch {
  ps = !1;
}
const Sl = Tl.indexOf("firefox") !== -1, { WHEEL_EVENTS: El } = Bs, Bn = "wheel", Un = 4.000244140625, Pl = 40, Ml = 0.25;
class Ll extends _i {
  constructor(e, i, s) {
    super(e, i, s), this.handleEvent = (n) => {
      if (!this.options.enable)
        return;
      let r = n.deltaY;
      pt.WheelEvent && (Sl && n.deltaMode === pt.WheelEvent.DOM_DELTA_PIXEL && (r /= pt.devicePixelRatio), n.deltaMode === pt.WheelEvent.DOM_DELTA_LINE && (r *= Pl)), r !== 0 && r % Un === 0 && (r = Math.floor(r / Un)), n.shiftKey && r && (r = r * Ml), this.callback({
        type: Bn,
        center: {
          x: n.clientX,
          y: n.clientY
        },
        delta: -r,
        srcEvent: n,
        pointerType: "mouse",
        target: n.target
      });
    }, this.events = (this.options.events || []).concat(El), this.events.forEach((n) => e.addEventListener(n, this.handleEvent, ps ? { passive: !1 } : !1));
  }
  destroy() {
    this.events.forEach((e) => this.element.removeEventListener(e, this.handleEvent));
  }
  enableEventType(e, i) {
    e === Bn && (this.options.enable = i);
  }
}
const { MOUSE_EVENTS: Al } = Bs, zn = "pointermove", Vn = "pointerover", Wn = "pointerout", Fn = "pointerenter", Gn = "pointerleave";
class Ol extends _i {
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
    e === zn && (this.enableMoveEvent = i), e === Vn && (this.enableOverEvent = i), e === Wn && (this.enableOutEvent = i), e === Fn && (this.enableEnterEvent = i), e === Gn && (this.enableLeaveEvent = i);
  }
  handleOverEvent(e) {
    this.enableOverEvent && e.type === "mouseover" && this._emit(Vn, e);
  }
  handleOutEvent(e) {
    this.enableOutEvent && e.type === "mouseout" && this._emit(Wn, e);
  }
  handleEnterEvent(e) {
    this.enableEnterEvent && e.type === "mouseenter" && this._emit(Fn, e);
  }
  handleLeaveEvent(e) {
    this.enableLeaveEvent && e.type === "mouseleave" && this._emit(Gn, e);
  }
  handleMoveEvent(e) {
    if (this.enableMoveEvent)
      switch (e.type) {
        case "mousedown":
          e.button >= 0 && (this.pressed = !0);
          break;
        case "mousemove":
          e.which === 0 && (this.pressed = !1), this.pressed || this._emit(zn, e);
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
const { KEY_EVENTS: Nl } = Bs, qn = "keydown", Yn = "keyup";
class Dl extends _i {
  constructor(e, i, s) {
    super(e, i, s), this.handleEvent = (n) => {
      const r = n.target || n.srcElement;
      r.tagName === "INPUT" && r.type === "text" || r.tagName === "TEXTAREA" || (this.enableDownEvent && n.type === "keydown" && this.callback({
        type: qn,
        srcEvent: n,
        key: n.key,
        target: n.target
      }), this.enableUpEvent && n.type === "keyup" && this.callback({
        type: Yn,
        srcEvent: n,
        key: n.key,
        target: n.target
      }));
    }, this.enableDownEvent = this.options.enable, this.enableUpEvent = this.options.enable, this.events = (this.options.events || []).concat(Nl), e.tabIndex = this.options.tabIndex || 0, e.style.outline = "none", this.events.forEach((n) => e.addEventListener(n, this.handleEvent));
  }
  destroy() {
    this.events.forEach((e) => this.element.removeEventListener(e, this.handleEvent));
  }
  enableEventType(e, i) {
    e === qn && (this.enableDownEvent = i), e === Yn && (this.enableUpEvent = i);
  }
}
const Xn = "contextmenu";
class Il extends _i {
  constructor(e, i, s) {
    super(e, i, s), this.handleEvent = (n) => {
      this.options.enable && this.callback({
        type: Xn,
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
    e === Xn && (this.options.enable = i);
  }
}
const fs = 1, Ai = 2, gs = 4, Rl = {
  pointerdown: fs,
  pointermove: Ai,
  pointerup: gs,
  mousedown: fs,
  mousemove: Ai,
  mouseup: gs
}, kl = 1, _l = 2, Hl = 3, $l = 0, Bl = 1, Ul = 2, zl = 1, Vl = 2, Wl = 4;
function Fl(o) {
  const e = Rl[o.srcEvent.type];
  if (!e)
    return null;
  const { buttons: i, button: s, which: n } = o.srcEvent;
  let r = !1, a = !1, l = !1;
  return e === gs || e === Ai && !Number.isFinite(i) ? (r = n === kl, a = n === _l, l = n === Hl) : e === Ai ? (r = !!(i & zl), a = !!(i & Wl), l = !!(i & Vl)) : e === fs && (r = s === $l, a = s === Bl, l = s === Ul), { leftButton: r, middleButton: a, rightButton: l };
}
function Gl(o, e) {
  const i = o.center;
  if (!i)
    return null;
  const s = e.getBoundingClientRect(), n = s.width / e.offsetWidth || 1, r = s.height / e.offsetHeight || 1, a = {
    x: (i.x - s.left - e.clientLeft) / n,
    y: (i.y - s.top - e.clientTop) / r
  };
  return { center: i, offsetCenter: a };
}
const es = {
  srcElement: "root",
  priority: 0
};
class ql {
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
    let h = es;
    typeof s == "string" || s && s.addEventListener ? h = { ...es, srcElement: s } : s && (h = { ...es, ...s });
    let m = l.get(h.srcElement);
    m || (m = [], l.set(h.srcElement, m));
    const f = {
      type: e,
      handler: i,
      srcElement: h.srcElement,
      priority: h.priority
    };
    n && (f.once = !0), r && (f.passive = !0), a.push(f), this._active = this._active || !f.passive;
    let v = m.length - 1;
    for (; v >= 0 && !(m[v].priority >= f.priority); )
      v--;
    m.splice(v + 1, 0, f);
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
        const { type: m, handler: f, once: v } = s[h];
        if (f({
          ...e,
          type: m,
          stopPropagation: r,
          stopImmediatePropagation: a
        }), v && l.push(s[h]), n)
          break;
      }
      for (let h = 0; h < l.length; h++) {
        const { type: m, handler: f } = l[h];
        this.remove(m, f);
      }
    }
  }
  _normalizeEvent(e) {
    const i = this.eventManager.getElement();
    return {
      ...e,
      ...Fl(e),
      ...Gl(e, i),
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
  Manager: vl,
  touchAction: "none",
  tabIndex: 0
};
class Xl {
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
      recognizers: i.recognizers || wl
    }).on("hammer.input", this._onBasicInput), i.recognizers || Object.keys(Hn).forEach((n) => {
      const r = this.manager.get(n);
      r && Hn[n].forEach((a) => {
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
    this.wheelInput = new Ll(e, this._onOtherEvent, {
      enable: !1
    }), this.moveInput = new Ol(e, this._onOtherEvent, {
      enable: !1
    }), this.keyInput = new Dl(e, this._onOtherEvent, {
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
      const r = bl[e];
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
      for (const f in e)
        this._addEventHandler(f, e[f], s, n, r);
      return;
    }
    const { manager: a, events: l } = this, h = $n[e] || e;
    let m = l.get(h);
    m || (m = new ql(this), l.set(h, m), m.recognizerName = Cl[h] || h, a && a.on(h, m.handleEvent)), m.add(e, i, s, n, r), m.isEmpty() || this._toggleRecognizer(m.recognizerName, !0);
  }
  _removeEventHandler(e, i) {
    if (typeof e != "string") {
      for (const a in e)
        this._removeEventHandler(a, e[a]);
      return;
    }
    const { events: s } = this, n = $n[e] || e, r = s.get(n);
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
class jn {
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
class Kn {
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
class Zn {
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
const jl = {
  element: void 0,
  contextMenu: !0,
  panX: !0,
  panY: !0
};
class He {
  #e;
  #t;
  #i;
  #n = null;
  #s = null;
  #r = null;
  #o;
  #l;
  #a = !1;
  #h;
  #c;
  #d;
  pad = { left: !1 };
  constructor(e, i) {
    if (this.#e = { ...jl, ...i }, this.#l = ul.idle, this.#o = cl, this.#t = e, !this.#t && this.#e.elementId && (this.#t = document.getElementById(this.#e.elementId)), !Y(this.#t))
      throw "Must specify an element to receive user input.";
    this.#e.contextMenu || (window.oncontextmenu = (r) => (r.preventDefault(), !1));
    const n = {
      recognizerOptions: {
        pan: { threshold: this.#o ? 10 : 0 },
        pinch: { threshold: 0 }
      }
    };
    this.#i = new Xl(this.#t, n), this.pointerInit();
  }
  get agent() {
    return this.#i;
  }
  get pointer() {
    return this.#n instanceof jn ? this.#n : (this.#n = new jn(this), this.#n);
  }
  get touch() {
    return this.#r instanceof Kn ? this.#r : (this.#r = new Kn(this), this.#r);
  }
  get key() {
    return this.#s instanceof Zn ? this.#s : (this.#s = new Zn(this), this.#s);
  }
  get status() {
    return this.#l;
  }
  get element() {
    return this.#t;
  }
  get isTouch() {
    return this.#o;
  }
  get isPan() {
    return this.#a;
  }
  set panX(e) {
    F(e) && (this.#h = e);
  }
  set panY(e) {
    F(y) && (this.#c = y);
  }
  set wheeldelta(e) {
    this.#d = e.delta;
  }
  get wheeldelta() {
    return this.#d;
  }
  destroy() {
    this.#i.destroy(), this.#n = void 0, this.#s = void 0, this.#r = void 0;
  }
  isValid(e, i) {
    return !!(C(e) || N(i));
  }
  validOptions(e) {
    return w(e) && F(e) ? e : void 0;
  }
  on(e, i, s, n = !1) {
    if (!this.isValid(e, i))
      return !1;
    this.pointer.has(e) ? this.#n.on(e, i, s, n) : this.touch.has(e) ? this.#r.on(e, i, s, n) : this.key.has(e) ? this.#s.on(e, i, s, n) : this.element.addEventListener(e, i, this.validOptions(s));
  }
  off(e, i, s) {
    this.#n?.has(e) ? this.#n.off(e, i, s) : this.#r?.has(e) ? this.#r.off(e, i, s) : this.#s?.has(e) ? this.#s.off(e, i, s) : this.element.removeEventListener(e, i, this.validOptions(s));
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
    this.#a = !0, this.onPointerDown(e);
  }
  endPointerDrag(e) {
    this.#a = !1;
  }
}
const Kl = ["y", "M", "d", "h", "m", "s", "ms"], Zl = ["years", "months", "days", "hours", "minutes", "seconds", "milliseconds"], Ql = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], Jl = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], zr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], eh = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], Vr = 1231006505e3, Xe = 1, V = 1e3, W = V * 60, Q = W * 60, $ = Q * 24, xt = $ * 7, ue = $ * 30;
function Wr(o = 3, e = !1) {
  let i = zr[o % 12] * $;
  return e && o > 0 && (i += $), i;
}
const xe = $ * 365, qt = {
  y: xe,
  M: ue,
  w: xt,
  d: $,
  h: Q,
  m: W,
  s: V,
  u: Xe
}, Fr = {
  years: xe,
  months: ue,
  weeks: xt,
  days: $,
  hours: Q,
  minutes: W,
  seconds: V,
  milliseconds: Xe
}, th = { ...qt, ...Fr }, Jt = {
  YEARS10: [xe * 10, "years"],
  YEARS5: [xe * 5, "years"],
  YEARS3: [xe * 3, "years"],
  YEARS2: [xe * 2, "years"],
  YEARS: [xe, "years"],
  MONTH6: [ue * 6, "months"],
  MONTH4: [ue * 4, "months"],
  MONTH3: [ue * 3, "months"],
  MONTH2: [ue * 2, "months"],
  MONTH: [ue, "months"],
  DAY15: [$ * 15, "years"],
  DAY10: [$ * 10, "days"],
  DAY7: [$ * 7, "days"],
  DAY5: [$ * 5, "days"],
  DAY3: [$ * 3, "days"],
  DAY2: [$ * 2, "days"],
  DAY: [$, "days"],
  HOUR12: [Q * 12, "hours"],
  HOUR6: [Q * 6, "hours"],
  HOUR4: [Q * 4, "hours"],
  HOUR2: [Q * 2, "hours"],
  HOUR: [Q, "hours"],
  MINUTE30: [W * 30, "minutes"],
  MINUTE15: [W * 15, "minutes"],
  MINUTE10: [W * 10, "minutes"],
  MINUTE5: [W * 5, "minutes"],
  MINUTE2: [W * 2, "minutes"],
  MINUTE: [W, "minutes"],
  SECOND30: [V * 30, "seconds"],
  SECOND15: [V * 15, "seconds"],
  SECOND10: [V * 10, "seconds"],
  SECOND5: [V * 5, "seconds"],
  SECOND2: [V * 2, "seconds"],
  SECOND: [V, "seconds"],
  MILLISECOND500: [Xe * 500, "milliseconds"],
  MILLISECOND250: [Xe * 250, "milliseconds"],
  MILLISECOND100: [Xe * 100, "milliseconds"],
  MILLISECOND50: [Xe * 50, "milliseconds"],
  MILLISECOND: [Xe, "milliseconds"]
}, ih = () => {
  const o = Object.values(Jt), e = [];
  for (let i = o.length; --i; i > 0)
    e[i] = o[i][0];
  return e;
}, $t = ih(), sh = () => {
  const o = Object.values(Jt), e = [];
  for (let i = o.length; --i; i > 0)
    e[i] = o[i][1];
  return e;
}, ys = sh(), nh = Object.keys(Jt), rh = () => {
  const o = {};
  for (const [e, i] of Object.entries(Jt))
    o[e] = i[0];
  return o;
}, oh = rh(), vs = {
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
function ah() {
  const o = (/* @__PURE__ */ new Date()).getTimezoneOffset();
  return Object.prototype.hasOwnProperty.call(vs, o) ? vs[o.toString()] : "Etc/UTC";
}
function lh() {
  const o = {};
  for (let e in qt) {
    let i = 0;
    o[e] = [];
    do
      o[e].push(Math.round(qt[e] * i)), i += 0.125;
    while (i < 1);
  }
  return o;
}
function Gr(o) {
  const e = new Date(o).getTime();
  return x(e);
}
function qr(o, e = Vr, i = Date.now()) {
  return Gr(o) ? o > e && o < i : !1;
}
function kt(o, e, i) {
  o = new Date(o), e = new Date(e);
  var s = e.getTime(), n = o.getTime();
  return parseInt((s - n) / i);
}
const Ye = {
  inSeconds: function(o, e) {
    return kt(o, e, V);
  },
  inMinutes: function(o, e) {
    return kt(o, e, W);
  },
  inHours: function(o, e) {
    return kt(o, e, Q);
  },
  inDays: function(o, e) {
    return kt(o, e, $);
  },
  inWeeks: function(o, e) {
    return kt(o, e, xt);
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
function hh(o, e) {
  let i = Ye.inYears(o, e), s = Ye.inMonths(o, e), n = Ye.inWeeks(o, e), r = Ye.inDays(o, e), a = Ye.inHours(o, e), l = Ye.inMinutes(o, e), h = Ye.inSeconds(o, e), m = new Date(e).getTime() - new Date(o).getTime();
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
function wi(o) {
  let e = V;
  return C(o) ? (e = Yr(o), e ? o = o : (e = V, o = "1s")) : o = "1s", { tf: o, ms: e };
}
function Yr(o) {
  if (!C(o))
    return !1;
  const e = /([0-9]{1,2})([s|m|h|d|w|M|y])/gm;
  let i;
  return (i = e.exec(o)) !== null ? qt[i[2]] * i[1] : !1;
}
function Us(o) {
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
function Vt(o) {
  const e = Us(o);
  for (const i in e)
    if (e[i])
      return `${e[i]}${i}`;
}
function Xr(o) {
  return o ? new Date(o).getUTCSeconds() : null;
}
function zs(o) {
  return new Date(o).setUTCMilliseconds(0, 0);
}
function jr(o) {
  return o ? new Date(o).getUTCMinutes() : null;
}
function Vs(o) {
  return new Date(o).setUTCSeconds(0, 0);
}
function Kr(o) {
  return o ? new Date(o).getUTCHours() : null;
}
function Ws(o) {
  return new Date(o).setUTCMinutes(0, 0, 0);
}
function Fs(o) {
  return o ? new Date(o).getUTCDate() : null;
}
function ch(o, e = "en-GB", i = "short") {
  return new Date(o).toLocaleDateString(e, { weekday: i });
}
function Yt(o) {
  return new Date(o).setUTCHours(0, 0, 0, 0);
}
function Gs(o) {
  if (o)
    return new Date(o).getUTCMonth();
}
function Zr(o, e = "en-GB", i = "short") {
  return new Date(o).toLocaleDateString(e, { month: i });
}
function qs(o) {
  let e = new Date(o);
  return Date.UTC(
    e.getUTCFullYear(),
    e.getUTCMonth(),
    1
  );
}
function Qr(o) {
  let e = (Gs(o) + 1) % 12;
  return o += Wr(e, Hi(o)), o;
}
function Jr(o) {
  if (o)
    return new Date(o).getUTCFullYear();
}
function Ys(o) {
  return Date.UTC(new Date(o).getUTCFullYear());
}
function eo(o) {
  return o = o + xe + $, Hi(o), o;
}
function Hi(o) {
  let i = new Date(o).getUTCFullYear();
  return i & 3 ? !1 : i % 100 != 0 || i % 400 == 0;
}
function uh(o) {
  let e = new Date(o), i = e.getUTCMonth(), s = e.getUTCDate(), n = dayCount[i] + s;
  return i > 1 && Hi() && n++, n;
}
function bi(o, e) {
  return {
    years: (s) => Ys(s),
    months: (s) => qs(s),
    weeks: (s) => Yt(s),
    days: (s) => Yt(s),
    hours: (s) => Ws(s),
    minutes: (s) => Vs(s),
    seconds: (s) => zs(s)
  }[e](o);
}
function dh(o, e) {
  let i, s;
  switch (e) {
    case "years":
      i = Ys(o), s = eo(o);
      break;
    case "months":
      i = qs(o), s = Qr(o);
      break;
    case "weeks":
      i = Yt(o), s = i + $;
      break;
    case "days":
      i = Yt(o), s = i + $;
      break;
    case "hours":
      i = Ws(o), s = i + Q;
      break;
    case "minutes":
      i = Vs(o), s = i + W;
      break;
    case "seconds":
      i = zs(o), s = i + V;
  }
  return { start: i, end: s };
}
function ws(o) {
  let { h: e, m: i } = Xs(o);
  return e == 0 && i == 0 ? `${d}` : `${e}:${i}`;
}
function mh(o) {
  let { h: e, m: i, s } = Xs(o);
  return e == 0 && i == 0 && s == 0 ? `${d}` : `${e}:${i}:${s}`;
}
function bs(o) {
  let { h: e, m: i, s } = Xs(o);
  return e == 0 && i == 0 && s == 0 ? `${d}` : `${i}:${s}`;
}
function Xs(o) {
  let e, i, s, n;
  return e = String(Fs(o)), i = String(Kr(o)).padStart(2, "0"), s = String(jr(o)).padStart(2, "0"), n = String(Xr(o)).padStart(2, "0"), { d: e, h: i, m: s, s: n };
}
function ph(o, e) {
  let i = 1 / 0, s = null, n = -1;
  for (let r = 0; r < e.length; r++) {
    let a = e[r][0];
    Math.abs(a - o) < i && (i = Math.abs(a - o), s = e[r], n = r);
  }
  return [n, s];
}
const fh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BTCGENESIS: Vr,
  DAY_MS: $,
  HM: ws,
  HMS: mh,
  HOUR_MS: Q,
  MILLISECOND: Xe,
  MINUTE_MS: W,
  MONTHMAP: eh,
  MONTHR_MS: ue,
  MONTH_MS: Wr,
  MS: bs,
  SECOND_MS: V,
  TIMESCALES: $t,
  TIMESCALESKEYS: nh,
  TIMESCALESRANK: ys,
  TIMESCALESVALUES: Jt,
  TIMESCALESVALUESKEYS: oh,
  TIMEUNITS: Kl,
  TIMEUNITSLONG: Zl,
  TIMEUNITSVALUES: th,
  TIMEUNITSVALUESLONG: Fr,
  TIMEUNITSVALUESSHORT: qt,
  WEEK_MS: xt,
  YEAR_MS: xe,
  buildSubGrads: lh,
  dayCntInc: Ql,
  dayCntLeapInc: Jl,
  dayOfYear: uh,
  day_start: Yt,
  getTimezone: ah,
  get_day: Fs,
  get_dayName: ch,
  get_hour: Kr,
  get_minute: jr,
  get_month: Gs,
  get_monthName: Zr,
  get_second: Xr,
  get_year: Jr,
  hour_start: Ws,
  interval2MS: Yr,
  isLeapYear: Hi,
  isTimeFrame: wi,
  isValidTimeInRange: qr,
  isValidTimestamp: Gr,
  minute_start: Vs,
  monthDayCnt: zr,
  month_start: qs,
  ms2Interval: Vt,
  ms2TimeUnits: Us,
  nearestTs: ph,
  nextMonth: Qr,
  nextYear: eo,
  second_start: zs,
  time_start: bi,
  timestampDiff: Ye,
  timestampDifference: hh,
  timezones: vs,
  unitRange: dh,
  year_start: Ys
}, Symbol.toStringTag, { value: "Module" })), gh = W, yh = "1m", Oi = gh, vh = 6, Qn = 0.05, wh = 100, Jn = 100, Ne = ["default", "percent", "log"], er = 0.3, tr = 30, di = 200, ir = 200, sr = 20, nr = 4096, $i = 5, rr = 50, or = 30, bh = 8, xs = 30, to = [!0, "top"];
class ve {
  static t = 0;
  static o = 1;
  static h = 2;
  static l = 3;
  static c = 4;
  static v = 5;
}
const xi = {
  mainPane: {},
  primaryPane: {},
  secondaryPane: {},
  scale: {},
  timeline: {}
};
Array.from(Object.keys(xi));
class ce {
  #e;
  #t;
  #i;
  #n;
  #s;
  #r;
  #o;
  #l;
  #a;
  #h;
  #c;
  static dividerList = {};
  static divideCnt = 0;
  static class = Dn;
  static name = "Dividers";
  static type = "Divider";
  static create(e, i) {
    const s = `${i.core.id}_divider_${++ce.divideCnt}`;
    return i.id = s, ce.dividerList[s] = new ce(e, i), ce.dividerList[s];
  }
  static destroy() {
    for (let e in ce.dividerList)
      ce.dividerList[e].destroy(), delete ce.dividerList[e];
  }
  static defaultNode() {
    return `
  <div slot="widget" class="${Dn}" style="position: absolute;"></div>
  `;
  }
  constructor(e, i) {
    const s = { ...i };
    this.#s = e, this.#t = s.core, this.#i = s, this.#n = s.core.theme, this.#e = s.id, this.#r = s.chartPane, this.#o = e.elements.elDividers, this.init();
  }
  get el() {
    return this.#l;
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
    return se(this.#l);
  }
  get height() {
    return this.#l.getBoundingClientRect().height;
  }
  set cursor(e) {
    this.setCursorStyle(e);
  }
  get cursor() {
    return this.#h;
  }
  get type() {
    return ce.type;
  }
  init() {
    this.mount();
  }
  start() {
    this.cursor = "row-resize", this.eventsListen();
  }
  destroy() {
    this.#c.destroy(), this.el.remove(), delete ce.dividerList[this.id];
  }
  eventsListen() {
    this.#c = new He(this.#l, { disableContextMenu: !1 }), this.#c.on("pointerover", this.onMouseEnter.bind(this)), this.#c.on("pointerout", this.onMouseOut.bind(this)), this.#c.on("pointerdrag", this.onPointerDrag.bind(this)), this.#c.on("pointerdragend", this.onPointerDragEnd.bind(this));
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
    this.#l.style.background = this.#n.divider.active, this.#t.MainPane.onMouseEnter();
  }
  onMouseOut() {
    this.#l.style.background = this.#n.divider.idle, this.#t.MainPane.onMouseEnter();
  }
  onPointerDrag(e) {
    this.#a = this.#t.MainPane.cursorPos, this.#l.style.background = this.#n.divider.active, this.emit(`${this.id}_pointerdrag`, this.#a), this.emit("divider_pointerdrag", {
      id: this.id,
      e,
      pos: this.#a,
      chartPane: this.chartPane
    }), this.chartPane.resize();
  }
  onPointerDragEnd(e) {
    this.#l.style.background = this.#n.divider.idle, this.#a = this.#t.MainPane.cursorPos, this.emit(`${this.id}_pointerdragend`, this.#a), this.emit("divider_pointerdragend", {
      id: this.id,
      e,
      pos: this.#a,
      chartPane: this.chartPane
    }), this.chartPane.resize();
  }
  mount() {
    this.#o.lastElementChild == null ? this.#o.innerHTML = this.dividerNode() : this.#o.lastElementChild.insertAdjacentHTML("afterend", this.dividerNode()), this.#l = Nr(`#${this.#e}`, this.#o);
  }
  dividerNode() {
    let e = this.#t.theme, i = this.#r.pos.top - se(this.#o).top, s = this.#t.elBody.width, n = x(this.config.dividerHeight) ? this.config.dividerHeight : bh, r = e.tools.width;
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
    let e = this.#r.pos.top - se(this.#o).top;
    e = e - this.height / 2 + 1, this.#l.style.top = `${e}px`;
  }
  setWidth() {
    this.#l.style.width = `${this.#t.MainPane.width}px`;
  }
  setCursorStyle(e) {
    C(e) && (this.#h = e, this.#l.style.cursor = e);
  }
  hide() {
    this.#l.style.display = "none";
  }
  show() {
    this.#l.style.display = "block";
  }
}
const xh = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4" ><path d="M471.993 112h-89.2l-16.242-46.75a32.023 32.023 0 00-30.229-21.5H175.241a31.991 31.991 0 00-30.294 21.691L129.1 112H40a24.027 24.027 0 00-24 24v312a24.027 24.027 0 0024 24h431.993a24.027 24.027 0 0024-24V136a24.027 24.027 0 00-24-24zm-8 328H48.007V144h104.01l23.224-68.25h161.081l23.71 68.25h103.961z" class="ci-primary"></path><path d="M256 168a114 114 0 10114 114 114.13 114.13 0 00-114-114zm0 196a82 82 0 1182-82 82.093 82.093 0 01-82 82z"></path></svg>', Ch = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M376 160v32h65.372L252 381.373l-72-72L76.686 412.686l22.628 22.628L180 354.627l72 72 212-211.999V280h32V160H376z"></path><path d="M48 104H16v392h480v-32H48V104z"></path></svg>', Th = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M271.514 95.5h-32v178.111l115.613 54.948 13.737-28.902-97.35-46.268V95.5z"></path><path d="M256 16C123.452 16 16 123.452 16 256s107.452 240 240 240 240-107.452 240-240S388.548 16 256 16zm0 448c-114.875 0-208-93.125-208-208S141.125 48 256 48s208 93.125 208 208-93.125 208-208 208z"></path></svg>', io = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M245.151 168a88 88 0 1088 88 88.1 88.1 0 00-88-88zm0 144a56 56 0 1156-56 56.063 56.063 0 01-56 56z"></path><path d="M464.7 322.319l-31.77-26.153a193.081 193.081 0 000-80.332l31.77-26.153a19.941 19.941 0 004.606-25.439l-32.612-56.483a19.936 19.936 0 00-24.337-8.73l-38.561 14.447a192.038 192.038 0 00-69.54-40.192l-6.766-40.571A19.936 19.936 0 00277.762 16H212.54a19.937 19.937 0 00-19.728 16.712l-6.762 40.572a192.03 192.03 0 00-69.54 40.192L77.945 99.027a19.937 19.937 0 00-24.334 8.731L21 164.245a19.94 19.94 0 004.61 25.438l31.767 26.151a193.081 193.081 0 000 80.332l-31.77 26.153A19.942 19.942 0 0021 347.758l32.612 56.483a19.937 19.937 0 0024.337 8.73l38.562-14.447a192.03 192.03 0 0069.54 40.192l6.762 40.571A19.937 19.937 0 00212.54 496h65.222a19.936 19.936 0 0019.728-16.712l6.763-40.572a192.038 192.038 0 0069.54-40.192l38.564 14.449a19.938 19.938 0 0024.334-8.731l32.609-56.487a19.939 19.939 0 00-4.6-25.436zm-50.636 57.12l-48.109-18.024-7.285 7.334a159.955 159.955 0 01-72.625 41.973l-10 2.636L267.6 464h-44.89l-8.442-50.642-10-2.636a159.955 159.955 0 01-72.625-41.973l-7.285-7.334-48.117 18.024L53.8 340.562l39.629-32.624-2.7-9.973a160.9 160.9 0 010-83.93l2.7-9.972L53.8 171.439l22.446-38.878 48.109 18.024 7.285-7.334a159.955 159.955 0 0172.625-41.973l10-2.636L222.706 48H267.6l8.442 50.642 10 2.636a159.955 159.955 0 0172.625 41.973l7.285 7.334 48.109-18.024 22.447 38.877-39.629 32.625 2.7 9.972a160.9 160.9 0 010 83.93l-2.7 9.973 39.629 32.623z"></path></svg>', Sh = '<svg width="46.08" height="46.08" version="1.1" viewBox="-51.2 -51.2 614.4 614.4"><rect x="16" y="240.18" width="188.84" height="31.635"/><g transform="translate(-3.3234e-7 -112.18)"><rect x="307.16" y="352.37" width="188.84" height="31.635"/></g><rect transform="rotate(-90)" x="-496" y="240.18" width="188.84" height="31.635"/><rect transform="rotate(-90)" x="-204.84" y="240.18" width="188.84" height="31.635"/></svg>', Eh = '<svg width="46.08" height="46.08" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"></path><path d="M6.535 3H21a1 1 0 011 1v16a1 1 0 01-1 1H6.535a1 1 0 01-.832-.445l-5.333-8a1 1 0 010-1.11l5.333-8A1 1 0 016.535 3zm.535 2l-4.666 7 4.666 7H20V5H7.07zM13 10.586l2.828-2.829 1.415 1.415L14.414 12l2.829 2.828-1.415 1.415L13 13.414l-2.828 2.829-1.415-1.415L11.586 12 8.757 9.172l1.415-1.415L13 10.586z"></path></svg>', Ph = '<svg width="46.08" height="46.08" version="1.1" viewBox="-51.2 -51.2 614.4 614.4"><g stroke-width="30.155"><rect x="14.757" y="240.92" width="482.49" height="30.155" rx="15.078"/><rect x="14.757" y="147" width="482.49" height="30.155" rx="15.078"/><rect x="14.757" y="334.84" width="482.49" height="30.155" rx="15.078"/></g ><g transform="translate(5.937 -288.34)"><path d="m23.904 712.34c-8.3532 0-15.078 6.7252-15.078 15.078s6.7249 15.078 15.078 15.078h173.93c-0.65295-3.3651-2.0312-6.4697-2.0312-10.026 0-7.1393 1.5573-13.888 4.0625-20.13zm276.35 0c2.5051 6.2423 4.0365 12.991 4.0365 20.13 0 3.5554-1.3526 6.6618-2.0052 10.026h173.93c8.3532 0 15.078-6.7252 15.078-15.078s-6.7249-15.078-15.078-15.078z"/><path d="m250.06 759.97c17.965 0 32.545-14.58 32.545-32.545 0-17.965-14.58-32.545-32.545-32.545-17.965 0-32.545 14.58-32.545 32.545 0 17.965 14.58 32.545 32.545 32.545zm0 21.697c-29.964 0-54.242-24.279-54.242-54.242 0-29.964 24.279-54.242 54.242-54.242 29.964 0 54.242 24.279 54.242 54.242 0 29.964-24.279 54.242-54.242 54.242z" stroke-width="21.697"/></g ><path d="m144.05 18.672c-24.694 0-45.285 16.595-51.849 39.167h-62.37c-8.3532 0-15.078 6.7252-15.078 15.078s6.7249 15.078 15.078 15.078h62.37c6.5639 22.572 27.155 39.167 51.849 39.167s45.285-16.595 51.849-39.167h120.03c6.5639 22.572 27.155 39.167 51.849 39.167 24.694 0 45.285-16.595 51.849-39.167h62.552c8.3532 0 15.078-6.7252 15.078-15.078s-6.7249-15.078-15.078-15.078h-62.552c-6.5639-22.572-27.155-39.167-51.849-39.167-24.694 0-45.285 16.595-51.849 39.167h-120.03c-6.5639-22.572-27.155-39.167-51.849-39.167zm0 21.693c17.965 0 32.552 14.587 32.552 32.552 0 17.965-14.587 32.552-32.552 32.552-17.965 1e-5 -32.552-14.587-32.552-32.552 0-17.965 14.587-32.552 32.552-32.552zm223.72 0c17.965 0 32.552 14.587 32.552 32.552 0 17.965-14.587 32.552-32.552 32.552-17.965 0-32.552-14.587-32.552-32.552 0-17.965 14.587-32.552 32.552-32.552z" stroke-width="30.155"/></svg>', et = '<svg width="46.08" height="46.08" version="1.1" viewBox="-51.2 -51.2 614.4 614.4"><g transform="matrix(21.697 0 0 21.697 -47.758 -47.758)"><path d="m7.354 21.354 14-14-0.707-0.707-14 14z"/><path d="m22.5 7c0.828 0 1.5-0.672 1.5-1.5s-0.672-1.5-1.5-1.5-1.5 0.672-1.5 1.5 0.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zm-17 16c0.828 0 1.5-0.672 1.5-1.5s-0.672-1.5-1.5-1.5-1.5 0.672-1.5 1.5 0.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"/></g></svg>', Mh = '<svg width="46.08" height="46.08" viewBox="0 0 32 32"><path d="M 3.2758709,20.241377 11.758622,28.72413 28.72413,11.758622 20.241377,3.2758709 Z m 2.1206881,0 1.5905161,-1.590515 3.7112049,3.711203 1.060342,-1.060345 -3.7112027,-3.711204 1.0603441,-1.060344 2.1206876,2.12069 1.060346,-1.060346 -2.120689,-2.120688 1.060343,-1.060344 3.711203,3.711203 L 16,17.060346 l -3.711203,-3.711208 1.060341,-1.060341 2.12069,2.120687 1.060344,-1.060346 -2.120688,-2.120687 1.060344,-1.060343 3.711204,3.711205 1.060345,-1.060345 -3.711205,-3.7112046 1.060344,-1.0603441 2.120687,2.1206887 1.060346,-1.0603446 -2.120687,-2.1206883 1.590515,-1.5905161 6.362065,6.362063 -14.84482,14.84482 z" style="stroke-width:0.749776" /></svg>', Lh = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><g id="g930" transform="matrix(21.128963,0,0,21.128963,-29.235597,-50.369964)"><path clip-rule="evenodd" d="m 4.5,5 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z M 2,6.5 A 2.5,2.5 0 0 1 6.95,6 H 24 V 7 H 6.95 A 2.5,2.5 0 0 1 2,6.5 Z M 4.5,15 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z M 2,16.5 A 2.5,2.5 0 0 1 6.95,16 h 13.1 a 2.5,2.5 0 1 1 0,1 H 6.95 A 2.5,2.5 0 0 1 2,16.5 Z M 22.5,15 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z m -18,6 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z M 2,22.5 A 2.5,2.5 0 0 1 6.95,22 H 24 v 1 H 6.95 A 2.5,2.5 0 0 1 2,22.5 Z" id="path908" /><path clip-rule="evenodd" d="M 22.4,8.94 21.01,9.57 20.6,8.66 21.99,8.03 Z m -4,1.8 -1.39,0.63 -0.41,-0.91 1.39,-0.63 z m -4,1.8 -1.4,0.63 -0.4,-0.91 1.39,-0.63 z m -4,1.8 L 9,14.97 8.6,14.06 9.99,13.43 Z" id="path910" /></g></svg>', Ah = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M231.359 147l-80.921 205h45.155l15.593-39.5h89.628l15.593 39.5h45.155l-80.921-205zm-3.594 123.5L256 198.967l28.235 71.533z"></path><path d="M384 56H128V16H16v112h40v256H16v112h112v-40h256v40h112V384h-40V128h40V16H384zM48 96V48h48v48zm48 368H48v-48h48zm288-40H128v-40H88V128h40V88h256v40h40v256h-40zm80-8v48h-48v-48zM416 48h48v48h-48z"></path></svg>', Oh = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><g id="g718" transform="translate(0,1.2499996)"><path d="M 7.5010125,7.9560661 5.355012,10.103066 c -0.472,0.472 -1.18,-0.2360003 -0.708,-0.7080003 L 7.6470125,6.3950659 c 0.195364,-0.195858 0.512636,-0.195858 0.708,0 l 3.0000005,2.9999998 c 0.472,0.472 -0.236,1.1800003 -0.708,0.7080003 L 8.5010125,7.9560661 c -0.431103,-0.417289 -0.523896,-0.423024 -1,0 z" style="" id="path566-5" /><path d="m 7.4989873,5.5439348 -2.1460003,-2.147 c -0.472,-0.472 -1.18,0.236 -0.708,0.708 l 3.0000003,3 c 0.1953639,0.195858 0.5126361,0.195858 0.708,0 l 2.9999997,-3 c 0.472,-0.472 -0.236,-1.18 -0.708,-0.708 l -2.1459997,2.147 c -0.4311027,0.417289 -0.5238956,0.423024 -1,0 z" style="" id="path566-6-3" /></g></svg>', Nh = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><path d="m 7.4989873,7.7026182 -2.1460003,2.147 c -0.472,0.4719998 -1.18,-0.236 -0.708,-0.708 l 3.0000003,-3 c 0.1953639,-0.1958581 0.5126361,-0.1958581 0.708,0 l 2.9999997,3 c 0.472,0.472 -0.236,1.1799998 -0.708,0.708 l -2.1459997,-2.147 c -0.4311027,-0.417289 -0.5238956,-0.423024 -1,0 z" style="" id="path566-6-3" /></svg>', Dh = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><path d="m 7.4989873,8.2973819 -2.1460003,-2.147 c -0.472,-0.472 -1.18,0.236 -0.708,0.708 l 3.0000003,3 c 0.1953639,0.1958581 0.5126361,0.1958581 0.708,0 l 2.9999997,-3 c 0.472,-0.472 -0.236,-1.18 -0.708,-0.708 l -2.1459997,2.147 c -0.4311027,0.417289 -0.5238956,0.423024 -1,0 z" style="" id="path566-6-3" /></svg>', Ih = '<svg width="46.08" height="46.08" version="1.1" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"> <path d="m1 14a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-12a1 1 0 0 0-1-1h-12a1 1 0 0 0-1 1zm15 0a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-8.5-2.5a0.5 0.5 0 0 0 1 0v-5.793l2.146 2.147a0.50063 0.50063 0 1 0 0.708-0.708l-3-3a0.5 0.5 0 0 0-0.708 0l-3 3a0.50063 0.50063 0 0 0 0.708 0.708l2.146-2.147z" fill-rule="evenodd"/></svg>', Rh = '<svg width="46.08" height="46.08" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M 15,2 A 1,-1 0 0 0 14,1 H 2 A 1,-1 0 0 0 1,2 v 12 a 1,-1 0 0 0 1,1 h 12 a 1,-1 0 0 0 1,-1 z M 0,2 A 2,-2 0 0 1 2,0 h 12 a 2,-2 0 0 1 2,2 v 12 a 2,-2 0 0 1 -2,2 H 2 A 2,-2 0 0 1 0,14 Z m 8.5,2.5 a 0.5,-0.5 0 0 0 -1,0 v 5.793 L 5.354,8.146 A 0.5006316,-0.5006316 0 1 0 4.646,8.854 l 3,3 a 0.5,-0.5 0 0 0 0.708,0 l 3,-3 A 0.5006316,-0.5006316 0 0 0 10.646,8.146 L 8.5,10.293 Z" id="path2" /></svg>', kh = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><g id="g687" transform="translate(15.647255,-0.0288128)"><path d="m -8.1462425,10.484879 -2.1460005,2.146999 c -0.472,0.472 -1.18,-0.236 -0.708,-0.708 l 3.0000005,-2.9999994 c 0.195364,-0.195858 0.512636,-0.195858 0.708,0 l 3.0000005,2.9999994 c 0.472,0.472 -0.236,1.18 -0.708,0.708 l -2.1460005,-2.146999 c -0.431103,-0.417289 -0.523896,-0.423024 -1,0 z" style="" id="path566-5" /><path d="m -8.1482677,5.5727476 -2.1460003,-2.147 c -0.472,-0.472 -1.18,0.236 -0.708,0.708 l 3.0000003,3 c 0.1953639,0.195858 0.5126361,0.195858 0.708,0 l 2.9999997,-3 c 0.472,-0.472 -0.236,-1.18 -0.708,-0.708 l -2.1459997,2.147 c -0.4311027,0.417289 -0.5238956,0.423024 -1,0 z" style="" id="path566-6-3" /></g></svg>', _h = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><g id="g611" transform="translate(0.2050748,-0.8829888)"><path d="m 7.2959375,11.933818 -2.146,-2.1469999 c -0.472,-0.4719998 -1.18,0.2359999 -0.708,0.7079999 l 3,3 c 0.195364,0.195858 0.512636,0.195858 0.708,0 l 3.0000005,-3 c 0.472,-0.472 -0.236,-1.1799997 -0.708,-0.7079999 L 8.2959375,11.933818 c -0.431103,0.417289 -0.523896,0.423024 -1,0 z" style="" id="path566" /><path d="m 7.2939123,5.8321596 -2.146,2.147 c -0.4719998,0.472 -1.1799998,-0.236 -0.708,-0.708 l 3,-3 c 0.1953639,-0.195858 0.5126361,-0.195858 0.708,0 l 2.9999997,3 c 0.472,0.472 -0.236,1.18 -0.708,0.708 l -2.1459997,-2.147 c -0.4311027,-0.417289 -0.5238956,-0.423024 -1,0 z" style="" id="path566-6" /></g></svg>', Hh = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><path d="m 11.500447,8.5 c 0.666666,0 0.666666,-1 0,-1 H 4.444275 c -0.1571231,0 -0.224029,0.07336 -0.2978281,0.1459999 -0.1958579,0.195364 -0.1958579,0.5126361 0,0.7080001 0,0 0.113806,0.146 0.320186,0.146 z" style="" id="path887" /></svg>', $h = '<svg style="height:46px;width:46px" version="1.1" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"> <g fill-rule="evenodd">  <path d="m15 2c0-0.55228-0.44772-1-1-1h-12c-0.55228 0-1 0.44772-1 1v12c0 0.55228 0.44772 1 1 1h12c0.55228 0 1-0.44772 1-1zm-15 0c0-1.1046 0.89543-2 2-2h12c1.1046 0 2 0.89543 2 2v12c0 1.1046-0.89543 2-2 2h-12c-1.1046 0-2-0.89543-2-2z"/>  <path d="m4.4449 4.097c-0.01964 0-0.037678 0.0018-0.054687 0.0039-0.017011 0.0022-0.034068 0.0058-0.048828 0.0098-0.014761 4e-3 -0.028126 0.0081-0.041016 0.01367-0.012889 0.0056-0.025711 0.01268-0.037109 0.01953-0.022796 0.01371-0.041442 0.02783-0.060547 0.04492s-0.038191 0.03653-0.056641 0.05469c-0.024482 0.02442-0.046092 0.05037-0.064453 0.07813-0.018362 0.02775-0.032681 0.05776-0.044922 0.08789s-0.021223 0.06023-0.027344 0.0918c-0.00612 0.03156-0.00977 0.06366-0.00977 0.0957 0 8e-3 -4.378e-4 0.01543 0 0.02344v1.2988c0 0.02083 6.41e-5 0.04102 0.00195 0.06055 0.00189 0.01953 0.0061 0.03841 0.00977 0.05664 0.00366 0.01823 0.00836 0.03581 0.013672 0.05273 0.00531 0.01693 0.010742 0.0332 0.017578 0.04883 0.013672 0.03125 0.029785 0.0599 0.048828 0.08594s0.041016 0.04948 0.064453 0.07031 0.049316 0.03906 0.076172 0.05469c0.026855 0.01563 0.054687 0.02865 0.083984 0.03906 0.029297 0.01042 0.059082 0.01823 0.089844 0.02344 0.030762 0.0052 0.0625 0.0078 0.09375 0.0078s0.062988-0.0026 0.09375-0.0078 0.060547-0.01302 0.089844-0.02344 0.057129-0.02344 0.083984-0.03906c0.026855-0.01563 0.052734-0.03385 0.076172-0.05469 0.023437-0.02083 0.04541-0.04427 0.064453-0.07031s0.035156-0.05469 0.048828-0.08594c0.00684-0.01563 0.012268-0.0319 0.017578-0.04883s0.01001-0.0345 0.013672-0.05273c0.00366-0.01823 0.00787-0.03711 0.00977-0.05664 0.00189-0.01953 0.00195-0.03971 0.00195-0.06055v-0.82227h6v0.98633c0 0.02083 2e-3 0.04102 0.0039 0.06055s0.0042 0.03841 0.0078 0.05664c0.0037 0.01823 0.0084 0.03581 0.01367 0.05273 0.0053 0.01693 0.01074 0.0332 0.01758 0.04883 0.01367 0.03125 0.03174 0.0599 0.05078 0.08594s0.03906 0.04948 0.0625 0.07031 0.04932 0.03906 0.07617 0.05469c0.02686 0.01563 0.05469 0.02865 0.08399 0.03906 0.0293 0.01042 0.06104 0.01823 0.0918 0.02344 0.03076 0.0052 0.06055 0.0078 0.0918 0.0078s0.06299-0.0026 0.09375-0.0078 0.06055-0.01302 0.08984-0.02344c0.0293-0.01042 0.05908-0.02344 0.08594-0.03906 0.02686-0.01563 0.05078-0.03385 0.07422-0.05469 0.02344-0.02083 0.04541-0.04427 0.06445-0.07031s0.03516-0.05469 0.04883-0.08594c0.0068-0.01563 0.01422-0.0319 0.01953-0.04883 0.0053-0.01693 0.01001-0.0345 0.01367-0.05273 0.0037-0.01823 0.0059-0.03711 0.0078-0.05664s2e-3 -0.03971 2e-3 -0.06055v-1.4629c3.25e-4 -0.0078 0-0.01563 0-0.02344 0-0.03125-0.0026-0.06299-0.0078-0.09375s-0.01302-0.06055-0.02344-0.08984c-0.01042-0.0293-0.02344-0.05713-0.03906-0.08398-0.01563-0.02685-0.03385-0.05273-0.05469-0.07617-0.02083-0.02344-0.04427-0.04541-0.07031-0.06445s-0.05469-0.03516-0.08594-0.04883c-0.01563-0.0068-0.0319-0.01227-0.04883-0.01758-0.01693-0.0053-0.0345-0.01001-0.05273-0.01367-0.01823-0.0037-0.03711-0.0059-0.05664-0.0078s-0.03971-0.0039-0.06055-0.0039h-6.5z"/>  <path d="m11.555 11.903c0.01964 0 0.03768-0.0018 0.05469-0.0039 0.01701-0.0022 0.03407-0.0058 0.04883-0.0098s0.02813-0.0081 0.04102-0.01367c0.01289-0.0056 0.02571-0.01268 0.03711-0.01953 0.0228-0.01371 0.04144-0.02783 0.06055-0.04492 0.0191-0.01709 0.03819-0.03653 0.05664-0.05469 0.02448-0.02442 0.04609-0.05037 0.06445-0.07813 0.01836-0.02775 0.03268-0.05776 0.04492-0.08789s0.02122-0.06023 0.02734-0.0918c0.0061-0.03156 0.0098-0.06366 0.0098-0.0957 0-8e-3 4.38e-4 -0.01543 0-0.02344v-1.2988c0-0.02083-6.4e-5 -0.04102-2e-3 -0.06055-0.0019-0.01953-0.0061-0.03841-0.0098-0.05664s-0.0084-0.03581-0.01367-0.05273c-0.0053-0.01693-0.01074-0.0332-0.01758-0.04883-0.01367-0.03125-0.02979-0.0599-0.04883-0.08594s-0.04102-0.04948-0.06445-0.07031c-0.02344-0.02083-0.04932-0.03906-0.07617-0.05469s-0.05469-0.02865-0.08398-0.03906c-0.0293-0.01042-0.05908-0.01823-0.08984-0.02344-0.03076-0.0052-0.0625-0.0078-0.09375-0.0078s-0.06299 0.0026-0.09375 0.0078-0.06055 0.01302-0.08984 0.02344c-0.0293 0.01042-0.05713 0.02344-0.08398 0.03906-0.02685 0.01563-0.05273 0.03385-0.07617 0.05469-0.02344 0.02083-0.04541 0.04427-0.06445 0.07031s-0.03516 0.05469-0.04883 0.08594c-0.0068 0.01563-0.01227 0.0319-0.01758 0.04883-0.0053 0.01693-0.01001 0.0345-0.01367 0.05273-0.0037 0.01823-0.0079 0.03711-0.0098 0.05664s-0.0019 0.03971-0.0019 0.06055v0.82227h-6v-0.98633c0-0.02083-2e-3 -0.04102-0.0039-0.06055s-0.0042-0.03841-0.0078-0.05664c-0.0037-0.01823-0.0084-0.03581-0.01367-0.05273-0.0053-0.01693-0.01074-0.0332-0.01758-0.04883-0.01367-0.03125-0.03174-0.0599-0.05078-0.08594s-0.03906-0.04948-0.0625-0.07031-0.04932-0.03906-0.07617-0.05469c-0.02686-0.01563-0.05469-0.02865-0.08399-0.03906-0.0293-0.01042-0.06104-0.01823-0.0918-0.02344-0.03076-0.0052-0.06055-0.0078-0.0918-0.0078s-0.06299 0.0026-0.09375 0.0078-0.06055 0.01302-0.08984 0.02344c-0.0293 0.01042-0.05908 0.02344-0.08594 0.03906-0.02686 0.01563-0.05078 0.03385-0.07422 0.05469-0.02344 0.02083-0.04541 0.04427-0.06445 0.07031s-0.03516 0.05469-0.04883 0.08594c-0.0068 0.01563-0.01422 0.0319-0.01953 0.04883-0.0053 0.01693-0.01001 0.03451-0.01367 0.05273-0.0037 0.01823-0.0059 0.03711-0.0078 0.05664s-2e-3 0.03971-2e-3 0.06055v1.4629c-3.25e-4 0.0078 0 0.01563 0 0.02344 0 0.03125 0.0026 0.06299 0.0078 0.09375s0.01302 0.06055 0.02344 0.08984c0.01042 0.0293 0.02344 0.05713 0.03906 0.08398 0.01563 0.02685 0.03385 0.05273 0.05469 0.07617 0.02083 0.02344 0.04427 0.04541 0.07031 0.06445s0.05469 0.03516 0.08594 0.04883c0.01563 0.0068 0.0319 0.01227 0.04883 0.01758 0.01693 0.0053 0.0345 0.01001 0.05273 0.01367 0.01823 0.0037 0.03711 0.0059 0.05664 0.0078s0.03971 0.0039 0.06055 0.0039h6.5z"/></g></svg>', Bh = '<svg style="height:46px;width:46px" version="1.1" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"> <path d="m15 2c0-0.55228-0.44772-1-1-1h-12c-0.55228 0-1 0.44772-1 1v12c0 0.55228 0.44772 1 1 1h12c0.55228 0 1-0.44772 1-1zm-15 0c0-1.1046 0.89543-2 2-2h12c1.1046 0 2 0.89543 2 2v12c0 1.1046-0.89543 2-2 2h-12c-1.1046 0-2-0.89543-2-2z" fill-rule="evenodd"/> <path d="m13.291 7.7876c-1.0729-2.491-3.0911-4.0365-5.2687-4.0365-2.1776 0-4.1958 1.5456-5.2687 4.0365a0.53112 0.53112 0 0 0 0 0.4249c1.0729 2.491 3.0911 4.0365 5.2687 4.0365 2.1776 0 4.1959-1.5456 5.2687-4.0365a0.53112 0.53112 0 0 0 0-0.4249zm-5.2687 3.3992c-1.6836 0-3.277-1.2163-4.1958-3.1867 0.91884-1.9705 2.5122-3.1867 4.1958-3.1867 1.6837 0 3.277 1.2163 4.1959 3.1867-0.91884 1.9705-2.5122 3.1867-4.1959 3.1867zm0-5.3112a2.1245 2.1245 0 1 0 2.1245 2.1245 2.1245 2.1245 0 0 0-2.1245-2.1245zm0 3.1867a1.0622 1.0622 0 1 1 1.0622-1.0622 1.0622 1.0622 0 0 1-1.0622 1.0622z" stroke-width=".53112"/></svg>', Uh = '<svg style="height:46px;width:46px" version="1.1" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"> <path d="m15 2c0-0.55228-0.44772-1-1-1h-12c-0.55228 0-1 0.44772-1 1v12c0 0.55228 0.44772 1 1 1h12c0.55228 0 1-0.44772 1-1zm-15 0c0-1.1046 0.89543-2 2-2h12c1.1046 0 2 0.89543 2 2v12c0 1.1046-0.89543 2-2 2h-12c-1.1046 0-2-0.89543-2-2z" fill-rule="evenodd"/> <path d="m13.291 7.7876c-1.0729-2.491-3.0911-4.0365-5.2687-4.0365-2.1776 0-4.1958 1.5456-5.2687 4.0365a0.53112 0.53112 0 0 0 0 0.4249c1.0729 2.491 3.0911 4.0365 5.2687 4.0365 2.1776 0 4.1959-1.5456 5.2687-4.0365a0.53112 0.53112 0 0 0 0-0.4249zm-5.2687 3.3992c-1.6836 0-3.277-1.2163-4.1958-3.1867 0.91884-1.9705 2.5122-3.1867 4.1958-3.1867 1.6837 0 3.277 1.2163 4.1959 3.1867-0.91884 1.9705-2.5122 3.1867-4.1959 3.1867zm0-5.3112a2.1245 2.1245 0 1 0 2.1245 2.1245 2.1245 2.1245 0 0 0-2.1245-2.1245zm0 3.1867a1.0622 1.0622 0 1 1 1.0622-1.0622 1.0622 1.0622 0 0 1-1.0622 1.0622z" stroke-width=".53112"/> <path d="m12.757 3.0055c-0.11087 0.0051358-0.22696 0.051177-0.33008 0.1543l-4.9883 4.9902c-0.061946 0.061947-0.086644 0.12038-0.097656 0.17773l-4.8184 4.8164c-0.1111 0.1111-0.1066 0.2109-0.10742 0.31445-3.5e-4 0.27663 0.22337 0.50035 0.5 0.5 0 0 0.18415 0.022881 0.33008-0.12305l4.9746-4.9727c0.06758-0.06758 0.10951-0.13979 0.13281-0.21289l4.7832-4.7832c0.36828-0.36828 0.017071-0.87967-0.37891-0.86133z" fill-rule="evenodd"/></svg>', zh = '<svg class="ov-icon" width="46.08" height="46.08" version="1.1" viewBox="-1.6 -1.6 19.2 19.2"><path d="m14 15c0.55228 0 1-0.44772 1-1v-12c0-0.55228-0.44772-1-1-1h-12c-0.55228 0-1 0.44772-1 1v12c0 0.55228 0.44772 1 1 1zm0-15c1.1046 0 2 0.89543 2 2v12c0 1.1046-0.89543 2-2 2h-12c-1.1046 0-2-0.89543-2-2v-12c0-1.1046 0.89543-2 2-2z" fill-rule="evenodd"/><g transform="translate(-1.1585)" fill-rule="evenodd">  <path d="m8.2964 7.5-2.147-2.146c-0.472-0.472 0.236-1.18 0.708-0.708l3 3c0.19586 0.19536 0.19586 0.51264 0 0.708l-3 3c-0.472 0.472-1.18-0.236-0.708-0.708l2.147-2.146c0.41729-0.4311 0.42302-0.5239 0-1z"/>  <path d="m12.323 4.4996c0-0.66667-1-0.66667-1 0v7.0562c0 0.15712 0.07336 0.22403 0.146 0.29783 0.19536 0.19586 0.51264 0.19586 0.708 0 0 0 0.146-0.11381 0.146-0.32019z"/></g></svg>', Vh = '<svg class="ov-icon" width="46.08" height="46.08" version="1.1" viewBox="-1.6 -1.6 19.2 19.2"><path d="m2 15c-0.55228 0-1-0.44772-1-1v-12c0-0.55228 0.44772-1 1-1h12c0.55228 0 1 0.44772 1 1v12c0 0.55228-0.44772 1-1 1zm0-15c-1.1046 0-2 0.89543-2 2v12c0 1.1046 0.89543 2 2 2h12c1.1046 0 2-0.89543 2-2v-12c0-1.1046-0.89543-2-2-2z" fill-rule="evenodd"/><g transform="matrix(-1 0 0 1 17.159 0)" fill-rule="evenodd">  <path d="m8.2964 7.5-2.147-2.146c-0.472-0.472 0.236-1.18 0.708-0.708l3 3c0.19586 0.19536 0.19586 0.51264 0 0.708l-3 3c-0.472 0.472-1.18-0.236-0.708-0.708l2.147-2.146c0.41729-0.4311 0.42302-0.5239 0-1z"/>  <path d="m12.323 4.4996c0-0.66667-1-0.66667-1 0v7.0562c0 0.15712 0.07336 0.22403 0.146 0.29783 0.19536 0.19586 0.51264 0.19586 0.708 0 0 0 0.146-0.11381 0.146-0.32019z"/></g></svg>', Wh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 336.96 336.36" xmlns="http://www.w3.org/2000/svg"><path d="m0 0 168.48 336.36 168.48-336.36z"/></svg>', Fh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 336.96 336.36" xmlns="http://www.w3.org/2000/svg"><path d="m0 336.36 168.48-336.36 168.48 336.36z"/></svg>', Gh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m512 256c0 70.67-28.66 134.68-74.99 181.01s-110.34 74.99-181.01 74.99c-70.68 0-134.69-28.66-181.01-74.99-46.33-46.33-74.99-110.34-74.99-181.01 0-70.68 28.66-134.69 74.99-181.01 46.32-46.33 110.33-74.99 181.01-74.99 70.67 0 134.68 28.66 181.01 74.99 46.33 46.32 74.99 110.33 74.99 181.01zm-204.29-21.97v-67.04c0-7.53-6.19-13.72-13.73-13.72h-75.96c-7.53 0-13.72 6.17-13.72 13.72v67.03h-42.84c-16.5 0-24.78 19.64-13.86 31.54l94.74 110.57c7.44 9 21.03 9.01 28.66 0.37l93.71-111.31c10.69-12.27 1.64-31.14-14.19-31.16h-42.81zm105.52 179.2c40.22-40.24 65.11-95.84 65.11-157.23 0-61.4-24.89-117-65.11-157.23-40.24-40.23-95.84-65.11-157.23-65.11-61.4 0-117 24.88-157.23 65.11s-65.11 95.83-65.11 157.23c0 61.39 24.88 116.99 65.11 157.23 40.23 40.22 95.83 65.11 157.23 65.11 61.39 0 116.99-24.89 157.23-65.11z" fill-rule="nonzero"/></svg>', qh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m512 256c0-70.67-28.66-134.68-74.99-181.01s-110.34-74.99-181.01-74.99c-70.68 0-134.69 28.66-181.01 74.99-46.33 46.33-74.99 110.34-74.99 181.01 0 70.68 28.66 134.69 74.99 181.01 46.32 46.33 110.33 74.99 181.01 74.99 70.67 0 134.68-28.66 181.01-74.99 46.33-46.32 74.99-110.33 74.99-181.01zm-204.29 21.97v67.04c0 7.53-6.19 13.72-13.73 13.72h-75.96c-7.53 0-13.72-6.17-13.72-13.72v-67.03h-42.84c-16.5 0-24.78-19.64-13.86-31.54l94.74-110.57c7.44-9 21.03-9.01 28.66-0.37l93.71 111.31c10.69 12.27 1.64 31.14-14.19 31.16zm105.52-179.2c40.22 40.24 65.11 95.84 65.11 157.23 0 61.4-24.89 117-65.11 157.23-40.24 40.23-95.84 65.11-157.23 65.11-61.4 0-117-24.88-157.23-65.11s-65.11-95.83-65.11-157.23c0-61.39 24.88-116.99 65.11-157.23 40.23-40.22 95.83-65.11 157.23-65.11 61.39 0 116.99 24.89 157.23 65.11z" fill-rule="nonzero"/></svg>', Yh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M512 256c0-70.67-28.66-134.68-74.98-181.02C390.69 28.66 326.68 0 256 0S121.31 28.66 74.98 74.98C28.66 121.32 0 185.33 0 256c0 70.68 28.66 134.69 74.98 181.02C121.31 483.34 185.32 512 256 512c70.67 0 134.69-28.66 181.02-74.98C483.34 390.69 512 326.68 512 256zm-160.23-21.5h-43.38v-67.93c0-7.63-6.27-13.9-13.91-13.9H217.5c-7.62 0-13.9 6.25-13.9 13.9v67.92h-43.41c-16.71 0-25.11 19.9-14.05 31.96l96.01 112.05c7.54 9.12 21.31 9.12 29.04.37l94.96-112.8c10.83-12.43 1.66-31.55-14.38-31.57z"/></svg>', Xh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m512 256c0 70.67-28.66 134.68-74.98 181.02-46.33 46.32-110.34 74.98-181.02 74.98s-134.69-28.66-181.02-74.98c-46.32-46.34-74.98-110.35-74.98-181.02 0-70.68 28.66-134.69 74.98-181.02 46.33-46.32 110.34-74.98 181.02-74.98 70.67 0 134.69 28.66 181.02 74.98 46.32 46.33 74.98 110.34 74.98 181.02zm-160.23 21.5h-43.38v67.93c0 7.63-6.27 13.9-13.91 13.9h-76.98c-7.62 0-13.9-6.25-13.9-13.9v-67.92h-43.41c-16.71 0-25.11-19.9-14.05-31.96l96.01-112.05c7.54-9.12 21.31-9.12 29.04-0.37l94.96 112.8c10.83 12.43 1.66 31.55-14.38 31.57z"/></svg>', jh = '<svg width="800px" height="800px" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">  <defs>   <clipPath id="clipPath1">    <path d="m6.1885 15.281v-9.0209h3.1721q1.0764 0 1.6765 0.65299 0.63822 0.71345 0.63822 1.7171 0 0.58043-0.22862 1.0158-0.21909 0.42323-0.743 0.84646 1.1812 0.87065 1.1812 2.1887 0 0.53206-0.19051 1.0762-0.19051 0.53206-0.51439 0.87065-0.60964 0.65299-1.7908 0.65299zm1.467-7.4731v2.0315h1.5813q1.0383 0 1.0383-1.0158 0-1.0158-1.0383-1.0158zm0 3.5793v2.3459h1.7432q1.0859 0 1.0859-1.1609 0-1.185-1.0859-1.185zm9.6876-5.1271h1.467v6.1066q0 1.4874-0.69538 2.2854-0.80016 0.91902-2.1242 0.91902t-2.1242-0.91902q-0.69538-0.79809-0.69538-2.2854v-6.1066h1.4574v6.1066q0 1.6083 1.3622 1.6083 1.3526 0 1.3526-1.6083zm6.2108 5.6834v3.3375h-1.467v-3.3375l-2.3528-5.6834h1.6289l1.4479 3.9784 1.3622-3.9784h1.6384z" display="none" stroke-width=".041213" style="white-space:pre" aria-label="BUY"/>    <path class="powerclip" d="m-5-5h42v42.001h-42zm11.189 20.281h3.2006q1.1812 0 1.7908-0.65299 0.32387-0.33859 0.51439-0.87065 0.19051-0.54416 0.19051-1.0762 0-1.3181-1.1812-2.1887 0.52391-0.42323 0.743-0.84646 0.22862-0.43532 0.22862-1.0158 0-1.0037-0.63822-1.7171-0.60012-0.65299-1.6765-0.65299h-3.1721zm1.467-7.4731v2.0315h1.5813q1.0383 0 1.0383-1.0158 0-1.0158-1.0383-1.0158zm0 3.5793v2.3459h1.7432q1.0859 0 1.0859-1.1609 0-1.185-1.0859-1.185zm9.6876-5.1271v6.1066q0 1.6083-1.3526 1.6083-1.3622 0-1.3622-1.6083v-6.1066h-1.4574v6.1066q0 1.4874 0.69538 2.2854 0.80016 0.91902 2.1242 0.91902t2.1242-0.91902q0.69538-0.79809 0.69538-2.2854v-6.1066zm6.2108 5.6834 2.2576-5.6834h-1.6384l-1.3622 3.9784-1.4479-3.9784h-1.6289l2.3528 5.6834v3.3375h1.467z" stroke-width=".041213" style="white-space:pre"/>   </clipPath>  </defs>  <g clip-path="url(#clipPath1)" fill="none" fill-rule="evenodd">   <g id="Icon-Set" transform="translate(-360 -255)" fill="#000">    <path d="m386.67 255h-21.334c-2.945 0-5.333 2.371-5.333 5.297v12.33c0 2.924 2.055 4.813 5 4.813h6.639l4.361 9.561 4.361-9.561h6.639c2.945 0 5-1.889 5-4.813v-12.33c0-2.926-2.388-5.297-5.333-5.297z"/>   </g>  </g> </svg>', Kh = '<svg width="800px" height="800px" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">  <defs>   <clipPath id="clipPath4">    <path d="m10.026 8.6238h-1.2531q-0.06962-1.4148-1.3576-1.4148-0.51344 0-0.81803 0.30231-0.30458 0.30231-0.30458 0.81019 0 0.49579 0.25237 0.74972 0.26107 0.24185 0.97467 0.43532l1.0182 0.26603q0.90505 0.24185 1.3054 0.83437 0.40901 0.59252 0.40901 1.6566 0 1.3785-0.7049 2.1524-0.69619 0.77391-1.958 0.77391-1.2444 0-1.9406-0.76182-0.68749-0.77391-0.74841-2.225h1.2967q0.03481 0.72554 0.40901 1.1125t1.053 0.38696q0.60917 0 0.95727-0.32649 0.3568-0.32649 0.3568-0.89483 0-0.54416-0.27848-0.83437-0.27848-0.30231-0.94856-0.4716l-0.90505-0.25394q-0.99208-0.26603-1.4098-0.81019-0.41772-0.55625-0.41772-1.6083 0-1.3181 0.64398-2.0436 0.65268-0.73763 1.8188-0.73763 1.4185 0 2.0886 1.0278 0.46123 0.71345 0.46123 1.8743zm2.5672 2.3822v2.3459h3.5245v1.5478h-4.8559v-9.0209h4.6993v1.5478h-3.3678v2.0315h3.1155v1.5478zm5.9612-5.1271v7.4731h3.1068v1.5478h-4.4469v-9.0209zm5.439 0v7.4731h3.1068v1.5478h-4.4469v-9.0209z" display="none" stroke-width=".039392" style="white-space:pre" aria-label="SELL"/>    <path class="powerclip" d="m-5-5h42v42.001h-42zm15.026 13.624q0-1.1609-0.46123-1.8743-0.67009-1.0278-2.0886-1.0278-1.1661 0-1.8188 0.73763-0.64398 0.72554-0.64398 2.0436 0 1.052 0.41772 1.6083 0.41772 0.54416 1.4098 0.81019l0.90505 0.25394q0.67009 0.16929 0.94856 0.4716 0.27848 0.29022 0.27848 0.83437 0 0.56834-0.3568 0.89483-0.3481 0.32649-0.95727 0.32649-0.67879 0-1.053-0.38696-0.3742-0.38695-0.40901-1.1125h-1.2967q0.060917 1.4511 0.74841 2.225 0.69619 0.76182 1.9406 0.76182 1.2619 0 1.958-0.77391 0.7049-0.77391 0.7049-2.1524 0-1.0641-0.40901-1.6566-0.40031-0.59252-1.3054-0.83437l-1.0182-0.26603q-0.7136-0.19348-0.97467-0.43532-0.25237-0.25394-0.25237-0.74972 0-0.50788 0.30458-0.81019t0.81803-0.30231q1.288 0 1.3576 1.4148zm2.5672 2.3822h3.1155v-1.5478h-3.1155v-2.0315h3.3678v-1.5478h-4.6993v9.0209h4.8559v-1.5478h-3.5245zm5.9612-5.1271h-1.3402v9.0209h4.4469v-1.5478h-3.1068zm5.439 0h-1.3402v9.0209h4.4469v-1.5478h-3.1068z" stroke-width=".039392" style="white-space:pre"/>   </clipPath>  </defs>  <path d="m26.667 0h-21.334c-2.945 0-5.333 2.371-5.333 5.297v12.33c0 2.924 2.055 4.813 5 4.813h6.639l4.361 9.561 4.361-9.561h6.639c2.945 0 5-1.889 5-4.813v-12.33c0-2.926-2.388-5.297-5.333-5.297z" clip-path="url(#clipPath4)" fill-rule="evenodd"/> </svg>', Zh = '<svg width="493px" height="512px" clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 493 511.77" xmlns="http://www.w3.org/2000/svg"><path d="m33.11 458.2 104.5-79.1c3.09-3 7.08-4.47 11.08-4.45l302.6-0.08c2.67 0 5.09-1.08 6.78-2.77 1.74-1.81 2.84-4.24 2.84-6.87v-323.2c0-2.59-1.12-5-2.86-6.74-1.78-1.78-4.2-2.9-6.76-2.9h-409.56c-2.54 0-4.94 1.14-6.72 2.92s-2.92 4.18-2.92 6.72c0 793.72 1.02 39.329 1.02 416.47zm90.6-229.77c10.9 0 19.74 8.85 19.74 19.74s-8.84 19.73-19.74 19.73c-10.89 0-19.73-8.84-19.73-19.73s8.84-19.74 19.73-19.74zm0-101.14c10.9 0 19.74 8.85 19.74 19.74s-8.84 19.74-19.74 19.74c-10.89 0-19.73-8.85-19.73-19.74s8.84-19.74 19.73-19.74zm61.72 138.89c-9.95 0-18.02-8.07-18.02-18.01 0-9.95 8.07-18.02 18.02-18.02h185.56c9.95 0 18.01 8.07 18.01 18.02 0 9.94-8.06 18.01-18.01 18.01zm0-101.13c-9.95 0-18.02-8.07-18.02-18.02 0-9.94 8.07-18.01 18.02-18.01h185.56c9.95 0 18.01 8.07 18.01 18.01 0 9.95-8.06 18.02-18.01 18.02zm-30.38 241.61-125.97 99.69c-2.96 3.32-7.24 5.42-12.01 5.42-8.85 0-17.07-7.1228-17.07-15.963v-454.08c0-11.4 4.77-21.88 12.31-29.42s18.02-12.31 29.42-12.31h409.56c11.4 0 21.9 4.74 29.45 12.29 7.5 7.51 12.26 17.96 12.26 29.44v323.2c0 11.48-4.7 21.95-12.24 29.49-7.61 7.54-18.05 12.24-29.47 12.24z" fill-rule="nonzero"/></svg>', Qh = '<svg width="800px" height="800px" fill="none" version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m15.746 2.7281c-5.1207-2.0689-10.949 0.40512-13.018 5.5258-2.0689 5.1207 0.40512 10.949 5.5258 13.018 5.1207 2.0689 10.949-0.40508 13.018-5.5258 2.0689-5.1207-0.40508-10.949-5.5258-13.018zm-1.3378 8.3035-1.2703-0.51325c-0.21854-0.08829-0.32785-0.13246-0.3683-0.22775-0.04045-0.09529 0.0037-0.20461 0.09201-0.42314l1.6595-4.1073c0.33362-0.82575 0.50047-1.2387 0.33474-1.3523-0.16582-0.11359-0.49058 0.19103-1.1403 0.8003l-4.7426 4.4469c-1.0274 0.96338-1.541 1.445-1.4405 1.9835 0.10054 0.53837 0.75347 0.80216 2.0594 1.3298l1.2703 0.51325c0.21854 0.08829 0.32785 0.13246 0.3683 0.22775 0.04045 0.09529-0.0037 0.20461-0.09201 0.42314l-1.6595 4.1073c-0.33365 0.82582-0.50047 1.2387-0.33475 1.3523 0.16582 0.1136 0.49059-0.19104 1.1403-0.80025l4.7425-4.4469c1.0275-0.96346 1.5411-1.4451 1.4406-1.9836-0.10057-0.53838-0.75352-0.80218-2.0594-1.3298z" clip-rule="evenodd" fill-rule="evenodd"/></svg>', Jh = '<svg enable-background="new 0 0 100 100" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">  <g>   <rect transform="scale(-1)" x="-15" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-36.25" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.1s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-57.5" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.3s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-78.75" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.5s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-100" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.1s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>  </g> </svg>', ec = '<svg version="1.1" id="L7" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">   <path fill="#fff" d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7  c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z">      <animateTransform         attributeName="transform"         attributeType="XML"         type="rotate"         dur="3s"         from="0 50 50"         to="360 50 50"         repeatCount="indefinite" />  </path> <path fill="#fff" d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5  L82,35.7z">      <animateTransform         attributeName="transform"         attributeType="XML"         type="rotate"         dur="2s"         from="0 50 50"         to="360 50 50"         repeatCount="indefinite" />  </path>   <path fill="#fff" d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3  c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z">      <animateTransform         attributeName="transform"         attributeType="XML"         type="rotate"         dur="1s"         from="0 50 50"         to="360 50 50"         repeatCount="indefinite" />  </path></svg>', Ve = 300, Wt = 400, tc = `${Wt}px`, so = `${Ve}px`, no = "100%", ro = "100%", ze = 30, nt = 35, Ni = 25, oo = 25, Cs = Ni + oo, Xt = 60, gt = "normal", yt = 12, ts = "normal", vt = "Avenir, Helvetica, Arial, sans-serif", js = "#141414", Ks = "#333", Zs = "#cccccc", jt = "#888888", Ct = "#cccccc", ao = "25px", ic = "position: relative;", H = {
  COLOUR_BG: js,
  COLOUR_BORDER: Ks,
  COLOUR_TXT: Zs,
  COLOUR_ICON: jt,
  COLOUR_ICONHOVER: Ct,
  BORDER_THICKNESS: 0,
  FONTWEIGHT: gt,
  FONTSIZE: yt,
  FONTSTYLE: ts,
  FONTFAMILY: vt,
  FONT: `${ts} ${yt}px ${gt} ${vt}`,
  FONTSTRING: `font-style: ${ts}; font-size: ${yt}px; font-weight: ${gt}; font-family: ${vt};`
}, Ce = {
  fontSize: yt,
  fontWeight: gt,
  fontFamily: vt,
  paddingLeft: 3,
  paddingRight: 3,
  paddingTop: 2,
  paddingBottom: 2,
  borderWidth: 1,
  txtCol: "#000000",
  bakCol: "#cccccc",
  stroke: "#ffffff",
  fill: "#888888"
}, je = {
  COLOUR_ICON: jt,
  COLOUR_ICONHOVER: Ct,
  ICONSIZE: ao
}, wt = {
  COLOUR_ICON: jt,
  COLOUR_ICONHOVER: Ct,
  ICONSIZE: ao
}, is = {
  COLOUR_BG: js,
  COLOUR_BORDER: Ks,
  COLOUR_TXT: Zs
}, it = {
  COLOUR_BG: js,
  COLOUR_BORDER: Ks,
  COLOUR_TXT: Zs,
  SHADOW: "rgb(0,0,0) 0px 20px 30px -10px",
  CONTENT: "padding: 1em",
  TITLE: "padding: 2px 1em 5px; background: #333; white-space: nowrap;"
}, sc = {
  FILL: Ct + "88"
}, Z = {
  CANDLE_SOLID: "candle_solid",
  CANDLE_HOLLOW: "candle_hollow",
  CANDLE_UP_HOLLOW: "candle_up_hollow",
  CANDLE_DOWN_HOLLOW: "candle_down_hollow",
  OHLC: "ohlc",
  AREA: "area",
  LINE: "line"
}, mi = {
  COLOUR_CANDLE_UP: "#00F04088",
  COLOUR_CANDLE_DN: "#F0004088",
  COLOUR_WICK_UP: "#0F4",
  COLOUR_WICK_DN: "#F04"
}, Ci = {
  COLOUR_VOLUME_UP: "#00F04044",
  COLOUR_VOLUME_DN: "#F0004044",
  ONCHART_VOLUME_HEIGHT: 15
}, nc = 1.75, ar = gt, Ti = yt, Si = vt, Ae = {
  COLOUR_TICK: "#888",
  COLOUR_LABEL: "888",
  COLOUR_CURSOR: "#000",
  COLOUR_CURSOR_BG: "#CCC",
  FONTFAMILY: Si,
  FONTSIZE: Ti,
  FONTWEIGHT: ar,
  FONT_LABEL: `${ar} ${Ti}px ${Si}`,
  FONT_LABEL_BOLD: `bold ${Ti}px ${Si}`
}, lr = gt, hr = yt, cr = vt, tt = {
  COLOUR_TICK: "#888",
  COLOUR_LABEL: "888",
  COLOUR_CURSOR: "#000",
  COLOUR_CURSOR_BG: "#CCC",
  FONTFAMILY: cr,
  FONTSIZE: hr,
  FONTWEIGHT: lr,
  FONT_LABEL: `${lr} ${hr}px ${cr}`,
  FONT_LABEL_BOLD: `bold ${Ti}px ${Si}`
}, lo = {
  COLOUR_GRID: "#222"
}, rc = {
  width: 1,
  stroke: "#ccc",
  dash: [1, 1]
}, ss = {
  text: H.FONTSTRING,
  font: H.FONT,
  colour: H.COLOUR_TXT
}, pi = {
  ACTIVE: "#888888C0",
  IDLE: "#FFFFFF00",
  LINE: H.COLOUR_BORDER,
  STYLE: "1px solid"
}, oc = {
  FONTSIZE: 50,
  FONTWEIGHT: "bold",
  FONTFAMILY: H.FONTFAMILY,
  COLOUR: "#181818",
  IMGWIDTH: "200",
  IMGHEIGHT: "200"
}, ac = {
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
}, ns = { arrowDown: Wh, arrowUp: Fh, arrowDownRound: Gh, arrowUpRound: qh, arrowDownRoundSolid: Yh, arrowUpRoundSolid: Xh, buySolid: jh, sellSolid: Kh }, ur = { noteSolid: Zh, lightning: Qh }, Bi = {
  candle: {
    Type: Z.CANDLE_SOLID,
    UpBodyColour: mi.COLOUR_CANDLE_UP,
    UpWickColour: mi.COLOUR_WICK_UP,
    DnBodyColour: mi.COLOUR_CANDLE_DN,
    DnWickColour: mi.COLOUR_WICK_DN
  },
  volume: {
    Height: Ci.ONCHART_VOLUME_HEIGHT,
    UpColour: Ci.COLOUR_VOLUME_UP,
    DnColour: Ci.COLOUR_VOLUME_DN
  },
  xAxis: {
    colourTick: tt.COLOUR_TICK,
    colourLabel: tt.COLOUR_LABEL,
    colourCursor: tt.COLOUR_CURSOR,
    colourCursorBG: tt.COLOUR_CURSOR_BG,
    fontFamily: tt.FONTFAMILY,
    fontSize: tt.FONTSIZE,
    fontWeight: tt.FONTWEIGHT,
    line: "#656565",
    slider: "#555555",
    handle: "#55555588",
    icon: jt,
    iconHover: Ct
  },
  yAxis: {
    colourTick: Ae.COLOUR_TICK,
    colourLabel: Ae.COLOUR_LABEL,
    colourCursor: Ae.COLOUR_CURSOR,
    colourCursorBG: Ae.COLOUR_CURSOR_BG,
    fontFamily: Ae.FONTFAMILY,
    fontSize: Ae.FONTSIZE,
    fontWeight: Ae.FONTWEIGHT,
    line: "#656565"
  },
  chart: {
    Background: H.COLOUR_BG,
    BorderColour: H.COLOUR_BORDER,
    BorderThickness: H.BORDER_THICKNESS,
    TextColour: H.COLOUR_TXT,
    FontWeight: H.FONTWEIGHT,
    FontSize: H.FONTSIZE,
    FontStyle: H.FONTSTYLE,
    FontFamily: H.FONTFAMILY,
    Font: H.FONT,
    FontString: H.FONTSTRING,
    GridColour: lo.COLOUR_GRID
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
    font: ss.font,
    colour: "#96a9db",
    handleColour: "#586ea6"
  },
  legend: {
    font: ss.font,
    colour: ss.colour,
    controls: !0,
    controlsColour: "#aaa",
    controlsOver: "#fff",
    controlsW: 18,
    controlsH: 18
  },
  icon: {
    colour: jt,
    hover: Ct
  },
  divider: {
    active: pi.ACTIVE,
    idle: pi.IDLE,
    line: pi.LINE,
    style: pi.STYLE
  },
  window: it,
  watermark: oc,
  trades: {
    iconBuy: ns.arrowUp,
    iconSell: ns.arrowDown,
    iconHeight: 30,
    iconWidth: 30,
    iconMinDim: 10,
    buyColour: "#0f0",
    sellColour: "#f00",
    defaultIcons: ns,
    offset: 10
  },
  events: {
    iconEvent: ur.lightning,
    iconHeight: 30,
    iconWidth: 30,
    iconMinDim: 10,
    iconColour: "#ccc",
    defaultIcons: ur,
    offset: 10
  },
  drawing: {
    node: ac
  }
}, lc = `
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
</style>`, hc = `
<style>
  tradex-chart {
    display: flex;
    width: var(--txc-width, 100%);
    height: var(--txc-height, 100%);
    min-width: var(--txc-min-width, ${tc});
    min-height: var(--txc-min-height, ${so});
    max-width: var(--txc-max-width, ${no});
    max-height: var(--txc-max-height, ${ro});
    overflow: hidden;
    background: var(--txc-background, ${H.COLOUR_BG});
    font: var(--txc-font, ${H.FONT});
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
`, rs = "Empty", cc = {
  id: void 0,
  title: rs,
  symbol: rs,
  width: no,
  height: ro,
  utils: {},
  tools: {},
  timeFrame: "1m",
  range: {
    startTS: void 0
  },
  theme: Bi,
  watermark: {
    display: !1,
    text: rs
  },
  trades: {
    display: !0,
    displayInfo: !0
  },
  precision: us,
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
function uc(o, e) {
  return o = Math.ceil(o) + 1, e = Math.floor(e), Math.floor(Math.random() * (e - o) + o);
}
function Ts(o) {
  const e = {};
  return e.value = o, e.sign = !!o, e.integers = ho(o), e.decimals = co(o), e.total = e.integers + e.decimals, e;
}
function ho(o) {
  return (Math.log10((o ^ o >> 31) - (o >> 31)) | 0) + 1;
}
function dc(o) {
  return o | 0;
}
function de(o, e = 0) {
  var i = o * Math.pow(10, e), s = Math.round(i), n = (i > 0 ? i : -i) % 1 === 0.5 ? s % 2 === 0 ? s : s - 1 : s;
  return n / Math.pow(10, e);
}
function co(o) {
  if (typeof o != "number" && (o = parseFloat(o)), isNaN(o) || !isFinite(o))
    return 0;
  for (var e = 1, i = 0; Math.round(o * e) / e !== o && (e *= 10, e !== 1 / 0); )
    i++;
  return i;
}
function Ss(o, e = us) {
  let { sign: i, integers: s, decimals: n, value: r } = o;
  e = isNaN(e) ? us : e, n = n > e ? e : n, r = new Number(r).toFixed(n);
  let a = `${r}`, l = "", h = 0, m = 0;
  return i = i ? 0 : 1, i > 0 && (l += "-", h++), s == 0 ? (l += "0", h++) : (l += a.slice(h, s), h += s), n != 0 && (l += `${a.slice(h)}`, s <= 1 ? m = n : s > 3 ? m = 2 : s >= 2 && (m = 4)), l = Number.parseFloat(l).toFixed(m), l;
}
function mc(o) {
  return Math.log(o) / Math.log(10);
}
function k(o, e, i) {
  return Math.min(i, Math.max(e, o));
}
class uo {
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
  float2Int(e) {
    return dc(e);
  }
  numDigits(e) {
    return ho(e);
  }
  countDigits(e) {
    return Ts(e);
  }
  precision(e) {
    return co(e);
  }
}
class Ei extends uo {
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
    return de(this.core.Chart.layerWidth / this.candleW);
  }
  get xAxisRatio() {
    return this.width / this.range.rangeDuration;
  }
  set xAxisTicks(e) {
    this.#e = x(e) ? e : 0;
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
    return de(this.range.rangeIndex(e) * this.candleW + this.candleW * 0.5);
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
    let i = this.range.indexStart, s = de(e / this.candleW);
    return i + s;
  }
  pixelOHLCV(e) {
    let i = this.pixel2Index(e);
    return this.range.value(i);
  }
  xPosSnap2CandlePos(e) {
    let i = e % this.candleW, s = i ? this.candleW / 2 : 0;
    return de(e - i + s);
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
    }, s = Us(e.rangeDuration);
    i.units = s;
    for (let f in s)
      if (s[f] > 0) {
        i.units = [f, f], i.timeSpan = `${s[f]} ${f}`;
        break;
      }
    const n = e.interval, { xStep: r, rank: a } = this.xStep(e), l = this.pixel2T(this.width) + r;
    let h = e.timeMin - e.timeMin % r - r, m = h;
    for (; h < l; ) {
      let f = bi(h, "years"), v = bi(h, "months"), T = bi(h, "days");
      !(f in i.entries) && f >= m ? i.entries[f] = [this.dateTimeValue(f, n, a), this.t2Pixel(f), f, "major"] : !(v in i.entries) && v >= m ? i.entries[v] = [this.dateTimeValue(v, n, a), this.t2Pixel(v), v, "major"] : !(T in i.entries) && T >= m && (i.entries[T] = [this.dateTimeValue(T, n, a), this.t2Pixel(T), T, "major"]), i.entries[h] = [this.dateTimeValue(h, n, a), this.t2Pixel(h), h, "minor"], h += r;
    }
    return i.values = Object.values(i.entries), i;
  }
  xStep(e) {
    let i = wh, s = this.#i ? e.interval : 1, n = $t[0], r = de(this.width / e.Length), a = ys[0], l = $t.indexOf(s);
    for (; l-- >= 0 && !(r * ($t[l] / s) >= i); )
      ;
    return n = $t[l], a = ys[l], { xStep: n, rank: a };
  }
  dateTimeValue(e, i, s) {
    if (e / $ % 1 === 0) {
      const n = Fs(e);
      return n === 1 ? Gs(e) === 0 ? Jr(e) : Zr(e) : n;
    } else
      switch (s) {
        case "milliseconds":
          return bs(e);
        case "seconds":
          return bs(e);
        case "minutes":
          return ws(e);
        case "hours":
          return ws(e);
      }
  }
}
class Ft extends uo {
  #e;
  #t;
  #i;
  #n = Ne[0];
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
  #o = 1.04;
  #l = Jn;
  #a = vh;
  #h = 3;
  #c;
  #d;
  #u;
  constructor(e, i, s = Ne[0], n) {
    super(e), this.#i = i, this.#t = e, this.#e = e.parent, this.yAxisType = s, n = n || this.core.range, this.setRange(n);
  }
  get chart() {
    return this.#i;
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
    this.#o = e;
  }
  get yAxisPadding() {
    return this.#o;
  }
  set yAxisType(e) {
    this.#n = Ne.includes(e) ? e : Ne[0];
  }
  get yAxisType() {
    return this.#n;
  }
  set yAxisStep(e) {
    this.#l = x(e) ? e : Jn;
  }
  get yAxisStep() {
    return this.#l;
  }
  set yAxisTicks(e) {
    this.#h = x(e) ? e : 0;
  }
  get yAxisTicks() {
    return this.#h;
  }
  get yAxisGrads() {
    return this.#c;
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
    return this.#s;
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
        return de(this.p100toPixel(e));
      case "log":
        return de(this.$2Pixel(mc(e)));
      default:
        return de(this.$2Pixel(e));
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
    const i = this.#r;
    return this.mode == "automatic" && e == "manual" ? (i.manual.zoom = 0, i.manual.max = this.#u.valueMax, i.manual.min = this.#u.valueMin, this.#s = e, this.core.emit("yaxis_setmode", { mode: e, axis: this })) : this.mode == "manual" && e == "automatic" && (i.manual.zoom = 0, this.#s = e, this.core.emit("yaxis_setmode", { mode: e, axis: this })), !0;
  }
  setOffset(e) {
    if (!x(e) || e == 0 || this.#s !== "manual")
      return !1;
    const i = this.#r;
    let s = this.pixel2$(e * -1), n = this.pixel2$(this.height - e), r = s - n;
    i.manual.min = n, i.manual.max = s, i.manual.mid = r / 2, i.manual.diff = r, i.manual.zoom = 0;
  }
  setZoom(e) {
    if (!x(e) || this.#s !== "manual")
      return !1;
    const i = this.#r;
    let s = i.manual.min, n = i.manual.max;
    const r = n - s, a = r * 0.01, l = e * a;
    s -= l, n += l, !(n < s || s <= 1 / 0 * -1 || n >= 1 / 0) && (i.manual.max = n, i.manual.min = s, i.manual.mid = r / 2, i.manual.diff = r, i.manual.zoom = l, this.calcGradations());
  }
  setRange(e) {
    this.#r.automatic.range = e, this.#u = new Proxy(e, {
      get: (i, s) => {
        const n = this.#s, r = this.#r;
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
        e = this.#u.max > -10 ? this.#u.max : 110, i = this.#u.min > -10 ? this.#u.min : -10, s = this.#u.offset, this.#c = this.gradations(e + s, i + s);
        break;
      default:
        e = this.#u.max > 0 ? this.#u.max : 1, i = this.#u.min > 0 ? this.#u.min : 0, s = this.#u.offset, this.#c = this.gradations(e + s, i + s);
        break;
    }
    return this.#c;
  }
  gradations(e, i, s = !0) {
    let n;
    const r = [];
    let a = this.niceNumber();
    var l = Math.ceil(i / a) * a, h = Math.floor(e / a) * a;
    let m = this.height, f = (h - l) / a;
    this.height / f;
    let v = this.countDigits(a), T;
    this.#d = v;
    for (var E = l; E <= h; E += a)
      n = this.countDigits(E), T = Ss(n, v.decimals), m = this.yPos(T), r.push([T, m, n]);
    return r;
  }
  niceNumber(e = this.rangeH) {
    const i = e / (this.height / (this.core.theme.yAxis.fontSize * nc));
    let s = Math.pow(10, Math.ceil(Math.log10(i)));
    return i < 0.25 * s ? s = 0.25 * s : i < 0.5 * s && (s = 0.5 * s), s;
  }
}
function Qs(o, e) {
  return Math.round(o.measureText(e).width);
}
function St(o = Ce.fontSize, e = Ce.fontWeight, i = Ce.fontFamily) {
  return `${e} ${o}px ${i}`;
}
function Ui(o, e, i) {
  o.font = St(i?.fontSize, i?.fontWeight, i?.fontFamily);
  const s = Qs(o, e), n = i?.paddingLeft || 0, r = i?.paddingRight || 0, a = i?.borderWidth || 0;
  return n + r + s + a * 2;
}
function zi(o) {
  const e = o?.paddingTop || 0, i = o?.paddingBottom || 0, s = o?.borderWidth || 0, n = o?.fontSize || 0;
  return e + i + n + s * 2;
}
function mo(o, e, i, s) {
  o.fillStyle = s?.colour, o.font = St(s?.fontSize, s?.fontWeight, s?.fontFamily), o.textAlign = s?.textAlign || "start", o.textBaseline = s?.textBaseLine || "alphabetic", o.direction = s?.direction || "inherit", o.lineWidth = s?.width, o.strokeStyle = s?.border, s?.stroke ? o.strokeText(s?.text, e, i, s?.max) : o.fillText(s?.text, e, i, s?.max);
}
function Tt(o, e, i, s, n) {
  o.save(), o.font = St(n?.fontSize, n?.fontWeight, n?.fontFamily), o.textBaseline = "top", o.fillStyle = n?.bakCol || Ce.bakCol;
  let r = n?.width || Ui(o, e, n), a = n?.height || zi(n);
  o.fillRect(i, s, r, a), o.fillStyle = n?.txtCol || Ce.txtCol, i = i + n?.paddingLeft, s = s + n?.paddingTop, o.fillText(`${e}`, i, s), o.restore();
}
function po(o, e, i, s, n, r) {
  o.lineWidth = r?.width || Ce.borderWidth, o.strokeStyle = r?.border || Ce.stroke, o.beginPath(), o.rect(e, i, s, n), o.stroke();
}
function Js(o, e, i, s, n, r) {
  o.fillStyle = r?.fill || Ce.fill, o.fillRect(e, i, s, n);
}
function pc(o, e, i, s, n, r) {
  C(r.fill) && Js(o, e, i, s, n, r), x(r.width) && r.width > 0 && po(o, e, i, s, n, r);
}
function fo(o, e, i, s, n, r, a) {
  o.lineWidth = a?.width || Ce.borderWidth, o.strokeStyle = a?.border || Ce.stroke, yo(o, e, i, s, n, r), o.stroke();
}
function go(o, e, i, s, n, r, a) {
  o.fillStyle = a?.fill || Ce.fill, yo(o, e, i, s, n, r), o.fill();
}
function yo(o, e, i, s, n, r) {
  o.beginPath(), o.moveTo(e + r, i), o.arcTo(e + s, i, e + s, i + n, r), o.arcTo(e + s, i + n, e, i + n, r), o.arcTo(e, i + n, e, i, r), o.arcTo(e, i, e + s, i, r), o.closePath();
}
function fc(o, e, i, s, n, r, a) {
  C(a.fill) && go(o, e, i, s, n, r, a?.fill), x(a.width) && a.width > 0 && fo(o, e, i, s, n, r, a?.border, a?.width);
}
function mt(o, e = [], i = []) {
  let [s, n, r, a] = e;
  const l = o.createLinearGradient(s, n, r, a);
  let h = 0;
  for (let m of i)
    l.addColorStop(h++, m);
  o.fillStyle = l;
}
function ht(o, e, i, s) {
  C(e) && (o.fillStyle = e, o.fill()), x(s) && s > 0 && (o.lineWidth = s, o.strokeStyle = i || Ce.stroke, o.stroke());
}
function vo(o, e, i, s, n, r, a) {
  if (!(n < 3)) {
    var l = Math.PI * 2 / n;
    o.beginPath(), o.translate(e, i), o.rotate(r * Math.PI / 180), o.moveTo(s, 0);
    for (var h = 1; h < n; h++)
      o.lineTo(s * Math.cos(l * h), s * Math.sin(l * h));
    o.closePath(), ht(o, a?.fill, a?.stroke, a?.width);
  }
}
function gc(o, e, i) {
  if (e.length > 0) {
    o.beginPath();
    var s = e[0];
    o.moveTo(s.x, s.y);
    for (var n = 1; n < e.length; ++n)
      s = e[n], o.lineTo(s.x, s.y);
    o.closePath(), ht(o, i?.fill, i?.stroke, i?.width);
  }
}
function yc(o, e, i, s, n) {
  vo(o, e, i, s, 3, n?.rotate || 0, n), ht(o, n?.fill, n?.stroke, n?.width);
}
function vc(o, e, i, s, n, r) {
  o.beginPath(), o.moveTo(e - s / 2, i), o.lineTo(e, i - n / 2), o.lineTo(e + s / 2, i), o.lineTo(e, i + n / 2), o.closePath(), ht(o, r?.fill, r?.stroke, r?.width);
}
function Et(o, e, i, s = () => {
}) {
  o.save();
  const n = i.width || 1;
  o.lineWidth = n, n % 2 && o.translate(0.5, 0.5), o.strokeStyle = i.stroke, P(i.dash) && o.setLineDash(i.dash), o.beginPath();
  let r = !0;
  e.forEach((a) => {
    a && a.x !== null && (r ? (o.moveTo(a.x, a.y), r = !1) : o.lineTo(a.x, a.y));
  }), N(s) && s(), o.restore();
}
function wc(o, e, i) {
  Et(o, e, i, () => {
    o.stroke();
  });
}
function bc(o, e, i, s) {
  Et(o, e, i, () => {
    o.closePath();
  }), ht(o, s?.fill, s?.stroke, s?.size);
}
function xc(o, e, i) {
  o.beginPath(), o.moveTo(e[0].x, e[0].y);
  for (var s = i ?? 1, n = 0; n < e.length - 1; n++) {
    var r = n > 0 ? e[n - 1] : e[0], a = e[n], l = e[n + 1], h = n != e.length - 2 ? e[n + 2] : l, m = a.x + (l.x - r.x) / 6 * s, f = a.y + (l.y - r.y) / 6 * s, v = l.x - (h.x - a.x) / 6 * s, T = l.y - (h.y - a.y) / 6 * s;
    o.bezierCurveTo(m, f, v, T, l.x, l.y);
  }
  o.stroke();
}
function Kt(o, e, i, s, n) {
  Et(o, [{ x: i, y: e }, { x: s, y: e }], n, () => {
    o.stroke(), o.closePath();
  });
}
function Cc(o, e, i, s, n) {
  const r = [{ x: e, y: i }, { x: e, y, bottom: s }];
  Et(o, r, n, () => {
    o.stroke(), o.closePath();
  });
}
function Tc(o, e, i) {
  Et(o, e, i, () => {
    o.stroke(), o.closePath();
  });
}
function Sc(o, e, i, s, n) {
  o.beginPath(), o.arc(e, i, s, 0, Math.PI * 2), o.closePath(), ht(o, n?.fill, n?.stroke, n?.width);
}
function wo(o, e, i, s, n, r) {
  for (let a = 0; a < i; a++)
    for (let l = 0; l < s; l++)
      l % 2 == 0 && a % 2 == 0 || l % 2 != 0 && a % 2 != 0 ? o.fillStyle = n : o.fillStyle = r, o.fillRect(l * e, a * e, e, e);
}
function Ec(o) {
  return o.ownerDocument && o.ownerDocument.defaultView && o.ownerDocument.defaultView.devicePixelRatio || 2;
}
function bo(o, e, i, s, n, r, a, l, h, m) {
  o.drawImage(e, i, s, n, r, a, l, h, m);
}
function xo(o, e) {
  let i = o.naturalWidth || o.width, s = o.naturalHeight || o.height;
  return e === void 0 && (e = Co(i, s)), e.ctx.drawImage(o, 0, 0), e;
}
const Pc = {
  red: "#FF0000FF",
  green: "#00FF00FF",
  blue: "#0000FFFF",
  alpa: "#000000FF"
};
function Bt(o, e) {
  const i = xo(e), s = i.ctx;
  return s.fillStyle = Pc[o], s.globalCompositeOperation = "multiply", s.fillRect(0, 0, s.canvas.width, s.canvas.height), s.globalCompositeOperation = "destination-in", s.drawImage(e, 0, 0), s.globalCompositeOperation = "source-over", i;
}
function Mc(o) {
  return {
    red: Bt("red", o),
    green: Bt("green", o),
    blue: Bt("blue", o),
    alpha: Bt("alpha", o)
  };
}
function Co(o, e) {
  const i = document.createElement("canvas");
  return i.ctx = i.getContext("2d", { willReadFrequently: !0 }), i.width = o || i.ctx.canvas.width, i.height = e || i.ctx.canvas.height, i;
}
const B = {
  createCanvas: Co,
  imageToCanvas: xo,
  separateRGB: Mc,
  getChannel: Bt,
  getPixelRatio: Ec,
  fillStroke: ht,
  linearGradient: mt,
  calcTextWidth: Qs,
  createFont: St,
  getTextRectHeight: zi,
  getTextRectWidth: Ui,
  renderImage: bo,
  renderText: mo,
  renderTextBG: Tt,
  renderPath: Et,
  renderPathStroke: wc,
  renderPathClosed: bc,
  renderSpline: xc,
  renderLine: Tc,
  renderLineHorizontal: Kt,
  renderLineVertical: Cc,
  renderCircle: Sc,
  renderRect: pc,
  renderRectFill: Js,
  renderRectStroke: po,
  renderRectRound: fc,
  renderRectRoundFill: go,
  renderRectRoundStroke: fo,
  renderPolygonRegular: vo,
  renderPolygonIrregular: gc,
  renderDiamond: vc,
  renderTriangle: yc,
  renderCheckerBoard: wo
};
class U {
  static isOverlay = !0;
  #e;
  #t;
  #i = {};
  #n;
  #s;
  #r;
  #o;
  #l;
  #a;
  #h;
  #c = {
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
    this.#t = r.core, this.#e = r, this.#i = r.core.config, this.#o = e, this.#l = e.scene, this.#a = e.hit, this.#s = i, this.#r = s, this.#h = a, this.on("global_resize", this.onResize, this);
  }
  get core() {
    return this.#t;
  }
  get parent() {
    return this.#e;
  }
  get target() {
    return this.#o;
  }
  get config() {
    return this.#i;
  }
  get params() {
    return this.#h;
  }
  get range() {
    return this.#t.range;
  }
  get state() {
    return this.#t.state;
  }
  get scene() {
    return this.#l;
  }
  get hit() {
    return this.#a;
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
    return this.#h.overlay;
  }
  get overlayData() {
    return this.#h.overlay.data;
  }
  get data() {
    return this.#h.overlay.data;
  }
  get stateMachine() {
    return this.#t.stateMachine;
  }
  get context() {
    return this.contextIs();
  }
  set position(e) {
    this.#o.setPosition(e[0], e[1]);
  }
  destroy() {
    this.#t.hub.expunge(this), "overlay" in this.#h && "data" in this.#h.overlay && delete this.#h.overlay.data;
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
    this.#c.resize = !0;
  }
  setSize(e, i) {
    this.#o.setSize(e, i), this.#c.refresh = !0;
  }
  setRefresh() {
    this.#c.refresh = !0;
  }
  getXAxis() {
    return this.#s instanceof Ei ? this.#s : this.core.Chart.time.xAxis instanceof Ei ? this.core.Chart.time.xAxis : "time" in this.#e ? this.#e.time.xAxis : !1;
  }
  getYAxis() {
    return this.#r instanceof Ft ? this.#r : this.chart.yAxis instanceof Ft ? this.chart.yAxis : "scale" in this.#e ? this.#e.scale.yAxis : !1;
  }
  contextIs() {
    return !this.#s && !this.#r ? "chart" : this.#s instanceof Ei ? "timeline" : this.#r instanceof Ft ? "scale" : !1;
  }
  mustUpdate() {
    const e = this.#t.range, i = this.#c;
    return this.#t.MainPane.elRows, i.valueMax !== e.valueMax || i.valueMin !== e.valueMin || i.indexStart !== e.indexStart || i.Length !== e.Length || i.refresh || i.resize ? this.#c : !1;
  }
  updated() {
    const e = this.#t.range, i = this.#c, s = this.#t.MainPane.elRows;
    i.valueMax = e.valueMax, i.valueMin = e.valueMin, i.indexStart = e.indexStart, i.Length = e.Length, i.rowsW = s.width, i.rowsH = s.height, i.rowsW = s.width, i.rowsH = s.height, i.refresh = !1, i.resize = !1;
  }
  plot(e, i, s) {
    const n = this.scene.context, r = e;
    switch (n.save(), i) {
      case "createCanvas":
        B[i](r[0], r[1]);
        break;
      case "fillStroke":
        B[i](n, r[0], r[1], r[2]);
        break;
      case "renderLine":
        B[i](n, r, s);
        break;
      case "renderLineHorizontal":
        B[i](n, r[0], r[1], r[2], s);
        break;
      case "renderLineVertical":
        B[i](n, r[0], r[1], r[2], s);
        break;
      case "renderPath":
        B[i](n, r, s.style, s);
        break;
      case "renderPathStroke":
        B[i](n, r, s.style);
        break;
      case "renderPathClosed":
        B[i](n, r, s.style, s);
        break;
      case "renderSpline":
        B[i](n, r, s);
        break;
      case "renderRect":
        B[i](n, r[0], r[1], r[2], r[3], s);
        break;
      case "renderRectFill":
        B[i](n, r[0], r[1], r[2], r[3], s);
        break;
      case "renderRectStroke":
        B[i](n, r[0], r[1], r[2], r[3], s);
        break;
      case "renderRectRound":
        B[i](n, r[0], r[1], r[2], r[3], r[4], s);
        break;
      case "renderRectRoundFill":
        B[i](n, r[0], r[1], r[2], r[3], r[4], s);
        break;
      case "renderRectRoundStroke":
        B[i](n, r[0], r[1], r[2], r[3], r[4], s);
        break;
      case "renderPolygonRegular":
        B[i](n, r[0], r[1], r[2], r[3], r[4], s);
        break;
      case "renderPolygonIrregular":
        B[i](n, r, s);
        break;
      case "renderTriangle":
        B[i](n, r[0], r[1], r[2], s);
        break;
      case "renderDiamond":
        B[i](n, r[0], r[1], r[2], r[3], s);
        break;
      case "renderCircle":
        B[i](n, r[0], r[1], r[2], s);
        break;
      case "renderImage":
        B[i](n, s.src, r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7]);
      case "renderText":
        B[i](n, r[0], r[1], s);
        break;
      case "renderTextBG":
        B[i](n, r[0], r[1], r[2], s);
        break;
    }
    n.restore();
  }
  clear() {
    this.scene.clear();
  }
}
class Es {
  #e = Oi;
  #t = "1s";
  indexStart = 0;
  indexEnd = di;
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
  initialCnt = tr;
  limitFuture = di;
  limitPast = ir;
  minCandles = sr;
  maxCandles = nr;
  yAxisBounds = er;
  rangeLimit = di;
  anchor;
  #i;
  #n;
  #s = !0;
  constructor(e, i, s = {}) {
    if (!w(s) || !(s?.core instanceof O))
      return !1;
    this.#s = !0, this.setConfig(s), this.#i = s.core, e = x(e) ? e : 0, i = x(i) ? i : this.data.length - 1, `${this.maxMinPriceVol.toString()}`;
    const n = s?.interval || Oi;
    if (this.data.length == 0) {
      let r = Date.now();
      e = 0, i = this.rangeLimit, this.#e = n, this.#t = Vt(this.interval), this.anchor = r - r % n;
    } else
      this.data.length < 2 ? (this.#e = n, this.#t = Vt(this.interval)) : (this.#e = Ps(this.data), this.#t = Vt(this.interval));
    i == 0 && this.data.length >= this.rangeLimit ? i = this.rangeLimit : i == 0 && (i = this.data.length), this.set(e, i);
  }
  get allData() {
    return this.#i.allData;
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
    if (!x(e) || !x(i) || !x(s))
      return !1;
    e = e | 0, i = i | 0, s = s | 0, s = k(s, this.minCandles, this.maxCandles), e > i && ([e, i] = [i, e]), i = k(i, e + this.minCandles, e + s);
    let r = i - e;
    e = k(e, this.limitPast * -1, this.dataLength + this.limitFuture - this.minCandles - 1), i = k(i, e + this.minCandles, this.dataLength + this.limitFuture - 1), e = i - e < r ? e - (r - (i - e)) : e;
    const a = e, l = i, h = this.indexStart, m = this.indexEnd;
    let f = this.Length;
    this.indexStart = e, this.indexEnd = i, f -= this.Length;
    let v = this.maxMinPriceVol({ data: this.data, start: this.indexStart, end: this.indexEnd, that: this });
    return this.setMaxMin(v), this.setConfig(n), this.#i.emit("setRange", [a, l, h, m]), !0;
  }
  setConfig(e) {
    if (!w(e))
      return !1;
    this.initialCnt = x(e?.initialCnt) ? e.initialCnt : tr, this.limitFuture = x(e?.limitFuture) ? e.limitFuture : di, this.limitPast = x(e?.limitPast) ? e.limitPast : ir, this.minCandles = x(e?.minCandles) ? e.minCandles : sr, this.maxCandles = x(e?.maxCandles) ? e.maxCandles : nr, this.yAxisBounds = x(e?.yAxisBounds) ? e.yAxisBounds : er;
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
    x(e) || (e = s.length - 1);
    let n = s[e];
    if (n !== void 0)
      return n;
    {
      const r = s.length - 1;
      return n = [null, null, null, null, null, null], s.length < 1 ? (n[0] = Date.now() + this.interval * e, n) : e < 0 ? (n[0] = s[0][0] + this.interval * e, n) : e > r ? (n[0] = s[r][0] + this.interval * (e - r), n) : null;
    }
  }
  valueByTS(e, i = "") {
    if (!x(e) || !C(i))
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
    if (!C(e))
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
    if (!x(e))
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
    let i = this.getTimeIndex(e), s = this.#i.rangeScrollOffset;
    return i >= this.indexStart - s && i <= this.indexEnd + s;
  }
  rangeIndex(e) {
    return this.getTimeIndex(e) - this.indexStart;
  }
  maxMinPriceVol(e) {
    let { data: i, start: s, end: n, that: r } = { ...e }, a = de(this.#i.bufferPx / this.#i.candleW);
    if (a = x(a) ? a : 0, s = x(s) ? s - a : 0, s = s > 0 ? s : 0, n = typeof n == "number" ? n : i?.length - 1, i.length == 0)
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
    let l = i.length - 1, h = oe(s, 0, l), m = oe(n, 0, l), f = i[h][3], v = i[h][2], T = i[h][5], E = i[h][5], M = h, I = h, re = h, me = h;
    for (; h++ < m; )
      i[h][3] < f && (f = i[h][3], M = h), i[h][2] > v && (v = i[h][2], I = h), i[h][5] < T && (T = i[h][5], re = h), i[h][5] > E && (E = i[h][5], me = h);
    let _ = v - f, D = f, L = v;
    return f -= _ * r.yAxisBounds, f = f > 0 ? f : 0, v += _ * r.yAxisBounds, _ = v - f, {
      valueLo: D,
      valueHi: L,
      valueMin: f,
      valueMax: v,
      valueDiff: v - f,
      volumeMin: T,
      volumeMax: E,
      volumeDiff: E - T,
      valueMinIdx: M,
      valueMaxIdx: I,
      volumeMinIdx: re,
      volumeMaxIdx: me
    };
    function oe(X, ae, pe) {
      return Math.min(pe, Math.max(ae, X));
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
function Ps(o) {
  let e = Math.min(o.length - 1, 99), i = 1 / 0;
  return o.slice(0, e).forEach((s, n) => {
    let r = o[n + 1][0] - s[0];
    r === r && r < i && (i = r);
  }), i;
}
function Ms(o, e) {
  if (!x(e))
    return !1;
  let i, s = o.timeFrameMS;
  return e = e - e % s, e === o.range.data[0][0] ? i = 0 : e < o.range.data[0][0] ? i = (o.range.data[0][0] - e) / s * -1 : i = (e - o.range.data[0][0]) / s, i;
}
const dr = /^#?([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i, mr = /^hsla?((\d{1,3}?),\s*(\d{1,3}%),\s*(\d{1,3}%)(,\s*[01]?\.?\d*)?)$/, pr = /^hsla[(]\s*0*(?:[12]?\d{1,2}|3(?:[0-5]\d|60))\s*(?:\s*,\s*0*(?:\d\d?(?:\.\d+)?\s*%|\.\d+\s*%|100(?:\.0*)?\s*%)){2}\s*,\s*0*(?:\.\d+|1(?:\.0*)?)\s*[)]$/, fr = /^rgba?((\d{1,3}%?),\s*(\d{1,3}%?),\s*(\d{1,3}%?)(,\s*[01]?\.?\d*)?)$/, gr = /^^rgba[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*,){3}\s*0*(?:\.\d+|1(?:\.0*)?)\s*[)]$/;
class en {
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
    this.#t(e), dr.test(e) && this.#i(e), mr.test(e) && this.#n(e), pr.test(e) && this.#s(e), fr.test(e) && this.#r(e), gr.test(e) && this.#o(e);
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
    if (!C(e)) {
      this.#e.isValid = !1;
      return;
    }
    if (hl) {
      let i = document.getElementById("divValidColourTest");
      i || (i = document.createElement("div"), i.id = "divValidColourTest"), i.style.backgroundColor = "", i.style.backgroundColor = e, this.#e.isValid = !!i.style.backgroundColor.length, i.remove();
    } else
      this.#e.isValid = !!(dr.test(e) || mr.test(e) || pr.test(e) || fr.test(e) || gr.test(e));
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
    this.setHex(s), this.#d(s), this.#u(s);
  }
  #n(e) {
    this.#e.hsl = e;
  }
  #s(e) {
    this.#e.hsla = e;
  }
  #r(e) {
    this.#e.rgb = e, this.#m(rgba);
  }
  #o(e) {
    this.#e.rgba = e, this.#m(e);
  }
  #l(e) {
    let { r: i, g: s, b: n, a: r } = this.#p(e);
    return i.length == 1 && (i = "0" + i), s.length == 1 && (s = "0" + s), n.length == 1 && (n = "0" + n), r.length == 1 && (r = "0" + r), this.value.r = i, this.value.g = s, this.value.b = n, this.value.a = r, this.setHex([i, s, n, r]), this;
  }
  #a(e) {
    let { r: i, g: s, b: n, a: r } = this.#p(e);
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
  #h(e, i, s) {
    i /= 100, s /= 100;
    const n = (l) => (l + e / 30) % 12, r = i * Math.min(s, 1 - s), a = (l) => s - r * Math.max(-1, Math.min(n(l) - 3, Math.min(9 - n(l), 1)));
    return [255 * a(0), 255 * a(8), 255 * a(4)];
  }
  #c(e, i, s) {
    s /= 100;
    const n = i * Math.min(s, 1 - s) / 100, r = (a) => {
      const l = (a + e / 30) % 12, h = s - n * Math.max(Math.min(l - 3, 9 - l, 1), -1);
      return Math.round(255 * h).toString(16).padStart(2, "0");
    };
    return `#${r(0)}${r(8)}${r(4)}`;
  }
  #d(e) {
    C(e) && (e = /([a-f\d]{2})/ig.exec(e));
    var i = [
      parseInt(e[0], 16),
      parseInt(e[1], 16),
      parseInt(e[2], 16),
      parseInt(e[3], 16) / 255
    ];
    this.setRGBA(i);
  }
  #u(e) {
    C(e) && (e = /([a-f\d]{2})/ig.exec(e));
    let i = parseInt(e[0], 16), s = parseInt(e[1], 16), n = parseInt(e[2], 16), r = parseInt(e[3], 16);
    i /= 255, s /= 255, n /= 255, r /= 255, this.setHSLA([i, s, n, r]);
  }
  #p(e) {
    let i, s, n, r, a = this.#e;
    if (a.r && a.g && a.b && a.a)
      return { r: i, g: s, b: n, a: r } = { ...a };
    if (C(e)) {
      let l = e.indexOf(",") > -1 ? "," : " ";
      e = e.substr(4).split(")")[0].split(l);
    }
    if (P(e)) {
      if (e.length < 3 || e.length > 4)
        return !1;
      i = e[0], s = e[1], n = e[2], r = C(e[3]) ? e[3] : "";
    } else if (w(e))
      i = e.r, s = e.g, n = e.b, r = "a" in e ? e.a : "";
    else
      return !1;
    return { r: i, g: s, b: n, a: r };
  }
  #m(e) {
    let i, s, n = 0, r = [], a = [], l = e.replace(/\s/g, "").match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i);
    l.shift();
    for (let h of l)
      s = h.indexOf("%") > -1, i = parseFloat(h), n < 3 && s ? i = Math.round(255 * i / 100) : n == 3 && (!s && i >= 0 && i <= 1 ? i = Math.round(255 * i) : s && i >= 0 && i <= 100 ? i = Math.round(255 * i / 100) : i = ""), r[n] = (i | 256).toString(16).slice(1), a[n++] = i;
    this.setHex(r), this.setRGBA(a), this.#u(this.#e.hexa);
  }
}
function ot(o, e) {
  return !w(o) || !w(e) ? e : (Object.keys(e).forEach((i) => {
    const s = o[i], n = e[i];
    Array.isArray(s) && Array.isArray(n) ? o[i] = ot(s.concat([]), n) : w(s) && w(n) ? o[i] = ot(Object.assign({}, s), n) : o[i] = n;
  }), o);
}
function he(o, e = !0) {
  if (o === null || typeof o != "object" || "isActiveClone" in o)
    return o;
  let i;
  o instanceof Date ? i = new o.constructor() : i = Array.isArray(o) ? [] : {};
  for (let s in o)
    Object.prototype.hasOwnProperty.call(o, s) && (o.isActiveClone = null, i[s] = he(o[s], !1), delete o.isActiveClone);
  return i;
}
function To(o, e, i) {
  const [s, ...n] = e.split(".");
  return {
    ...o,
    [s]: n.length ? To(o[s], n.join("."), i) : i
  };
}
function yr(o, e) {
  return e.split(".").reduce((s, n) => s && s[n] !== "undefined" ? s[n] : void 0, o);
}
function Di(o, e) {
  if (!P(o) || !P(e) || o.length !== e.length)
    return !1;
  let i = o.length;
  for (; i--; ) {
    if (P(o[i]) || P(e[i])) {
      if (!Di(o[i], e[i]))
        return !1;
      continue;
    }
    if (w(o[i]) || w(o[i])) {
      if (!w(o[i], e[i]))
        return !1;
      continue;
    }
    if (o[i] !== e[i])
      return !1;
  }
  return !0;
}
function Lc(o, e, i) {
  let s = o[e];
  o.splice(e, 1), o.splice(i, 0, s);
}
function Ac(o, e, i) {
  [o[e], o[i]] = [o[i], o[e]];
}
function So(o, e) {
  return P(e) ? P(o) ? o.every((i) => e.includes(i)) : e.includes(o) : !1;
}
function Pi(o, e) {
  if (!w(o) || !w(e))
    return !1;
  const i = Object.keys(o).sort(), s = Object.keys(e).sort();
  return i.length !== s.length ? !1 : i.every((r, a) => {
    const l = o[r], h = e[s[a]];
    return P(l) || P(h) ? Di(l, h) : w(l) || w(h) ? Pi(l, h) : l === h;
  });
}
function ne(o = "ID") {
  x(o) ? o = o.toString() : C(o) || (o = "ID"), o = Fe(o);
  const e = Date.now().toString(36), i = Math.random().toString(36).substring(2, 5);
  return `${o}_${e}_${i}`;
}
function Fe(o) {
  return String(o).replace(/ |,|;|:|\.|#/g, "_");
}
const Oc = (o) => o.entries().next().value, Nc = (o) => o.entries().next().value[0], Dc = (o) => o.entries().next().value[1], Ic = (o) => [...o].pop(), Rc = (o) => [...o.keys()].pop(), kc = (o) => [...o.values()].pop();
class Te extends Map {
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
    return Oc(this);
  }
  firstKey() {
    return Nc(this);
  }
  firstValue() {
    return Dc(this);
  }
  lastEntry() {
    return Ic(this);
  }
  lastKey() {
    return Rc(this);
  }
  lastValue() {
    return kc(this);
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
    return P(e) ? (e.forEach(([i, s]) => this.set(i, s)), !0) : !1;
  }
  populate(e) {
    return P(e) ? (this.clear(), e.forEach(([i, s]) => this.set(i, s)), !0) : !1;
  }
  insertIndex(e, i, s) {
    if (!x(e))
      return !1;
    const n = [...this];
    return n.splice(e, 0, [i, s]), this.populate(n), !0;
  }
  removeIndex(e) {
    if (!x(e))
      return !1;
    const i = [...this];
    return i.splice(e, 1), this.populate(i), !0;
  }
  swapIndices(e, i) {
    if (!x(e) || !x(i))
      return !1;
    const s = [...this];
    return Ac(s, e, i), this.populate(s), !0;
  }
  swapKeys(e, i) {
    const s = [...this], n = s.findIndex(([a]) => a === e), r = s.findIndex(([a]) => a === i);
    return [s[n], s[r]] = [s[r], s[n]], this.clear(), s.forEach(([a, l]) => this.set(a, l)), !0;
  }
}
function De(o, e = 100, i, s = !1) {
  let n;
  return function() {
    let r = i || this, a = arguments, l = function() {
      n = null, s || o.apply(r, a);
    }, h = s && !n;
    clearTimeout(n), n = setTimeout(l, e), h && o.apply(r, a);
  };
}
function _c(o, e = 250, i) {
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
class We {
  static opened = new We("opened");
  static closed = new We("closed");
  constructor(e) {
    this.name = e;
  }
}
class K {
  #e;
  #t;
  #i;
  #n;
  #s = We.closed;
  #r;
  #o;
  #l;
  #a;
  #h;
  #c;
  #d;
  #u;
  #p = {};
  #m;
  #f;
  #w;
  #P;
  #x = !1;
  #y = {};
  #C = "";
  #T = "";
  #g = {};
  static windowList = {};
  static windowCnt = 0;
  static class = In;
  static name = "Windows";
  static type = "Window";
  static currentActive = null;
  static stylesInstalled = !1;
  static defaultStyles = `
  /** default Window widget styles */

  .tradeXwindow {
    border: 1px solid ${it.COLOUR_BORDER};
    border-radius: 5px;
    box-shadow: ${it.SHADOW};
    background: ${it.COLOUR_BG};
    color: ${it.COLOUR_TXT};
  }

  .tradeXwindow .dragBar {
    cursor: grab;
  }

  .tradeXwindow .dragBar:hover {
    background: #222;
  }

  .tradeXwindow .dragBar .title {
    ${it.TITLE}
  }

  .tradeXwindow .content {
    ${it.CONTENT}
  }
 
  `;
  static create(e, i) {
    return i.id = i?.id || ne("window"), i.id = `${i.id}_${++K.windowCnt}`, i.type = i?.type || K.type, i.class = i?.class || "window", K.windowList[i.id] = new K(e, i), K.windowList[i.id];
  }
  static destroy(e) {
    e in K.windowList && (K.windowList[e].destroy(), delete K.windowList[e]);
  }
  static defaultNode() {
    return `
      <div slot="widget" class="${In}" style=""></div>
    `;
  }
  constructor(e, i) {
    this.#t = e, this.#i = i.core || i.parent.core, this.#n = i, this.#e = i.id, this.#r = i.parent, this.#l = e.elements.elWindows, this.#o = this.#i.elWidgetsG, this.mount(this.#l);
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
    return se(this.#a);
  }
  set dimensions(e) {
    this.setDimensions(e);
  }
  get type() {
    return K.type;
  }
  get el() {
    return this.#a;
  }
  get elDragBar() {
    return this.#h;
  }
  get elTitle() {
    return this.#c;
  }
  get elCloseIcon() {
    return this.#d;
  }
  get elContent() {
    return this.#u;
  }
  get title() {
    return this.#C;
  }
  set title(e) {
    this.setTitle(e);
  }
  get content() {
    return this.#T;
  }
  set content(e) {
    this.setContent(e);
  }
  get contentFields() {
    return this.#g;
  }
  setTitle(e) {
    return C(e) ? (this.#n.title = e, this.#c.innerHTML = e, this.#c) : !1;
  }
  setContent(e, i = {}) {
    if (!C(e) || !w(i))
      return !1;
    this.#n.content = e, this.#u.innerHTML = e;
    for (let s in i)
      N(i[s]) && i[s](this.#u);
    return this.#g = this.allContentFields(), this.#u;
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
    if (!this.#a.contains(e.target) && lt(this.#a) && !this.#x) {
      let i = {
        target: e.currentTarget.id,
        window: this.#e
      };
      this.emit("window_close", i), this.emit(`window_close_${this.parent.id}`, i), document.removeEventListener("click", this.#y.click), delete this.#y.click;
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
    let i = this.#a.offsetLeft + e.movement.x, s = this.#a.offsetTop + e.movement.y;
    this.position({ x: i, y: s });
  }
  onDragBarEnd(e) {
    setTimeout(() => {
      this.#x = !1;
    }, 250);
  }
  mount(e) {
    e.lastElementChild == null ? e.innerHTML = this.windowNode() : e.lastElementChild.insertAdjacentHTML("afterend", this.windowNode()), this.#a = this.#l.querySelector(`#${this.#n.id}`), this.#h = this.#a.querySelector(".dragBar"), this.#c = this.#a.querySelector(".title"), this.#d = this.#a.querySelector(".closeIcon"), this.#u = this.#a.querySelector(".content"), this.#g = this.allContentFields(), this.#a.addEventListener("click", this.onWindow.bind(this)), Y(this.#h) && (this.#P = new He(this.#h, { disableContextMenu: !1 }), this.#P.on("pointerdrag", this.onDragBar.bind(this)), this.#P.on("pointerdragend", this.onDragBarEnd.bind(this)));
    const i = this.dimensions, s = this.#n?.w || i.w, n = this.#n?.h || i.h;
    this.setDimensions({ w: s, h: n }), this.position();
  }
  windowNode() {
    const e = this.#n;
    let i = "position: absolute; z-index: 100; display: block;", s = e.dragBar ? this.dragBar() : "", n = !e.dragBar && e.title ? this.titleNode() : "", r = this.contentNode(), a = this.closeIcon();
    return `
      <!-- ${this.constructor.type} ${this.parent.id} -->
      <div id="${e.id}" class="${za} ${e.class}" style="${i}">
          ${s}
          ${n}
          ${a}
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
    let r = `${i} `, a = "";
    return e.dragBar && (a += `
    <div class="dragBar" style="${r}" ${s} ${n}>
        ${this.titleNode()}
      </div>
    `), a;
  }
  titleNode() {
    const e = this.config;
    return `
        <div class="title">${C(e?.title) ? e.title : ""}</div>
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
    const e = {}, i = this.#u;
    return e.input = i.querySelectorAll("input"), e.select = i.querySelectorAll("select"), e.textarea = i.querySelectorAll("textarea"), e.button = i.querySelectorAll("button"), e;
  }
  position(e) {
    let i = 0.1, s = this.dimensions, n = this.#i.dimensions;
    Math.round(n.left - s.left), Math.round(n.bottom - s.top);
    let r = this.#p?.iPos?.width !== n.width || this.#p.x100 ? s.width * this.#p.x100 : Math.round((n.width - s.width) / 2), a = this.#p?.iPos?.height !== n.height || this.#p.y100 ? s.height * this.#p.y100 : Math.round((n.height + s.height) / -2), l = Rr(this.#a, "z-index");
    if (w(e)) {
      let { x: T, y: E, z: M } = { ...e };
      x(T) && (r = T), x(E) && (a = E), x(M) && (l = M), this.#p = { x: T, y: E, z: l };
    }
    this.#a.style["z-index"] = `${l}`;
    const h = this.#a.clientWidth;
    r + h * i > this.#o.offsetWidth ? r = this.#o.offsetWidth - h * i : r < (h - h * i) * -1 && (r = (h - h * i) * -1);
    const m = this.#a.clientHeight;
    a < n.height * -1 ? a = n.height * -1 : a > m * i * -1 && (a = m * i * -1), r = Math.floor(r), a = Math.floor(a), this.#a.style.left = `${r}px`, this.#a.style.top = `${a}px`;
    const f = r / s.width, v = a / s.height;
    this.#p = {
      px: r,
      py: a,
      x100: f,
      y100: v,
      iPos: n
    };
  }
  setDimensions(e) {
    if (!w(e))
      return !1;
    x(e?.w) && (this.#a.style.width = `${e.w}px`), x(e?.h) && (this.#a.style.height = `${e.h}px`);
  }
  setProperties(e) {
    if (!w(e))
      return !1;
    if (C(e?.title) && (this.#c.innerHTML = e.title), C(e?.content) && (this.#u.innerHTML = e.content), this.setDimensions({ ...e?.dimensions }), this.position({ ...e?.position }), w(e?.styles)) {
      const i = (s, n) => {
        if (!w(n))
          return !1;
        const r = "el" + s.charAt(0).toUpperCase() + s.slice(1);
        if (w(this[r]))
          for (let a in n)
            this[r].style.p = n[a];
      };
      for (let s of Object.keys(e.styles))
        i(s, e.styles[s]);
    }
    return e;
  }
  setOpen() {
    K.currentActive = this, this.#s = We.opened, this.#a.style.display = "block", this.#a.style.zindex = "10", this.#a.classList.add("active");
  }
  setClose() {
    K.currentActive = null, this.#s = We.closed, this.#a.style.display = "none", this.#a.classList.remove("active"), document.removeEventListener("click", this.#y.click);
  }
  remove() {
    return K.destroy(this.id);
  }
  open(e = {}) {
    return K.currentActive === this && this.state === We.opened || (this.setOpen(), this.setProperties(e), this.emit("window_opened", this.id), this.emit(`window_opened_${this.parent.id}`, this.id), setTimeout(() => {
      this.#y.click = this.onOutsideClickListener.bind(this), document.addEventListener("click", this.#y.click);
    }, e?.offFocus || 250)), !0;
  }
  close() {
    return this.#s !== We.closed && (this.setClose(), this.emit("window_closed", this.id), this.emit(`window_closed_${this.parent.id}`, this.id)), !0;
  }
}
class Se extends U {
  static #e = 0;
  static get cnt() {
    return ++Se.#e;
  }
  static get isIndicator() {
    return !0;
  }
  #t;
  #i;
  #n;
  #s;
  #r;
  #o;
  #l;
  #a;
  #h;
  #c;
  #d;
  #u;
  #p;
  #m = "indicator";
  #f;
  #w;
  #P = [0, 0];
  #x;
  #y;
  #C = 2;
  #T = {};
  #g;
  #b;
  #v;
  definition = {
    input: {},
    output: {},
    meta: {
      input: {},
      output: {}
    }
  };
  constructor(e, i = !1, s = !1, n, r, a) {
    super(e, i, s, void 0, r, a);
    const l = a.overlay;
    this.#i = U.cnt, this.#d = a, this.#u = l, this.#f = this.core.TALib, this.#w = this.xAxis.range, this.id = l?.id || ne(this.shortName), this.legendName = l?.legendName, this.#o = F(l?.legendVisibility) ? l.legendVisibility : !0, this.style = l?.settings?.style ? { ...this.constructor.defaultStyle, ...l.settings.style } : { ...this.constructor.defaultStyle, ...n.style };
    const h = { title: `${this.legendName} Config`, content: "", params: l, parent: this };
    this.#v = this.core.WidgetsG.insert("ConfigDialogue", h);
  }
  get id() {
    return this.#t || `${this.core.id}-${this.chartPaneID}-${this.shortName}-${this.#i}`;
  }
  set id(e) {
    this.#t = Fe(new String(e));
  }
  get chartPane() {
    return this.core.ChartPanes.get(this.chartPaneID);
  }
  get chartPaneID() {
    return this.#d.overlay.paneID;
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
    return this.#c;
  }
  set plots(e) {
    this.#c = e;
  }
  get params() {
    return this.#d;
  }
  get Timeline() {
    return this.core.Timeline;
  }
  get scale() {
    return this.parent.scale;
  }
  get type() {
    return this.#m;
  }
  get overlay() {
    return this.#u;
  }
  get legend() {
    return this.chart.legend.list[this.#g];
  }
  get legendID() {
    return this.#g;
  }
  get legendName() {
    return this.#r || this.shortName || this.#t;
  }
  set legendName(e) {
    this.setLegendName(e);
  }
  set legendVisibility(e) {
    this.setLegendVisibility(e);
  }
  get indicator() {
    return this.#p;
  }
  get TALib() {
    return this.#f;
  }
  get range() {
    return this.core.range;
  }
  set setNewValue(e) {
    this.#x = e;
  }
  set setUpdateValue(e) {
    this.#y = e;
  }
  set precision(e) {
    this.#C = e;
  }
  get precision() {
    return this.#C;
  }
  set style(e) {
    w(e) && (this.#T = e);
  }
  get style() {
    return this.#T;
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  get isIndicator() {
    return Se.isIndicator;
  }
  get isPrimary() {
    return this.chart.isPrimary;
  }
  get status() {
    return this.#b;
  }
  get configDialogue() {
    return this.#v;
  }
  set value(e) {
    const i = this.core.time.timeFrameMS;
    let s = Math.floor(new Date(e[ve.t]) / i) * i;
    e[ve.t] = s, this.#P[ve.t] !== e[ve.t] ? (this.#P[ve.t] = e[ve.t], this.#x(e)) : this.#y(e);
  }
  get value() {
    return this.#P;
  }
  setLegendName(e) {
    this.#r = C(e) ? e : this.shortName || this.#t, this.chart.legend.modify(this.#g, { legendName: e });
  }
  setLegendVisibility(e) {
    this.#o = !!e, this.chart.legend.modify(this.#g, { legendVisibility: !!e });
  }
  setDefinitionValue(e, i) {
    let s = Object.keys(this.definition.input);
    if (s.includes(e))
      return this.definition.input[e] = i * 1, "input";
    if (s = Object.keys(this.style), s.includes(e))
      return this.style[e] = i, "style";
  }
  init(e) {
    const i = this.#d.overlay;
    this.defineIndicator(i?.settings, e), this.calcIndicatorHistory(), this.setNewValue = (s) => {
      this.newValue(s);
    }, this.setUpdateValue = (s) => {
      this.updateValue(s);
    }, this.addLegend(), this.#v.start(), this.eventsListen();
  }
  destroy() {
    if (this.#b !== "destroyed") {
      if (!this.chartPane.indicatorDeleteList[this.id]) {
        this.core.warn(`Cannot "destroy()": ${this.id} !!! Use "indicator.remove()" or "chart.removeIndicator()" instead.`);
        return;
      }
      this.core.hub.expunge(this), this.chart.legend.remove(this.#g), this.clear(), this.core.MainPane.draw(void 0, !0), this.chartPane.graph.removeOverlay(this.id), super.destroy(), this.core.state.removeIndicator(this.id), this.#b = "destroyed";
    }
  }
  remove() {
    this.core.log(`Deleting indicator: ${this.id} from: ${this.chartPaneID}`), this.chart.type === "primaryPane" || Object.keys(this.chart.indicators).length > 1 ? this.emit(`${this.chartPaneID}_removeIndicator`, { id: this.id, paneID: this.chartPaneID }) : this.chart.remove();
  }
  visible(e) {
    return F(e) && (this.emit(`${this.chartPaneID}_visibleIndicator`, { id: this.id, paneID: this.chartPaneID, visible: e }), this.chartPane.indicators[this.id].layer.visible = e, this.draw()), this.chartPane.indicators[this.id].layer.visible;
  }
  settings(e) {
    return w(e) && (w(e?.config) && (this.params.overlay.settings = { ...this.params.overlay.settings, ...e.config }), w(e?.style) && (this.style = { ...this.style, ...e.style }), this.draw()), {
      config: this.params.overlay.settings,
      style: this.style,
      defaultStyle: this?.defaultStyle,
      plots: this.plots,
      precision: this.precision,
      definition: this.definition
    };
  }
  eventsListen() {
    this.on(Ke, this.onStreamUpdate, this), this.on(`window_opened_${this.id}`, this.onConfigDialogueOpen, this), this.on(`window_closed_${this.id}`, this.onConfigDialogueCancel, this), this.on(`window_submit_${this.id}`, this.onConfigDialogueSubmit, this), this.on(`window_cancel_${this.id}`, this.onConfigDialogueCancel, this), this.on(`window_default_${this.id}`, this.onConfigDialogueDefault, this);
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
    this.visible(!this.visible()), e.parent.classList.toggle("visible"), e.parent.classList.toggle("notvisible");
  }
  onConfigDialogueOpen(e) {
    if (console.log(`${this.id} Config Open`), this.#v.state === We.opened)
      return;
    this.#v.setOpen();
    const i = this.#v.contentFields;
    for (let s in i)
      for (let n of i[s])
        n.classList.contains("subject") && n.getAttribute("data-oldval") !== n.value && n.setAttribute("data-oldval", n.value);
  }
  onConfigDialogueSubmit(e) {
    console.log(`${this.id} Config Submit`), this.#v.setClose();
    let i, s = !1;
    const n = this.#v.contentFields;
    for (let r in n)
      for (let a of n[r])
        a.classList.contains("subject") && (a.setAttribute("data-oldval", a.value), i = this.setDefinitionValue(a.id, a.value), s = s || i == "input");
    s && (this.overlay.data.length = 0, this.calcIndicatorHistory()), this.setRefresh(), this.draw();
  }
  onConfigDialogueCancel(e) {
    this.#v.setClose();
    const i = this.#v.contentFields;
    for (let s in i)
      for (let n of i[s])
        n.classList.contains("subject") && (n.value = n.getAttribute("data-oldval"));
    this.setRefresh(), this.draw(), console.log(`${this.id} Config Cancel`);
  }
  onConfigDialogueDefault(e) {
    console.log(`${this.id} Config Default`);
    const i = this.#v.contentFields;
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
    if (N(e?.fn)) {
      if (i = e.fn(this), e?.own)
        return i;
    } else if (N(this.core.config.callbacks?.indicatorSettings?.fn) && (i = this.core.config.callbacks.indicatorSettings.fn(this), this.core.config.callbacks?.indicatorSettings?.own))
      return i;
    this.core.log(`invokeSettings: ${this.id}`), console.log(`invokeSettings: ${this.id}`, i);
    const s = this.#v;
    if (s.update) {
      if (!N(this.configInputs))
        return this.core.error(`ERROR: Indicator ${this.name} does not provide configInputs() required for the settings dialogue`), !1;
      const { html: n, modifiers: r } = s.configBuild(this.configInputs()), a = `${this.shortName} Config`;
      s.setTitle(a), s.setContent(n, r), s.update = !1;
    }
    return s.state.name === "closed" ? s.open() : s.setOpen(), !0;
  }
  configInputs() {
    const s = { "No Config": { tab1: `Indicator ${this.name || this.shortName || this.#t} is not configurable.` } };
    let n = {}, r = this?.definition?.meta;
    if (!w(r) && !w(this?.style) && !w(this?.definition?.input))
      return s;
    for (let a in r)
      n[a] = r[a];
    if (Object.keys(n).length == 0)
      n = s;
    else
      for (let a in n)
        for (let l in n[a]) {
          let h = n[a][l], m = Object.keys(h);
          m.includes("data-oldval") || (h["data-oldval"] = h.value), m.includes("data-default") || (h["data-default"] = h.default ? h.default : h.value);
        }
    return n;
  }
  buildConfigInputTab() {
    const e = this.definition.input;
    let i = {};
    for (let s in e)
      x(e[s]) && (i[s] = {
        entry: s,
        label: s,
        type: "number",
        value: e[s],
        default: e[s],
        "data-default": e[s],
        "data-oldval": e[s],
        $function: this.configDialogue.provideEventListener(
          "#Period",
          "change",
          (n) => {
            console.log(`#Period = ${n.target.value}`);
          }
        )
      });
    return Object.keys(i).length == 0 && (i = !1), i;
  }
  buildConfigStyleTab() {
    const e = {};
    for (let i in this?.style) {
      let s = "", n = this.style[i], r = "", a = typeof n;
      switch (a) {
        case "number":
          r = "0", s = n;
          break;
        case "string":
          let h = new en(n);
          a = h.isValid ? "color" : "", n = h.isValid ? h.hex : n, s = n;
          break;
      }
      const l = this.configDialogue.provideEventListener(
        `#${i}`,
        "change",
        (h) => {
          console.log(`${h.target.id} = ${h.target.value}`), this.style[h.target.id] = h.target.value, this.setRefresh(), this.draw();
        }
      );
      e[i] = { entry: i, label: i, type: a, value: n, "data-oldval": n, "data-default": s, default: s, min: r, $function: l };
    }
    return e;
  }
  defineIndicator(e, i) {
    const s = {
      input: {},
      output: {},
      meta: {
        input: {},
        style: {}
      }
    };
    let n;
    if (w(this.definition) ? (n = this.definition, n.input = w(n.input) ? n.input : {}, n.output = w(n.output) ? n.output : {}, n.meta = w(n.meta) ? n.meta : s.meta, n.meta.input = w(n.meta.input) ? n.meta.input : {}, n.meta.style = w(n.meta.style) ? n.meta.style : {}) : n = this.definition = s, e = w(e) ? e : {}, i = w(i) ? i : { outputs: [], options: [] }, Object.keys(n?.meta.style).length == 0 && Object.keys(this.style).length > 0 && (n.meta.style = this.buildConfigStyleTab()), Object.keys(n.output).length == 0)
      for (let l of i.outputs)
        n.output[l.name] = [];
    for (let l in n.output)
      P(n.output[l]) || (n.output[l] = []);
    const r = { ...n.input, ...e };
    delete r.style, n.input = r;
    const a = (l, h) => {
      for (let m of h) {
        typeof l[m.name] !== m.type && (l[m.name] = m.defaultValue), "range" in h && (l[m.name] = k(l[m.name], m.range.min, m.range.max));
        const f = {
          entry: m?.name,
          label: m?.displayName,
          type: m?.type,
          value: l[m.name],
          default: m?.defaultValue,
          "data-oldval": l[m.name],
          "data-default": m?.defaultValue,
          max: m?.range?.max,
          min: m?.range?.min,
          title: m?.hint
        };
        n.meta.input[m.name] = { ...f, ...n.meta.input[m.name] }, m.name in n.input && (n.meta.input[m.name].value = n.input[m.name]);
      }
    };
    n.meta.input = this.buildConfigInputTab() || {};
    for (let l of i.options)
      l.name in r ? a(r, i.options) : l.name in r.definition.input && a(r.definition.input, i.options);
    for (let l in n.meta)
      Object.keys(n.meta[l]).length == 0 && delete n.meta[l];
  }
  addLegend() {
    let e = {
      id: this.id,
      title: this.legendName,
      visible: this.#o,
      type: "indicator",
      parent: this,
      source: this.legendInputs.bind(this)
    };
    this.#g = this.chart.legend.add(e);
  }
  legendInputs(e = this.chart.cursorPos) {
    const i = [this.style.stroke];
    let n = this.Timeline.xPos2Index(e[0]) - (this.range.data.length - this.overlay.data.length), r = k(this.overlay.data.length - 1, 0, 1 / 0);
    return n = k(n, 0, r), { c: n, colours: i };
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
      s.inReal.push(this.range.value(e)[ve.c]), s.open.push(this.range.value(e)[ve.o]), s.high.push(this.range.value(e)[ve.h]), s.low.push(this.range.value(e)[ve.l]), s.close.push(this.range.value(e)[ve.c]), s.volume.push(this.range.value(e)[ve.v]);
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
    if (!C(e) || !(e in this.TALib) || !w(s) || !this.core.TALibReady)
      return !1;
    i.timePeriod = i.timePeriod || this.definition.input.timePeriod;
    let n, r, a = i.timePeriod, l = this.overlay.data;
    if (s instanceof Es)
      n = 0, r = s.dataLength - a + 1;
    else if ("indexStart" in s || "indexEnd" in s || "tsStart" in s || "tsEnd" in s)
      n = s.indexStart || this.Timeline.t2Index(s.tsStart || 0) || 0, r = s.indexEnd || this.Timeline.t2Index(s.tsEnd) || this.range.Length - 1;
    else
      return !1;
    if (l.length != 0)
      if (l.length + a !== s.dataLength)
        if (l[0][0] > s.value(a)[0])
          n = 0, r = s.getTimeIndex(l[0][0]) - a, r = k(r, a, s.dataLength - 1);
        else if (l[l.length - 1][0] < s.value(s.dataLength - 1)[0])
          n = l.length - 1 + a, n = k(n, 0, s.dataLength), r = s.dataLength - 1;
        else
          return !1;
      else
        return !1;
    if (r - n < a)
      return !1;
    let h = [], m, f, v, T;
    for (; n < r; ) {
      T = this.indicatorInput(n, n + a), i = { ...i, ...T }, v = this.TALib[e](i), f = [], m = 0;
      for (let E in this.definition.output)
        f[m++] = v[E][0];
      h.push([s.value(n + a - 1)[0], ...f]), n++;
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
        if (!P(s) || s.length == 0) {
          this.overlay.data = i;
          return;
        } else
          i[0][0] < s[0][0] ? (n = i, r = s) : i[i.length - 1][0] > s[s.length - 1][0] && (n = s, r = i);
        for (let l of n)
          a[l[0]] = l;
        for (let l of r)
          a[l[0]] = l;
        this.overlay.data = Object.values(a), this.setRefresh();
      }
    };
    this.core.TALibReady ? e() : this.core.talibAwait.push(e.bind(this));
  }
  calcIndicatorStream(e, i, s = this.range) {
    if (!this.core.TALibReady || !C(e) || !(e in this.TALib) || !(s instanceof Es) || s.dataLength < this.definition.input.timePeriod)
      return !1;
    let n = this.TALib[e](i), r = s.dataLength, a = s.value(r)[0], l = [], h = 0;
    for (let m in this.definition.output)
      l[h++] = n[m][0];
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
  updated() {
    this.setRefresh(), super.updated();
  }
}
const Hc = {
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
}, $c = {
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
}, Bc = {
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
}, Uc = {
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
}, zc = {
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
}, Vc = {
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
}, Wc = {
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
}, Fc = {
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
}, Eo = {
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
}, Gc = {
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
}, qc = {
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
}, Yc = {
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
}, Xc = {
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
}, jc = {
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
}, Kc = {
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
}, Po = {
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
}, Zc = {
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
}, Qc = {
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
}, Jc = {
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
}, eu = {
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
}, tu = {
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
}, iu = {
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
}, su = {
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
}, nu = {
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
}, ru = {
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
}, ou = {
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
}, au = {
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
}, lu = {
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
}, hu = {
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
}, cu = {
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
}, uu = {
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
}, du = {
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
}, mu = {
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
}, pu = {
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
}, fu = {
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
}, gu = {
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
}, yu = {
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
}, vu = {
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
}, wu = {
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
}, bu = {
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
}, xu = {
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
}, Cu = {
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
}, Tu = {
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
}, Su = {
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
}, Eu = {
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
}, Pu = {
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
}, Mu = {
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
}, Lu = {
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
}, Au = {
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
}, Ou = {
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
}, Nu = {
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
}, Du = {
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
}, Iu = {
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
}, Ru = {
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
}, ku = {
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
}, _u = {
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
}, Hu = {
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
}, $u = {
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
}, Bu = {
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
}, Uu = {
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
}, zu = {
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
}, Vu = {
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
}, Wu = {
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
}, Fu = {
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
}, Gu = {
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
}, qu = {
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
}, Yu = {
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
}, Xu = {
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
}, ju = {
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
}, Ku = {
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
}, Zu = {
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
}, Qu = {
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
}, Ju = {
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
}, ed = {
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
}, td = {
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
}, id = {
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
}, sd = {
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
}, nd = {
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
}, rd = {
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
}, od = {
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
}, ad = {
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
}, ld = {
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
}, hd = {
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
}, cd = {
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
}, ud = {
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
}, dd = {
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
}, md = {
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
}, pd = {
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
}, Mo = {
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
}, fd = {
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
}, gd = {
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
}, yd = {
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
}, vd = {
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
}, wd = {
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
}, bd = {
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
}, xd = {
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
}, Cd = {
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
}, Td = {
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
}, Sd = {
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
}, Ed = {
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
}, Pd = {
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
}, Md = {
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
}, Ld = {
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
}, Ad = {
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
}, Od = {
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
}, Nd = {
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
}, Dd = {
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
}, Id = {
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
}, Rd = {
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
}, kd = {
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
}, _d = {
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
}, Hd = {
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
}, $d = {
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
}, Bd = {
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
}, Ud = {
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
}, zd = {
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
}, Vd = {
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
}, Wd = {
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
}, Fd = {
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
}, Gd = {
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
}, qd = {
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
}, Yd = {
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
}, Xd = {
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
}, jd = {
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
}, Kd = {
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
}, Zd = {
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
}, Qd = {
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
}, Jd = {
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
}, e0 = {
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
}, t0 = {
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
}, i0 = {
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
}, s0 = {
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
}, n0 = {
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
}, r0 = {
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
}, Lo = {
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
}, o0 = {
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
}, a0 = {
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
}, l0 = {
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
}, h0 = {
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
}, Ao = {
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
}, c0 = {
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
}, u0 = {
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
}, Oo = {
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
}, d0 = {
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
}, m0 = {
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
}, p0 = {
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
}, f0 = {
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
}, g0 = {
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
}, y0 = {
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
}, v0 = {
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
}, w0 = {
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
}, b0 = {
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
}, x0 = {
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
}, C0 = {
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
}, T0 = {
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
}, S0 = {
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
}, E0 = {
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
}, P0 = {
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
}, M0 = {
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
}, L0 = {
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
}, A0 = {
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
}, op = {
  ACCBANDS: Hc,
  ACOS: $c,
  AD: Bc,
  ADD: Uc,
  ADOSC: zc,
  ADX: Vc,
  ADXR: Wc,
  APO: Fc,
  AROON: Eo,
  AROONOSC: Gc,
  ASIN: qc,
  ATAN: Yc,
  ATR: Xc,
  AVGDEV: jc,
  AVGPRICE: Kc,
  BBANDS: Po,
  BETA: Zc,
  BOP: Qc,
  CCI: Jc,
  CDL2CROWS: eu,
  CDL3BLACKCROWS: tu,
  CDL3INSIDE: iu,
  CDL3LINESTRIKE: su,
  CDL3OUTSIDE: nu,
  CDL3STARSINSOUTH: ru,
  CDL3WHITESOLDIERS: ou,
  CDLABANDONEDBABY: au,
  CDLADVANCEBLOCK: lu,
  CDLBELTHOLD: hu,
  CDLBREAKAWAY: cu,
  CDLCLOSINGMARUBOZU: uu,
  CDLCONCEALBABYSWALL: du,
  CDLCOUNTERATTACK: mu,
  CDLDARKCLOUDCOVER: pu,
  CDLDOJI: fu,
  CDLDOJISTAR: gu,
  CDLDRAGONFLYDOJI: yu,
  CDLENGULFING: vu,
  CDLEVENINGDOJISTAR: wu,
  CDLEVENINGSTAR: bu,
  CDLGAPSIDESIDEWHITE: xu,
  CDLGRAVESTONEDOJI: Cu,
  CDLHAMMER: Tu,
  CDLHANGINGMAN: Su,
  CDLHARAMI: Eu,
  CDLHARAMICROSS: Pu,
  CDLHIGHWAVE: Mu,
  CDLHIKKAKE: Lu,
  CDLHIKKAKEMOD: Au,
  CDLHOMINGPIGEON: Ou,
  CDLIDENTICAL3CROWS: Nu,
  CDLINNECK: Du,
  CDLINVERTEDHAMMER: Iu,
  CDLKICKING: Ru,
  CDLKICKINGBYLENGTH: ku,
  CDLLADDERBOTTOM: _u,
  CDLLONGLEGGEDDOJI: Hu,
  CDLLONGLINE: $u,
  CDLMARUBOZU: Bu,
  CDLMATCHINGLOW: Uu,
  CDLMATHOLD: zu,
  CDLMORNINGDOJISTAR: Vu,
  CDLMORNINGSTAR: Wu,
  CDLONNECK: Fu,
  CDLPIERCING: Gu,
  CDLRICKSHAWMAN: qu,
  CDLRISEFALL3METHODS: Yu,
  CDLSEPARATINGLINES: Xu,
  CDLSHOOTINGSTAR: ju,
  CDLSHORTLINE: Ku,
  CDLSPINNINGTOP: Zu,
  CDLSTALLEDPATTERN: Qu,
  CDLSTICKSANDWICH: Ju,
  CDLTAKURI: ed,
  CDLTASUKIGAP: td,
  CDLTHRUSTING: id,
  CDLTRISTAR: sd,
  CDLUNIQUE3RIVER: nd,
  CDLUPSIDEGAP2CROWS: rd,
  CDLXSIDEGAP3METHODS: od,
  CEIL: ad,
  CMO: ld,
  CORREL: hd,
  COS: cd,
  COSH: ud,
  DEMA: dd,
  DIV: md,
  DX: pd,
  EMA: Mo,
  EXP: fd,
  FLOOR: gd,
  HT_DCPERIOD: yd,
  HT_DCPHASE: vd,
  HT_PHASOR: wd,
  HT_SINE: bd,
  HT_TRENDLINE: xd,
  HT_TRENDMODE: Cd,
  IMI: Td,
  KAMA: Sd,
  LINEARREG: Ed,
  LINEARREG_ANGLE: Pd,
  LINEARREG_INTERCEPT: Md,
  LINEARREG_SLOPE: Ld,
  LN: Ad,
  LOG10: Od,
  MA: Nd,
  MACD: Dd,
  MACDEXT: Id,
  MACDFIX: Rd,
  MAMA: kd,
  MAVP: _d,
  MAX: Hd,
  MAXINDEX: $d,
  MEDPRICE: Bd,
  MFI: Ud,
  MIDPOINT: zd,
  MIDPRICE: Vd,
  MIN: Wd,
  MININDEX: Fd,
  MINMAX: Gd,
  MINMAXINDEX: qd,
  MINUS_DI: Yd,
  MINUS_DM: Xd,
  MOM: jd,
  MULT: Kd,
  NATR: Zd,
  OBV: Qd,
  PLUS_DI: Jd,
  PLUS_DM: e0,
  PPO: t0,
  ROC: i0,
  ROCP: s0,
  ROCR: n0,
  ROCR100: r0,
  RSI: Lo,
  SAR: o0,
  SAREXT: a0,
  SIN: l0,
  SINH: h0,
  SMA: Ao,
  SQRT: c0,
  STDDEV: u0,
  STOCH: Oo,
  STOCHF: d0,
  STOCHRSI: m0,
  SUB: p0,
  SUM: f0,
  T3: g0,
  TAN: y0,
  TANH: v0,
  TEMA: w0,
  TRANGE: b0,
  TRIMA: x0,
  TRIX: C0,
  TSF: T0,
  TYPPRICE: S0,
  ULTOSC: E0,
  VAR: P0,
  WCLPRICE: M0,
  WILLR: L0,
  WMA: A0
};
class O0 extends Se {
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
  precision = 2;
  scaleOverlay = !0;
  plots = [
    { key: "AROON_1", title: "AROON", type: "line" }
  ];
  static inCnt = 0;
  static primaryPane = !1;
  static scale = Ne[1];
  static defaultStyle = {
    downStroke: "#c80",
    downLineWidth: "1",
    downLineDash: void 0,
    upStroke: "#08c",
    upLineWidth: "1",
    upLineDash: void 0,
    fillStyle: "#0080c044"
  };
  constructor(e, i = !1, s = !1, n, r, a) {
    super(e, i, s, n, r, a), this.init(Eo);
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
    let a = e.value(e.indexStart)[0], l = this.overlay.data[0][0], h = (a - l) / e.interval, m = this.Timeline.rangeScrollOffset, f = e.Length + m + 2, v = {};
    for (; f; )
      h < 0 || h >= this.overlay.data.length ? (i.down.push({ x: null, y: null }), i.up.push({ x: null, y: null })) : (r.x = this.xAxis.xPos(s[h][0]), r.y = this.yAxis.yPos(s[h][1]), i.down.push({ ...r }), r.x = this.xAxis.xPos(s[h][0]), r.y = this.yAxis.yPos(s[h][2]), i.up.push({ ...r })), h++, f--;
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
class N0 extends Se {
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
    },
    meta: {}
  };
  precision = 2;
  scaleOverlay = !1;
  plots = [
    { key: "BB_1", title: " ", type: "line" }
  ];
  static inCnt = 0;
  static primaryPane = !0;
  static defaultStyle = {
    lowerStroke: "#08c",
    lowerLineWidth: 1,
    lowerLineDash: void 0,
    middleStroke: "#0080c088",
    middleLineWidth: 1,
    middleLineDash: void 0,
    upperStroke: "#08c",
    upperLineWidth: 1,
    upperLineDash: void 0,
    fillStyle: "#0080c044"
  };
  constructor(e, i = !1, s = !1, n, r, a) {
    super(e, i, s, n, r, a), this.init(Po);
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
    let a = e.value(e.indexStart)[0], l = this.overlay.data[0][0], h = (a - l) / e.interval, m = this.Timeline.rangeScrollOffset, f = e.Length + m * 2 + 2, v = {};
    for (; f; )
      h < 0 || h >= this.overlay.data.length ? (i.lower.push({ x: null, y: null }), i.middle.push({ x: null, y: null }), i.upper.push({ x: null, y: null })) : (r.x = this.xAxis.xPos(s[h][0]), r.y = this.yAxis.yPos(s[h][1]), i.lower.push({ ...r }), r.x = this.xAxis.xPos(s[h][0]), r.y = this.yAxis.yPos(s[h][2]), i.middle.push({ ...r }), r.x = this.xAxis.xPos(s[h][0]), r.y = this.yAxis.yPos(s[h][3]), i.upper.push({ ...r })), h++, f--;
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
class tn extends Se {
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
          $function: this.configDialogue.provideEventListener(
            "#Period",
            "change",
            (e) => {
              console.log(`#Period = ${e.target.value}`);
            }
          )
        }
      }
    }
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
  static defaultStyle = {
    stroke: "#C80",
    width: "1"
  };
  constructor(e, i = !1, s = !1, n, r, a) {
    super(e, i, s, n, r, a), tn.inCnt++, this.init(Mo);
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
class D0 extends Se {
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
    },
    meta: {
      input: {
        timePeriod: {
          entry: "timePeriod",
          label: "Period",
          type: "number",
          value: 5,
          default: 5,
          min: "3",
          title: "Number of time units to use in calculation",
          $function: this.configDialogue.provideEventListener(
            "#Period",
            "change",
            (e) => {
              console.log(`#Period = ${e.target.value}`);
            }
          )
        }
      }
    }
  };
  checkParamCount = !1;
  plots = [
    { key: "RSI_1", title: " ", type: "line" }
  ];
  static inCnt = 0;
  static primaryPane = !1;
  static scale = Ne[1];
  static defaultStyle = {
    stroke: "#C80",
    width: 1,
    defaultHigh: 75,
    defaultLow: 25,
    highLowLineWidth: 1,
    highLowStyle: "dashed",
    highStroke: "#848",
    lowStroke: "#848",
    highLowRangeStyle: "#22002220"
  };
  constructor(e, i = !1, s = !1, n, r, a) {
    super(e, i, s, n, r, a), this.init(Lo);
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
    let f = this.Timeline.rangeScrollOffset, v = e.data.length - this.overlay.data.length, T = e.indexStart - v - 2, E = e.Length + f * 2 + 2, M = 0;
    for (; E; )
      T < 0 || T >= this.overlay.data.length || (M > l[T][0] && console.log(T, M, l[T][0]), M = l[T][0], m.x = this.xAxis.xPos(l[T][0]), m.y = this.yAxis.yPos(l[T][1]), r.push({ ...m })), T++, E--;
    this.plot(r, "renderLine", this.style), this.target.viewport.render(), super.updated();
  }
}
class sn extends Se {
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
  static defaultStyle = {
    stroke: "#C80",
    width: "1"
  };
  constructor(e, i = !1, s = !1, n, r, a) {
    super(e, i, s, n, r, a), sn.inCnt++, this.init(Ao);
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
class I0 extends Se {
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
  checkParamCount = !1;
  plots = [
    { key: "STOCH_1", title: " ", type: "line" }
  ];
  static inCnt = 0;
  static primaryPane = !1;
  static scale = Ne[1];
  static defaultStyle = {
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
  constructor(e, i = !1, s = !1, n, r, a) {
    super(e, i, s, n, r, a), this.init(Oo);
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
    let f = e.value(e.indexStart)[0], v = this.overlay.data[0][0], T = (f - v) / e.interval, E = this.Timeline.rangeScrollOffset, M = e.Length + E * 2 + 2;
    for (; M; )
      T < 0 || T >= this.overlay.data.length ? (r.slowD.push({ x: null, y: null }), r.slowK.push({ x: null, y: null })) : (m.x = this.xAxis.xPos(l[T][0]), m.y = this.yAxis.yPos(l[T][1]), r.slowK.push({ ...m }), m.x = this.xAxis.xPos(l[T][0]), m.y = this.yAxis.yPos(l[T][2]), r.slowD.push({ ...m })), T++, M--;
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
class No {
  constructor(e, i) {
    this.scene = e, this.ctx = this.scene.context, this.width = this.scene.width, this.cfg = "volume" in i ? i.volume : i;
  }
  draw(e) {
    const i = this.ctx, n = e.raw[4] >= e.raw[1] ? this.cfg.UpColour : this.cfg.DnColour;
    i.save(), i.strokeStyle = n, i.fillStyle = n, i.fillRect(
      Math.floor(e.x),
      Math.floor(e.z - e.h),
      Math.floor(e.w),
      Math.floor(e.h)
    ), i.restore();
  }
}
class nn extends Se {
  name = "Volume";
  shortName = "VOL";
  checkParamCount = !1;
  scaleOverlay = !0;
  plots = [
    { key: "VOL_1", title: " ", type: "bar" }
  ];
  #e = Bi.volume;
  #t;
  #i = "both";
  static inCnt = 0;
  static primaryPane = "both";
  static scale = Ne[1];
  constructor(e, i = !1, s = !1, n, r, a) {
    super(e, i, s, n, r, a), nn.inCnt++;
    const l = a.overlay;
    this.id = a.overlay?.id || ne(this.shortName), this.#e = { ...this.defaultStyle, ...this.theme.volume }, this.style = l?.settings?.style ? { ...this.#e, ...l.settings.style } : { ...this.#e, ...n.style }, this.chart.type === "primaryPane" ? (this.style.Height = k(this.style.Height, 0, 100) || 100, this.#i = !0) : (this.style.Height = 100, this.#i = !1), this.#t = new No(e.scene, this.style), this.init();
  }
  get primaryPane() {
    return this.#i;
  }
  get defaultStyle() {
    return this.#e;
  }
  legendInputs(e = this.chart.cursorPos) {
    if (this.range.dataLength == 0)
      return !1;
    const i = super.Timeline.xPos2Index(e[0]), s = k(i, 0, this.range.data.length - 1), n = this.range.data[s];
    this.chart.theme.candle;
    const r = n[4] >= n[1] ? [this.style.UpColour.slice(0, 7)] : [this.style.DnColour.slice(0, 7)];
    return { inputs: { V: this.scale.nicePrice(n[5]) }, colours: r };
  }
  calcIndicatorHistory() {
  }
  draw(e = this.range) {
    if (e.dataLength < 2 || !super.mustUpdate())
      return !1;
    this.scene.clear();
    const i = e.data, s = this.scene.height, n = this.xAxis.smoothScrollOffset || 0;
    let r = Math.max(this.xAxis.candleW - 1, 1);
    r < 3 ? r = 1 : r < 5 ? r = 3 : r > 5 && (r = Math.ceil(r * 0.8));
    const a = {
      x: 0 + n - this.xAxis.candleW,
      w: r,
      z: s
    }, l = Math.floor(s * this.style.Height / 100);
    let h = this.core.rangeScrollOffset, m = e.indexStart - h, f = e.Length + h * 2, v = f, T = m, E, M = 0;
    for (; v--; )
      E = e.value(T), E[4] !== null && (M = E[5] > M ? E[5] : M), T++;
    for (; f--; )
      E = e.value(m), a.x = de(this.xAxis.xPos(E[0]) - r / 2), E[4] !== null && (a.h = l - l * ((M - E[5]) / M), a.raw = i[m], this.#t.draw(a)), m++;
    super.updated();
  }
}
const Do = {
  AROON: { id: "AROON", name: "Aroon", event: "addIndicator", ind: O0 },
  BB: { id: "BB", name: "Bollinger Bands", event: "addIndicator", ind: N0 },
  EMA: { id: "EMA", name: "Exponential Moving Average", event: "addIndicator", ind: tn },
  RSI: { id: "RSI", name: "Relative Strength Index", event: "addIndicator", ind: D0 },
  SMA: { id: "SMA", name: "Simple Moving Average", event: "addIndicator", ind: sn },
  STOCH: { id: "STOCH", name: "Stochastic Oscillator", event: "addIndicator", ind: I0 },
  VOL: { id: "VOL", name: "Volume", event: "addIndicator", ind: nn }
}, rn = "0.143.4";
class R0 {
  #e;
  #t;
  #i;
  #n = [];
  constructor(e, i) {
    this.#e = e, this.#t = C(i.id) ? i.id : ne, this.#i = C(i.type) ? i.type : "default", this.#n = P(i.data) ? i.data : [];
  }
}
function k0(o, e = !1) {
  if (!P(o))
    return !1;
  let i = uc(0, o.length);
  if (!Mi(o[0], e) || !Mi(o[i], e) || !Mi(o[o.length - 1], e))
    return !1;
  let s = o[0][0], n = o[1][0], r = o[2][0];
  return !(s > n && n > r);
}
function _0(o, e = !1) {
  if (!P(o))
    return !1;
  let i = 0, s = 0;
  for (; i < o.length; ) {
    if (!Mi(o[i], e) || o[i][0] < s)
      return !1;
    s = o[i][0], i++;
  }
  return !0;
}
function H0(o, e) {
  if (!P(o) || o.length == 1)
    return !1;
  let i, s, n, r, a = [], l = 0, h = (o[o.length - 1][0] - o[l][0]) / e;
  for (; l < h; )
    i = o[l][0], s = o[l + 1][0], n = s - i, n == e ? a.push(o[l]) : n > e && (r = [i + e, null, null, null, null, null], a.push(r), o.splice(l + 1, 0, r)), l++;
  return o;
}
function Mi(o, e = !1) {
  return !(!P(o) || o.length !== 6 || e && !qr(o[0]) || !x(o[1]) || !x(o[2]) || !x(o[3]) || !x(o[4]) || !x(o[5]));
}
function $0(o) {
  for (let e of o)
    for (let i = 0; i < 6; i++)
      e.length = 6, e[i] *= 1;
  return o;
}
const B0 = "defaultState", U0 = {
  version: rn,
  id: B0,
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
    tf: yh,
    tfms: Oi
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
}, vr = {
  timestamp: "number",
  id: "string",
  side: "string",
  price: "number",
  amount: "number",
  filled: "number",
  average: "number",
  total: "number",
  tag: "string"
}, wr = {
  timestamp: "number",
  id: "string",
  title: "string",
  content: "string",
  url: "string"
};
class R {
  static #e = new Te();
  static #t = {};
  static get default() {
    return he(U0);
  }
  static get list() {
    return R.#e;
  }
  static create(e, i = !1, s = !1) {
    const n = new R(e, i, s), r = n.key;
    return R.#e.set(r, n), n;
  }
  static validate(e, i = !1, s = !1) {
    const n = R.default;
    if (w(e) || (e = {}), w(e.chart) || (e.chart = n.chart, e.chart.isEmpty = !0, e.chart.data = P(e.ohlcv) ? e.ohlcv : [], delete e.ohlcv), e = ot(n, e), i ? e.chart.data = _0(e.chart.data, s) ? e.chart.data : [] : e.chart.data = k0(e.chart.data, s) ? e.chart.data : [], e.chart.isEmpty = e.chart.data.length == 0, !x(e.chart?.tf) || i) {
      let h = Ps(e.chart.data);
      h < V && (h = Oi), e.chart.tfms = h;
    }
    if ((!C(e.chart?.tfms) || i) && (e.chart.tf = Vt(e.chart.tfms)), P(e.views) || (e.views = n.views), P(e.primary) || (e.primary = n.primary), P(e.secondary) || (e.secondary = n.secondary), w(e.chart.settings) || (e.chart.settings = n.chart.settings), P(e.datasets) || (e.datasets = []), e.views.length == 0) {
      e.views.push(["primary", e.primary]);
      for (let h in e)
        h.indexOf("secondary") == 0 && e.views.push([h, e[h]]);
    }
    let r = e.views, a = r.length;
    for (; a--; )
      if (!P(r[a]) || r[a].length == 0)
        r.splice(a, 1);
      else {
        let h = e.views[a][1], m = h.length;
        for (; m--; )
          !w(h[m]) || !C(h[m].name) || !C(h[m].type) ? h.splice(m, 1) : w(h[m].settings) || (h[m].settings = {});
        r[a].length == 0 && r.splice(a, 1);
      }
    e.views.length == 0 && (e.views[0] = ["primary", n.primary]), e.views = new Te(e.views), e.views.has("primary") || e.views.insert("primary", n.primary, 0), e.views.get("primary").push(e.chart);
    for (var l of e.datasets)
      this.#t || (this.#t = {}), this.dss[l.id] = new R0(this, l);
    return e;
  }
  static delete(e) {
    if (!C(e) || !R.has(e))
      return !1;
    R.#e.delete(e);
  }
  static has(e) {
    return R.#e.has(e);
  }
  static get(e) {
    return R.#e.get(e);
  }
  static export(e, i = {}) {
    if (!R.has(e))
      return !1;
    w(i) || (i = {});
    const s = R.get(e), n = i?.type, r = he(s.data), a = r.chart.data;
    let l;
    switch (a.length > 0 && a[a.length - 1].length > 6 && (a.length = a.length - 1), r.views.get("primary").pop(), r.views = Array.from(r.views), r.version = rn, n) {
      case "json":
      default:
        const { replacer: h, space: m } = { ...i };
        l = JSON.stringify(r, h, m);
    }
    return l;
  }
  #i = "";
  #n = "";
  #s = {};
  #r;
  #o = !1;
  #l = !0;
  #a = [];
  constructor(e, i = !1, s = !1) {
    w(e) ? (this.#s = R.validate(e, i, s), this.#o = "valid", this.#l = !!this.#s.chart?.isEmpty, this.#r = e?.core instanceof O ? e.core : void 0) : (this.#s = R.default, this.#o = "default", this.#l = !0), this.#i = e?.id || "", this.#n = ne(`${zt}_state`);
  }
  get id() {
    return this.#i;
  }
  get key() {
    return this.#n;
  }
  get status() {
    return this.#o;
  }
  get isEmpty() {
    return this.#l;
  }
  get allData() {
    return {
      data: this.#s.chart.data,
      primaryPane: this.#s.primary,
      secondaryPane: this.#s.secondary,
      datasets: this.#s.datasets
    };
  }
  get data() {
    return this.#s;
  }
  get core() {
    return this.#r !== void 0 ? this.#r : !1;
  }
  get time() {
    return this.#r.time;
  }
  get range() {
    return this.#r.range;
  }
  error(e) {
    this.#r.error(e);
  }
  create(e, i, s) {
    return R.create(e, i, s);
  }
  delete(e) {
    if (!C(e))
      return !1;
    if (e !== this.key)
      R.delete(e);
    else if (R.has(e)) {
      const i = R.create();
      this.use(i.key), R.delete(e);
    }
    return !0;
  }
  list() {
    return R.list;
  }
  has(e) {
    return R.has(e);
  }
  get(e) {
    return R.get(e);
  }
  use(e) {
    const i = this.core;
    if (!R.has(e))
      return i.warn(`${i.name} id: ${i.id} : Specified state does not exist`), !1;
    if (e === this.key)
      return !0;
    i.stream.stop(), i.MainPane.reset();
    let s = R.get(e);
    this.#i = s.id, this.#o = s.status, this.#l = s.isEmpty, this.#s = s.data;
    const n = {
      interval: s.data.chart.tfms,
      core: i
    };
    if (i.getRange(null, null, n), this.range.Length > 1) {
      const r = Ms(i.time, void 0), a = r ? r + this.range.initialCnt : s.data.length - 1, l = r || a - this.range.initialCnt;
      this.range.initialCnt = a - l, i.setRange(l, a);
    }
    i.MainPane.restart(), i.refresh();
  }
  export(e = this.key, i = {}) {
    return R.export(e, i = {});
  }
  mergeData(e, i = !1, s = !1) {
    if (!w(e))
      return this.error(`ERROR: ${this.id}: merge data must be type Object!`), !1;
    let n = P(e?.ohlcv) ? e.ohlcv.length - 1 : 0;
    if (n > 1 && this.time.timeFrameMS !== Ps(e?.ohlcv))
      return this.error(`ERROR: ${this.core.id}: merge data time frame does not match existing time frame!`), !1;
    (this.#l || !x(this.time.timeFrameMS)) && (!w(i) || !x(i.start) || !x(i.end)) && n > 1 && (i = { start: n - this.range.initialCnt, end: n }), w(i) ? (x(i?.startTS) ? i.start = i.startTS : i.start = x(i.start) ? this.range.value(i.start)[0] : this.range.timeMin, x(i?.endTS) ? i.end = i.endTS : i.end = x(i.end) ? this.range.value(i.end)[0] : this.range.timeMax) : (i = {}, i.start = this.range.timeMin, i.end = this.range.timeMax);
    let r, a, l = e?.ohlcv || !1;
    const h = this.allData.data, m = this.allData?.primaryPane, f = e?.primary || !1, v = this.allData?.secondaryPane, T = e?.secondary || !1, E = this.allData?.dataset?.data, M = e?.dataset?.data || !1;
    this.allData?.trades, e?.trades, this.allData?.events, e?.events;
    const I = P(l) && this.range.inRange(l[0][0]) ? 1 : 0, re = {};
    if (P(l) && l.length > 0) {
      if (r = l.length - 1, h.length - 1, re.mData = this.range.inRange(l[0][0]) && this.range.inRange(l[0][r]), !F(l[r][7]) && l[r].length !== 8 && l[r][6] !== null && l[r][7] !== !0 ? l = $0(l) : i.end >= this.range.timeFinish && i.start <= this.range.timeFinish && (i.start += this.range.interval, i.end += this.range.interval), h.length == 0)
        this.allData.data.push(...l);
      else {
        let D = this.time.timeFrameMS, L = l[0][0], oe = l[l.length - 1][0], X = (l.length - 1) * D;
        oe > L + X && (l = H0(l, D)), this.data.chart.data = this.merge(h, l);
      }
      if (s)
        this.#r.calcAllIndicators(s);
      else {
        if (P(f) && f.length > 0) {
          for (let D of f)
            if (P(D?.data) && D?.data.length > 0)
              for (let L of m)
                w(L) && L.name === D.name && L.type === D.type && Pi(L.settings, D.settings) && (L.data = this.merge(L.data, D.data), this.#r.getIndicator(L.id).drawOnUpdate = !0);
        }
        if (P(T) && T.length > 0) {
          for (let D of T)
            if (P(D?.data) && D?.data.length > 0)
              for (let L of v)
                w(L) && L.name === D.name && L.type === D.type && Pi(L.settings, D.settings) && (L.data = this.merge(L.data, D.data), this.#r.getIndicator(L.id).drawOnUpdate = !0);
        }
        this.#r.calcAllIndicators();
      }
      if (P(M) && M.length > 0) {
        for (let D of M)
          if (P(D?.data) && D?.data.length > 0)
            for (let L of E)
              L.name === D.name && L.type === D.type && Pi(L.settings, D.settings) && (L.data = this.merge(L.data, D.data));
      }
      i && (w(i) ? (a = x(i.start) ? this.range.getTimeIndex(i.start) : this.range.indexStart, n = x(i.end) ? this.range.getTimeIndex(i.end) : this.range.indexEnd) : (l[0][0] && (a = this.range.indexStart + I), n = this.range.indexEnd + I), this.#r.setRange(a, n));
      let me, _ = !1;
      for (me in re)
        _ = _ || me;
      return e.ohlcv.length > 1 && this.#r.emit("state_mergeComplete"), _ && this.#r.refresh(), this.#l = !1, !0;
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
    if (!C(e))
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
    const i = Object.keys(e), s = Object.keys(vr);
    if (!w(e) || !Di(i, s))
      return !1;
    for (let a of s)
      if (typeof e[a] !== vr[a])
        return !1;
    const n = e.timestamp - e.timestamp % this.time.timeFrameMS, r = new Date(n);
    return e.dateStr = `${r.getFullYear()}/${r.getMonth() + 1}/${r.getDate()} ${r.getHours()}:${r.getMinutes()}`, P(this.allData.trades[n]) || (this.allData.trades[n] = []), this.allData.trades[n].push(e), !0;
  }
  removeTrade(e) {
    console.log("TODO: state.removeTrade()");
  }
  addEvent(e) {
    const i = Object.keys(e), s = Object.keys(wr);
    if (!w(e) || !Di(i, s))
      return !1;
    for (let a of s)
      if (typeof t[a] !== wr[a])
        return !1;
    const n = t.timestamp - t.timestamp % this.time.timeFrameMS, r = new Date(n);
    return e.dateStr = `${r.getFullYear()}/${r.getMonth() + 1}/${r.getDate()} ${r.getHours()}:${r.getMinutes()}`, P(this.allData.events[n]) || (this.allData.events[n] = []), this.allData.events[n].push(e), !0;
  }
  removeEvent(e) {
    console.log("TODO: state.removeEvent()");
  }
}
class Vi {
  #e;
  #t;
  #i;
  #n = {};
  #s;
  #r;
  #o = "stopped";
  #l;
  #a;
  #h;
  #c;
  #d = ["await", "idle", "running", "stopped"];
  constructor(e, i) {
    if (!Vi.validateConfig(e))
      return !1;
    const s = { ...e };
    this.id = s.id, this.#s = s, this.#t = s.initial, this.#n.origin = i, this.#c = s.actions, this.#r = i.core, this.#u();
  }
  set id(e) {
    this.#e = Fe(e);
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
    return this.#o;
  }
  get event() {
    return this.#a;
  }
  get events() {
    return this.#l;
  }
  get eventData() {
    return this.#h;
  }
  get actions() {
    return this.#c;
  }
  notify(e, i) {
    this.#a = e, this.#h = i;
    const s = this.#s.states[this.#t];
    let n = s.on[e];
    if (!n || !N(n.action) || this.#o !== "running")
      return !1;
    let r = n?.condition?.type || n?.condition || !1;
    if (r && !this.condition.call(this, r, n.condition))
      return !1;
    const a = n.target, l = this.#s.states[a];
    if (s?.onExit.call(this, i), n.action.call(this, i), this.#i = this.#t, this.#t = a, l?.onEnter.call(this, i), this.#s.states[a]?.on && (this.#s.states[a].on[""] || this.#s.states[a].on?.always)) {
      const h = this.#s.states[a].on[""] || this.#s.states[a].on.always;
      if (P(h))
        for (let m of h) {
          let f = m?.condition?.type || m?.condition || !1;
          this.condition.call(this, f, m.condition) && C(m.target) && (m?.action.call(this, i), this.#i = this.#t, this.#t = m?.target, this.notify(null, null));
        }
      else if (w(h) && C(h.target)) {
        let m = h?.condition?.type || h?.condition || !1;
        this.condition.call(this, m, h.condition) && C(h.target) && (h?.action.call(this, i), this.#i = this.#t, this.#t = h.target, this.notify(null, null));
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
    this.#o = "running";
  }
  stop() {
    this.#o = "stopped";
  }
  destroy() {
    this.stop(), this.#p(), this.#s = null;
  }
  #u() {
    this.#l = /* @__PURE__ */ new Set();
    for (let e in this.#s.states)
      for (let i in this.#s.states[e].on) {
        let s = this.notify.bind(this, i);
        this.#l.add({ topic: i, cb: s }), this.#r.on(i, s, this.context);
      }
  }
  #p() {
    this.#r.hub.expunge(this.context), this.#l.clear();
  }
  static validateConfig(e) {
    if (!w(e))
      return !1;
    const i = ["id", "initial", "context", "states"];
    let s = Object.keys(e);
    if (!So(i, s) || !(e.initial in e.states))
      return !1;
    for (let n in e.states) {
      if (!w(e.states[n]) || "onEnter" in e.states[n] && !N(e.states[n].onEnter) || "onExit" in e.states[n] && !N(e.states[n].onExit))
        return !1;
      if ("on" in e.states[n])
        for (let r in e.states[n].on) {
          let a = e.states[n].on[r];
          if (!C(a.target) || "action" in a && !N(a.action))
            return !1;
        }
    }
    return !0;
  }
}
const z0 = "alert";
class V0 {
  #e = new Te();
  #t = {};
  constructor(e) {
    if (P(e))
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
    if (P(e)) {
      let i = [];
      for (let s of e)
        i.push(this.add(s?.price, s?.condition, s?.handler));
      return i;
    } else
      return !1;
  }
  add(e, i, s) {
    if (isNaN(e) || !N(s))
      return !1;
    const n = ne(z0), r = { price: e, condition: i };
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
    if (!(!P(e) || !P(i))) {
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
const W0 = 0, F0 = 1, G0 = 2, q0 = 3, Y0 = 4, X0 = 5, fi = [null, null, null, null, null], gi = {
  tfCountDown: !0,
  alerts: []
};
class bt {
  #e;
  #t;
  #i;
  #n;
  #s;
  #r;
  #o;
  #l = fi;
  #a = 0;
  #h = 0;
  #c = "";
  #d = !1;
  #u;
  #p;
  #m = fi;
  #f;
  static validateConfig(e) {
    if (w(e)) {
      let i = he(gi);
      e = ot(i, e), e.tfCountDown = F(e.tfCountDown) ? e.tfCountDown : gi.tfCountDown, e.alerts = P(e.alerts) ? e.alerts : gi.alerts;
    } else
      return gi;
    return e;
  }
  constructor(e) {
    this.#e = e, this.#n = e.time, this.status = { status: Wa }, this.#t = bt.validateConfig(e.config?.stream), this.#s = x(e.config?.maxCandleUpdate) ? e.config.maxCandleUpdate : qa, this.#o = x(e.config?.streamPrecision) ? e.config.streamPrecision : Ya;
  }
  get config() {
    return this.#t;
  }
  get countDownMS() {
    return this.#h;
  }
  get countDown() {
    return this.#c;
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
    this.#d || (this.#d = !0, this.status = { status: Ds, data: e });
  }
  get alerts() {
    return this.#f;
  }
  get lastPriceMin() {
    return this.#p;
  }
  set lastPriceMin(e) {
    x(e) && (this.#p = e);
  }
  get lastPriceMax() {
    return this.#u;
  }
  set lastPriceMax(e) {
    x(e) && (this.#u = e);
  }
  get lastTick() {
    return this.#m;
  }
  set lastTick(e) {
    P(e) && (this.#m, this.#m = e, this.alerts.check(e, this.#l));
  }
  set candle(e) {
    const i = [...this.#l];
    e.t = this.roundTime(new Date(e.t)), e.o = e.o * 1, e.h = e.h * 1, e.l = e.l * 1, e.c = e.c * 1, e.v = e.v * 1, this.#l[W0] !== e.t ? this.newCandle(e) : this.updateCandle(e), this.status = { status: vi, data: this.#l }, this.lastTick = i;
  }
  get candle() {
    return this.#l !== fi ? this.#l : null;
  }
  start() {
    this.#f = new V0(this.#t.alerts), this.status = { status: kn }, this.#r = setInterval(this.onUpdate.bind(this), this.#s);
  }
  stop() {
    this.#f.destroy(), this.status = { status: Fa };
  }
  emit(e, i) {
    this.#e.emit(e, i);
  }
  error() {
    this.status = { status: Ga };
  }
  onTick(e) {
    (this.#i == kn || this.#i == vi) && w(e) && (this.candle = e);
  }
  onUpdate() {
    this.#l !== fi && (this.status = { status: Ke, data: this.candle }, this.status = { status: vi, data: this.#l });
  }
  newCandle(e) {
    this.prevCandle(), this.#l = [
      e.t,
      e.o,
      e.h,
      e.l,
      e.c,
      e.v,
      null,
      !0
    ], this.#e.state.mergeData({ ohlcv: [this.#l] }, !0, !1), this.status = { status: Is, data: { data: e, candle: this.#l } }, this.#h = this.#n.timeFrameMS, this.#a = this.roundTime(Date.now());
  }
  prevCandle() {
    const e = this.#e.allData.data;
    e.length > 0 && e[e.length - 1][7] && (e[e.length - 1].length = 6);
  }
  updateCandle(e) {
    let i = this.#l;
    i[F0] = e.o, i[G0] = e.h, i[q0] = e.l, i[Y0] = e.c, i[X0] = e.v, this.#l = i;
    const s = this.#e.allData.data, n = s.length > 0 ? s.length - 1 : 0;
    s[n] = this.#l, this.countDownUpdate();
  }
  countDownUpdate() {
    let e, i, s, n, r, a, l;
    this.#n.timeFrameMS;
    let h = this.#n.timeFrameMS - (Date.now() - this.#a);
    return h < 0 && (h = 0), this.#h = h, h > xe ? (e = String(Math.floor(h / xe)), i = String(Math.floor(h % xe / ue)).padStart(2, "0"), this.#c = `${e}Y ${i}M`) : h > ue ? (i = String(Math.floor(h / ue)).padStart(2, "0"), n = String(Math.floor(h % ue / $)).padStart(2, "0"), this.#c = `${i}M ${n}D`) : h > xt ? (s = String(Math.floor(h / xt)).padStart(2, "0"), n = String(Math.floor(h % ue / $)).padStart(2, "0"), this.#c = `${s}W ${n}D`) : h > $ ? (n = String(Math.floor(h / $)).padStart(2, "0"), r = String(Math.floor(h % $ / Q)).padStart(2, "0"), a = String(Math.floor(h % Q / W)).padStart(2, "0"), this.#c = `${n}D ${r}:${a}`) : h > Q ? (r = String(Math.floor(h / Q)).padStart(2, "0"), a = String(Math.floor(h % Q / W)).padStart(2, "0"), l = String(Math.floor(h % W / V)).padStart(2, "0"), this.#c = `${r}:${a}:${l}`) : h > W ? (a = String(Math.floor(h / W)).padStart(2, "0"), l = String(Math.floor(h % W / V)).padStart(2, "0"), this.#c = `00:${a}:${l}`) : (l = String(Math.floor(h / V)).padStart(2, "0"), String(h % V).padStart(4, "0"), this.#c = `00:00:${l}`), this.#c;
  }
  roundTime(e) {
    return e - e % this.#e.time.timeFrameMS;
  }
}
const br = ["constructor", "list", "setCurrent", "setTheme", "setValue"];
class Le {
  static #e = new Te();
  static get list() {
    return Le.#e;
  }
  #t;
  static create(e, i) {
    if (!w(e))
      return !1;
    e.id = C(e.name) ? ne(e.name) : `${i.id}.theme`;
    const s = new Le(e, i);
    return Le.list.set(e.id, s), s;
  }
  constructor(e, i) {
    this.#t = i, this.setCurrent(e);
  }
  get list() {
    return Le.list;
  }
  setCurrent(e = {}) {
    e = w(e) ? e : {};
    const i = he(Bi), s = he(e), n = ot(i, s);
    for (let r in n)
      br.includes(r) || (this[r] = n[r]);
    this.#t.refresh();
  }
  setTheme(e) {
    if (C(e) && Le.list.has(e)) {
      const i = Le.list.get(e);
      return this.setCurrent(i), !0;
    }
    return !1;
  }
  setProperty(e, i) {
    if (!C(e))
      return;
    const s = yr(this, e), n = e.split(".");
    if (n.length == 1)
      this[n[0]] = i;
    else {
      let r = n.shift();
      this[r] = To(this[r], n.join("."), i);
    }
    return this.#t.refresh(), s;
  }
  getProperty(e) {
    return yr(this, e);
  }
  deleteTheme(e) {
    return C(e) && Le.list.has(e) ? (Le.list.delete(e), !0) : !1;
  }
  exportTheme(e = {}) {
    w || (e = {});
    const i = e?.type, s = {};
    let n;
    for (let r in this)
      br.includes(r) || (s[r] = this[r]);
    switch (i) {
      case "json":
      default:
        const { replacer: r, space: a } = { ...e };
        n = JSON.stringify(s, r, a);
    }
    return n;
  }
}
class j0 {
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
class K0 {
  #e;
  #t;
  #i;
  #n = 0;
  #s = {};
  #r;
  constructor(e, i, s, n) {
    this.#e = e, this.#t = s, this.#i = n;
    const r = `
      ${Oe.ThreadWorker.toString()};
      const fn = ${i}
      const worker = new ThreadWorker(fn)
    `, a = new Blob([`;(async () => {${r}})().catch(e => {console.error(e)})`], { type: "text/javascript" }), l = URL.createObjectURL(a);
    this.#r = new Worker(l);
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
    return N(this.#t) ? this.#t(e) : e;
  }
  onerror(e) {
    return N(this.#i) ? this.#i(e) : e;
  }
  postMessage(e) {
    return new Promise((i, s) => {
      try {
        let n = this.req;
        this.#s[n] = { resolve: i, reject: s }, this.#r.postMessage({ r: n, data: e }), this.#r.onmessage = (r) => {
          const { r: a, status: l, result: h } = r.data;
          if (a in this.#s) {
            const { resolve: m, reject: f } = this.#s[a];
            delete this.#s[a], l ? m(this.onmessage(h)) : f(this.onerror({ r: a, result: h }));
          } else if (l == "resolved")
            this.onmessage(h);
          else
            throw new Error("Orphaned thread request ${r}");
        }, this.#r.onerror = (r) => {
          s(this.onerror(r));
        };
      } catch (n) {
        s(n);
      }
    });
  }
  terminate() {
    this.#r.terminate();
  }
}
class Oe {
  static #e = /* @__PURE__ */ new Map();
  static ThreadWorker = j0;
  static Thread = K0;
  static create(e, i = "worker", s) {
    if (typeof window.Worker > "u")
      return !1;
    if (N(e))
      e = e.toString();
    else if (!C(e))
      return !1;
    return i = C(i) ? ne(i) : ne("worker"), Oe.#e.set(i, new Oe.Thread(i, e, s)), Oe.#e.get(i);
  }
  static destroy(e) {
    if (!C(e))
      return !1;
    Oe.#e.get(e).terminate(), Oe.#e.delete(e);
  }
  static end() {
    Oe.#e.forEach((e, i, s) => {
      Oe.destroy(i);
    });
  }
}
class _t {
  #e = {};
  constructor() {
  }
  on(e, i, s) {
    return !C(e) || !N(i) ? !1 : (this.#e[e] || (this.#e[e] = []), this.#e[e].push({ handler: i, context: s }), !0);
  }
  off(e, i, s) {
    if (!C(e) || !N(i) || !(e in this.#e))
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
    C(e) && (this.#e[e] || []).forEach(
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
class J extends HTMLElement {
  shadowRoot;
  template;
  id = ne(zt);
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
    super(), this.#e = new _t(), this.template = e, this.shadowRoot = this.attachShadow({ mode: i });
  }
  destroy() {
  }
  connectedCallback(e) {
    this.doInit && (this.doInit = !1, this.shadowRoot.appendChild(this.template.content.cloneNode(!0)), this.style.display = "block", this.DOM.width = this.clientWidth, this.DOM.height = this.clientHeight, this.oldDOM.width = this.clientWidth, this.oldDOM.height = this.clientHeight, this.intersectionObserver = new IntersectionObserver(this.onResize.bind(this)), this.intersectionObserver.observe(this), this.resizeObserver = new ResizeObserver(this.onResize.bind(this)), this.resizeObserver.observe(this), N(e) && e());
  }
  disconnectedCallback() {
    this.resizeObserver.disconnect();
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
  get dimensions() {
    return this.DOM;
  }
  set cursor(e) {
    this.style.cursor = e;
  }
  get cursor() {
    return this.style.cursor;
  }
  get hub() {
    return this.#e;
  }
  setDim(e, i) {
    !["width", "height"].includes(i) || !C(e) || (x(e) ? (this.DOM[i] = e, e += "px") : C(e) ? e.match(Ht) || (e = "100%") : (this.DOM[i] = this.parentElement.getBoundingClientRect()[i], e = this.DOM[i] + "px"), this.style[i] = e);
  }
  getDims() {
    const e = this.getBoundingClientRect();
    for (let i in e) {
      const s = e[i];
      N(s) || (this.DOM[i] = s);
    }
    return this.DOM.visible = lt(this), this.DOM.viewport = Rs(this), this.DOM;
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
    return this.#e instanceof _t ? this.#e.on(e, i, s) : !1;
  }
  off(e, i, s = this) {
    return this.#e instanceof _t ? this.#e.off(e, i, s) : !1;
  }
  expunge(e) {
    return this.#e instanceof _t ? this.#e.expunge(e) : !1;
  }
  emit(e, i) {
    return this.#e instanceof _t ? this.#e.emit(e, i) : !1;
  }
}
const Io = ["source-over", "source-atop", "source-in", "source-out", "destination-over", "destination-atop", "destination-in", "destination-out", "lighter", "copy", "xor", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], on = typeof OffscreenCanvas < "u";
let Ro = class {
  #e = 0;
  constructor(e = {}) {
    if (!Y(e.container))
      throw new Error("Viewport container is not a valid HTML element.");
    this.container = e.container, this.layers = [], this.id = G.idCnt++, this.scene = new G.Scene(), this.setSize(e.width || 0, e.height || 0);
  }
  get OffscreenCanvas() {
    return on;
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
    return e instanceof Ls ? (this.layers.push(e), e.setSize(e.width || this.width, e.height || this.height), e.viewport = this, this) : !1;
  }
  removeLayer(e) {
    return e instanceof Ls ? (this.layers.splice(e.index, 1), !0) : !1;
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
      this.removeLayer(e), e.destroy();
  }
  render(e = !1) {
    let { scene: i, layers: s } = this, n;
    i.clear();
    for (n of s)
      e && n.layers.length > 0 && n.render(e), n.visible && n.width > 0 && n.height > 0 && (i.context, Io.includes(n?.composition) && (i.context.globalCompositeOperation = n.composition), i.context.globalAlpha = n.alpha, i.context.drawImage(
        n.scene.canvas,
        n.x,
        n.y,
        n.width,
        n.height
      ));
  }
};
class Z0 extends Ro {
  constructor(e = {}) {
    super(e);
    const i = this.scene.canvas, s = e.container;
    s?.hasCanvasSlot && (i.slot = "viewportCanvas"), s.innerHTML = "", s.appendChild(i), G.viewports.push(this);
  }
  destroy() {
    super.destroy(), this.container.innerHTML = "", G.viewports.splice(this.index, 1);
  }
}
class Ls {
  #e = 0;
  #t = 0;
  #i = 0;
  #n = 0;
  #s = 1;
  #r = !0;
  #o = null;
  #l = on;
  viewport;
  constructor(e = {}) {
    this.id = G.idCnt++, this.hit = new G.Hit({
      layer: this,
      contextType: e.contextType,
      offscreen: this.#l
    }), this.scene = new G.Scene({
      layer: this,
      contextType: e.contextType,
      offscreen: this.#l
    }), e.x && e.y && this.setPosition(e.x, e.y), e.width && e.height && this.setSize(e.width, e.height), e.composition && (this.setComposition = e.composition), e.alpha && (this.alpha = e.alpha), e.visible && (this.visible = e.visible);
  }
  set x(e) {
    x(e) && (this.#e = e);
  }
  get x() {
    return this.#e;
  }
  set y(e) {
    x(e) && (this.#t = e);
  }
  get y() {
    return this.#t;
  }
  set width(e) {
    x(e) && (this.#i = e);
  }
  get width() {
    return this.#i;
  }
  set height(e) {
    x(e) && (this.#n = e);
  }
  get height() {
    return this.#n;
  }
  set alpha(e) {
    this.#s = x(e) ? k(e, 0, 1) : 1;
  }
  get alpha() {
    return this.#s;
  }
  set composition(e) {
    Io.includes(e) && (this.#o = e);
  }
  get composition() {
    return this.#o;
  }
  set visible(e) {
    F(e) && (this.#r = e);
  }
  get visible() {
    return this.#r;
  }
  get isOffScreen() {
    return this.#l;
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
  move(e) {
    let { index: i = 0, viewport: s } = this, n = s.layers, r;
    switch (typeof e == "number" && (r = k(Math.floor(e), (n.length - 1) * -1, n.length - 1), e = "order"), e) {
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
        Lc(n, this.index, r);
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
    an(1, 1), this.scene.clear(), this.hit.clear();
  }
}
class Q0 {
  #e = 0;
  #t = 0;
  constructor(e = { offscreen: !1 }) {
    this.id = G.idCnt++, this.layer = e.layer, this.contextType = e.contextType || "2d";
    const i = document.createElement("canvas");
    i.className = "scene-canvas", i.style.display = "block", e.width && e.height && this.setSize(e.width, e.height), on && e?.offscreen ? (this.canvas = i.transferControlToOffscreen(), this.offscreen = !0) : this.canvas = i, this.context = this.canvas.getContext(this.contextType);
  }
  set width(e) {
    x(e) && (this.#e = e);
  }
  get width() {
    return this.#e;
  }
  set height(e) {
    x(e) && (this.#t = e);
  }
  get height() {
    return this.#t;
  }
  setSize(e, i) {
    return an(e, i, this);
  }
  clear() {
    return ko(this);
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
class J0 {
  #e = 0;
  #t = 0;
  constructor(e = {}) {
    this.layer = e.layer, this.contextType = e.contextType || "2d", this.canvas = document.createElement("canvas"), this.canvas.className = "hit-canvas", this.canvas.style.display = "none", this.canvas.style.position = "relative", this.context = this.canvas.getContext(this.contextType, {
      preserveDrawingBuffer: !0,
      antialias: !1
    }), e.width && e.height && this.setSize(e.width, e.height);
  }
  set width(e) {
    x(e) && (this.#e = e);
  }
  get width() {
    return this.#e;
  }
  set height(e) {
    x(e) && (this.#t = e);
  }
  get height() {
    return this.#t;
  }
  setSize(e, i) {
    return an(e, i, this, !1);
  }
  clear() {
    return ko(this);
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
function ko(o) {
  let e = o.context;
  return o.contextType === "2d" ? e.clearRect(
    0,
    0,
    o.width * G.pixelRatio,
    o.height * G.pixelRatio
  ) : e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT), o;
}
function an(o, e, i, s = !0) {
  return i.width = o, i.height = e, i.canvas.width = o * G.pixelRatio, i.canvas.height = e * G.pixelRatio, i.offscreen || (i.canvas.style.width = `${o}px`, i.canvas.style.height = `${e}px`), s && i.contextType === "2d" && G.pixelRatio !== 1 && i.context.scale(G.pixelRatio, G.pixelRatio), i;
}
const G = {
  idCnt: 0,
  viewports: [],
  pixelRatio: window && window.devicePixelRatio || 1,
  Node: Ro,
  Viewport: Z0,
  Layer: Ls,
  Scene: Q0,
  Hit: J0
}, be = G;
class em {
  #e;
  #t;
  #i;
  #n;
  #s;
  constructor(e, i = []) {
    this.#i = e, this.#e = e.core, this.#n = new Te([...i]);
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
    const s = new be.Layer(this.layerConfig);
    try {
      return this.parent.viewport.addLayer(s), i.layer = s, i.instance = new i.class(
        s,
        this.#i.TimeLine,
        this.#i.Scale,
        this.#e.theme,
        this,
        i.params
      ), C(i.instance?.id) || (i.instance.id = e), this.#n.set(i.instance.id, i), i;
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
class Ii extends U {
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
    if (i.save(), i.strokeStyle = this.core.theme.chart.GridColour || lo.COLOUR_GRID, e != "y") {
      const n = this.xAxis.xAxisGrads.values;
      for (let r of n) {
        let a = de(r[1]);
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
class As extends U {
  #e = [0, 0];
  #t = !0;
  #i;
  constructor(e, i = !1, s = !1, n, r, a) {
    super(e, i, s, n, r, a), this.core.on("main_mousemove", this.onMouseMoveX, this), this.#i = new He(this.target.viewport.container, { disableContextMenu: !1 }), this.#i.on("pointermove", this.onMouseMove.bind(this)), this.#i.on("pointerenter", this.onMouseMove.bind(this));
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
    let s, n, r, a = this.#e;
    w(e) ? (s = e.timeStamp, n = Math.round(e.position.x), r = Math.round(e.position.y)) : (s = e[6], n = Math.round(e[0]), r = Math.round(e[1])), !(i && a[1] == r) && (a[0] == n && a[1] == r || (a[0] = n, a[1] = r, a[6] = s, this.draw()));
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
class _o extends U {
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
    this.scene.clear(), h.save(), h.fillStyle = r.bakCol, h.fillRect(1, l, this.width, a), Tt(h, `${n}`, 1, l, r), h.restore();
  }
  erase() {
    this.scene.clear(), this.target.viewport.render();
  }
}
const tm = [
  ["grid", { class: Ii, fixed: !0 }],
  ["cursor", { class: As, fixed: !0 }]
];
class at {
  #e;
  #t;
  #i;
  #n;
  #s;
  #r;
  #o;
  #l;
  #a;
  #h;
  constructor(e, i, s, n = !1) {
    this.#n = e, this.#e = e.core, this.#t = this.core.config, this.#i = this.core.theme, this.#o = this.#n.element, this.#a = i, this.createViewport(s, n);
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
  set width(e) {
    this.setWidth(e);
  }
  get width() {
    return this.#o.width;
  }
  set height(e) {
    this.setHeight(e);
  }
  get height() {
    return this.#o.height;
  }
  get dimensions() {
    return this.#o.dimensions;
  }
  set layerWidth(e) {
    this.#h = e || this.#o.width;
  }
  get layerWidth() {
    return this.#h;
  }
  get stateMachine() {
    return this.#n.stateMachine;
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
    return this.#n.Scale;
  }
  get yAxis() {
    return this.#n.Scale.yAxis;
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
    for (let [r, a] of n)
      a.instance.setSize(s, i);
    this.draw(), this.render();
  }
  createViewport(e = [], i = !1) {
    e = e.length == 0 ? he(tm) : e;
    const { width: s, height: n } = this.layerConfig();
    let r = i ? be.Node : be.Viewport;
    this.#s = new r({
      width: s,
      height: n,
      container: this.#a
    }), this.#l = this.#s.scene.canvas, this.#r = new em(this, e);
  }
  layerConfig() {
    const e = this.config?.buffer || $i, i = this.#a.getBoundingClientRect().width, s = this.#a.getBoundingClientRect().height;
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
      r.instance instanceof U && (i && r.instance.setRefresh(), r.instance.draw(), r.fixed || (r.instance.position = [this.#e.scrollPos, 0]));
    };
    this.executeOverlayList(s);
  }
  drawAll() {
    const e = (i, s) => {
      s.instance instanceof U && s.instance.setRefresh();
    };
    this.executeOverlayList(e);
  }
  executeOverlayList(e) {
    const i = this.#r.list;
    if (!(i instanceof Te))
      return !1;
    let s = [];
    for (let [n, r] of i)
      try {
        e(n, r);
      } catch (a) {
        s.push({ overlay: n, error: a });
      }
    if (s.length > 0)
      for (let n of s)
        this.#e.error(`ERROR: executeOverlayList() ${n.overlay}`), this.#e.error(n.error);
    else
      s = !0;
    return s;
  }
  render() {
    this.#s.render();
  }
  refresh() {
    this.draw(this.range, !0), this.render();
  }
}
class ct {
  #e;
  #t;
  #i;
  #n;
  #s;
  #r;
  constructor(e, i) {
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
    this.#e = Fe(e);
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
    this.#s = new Vi(e, this);
  }
  get stateMachine() {
    return this.#s;
  }
  set graph(e) {
    e instanceof at && (this.#r = e);
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
const os = {
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
};
class ln {
  static #e;
  #t;
  #i;
  #n;
  #s;
  #r = { w: 0, h: 0 };
  #o = { w: 0, h: 0, x: 0, y: 0 };
  #l = { x: !1, y: !0 };
  #a;
  #h = { x: 0, drag: !1 };
  #c;
  #d;
  constructor(e) {
    this.#t = ln.#e++, this.#i = e.core, this.#n = Y(e.elContainer) ? e.elContainer : !1, this.#s = Y(e.elHandle) ? e.elHandle : !1, this.#d = N(e.callback) ? e.callback : !1, Y(this.#n) && Y(this.#s) && (this.mount(), this.eventsListen());
  }
  set cursor(e) {
    this.#s.style.cursor = e;
  }
  get cursor() {
    return this.#s.style.cursor;
  }
  eventsListen() {
    this.#c = new He(this.#s, { disableContextMenu: !1 }), this.#c.on("mouseenter", De(this.onMouseEnter, 1, this, !0)), this.#c.on("mouseout", De(this.onMouseOut, 1, this, !0)), this.#c.on("drag", _c(this.onHandleDrag, 100, this)), this.#c.on("enddrag", this.onHandleDragDone.bind(this)), this.#c.on("mousedown", De(this.onMouseDown, 100, this, !0)), this.#c.on("mouseup", this.onMouseUp.bind(this));
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
    e && (this.colour = new en(e), this.#s.style.backgroundColor = this.colour.hex);
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
    this.#h.drag || (this.#h.drag = !0, this.#h.x = e.position.x), this.handlePos(e);
  }
  onHandleDragDone(e) {
    this.handlePos(e), this.#h.drag = !1;
  }
  mount() {
    this.#r.w = this.#n.getBoundingClientRect().width, this.#r.h = this.#n.getBoundingClientRect().height, this.#n.style.overflow = "hidden", this.#o.w = this.#s.getBoundingClientRect().width, this.#o.h = this.#s.getBoundingClientRect().height, this.#s.style.marginRight = 0, this.#s.style.position = "absolute";
  }
  handlePos(e) {
    let i = this.#i.range, s = parseInt(this.#s.style.marginLeft), n = this.#n.getBoundingClientRect().width, r = this.#s.getBoundingClientRect().width, a = n - r, l = e.position.x - this.#h.x, h = k(s + l, 0, a), m = (i.dataLength + i.limitFuture + i.limitPast) / n, f = Math.floor(h * m);
    this.setHandleDims(h, r), this.#i.jumpToIndex(f);
  }
  setHandleDims(e, i) {
    let s = this.#n.getBoundingClientRect().width;
    i = i || this.#s.getBoundingClientRect().width, e = e / s * 100, this.#s.style.marginLeft = `${e}%`, i = i / s * 100, this.#s.style.width = `${i}%`;
  }
}
class im extends U {
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
    const i = this.scene.context, s = this.xAxis.xAxisGrads.values, n = 0, r = this.theme.xAxis, a = F(r.tickMarker) ? r.tickMarker : !0;
    i.save(), i.strokeStyle = r.colourTick, i.fillStyle = r.colourTick, i.font = `${r.fontWeight} ${r.fontSize}px ${r.fontFamily}`;
    for (let l of s) {
      let h = de(l[1]), m = Math.floor(i.measureText(`${l[0]}`).width * 0.5);
      i.fillText(l[0], h - m + n, this.xAxis.xAxisTicks + 12), a && (i.beginPath(), i.moveTo(h + n, 0), i.lineTo(h + n, this.xAxis.xAxisTicks), i.stroke());
    }
    i.restore(), super.updated();
  }
}
class sm extends U {
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
class nm extends U {
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
    }, h = Ui(e, a, l), m = s + this.core.bufferPx;
    m = this.xAxis.xPosSnap2CandlePos(m), m = m - Math.round(h * 0.5) - this.core.scrollPos - this.core.bufferPx, this.scene.clear(), e.save(), Tt(e, a, m, 1, l), e.restore();
  }
}
const rm = [
  ["labels", { class: im, fixed: !1, required: !0 }],
  ["overlay", { class: sm, fixed: !1, required: !0 }],
  ["cursor", { class: nm, fixed: !1, required: !0 }]
];
class om extends ct {
  #e = "Timeline";
  #t = "time";
  #i;
  #n;
  #s;
  #r;
  #o;
  #l;
  #a;
  #h;
  #c;
  #d;
  #u;
  #p;
  #m = new Te();
  #f = [];
  #w;
  #P;
  #x;
  #y;
  #C;
  #T;
  #g;
  #b;
  #v;
  #M = {
    width: 20,
    height: 20,
    fill: "#aaa"
  };
  #L = { end: !1, start: !1 };
  constructor(e, i) {
    super(e, i), this.#r = i.elements.elTime, this.#i = e.Chart, this.#n = new Ei(this), this.init();
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
    return this.#o;
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
    return this.#y;
  }
  get layerLabels() {
    return this.#P;
  }
  get layerOverlays() {
    return this.#x;
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
    return this.#w;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return se(this.#r);
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
    this.#o = e.viewport, this.#l = e.overview, this.#a = e.overview.icons, this.#h = e.overview.scrollBar, this.#c = e.overview.handle, this.#d = e.overview.rwdStart, this.#u = e.overview.fwdEnd;
    const i = {
      core: this.core,
      elContainer: this.#h,
      elHandle: this.#c,
      callback: null
    };
    this.#v = new ln(i), this.core.theme?.time?.navigation === !1 && this.navigationDisplay(!1);
  }
  setWidth(e) {
    this.#r.style.width = `${e}px`, this.#o.style.width = `${e}px`;
  }
  setDimensions(e) {
    const i = this.config.buffer || $i, s = e.w, n = this.height, r = Math.round(s * ((100 + i) * 0.01));
    this.graph.setSize(s, n, r), this.draw();
  }
  navigationDisplay(e) {
    if (e)
      this.#u.style["margin-top"] = 0, this.#d.style["margin-top"] = 0;
    else {
      const i = this.core.theme.xAxis?.background ? this.core.theme.xAxis.Background : this.core.theme.chart.Background;
      this.#l.style.visibility = "hidden", this.#u.style["margin-top"] = `${this.#o.clientHeight * -1}px`, this.#d.style["margin-top"] = `${this.#o.clientHeight * -1}px`, this.#u.style.background = this.core.theme.chart.Background, this.#d.style.background = i;
    }
  }
  start() {
    this.createGraph(), this.onSetRange(), this.#n.initXAxisGrads(), this.draw(), this.eventsListen(), os.id = this.id, os.context = this, this.stateMachine = os, this.stateMachine.start();
  }
  destroy() {
    this.stateMachine.destroy(), this.#C.destroy(), this.#T.destroy(), this.#g.destroy(), this.core.hub.expunge(this), this.off("main_mousemove", this.#y.draw, this.#y), this.#u.removeEventListener("click", De), this.#d.removeEventListener("click", De), this.graph.destroy(), this.element.remove();
  }
  eventsListen() {
    this.#C = new He(this.#o, { disableContextMenu: !1 }), this.#C.on("dblclick", this.onDoubleClick.bind(this)), this.#C.on("pointerover", this.onPointerEnter.bind(this)), this.#C.on("pointerout", this.onPointerLeave.bind(this)), this.#C.on("pointerdrag", this.onPointerDrag.bind(this)), this.#T = new He(this.#u, { disableContextMenu: !1 }), this.#T.on("pointerover", () => this.showJump(this.#L.end)), this.#T.on("pointerleave", () => this.hideJump(this.#L.end)), this.#g = new He(this.#d, { disableContextMenu: !1 }), this.#g.on("pointerover", () => this.showJump(this.#L.start)), this.#g.on("pointerleave", () => this.hideJump(this.#L.start)), this.on("main_mousemove", this.#y.draw, this.#y), this.on("setRange", this.onSetRange, this), this.#u.addEventListener("click", De(this.onPointerClick, 1e3, this, !0)), this.#d.addEventListener("click", De(this.onPointerClick, 1e3, this, !0));
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
    e.domEvent.target.style.cursor = "ew-resize", this.#l.style.visibility = "visible", this.hideCursorTime();
  }
  onPointerLeave(e) {
    this.core.theme?.time?.navigation === !1 && !(this.#L.end && this.#L.start) && (this.#l.style.visibility = "hidden");
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
    let s = this.#h.getBoundingClientRect().width, n = e.dataLength + e.limitFuture + e.limitPast, r = s / n, a = e.Length * r, l = (i + e.limitPast) * r;
    this.#v.setHandleDims(l, a);
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
    let e = he(rm);
    this.graph = new at(this, this.#o, e, !1), this.#y = this.graph.overlays.get("cursor").instance, this.#P = this.graph.overlays.get("labels").instance, this.#x = this.graph.overlays.get("overlay").instance, this.graph.addOverlays(this.#f);
  }
  addOverlays(e) {
    if (!P(e))
      return !1;
    this.graph === void 0 ? this.#f.push(...e) : this.graph.addOverlays(e);
  }
  addOverlay(e, i) {
    if (!w(i))
      return !1;
    if (this.graph === void 0)
      this.#f.push([e, i]);
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
    this.core.theme?.time?.navigation === !1 && (this.#l.style.visibility = "hidden");
  }
  showJump(e) {
    this.#l.style.visibility = "visible", this.hideCursorTime();
  }
}
const am = {
  renderQ: new Te(),
  rendered: [],
  renderLog: !1,
  dropFrames: !0,
  graphs: [],
  range: {},
  status: !1,
  init: function(o) {
    w(o) && (this.renderLog = o?.renderLog || !1, this.dropFrames = o?.dropFrames || !0, this.graphs = P(o?.graphs) ? [...o.graphs] : [], this.range = w(o?.range) ? o.range : {});
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
  expungeFrames() {
    this.renderQ.clear();
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
    this.status = !0, requestAnimationFrame(this.execute.bind(this));
  },
  stop: function() {
    this.status = !1, this.renderQ.clear();
  },
  execute: function() {
    if (!this.status || (requestAnimationFrame(this.execute.bind(this)), this.renderQ.size === 0))
      return;
    const [o, e] = this.renderQ.firstEntry();
    if (e.range?.snapshot) {
      for (let i of e.graphs)
        N(i.draw) && i?.status !== "destroyed" && i.draw(e.range, e.update);
      for (let i of e.graphs)
        N(i.render) && i?.status !== "destroyed" && i.render();
      this.frameDone();
    }
  }
}, lm = am, xr = [
  "-webkit-touch-callout",
  "-webkit-user-select",
  "-khtml-user-select",
  "-moz-user-select",
  "-ms-user-select",
  "user-select"
];
class hm {
  #e;
  #t;
  #i;
  #n;
  #s;
  #r;
  #o;
  #l = [];
  #a;
  #h = {};
  #c;
  #d;
  #u = null;
  constructor(e, i) {
    this.#e = e, this.#t = i, this.#i = i.core, this.#n = i.core.theme.legend, this.init(), this.eventsListen();
  }
  get elTarget() {
    return this.#e;
  }
  get list() {
    return this.#h;
  }
  set collapse(e) {
    this.setCollapse(e);
  }
  get collapse() {
    return this.#o;
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
    for (let e in this.#h)
      e !== "collapse" && this.remove(e);
    this.#e.remove();
  }
  eventsListen() {
    this.#i.on("chart_pan", this.primaryPanePan, this), this.#i.on("chart_panDone", this.primaryPanePanDone, this);
  }
  init() {
    const e = this.#e.legends;
    this.#r = e.querySelector(".controls"), this.#o = e.querySelectorAll(".control"), this.#c = e.querySelector("#showLegends"), this.#d = e.querySelector("#hideLegends"), this.#r.style.display = "none", this.icons(this.#o, { id: "collapse", parent: this }), this.#e.legends.classList.add("hide"), this.#u = "hide", this.collapse = "show";
  }
  onPointerClick(e) {
    const i = (s) => C(s.dataset.icon) ? { id: s.id, icon: s.dataset.icon, parent: s.parentElement } : s.parentElement.className !== "controls" ? i(s.parentElement) : !1;
    return i(e);
  }
  onMouseOver(e) {
  }
  onLegendAction(e) {
    const i = this.onPointerClick(e.currentTarget);
    this.setCollapse(i.icon);
  }
  setCollapse(e) {
    e === "show" && this.#u !== "show" ? (this.#u = e, this.#c.style.display = "none", this.#d.style.display = "inline-block", this.#e.legends.classList.toggle("hide")) : e === "hide" && this.#u !== "hide" && (this.#u = e, this.#c.style.display = "inline-block", this.#d.style.display = "none", this.#e.legends.classList.toggle("hide"));
  }
  primaryPanePan() {
    for (let e of xr)
      this.#e.style.setProperty(e, "none");
  }
  primaryPanePanDone() {
    for (let e of xr)
      this.#e.style.removeProperty(e);
  }
  add(e) {
    if (!w(e))
      return !1;
    const i = () => {
      this.#i.error("ERROR: Legend parent missing!");
    };
    e.id = e?.id || ne("legend"), e.type = e?.type || "overlay", e.title = e?.title || e?.parent.legendName, e.parent = e?.parent || i, e.visible = F(e?.visible) ? e.visible : !0;
    const s = this.elTarget.buildLegend(e, this.#i.theme);
    this.#e.legends.insertAdjacentHTML("beforeend", s);
    const n = this.#e.legends.querySelector(`#legend_${e.id}`);
    return this.#a = n.querySelectorAll(".control"), this.#h[e.id] = {
      el: n,
      type: e.type,
      source: e?.source,
      click: []
    }, this.icons(this.#a, e), e.type == "indicator" && (this.#r.style.display = "block", !e.parent.primaryPane && Object.keys(this.#h).length < 3 && (this.#r.style.display = "none")), n.style.display = e.visible ? "block" : "none", e.id;
  }
  remove(e) {
    if (!(e in this.#h) || this.#h[e].type === "chart")
      return !1;
    this.#h[e].el.remove();
    for (let i of this.#h[e].click)
      i.el.removeEventListener("click", i.click);
    return delete this.#h[e], Object.keys(this.#h).length < 2 && (this.#r.style.display = "none"), !0;
  }
  update(e, i) {
    if (!w(i) || !(e in this.#h) || this.#i.range.data.length == 0)
      return !1;
    let s = this.#h[e].source(i.pos);
    const n = this.#e.buildInputs(s);
    this.#e.legends.querySelector(`#legend_${e} dl`).innerHTML = n;
  }
  modify(e, i) {
    if (!(e in this.#h) || !w(i))
      return !1;
    const s = this.#h[e].el;
    for (let n in i)
      switch (n) {
        case "legendName":
          const r = s.querySelectorAll(".title");
          return r[0].innerHTML = i[n], r[1].innerHTML = i[n], !0;
        case "legendVisibility":
          const a = i[n] ? "block" : "none", l = i[n] ? "visible" : "hidden";
          return s.style.display = a, s.style.visibility = l, !0;
      }
  }
  icons(e, i) {
    let s;
    for (let n of e) {
      let r = n.querySelector("svg");
      r.style.width = `${this.#n.controlsW}px`, r.style.height = `${this.#n.controlsH}px`, r.style.fill = `${this.#n.controlsColour}`, r.onpointerover = (a) => a.currentTarget.style.fill = this.#n.controlsOver, r.onpointerout = (a) => a.currentTarget.style.fill = this.#n.controlsColour, s = i.parent.onLegendAction.bind(i.parent), i.id === "collapse" ? this.#l.push({ el: n, click: s }) : this.#h[i.id].click.push({ el: n, click: s }), n.addEventListener("click", s);
    }
  }
}
const as = {
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
}, cm = {
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
class um extends U {
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
    const e = this.scene.context, i = this.yAxis, s = this.yAxis.calcGradations() || [], n = this.theme.yAxis, r = F(n.tickMarker) ? n.tickMarker : !0;
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
class dm extends U {
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
class mm extends U {
  constructor(e, i, s, n, r, a) {
    r = s, s = s.yAxis, super(e, i, s, n, r, a), this.viewport = e.viewport;
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  draw(e) {
    if (e === void 0)
      return;
    const i = this.scene.context, s = this.core.stream instanceof bt && this.config.stream.tfCountDown;
    let n = e[4], r = this.parent.nicePrice(n), a = {
      fontSize: Ae.FONTSIZE * 1.05,
      fontWeight: Ae.FONTWEIGHT,
      fontFamily: Ae.FONTFAMILY,
      txtCol: "#FFFFFF",
      bakCol: Ae.COLOUR_CURSOR_BG,
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 5,
      paddingRight: 3,
      width: this.viewport.width
    }, l = 0, h = zi(a), m = this.parent.yPos(n) - h * 0.5;
    this.scene.clear(), i.save(), e[4] >= e[1] ? a.bakCol = this.theme.candle.UpBodyColour : a.bakCol = this.theme.candle.DnBodyColour, Tt(i, r, l, m, a), s && (r = this.core.stream.countDownUpdate(), a.fontSize = a?.fontSize / 1.1, Tt(i, r, l, m + h, a)), i.restore(), this.viewport.render();
  }
}
const pm = [
  ["labels", { class: um, fixed: !0, required: !0 }],
  ["overlay", { class: dm, fixed: !0, required: !0 }],
  ["price", { class: mm, fixed: !0, required: !0 }],
  ["cursor", { class: _o, fixed: !0, required: !0 }]
];
class fm extends ct {
  #e = "Y Scale Axis";
  #t = "scale";
  #i;
  #n;
  #s;
  #r;
  #o;
  #l;
  #a;
  #h;
  #c;
  #d = new Te();
  #u = [];
  #p;
  #m;
  #f;
  #w;
  #P = {};
  constructor(e, i) {
    super(e, i), this.#r = this.options.elScale, this.#i = this.options.chart, this.id = `${this.parent.id}_scale`, this.#o = this.#r.viewport || this.#r;
  }
  get name() {
    return this.#e;
  }
  get shortName() {
    return this.#t;
  }
  set height(e) {
    this.setHeight(e);
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
    return this.#c;
  }
  get layerLabels() {
    return this.#l;
  }
  get layerOverlays() {
    return this.#a;
  }
  get layerPriceLine() {
    return this.#h;
  }
  get overlays() {
    return Object.fromEntries([...this.graph.overlays.list]);
  }
  get yAxis() {
    return this.#s;
  }
  set yAxisType(e) {
    this.#s.yAxisType = Ne.includes(e) ? e : Ne[0];
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
    return se(this.#r);
  }
  get digitCnt() {
    return this.#p;
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
  get Scale() {
    return this;
  }
  start() {
    const e = this.parent.name == "Chart" ? void 0 : this.parent.localRange;
    this.#s = new Ft(this, this, this.options.yAxisType, e), this.createGraph(), this.#s.calcGradations(), this.draw(), this.eventsListen();
    const i = he(cm);
    i.id = this.id, i.context = this, this.stateMachine = i, this.stateMachine.start();
  }
  restart() {
    this.#s.setRange(this.core.range), this.draw();
  }
  destroy() {
    this.core.hub.expunge(this), this.off(`${this.parent.id}_pointerout`, this.#c.erase, this.#c), this.off(Ke, this.onStreamUpdate, this.#h), this.stateMachine.destroy(), this.graph.destroy(), this.#m.destroy(), this.element.remove();
  }
  eventsListen() {
    let e = this.graph.viewport.scene.canvas;
    this.#m = new He(e, { disableContextMenu: !1 }), this.#m.setCursor("ns-resize"), this.#m.on("pointerdrag", this.onDrag.bind(this)), this.#m.on("pointerdragend", this.onDragDone.bind(this)), this.#m.on("wheel", this.onMouseWheel.bind(this)), this.#m.on("dblclick", this.resetScaleRange.bind(this)), this.on(`${this.parent.id}_pointermove`, this.onMouseMove, this), this.on(`${this.parent.id}_pointerout`, this.#c.erase, this.#c), this.on(Ke, this.#h.draw, this.#h), this.on("setRange", this.draw, this);
  }
  onResize(e) {
    this.setDimensions(e);
  }
  onMouseMove(e) {
    this.#w = P(e) ? e : [Math.floor(e.position.x), Math.floor(e.position.y)], this.#c.draw(this.#w);
  }
  onDrag(e) {
    this.#w = [
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
  }
  onChartDrag(e) {
    this.#s.mode === "manual" && (this.#s.offset = e.domEvent.srcEvent.movementY, this.draw());
  }
  setHeight(e) {
    this.#r.style.height = `${e}px`;
  }
  setDimensions(e) {
    const i = this.#r.getBoundingClientRect().width;
    this.setHeight(e.h), this.graph instanceof at && (this.graph.setSize(i, e.h, i), this.draw()), this.#c instanceof _o && this.calcPriceDigits();
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
    return this.#s.lastYData2Pixel(e);
  }
  yPos2Price(e) {
    return this.#s.yPos2Price(e);
  }
  nicePrice(e) {
    let i = Ts(e);
    return Ss(i, this.core.pricePrecision);
  }
  createGraph() {
    let e = he(pm);
    this.graph = new at(this, this.#o, e, !1), this.#c = this.graph.overlays.get("cursor").instance, this.#l = this.graph.overlays.get("labels").instance, this.#a = this.graph.overlays.get("overlay").instance, this.#h = this.graph.overlays.get("price").instance, this.graph.addOverlays(this.#u), this.#h.target.moveTop(), this.#c.target.moveTop(), this.calcPriceDigits();
  }
  calcPriceDigits() {
    let e = 8;
    if (this.core.range.dataLength > 0 && this.#s instanceof Ft) {
      const i = this.#s.niceNumber(this.range.valueMax), s = Ts(i);
      e = `${Ss(s, this.core.pricePrecision)}`.length + 2;
    }
    return this.#p = e < 8 ? 8 : e, this.#p;
  }
  calcScaleWidth() {
    const e = this.calcPriceDigits(), i = this.core.MainPane.graph.viewport.scene.context, s = this.theme.yAxis;
    i.font = St(s.fontSize, s.fontWeight, s.fontFamily);
    const n = Qs(i, "0");
    return e * n;
  }
  addOverlays(e) {
    if (!P(e))
      return !1;
    this.graph === void 0 ? this.#u.push(...e) : this.graph.addOverlays(e);
  }
  addOverlay(e, i) {
    if (!w(i))
      return !1;
    if (this.graph === void 0)
      this.#u.push([e, i]);
    else {
      let s = this.graph.addOverlay(e, i);
      return this.#h.target.moveTop(), this.#c.target.moveTop(), s;
    }
  }
  render() {
    this.graph.render();
  }
  draw(e = this.range, i = !0) {
    this.graph.draw(e, i), this.parent.drawGrid(i), this.parent.draw(this.range, !0);
  }
  resize(e = this.width, i = this.height) {
    this.setDimensions({ w: e, h: i });
  }
}
class gm extends U {
  watermark = {};
  constructor(e, i = !1, s = !1, n, r, a) {
    super(e, i, s, n, r, a), this.params.content = a?.content || "";
  }
  set position(e) {
    this.target.setPosition(0, 0);
  }
  draw() {
    const e = this.config?.watermark;
    if (super.mustUpdate(), e?.display !== !1) {
      if (e?.imgURL)
        this.watermark.imgURL = e.imgURL, ks(e?.imgURL, this.renderImage.bind(this));
      else if (C(e?.text)) {
        this.watermark.text = e.text, this.scene.clear();
        const i = this.scene.context;
        i.save(), this.renderText(e.text), i.restore();
      } else
        return;
      super.updated();
    }
  }
  renderText(e) {
    const i = Math.floor(this.core.height / Ve), s = this.core.config?.watermark?.fontSize, n = this.core.config?.watermark?.fontWeight, r = this.core.config?.watermark?.fontFamily, a = this.core.config?.watermark?.textColour, l = {
      fontSize: (s || this.theme.watermark.FONTSIZE) * i,
      fontWeight: n || this.theme.watermark.FONTWEIGHT,
      fontFamily: r || this.theme.watermark.FONTFAMILY,
      txtCol: a || this.theme.watermark.COLOUR
    }, h = this.scene.context;
    h.font = St(l?.fontSize, l?.fontWeight, l?.fontFamily), h.textBaseline = "top", h.fillStyle = l.txtCol;
    const m = zi(l), f = Ui(h, e, l), v = (this.scene.width - f) / 2, T = (this.core.Chart.height - m) / 2;
    h.fillText(e, v, T);
  }
  renderImage(e) {
    if (!e)
      return;
    const i = this.core.config?.watermark?.imgHeight || this.theme.watermark.IMGHEIGHT, s = this.core.config?.watermark?.imgWidth || this.theme.watermark.IMGWIDTH, n = (this.scene.width - s) / 2, r = (this.scene.height - i) / 2;
    this.scene.clear();
    const a = this.scene.context;
    a.save(), bo(a, e, n, r, i, s), a.restore();
  }
}
class ym extends U {
  #e;
  #t;
  constructor(e, i = !1, s = !1, n, r, a) {
    super(e, i, s, n, r, a), this.#e = new No(e.scene, n), this.theme.volume.Height = k(n?.volume?.Height, 0, 100) || 100;
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
    let h = this.core.rangeScrollOffset, m = e.indexStart - h, f = e.Length + h * 2, v = f, T = m, E, M = 0;
    for (; v--; )
      E = e.value(T), E[4] !== null && (M = E[5] > M ? E[5] : M), T++;
    for (; f--; )
      E = e.value(m), a.x = de(this.xAxis.xPos(E[0]) - r / 2), E[4] !== null && (a.h = l - l * ((M - E[5]) / M), a.raw = i[m], this.#e.draw(a)), m++;
    super.updated();
  }
}
class Ho {
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
    let l = Math.max(Math.floor(a * 0.5), 1), h = Math.abs(e.o - e.c), m = e.c === e.o ? 1 : 2, f = e.x, v = Math.floor(f) - 0.5;
    if (i.save(), i.strokeStyle = r, i.beginPath(), i.moveTo(v, Math.floor(e.h)), this.cfg.candle.Type === Z.OHLC ? i.lineTo(v, Math.floor(e.l)) : s ? (i.lineTo(v, Math.floor(e.c)), i.moveTo(v, Math.floor(e.o))) : (i.lineTo(v, Math.floor(e.o)), i.moveTo(v, Math.floor(e.c))), i.lineTo(v, Math.floor(e.l)), i.stroke(), a == 3) {
      i.fillStyle = r;
      let T = s ? 1 : -1;
      i.rect(
        Math.floor(f - l),
        e.c,
        Math.floor(l * 2),
        T * Math.max(h, m)
      ), i.fill(), i.stroke();
    } else if (a > 3 && this.fill) {
      i.fillStyle = n;
      let T = s ? 1 : -1;
      i.rect(
        Math.floor(f - l),
        e.c,
        Math.floor(l * 2),
        T * Math.max(h, m)
      ), i.fill(), i.stroke();
    } else if (a > 3 && !this.fill && this.cfg.candle.Type !== Z.OHLC) {
      let T = s ? 1 : -1;
      i.rect(
        Math.floor(f - l),
        e.c,
        Math.floor(l * 2),
        T * Math.max(h, m)
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
    if (!P(e) || e.length == 0)
      return;
    let i = this.ctx, s = this.cfg.candle, n;
    Math.max(e[0].w - 1, 1), e[0].x;
    let r = [e[0].x, e[0].h];
    i.save(), i.strokeStyle = s.AreaLineColour || s.UpBodyColour || s.DnBodyColour, i.lineWidth = 1, i.beginPath(), i.moveTo(e[0].x, e[0].h);
    let a = 0;
    for (; a < e.length; )
      i.lineTo(e[a].x, e[a].h), a++;
    if (s?.Type == "area") {
      if (n = i.createLinearGradient(0, 0, 0, this.scene.height), P(s.AreaFillColour))
        for (let [l, h] of s.AreaFillColour.entries())
          n.addColorStop(l, h);
      else
        C(s.AreaFillColour) ? n = s.AreaFillColour : n = s.UpBodyColour || s.DnBodyColour;
      i.stroke(), i.lineTo(e[a - 1].x, this.scene.height), i.lineTo(r[0], this.scene.height), i.fillStyle = n, i.closePath(), i.fill();
    } else
      i.stroke();
    i.restore(), e.length = 0;
  }
}
class $o extends U {
  #e;
  constructor(e, i = !1, s = !1, n, r) {
    super(e, i, s, n, r), this.#e = new Ho(e.scene, n);
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
class vm extends U {
  #e;
  constructor(e, i = !1, s = !1, n, r, a) {
    super(e, i, s, n, r, a), this.#e = new Ho(e.scene, n), this.theme.priceLineStyle = this.theme?.priceLineStyle || rc;
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
    r.o = this.yAxis.yPos(i[1]), r.h = this.yAxis.yPos(i[2]), r.l = this.yAxis.yPos(i[3]), r.c = this.yAxis.yPos(i[4]), r.raw = i, e.inRenderRange(i[0]) && s(r), i[4] >= i[1] ? this.theme.priceLineStyle.stroke = this.core.theme.candle.UpBodyColour : this.theme.priceLineStyle.stroke = this.core.theme.candle.DnBodyColour, Kt(
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
      if (h = r.createLinearGradient(0, 0, 0, this.scene.height), P(a.candle.AreaFillColour))
        for (let [m, f] of a.candle.AreaFillColour.entries())
          h.addColorStop(m, f);
      else
        C(a.candle.AreaFillColour) ? h = a.candle.AreaFillColour : h = a.candle.UpBodyColour || a.candle.DnBodyColour;
      r.stroke(), r.lineTo(n.x, this.scene.height), r.lineTo(e.x, this.scene.height), r.fillStyle = h, r.closePath(), r.fill();
    } else
      r.stroke();
    r.restore();
  }
}
const Ut = {
  colour: "#4444cc88",
  wdith: 1,
  dash: [1, 0]
};
class wm extends U {
  constructor(e, i = !1, s = !1, n, r, a) {
    super(e, i, s, n, r, a);
    const l = { class: bm, fixed: !0, required: !1 };
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
    const h = e.valueHi, m = e.valueLo, f = { ...this.theme.yAxis }, v = this.scene.context;
    f.colourCursorBG = this.theme?.hilo?.colour || Ut.colour, v.save(), v.strokeStyle = this.theme?.highLow?.colour || Ut.colour, v.strokeWidth = this.theme?.highLow?.width || Ut.width, v.setLineDash(this.theme?.highLow?.dash || Ut.dash), n = this.yAxis.yPos(h), Kt(v, n, 0, r, l), i = "High", s = this.theme.yAxis.location == "left" ? 0 : r - (a + 25), Ri(v, i, s, n, a, f), n = this.yAxis.yPos(m), Kt(v, n, 0, r, l), i = "Low", Ri(v, i, s, n, a, f), v.restore(), super.updated(), "hiLo" in this.chart.scale.overlays && (this.chart.scale.overlays.hiLo.instance.setRefresh(), this.chart.scale.overlays.hiLo.instance.scaleDraw());
  }
}
class bm extends U {
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
    h.colourCursorBG = this.theme?.hilo?.colour || Ut.colour, i = this.chart.Scale.nicePrice(a), s = 1, n = this.yAxis.yPos(a) + 1, r = this.viewport.width, Ri(m, i, s, n, r, h), i = this.chart.Scale.nicePrice(l), n = this.yAxis.yPos(l) + 1, Ri(m, i, s, n, r, h), super.updated();
  }
}
function Ri(o, e, i, s, n, r) {
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
  o.save(), o.fillStyle = a.bakCol, o.fillRect(i, h, n, l), Tt(o, `${e}`, i, h, a), o.restore();
}
class xm {
  data;
  icon;
  constructor(e, i) {
    this.scene = e.scene, this.hit = e.hit, this.ctx = this.scene.context, this.ctxH = this.hit.context, this.width = this.scene.width, this.cfg = i.events, this.dims = { w: this.cfg.iconWidth, h: this.cfg.iconHeight }, this.icon = ft(this.cfg.iconEvent, this.cfg.iconColour, this.dims);
  }
  draw(e) {
    this.data = e;
    const i = this.icon, s = this.cfg, n = this.hit.getIndexValue(e.key), r = ft(s.iconEvent, n, this.dims), a = k(e.w, s.iconMinDim, s.iconHeight), l = k(e.w, s.iconMinDim, s.iconWidth), h = this.data.x, m = this.data.y, f = this.ctx, v = this.ctxH;
    return f.save(), f.drawImage(i, h, m, l, a), f.restore(), v.save(), v.drawImage(r, h, m, l, a), v.restore(), { x: h, y: m, w: l, h: a, k: n };
  }
}
const Cr = {
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
class Cm extends U {
  #e;
  #t = [];
  #i;
  constructor(e, i = !1, s = !1, n, r, a) {
    super(e, i, s, n, r, a), this.#e = new xm(e, n), this.core.on("primary_pointerdown", this.onPrimaryPointerDown, this), Cr.parent = this, this.#i = this.core.WidgetsG.insert("Dialogue", Cr), this.#i.start();
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  get data() {
    return this.overlay.data;
  }
  onPrimaryPointerDown(e) {
    this.core.MainPane.stateMachine.state !== "chart_pan" && De(this.isNewsEventSelected, Gt, this)(e);
  }
  isNewsEventSelected(e) {
    const i = e[0], s = e[1], n = this.hit.getIntersection(i, s);
    if (this.core.config?.events?.display === !1 || this.core.config?.events?.displayInfo === !1 || n == -1)
      return;
    const r = this.theme.events, a = k(this.xAxis.candleW, r.iconMinDim, r.iconHeight), l = this.xAxis.pixel2T(i), h = this.xAxis.scrollOffsetPx, m = this.core.dimensions;
    let f = Object.keys(this.data)[n] * 1, v = this.xAxis.xPos(l) + h, T = s - a * 1.5 - m.height, E = "";
    for (let I of this.data[f])
      E += this.buildNewsEventHTML(I);
    const M = {
      dimensions: { h: void 0, w: 150 },
      position: { x: v + a / 2 + 1, y: T },
      content: E,
      offFocus: Gt + 1
    };
    this.core.emit("event_selected", f), this.#i.open(M);
  }
  buildNewsEventHTML(e) {
    let i = e?.title, s = `<style>
    h1, p {display: inline-block; font-size: 0.9em;
    max-width: 98%;
    </style>`;
    return C(e?.url) && (i = `<a href="${e?.url}" target="${e?.target}">${i}</a>`), s += `<h1>${i}</h1>`, s += `<p>${e?.content}</p>`, s;
  }
  draw(e = this.core.range) {
    if (this.core.config?.events?.display === !1 || !super.mustUpdate())
      return;
    this.hit.clear(), this.scene.clear(), this.#t.length = 0;
    const s = {
      x: (this.xAxis.smoothScrollOffset || 0) - this.xAxis.candleW,
      w: this.xAxis.candleW
    };
    let n = this.theme.events, r = this.core.rangeScrollOffset, a = e.indexStart - r, l = e.Length + r * 2, h, m, f;
    for (; l; ) {
      if (h = e.value(a), m = `${h[0]}`, f = Object.keys(this.data).indexOf(m), f >= 0)
        for (let v of this.data[m])
          s.x = this.xAxis.xPos(h[0]) - this.xAxis.candleW / 2, s.y = this.scene.height - k(this.xAxis.candleW, n.iconMinDim, n.iconHeight) * 1.5, s.key = f, this.#t.push(this.#e.draw(s));
      a++, l--;
    }
    super.updated();
  }
}
class Tm {
  data;
  buy;
  sell;
  constructor(e, i) {
    this.scene = e.scene, this.hit = e.hit, this.ctx = this.scene.context, this.ctxH = this.hit.context, this.width = this.scene.width, this.cfg = i.trades, this.dims = { w: this.cfg.iconWidth, h: this.cfg.iconHeight }, this.buy = ft(this.cfg.iconBuy, this.cfg.buyColour, this.dims), this.sell = ft(this.cfg.iconSell, this.cfg.sellColour, this.dims);
  }
  draw(e) {
    this.data = e;
    const i = this.cfg, s = e.side === "buy" ? this.buy : this.sell, n = e.side === "buy" ? i.iconBuy : i.iconSell, r = this.hit.getIndexValue(e.key), a = ft(n, r, this.dims), l = k(e.w, i.iconMinDim, i.iconHeight), h = k(e.w, i.iconMinDim, i.iconWidth), m = this.data.x, f = this.data.y, v = this.ctx, T = this.ctxH;
    return v.save(), v.drawImage(s, m, f, h, l), v.restore(), T.save(), T.drawImage(a, m, f, h, l), T.restore(), { x: m, y: f, w: h, h: l, k: r };
  }
}
const Tr = {
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
class Sm extends U {
  #e;
  #t = [];
  #i;
  #n;
  constructor(e, i = !1, s = !1, n, r, a) {
    super(e, i, s, n, r, a), this.settings = a.settings, this.#e = new Tm(e, n), this.core.on("primary_pointerdown", this.onPrimaryPointerDown, this), Tr.parent = this, this.#n = this.core.WidgetsG.insert("Dialogue", Tr), this.#n.start();
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
    if (!w(e))
      return !1;
    let i = this.theme.trades;
    for (let s in e)
      e[s] !== void 0 && (i[s] = e[s]);
  }
  onPrimaryPointerDown(e) {
    this.core.MainPane.stateMachine.state !== "chart_pan" && De(this.isTradeSelected, Gt, this)(e);
  }
  isTradeSelected(e) {
    const i = e[2].domEvent.srcEvent, s = (i.target || i.srcElement).getBoundingClientRect(), n = i.clientX - (s.right - s.width), r = i.clientY - s.top, a = this.hit.getIntersection(n, r);
    if (this.core.config?.trades?.display === !1 || this.core.config?.trades?.displayInfo === !1 || a == -1)
      return;
    console.log("isTradeSelected()");
    const l = this.theme.trades, h = k(this.xAxis.candleW, l.iconMinDim, l.iconWidth), m = this.xAxis.pixel2T(n);
    this.core.range.valueByTS(m);
    const f = this.xAxis.scrollOffsetPx, v = this.core.dimensions;
    let T = Object.keys(this.data)[a] * 1, E = this.xAxis.xPos(m) + f, M = r - h * 1.5 - v.height, I = "";
    for (let me of this.data[T])
      I += this.buildTradeHTML(me);
    const re = {
      dimensions: { h: void 0, w: 150 },
      position: { x: E + h / 2 + 1, y: M },
      content: I,
      offFocus: Gt + 1
    };
    this.core.emit("trade_selected", T), this.#n.open(re);
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
    let n = this.theme.trades, r = this.core.rangeScrollOffset, a = e.indexStart - r, l = e.Length + r * 2, h, m, f;
    for (; l; ) {
      if (h = e.value(a), m = `${h[0]}`, f = Object.keys(this.data).indexOf(m), f >= 0)
        for (let v of this.data[m])
          s.x = this.xAxis.xPos(h[0]) - this.xAxis.candleW / 2, s.y = this.yAxis.yPos(h[2]) - k(this.xAxis.candleW, n.iconMinDim, n.iconHeight) * 1.5, s.side = v.side, s.key = f, this.#t.push(this.#e.draw(s));
      a++, l--;
    }
    super.updated();
  }
}
const Sr = {
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
class ie extends U {
  static #e = 0;
  static #t = {};
  static get inCnt() {
    return ie.#e++;
  }
  static create(e, i) {
    const s = ++ie.#e;
    i.cnt = s, i.modID = `${i.toolID}_${s}`, i.toolID = i.modID, i.target = e;
    const n = new i.tool(i);
    return ie.#t[s] = n, e.chartToolAdd(n), n;
  }
  static destroy(e) {
    e instanceof ie && delete ie.#t[e.inCnt];
  }
  #i;
  #n;
  #s = "Chart Tools";
  #r = "TX_Tool";
  #o;
  #l;
  #a = [0, 0];
  #h = !1;
  #c;
  #d = { TL: [0, 0], BR: [0, 0] };
  constructor(e, i = !1, s = !1, n, r, a) {
    super(e, i, s, n, r, a), this.#n = ie.inCnt, this.config.ID && (this.#i = Fe(this.config.ID)), this.settings = a?.settings || {}, Sr.parent = this, this.#o = this.core.WidgetsG.insert("ConfigDialogue", Sr), this.#o.start(), this.eventsListen();
  }
  set id(e) {
    this.#i = Fe(e);
  }
  get id() {
    return this.#i || `${this.core.id}-${ne(this.#r)}_${this.#n}`;
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
    this.chart.stateMachine.state !== "chart_pan" && De(this.isToolSelected, Gt, this)(e);
  }
  onPointerUp(e) {
  }
  isToolSelected(e) {
  }
  doSettings(e) {
    if (!w(e))
      return !1;
    let i = this.theme.trades;
    for (let s in e)
      e[s] !== void 0 && (i[s] = e[s]);
  }
  isVisible() {
  }
  draw(e = this.core.range) {
    if (!super.mustUpdate() || this.core.config?.tools?.display === !1)
      return;
    this.hit.clear(), this.scene.clear(), this.theme.tools;
    let i = this.core.rangeScrollOffset;
    e.indexStart - i, e.Length + i * 2, super.updated();
  }
}
const Bo = {
  primaryPane: [
    ["watermark", { class: gm, fixed: !0, required: !0, params: { content: null } }],
    ["grid", { class: Ii, fixed: !0, required: !0, params: { axes: "y" } }],
    ["candles", { class: $o, fixed: !1, required: !0 }],
    ["hiLo", { class: wm, fixed: !0, required: !1 }],
    ["stream", { class: vm, fixed: !1, required: !0 }],
    ["tools", { class: ie, fixed: !1, required: !0 }],
    ["cursor", { class: As, fixed: !0, required: !0 }]
  ],
  secondaryPane: [
    ["grid", { class: Ii, fixed: !0, required: !0, params: { axes: "y" } }],
    ["tools", { class: ie, fixed: !1, required: !0 }],
    ["cursor", { class: As, fixed: !0, required: !0 }]
  ]
}, Os = {
  primaryPane: {
    trades: { class: Sm, fixed: !1, required: !1 },
    events: { class: Cm, fixed: !1, required: !1 },
    volume: { class: ym, fixed: !1, required: !0, params: { maxVolumeH: Ci.ONCHART_VOLUME_HEIGHT } }
  },
  secondaryPane: {
    candles: { class: $o, fixed: !1, required: !0 }
  }
}, Pe = {
  id: "chart",
  title: "",
  type: "chart",
  source: () => {
  }
};
class rt extends ct {
  static #e = 0;
  static get cnt() {
    return rt.#e++;
  }
  #t;
  #i;
  #n;
  #s;
  #r;
  #o;
  #l = "idle";
  #a = {
    state: !1,
    height: null,
    rowsHeight: null,
    rowsCnt: 1
  };
  #h;
  #c;
  #d;
  #u;
  #p;
  #m;
  #f;
  #w;
  #P;
  #x;
  #y;
  #C = new Te();
  #T = new Te();
  #g = [0, 0];
  #b = !1;
  #v;
  #M;
  #L;
  #S = {
    valueMax: 110,
    valueMin: -10,
    valueDiff: 120
  };
  #E = {};
  constructor(e, i) {
    if (super(e, i), this.#r = rt.cnt, !w(i))
      return;
    this.#i = this.options.name, this.#n = this.options.shortName, this.#s = this.options.title, this.#o = this.options.type == "primary" ? "primaryPane" : "secondaryPane", this.#x = this.options.view, this.#c = this.options.elements.elScale, this.#h = this.options.elements.elTarget, this.#h.id = this.id, this.legend = new hm(this.elLegend, this), this.isPrimary ? (Pe.type = "chart", Pe.title = this.title, Pe.parent = this, Pe.source = this.legendInputs.bind(this), this.legend.add(Pe), this.yAxisType = "default") : (Pe.type = "secondary", Pe.title = "", Pe.parent = this, Pe.source = () => ({ inputs: {}, colours: [], labels: [] }), this.legend.add(Pe), this.yAxisType = this.core.indicatorClasses[i.view[0].type].ind.scale);
    const s = { ...i };
    s.parent = this, s.chart = this, s.elScale = this.elScale, s.yAxisType = this.yAxisType, this.scale = new fm(this.core, s), this.#l = "init", this.log(`${this.name} instantiated`);
  }
  set id(e) {
    this.#t = Fe(e);
  }
  get id() {
    return this.#t || Fe(`${this.core.id}-${this.#i}_${this.#r}`);
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
    return this.#s;
  }
  get type() {
    return this.#o;
  }
  get status() {
    return this.#l;
  }
  get collapsed() {
    return this.#a;
  }
  get isPrimary() {
    return this.options.view.primary || this.#o === "primaryPane" || !1;
  }
  get element() {
    return this.#h;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return se(this.#h);
  }
  set width(e) {
    this.setWidth(e);
  }
  get width() {
    return this.#h.getBoundingClientRect().width;
  }
  set height(e) {
    this.setHeight(e);
  }
  get height() {
    return this.#h.getBoundingClientRect().height;
  }
  get localRange() {
    return this.#S;
  }
  get stream() {
    return this.#f;
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
    return this.#g;
  }
  set cursorActive(e) {
    this.#b = e;
  }
  get cursorActive() {
    return this.#b;
  }
  get cursorClick() {
    return this.#v;
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
    return this.#c;
  }
  get elLegend() {
    return this.#h.legend;
  }
  get elViewport() {
    return this.#h.viewport;
  }
  set layerWidth(e) {
    this.graph.layerWidth = e;
  }
  get layerWidth() {
    return this.graph.layerWidth;
  }
  set legend(e) {
    this.#p = e;
  }
  get legend() {
    return this.#p;
  }
  set time(e) {
    this.#u = e;
  }
  get time() {
    return this.#u;
  }
  set scale(e) {
    this.#d = e;
  }
  get scale() {
    return this.#d;
  }
  set yAxisType(e) {
    this.setYAxisType(e);
  }
  get yAxisType() {
    return this.#L;
  }
  get axes() {
    return "x";
  }
  get view() {
    return this.#x;
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
    return this.#T;
  }
  get overlaysDefault() {
    return Bo[this.type];
  }
  get indicators() {
    return this.getIndicators();
  }
  get indicatorDeleteList() {
    return this.#E;
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
    this.#u = this.core.Timeline, this.createGraph(), this.#d.start(), this.draw(this.range), this.cursor = "crosshair", as.id = this.id, as.context = this, this.stateMachine = as, this.stateMachine.start(), this.eventsListen();
    let e = { chartPane: this };
    this.#m = this.core.WidgetsG.insert("Divider", e), this.#m.start();
    let s = {
      title: "Chart Config",
      content: `Configure chart ${this.id}`,
      parent: this,
      openNow: !1
    };
    this.#w = this.core.WidgetsG.insert("ConfigDialogue", s), this.#w.start(), this.#l = "running";
  }
  destroy() {
    if (this.#l !== "destroyed") {
      if (!this.core.MainPane.chartDeleteList[this.id]) {
        this.core.warn(`Cannot "destroy()": ${this.id} !!! Use "remove()" or "removeChartPane()" instead.`);
        return;
      }
      this.core.log(`Deleting chart pane: ${this.id}`), this.core.hub.expunge(this), this.removeAllIndicators(), this.stateMachine.destroy(), this.#m.destroy(), this.#d.destroy(), this.graph.destroy(), this.#M.destroy(), this.legend.destroy(), this.stateMachine = void 0, this.#m = void 0, this.#p = void 0, this.#d = void 0, this.graph = void 0, this.#M = void 0, this.core.warn(`Deleting chart pane ${this.id} destroys all of its data!`), this.element.remove(), this.#l = "destroyed";
    }
  }
  remove() {
    this.emit("destroyChartView", this.id);
  }
  eventsListen() {
    this.#M = new He(this.#h, { disableContextMenu: !1 }), this.#M.on("pointerdrag", this.onChartDrag.bind(this)), this.#M.on("pointerdragend", this.onChartDragDone.bind(this)), this.#M.on("pointermove", this.onPointerMove.bind(this)), this.#M.on("pointerenter", this.onPointerEnter.bind(this)), this.#M.on("pointerout", this.onPointerOut.bind(this)), this.#M.on("pointerdown", this.onPointerDown.bind(this)), this.#M.on("pointerup", this.onPointerUp.bind(this)), this.on("main_mousemove", this.updateLegends, this), this.on(vi, this.onStreamListening, this), this.on(Is, this.onStreamNewValue, this), this.on(Ke, this.onStreamUpdate, this), this.on(Ds, this.onStreamNewValue, this), this.on(`${this.id}_removeIndicator`, this.onDeleteIndicator, this), this.isPrimary && this.on("chart_yAxisRedraw", this.onYAxisRedraw, this);
  }
  onChartDrag(e) {
    this.cursor = "grab", this.core.MainPane.onChartDrag(e), this.scale.onChartDrag(e);
  }
  onChartDragDone(e) {
    this.cursor = "crosshair", this.core.MainPane.onChartDragDone(e);
  }
  onPointerMove(e) {
    this.core.MainPane.onPointerActive(this), this.scale.layerCursor.visible = !0, this.graph.overlays.list.get("cursor").layer.visible = !0, this.#g = [Math.round(e.position.x), Math.round(e.position.y)], this.#d.onMouseMove(this.#g), this.emit(`${this.id}_pointermove`, this.#g);
  }
  onPointerEnter(e) {
    this.core.MainPane.onPointerActive(this), this.#g = [Math.round(e.position.x), Math.round(e.position.y)], this.core.MainPane.onMouseEnter(), this.scale.layerCursor.visible = !0, this.graph.overlays.list.get("cursor").layer.visible = !0, this.emit(`${this.id}_pointerenter`, this.#g);
  }
  onPointerOut(e) {
    this.#b = !1, this.#g = [Math.round(e.position.x), Math.round(e.position.y)], this.scale.layerCursor.visible = !1, this.emit(`${this.id}_pointerout`, this.#g);
  }
  onPointerDown(e) {
    this.core.pointerButtons[e.domEvent.srcEvent.button] = !0, this.#v = [Math.floor(e.position.x), Math.floor(e.position.y), e], this.stateMachine.state === "tool_activated" ? this.emit("tool_targetSelected", { target: this, position: e }) : this.isPrimary && this.emit("primary_pointerdown", this.#v);
  }
  onPointerUp(e) {
    this.core.pointerButtons[e.domEvent.srcEvent.button] = !1;
  }
  onStreamListening(e) {
    this.#f !== e && (this.#f = e);
  }
  onStreamNewValue(e) {
    this.draw(this.range, !0);
  }
  onStreamUpdate(e) {
    this.isPrimary ? (this.#P = e, this.chartStreamCandle.draw(), this.layerStream.setPosition(this.core.stream.lastScrollPos, 0), this.updateLegends(this.cursorPos, e)) : this.updateLegends(), this.core.MainPane.draw();
  }
  onYAxisRedraw() {
    this.isPrimary && this.refresh();
  }
  onDeleteIndicator(e) {
    this.removeIndicator(e.id);
  }
  setTitle(e) {
    if (!C(e))
      return !1;
    this.#s = e, Pe.title = e;
    const i = this.legend.list.chart.el.querySelectorAll(".title");
    for (let s of i)
      s.innerHTML = e;
    return !0;
  }
  setWatermark(e) {
    C(e.text) || C(e) ? this.core.config.watermark.text = e : "imgURL" in e && (this.core.config.watermark.imgURL = e);
  }
  setHeight(e) {
    x(e) || (e = this.height || this.parent.height), this.#h.style.height = `${e}px`, this.#c.style.height = `${e}px`, this.elViewport.style.height = `${e}px`, this.#d.setDimensions({ w: null, h: e }), this.Divider?.setPos(), this.Divider?.setWidth();
  }
  setWidth(e) {
  }
  setDimensions(e) {
    const i = this.config.buffer || $i;
    let { w: s, h: n } = e;
    s = this.width, n = n || this.height, this.setHeight(n), this.graph instanceof at && (this.layerWidth = Math.round(s * ((100 + i) * 0.01)), this.graph.setSize(s, n, this.layerWidth), this.draw(void 0, !0), this.core.MainPane.draw(void 0, !1), this.Divider.setPos(), this.Divider.setWidth());
  }
  setLocalRange(e, i) {
    if (!x(i) || !x(e))
      return !1;
    e > i && ([e, i] = [i, e]), this.#S = {
      valueMax: i,
      valueMin: e,
      valueDiff: i - e
    };
  }
  setYAxisType(e) {
    return !C(e) || !Ne.includes(e) || this.type == "primaryPane" && e == "percent" ? !1 : (this.#L = e, !0);
  }
  addOverlays(e) {
    if (!P(e) || e.length < 1)
      return !1;
    const i = [];
    for (let s of e) {
      const n = { fixed: !1, required: !1 };
      if (s.type in this.core.indicatorClasses)
        n.cnt = this.core.indicatorClasses[s.type].ind.cnt, n.id = `${this.id}-${s.type}_${n.cnt}`, n.class = this.core.indicatorClasses[s.type].ind;
      else if (s.type in Os[this.type])
        n.cnt = 1, n.id = `${this.id}-${s.type}`, n.class = Os[this.type][s.type].class;
      else if (s.type in this.core.customOverlays[this.type])
        n.cnt = 1, n.id = `${this.id}-${s.type}`, n.class = this.core.customOverlays[this.type][s.type].class;
      else
        continue;
      n.params = { overlay: s }, s.id = n.id, s.paneID = this.id, i.push([s.id, n]);
    }
    return this.graph.addOverlays(i), !0;
  }
  addIndicator(e) {
    const i = this.type === "primaryPane", s = this.core.indicatorClasses[e.type].ind, n = !!e.settings?.isPrimary;
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
    return !C(e) || !(e in this.indicators) ? !1 : (this.#E[e] = !0, Object.keys(this.indicators).length === 0 && !this.isPrimary ? this.emit("destroyChartView", this.id) : (this.indicators[e].instance.destroy(), this.graph.removeOverlay(e), this.draw(), delete this.#E[e]), !0);
  }
  removeAllIndicators() {
    const e = {}, i = this.getIndicators();
    for (let s in i)
      e[s] = this.removeIndicator(s);
    return e;
  }
  indicatorVisible(e, i) {
    return !C(e) || !(e in this.indicators) ? !1 : this.indicators[e].instance.visible(i);
  }
  indicatorSettings(e, i) {
    return !C(e) || !(e in this.indicators) ? !1 : this.indicators[e].instance.settings(i);
  }
  addTool(e) {
    let { layerConfig: i } = this.layerConfig(), s = new be.Layer(i);
    this.#C.set(e.id, s), this.#y.addLayer(s), e.layerTool = s, this.#T.set(e.id, e);
  }
  addTools(e) {
  }
  overlayToolAdd(e) {
    this.#T.set(e.id, e);
  }
  overlayToolDelete(e) {
    this.#T.delete(e);
  }
  refresh() {
    this.emit("pane_refresh", this), this.scale.draw(), this.draw(void 0, this.isPrimary);
  }
  legendsVisibility(e) {
    this.legend.setCollapse(e);
  }
  updateLegends(e = this.#g, i = !1) {
    if (!(this.core.isEmpty || !w(this.#p)))
      for (const s in this.#p.list)
        this.#p.update(s, { pos: e, candle: i });
  }
  legendInputs() {
    const e = [!0, !0, !0, !0, !0], i = this.cursorPos, s = this.time.xPos2Index(i[0] - this.core.scrollPos), n = k(s, 0, this.range.data.length - 1), r = this.range.data[n], a = this.theme.candle, l = r[4] >= r[1] ? new Array(5).fill(a.UpWickColour) : new Array(5).fill(a.DnWickColour), h = {}, m = ["T", "O", "H", "L", "C", "V"];
    for (let f = 1; f < 6; f++)
      h[m[f]] = this.scale.nicePrice(r[f]);
    return { inputs: h, colours: l, labels: e };
  }
  onLegendAction(e) {
    switch (this.#p.onPointerClick(e.currentTarget).icon) {
      case "up":
        this.reorderUp();
        return;
      case "down":
        this.reorderDown();
        return;
      case "maximize":
        this.core.MainPane.paneMaximize(this);
        return;
      case "restore":
        this.core.MainPane.paneMaximize(this);
        return;
      case "collapse":
        this.core.MainPane.paneCollapse(this);
        return;
      case "expand":
        this.core.MainPane.paneCollapse(this);
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
    return !w(i) || !w(r) ? !1 : (s.insertBefore(e, i), a.insertBefore(n, r), this.Divider.setPos(), l !== null && (l.Divider.setPos(), l.Divider.show(), this.core.ChartPanes.swapKeys(this.id, i.id)), e.previousElementSibling === null && this.Divider.hide(), !0);
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
    return !w(i) || !w(r) ? !1 : (s.insertBefore(i, e), a.insertBefore(r, n), this.Divider.setPos(), l !== null && (l.Divider.setPos(), this.Divider.show(), this.core.ChartPanes.swapKeys(this.id, i.id)), i.previousElementSibling === null && l.Divider.hide(), !0);
  }
  createGraph() {
    let e = he(this.overlaysDefault);
    this.graph = new at(this, this.elViewport, e, !1), this.isPrimary && (this.layerStream = this.graph.overlays.get("stream")?.layer, this.chartStreamCandle = this.graph.overlays.get("stream")?.instance), this.addOverlays(this.view);
  }
  render() {
    this.graph.render(), this.#d.render();
  }
  draw(e = this.range, i = !1) {
    this.graph.draw(e, i);
  }
  drawGrid() {
    this.layerGrid.setPosition(this.core.scrollPos, 0), this.overlayGrid.setRefresh(), this.overlayGrid.draw("y"), this.core.MainPane.draw();
  }
  resize(e) {
    const i = this, s = this.sibling();
    if (s === null)
      return { active: null, prev: null };
    const n = this.core.MainPane.rowMinH, r = this.element.clientHeight, a = s.element.clientHeight;
    let l, h, m;
    return x(e) && e > n ? h = e : (l = this.core.MainPane.cursorPos[5], r - l < n && (l = n - (r - l)), h = r - l, m = a + l), i.setDimensions({ w: void 0, h }), s.setDimensions({ w: void 0, h: m }), i.Divider.setPos(), i.element.style.userSelect = "none", s.element.style.userSelect = "none", { active: i, prev: s };
  }
  collapse(e) {
    const i = this.graph.viewport.scene.canvas.style, s = this.#a, n = this.#d.graph.viewport.scene.canvas.style;
    s.state ? (this.setDimensions({ w: void 0, h: e }), n.visibility = "visible", i.display = "block", s.state = !1) : (n.visibility = "hidden", i.display = "none", s.state = !0, s.height = this.element.clientHeight, s.rowsHeight = this.core.MainPane.rowsH, s.rowsCnt = this.core.ChartPanes.size, this.setDimensions({ W: void 0, h: xs }));
  }
  zoomRange() {
    this.draw(this.range, !0), this.emit("zoomDone", !0);
  }
  time2XPos(e) {
    return this.time.xPos(e);
  }
  price2YPos(e) {
    return this.scale.yPos(e);
  }
  currPrevNext() {
    const e = this.element, i = e.previousElementSibling, s = e.nextElementSibling, n = e.parentNode, r = this.scale.element, a = r.previousElementSibling, l = r.nextElementSibling, h = r.parentNode, m = i !== null ? this.core.ChartPanes.get(i.id) : null, f = s !== null ? this.core.ChartPanes.get(s.id) : null;
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
      nextPane: f
    };
  }
  sibling(e) {
    e = ["prev", "next"].includes(e) ? e : "prev";
    let i = [...this.core.ChartPanes.keys()], s = i.indexOf(this.id);
    return e == "prev" ? --s : ++s, this.core.ChartPanes.get(i[s]) || null;
  }
  configDialogue() {
    const e = this.#w;
    e.state.name === "closed" && e.open();
  }
}
const ls = {
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
      w(o) && o.element.style.removeProperty("user-select"), w(e) && e.element.style.removeProperty("user-select");
    }
  }
}, Em = [
  ["grid", { class: Ii, fixed: !1, required: !0, params: { axes: "x" } }]
], Pm = ["candles", "trades", "events"];
class Uo extends ct {
  #e = "MainPane";
  #t = "Main";
  #i = !1;
  #n;
  #s;
  #r;
  #o;
  #l;
  #a;
  #h;
  #c;
  #d;
  #u;
  #p;
  #m = new Te();
  #f;
  #w;
  #P;
  #x = {};
  #y = {
    instance: null,
    rowsH: 0,
    panes: {}
  };
  #C = or;
  #T = rr;
  #g = {};
  #b = [0, 0];
  #v = {
    active: !1,
    start: [0, 0],
    prev: [0, 0],
    delta: [0, 0]
  };
  #M;
  #L;
  #S;
  #E = 0;
  #N = 0;
  constructor(e, i) {
    i.parent = e, super(e, i), this.#s = this.core.elMain, this.#n = this.core.elYAxis, this.init(i);
  }
  get name() {
    return this.#e;
  }
  get shortName() {
    return this.#t;
  }
  get chart() {
    return this.#f;
  }
  get chartPanes() {
    return this.#m;
  }
  get chartPaneMaximized() {
    return this.#y;
  }
  get chartDeleteList() {
    return this.#x;
  }
  get time() {
    return this.#w;
  }
  get element() {
    return this.#s;
  }
  get elRows() {
    return this.#s.rows;
  }
  get elPrimary() {
    return this.#s.rows.primary;
  }
  get elSecondary() {
    return this.#s.rows.secondary;
  }
  get elPanes() {
    return this.#s.rows.chartPanes;
  }
  get elPaneSlot() {
    return this.#s.rows.chartPaneSlot;
  }
  get width() {
    return this.#s.getBoundingClientRect().width;
  }
  get height() {
    return this.#s.getBoundingClientRect().height;
  }
  get chartW() {
    return this.elPrimary.getBoundingClientRect().width;
  }
  get chartH() {
    return this.elPrimary.getBoundingClientRect().height;
  }
  get rowsW() {
    return this.#r.getBoundingClientRect().width;
  }
  get rowsH() {
    return this.#r.getBoundingClientRect().height;
  }
  get rowMinH() {
    return this.#T;
  }
  set rowMinH(e) {
    x(e) && (this.#T = Math.abs(e));
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return se(this.#s);
  }
  set cursor(e) {
    this.element.style.cursor = e;
  }
  get cursor() {
    return this.element.style.cursor;
  }
  get cursorPos() {
    return this.#b;
  }
  get candleW() {
    return this.#w.candleW;
  }
  get buffer() {
    return this.#M;
  }
  get bufferPx() {
    return this.getBufferPx();
  }
  get scrollPos() {
    return this.core.scrollPos;
  }
  get renderLoop() {
    return lm;
  }
  get views() {
    return this.core.state.data.views;
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
      elTime: this.#o,
      elScale: this.#l
    };
  }
  init(e) {
    if (this.core, this.#r = this.#s.rows, this.#o = this.#s.time, this.#a = this.#s.rows.grid, this.#c = this.#s.viewport, this.#l = this.core.elBody.scale, e.name = "Chart", e.shortName = "Chart", e.parent = this, e.chartData = this.core.chartData, e.primaryPane = this.core.primaryPane, e.secondaryPane = this.core.secondaryPane, e.rangeLimit = this.core.rangeLimit, e.settings = this.core.settings, e.elements = {
      ...e.elements,
      ...this.elements
    }, this.core.theme?.time?.navigation === !1) {
      const i = { height: Ni };
      this.core.theme.time = { ...this.core.theme?.time, ...i }, this.#r.style.height = `calc(100% - ${Ni}px)`;
    }
    this.#w = new om(this.core, e), this.registerChartViews(e), this.#M = x(this.config.buffer) ? this.config.buffer : $i, this.#T = x(this.config.rowMinH) ? this.config.rowMinH : rr, this.#C = x(this.config.secondaryPaneDefaultH) ? this.config.secondaryPaneDefaultH : or, this.rowsOldH = this.rowsH, this.log(`${this.#e} instantiated`);
  }
  start() {
    let e = 0;
    this.#s.start(this.theme), this.#w.start(), this.createGraph();
    const i = this.chart.scale.calcScaleWidth();
    this.core.elBody.scale.style.width = `${i}px`, this.#c.style.width = `${this.#r.width}px`, this.#m.forEach((s, n) => {
      s.start(e++), e === 1 && s.Divider.hide();
    }), this.rowsOldH = this.rowsH, this.draw(this.range, !0), this.renderLoop.init({
      graphs: [this.graph],
      range: this.range
    }), this.renderLoop.start(), this.renderLoop.queueFrame(this.range, [this.graph], !1), this.eventsListen(), ls.id = this.id, ls.context = this, this.stateMachine = ls, this.stateMachine.start();
  }
  destroy() {
    this.core.hub.expunge(this), this.renderLoop.stop(), this.#i = !0, this.stateMachine.destroy(), this.#w.destroy(), this.#m.forEach((e, i) => {
      this.#x[i] = !0, e.destroy(), delete this.#x[i];
    }), this.graph.destroy(), this.#S.destroy();
  }
  reset() {
    for (let e in this.core.Indicators)
      for (let i in this.core.Indicators[e])
        this.core.Indicators[e][i].instance.remove();
  }
  restart() {
    this.chart.scale.restart(), this.validateIndicators();
    for (let [e, i] of this.views)
      for (let s of i)
        e === "primary" && s.type === "candles" || this.addIndicator(s.type, s.name, { data: s.data, settings: s.settings });
    this.draw(this.range, !0);
  }
  eventsListen() {
    this.#S = new He(this.#r, { disableContextMenu: !1 }), this.#S.on("keydown", this.onChartKeyDown.bind(this)), this.#S.on("keyup", this.onChartKeyUp.bind(this)), this.#S.on("wheel", this.onMouseWheel.bind(this)), this.#S.on("pointerenter", this.onMouseEnter.bind(this)), this.#S.on("pointerout", this.onMouseOut.bind(this)), this.#S.on("pointerup", this.onChartDragDone.bind(this)), this.#S.on("pointermove", this.onMouseMove.bind(this)), this.on(Ds, this.onFirstStreamValue, this), this.on(Is, this.onNewStreamValue, this), this.on("setRange", this.onSetRange, this), this.on("scrollUpdate", this.draw, this), this.on("chart_render", this.draw, this), this.on("destroyChartView", this.removeChartPane, this);
  }
  onSetRange() {
    if (this.#N = this.#E, this.#E = this.chart.scale.calcScaleWidth(), this.#N < this.#E) {
      const e = `${this.#E}px`;
      this.core.elBody.scale.style.width = e, this.#c.style.width = `calc(100% - ${this.#E}px)`, this.#r.style.width = `calc(100% - ${this.#E}px)`, this.#o.style.width = `calc(100% - ${this.#E}px)`, this.setDimensions();
    } else
      this.draw();
  }
  onMouseWheel(e) {
    const i = Math.sign(e.wheeldelta) * -1;
    if (e.domEvent.preventDefault(), this.core.pointerButtons[0]) {
      e.dragstart.x = this.#b[0], e.dragstart.y = this.#b[1], e.position.x = this.#b[0] + i, e.position.y = this.#b[1], this.onChartDrag(e);
      return;
    }
    const s = this.range, n = s.indexStart - Math.floor(i * Qn * s.Length), r = s.indexEnd + Math.ceil(i * Qn * s.Length);
    this.core.setRange(n, r), this.draw(this.range, !0);
  }
  onMouseMove(e) {
    const i = this.#g;
    i.d2x = i?.d1x || null, i.d2y = i?.d1y || null, i.d1x = e.movement.x, i.d1y = e.movement.y, i.dx = Math.floor((i.d1x + i.d2x) / 2), i.dy = Math.floor((i.d1y + i.d2y) / 2), i.ts2 = i?.ts1 || null, i.ts1 = Date.now(), this.#b = [
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
    this.emit("main_mousemove", this.#b);
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
    const i = this.#v;
    i.active ? (i.delta = [
      e.position.x - i.prev[0],
      e.position.y - i.prev[1]
    ], i.prev = [
      e.position.x,
      e.position.y
    ]) : (i.active = !0, i.start = [e.dragstart.x, e.dragstart.y], i.prev = i.start, i.delta = [0, 0]), this.#b = [
      e.position.x,
      e.position.y,
      ...i.start,
      ...i.delta
    ], this.emit("chart_pan", this.#b);
  }
  onChartDragDone(e) {
    const i = this.#v;
    i.active = !1, i.delta = [0, 0], this.#b = [
      ...i.prev,
      ...i.start,
      ...i.delta
    ], this.emit("chart_panDone", this.#b);
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
    e && (e.cursorActive = !0, e.scale.layerCursor.visible = !0), e !== this.chart && (this.chart.cursorActive = !1, this.chart.scale.layerCursor.visible = !1, this.chart.scale.layerCursor.erase()), this.#m.forEach((i, s) => {
      e !== i && (i.cursorActive = !1, i.scale.layerCursor.visible = !1, i.scale.layerCursor.erase());
    });
  }
  setDimensions() {
    this.#r.previousDimensions();
    let e = this.#r.heightDeltaR, i = Math.round(this.chartH * e), s = this.rowsW, n = this.rowsH, r = Math.round(s * ((100 + this.#M) * 0.01)), a = {
      resizeH: e,
      mainH: this.element.height,
      mainW: this.element.width,
      rowsH: this.rowsH,
      rowsW: this.rowsW
    };
    this.core.scrollPos = -1, this.#w.setDimensions({ w: s }), this.graph.setSize(s, n, r), this.#c.style.width = `${s}px`, this.#m.size == 1 && i != this.#r.height ? this.#f.setDimensions({ w: s, h: this.#r.height }) : this.#m.forEach((l, h) => {
      i = Math.round(l.viewport.height * e), l.setDimensions({ w: s, h: i });
    }), this.rowsOldH = this.rowsH, this.emit("rowsResize", a), this.draw(void 0, !0);
  }
  getBufferPx() {
    let e = Math.round(this.width * this.buffer / 100), i = e % this.candleW;
    return e - i;
  }
  registerChartViews(e) {
    this.#r.previousDimensions();
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
      list: [...this.#m.values()],
      collapsed: [],
      expanded: [],
      maximized: this.#y.instance
    };
    for (let i of e.list)
      i.collapsed.state ? e.collapsed.push(i) : e.expanded.push(i);
    return e;
  }
  addChartPane(e) {
    const { expanded: i } = this.chartPanesState(), s = this.calcChartPaneHeights(), n = s.new;
    let r;
    for (r in s)
      if (this.#m.has(r)) {
        let m = this.#m.get(r);
        i.indexOf(m) > -1 && m.setDimensions({ w: this.rowsW, h: s[r] });
      }
    let a;
    this.#r.insertAdjacentHTML(
      "beforeend",
      this.#s.rowNode(e.type, this.core)
    ), a = this.#r.chartPaneSlot.assignedElements().slice(-1)[0], a.style.height = `${n}px`, a.style.width = "100%";
    let l;
    this.#n.insertAdjacentHTML(
      "beforeend",
      this.scaleNode(e.type)
    ), l = this.#n.chartPaneSlot.assignedElements().slice(-1)[0], l.style.height = `${n}px`, l.style.width = "100%", e.elements.elTarget = a, e.elements.elScale = l;
    let h;
    return e.type == "primary" ? (h = new rt(this.core, e), this.#f = h) : (e.name = e.view[0].name || "Secondary", e.shortName = e.view[0].type || "Secondary", h = new rt(this.core, e)), this.setPaneDividers(), this.#m.set(h.id, h), this.emit("addChartView", h), h;
  }
  removeChartPane(e) {
    if (!C(e) || !this.#m.has(e) || this.#x[e])
      return !1;
    const i = this.#m.get(e);
    if (i.isPrimary)
      return this.core.error(`Cannot remove primary chart pane! ${e}`), !1;
    this.#x[e] = !0;
    const { expanded: s } = this.chartPanesState();
    let n = s.indexOf(i);
    n > -1 && s.splice(n, 1);
    let r = i.viewport.height, a = Math.floor(r / s.length), l = r % a;
    if (i.status !== "destroyed" && (i.destroy(), this.#s.removeRow(i.id)), this.#m.delete(e), this.#m.size === 1) {
      let h = this.#m.values().next().value;
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
        w(r) && (r.type in this.core.indicatorClasses || Pm.includes(r.type)) || (this.core.log(`indicator ${s.type} not added: not supported.`), s.splice(n, 1));
    }
    return e;
  }
  addIndicator(e, i = e, s = {}) {
    let n, r = this.indicatorClasses[e].ind?.primaryPane;
    if (!C(e) || !(e in this.indicatorClasses) || !C(i))
      return !1;
    switch (this.log(`Adding the ${i} : ${e} indicator`), w(s) ? (P(s?.data) || (s.data = []), w(s?.settings) || (s.settings = {})) : s = { data: [], settings: [] }, r) {
      case !0:
      case !1:
        break;
      case void 0:
      case "both":
        r = F(s.settings?.isPrimary) ? s.settings.isPrimary : !0;
    }
    if (s.settings.isPrimary = r, r) {
      const l = {
        type: e,
        name: i,
        ...s
      };
      n = this.#f.addIndicator(l);
    } else {
      P(s.view) || (s.view = [{ name: i, type: e, ...s }]);
      for (let l = 0; l < s.view.length; l++)
        (!w(s.view[l]) || !So(["name", "type"], Object.keys(s.view[l]))) && s.view.splice(l, 1);
      if (s.view.length == 0)
        return !1;
      s.parent = this, s.title = i, s.elements = { ...this.elements }, n = this.addChartPane(s), n.start();
    }
    const a = "instance" in n ? n.instance.id : n.id;
    return this.refresh(), this.emit("addIndicatorDone", n), this.core.log("Added indicator:", a), n;
  }
  getIndicators() {
    const e = {};
    return this.#m.forEach(
      (i, s) => {
        e[s] = i.indicators;
      }
    ), e;
  }
  getIndicator(e) {
    if (!C(e))
      return !1;
    for (const i of this.#m.values())
      if (e in i.indicators)
        return i.indicators[e].instance;
  }
  removeIndicator(e) {
    if (C(e))
      for (const i of this.#m.values())
        e in i.indicators && (e = i.indicators[e].instance);
    return e instanceof Se ? (e.chart.type === "primaryPane" || Object.keys(e.chart.indicators).length > 1 ? (e.remove(), this.emit("pane_refresh", this)) : e.chart.remove(), !0) : !1;
  }
  indicatorSettings(e, i) {
    if (C(e)) {
      for (const s of this.#m.values())
        if (e in s.indicators)
          return s.indicators[e].instance.settings(i);
    } else
      return e instanceof Se ? e.settings(i) : !1;
  }
  calcChartPaneHeights() {
    const { collapsed: e, expanded: i } = this.chartPanesState(), s = this.#m.size + 1, n = this.#C * (s - 1), r = n / Math.log10(n * 2) / 100;
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
      const h = Math.round(l * this.#C / 100);
      a[i[0].id] = l - h, a.new = h;
    } else if (i.length === 2) {
      const l = i[0].viewport.height, h = i[1].viewport.height, m = l + h, f = Math.round(m * this.#C / 100), v = m / (m + f);
      a[i[0].id] = Math.floor(l * v), a[i[1].id] = Math.floor(h * v), a.new = Math.floor(f * v), a.new += m - (a[i[0].id] + a[i[1].id] + a.new);
    } else if (i.length >= 3) {
      let l = this.rowsH, h = 0, m;
      for (let f of e)
        l -= f.viewport.height;
      a.new = Math.floor(l / (i.length + 1)), l / (l + a.new), m = l - a.new;
      for (let f of i)
        a[f.id] = m * (f.viewport.height / l), h += a[f.id];
      a.new += l - h;
    }
    return a;
  }
  scaleNode(e) {
    const i = ic + " width: 100%;";
    return `
    <div slot="chartpane" class="viewport scale ${e}" style="$${i}"></div>
  `;
  }
  createGraph() {
    let e = he(Em);
    this.graph = new at(this, this.#c, e);
  }
  draw(e = this.range, i = !1) {
    this.time.xAxis.doCalcXAxisGrads(e);
    const s = [
      this.graph,
      this.#w
    ];
    this.#m.forEach((n, r) => {
      n.status !== "destroyed" ? s.push(n) : console.log("error destroyed pane");
    }), this.renderLoop.queueFrame(
      this.range,
      s,
      i
    );
  }
  refresh() {
    this.renderLoop.expungeFrames(), this.core.Chart.graph.refresh();
    for (let [e, i] of this.chartPanes)
      i.graph.refresh();
    this.draw(this.range, !0);
  }
  updateRange(e) {
    this.core.updateRange(e);
  }
  zoomRange() {
    this.draw(this.range, !0);
  }
  paneMaximize(e) {
    if (!(e instanceof rt))
      return !1;
    const i = this.#y, s = e.legend.list.chart.el.querySelector(".controls");
    let n;
    if (s.classList.toggle("maximized"), s.classList.toggle("restored"), e === i.instance)
      this.panesRestore(), i.instance = null, i.panes = {}, e.collapsed.state && (e.graph.viewport.scene.canvas.style.display = "none", e.scale.graph.viewport.scene.canvas.style.visibility = "hidden");
    else {
      this.panesRestore(), i.instance = e, i.rowsH = this.rowsH;
      for (let [r, a] of this.#m.entries())
        i.panes[r] = a.element.clientHeight, n = a.element.style, e === a ? (n.display = "block", a.setDimensions({ w: void 0, h: this.rowsH }), a.graph.viewport.scene.canvas.style.display = "block", a.scale.graph.viewport.scene.canvas.style.visibility = "visible") : (n.display = "none", a.scale.element.style.display = "none");
      this.hidePaneDividers();
    }
    return this.emit("pane_refresh", this), !0;
  }
  panesRestore() {
    const e = this.#y;
    let i = 0;
    this.emit("pane_refresh", this), this.dimensions.height == e.height;
    for (let [s, n] of this.#m.entries())
      n.element.style.display = "block", n.scale.element.style.display = "block", s in e.panes && i++ > 0 && n.Divider.show(), n.setDimensions({ w: void 0, h: e.panes[s] });
  }
  paneCollapse(e) {
    if (!(e instanceof rt))
      return !1;
    this.emit("pane_refresh", this);
    const i = e.legend.list.chart.el.querySelector(".controls"), s = e.collapsed;
    let n = e.element.clientHeight, r, a, l;
    const { list: h, collapsed: m, expanded: f } = this.chartPanesState();
    if (r = m.indexOf(e), r > -1 && m.splice(r, 1), r = f.indexOf(e), r > -1 && f.splice(r, 1), e.collapsed.state) {
      i.classList.remove("collapsed"), i.classList.add("expanded"), s.rowsCnt !== h.length ? n = s.height * (s.rowsCnt / h.length) : s.rowsHeight !== this.rowsH ? n = s.height * (s.rowsHeight / this.rowsH) : n = s.height, a = (n - xs) / f.length;
      for (let v of f)
        l = v.element.clientHeight - a, v.setDimensions({ w: void 0, h: l });
      e.collapse(n);
    } else {
      if (i.classList.add("collapsed"), i.classList.remove("expanded"), h.length < 2 || f.length < 1)
        return !1;
      n = (e.element.clientHeight - xs) / f.length;
      for (let v of f)
        l = v.element.clientHeight + n, v.setDimensions({ w: void 0, h: l });
      e.collapse();
    }
    return this.setPaneDividers(), !0;
  }
  setPaneDividers() {
    const { list: e } = this.chartPanesState();
    let i = 0;
    for (let s of e)
      s.Divider instanceof ce && i++ > 0 && (s.Divider.setWidth(), s.Divider.setPos(), s.Divider.show());
  }
  hidePaneDividers() {
    const { list: e } = this.chartPanesState();
    for (let i of e)
      i.Divider instanceof ce && i.Divider.hide();
  }
}
class Mm extends ie {
  constructor(e) {
    super(e);
  }
}
class yi extends ie {
  #e = Er.colour;
  #t = Er.width;
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
    this.#t = x(e) ? e : this.#t;
  }
  get lineWidth() {
    return this.#t;
  }
  set stateMachine(e) {
    this.#i = new Vi(e, this);
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
class Lm extends ie {
  constructor(e) {
    super(e);
  }
}
class Am extends ie {
  constructor(e) {
    super(e);
  }
}
class Om extends ie {
  constructor(e) {
    super(e);
  }
}
const Nm = [
  {
    id: "cursor",
    name: "Cursor",
    icon: Sh,
    event: "tool_activated"
  },
  {
    id: "line",
    name: "Line",
    icon: et,
    event: "tool_activated",
    class: yi,
    sub: [
      {
        id: "ray",
        name: "Ray",
        icon: et,
        event: "tool_activated",
        class: yi
      },
      {
        id: "hRay",
        name: "Horizontal Ray",
        icon: et,
        event: "tool_activated",
        class: yi
      },
      {
        id: "vRay",
        name: "Vertical Ray",
        icon: et,
        event: "tool_activated",
        class: yi
      }
    ]
  },
  {
    id: "fibonacci",
    name: "Fibonacci",
    icon: Ph,
    event: "tool_activated",
    class: Mm,
    sub: [
      {
        id: "fib",
        name: "Not Implemented Yet",
        icon: et
      }
    ]
  },
  {
    id: "range",
    name: "Range",
    icon: Lh,
    event: "tool_activated",
    class: Am,
    sub: [
      {
        id: "rng",
        name: "Not Implemented Yet",
        icon: et
      }
    ]
  },
  {
    id: "text",
    name: "Text",
    icon: Ah,
    event: "tool_activated",
    class: Om,
    sub: [
      {
        id: "txt",
        name: "Not Implemented Yet",
        icon: et
      }
    ]
  },
  {
    id: "measure",
    name: "Measure",
    icon: Mh,
    event: "tool_activated",
    class: Lm
  },
  {
    id: "delete",
    name: "Delete",
    icon: Eh,
    event: "tool_activated",
    class: void 0
  }
], Er = {
  colour: "#8888AACC",
  width: 1
}, hs = {
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
class zo extends ct {
  #e = "Toolbar";
  #t = "tools";
  #i;
  #n;
  #s = ie;
  #r;
  #o = {};
  #l = void 0;
  #a;
  #h = { click: [], pointerover: [] };
  #c = [];
  constructor(e, i) {
    super(e, i), this.#i = e.elTools, this.#r = Nm || e.config.tools, this.#n = e.WidgetsG, this.init();
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
    return se(this.#i);
  }
  init() {
    this.mount(this.#i), this.log(`${this.#e} instantiated`);
  }
  start() {
    this.initAllTools(), this.addAllTools(), this.eventsListen(), hs.id = this.id, hs.context = this, this.stateMachine = hs, this.stateMachine.start();
  }
  destroy() {
    this.core.hub.expunge(this);
    const e = this.id, i = this.#i.querySelectorAll(".icon-wrapper");
    for (let s of i)
      for (let n of this.#r)
        n.id === e && s.removeEventListener("click", this.#h[e].click), s.removeEventListener("pointerover", this.#h[e].pointerover), s.removeEventListener("pointerout", this.#h[e].pointerout);
    this.stateMachine.destroy();
  }
  eventsListen() {
    this.on("tool_selected", this.onToolSelect, this), this.on("tool_deselected", this.onToolDeselect, this);
  }
  onResized() {
    for (let e of this.#c)
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
    i.style.fill = je.COLOUR_ICON;
  }
  onIconOver(e) {
    const i = e.currentTarget.querySelector("svg");
    i.style.fill = je.COLOUR_ICONHOVER;
  }
  onToolTargetSelected(e) {
    console.log("tool_targetSelected:", e.target), this.#a = e.target;
  }
  onToolActivated(e) {
    console.log("Tool activated:", e), this.#l = e;
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
      n.style.fill = je.COLOUR_ICON, n.style.width = "90%";
      for (let r of this.#r)
        if (r.id === s)
          if (this.#h[s] = {}, this.#h[s].click = this.onIconClick.bind(this), this.#h[s].pointerover = this.onIconOver.bind(this), this.#h[s].pointerout = this.onIconOut.bind(this), i.addEventListener("click", this.#h[s].click), i.addEventListener("pointerover", this.#h[s].pointerover), i.addEventListener("pointerout", this.#h[s].pointerout), r?.sub) {
            let a = {
              content: r.sub,
              primary: i
            }, l = this.#n.insert("Menu", a);
            i.dataset.menu = l.id, l.start(), this.#c.push(l);
            for (let h of r.sub)
              this.#o[h.id] = h.class;
          } else
            this.#o[r.id] = r.class;
    }
  }
  addTool(e = this.#l, i = this.#a) {
    let s = {
      name: e,
      tool: this.#o[e],
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
const Pr = 20, Dm = 20, Im = new en(H.COLOUR_BORDER), Ns = document.createElement("template");
Ns.innerHTML = `
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
    border: 1px solid var(--txc-time-scrollbar-color, ${H.COLOUR_BORDER});
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
    background-color: var(--txc-time-handle-color, ${Im.hex}44); 
    width: 2px;
    height: 18px;
    margin: 1px;
    margin-left: 872.968px;
    margin-right: 0px;
    position: absolute;
  }
  .icon {
    flex-basis: ${Pr}px;
  }
  .icon svg {
    fill: var(--txc-time-icon-color, ${H.COLOUR_ICON});
    width: ${Pr}px;
    height: ${Dm}px;
    margin-top: 1px;
  }
  .icon svg:hover {
    fill: var(--txc-time-icon-hover-color, ${H.COLOUR_ICONHOVER});
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
  <span id="fwdEnd" class="icon fwdEnd">${zh}</span>
</div>
`;
class Rm extends J {
  #e;
  #t;
  #i;
  #n;
  #s;
  #r;
  #o;
  #l;
  #a;
  #h;
  #c;
  #d;
  constructor() {
    super(Ns), this.#e = Ns;
  }
  destroy() {
  }
  connectedCallback() {
    super.connectedCallback(
      () => {
        document.getElementById("slider-bar"), this.#t = this.shadowRoot.querySelector(".scrollBarWidget"), this.#i = this.shadowRoot.querySelector(".rwdStart"), this.#n = this.shadowRoot.querySelector(".fwdEnd"), this.#s = this.shadowRoot.querySelector(".scrollBar"), this.#r = this.shadowRoot.querySelector(".viewport"), this.#o = this.shadowRoot.querySelector(".handle"), this.#l = this.shadowRoot.querySelectorAll("svg"), this.#a = this.shadowRoot.querySelector("#max"), this.#h = this.shadowRoot.querySelector("#min"), this.#c = this.shadowRoot.querySelectorAll("input"), this.#d = this.shadowRoot.querySelector("style[title=overview]"), this.max.addEventListener("input", this.onChangeSliderHandler.bind({ self: this, input: this.max })), this.min.addEventListener("input", this.onChangeSliderHandler.bind({ self: this, input: this.min }));
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
    return this.#o;
  }
  get icons() {
    return this.#l;
  }
  get max() {
    return this.#a;
  }
  get min() {
    return this.#h;
  }
  get sliders() {
    return this.#c;
  }
  get overviewCSS() {
    return this.#d;
  }
  onChangeSliderHandler() {
    console.log(`${this.input.value}, ${this.input.getAttribute("max")}`);
  }
}
customElements.get("tradex-overview") || window.customElements.define("tradex-overview", Rm);
const Vo = document.createElement("template");
Vo.innerHTML = `
<style>
  .viewport {
    width: 100%;
    height: ${Ni}px;
  }
  tradex-overview {
    height: ${oo}px;
  }
</style>
<div class="viewport"></div>
<tradex-overview></tradex-overview>
`;
class km extends J {
  #e;
  #t;
  constructor() {
    super(Vo);
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
customElements.get("tradex-time") || window.customElements.define("tradex-time", km);
const Wo = document.createElement("template");
Wo.innerHTML = `
<style>
.scene-canvas {
  display: block;
}
</style>
<slot name="viewportCanvas"></slot>
<canvas class="scene-canvas"></canvas>
`;
class _m extends J {
  #e;
  #t;
  #i = this.onSlotChange.bind(this);
  constructor() {
    super(Wo);
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
customElements.get("tradex-viewport") || window.customElements.define("tradex-viewport", _m);
const Fo = document.createElement("template");
Fo.innerHTML = `
<style>
  tradex-viewport {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
  <tradex-viewport></tradex-viewport>
`;
class Hm extends J {
  #e;
  constructor() {
    super(Fo);
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
customElements.get("tradex-grid") || window.customElements.define("tradex-grid", Hm);
const Go = document.createElement("template");
Go.innerHTML = `
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
    <span id="hideLegends" class="control" data-icon="hide" style="display:none">${Nh}</span>
    <span id="showLegends" class="control" data-icon="show" style="display:none">${Dh}</span>
  </div>
</div>
`;
class $m extends J {
  #e;
  #t;
  #i;
  #n;
  #s;
  #r;
  #o = [];
  #l;
  constructor() {
    super(Go);
  }
  destroy() {
  }
  connectedCallback() {
    super.connectedCallback(
      () => {
        this.#r = this.shadowRoot.querySelector("slot"), this.#t = this.shadowRoot.querySelector(".legends"), this.#i = this.shadowRoot.querySelector(".title"), this.#n = this.shadowRoot.querySelector("dl"), this.#s = this.shadowRoot.querySelector(".controls"), this.#l = this.onSlotChange.bind(this), this.#r.addEventListener("slotchange", this.#l);
      }
    );
  }
  disconnectedCallback() {
    this.#r.removeEventListener("slotchange", this.#l);
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
    this.#o.forEach((i) => i.handler.call(i.context, e));
  }
  insert(e) {
    this.legends.insertAdjacentHTML("beforeend", e);
  }
  setTittle(e) {
    C && (this.#e = e, this.elTitle.innerHTML = e);
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
      let h = e?.colours?.[i] ? ` color: ${e.colours[i]};` : "", m = e?.inputs?.[n] !== void 0 ? e.inputs[n] : r, f = e?.labels?.[i] ? `${n}:` : r;
      a += e?.labels?.[i] ? "1em;" : ".25em", s += `<dt style="${a}">${f}</dt>
      <dd style="${l}${h}">${m}</dd>`, ++i;
    }
    return s;
  }
  buildControls(e) {
    let i = "", s = e.id;
    return i += `<span id="${s}_up" class="control up" data-icon="up">${Ih}</span>`, i += `<span id="${s}_down" class="control down" data-icon="down">${Rh}</span>`, e?.type === "indicator" && (i += `<span id="${s}_visible" class="control visible" data-icon="visible">${Bh}</span>`, i += `<span id="${s}_notVisible" class="control notvisible" data-icon="notVisible">${Uh}</span>`), e?.type !== "indicator" && (i += `<span id="${s}_collapse" class="control collapse" data-icon="collapse">${Hh}</span>`, i += `<span id="${s}_expand" class="control expand" data-icon="expand">${$h}</span>`, i += `<span id="${s}_maximize" class="control maximize" data-icon="maximize">${_h}</span>`, i += `<span id="${s}_restore" class="control restore" data-icon="restore">${kh}</span>`), i += e?.type !== "chart" ? `<span id="${s}_remove" class="control remove" data-icon="remove">${Oh}</span>` : "", i += e?.type !== "secondary" ? `<span id="${s}_config" class="control config" data-icon="config">${io}</span>` : "", i;
  }
}
customElements.get("tradex-legends") || window.customElements.define("tradex-legends", $m);
const qo = document.createElement("template");
qo.innerHTML = `
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
class Bm extends J {
  #e;
  #t;
  constructor() {
    super(qo);
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
customElements.get("tradex-chartpane") || window.customElements.define("tradex-chartpane", Bm);
const Yo = document.createElement("template");
Yo.innerHTML = `
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
class Um extends J {
  #e;
  #t;
  #i;
  #n;
  constructor() {
    super(Yo);
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
customElements.get("tradex-rows") || window.customElements.define("tradex-rows", Um);
const Xo = document.createElement("template");
Xo.innerHTML = `
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
    width: calc(100% - ${Xt}px);
    height: calc(100% - ${Cs}px);
    border: 1px solid;
    border-color: var(--txc-border-color, ${H.COLOUR_BORDER}); 
  }
  tradex-time {
    position: relative;
    width: calc(100% - ${Xt}px);
    height: ${Cs}px;
    overflow: hidden;
    margin-left: 1px;
    z-index: 1;
  }
</style>
<div id="viewport"></div>
<tradex-rows></tradex-rows>
<tradex-time></tradex-time>
`;
class zm extends J {
  #e;
  #t;
  #i;
  #n;
  constructor() {
    super(Xo);
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
  rowNode(e, i) {
    return `
      <tradex-chartpane slot="chartpane" class="${e}" style="">
      </tradex-chartpane>
    `;
  }
  removeRow(e) {
    const i = this.shadowRoot.querySelector(`#${e}`);
    return i ? (i.remove(), !0) : !1;
  }
  setMain() {
    let e = x(this.#n?.time?.height) ? this.#n.time.height : Cs, i = this.#n.tools.location == "none" ? 60 : 0;
    this.rows.style.height = `calc(100% - ${e}px)`, this.rows.style.left = `${i}px`, this.time.style.left = `${i}px`, this.viewport.style.left = `${i}px`;
  }
}
customElements.get("tradex-main") || window.customElements.define("tradex-main", zm);
const jo = document.createElement("template");
jo.innerHTML = `
  <slot></slot>
`;
class Vm extends J {
  constructor() {
    super(jo);
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
        height: ${je.ICONSIZE};
        width: ${je.ICONSIZE};
        fill: ${je.COLOUR_ICON};
      }
      svg:hover {
        fill: ${je.COLOUR_ICONHOVER};
      }
      .icon-wrapper {
        width: ${je.ICONSIZE};
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
customElements.get("tradex-tools") || window.customElements.define("tradex-tools", Vm);
const Ko = document.createElement("template");
Ko.innerHTML = `
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
class Wm extends J {
  #e;
  #t;
  #i;
  constructor() {
    super(Ko);
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
customElements.get("tradex-scale") || window.customElements.define("tradex-scale", Wm);
const Fm = `
<style>
  tradex-tools {
    position: absolute; 
    top: 0; left: 0;
    width: ${nt}px;
    height: 100%; 
    min-height: 100%; 
  }
  tradex-main {
    position: absolute; 
    top: 0;
    right: 0;
    width: calc(100% - ${nt}px);
    height: 100%;
  }
  tradex-scale {
    position: absolute; 
    top: 1px;
    right: 0; 
    width: ${Xt}px; 
    height: 100%;
  }
</style>
<tradex-tools></tradex-tools>
<tradex-main></tradex-main>
<tradex-scale></tradex-scale>
`, Zo = document.createElement("template");
Zo.innerHTML = Fm;
class Gm extends J {
  #e;
  #t;
  #i;
  #n;
  constructor() {
    super(Zo);
  }
  destroy() {
  }
  connectedCallback() {
    super.connectedCallback(
      () => {
        this.#t = this.shadowRoot.querySelector("tradex-tools"), this.#i = this.shadowRoot.querySelector("tradex-main"), this.#n = this.shadowRoot.querySelector("tradex-scale");
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
  start(e) {
    this.#e = e, this.setToolsLocation();
  }
  setYAxisLocation(e = this.#e?.yAxis?.location) {
    let i = x(this.#e?.tools?.width) ? this.#e.tools.width : nt, s;
    switch (e) {
      case "left":
        s = i == 0 ? 0 : Xt, this.scale.style.left = `${i}px`, this.scale.style.right = void 0, this.main.style.left = void 0, this.main.style.right = `-${s}px`, this.main.style.width = `calc(100% - ${i}px)`;
        break;
      case "both":
      case "right":
      default:
        s = i == 0 ? Xt : 0, this.scale.style.left = void 0, this.scale.style.right = 0, this.main.style.left = void 0, this.main.style.right = `${s}px`, this.main.style.width = `calc(100% - ${i}px)`;
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
        this.#e.tools.location = "right", this.#e.tools.width = this.#e?.tools?.width || nt, this.tools.style.display = "block", this.tools.style.left = void 0, this.tools.style.right = 0, this.tools.style.width = `${nt}px`;
        break;
      case "left":
      default:
        this.#e.tools.location = "left", this.#e.tools.width = this.#e?.tools?.width || nt, this.tools.style.display = "block", this.tools.style.left = 0, this.tools.style.right = void 0, this.tools.style.width = `${nt}px`;
        break;
    }
    this.setYAxisLocation();
  }
}
customElements.get("tradex-body") || window.customElements.define("tradex-body", Gm);
const Qo = document.createElement("template");
Qo.innerHTML = `
  <style>
    .utilsOptions {
      display: inline-block; float: right;
    }
  </style>
  <slot></slot>
  <div class="utilsOptions">
  </div>
`;
class qm extends J {
  constructor() {
    super(Qo);
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
        height: ${wt.ICONSIZE};
        fill: ${wt.COLOUR_ICON};
      }
    </style>
    `;
    for (const n of e)
      s += this.iconNode(n);
    return s + "</div>";
  }
  iconNode(e) {
    const i = `display: inline-block; height: ${wt.ICONSIZE}; padding-top: 2px`, s = "sub" in e ? 'data-menu="true"' : "";
    return `
      <div id="TX_${e.id}" data-event="${e.event}" ${s} class="icon-wrapper" style="${i}">${e.icon}</div>

    `;
  }
}
customElements.get("tradex-utils") || window.customElements.define("tradex-utils", qm);
const Jo = document.createElement("template");
Jo.innerHTML = `
<style>
</style>
<div class="colourpicker">
</div>
`;
class Ym extends J {
  #e;
  #t;
  #i;
  #n;
  #s;
  #r;
  #o;
  #l;
  #a = {
    size: 128
  };
  constructor() {
    super(Jo);
  }
  destroy() {
  }
  connectedCallback() {
    super.connectedCallback(
      () => {
        this.#e = this.shadowRoot.querySelector(".colourpicker"), this.build();
      }
    ), this.#t = this.shadowRoot.querySelector(".mixer"), this.#i = this.shadowRoot.querySelector(".palette"), this.#n = this.shadowRoot.querySelector(".value"), this.#s = this.shadowRoot.querySelector(".model"), this.#r = this.shadowRoot.querySelector(".rgb"), this.#o = this.shadowRoot.querySelector(".alpha"), this.#l = this.shadowRoot.querySelector(".submit");
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
  get elValue() {
    return this.#n;
  }
  get elModel() {
    return this.#s;
  }
  get elRGB() {
    return this.#r;
  }
  get elAlpha() {
    return this.#o;
  }
  get elSubmit() {
    return this.#l;
  }
  build() {
    const e = "";
    this.#e.innerHTML = e, this.paletteNode(), this.canvasNode();
  }
  paletteNode() {
    this.canvasNode("palette");
  }
  mixerNode() {
    this.canvasNode("mixer");
  }
  canvasNode(e) {
    const i = document.createElement("div");
    i.classList.add("type");
    const s = this.viewportNode();
    i.appendChild(s.container), s.container.style.cursor = "url(), 0, 0, copy";
    const n = s.viewport, r = {}, a = { x: 0, y: 0, width: this.#a.size, height: this.#a.size };
    this.#a.layers = r, this.#a.view = n, r.red = new be.Layer(a), r.green = new be.Layer(a), r.blue = new be.Layer(a), r.value = new be.Layer(a), r.composite = new be.Layer(a), n.addLayer(r.composite), r.grid = new be.Layer(a), n.addLayer(r.grid), this.#a[e] = { element: i, viewport: s, layers: r };
    let l = r.red.scene.context, h = [0, 0, this.#a.size, 0];
    mt(l, h, h), l = r.green.scene.context, mt(l, h, h), l = r.blue.scene.context, mt(l, h, h), l = r.value.scene.context, h = [0, 0, 0, this.#a.size], mt(l, h, h), this.compositeLayers(), l = r.grid.scene.context, wo(l, 8, 16, 16, "#ffffff", "#cccccc"), n.render();
  }
  viewportNode() {
    const e = document.createElement("div");
    e.classList.add("viewport");
    const i = new be.Viewport({
      width: this.#a.size,
      height: this.#a.size,
      container: e
    }), s = i.scene.canvas;
    return { viewport: i, container: e, canvas: s };
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
    mt(e, [0, 0, 0, 0], n);
  }
  compositeLayers() {
    const e = this.#a.layers, i = ["red", "green", "blue", "value"], s = e.composite.scene.context;
    for (let n of i)
      s.drawImage(
        e[n].scene.canvas,
        e[n].x,
        e[n].y,
        e[n].width,
        e[n].height
      );
  }
}
customElements.get("tradex-colourpicker") || window.customElements.define("tradex-colourpicker", Ym);
const ea = document.createElement("template");
ea.innerHTML = `
  <slot name="widget"></slot>
`;
class Xm extends J {
  constructor() {
    super(ea);
  }
  destroy() {
  }
}
customElements.get("tradex-widgets") || window.customElements.define("tradex-widgets", Xm);
const jm = `
  <style title="core">
    :host {
      position: relative;
      z-index: 0;
    }
    tradex-utils {
      height: ${ze}px; 
      width: 100%; 
    }
    tradex-body {
      position: relative;
      height: calc(100% - ${ze}px); 
      min-height: ${Ve - ze}px;
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
class Km extends J {
  #e;
  #t;
  #i;
  #n;
  #s = Wt;
  #r = Ve;
  #o;
  #l;
  #a;
  #h;
  #c;
  #d;
  constructor() {
    const e = document.createElement("template");
    e.innerHTML = jm, super(e, "closed"), this.#n = e;
  }
  destroy() {
    this.resizeObserver.disconnect();
  }
  static get observedAttributes() {
    return ["config", "disabled", "height", "stream", "width"];
  }
  connectedCallback() {
    if (this.doInit) {
      this.doInit = !1, this.shadowRoot.appendChild(this.#n.content.cloneNode(!0)), this.style.display = "block", this.style.minHeight = so, this.#i = this.shadowRoot.querySelector("tradex-widgets"), this.#t = this.shadowRoot.querySelector("tradex-utils"), this.#e = this.shadowRoot.querySelector("tradex-body"), this.#r = this.parentElement.clientHeight || Ve, this.#s = this.parentElement.clientWidth || Wt;
      let e = this.getAttribute("height") || "100%", i = this.getAttribute("width") || "100%";
      this.setDimensions(i, e), this.resizeObserver = new ResizeObserver(De(this.onResized, 100, this)), this.resizeObserver.observe(this);
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
  get id() {
    return this.getAttribute("id");
  }
  set id(e) {
    this.setAttribute("id", Fe(e));
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
    return this.#d;
  }
  elStart(e) {
    this.#c = e, this.setUtilsLocation();
  }
  onResized(e) {
    super.onResize(e);
    const i = to.includes(this.theme?.utils?.location) ? ze : 0, { width: s, height: n } = e[0].contentRect;
    this.#s = s, this.#r = n, this.#d = e[0], this.elBody.style.height = `calc(100% - ${i}px)`, this.MainPane instanceof Uo, this.ToolsBar instanceof zo && this.ToolsBar.onResized(), this.log(`onResize w: ${s}, h: ${n}`), this.emit("global_resize", { w: s, h: n });
  }
  setWidth(e) {
    x(e) ? e += "px" : C(e) && e.match(Ht) || (e = "100%"), this.style.width = e, this.#s = Math.round(this.getBoundingClientRect().width);
  }
  setHeight(e) {
    x(e) ? e += "px" : C(e) && e.match(Ht) || (this.#r = this.parentElement.getBoundingClientRect().height, e = this.#r + "px"), this.style.height = e, this.#r = Math.round(this.getBoundingClientRect().height);
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
      const a = this.getBoundingClientRect(), l = this.parentElement.getBoundingClientRect();
      i = a.height ? a.height : l.height ? l.height : Ve, e = a.width ? a.width : l.width ? l.width : Wt;
    } else
      (!x(e) || !x(i)) && ((!C(e) || !e.match(Ht)) && (e = "100%"), (!C(i) || !i.match(Ht)) && (i = "100%"));
    return this.setWidth(e), this.setHeight(i), s = {
      width: this.width,
      height: this.height,
      resizeW: e / n,
      resizeH: i / r,
      resizeWDiff: e - n,
      resizeHDiff: i - r
    }, s;
  }
  setUtilsLocation(e = this.#c?.utils?.location) {
    switch (this.#c.utils = this.#c.utils || {}, e) {
      case "top":
      case !0:
        this.theme.setProperty("utils.location", "top"), this.theme.setProperty("utils.height", ze), this.#c.utils.location = "top", this.#c.utils.height = ze, this.elUtils.style.display = "block", this.elUtils.style.height = `${ze}px`, this.elBody.style.height = `calc(100% - ${ze}px)`, this.elBody.style.minHeight = `${Ve - ze}px`;
        break;
      case "none":
      case !1:
      default:
        this.theme.setProperty("utils.location", "none"), this.theme.setProperty("utils.height", 0), this.#c.utils.location = "none", this.#c.utils.height = 0, this.elUtils.style.display = "none", this.elUtils.style.height = "0px", this.elBody.style.height = "100%", this.elBody.style.minHeight = `${Ve}px`;
        break;
    }
  }
}
const Zm = [
  {
    id: "indicators",
    name: "Indicators",
    icon: Ch,
    event: "utils_indicators",
    sub: []
  },
  {
    id: "timezone",
    name: "Timezone",
    icon: Th,
    event: "utils_timezone"
  },
  {
    id: "screenshot",
    name: "Screenshot",
    icon: xh,
    event: "utils_screenshot"
  },
  {
    id: "settings",
    name: "Settings",
    icon: io,
    event: "utils_settings"
  }
];
class Qm extends ct {
  #e = "Utilities";
  #t = "utils";
  #i;
  #n;
  #s;
  #r;
  #o;
  #l = {};
  #a = {};
  #h = {};
  constructor(e, i) {
    super(e, i), this.#i = e.elUtils, this.#n = e.config?.utilsBar || Zm, this.#r = e.WidgetsG, this.#o = e.indicatorClasses || Do, this.#s = e.config.theme?.utils?.location || "none", (this.#s || this.#s == "none" || !to.includes(this.#s)) && (this.#i.style.height = 0, this.core.elBody.style.height = "100%"), this.#i.innerHTML = this.#i.defaultNode(this.#n), this.log(`${this.#e} instantiated`);
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
    return se(this.#i);
  }
  get location() {
    return this.#s;
  }
  start() {
    this.initAllUtils(), this.eventsListen();
  }
  destroy() {
    const e = this.core, i = Dr(`#${e.id} .${Ba} .icon-wrapper`);
    for (let s of i) {
      let n = s.id.replace("TX_", "");
      for (let r of this.#n)
        r.id === n && s.removeEventListener("click", this.#a[n].click), s.removeEventListener("pointerover", this.#a[n].pointerover), s.removeEventListener("pointerout", this.#a[n].pointerout);
    }
    this.core.hub.expunge(this);
  }
  eventsListen() {
    this.on("utils_indicators", this.onIndicators, this), this.on("utils_timezone", this.onTimezone, this), this.on("utils_settings", this.onSettings, this), this.on("utils_screenshot", this.onScreenshot, this);
  }
  onIconClick(e) {
    const i = $s(e.target, "icon-wrapper");
    if (!w(i))
      return !1;
    const s = Date.now();
    if (s - this.#h[i.id] < 1e3)
      return !1;
    this.#h[i.id] = s;
    let n = i.dataset.event, r = i.dataset.menu || !1, a = {
      target: i.id,
      menu: r,
      evt: n
    }, l = i.dataset.action;
    this.emit(n, a), r ? this.emit("menu_open", a) : this.emit("util_selected", a), l && l(a, this.core);
  }
  onIconOver(e) {
    const i = e.currentTarget.querySelector("svg");
    i.style.fill = wt.COLOUR_ICONHOVER;
  }
  onIconOut(e) {
    const i = e.currentTarget.querySelector("svg");
    i.style.fill = wt.COLOUR_ICON;
  }
  initAllUtils() {
    const e = this.#i.querySelectorAll(".icon-wrapper");
    for (let i of e) {
      this.#h[i.id] = 0;
      let s = i.id.replace("TX_", ""), n = i.querySelector("svg");
      n.style.fill = wt.COLOUR_ICON, n.style.height = "90%";
      for (let r of this.#n)
        if (r.id === s && (this.#a[s] = {}, this.#a[s].click = this.onIconClick.bind(this), this.#a[s].pointerover = this.onIconOver.bind(this), this.#a[s].pointerout = this.onIconOut.bind(this), i.addEventListener("click", this.#a[s].click), i.addEventListener("pointerover", this.#a[s].pointerover), i.addEventListener("pointerout", this.#a[s].pointerout), s === "indicators" && (r.sub = Object.values(this.#o)), r?.sub)) {
          let a = {
            content: r.sub,
            primary: i
          }, l = this.#r.insert("Menu", a);
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
const Jm = 150;
class we {
  #e;
  #t;
  #i;
  #n;
  #s;
  #r;
  #o;
  #l;
  #a;
  #h = {};
  static menuList = {};
  static menuCnt = 0;
  static class = Nn;
  static name = "Menus";
  static type = "Menu";
  static currentActive;
  static create(e, i) {
    const s = `menu_${++we.menuCnt}`;
    return i.id = s, we.menuList[s] = new we(e, i), we.menuList[s];
  }
  static destroy(e) {
    we.menuList[e].end(), delete we.menuList[e];
  }
  constructor(e, i) {
    this.#t = e, this.#i = i.core, this.#n = i, this.#e = i.id, this.#r = e.elements.elMenus, this.#s = this.#i.elWidgetsG, this.mount(this.#r);
  }
  get el() {
    return this.#o;
  }
  get id() {
    return this.#e;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return se(this.#o);
  }
  get type() {
    return we.type;
  }
  start() {
    this.position(), this.eventsListen();
  }
  end() {
    this.#r.querySelectorAll(`#${this.id} li`).forEach((i) => {
      i.removeEventListener("click", this.#h[this.id][i.id]);
    }), document.removeEventListener("click", this.#h[this.id].outside), this.off("global_resize", this.onResize, this);
  }
  eventsListen() {
    const e = this.#r.querySelectorAll(`#${this.id} li`);
    this.#h[this.id] = {}, e.forEach((i) => {
      this.#h[this.id][i.id] = this.onMenuSelect.bind(this), i.addEventListener("click", this.#h[this.id][i.id]);
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
    if (!this.#o.contains(e.target) && !this.#n.primary.contains(e.target) && lt(this.#o)) {
      let i = {
        target: e.currentTarget.id,
        menu: this.#e
      };
      this.emit("menu_close", i);
    }
    document.removeEventListener("click", this.#h[this.id].outside);
  }
  onResize() {
    this.position();
  }
  mount(e) {
    e.lastElementChild == null ? e.innerHTML = this.menuNode() : e.lastElementChild.insertAdjacentHTML("afterend", this.menuNode()), this.#o = this.#r.querySelector(`#${this.id}`);
  }
  static defaultNode() {
    return `
      <div slot="widget" class="${Nn}" style=""></div>
    `;
  }
  menuNode() {
    const e = this.#n, i = `position: absolute; z-index: 1000; display: none; border: 1px solid ${is.COLOUR_BORDER}; background: ${is.COLOUR_BG}; color: ${is.COLOUR_TXT}; box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;`;
    let s = this.content(e);
    return `
      <div id="${e.id}" class="${Ua}" style="${i}">
        ${s}
      </div>
    `;
  }
  content(e) {
    const i = `list-style: none; text-align: left; margin:1em 1em 1em -2.5em; min-width: ${Jm}px`, s = "padding: .25em 1em .25em 1em; white-space: nowrap;", n = "display: inline-block; width: 4em;", r = "cursor: pointer;", a = `onmouseover="this.style.background ='#222'"`, l = `onmouseout="this.style.background ='none'"`;
    let h = `<ul style="${i}">`;
    if (e?.content)
      for (let m of e.content)
        h += `<li id="${m.id}" data-event="${m.event}" style="${s} ${r}" ${a} ${l}><a style="${r}"><span style="${n}">${m.id}</span><span>${m.name}</span></li></a>`;
    return h += "</ul>", h;
  }
  position() {
    let e = this.#s.getBoundingClientRect(), i = this.#n.primary.getBoundingClientRect(), s = Math.round(i.left - e.left), n = Math.round(i.bottom - e.top);
    this.#o.style.left = s + "px", this.#o.style.top = n + "px";
    let r = se(this.#o);
    if (r.right > this.#s.offsetWidth) {
      let l = Math.floor(this.#s.offsetWidth - r.width);
      l = k(l, 0, this.#s.offsetWidth), this.#o.style.left = `${l}px`;
    }
    if (this.#i.MainPane.rowsH + n + r.height > this.#i.MainPane.rowsH) {
      let l = Math.floor(r.height * -1);
      l = k(l, this.#i.MainPane.rowsH * -1, 0), this.#o.style.top = `${l}px`;
    }
  }
  remove() {
  }
  open() {
    if (we.currentActive === this)
      return !0;
    we.currentActive = this, this.#o.style.display = "block", this.position(), setTimeout(() => {
      this.#h[this.id].outside = this.onOutsideClickListener.bind(this), document.addEventListener("click", this.#h[this.id].outside);
    }, 250);
  }
  close() {
    we.currentActive = null, this.#o.style.display = "none", this.emit("menuClosed", this.id);
  }
}
class Zt extends K {
  static name = "Dialogues";
  static type = "Dialogue";
  static class = "tradeXdialogue";
  static defaultStyles = `
  /** default Dialogue widget styles */
  `;
  static create(e, i) {
    return i.dragBar = F(i?.dragBar) ? i.dragBar : !0, i.close = F(i?.close) ? i.close : !0, i.type = i?.type || Zt.type, i.class = i?.class || "dialogue", i.id = i?.id || ne("dialogue"), super.create(e, i);
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
    return Zt.type;
  }
  dialogueBuild(e = "", i = []) {
    let s = { buttons: {} }, n = `
    <input class="submit" type="submit" value="Submit"/>
    <input class="cancel" type="button" value="Cancel"/>
    <input class="default" type="button" value="Default"/>
    `;
    return P(i) && i.length > 1 || (s.submit = this.provideEventListeners(
      "input.submit",
      "click",
      (a) => {
        N(this.parent.onConfigDialogueSubmit) && this.parent.onConfigDialogueSubmit(this);
      }
    ), s.cancel = this.provideEventListeners(
      "input.cancel",
      "click",
      (a) => {
        N(this.parent.onConfigDialogueCancel) && this.parent.onConfigDialogueCancel(this);
      }
    ), s.default = this.provideEventListeners(
      "input.default",
      "click",
      (a) => {
        N(this.parent.onConfigDialogueDefault) && this.parent.onConfigDialogueDefault(this);
      }
    )), { html: `
    ${new String(e)}
    <div class="buttons">
      ${n}
    </div>
    `, modifiers: s };
  }
  provideEventListeners(e, i, s) {
    return (r) => {
      const a = r.querySelector(e);
      a && a.addEventListener(
        i,
        (l) => {
          s(l);
        }
      );
    };
  }
}
const ta = `
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
}
.tabbedContent .label {
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
.tabbedContent .input:focus + .label {
  z-index: 1;
}
.tabbedContent .input:checked + .label {
  background: #fff;
  color: #000;
}
.tabbedContent .panel {
  display: none;
  padding: 1em 1em 1.5em;
  background: #ffffff88;
  order: 100;
}
.tabbedContent .input:checked + .label + .panel {
  display: grid;
  width: 100%;
  grid-template-columns: [label] 1fr [input] 9em [end];
  grid-row-gap: 2px;
  align-items: center;
}
.tabbedContent .panel label,
.tabbedContent .panel input {
  ${H.FONTSTRING}
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
`, ia = document.createElement("template");
ia.innerHTML = `
<style>
  ${ta}
}
</style>
<div class="tabbedContent">
</div>
`;
class ep extends J {
  #e;
  #t;
  #i;
  #n;
  #s = this.onSlotChange.bind(this);
  constructor() {
    super(ia);
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
    let a = Li(i, s, n, r);
    a = this.#t.insertAdjacentHTML("afterend", a), this.#n.push({ id: i, label: s, content: n, checked: r, tab: a });
  }
  removeTab(e) {
    if (C(e)) {
      let i = this.#t.querySelectorAll(`.tab-${e}`);
      for (let s of i)
        s.remove();
      for (let s = 0; s < this.#n.length; s++)
        this.#n[s].id == e && delete this.#n[s];
    } else
      x(e) && this.#t.querySelectorAll(".input");
  }
}
function tp(o = {}, e) {
  w(o) || (o = {});
  let i = "", s = Object.keys(o), n = s.length;
  if (n < 1)
    i += Li(1, "Question", "Why did the chicken cross the road?", !0), i += Li(2, "Answer", "To get to the other side.");
  else {
    let r = [];
    for (--n; n >= 0; n--) {
      let a = n == 0, l = N(e) ? e(o[s[n]]) : o[s[n]];
      r.push(Li(n, s[n], l, a));
    }
    i = r.reverse().join();
  }
  return i;
}
function Li(o, e, i, s = !1) {
  return i = C(i) ? i : "", `
  <input class="input tab-${o}" name="tabs" type="radio" id="tab-${o}" ${s ? 'checked="checked"' : ""}/>
  <label class="label tab-${o}" for="tab-${o}">${e}</label>
  <div class="panel tab-${o}">
    ${i}
  </div>
  `;
}
customElements.get("tradex-tabs") || window.customElements.define("tradex-tabs", ep);
class ki extends Zt {
  static name = "ConfigDialogues";
  static type = "ConfigDialogue";
  static class = "tradeXconfig";
  static defaultStyles = `
  /** default Config Dialogue widget styles */
  
  .tradeXwindow.config {
    overflow: hidden;
    background: none;
  }

  .tradeXwindow.config .content {
    padding: 0;
  }

  .tradeXwindow.config .buttons {
    background: #ffffffbb;
    display: flex;
    justify-content: flex-end;
    padding: 3px 1em;
  }

  .tradeXwindow.config .buttons input {
    margin-left: 5px;
    font-size: 1em;
    padding: 1px .5em;
  }

  ${ta} 
  `;
  static create(e, i) {
    return i.dragBar = !0, i.close = !0, i.type = ki.type, i.class = "config", i.id = ne("config"), new ki(e, i);
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
    super.destroy();
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
        ${tp(i)}
      </form>
    </div>
    `, { html: r, modifiers: a } = super.dialogueBuild(n);
    return s = { ...s, ...a }, { html: r, modifiers: s };
  }
  configContent(e) {
    if (!w(e))
      return "<p>Input missing!</p>";
    let i = {}, s = {};
    for (let n in e) {
      if (!w(e[n])) {
        this.core.error("ERROR: Building Config Dialogue : Input malformed");
        continue;
      }
      i[n] = "";
      for (let r in e[n]) {
        Or.includes(e[n][r]?.type) && (i[n] += Hr(n, e[n][r]));
        const a = ["$function"];
        for (let l in e[n][r])
          if (a.includes(l))
            switch (l) {
              case "$function":
                N(e[n][r][l]) && (s[r] = e[n][r][l]);
                break;
            }
      }
    }
    return { content: i, modifiers: s };
  }
  contentUpdate(e) {
    return w(e) ? (C(e?.title) && this.setTitle(e.title), C(e?.content) && this.setContent(this.configBuild(e.content)), this.#e = !0, this.#e) : !1;
  }
  provideEventListener(e, i, s) {
    return (r) => {
      const a = r.querySelector(e);
      a && a.addEventListener(
        i,
        (l) => {
          s(l);
        }
      );
    };
  }
}
class Me {
  static progressList = {};
  static progressCnt = 0;
  static class = Rn;
  static type = "progress";
  static name = "Progress";
  static icons = {
    loadingBars: Jh,
    loadingSpin: ec
  };
  static defaultNode() {
    return `
      <div slot="widget" class="${Rn}" style=""></div>
    `;
  }
  static create(e, i) {
    const s = `progress_${++Me.progressCnt}`;
    return i.id = s, Me.progressList[s] = new Me(e, i), Me.progressList[s];
  }
  static destroy(e) {
    Me.progressList[e].destroy(), delete Me.progressList[e];
  }
  #e;
  #t;
  #i;
  #n;
  #s;
  #r;
  #o;
  #l;
  constructor(e, i) {
    this.#t = e, this.#i = i.core, this.#n = i, this.#e = i.id, this.#r = e.elements.elProgress, this.#s = this.#i.elWidgetsG, this.init();
  }
  destroy() {
    this.#r.remove();
  }
  get type() {
    return Me.type;
  }
  init() {
    this.mount(this.#r);
  }
  start() {
    if (!w(this.#i.config?.progress) || !w(this.#i.config.progress?.loading))
      return !1;
    this.#o.style.display = "block";
    const e = this.#i.elBody.width / 2 - this.#o.clientWidth / 2, i = this.#i.elBody.height / -2 - this.#o.clientHeight / 2;
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
    this.#n?.type in Me.icons && (i = this.#n?.type);
    const s = { type: i, icon: Me.icons[i] };
    e.lastElementChild == null ? e.innerHTML = this.progressNode(s) : e.lastElementChild.insertAdjacentHTML("afterend", this.progressNode(s)), this.#o = this.#r.querySelector(`#${this.#n.id}`), this.#l = this.#o.querySelector("svg"), this.#l.style.fill = `${sc.COLOUR_ICONHOVER};`;
  }
}
const cs = {
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
class ip extends ct {
  #e = "Widgets";
  #t = "widgets";
  #i = { Divider: ce, Progress: Me, Menu: we, Window: K, Dialogue: Zt, ConfigDialogue: ki };
  #n = {};
  #s = {};
  #r;
  #o;
  #l;
  #a;
  constructor(e, i) {
    super(e, i), this.#a = { ...this.#i, ...i.widgets }, this.#r = e.elWidgetsG, this.mount(this.#r);
    for (let s in this.#a) {
      let n = this.#a[s], r = `el${n.name}`;
      this.#s[r] = this.#r.querySelector(`.${n.class}`), this.#s[r].innerHTML = `
      <style title="${n.name}">
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
    return this.#s;
  }
  get instances() {
    return this.#n;
  }
  get types() {
    return this.#a;
  }
  start() {
    this.eventsListen(), cs.id = this.id, cs.context = this, this.stateMachine = cs, this.stateMachine.start();
  }
  destroy() {
    this.core.hub.expunge(this), this.stateMachine.destroy();
    for (let e in this.#n)
      this.delete(e);
    for (let e in this.#a)
      this.#a[e].destroy();
  }
  eventsListen() {
    this.on("resize", this.onResize, this), this.on("global_resize", this.onResize, this), this.on("menu_open", this.onOpenMenu, this), this.on("menu_close", this.onCloseMenu, this), this.on("menu_off", this.onCloseMenu, this), this.on("menuItem_selected", this.onMenuItemSelected, this);
  }
  onOpenMenu(e) {
    this.#n[e.menu].open();
  }
  onCloseMenu(e) {
    this.#n[e.menu].close();
  }
  onMenuItemSelected(e) {
    this.emit(e.evt, e.target);
  }
  onResize(e) {
    this.setDimensions(e), this.elements.elDividers.style.width = `${this.core.width}px`;
  }
  mount(e) {
    e.innerHTML = this.defaultNode();
  }
  setWidth(e) {
    this.#o = e;
  }
  setHeight(e) {
    this.#l = e;
  }
  setDimensions(e) {
    this.setWidth(e.mainW), this.setHeight(e.mainH);
  }
  defaultNode() {
    let e = "", i = [];
    for (let s in this.#a) {
      let n = this.#a[s];
      i.indexOf(n.type) === -1 && (e += n.defaultNode(), i.push(n.type));
    }
    return e;
  }
  insert(e, i) {
    if (!(e in this.#a) || !w(i))
      return !1;
    i.core = this.core;
    const s = this.#a[e].create(this, i);
    return this.#n[s.id] = s, s;
  }
  delete(e) {
    if (!C(e) || !(e in this.#n))
      return !1;
    const i = this.#n[e].type;
    return this.#a[i].destroy(e), !0;
  }
}
function Mr(o, e, i, s, n, r) {
  const a = o.theme, l = document.createElement("template"), h = o.Timeline.graph.viewport.scene, m = o.MainPane, f = m.graph.viewport.scene, v = m.width, T = m.height, E = new be.Viewport({
    width: v,
    height: T,
    container: l
  }), M = E.scene.context;
  let I = 0, re = 0, me = v - o.Chart.scale.width;
  a?.yAxis?.location == "left" && (re = o.Chart.scale.width, me = 0);
  let _;
  M.save(), Js(M, 0, 0, v, T, { fill: a.chart.Background }), M.drawImage(f.canvas, re, 0, f.width, f.height);
  for (const [L, oe] of o.ChartPanes) {
    let X = oe.graph.viewport.scene, { width: ae, height: pe } = X, fe = oe.scale.graph.viewport.scene, { width: ut, height: Ge } = fe;
    I > 0 && (_ = { stroke: a.divider.line }, Kt(M, I, 0, m.width, _)), M.drawImage(X.canvas, re, I, ae, pe), M.drawImage(fe.canvas, me, I - 1, ut, Ge), I += pe;
  }
  M.drawImage(h.canvas, 0, I, h.width, h.height), _ = {
    text: o.config.title,
    colour: a.chart.TextColour,
    fontSize: a.chart.FontSize * 1.5,
    fontWeight: "normal",
    fontFamily: a.chart.FontFamily,
    textBaseLine: "top"
  }, mo(M, 6, 6, _);
  const D = (L) => {
    if (L) {
      const X = r?.x || 0, ae = r?.y || 0, pe = r?.width || v * 0.25, fe = r?.height || T * 0.25;
      M.drawImage(L, X, ae, pe, fe);
    }
    M.restore();
    const oe = () => {
      E.destroy(), l.remove();
    };
    switch (n) {
      case "url":
        if (N(e)) {
          const X = (ae) => {
            e(ae), oe();
          };
          E.scene.toImage(i, s, X);
        } else
          new Promise(function(X, ae) {
            const pe = E.scene.toImage(i, s);
            pe ? X(pe) : ae(!1), oe();
          });
        break;
      case "download":
      default:
        E.scene.export({ fileName: e }, null, i, s), oe();
        break;
    }
  };
  w(r) ? ks(r?.imgURL).then((L) => {
    D(L);
  }).catch((L) => {
    console.error(L);
  }) : D();
}
class O extends Km {
  static #e = rn;
  static #t = 0;
  static #i = {};
  static #n = {};
  static #s = null;
  static #r = !1;
  static #o = [];
  static #l = null;
  static #a = null;
  static #h = !1;
  static get version() {
    return O.#e;
  }
  static get talibPromise() {
    return O.#s;
  }
  static get talibReady() {
    return O.#r;
  }
  static get talibAwait() {
    return O.#o;
  }
  static get talibError() {
    return O.#l;
  }
  static get webWorkers() {
    return Oe;
  }
  static get TALibWorker() {
    return O.#a;
  }
  static #c = `${Rt} requires "talib-web" to function properly. Without it, some features maybe missing or broken.`;
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
  #u = Rt;
  #p = zt;
  #m;
  #f;
  #w;
  #P;
  #x;
  #y;
  #C;
  #T;
  #g;
  #b;
  #v;
  #M;
  #L = !1;
  #S = null;
  #E = R;
  #N;
  #A;
  #B = Do;
  #Q = { ...xi };
  #q = { ...xi };
  #I = { ...xi };
  #Y;
  #R;
  #X;
  chartWMin = Wt;
  chartHMin = Ve;
  chartW_Reactive = !0;
  chartH_Reactive = !0;
  chartBGColour = H.COLOUR_BG;
  chartTxtColour = H.COLOUR_TXT;
  chartBorderColour = H.COLOUR_BORDER;
  #U;
  #z;
  #O = {
    chart: {},
    time: {}
  };
  #V;
  panes = {
    utils: this.#U,
    tools: this.#z,
    main: this.#O
  };
  #D = {
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
  #k = 0;
  #ee = 0;
  #W = { x: 0, y: 0 };
  #J = [!1, !1, !1];
  #F;
  #G;
  #_;
  #j;
  #K;
  #Z;
  #H = !1;
  #$ = !1;
  static create(e) {
    let i = he(cc);
    return w(e) && Object.keys(e).length > 0 && ((!("watermark" in e) || !C(e?.watermark?.text) && !("imgURL" in e?.watermark)) && (i.watermark = { display: !1 }), i = ot(i, e)), O.#t == 0 && (O.#i.CPUCores = navigator.hardwareConcurrency, O.#i.api = {
      permittedClassNames: O.#d
    }), (typeof i.talib != "object" || typeof i.talib.init != "function") && (O.#r = !1, O.#l = new Error(`${O.#c}`)), !O.#r && O.#l === null && (O.#s = i.talib.init(i.wasm), O.#s.then(
      () => {
        O.#r = !0;
        for (let s of O.#o)
          N(s) && s();
      },
      () => {
        O.#r = !1;
      }
    )), i;
  }
  static destroy(e) {
    if (!(e instanceof O))
      return !1;
    const i = e.inCnt;
    return e.destuction = !0, e.destroy(), delete O.#n[i], !0;
  }
  static cnt() {
    return O.#t++;
  }
  constructor() {
    super(), this.#P = this, this.#m = this, this.#S = O.cnt(), this.logs = !1, this.infos = !1, this.warnings = !1, this.errors = !1, this.timer = !1, this.setID(null), this.#N = this.#E.create({}, !1, !1), console.warn(`!WARNING!: ${Rt} changes to config format, for details please refer to https://github.com/tradex-app/TradeX-chart/blob/master/docs/notices.md`), this.log(`${zt} instance count: ${this.inCnt}`), this.oncontextmenu = window.oncontextmenu, this.#G = Oe;
    const e = this.#Q;
    e.primaryPane = { ...e.primaryPane, ...Bo.primaryPane }, this.#q = { ...Os };
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
    return O.version;
  }
  get name() {
    return this.#u;
  }
  get shortName() {
    return this.#p;
  }
  get options() {
    return this.#w;
  }
  get config() {
    return this.#f;
  }
  get core() {
    return this.#m;
  }
  get inCnt() {
    return this.#S;
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
    return this.#U;
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
    return this.#V;
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
  get CustomOverlays() {
    return this.#I;
  }
  get ready() {
    return this.#L;
  }
  get state() {
    return this.#N;
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
    return x(this.#A.initialCnt) ? this.#A.initialCnt : Va;
  }
  get range() {
    return this.#A;
  }
  get time() {
    return this.#D;
  }
  get TimeUtils() {
    return fh;
  }
  get theme() {
    return this.#R;
  }
  get settings() {
    return this.state.data.chart.settings;
  }
  get indicatorClasses() {
    return this.#B;
  }
  get TALib() {
    return this.#Y;
  }
  get TALibReady() {
    return O.talibReady;
  }
  get TALibError() {
    return O.talibError;
  }
  get talibAwait() {
    return O.talibAwait;
  }
  get TALibPromise() {
    return O.talibPromise;
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
    return this.#k;
  }
  get smoothScrollOffset() {
    return 0;
  }
  get rangeScrollOffset() {
    return Math.floor(this.bufferPx / this.candleW);
  }
  get mousePos() {
    return this.#W;
  }
  get pointerButtons() {
    return this.#J;
  }
  set pricePrecision(e) {
    this.setPricePrecision(e);
  }
  get pricePrecision() {
    return this.#K;
  }
  get volumePrecision() {
    return this.#Z;
  }
  set stream(e) {
    return this.setStream(e);
  }
  get stream() {
    return this.#_;
  }
  get worker() {
    return this.#G;
  }
  get isEmpty() {
    return this.#N.IsEmpty;
  }
  set candles(e) {
    w(e) && (this.#j = e);
  }
  get candles() {
    return this.#j;
  }
  get progress() {
    return this.#F;
  }
  get customOverlays() {
    return this.#I;
  }
  get optionalOverlays() {
    return ot({ ...this.#q }, this.#I);
  }
  start(e) {
    this.log(`${Rt} configuring...`), O.create(e);
    const i = O.create(e);
    this.logs = i?.logs ? i.logs : !1, this.infos = i?.infos ? i.infos : !1, this.warnings = i?.warnings ? i.warnings : !1, this.errors = i?.errors ? i.errors : !1, this.timer = i?.timer ? i.timer : !1, this.#f = i, this.#S = i.cnt || this.#S, this.#Y = i.talib, (!("theme" in i) || !w(i.theme)) && (i.theme = Bi);
    const s = C(i?.id) ? i.id : null;
    this.setID(s), this.classList.add(this.id), this.log("processing state...");
    let n = he(i?.state) || {};
    n.id = this.id, n.core = this;
    let r = i?.deepValidate || !1, a = i?.isCrypto || !1;
    this.#N = this.#E.create(n, r, a), delete i.state, this.log(`${this.name} id: ${this.id} : created with a ${this.state.status} state`);
    let l = "1s", h = V;
    if (!w(i?.stream) && this.state.data.chart.data.length < 2 ? (this.warn(`${Rt} has no chart data or streaming provided.`), { tf: l, ms: h } = wi(i?.timeFrame)) : w(i?.stream) && this.state.data.chart.data.length < 2 ? ({ tf: l, ms: h } = wi(i?.timeFrame), this.#H = !0) : (l = this.state.data.chart.tf, h = this.state.data.chart.tfms), this.log(`tf: ${l} ms: ${h}`), this.#f.callbacks = this.#f.callbacks || {}, w(i))
      for (const f in i)
        f in this.props() && this.props()[f](i[f]);
    const m = w(i?.range) ? i.range : {};
    if (m.interval = h, m.core = this, this.getRange(null, null, m), this.#A.Length > 1) {
      const f = Ms(this.#D, this.#f?.range?.startTS), v = x(f) ? f + this.#A.initialCnt : this.allData.data.length, T = x(f) ? f : v - this.#A.initialCnt;
      this.#A.initialCnt = v - T, this.setRange(T, v), i.range?.center && this.jumpToIndex(T, !0, !0);
    }
    this.parentElement && this.insertAdjacentHTML("beforebegin", `<style title="${this.id}_style"></style>`), this.#V = new ip(this, { widgets: i?.widgets }), this.#U = new Qm(this, i), this.#z = new zo(this, i), this.#O = new Uo(this, i), this.setTheme(this.#X.id), this.log(`${this.#u} V${O.version} configured and running...`), this.#k = this.bufferPx * -1, this.eventsListen(), this.elStart(this.theme), this.elBody.start(this.theme), this.UtilsBar.start(), this.ToolsBar.start(), this.MainPane.start(), this.WidgetsG.start(), this.#F = this.WidgetsG.insert("Progress", {}), this.stream = this.#f.stream, this.#H && this.on(Ke, this.delayedSetRange, this), this.#L = !0, this.refresh();
  }
  destroy() {
    if (this?.destuction !== !0)
      return O.destroy(this), !0;
    this.log("...cleanup the mess"), this.removeEventListener("mousemove", this.onMouseMove), this.hub.expunge(this), this.UtilsBar.destroy(), this.ToolsBar.destroy(), this.MainPane.destroy(), this.WidgetsG.destroy(), this.#G.end(), this.#E = null;
  }
  eventsListen() {
    this.addEventListener("mousemove", this.onMouseMove.bind(this)), this.on(Ke, this.onStreamUpdate, this), this.on("state_mergeComplete", () => this.#F.stop());
  }
  onMouseMove(e) {
    this.#W.x = e.clientX, this.#W.y = e.clientY;
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
      logs: (e) => this.logs = F(e) ? e : !1,
      infos: (e) => this.infos = F(e) ? e : !1,
      warnings: (e) => this.warnings = F(e) ? e : !1,
      errors: (e) => this.errors = F(e) ? e : !1,
      indicators: (e) => this.setIndicators(e),
      theme: (e) => {
        this.#X = this.addTheme(e);
      },
      stream: (e) => this.#_ = w(e) ? e : {},
      pricePrecision: (e) => this.setPricePrecision(e),
      volumePrecision: (e) => this.setVolumePrecision(e)
    };
  }
  getInCnt() {
    return this.#S;
  }
  setID(e) {
    C(e) ? this.id = e : this.id = `${ne(zt)}_${this.#S}`;
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
    this.elUtils.style.height = `${e}px`;
  }
  setToolsW(e) {
    this.elTools.style.width = `${e}px`;
  }
  setPricePrecision(e) {
    (!x(e) || e < 0) && (e = Xa), this.#K = e;
  }
  setVolumePrecision(e) {
    (!x(e) || e < 0) && (e = ja), this.#Z = e;
  }
  addTheme(e) {
    const i = Le.create(e, this);
    return this.#R instanceof Le || (this.#R = i), i;
  }
  setTheme(e) {
    if (!this.theme.list.has(e))
      return !1;
    this.#R.setTheme(e, this);
    const i = this.#R, s = document.querySelector(`style[title=${this.id}_style]`), n = `var(--txc-border-color, ${i.chart.BorderColour}`;
    let r = `.${this.id} { `;
    r += `--txc-background: ${i.chart.Background}; `, this.style.background = `var(--txc-background, ${i.chart.Background})`, this.style.border = `${i.chart.BorderThickness || 0}px solid`, this.style.borderColor = n, r += `--txc-border-color:  ${i.chart.BorderColour}; `, i.chart.BorderThickness > 0 ? (this.elMain.rows.style.border = `1px solid ${n}`, this.elMain.rows.style.height = "calc(100% - 4px)") : (this.elMain.rows.style.border = "none", this.elMain.rows.style.height = "100%"), r += `--txc-time-scrollbar-color: ${i.chart.BorderColour}; `, r += `--txc-time-handle-color: ${i.xAxis.handle}; `, r += `--txc-time-slider-color: ${i.xAxis.slider}; `, r += `--txc-time-cursor-fore: ${i.xAxis.colourCursor}; `, r += `--txc-time-cursor-back: ${i.xAxis.colourCursorBG}; `, r += `--txc-time-icon-color: ${i.icon.colour}; `, r += `--txc-time-icon-hover-color: ${i.icon.hover}; `, this.elTime.overview.scrollBar.style.borderColor = n, this.elTime.overview.handle.style.backgroundColor = `var(--txc-time-handle-color, ${i.xAxis.handle})`, this.elTime.overview.style.setProperty("--txc-time-slider-color", i.xAxis.slider), this.elTime.overview.style.setProperty("--txc-time-icon-color", i.icon.colour), this.elTime.overview.style.setProperty("--txc-time-icon-hover-color", i.icon.hover);
    for (let [a, l] of Object.entries(this.Chart.legend.list))
      l.el.style.color = `var(--txc-legend-color, ${i.legend.colour})`, l.el.style.font = `var(--txc-legend-font, ${i.legend.font})`;
    for (let a of this.elUtils.icons)
      a.className == "icon-wrapper" && (a.children[0].style.fill = i.icon.colour);
    for (let a of this.elTools.icons)
      a.className == "icon-wrapper" && (a.children[0].style.fill = i.icon.colour);
    return r += " }", s.innerHTML = r, !0;
  }
  setScrollPos(e) {
    e = Math.round(e), x(e) && e <= 0 && e >= this.bufferPx * -1 ? this.#k = e : this.emit("Error", "setScrollPos: not a valid value");
  }
  setState(e) {
    if (!R.has(e))
      return this.warn(`${this.name} id: ${this.id} : Specified state does not exist`), !1;
    if (e === this.key)
      return !0;
    this.stream.stop(), this.MainPane.reset(), this.#N = R.get(e);
    const i = {
      interval: this.#N.data.chart.tfms,
      core: this
    };
    if (this.getRange(null, null, i), this.range.Length > 1) {
      const s = Ms(this.time, void 0), n = s ? s + this.range.initialCnt : this.#N.data.chart.data.length - 1, r = s || n - this.range.initialCnt;
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
    if (this.stream instanceof bt)
      return this.error("ERROR: Invoke stopStream() before starting a new one."), !1;
    if (w(e))
      return this.allData.data.length == 0 && C(e.timeFrame) && ({ tf, ms } = wi(e?.timeFrame), this.range.interval = ms, this.range.intervalStr = tf, this.#D.timeFrameMS = ms, this.#D.timeFrame = tf), this.#_ = new bt(this), this.#f.stream = this.#_.config, this.#_;
  }
  stopStream() {
    this.stream instanceof bt && this.stream.stop();
  }
  delayedSetRange() {
    for (; this.#H; ) {
      let e = this.range.Length * 0.5;
      this.setRange(e * -1, e), this.off(Ke, this.delayedSetRange, this), this.#H = !1;
    }
  }
  updateRange(e) {
    if (!P(e) || !x(e[4]) || e[4] == 0)
      return;
    let i, s;
    i = e[4], s = this.#k + i, s % this.candleW, s < this.bufferPx * -1 ? (s = 0, this.offsetRange(this.rangeScrollOffset * -1)) : s > 0 && (s = this.bufferPx * -1, this.offsetRange(this.rangeScrollOffset)), this.#k = s, this.emit("scrollUpdate", s);
  }
  offsetRange(e) {
    let i = this.range.indexStart - e, s = this.range.indexEnd - e;
    this.setRange(i, s);
  }
  getRange(e = 0, i = 0, s = {}) {
    this.#A = new Es(e, i, s), this.#D.range = this.#A, this.#D.timeFrameMS = this.#A.interval, this.#D.timeFrame = this.#A.intervalStr;
  }
  setRange(e = 0, i = this.rangeLimit) {
    const s = this.config?.maxCandles ? this.config.maxCandles : this.Chart?.layerWidth ? this.Chart.layerWidth : this.Chart.width;
    this.#A.set(e, i, s), e < 0 && !this.#$ ? this.emit("range_limitPast", { chart: this, start: e, end: i }) : i > this.range.dataLength && !this.#$ && this.emit("range_limitFuture", { chart: this, start: e, end: i });
  }
  jumpToIndex(e, i = !0, s = !0) {
    i && (e = k(e, 0, this.range.dataLength));
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
    this.#$ = !0;
    let n = this.state.mergeData(e, i, s);
    return F(n) && (this.#$ = !1), n;
  }
  isOverlay(e) {
    return _n(e) && N(e.prototype?.draw) && !this.isIndicator(e) && Object.getPrototypeOf(e.prototype).constructor.isOverlay;
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
    if (!w(e))
      return !1;
    const i = {};
    for (const [s, n] of Object.entries(e))
      w(n) && this.isOverlay(n?.class) && Object.keys(this.#I).includes(n?.location) ? (this.#I[n.location][s] = n, i[s] = !0, this.log(`Custom Overlay: ${s} - Registered`)) : (i[s] = !1, this.log(`Custom Overlay: ${s} - Rejected: Not a valid Overlay`));
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
    return s ? (this.log(`Overlay: ${e} - Added to ${i}`), !0) : (this.error(`Overlay: ${e} - Error attempting to add overlay to ${i}`), !1);
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
    if (!C(e) || !C(i))
      return !1;
    const s = this.hasOverlay(e);
    if (!s)
      return !1;
    const n = this.findGraph(i);
    return n ? { overlay: s, graph: n } : !1;
  }
  isIndicator(e) {
    return _n(e) && N(e.prototype?.draw) && "primaryPane" in e.prototype && !!e?.isIndicator;
  }
  setIndicators(e, i = !1) {
    if (!w(e))
      return !1;
    i && (console.warn("Expunging all default indicators!"), this.#B = {});
    const s = {};
    for (const [n, r] of Object.entries(e))
      C(r?.id) && C(r?.name) && C(r?.event) && this.isIndicator(r?.ind) ? (this.#B[n] = r, s[n] = !0, this.log(`Custom Indicator: ${n} - Registered`)) : (s[n] = !1, this.warn(`Custom Indicator: ${n} - Rejected: Not a valid indicator`));
    return s;
  }
  addIndicator(e, i = e, s = {}) {
    return this.#O.addIndicator(e, i, s) || this.error(`Indicator: ${e} - Error failed to add indicator`), e;
  }
  getIndicator(e) {
    return this.#O.getIndicator(e);
  }
  removeIndicator(e) {
    return this.#O.removeIndicator(e) || this.error(`Indicator: ${e} - Error failed to remove indicator`), e;
  }
  indicatorSettings(e, i) {
    return this.#O.indicatorSettings(e, i);
  }
  hasStateIndicator(e, i = "searchAll") {
    if (!C(e) || !C(i))
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
    return !x(e) && !x(i) ? !1 : (this.setDimensions(e, i), !0);
  }
  refresh() {
    this.ready && this.#O.refresh();
  }
  toImageURL(e, i, s, n) {
    return Mr(this, e, i, s, "url", n);
  }
  downloadImage(e = `${this.id}.png`, i, s, n) {
    Mr(this, e, i, s, "download", n);
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
      this.implemented = this.#V.insert("Dialogue", i), this.implemented.start();
    }
  }
}
window.customElements.get("tradex-chart") || (document.head.insertAdjacentHTML("beforeend", lc), document.head.insertAdjacentHTML("beforeend", hc), customElements.get("tradex-chart") || customElements.define("tradex-chart", O));
export {
  O as Chart,
  np as DOM,
  _t as EventHub,
  Se as Indicator,
  U as Overlay,
  Es as Range,
  Vi as StateMachine,
  B as canvas,
  he as copyDeep,
  sp as isPromise,
  ot as mergeDeep,
  op as talibAPI,
  ne as uid
};
