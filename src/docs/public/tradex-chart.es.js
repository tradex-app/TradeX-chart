function Ra(a, i) {
  for (var s = 0; s < i.length; s++) {
    const n = i[s];
    if (typeof n != "string" && !Array.isArray(n)) {
      for (const r in n)
        if (r !== "default" && !(r in a)) {
          const o = Object.getOwnPropertyDescriptor(n, r);
          o && Object.defineProperty(a, r, o.get ? o : {
            enumerable: !0,
            get: () => n[r]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(a, Symbol.toStringTag, { value: "Module" }));
}
const Ht = "TradeX-Chart", Ft = "TX", Da = "tradeXutils", An = "tradeXmenus", ka = "tradeXmenu", On = "tradeXdividers", Nn = "tradeXwindows", _a = "tradeXwindow", In = "tradeXprogress", Ha = 500, $a = "stream_None", xi = "stream_Listening", Rn = "stream_Started", Ua = "stream_Stopped", Ba = "stream_Error", Rs = "stream_candleFirst", et = "stream_candleUpdate", Ds = "stream_candleNew", Va = 250, za = 8, Wa = 2, Fa = 2, Ga = 18, qt = 100, Bt = /^(\d*\.?\d+)\s?(px|em|ex|%|in|cn|mm|pt|pc+)$/igm;
function A(a) {
  return Array.isArray(a);
}
function U(a) {
  return a && typeof a == "function";
}
function S(a) {
  return typeof a == "object" && !Array.isArray(a) && a !== null;
}
function T(a) {
  return typeof a == "number" && !isNaN(a);
}
function Q(a) {
  return typeof a == "boolean";
}
function E(a) {
  return typeof a == "string";
}
function ip(a) {
  return !!a && (S(a) || U(a)) && U(a.then);
}
function Dn(a) {
  return !(a && a.constructor === Function) || a.prototype === void 0 ? !1 : Function.prototype !== Object.getPrototypeOf(a) ? !0 : Object.getOwnPropertyNames(a.prototype).length > 1;
}
const Pr = ["id", "class", "style", "alt", "width", "height", "title"], Mr = [...Pr, "name", "type", "value", "default", "placeholder", "max", "min", "maxlenght", "src", "checked", "disabled", "pattern", "readonly", "required", "size", "step", "multiple", "autofocus", "list", "autocomplete"], Ya = ["button", "color", "date", "datetime-local", "email", "file", "hidden", "image", "month", "number", "password", "radio", "range", "reset", "search", "submit", "tel", "text", "time", "url", "week"];
function qa(a, i = document) {
  return i.getElementById(a);
}
function Xa(a, i = document) {
  return i.getElementsByClassName(a);
}
function ja(a, i = document) {
  return i.getElementsByName(a);
}
function Ka(a, i = document) {
  return i.getElementsByTagName(a);
}
function Lr(a, i = document) {
  return i.querySelector(a);
}
function Ar(a, i = document) {
  return i.querySelectorAll(a);
}
function Za(a) {
  return typeof Node == "object" ? a instanceof Node : a && typeof a == "object" && typeof a.nodeType == "number" && typeof a.nodeName == "string";
}
function J(a) {
  return typeof HTMLElement == "object" ? a instanceof HTMLElement : a && typeof a == "object" && a !== null && a.nodeType === 1 && typeof a.nodeName == "string";
}
function Et(a) {
  return J(a) ? !!a && !!(a.offsetWidth || a.offsetHeight || a.getClientRects().length) : !1;
}
function ks(a) {
  if (!J(a))
    return !1;
  const i = a.getBoundingClientRect();
  return i.top >= 0 && i.left >= 0 && i.bottom <= (window.innerHeight || document.documentElement.clientHeight) && i.right <= (window.innerWidth || document.documentElement.clientWidth);
}
function Qa(a) {
  if (!J(a))
    return !1;
  const i = getComputedStyle(elem);
  if (i.display === "none" || i.visibility !== "visible" || i.opacity < 0.1 || a.offsetWidth + a.offsetHeight + a.getBoundingClientRect().height + a.getBoundingClientRect().width === 0)
    return !1;
  const s = {
    x: a.getBoundingClientRect().left + a.offsetWidth / 2,
    y: a.getBoundingClientRect().top + a.offsetHeight / 2
  };
  if (s.x < 0 || s.x > (document.documentElement.clientWidth || window.innerWidth) || s.y < 0 || s.y > (document.documentElement.clientHeight || window.innerHeight))
    return !1;
  let n = document.elementFromPoint(s.x, s.y);
  do
    if (n === elem)
      return !0;
  while (n = n.parentNode);
  return !1;
}
function _s(a, i) {
  if (Hs(a))
    var s = window.URL || window.webkitURL || window, a = new Blob([a], { type: "image/svg+xml" }), a = s.createObjectURL(a);
  const n = new Image();
  if (n.src = a, U(i))
    n.complete ? i(n) : (n.onload = () => i(n), n.onerror = () => i(!1));
  else
    return new Promise(function(r, o) {
      n.complete ? r(n) : (n.onload = () => r(n), n.onerror = () => o(!1));
    });
}
function Hs(a) {
  return E(a) ? /<\s*svg[^>]*>(.*?)<\s*\/\s*svg>/.test(a) : !1;
}
function Ja(a) {
  return new Promise((i) => {
    if (document.querySelector(a))
      return i(document.querySelector(a));
    const s = new MutationObserver((n) => {
      document.querySelector(a) && (s.disconnect(), i(document.querySelector(a)));
    });
    s.observe(document.body, {
      childList: !0,
      subtree: !0
    });
  });
}
function ce(a) {
  if (!J(a))
    return !1;
  let i = 0, s = 0, n = a;
  for (; n && n.tagName.toLowerCase() != "body" && !isNaN(n.offsetLeft) && !isNaN(n.offsetTop); )
    i += n.offsetLeft - n.scrollLeft, s += n.offsetTop - n.scrollTop, n = n.offsetParent;
  const r = a.getBoundingClientRect();
  let o = r.right - r.left, l = r.bottom - r.top, h = Et(a), c = ks(a);
  return {
    top: s,
    bottom: s + l,
    left: i,
    right: i + o,
    width: o,
    height: l,
    visible: h,
    viewport: c
  };
}
function el(a, i) {
  if (!J(a) || !J(a))
    return !1;
  const s = ce(a), n = ce(i);
  return {
    x: s.top - n.top,
    y: s.left - n.left,
    el1Location: s,
    el2Location: n
  };
}
function Or(a) {
  if (!E(a))
    return !1;
  const i = document.createElement("template");
  return a = a.trim(), i.innerHTML = a, i.content.firstChild;
}
function tl(a) {
  if (!E(a))
    return !1;
  const i = document.createElement("template");
  return i.innerHTML = a, i.content.childNodes;
}
function gt(a, i, s) {
  if (!Hs(a) || !T(s?.w) || !T(s?.h))
    return !1;
  let n = s.w, r = s.h, o = document.createElement("canvas");
  o.width = n, o.height = r;
  let l = Or(a);
  l.style.fill = i, l.setAttribute("width", n), l.setAttribute("height", r), l.xmlns = "http://www.w3.org/2000/svg";
  let h = new XMLSerializer().serializeToString(l), f = "data:image/svg+xml;base64," + btoa(h), x = new Image();
  return x.setAttribute("width", n), x.setAttribute("height", r), x.onload = () => {
    o.getContext("2d").drawImage(x, 0, 0, n, r);
  }, x.src = f, x;
}
function il(a) {
  if (!J(a))
    return !1;
  const i = (n) => {
    !a.contains(n.target) && Et(a) && (a.style.display = "none", s());
  }, s = () => {
    document.removeEventListener("click", i);
  };
  document.addEventListener("click", i);
}
function sl(a, i) {
  if (!J(a))
    return !1;
  const s = (r) => {
    !a.contains(r.target) && Et(a) && (i(), n());
  }, n = () => {
    document.removeEventListener("click", s);
  };
  document.addEventListener("click", s);
}
function nl(a, i) {
  let s, n;
  if (E(a))
    s = document.getElementById(a);
  else if (J(a))
    s = a;
  else
    return !1;
  return E(i) ? ("getComputedStyle" in navigator ? n = document.defaultView.getComputedStyle(s, null).getPropertyValue(i) : s.currentStyle && (n = s.currentStyle[i]), n) : !1;
}
function rl(a, i, s, n) {
  let r = $s(a, i, s, n);
  if (r)
    r.i >= 0 ? r.rules[r.i].style[r.property] = r.value : Ir(r.styleSheet, r.selector, r.rules, r.index);
  else
    return;
}
function ol(a, i, s) {
  let n = $s(a, i, s, "");
  (n.styleSheet.deleteRule || n.styleSheet.removeRule)(n.i);
}
function $s(a, i, s, n) {
  if (!a || !S(a))
    return null;
  if (a.constructor.name == "HTMLStyleElement")
    a = a.sheet;
  else if (a.constructor.name != "CSSStyleSheet")
    return null;
  let r = Nr(i, s, n);
  i = r[0], s = r[1], n = r[2];
  const o = a.cssRules || a.rules;
  for (var l = o.length - 1; l > 0 && o[l].selectorText !== i; --l)
    ;
  return { styleSheet: a, rules: o, selector: i, property: s, value: n, i: l };
}
function Nr(a, i, s) {
  return [
    a = a.toLowerCase().replace(/\s+/g, " "),
    i = i.toLowerCase(),
    s = s.toLowerCase()
  ];
}
function Ir(a, i, s, n) {
  a.insertRule ? a.insertRule(i + "{" + s + "}", n) : a.addRule(i, s, n);
}
function Us(a, i) {
  return !J(a) || !E(i) ? null : a.classList.contains(i) ? a : Us(a.parentElement, i);
}
function al(a, i) {
  let s = E(i?.label) ? i?.label : "", n = `<label for="${s}">${s}</label><input id="${s}" `;
  for (let r in i)
    (Mr.includes(r) || /^(data-[^\t\n\f \/>"'=]+)/g.test(r)) && (n += `${r}="${i[r]}" `);
  return n += `>
`;
}
const mi = {
  addCSSRule: Ir,
  addStyleRule: rl,
  deleteStyleRule: ol,
  elementDimPos: ce,
  elementsDistance: el,
  findByClass: Xa,
  findByID: qa,
  findByName: ja,
  findBySelector: Lr,
  findBySelectorAll: Ar,
  findStyleRule: $s,
  findTargetParentWithClass: Us,
  fndByTag: Ka,
  getStyle: nl,
  hideOnClickOutside: il,
  htmlAttr: Pr,
  htmlInput: al,
  htmlToElement: Or,
  htmlToElements: tl,
  inputAttr: Mr,
  inputTypes: Ya,
  isElement: J,
  isImage: _s,
  isInViewport: ks,
  isNode: Za,
  isSVG: Hs,
  isVisible: Et,
  isVisibleToUser: Qa,
  onClickOutside: sl,
  styleRuleSanitize: Nr,
  svgToImage: gt,
  waitForElm: Ja
}, ll = typeof window < "u" && typeof window.document < "u";
typeof process < "u" && process.versions != null && process.versions.node != null;
typeof window < "u" && window.name === "nodejs" || navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom");
const hl = ((a) => "onorientationchange" in a || a.matchMedia("(any-pointer:coarse)").matches || !!navigator.maxTouchPoints || !!navigator.msMaxTouchPoints || "ontouchstart" in a || a.DocumentTouch && document instanceof a.DocumentTouch)(typeof window < "u" ? window : {}), cl = {
  idle: 0,
  dragStart: 1,
  dragging: 2
};
class ot {
  #e = 0;
  #t = 0;
  constructor() {
    if (arguments.length === 1) {
      const { x: i, y: s } = arguments[0];
      this.x = i || 0, this.y = s || 0;
    } else if (arguments.length > 1) {
      const [i, s] = arguments;
      this.x = i || 0, this.y = s || 0;
    }
  }
  set x(i) {
    T(i) && (this.#e = i);
  }
  get x() {
    return this.#e;
  }
  set y(i) {
    T(i) && (this.#t = i);
  }
  get y() {
    return this.#t;
  }
  clone() {
    return new ot(this.x, this.y);
  }
}
function ul(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var Rr = { exports: {} };
/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
(function(a) {
  (function(i, s, n, r) {
    var o = ["", "webkit", "Moz", "MS", "ms", "o"], l = s.createElement("div"), h = "function", c = Math.round, p = Math.abs, f = Date.now;
    function x(u, m, g) {
      return setTimeout(k(u, g), m);
    }
    function P(u, m, g) {
      return Array.isArray(u) ? (L(u, g[m], g), !0) : !1;
    }
    function L(u, m, g) {
      var v;
      if (u)
        if (u.forEach)
          u.forEach(m, g);
        else if (u.length !== r)
          for (v = 0; v < u.length; )
            m.call(g, u[v], v, u), v++;
        else
          for (v in u)
            u.hasOwnProperty(v) && m.call(g, u[v], v, u);
    }
    function O(u, m, g) {
      var v = "DEPRECATED METHOD: " + m + `
` + g + ` AT 
`;
      return function() {
        var b = new Error("get-stack-trace"), M = b && b.stack ? b.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace", I = i.console && (i.console.warn || i.console.log);
        return I && I.call(i.console, v, M), u.apply(this, arguments);
      };
    }
    var D;
    typeof Object.assign != "function" ? D = function(m) {
      if (m === r || m === null)
        throw new TypeError("Cannot convert undefined or null to object");
      for (var g = Object(m), v = 1; v < arguments.length; v++) {
        var b = arguments[v];
        if (b !== r && b !== null)
          for (var M in b)
            b.hasOwnProperty(M) && (g[M] = b[M]);
      }
      return g;
    } : D = Object.assign;
    var re = O(function(m, g, v) {
      for (var b = Object.keys(g), M = 0; M < b.length; )
        (!v || v && m[b[M]] === r) && (m[b[M]] = g[b[M]]), M++;
      return m;
    }, "extend", "Use `assign`."), fe = O(function(m, g) {
      return re(m, g, !0);
    }, "merge", "Use `assign`.");
    function $(u, m, g) {
      var v = m.prototype, b;
      b = u.prototype = Object.create(v), b.constructor = u, b._super = v, g && D(b, g);
    }
    function k(u, m) {
      return function() {
        return u.apply(m, arguments);
      };
    }
    function N(u, m) {
      return typeof u == h ? u.apply(m && m[0] || r, m) : u;
    }
    function oe(u, m) {
      return u === r ? m : u;
    }
    function K(u, m, g) {
      L(ut(m), function(v) {
        u.addEventListener(v, g, !1);
      });
    }
    function ae(u, m, g) {
      L(ut(m), function(v) {
        u.removeEventListener(v, g, !1);
      });
    }
    function ye(u, m) {
      for (; u; ) {
        if (u == m)
          return !0;
        u = u.parentNode;
      }
      return !1;
    }
    function ve(u, m) {
      return u.indexOf(m) > -1;
    }
    function ut(u) {
      return u.trim().split(/\s+/g);
    }
    function je(u, m, g) {
      if (u.indexOf && !g)
        return u.indexOf(m);
      for (var v = 0; v < u.length; ) {
        if (g && u[v][g] == m || !g && u[v] === m)
          return v;
        v++;
      }
      return -1;
    }
    function ti(u) {
      return Array.prototype.slice.call(u, 0);
    }
    function an(u, m, g) {
      for (var v = [], b = [], M = 0; M < u.length; ) {
        var I = m ? u[M][m] : u[M];
        je(b, I) < 0 && v.push(u[M]), b[M] = I, M++;
      }
      return g && (m ? v = v.sort(function(Z, se) {
        return Z[m] > se[m];
      }) : v = v.sort()), v;
    }
    function ii(u, m) {
      for (var g, v, b = m[0].toUpperCase() + m.slice(1), M = 0; M < o.length; ) {
        if (g = o[M], v = g ? g + b : m, v in u)
          return v;
        M++;
      }
      return r;
    }
    var Qo = 1;
    function Jo() {
      return Qo++;
    }
    function ln(u) {
      var m = u.ownerDocument || u;
      return m.defaultView || m.parentWindow || i;
    }
    var ea = /mobile|tablet|ip(ad|hone|od)|android/i, hn = "ontouchstart" in i, ta = ii(i, "PointerEvent") !== r, ia = hn && ea.test(navigator.userAgent), At = "touch", sa = "pen", Gi = "mouse", na = "kinect", ra = 25, ie = 1, tt = 2, G = 4, le = 8, si = 1, Ot = 2, Nt = 4, It = 8, Rt = 16, He = Ot | Nt, it = It | Rt, cn = He | it, un = ["x", "y"], ni = ["clientX", "clientY"];
    function we(u, m) {
      var g = this;
      this.manager = u, this.callback = m, this.element = u.element, this.target = u.options.inputTarget, this.domHandler = function(v) {
        N(u.options.enable, [u]) && g.handler(v);
      }, this.init();
    }
    we.prototype = {
      handler: function() {
      },
      init: function() {
        this.evEl && K(this.element, this.evEl, this.domHandler), this.evTarget && K(this.target, this.evTarget, this.domHandler), this.evWin && K(ln(this.element), this.evWin, this.domHandler);
      },
      destroy: function() {
        this.evEl && ae(this.element, this.evEl, this.domHandler), this.evTarget && ae(this.target, this.evTarget, this.domHandler), this.evWin && ae(ln(this.element), this.evWin, this.domHandler);
      }
    };
    function oa(u) {
      var m, g = u.options.inputClass;
      return g ? m = g : ta ? m = qi : ia ? m = ai : hn ? m = Xi : m = oi, new m(u, aa);
    }
    function aa(u, m, g) {
      var v = g.pointers.length, b = g.changedPointers.length, M = m & ie && v - b === 0, I = m & (G | le) && v - b === 0;
      g.isFirst = !!M, g.isFinal = !!I, M && (u.session = {}), g.eventType = m, la(u, g), u.emit("hammer.input", g), u.recognize(g), u.session.prevInput = g;
    }
    function la(u, m) {
      var g = u.session, v = m.pointers, b = v.length;
      g.firstInput || (g.firstInput = dn(m)), b > 1 && !g.firstMultiple ? g.firstMultiple = dn(m) : b === 1 && (g.firstMultiple = !1);
      var M = g.firstInput, I = g.firstMultiple, j = I ? I.center : M.center, Z = m.center = mn(v);
      m.timeStamp = f(), m.deltaTime = m.timeStamp - M.timeStamp, m.angle = Yi(j, Z), m.distance = ri(j, Z), ha(g, m), m.offsetDirection = gn(m.deltaX, m.deltaY);
      var se = pn(m.deltaTime, m.deltaX, m.deltaY);
      m.overallVelocityX = se.x, m.overallVelocityY = se.y, m.overallVelocity = p(se.x) > p(se.y) ? se.x : se.y, m.scale = I ? da(I.pointers, v) : 1, m.rotation = I ? ua(I.pointers, v) : 0, m.maxPointers = g.prevInput ? m.pointers.length > g.prevInput.maxPointers ? m.pointers.length : g.prevInput.maxPointers : m.pointers.length, ca(g, m);
      var Ue = u.element;
      ye(m.srcEvent.target, Ue) && (Ue = m.srcEvent.target), m.target = Ue;
    }
    function ha(u, m) {
      var g = m.center, v = u.offsetDelta || {}, b = u.prevDelta || {}, M = u.prevInput || {};
      (m.eventType === ie || M.eventType === G) && (b = u.prevDelta = {
        x: M.deltaX || 0,
        y: M.deltaY || 0
      }, v = u.offsetDelta = {
        x: g.x,
        y: g.y
      }), m.deltaX = b.x + (g.x - v.x), m.deltaY = b.y + (g.y - v.y);
    }
    function ca(u, m) {
      var g = u.lastInterval || m, v = m.timeStamp - g.timeStamp, b, M, I, j;
      if (m.eventType != le && (v > ra || g.velocity === r)) {
        var Z = m.deltaX - g.deltaX, se = m.deltaY - g.deltaY, Ue = pn(v, Z, se);
        M = Ue.x, I = Ue.y, b = p(Ue.x) > p(Ue.y) ? Ue.x : Ue.y, j = gn(Z, se), u.lastInterval = m;
      } else
        b = g.velocity, M = g.velocityX, I = g.velocityY, j = g.direction;
      m.velocity = b, m.velocityX = M, m.velocityY = I, m.direction = j;
    }
    function dn(u) {
      for (var m = [], g = 0; g < u.pointers.length; )
        m[g] = {
          clientX: c(u.pointers[g].clientX),
          clientY: c(u.pointers[g].clientY)
        }, g++;
      return {
        timeStamp: f(),
        pointers: m,
        center: mn(m),
        deltaX: u.deltaX,
        deltaY: u.deltaY
      };
    }
    function mn(u) {
      var m = u.length;
      if (m === 1)
        return {
          x: c(u[0].clientX),
          y: c(u[0].clientY)
        };
      for (var g = 0, v = 0, b = 0; b < m; )
        g += u[b].clientX, v += u[b].clientY, b++;
      return {
        x: c(g / m),
        y: c(v / m)
      };
    }
    function pn(u, m, g) {
      return {
        x: m / u || 0,
        y: g / u || 0
      };
    }
    function gn(u, m) {
      return u === m ? si : p(u) >= p(m) ? u < 0 ? Ot : Nt : m < 0 ? It : Rt;
    }
    function ri(u, m, g) {
      g || (g = un);
      var v = m[g[0]] - u[g[0]], b = m[g[1]] - u[g[1]];
      return Math.sqrt(v * v + b * b);
    }
    function Yi(u, m, g) {
      g || (g = un);
      var v = m[g[0]] - u[g[0]], b = m[g[1]] - u[g[1]];
      return Math.atan2(b, v) * 180 / Math.PI;
    }
    function ua(u, m) {
      return Yi(m[1], m[0], ni) + Yi(u[1], u[0], ni);
    }
    function da(u, m) {
      return ri(m[0], m[1], ni) / ri(u[0], u[1], ni);
    }
    var ma = {
      mousedown: ie,
      mousemove: tt,
      mouseup: G
    }, pa = "mousedown", ga = "mousemove mouseup";
    function oi() {
      this.evEl = pa, this.evWin = ga, this.pressed = !1, we.apply(this, arguments);
    }
    $(oi, we, {
      handler: function(m) {
        var g = ma[m.type];
        g & ie && m.button === 0 && (this.pressed = !0), g & tt && m.which !== 1 && (g = G), this.pressed && (g & G && (this.pressed = !1), this.callback(this.manager, g, {
          pointers: [m],
          changedPointers: [m],
          pointerType: Gi,
          srcEvent: m
        }));
      }
    });
    var fa = {
      pointerdown: ie,
      pointermove: tt,
      pointerup: G,
      pointercancel: le,
      pointerout: le
    }, ya = {
      2: At,
      3: sa,
      4: Gi,
      5: na
    }, fn = "pointerdown", yn = "pointermove pointerup pointercancel";
    i.MSPointerEvent && !i.PointerEvent && (fn = "MSPointerDown", yn = "MSPointerMove MSPointerUp MSPointerCancel");
    function qi() {
      this.evEl = fn, this.evWin = yn, we.apply(this, arguments), this.store = this.manager.session.pointerEvents = [];
    }
    $(qi, we, {
      handler: function(m) {
        var g = this.store, v = !1, b = m.type.toLowerCase().replace("ms", ""), M = fa[b], I = ya[m.pointerType] || m.pointerType, j = I == At, Z = je(g, m.pointerId, "pointerId");
        M & ie && (m.button === 0 || j) ? Z < 0 && (g.push(m), Z = g.length - 1) : M & (G | le) && (v = !0), !(Z < 0) && (g[Z] = m, this.callback(this.manager, M, {
          pointers: g,
          changedPointers: [m],
          pointerType: I,
          srcEvent: m
        }), v && g.splice(Z, 1));
      }
    });
    var va = {
      touchstart: ie,
      touchmove: tt,
      touchend: G,
      touchcancel: le
    }, wa = "touchstart", xa = "touchstart touchmove touchend touchcancel";
    function vn() {
      this.evTarget = wa, this.evWin = xa, this.started = !1, we.apply(this, arguments);
    }
    $(vn, we, {
      handler: function(m) {
        var g = va[m.type];
        if (g === ie && (this.started = !0), !!this.started) {
          var v = ba.call(this, m, g);
          g & (G | le) && v[0].length - v[1].length === 0 && (this.started = !1), this.callback(this.manager, g, {
            pointers: v[0],
            changedPointers: v[1],
            pointerType: At,
            srcEvent: m
          });
        }
      }
    });
    function ba(u, m) {
      var g = ti(u.touches), v = ti(u.changedTouches);
      return m & (G | le) && (g = an(g.concat(v), "identifier", !0)), [g, v];
    }
    var Ca = {
      touchstart: ie,
      touchmove: tt,
      touchend: G,
      touchcancel: le
    }, Ta = "touchstart touchmove touchend touchcancel";
    function ai() {
      this.evTarget = Ta, this.targetIds = {}, we.apply(this, arguments);
    }
    $(ai, we, {
      handler: function(m) {
        var g = Ca[m.type], v = Sa.call(this, m, g);
        v && this.callback(this.manager, g, {
          pointers: v[0],
          changedPointers: v[1],
          pointerType: At,
          srcEvent: m
        });
      }
    });
    function Sa(u, m) {
      var g = ti(u.touches), v = this.targetIds;
      if (m & (ie | tt) && g.length === 1)
        return v[g[0].identifier] = !0, [g, g];
      var b, M, I = ti(u.changedTouches), j = [], Z = this.target;
      if (M = g.filter(function(se) {
        return ye(se.target, Z);
      }), m === ie)
        for (b = 0; b < M.length; )
          v[M[b].identifier] = !0, b++;
      for (b = 0; b < I.length; )
        v[I[b].identifier] && j.push(I[b]), m & (G | le) && delete v[I[b].identifier], b++;
      if (j.length)
        return [
          an(M.concat(j), "identifier", !0),
          j
        ];
    }
    var Ea = 2500, wn = 25;
    function Xi() {
      we.apply(this, arguments);
      var u = k(this.handler, this);
      this.touch = new ai(this.manager, u), this.mouse = new oi(this.manager, u), this.primaryTouch = null, this.lastTouches = [];
    }
    $(Xi, we, {
      handler: function(m, g, v) {
        var b = v.pointerType == At, M = v.pointerType == Gi;
        if (!(M && v.sourceCapabilities && v.sourceCapabilities.firesTouchEvents)) {
          if (b)
            Pa.call(this, g, v);
          else if (M && Ma.call(this, v))
            return;
          this.callback(m, g, v);
        }
      },
      destroy: function() {
        this.touch.destroy(), this.mouse.destroy();
      }
    });
    function Pa(u, m) {
      u & ie ? (this.primaryTouch = m.changedPointers[0].identifier, xn.call(this, m)) : u & (G | le) && xn.call(this, m);
    }
    function xn(u) {
      var m = u.changedPointers[0];
      if (m.identifier === this.primaryTouch) {
        var g = { x: m.clientX, y: m.clientY };
        this.lastTouches.push(g);
        var v = this.lastTouches, b = function() {
          var M = v.indexOf(g);
          M > -1 && v.splice(M, 1);
        };
        setTimeout(b, Ea);
      }
    }
    function Ma(u) {
      for (var m = u.srcEvent.clientX, g = u.srcEvent.clientY, v = 0; v < this.lastTouches.length; v++) {
        var b = this.lastTouches[v], M = Math.abs(m - b.x), I = Math.abs(g - b.y);
        if (M <= wn && I <= wn)
          return !0;
      }
      return !1;
    }
    var bn = ii(l.style, "touchAction"), Cn = bn !== r, Tn = "compute", Sn = "auto", ji = "manipulation", st = "none", Dt = "pan-x", kt = "pan-y", li = Aa();
    function Ki(u, m) {
      this.manager = u, this.set(m);
    }
    Ki.prototype = {
      set: function(u) {
        u == Tn && (u = this.compute()), Cn && this.manager.element.style && li[u] && (this.manager.element.style[bn] = u), this.actions = u.toLowerCase().trim();
      },
      update: function() {
        this.set(this.manager.options.touchAction);
      },
      compute: function() {
        var u = [];
        return L(this.manager.recognizers, function(m) {
          N(m.options.enable, [m]) && (u = u.concat(m.getTouchAction()));
        }), La(u.join(" "));
      },
      preventDefaults: function(u) {
        var m = u.srcEvent, g = u.offsetDirection;
        if (this.manager.session.prevented) {
          m.preventDefault();
          return;
        }
        var v = this.actions, b = ve(v, st) && !li[st], M = ve(v, kt) && !li[kt], I = ve(v, Dt) && !li[Dt];
        if (b) {
          var j = u.pointers.length === 1, Z = u.distance < 2, se = u.deltaTime < 250;
          if (j && Z && se)
            return;
        }
        if (!(I && M) && (b || M && g & He || I && g & it))
          return this.preventSrc(m);
      },
      preventSrc: function(u) {
        this.manager.session.prevented = !0, u.preventDefault();
      }
    };
    function La(u) {
      if (ve(u, st))
        return st;
      var m = ve(u, Dt), g = ve(u, kt);
      return m && g ? st : m || g ? m ? Dt : kt : ve(u, ji) ? ji : Sn;
    }
    function Aa() {
      if (!Cn)
        return !1;
      var u = {}, m = i.CSS && i.CSS.supports;
      return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function(g) {
        u[g] = m ? i.CSS.supports("touch-action", g) : !0;
      }), u;
    }
    var hi = 1, xe = 2, dt = 4, Ke = 8, ze = Ke, _t = 16, $e = 32;
    function We(u) {
      this.options = D({}, this.defaults, u || {}), this.id = Jo(), this.manager = null, this.options.enable = oe(this.options.enable, !0), this.state = hi, this.simultaneous = {}, this.requireFail = [];
    }
    We.prototype = {
      defaults: {},
      set: function(u) {
        return D(this.options, u), this.manager && this.manager.touchAction.update(), this;
      },
      recognizeWith: function(u) {
        if (P(u, "recognizeWith", this))
          return this;
        var m = this.simultaneous;
        return u = ci(u, this), m[u.id] || (m[u.id] = u, u.recognizeWith(this)), this;
      },
      dropRecognizeWith: function(u) {
        return P(u, "dropRecognizeWith", this) ? this : (u = ci(u, this), delete this.simultaneous[u.id], this);
      },
      requireFailure: function(u) {
        if (P(u, "requireFailure", this))
          return this;
        var m = this.requireFail;
        return u = ci(u, this), je(m, u) === -1 && (m.push(u), u.requireFailure(this)), this;
      },
      dropRequireFailure: function(u) {
        if (P(u, "dropRequireFailure", this))
          return this;
        u = ci(u, this);
        var m = je(this.requireFail, u);
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
        function v(b) {
          m.manager.emit(b, u);
        }
        g < Ke && v(m.options.event + En(g)), v(m.options.event), u.additionalEvent && v(u.additionalEvent), g >= Ke && v(m.options.event + En(g));
      },
      tryEmit: function(u) {
        if (this.canEmit())
          return this.emit(u);
        this.state = $e;
      },
      canEmit: function() {
        for (var u = 0; u < this.requireFail.length; ) {
          if (!(this.requireFail[u].state & ($e | hi)))
            return !1;
          u++;
        }
        return !0;
      },
      recognize: function(u) {
        var m = D({}, u);
        if (!N(this.options.enable, [this, m])) {
          this.reset(), this.state = $e;
          return;
        }
        this.state & (ze | _t | $e) && (this.state = hi), this.state = this.process(m), this.state & (xe | dt | Ke | _t) && this.tryEmit(m);
      },
      process: function(u) {
      },
      getTouchAction: function() {
      },
      reset: function() {
      }
    };
    function En(u) {
      return u & _t ? "cancel" : u & Ke ? "end" : u & dt ? "move" : u & xe ? "start" : "";
    }
    function Pn(u) {
      return u == Rt ? "down" : u == It ? "up" : u == Ot ? "left" : u == Nt ? "right" : "";
    }
    function ci(u, m) {
      var g = m.manager;
      return g ? g.get(u) : u;
    }
    function Ae() {
      We.apply(this, arguments);
    }
    $(Ae, We, {
      defaults: {
        pointers: 1
      },
      attrTest: function(u) {
        var m = this.options.pointers;
        return m === 0 || u.pointers.length === m;
      },
      process: function(u) {
        var m = this.state, g = u.eventType, v = m & (xe | dt), b = this.attrTest(u);
        return v && (g & le || !b) ? m | _t : v || b ? g & G ? m | Ke : m & xe ? m | dt : xe : $e;
      }
    });
    function ui() {
      Ae.apply(this, arguments), this.pX = null, this.pY = null;
    }
    $(ui, Ae, {
      defaults: {
        event: "pan",
        threshold: 10,
        pointers: 1,
        direction: cn
      },
      getTouchAction: function() {
        var u = this.options.direction, m = [];
        return u & He && m.push(kt), u & it && m.push(Dt), m;
      },
      directionTest: function(u) {
        var m = this.options, g = !0, v = u.distance, b = u.direction, M = u.deltaX, I = u.deltaY;
        return b & m.direction || (m.direction & He ? (b = M === 0 ? si : M < 0 ? Ot : Nt, g = M != this.pX, v = Math.abs(u.deltaX)) : (b = I === 0 ? si : I < 0 ? It : Rt, g = I != this.pY, v = Math.abs(u.deltaY))), u.direction = b, g && v > m.threshold && b & m.direction;
      },
      attrTest: function(u) {
        return Ae.prototype.attrTest.call(this, u) && (this.state & xe || !(this.state & xe) && this.directionTest(u));
      },
      emit: function(u) {
        this.pX = u.deltaX, this.pY = u.deltaY;
        var m = Pn(u.direction);
        m && (u.additionalEvent = this.options.event + m), this._super.emit.call(this, u);
      }
    });
    function Zi() {
      Ae.apply(this, arguments);
    }
    $(Zi, Ae, {
      defaults: {
        event: "pinch",
        threshold: 0,
        pointers: 2
      },
      getTouchAction: function() {
        return [st];
      },
      attrTest: function(u) {
        return this._super.attrTest.call(this, u) && (Math.abs(u.scale - 1) > this.options.threshold || this.state & xe);
      },
      emit: function(u) {
        if (u.scale !== 1) {
          var m = u.scale < 1 ? "in" : "out";
          u.additionalEvent = this.options.event + m;
        }
        this._super.emit.call(this, u);
      }
    });
    function Qi() {
      We.apply(this, arguments), this._timer = null, this._input = null;
    }
    $(Qi, We, {
      defaults: {
        event: "press",
        pointers: 1,
        time: 251,
        threshold: 9
      },
      getTouchAction: function() {
        return [Sn];
      },
      process: function(u) {
        var m = this.options, g = u.pointers.length === m.pointers, v = u.distance < m.threshold, b = u.deltaTime > m.time;
        if (this._input = u, !v || !g || u.eventType & (G | le) && !b)
          this.reset();
        else if (u.eventType & ie)
          this.reset(), this._timer = x(function() {
            this.state = ze, this.tryEmit();
          }, m.time, this);
        else if (u.eventType & G)
          return ze;
        return $e;
      },
      reset: function() {
        clearTimeout(this._timer);
      },
      emit: function(u) {
        this.state === ze && (u && u.eventType & G ? this.manager.emit(this.options.event + "up", u) : (this._input.timeStamp = f(), this.manager.emit(this.options.event, this._input)));
      }
    });
    function Ji() {
      Ae.apply(this, arguments);
    }
    $(Ji, Ae, {
      defaults: {
        event: "rotate",
        threshold: 0,
        pointers: 2
      },
      getTouchAction: function() {
        return [st];
      },
      attrTest: function(u) {
        return this._super.attrTest.call(this, u) && (Math.abs(u.rotation) > this.options.threshold || this.state & xe);
      }
    });
    function es() {
      Ae.apply(this, arguments);
    }
    $(es, Ae, {
      defaults: {
        event: "swipe",
        threshold: 10,
        velocity: 0.3,
        direction: He | it,
        pointers: 1
      },
      getTouchAction: function() {
        return ui.prototype.getTouchAction.call(this);
      },
      attrTest: function(u) {
        var m = this.options.direction, g;
        return m & (He | it) ? g = u.overallVelocity : m & He ? g = u.overallVelocityX : m & it && (g = u.overallVelocityY), this._super.attrTest.call(this, u) && m & u.offsetDirection && u.distance > this.options.threshold && u.maxPointers == this.options.pointers && p(g) > this.options.velocity && u.eventType & G;
      },
      emit: function(u) {
        var m = Pn(u.offsetDirection);
        m && this.manager.emit(this.options.event + m, u), this.manager.emit(this.options.event, u);
      }
    });
    function di() {
      We.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0;
    }
    $(di, We, {
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
        return [ji];
      },
      process: function(u) {
        var m = this.options, g = u.pointers.length === m.pointers, v = u.distance < m.threshold, b = u.deltaTime < m.time;
        if (this.reset(), u.eventType & ie && this.count === 0)
          return this.failTimeout();
        if (v && b && g) {
          if (u.eventType != G)
            return this.failTimeout();
          var M = this.pTime ? u.timeStamp - this.pTime < m.interval : !0, I = !this.pCenter || ri(this.pCenter, u.center) < m.posThreshold;
          this.pTime = u.timeStamp, this.pCenter = u.center, !I || !M ? this.count = 1 : this.count += 1, this._input = u;
          var j = this.count % m.taps;
          if (j === 0)
            return this.hasRequireFailures() ? (this._timer = x(function() {
              this.state = ze, this.tryEmit();
            }, m.interval, this), xe) : ze;
        }
        return $e;
      },
      failTimeout: function() {
        return this._timer = x(function() {
          this.state = $e;
        }, this.options.interval, this), $e;
      },
      reset: function() {
        clearTimeout(this._timer);
      },
      emit: function() {
        this.state == ze && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input));
      }
    });
    function Fe(u, m) {
      return m = m || {}, m.recognizers = oe(m.recognizers, Fe.defaults.preset), new ts(u, m);
    }
    Fe.VERSION = "2.0.7", Fe.defaults = {
      domEvents: !1,
      touchAction: Tn,
      enable: !0,
      inputTarget: null,
      inputClass: null,
      preset: [
        [Ji, { enable: !1 }],
        [Zi, { enable: !1 }, ["rotate"]],
        [es, { direction: He }],
        [ui, { direction: He }, ["swipe"]],
        [di],
        [di, { event: "doubletap", taps: 2 }, ["tap"]],
        [Qi]
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
    var Oa = 1, Mn = 2;
    function ts(u, m) {
      this.options = D({}, Fe.defaults, m || {}), this.options.inputTarget = this.options.inputTarget || u, this.handlers = {}, this.session = {}, this.recognizers = [], this.oldCssProps = {}, this.element = u, this.input = oa(this), this.touchAction = new Ki(this, this.options.touchAction), Ln(this, !0), L(this.options.recognizers, function(g) {
        var v = this.add(new g[0](g[1]));
        g[2] && v.recognizeWith(g[2]), g[3] && v.requireFailure(g[3]);
      }, this);
    }
    ts.prototype = {
      set: function(u) {
        return D(this.options, u), u.touchAction && this.touchAction.update(), u.inputTarget && (this.input.destroy(), this.input.target = u.inputTarget, this.input.init()), this;
      },
      stop: function(u) {
        this.session.stopped = u ? Mn : Oa;
      },
      recognize: function(u) {
        var m = this.session;
        if (!m.stopped) {
          this.touchAction.preventDefaults(u);
          var g, v = this.recognizers, b = m.curRecognizer;
          (!b || b && b.state & ze) && (b = m.curRecognizer = null);
          for (var M = 0; M < v.length; )
            g = v[M], m.stopped !== Mn && (!b || g == b || g.canRecognizeWith(b)) ? g.recognize(u) : g.reset(), !b && g.state & (xe | dt | Ke) && (b = m.curRecognizer = g), M++;
        }
      },
      get: function(u) {
        if (u instanceof We)
          return u;
        for (var m = this.recognizers, g = 0; g < m.length; g++)
          if (m[g].options.event == u)
            return m[g];
        return null;
      },
      add: function(u) {
        if (P(u, "add", this))
          return this;
        var m = this.get(u.options.event);
        return m && this.remove(m), this.recognizers.push(u), u.manager = this, this.touchAction.update(), u;
      },
      remove: function(u) {
        if (P(u, "remove", this))
          return this;
        if (u = this.get(u), u) {
          var m = this.recognizers, g = je(m, u);
          g !== -1 && (m.splice(g, 1), this.touchAction.update());
        }
        return this;
      },
      on: function(u, m) {
        if (u !== r && m !== r) {
          var g = this.handlers;
          return L(ut(u), function(v) {
            g[v] = g[v] || [], g[v].push(m);
          }), this;
        }
      },
      off: function(u, m) {
        if (u !== r) {
          var g = this.handlers;
          return L(ut(u), function(v) {
            m ? g[v] && g[v].splice(je(g[v], m), 1) : delete g[v];
          }), this;
        }
      },
      emit: function(u, m) {
        this.options.domEvents && Na(u, m);
        var g = this.handlers[u] && this.handlers[u].slice();
        if (!(!g || !g.length)) {
          m.type = u, m.preventDefault = function() {
            m.srcEvent.preventDefault();
          };
          for (var v = 0; v < g.length; )
            g[v](m), v++;
        }
      },
      destroy: function() {
        this.element && Ln(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null;
      }
    };
    function Ln(u, m) {
      var g = u.element;
      if (g.style) {
        var v;
        L(u.options.cssProps, function(b, M) {
          v = ii(g.style, M), m ? (u.oldCssProps[v] = g.style[v], g.style[v] = b) : g.style[v] = u.oldCssProps[v] || "";
        }), m || (u.oldCssProps = {});
      }
    }
    function Na(u, m) {
      var g = s.createEvent("Event");
      g.initEvent(u, !0, !0), g.gesture = m, m.target.dispatchEvent(g);
    }
    D(Fe, {
      INPUT_START: ie,
      INPUT_MOVE: tt,
      INPUT_END: G,
      INPUT_CANCEL: le,
      STATE_POSSIBLE: hi,
      STATE_BEGAN: xe,
      STATE_CHANGED: dt,
      STATE_ENDED: Ke,
      STATE_RECOGNIZED: ze,
      STATE_CANCELLED: _t,
      STATE_FAILED: $e,
      DIRECTION_NONE: si,
      DIRECTION_LEFT: Ot,
      DIRECTION_RIGHT: Nt,
      DIRECTION_UP: It,
      DIRECTION_DOWN: Rt,
      DIRECTION_HORIZONTAL: He,
      DIRECTION_VERTICAL: it,
      DIRECTION_ALL: cn,
      Manager: ts,
      Input: we,
      TouchAction: Ki,
      TouchInput: ai,
      MouseInput: oi,
      PointerEventInput: qi,
      TouchMouseInput: Xi,
      SingleTouchInput: vn,
      Recognizer: We,
      AttrRecognizer: Ae,
      Tap: di,
      Pan: ui,
      Swipe: es,
      Pinch: Zi,
      Rotate: Ji,
      Press: Qi,
      on: K,
      off: ae,
      each: L,
      merge: fe,
      extend: re,
      assign: D,
      inherit: $,
      bindFn: k,
      prefixed: ii
    });
    var Ia = typeof i < "u" ? i : typeof self < "u" ? self : {};
    Ia.Hammer = Fe, typeof r == "function" && r.amd ? r(function() {
      return Fe;
    }) : a.exports ? a.exports = Fe : i[n] = Fe;
  })(window, document, "Hammer");
})(Rr);
var Jt = Rr.exports;
const dl = ul(Jt), Be = /* @__PURE__ */ Ra({
  __proto__: null,
  default: dl
}, [Jt]), Dr = 1, kr = 2, ps = 4, ml = {
  mousedown: Dr,
  mousemove: kr,
  mouseup: ps
};
function pl(a, i) {
  for (let s = 0; s < a.length; s++)
    if (i(a[s]))
      return !0;
  return !1;
}
function gl(a) {
  const i = a.prototype.handler;
  a.prototype.handler = function(n) {
    const r = this.store;
    n.button > 0 && n.type === "pointerdown" && (pl(r, (o) => o.pointerId === n.pointerId) || r.push(n)), i.call(this, n);
  };
}
function fl(a) {
  a.prototype.handler = function(s) {
    let n = ml[s.type];
    n & Dr && s.button >= 0 && (this.pressed = !0), n & kr && s.which === 0 && (n = ps), this.pressed && (n & ps && (this.pressed = !1), this.callback(this.manager, n, {
      pointers: [s],
      changedPointers: [s],
      pointerType: "mouse",
      srcEvent: s
    }));
  };
}
gl(Jt.PointerEventInput);
fl(Jt.MouseInput);
const yl = Jt.Manager;
let $i = class {
  constructor(i, s, n) {
    this.element = i, this.callback = s, this.options = { enable: !0, ...n };
  }
};
const vl = Be ? [
  [Be.Pan, { event: "tripan", pointers: 3, threshold: 0, enable: !1 }],
  [Be.Rotate, { enable: !1 }],
  [Be.Pinch, { enable: !1 }],
  [Be.Swipe, { enable: !1 }],
  [Be.Pan, { threshold: 0, enable: !1 }],
  [Be.Press, { enable: !1 }],
  [Be.Tap, { event: "doubletap", taps: 2, enable: !1 }],
  [Be.Tap, { event: "anytap", enable: !1 }],
  [Be.Tap, { enable: !1 }]
] : null, kn = {
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
}, Bs = {
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
}, _n = {
  click: "tap",
  anyclick: "anytap",
  dblclick: "doubletap",
  mousedown: "pointerdown",
  mousemove: "pointermove",
  mouseup: "pointerup",
  mouseover: "pointerover",
  mouseout: "pointerout",
  mouseleave: "pointerleave"
}, Cl = typeof navigator < "u" && navigator.userAgent ? navigator.userAgent.toLowerCase() : "", pt = typeof window < "u" ? window : global;
let gs = !1;
try {
  const a = {
    get passive() {
      return gs = !0, !0;
    }
  };
  pt.addEventListener("test", null, a), pt.removeEventListener("test", null);
} catch {
  gs = !1;
}
const Tl = Cl.indexOf("firefox") !== -1, { WHEEL_EVENTS: Sl } = Bs, Hn = "wheel", $n = 4.000244140625, El = 40, Pl = 0.25;
class Ml extends $i {
  constructor(i, s, n) {
    super(i, s, n), this.handleEvent = (r) => {
      if (!this.options.enable)
        return;
      let o = r.deltaY;
      pt.WheelEvent && (Tl && r.deltaMode === pt.WheelEvent.DOM_DELTA_PIXEL && (o /= pt.devicePixelRatio), r.deltaMode === pt.WheelEvent.DOM_DELTA_LINE && (o *= El)), o !== 0 && o % $n === 0 && (o = Math.floor(o / $n)), r.shiftKey && o && (o = o * Pl), this.callback({
        type: Hn,
        center: {
          x: r.clientX,
          y: r.clientY
        },
        delta: -o,
        srcEvent: r,
        pointerType: "mouse",
        target: r.target
      });
    }, this.events = (this.options.events || []).concat(Sl), this.events.forEach((r) => i.addEventListener(r, this.handleEvent, gs ? { passive: !1 } : !1));
  }
  destroy() {
    this.events.forEach((i) => this.element.removeEventListener(i, this.handleEvent));
  }
  enableEventType(i, s) {
    i === Hn && (this.options.enable = s);
  }
}
const { MOUSE_EVENTS: Ll } = Bs, Un = "pointermove", Bn = "pointerover", Vn = "pointerout", zn = "pointerenter", Wn = "pointerleave";
class Al extends $i {
  constructor(i, s, n) {
    super(i, s, n), this.handleEvent = (o) => {
      this.handleOverEvent(o), this.handleOutEvent(o), this.handleEnterEvent(o), this.handleLeaveEvent(o), this.handleMoveEvent(o);
    }, this.pressed = !1;
    const { enable: r } = this.options;
    this.enableMoveEvent = r, this.enableLeaveEvent = r, this.enableEnterEvent = r, this.enableOutEvent = r, this.enableOverEvent = r, this.events = (this.options.events || []).concat(Ll), this.events.forEach((o) => i.addEventListener(o, this.handleEvent));
  }
  destroy() {
    this.events.forEach((i) => this.element.removeEventListener(i, this.handleEvent));
  }
  enableEventType(i, s) {
    i === Un && (this.enableMoveEvent = s), i === Bn && (this.enableOverEvent = s), i === Vn && (this.enableOutEvent = s), i === zn && (this.enableEnterEvent = s), i === Wn && (this.enableLeaveEvent = s);
  }
  handleOverEvent(i) {
    this.enableOverEvent && i.type === "mouseover" && this._emit(Bn, i);
  }
  handleOutEvent(i) {
    this.enableOutEvent && i.type === "mouseout" && this._emit(Vn, i);
  }
  handleEnterEvent(i) {
    this.enableEnterEvent && i.type === "mouseenter" && this._emit(zn, i);
  }
  handleLeaveEvent(i) {
    this.enableLeaveEvent && i.type === "mouseleave" && this._emit(Wn, i);
  }
  handleMoveEvent(i) {
    if (this.enableMoveEvent)
      switch (i.type) {
        case "mousedown":
          i.button >= 0 && (this.pressed = !0);
          break;
        case "mousemove":
          i.which === 0 && (this.pressed = !1), this.pressed || this._emit(Un, i);
          break;
        case "mouseup":
          this.pressed = !1;
          break;
      }
  }
  _emit(i, s) {
    this.callback({
      type: i,
      center: {
        x: s.clientX,
        y: s.clientY
      },
      srcEvent: s,
      pointerType: "mouse",
      target: s.target
    });
  }
}
const { KEY_EVENTS: Ol } = Bs, Fn = "keydown", Gn = "keyup";
class Nl extends $i {
  constructor(i, s, n) {
    super(i, s, n), this.handleEvent = (r) => {
      const o = r.target || r.srcElement;
      o.tagName === "INPUT" && o.type === "text" || o.tagName === "TEXTAREA" || (this.enableDownEvent && r.type === "keydown" && this.callback({
        type: Fn,
        srcEvent: r,
        key: r.key,
        target: r.target
      }), this.enableUpEvent && r.type === "keyup" && this.callback({
        type: Gn,
        srcEvent: r,
        key: r.key,
        target: r.target
      }));
    }, this.enableDownEvent = this.options.enable, this.enableUpEvent = this.options.enable, this.events = (this.options.events || []).concat(Ol), i.tabIndex = this.options.tabIndex || 0, i.style.outline = "none", this.events.forEach((r) => i.addEventListener(r, this.handleEvent));
  }
  destroy() {
    this.events.forEach((i) => this.element.removeEventListener(i, this.handleEvent));
  }
  enableEventType(i, s) {
    i === Fn && (this.enableDownEvent = s), i === Gn && (this.enableUpEvent = s);
  }
}
const Yn = "contextmenu";
class Il extends $i {
  constructor(i, s, n) {
    super(i, s, n), this.handleEvent = (r) => {
      this.options.enable && this.callback({
        type: Yn,
        center: {
          x: r.clientX,
          y: r.clientY
        },
        srcEvent: r,
        pointerType: "mouse",
        target: r.target
      });
    }, i.addEventListener("contextmenu", this.handleEvent);
  }
  destroy() {
    this.element.removeEventListener("contextmenu", this.handleEvent);
  }
  enableEventType(i, s) {
    i === Yn && (this.options.enable = s);
  }
}
const fs = 1, Ii = 2, ys = 4, Rl = {
  pointerdown: fs,
  pointermove: Ii,
  pointerup: ys,
  mousedown: fs,
  mousemove: Ii,
  mouseup: ys
}, Dl = 1, kl = 2, _l = 3, Hl = 0, $l = 1, Ul = 2, Bl = 1, Vl = 2, zl = 4;
function Wl(a) {
  const i = Rl[a.srcEvent.type];
  if (!i)
    return null;
  const { buttons: s, button: n, which: r } = a.srcEvent;
  let o = !1, l = !1, h = !1;
  return i === ys || i === Ii && !Number.isFinite(s) ? (o = r === Dl, l = r === kl, h = r === _l) : i === Ii ? (o = !!(s & Bl), l = !!(s & zl), h = !!(s & Vl)) : i === fs && (o = n === Hl, l = n === $l, h = n === Ul), { leftButton: o, middleButton: l, rightButton: h };
}
function Fl(a, i) {
  const s = a.center;
  if (!s)
    return null;
  const n = i.getBoundingClientRect(), r = n.width / i.offsetWidth || 1, o = n.height / i.offsetHeight || 1, l = {
    x: (s.x - n.left - i.clientLeft) / r,
    y: (s.y - n.top - i.clientTop) / o
  };
  return { center: s, offsetCenter: l };
}
const is = {
  srcElement: "root",
  priority: 0
};
class Gl {
  constructor(i) {
    this.handleEvent = (s) => {
      if (this.isEmpty())
        return;
      const n = this._normalizeEvent(s);
      let r = s.srcEvent.target;
      for (; r && r !== n.rootElement; ) {
        if (this._emit(n, r), n.handled)
          return;
        r = r.parentNode;
      }
      this._emit(n, "root");
    }, this.eventManager = i, this.handlers = [], this.handlersByElement = /* @__PURE__ */ new Map(), this._active = !1;
  }
  isEmpty() {
    return !this._active;
  }
  add(i, s, n, r = !1, o = !1) {
    const { handlers: l, handlersByElement: h } = this;
    let c = is;
    typeof n == "string" || n && n.addEventListener ? c = { ...is, srcElement: n } : n && (c = { ...is, ...n });
    let p = h.get(c.srcElement);
    p || (p = [], h.set(c.srcElement, p));
    const f = {
      type: i,
      handler: s,
      srcElement: c.srcElement,
      priority: c.priority
    };
    r && (f.once = !0), o && (f.passive = !0), l.push(f), this._active = this._active || !f.passive;
    let x = p.length - 1;
    for (; x >= 0 && !(p[x].priority >= f.priority); )
      x--;
    p.splice(x + 1, 0, f);
  }
  remove(i, s) {
    const { handlers: n, handlersByElement: r } = this;
    for (let o = n.length - 1; o >= 0; o--) {
      const l = n[o];
      if (l.type === i && l.handler === s) {
        n.splice(o, 1);
        const h = r.get(l.srcElement);
        h.splice(h.indexOf(l), 1), h.length === 0 && r.delete(l.srcElement);
      }
    }
    this._active = n.some((o) => !o.passive);
  }
  _emit(i, s) {
    const n = this.handlersByElement.get(s);
    if (n) {
      let r = !1;
      const o = () => {
        i.handled = !0;
      }, l = () => {
        i.handled = !0, r = !0;
      }, h = [];
      for (let c = 0; c < n.length; c++) {
        const { type: p, handler: f, once: x } = n[c];
        if (f({
          ...i,
          type: p,
          stopPropagation: o,
          stopImmediatePropagation: l
        }), x && h.push(n[c]), r)
          break;
      }
      for (let c = 0; c < h.length; c++) {
        const { type: p, handler: f } = h[c];
        this.remove(p, f);
      }
    }
  }
  _normalizeEvent(i) {
    const s = this.eventManager.getElement();
    return {
      ...i,
      ...Wl(i),
      ...Fl(i, s),
      preventDefault: () => {
        i.srcEvent.preventDefault();
      },
      stopImmediatePropagation: null,
      stopPropagation: null,
      handled: !1,
      rootElement: s
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
  constructor(i = null, s) {
    this._onBasicInput = (r) => {
      const { srcEvent: o } = r, l = xl[o.type];
      l && this.manager.emit(l, r);
    }, this._onOtherEvent = (r) => {
      this.manager.emit(r.type, r);
    }, this.options = { ...Yl, ...s }, this.events = /* @__PURE__ */ new Map(), this.setElement(i);
    const { events: n } = this.options;
    n && this.on(n);
  }
  getElement() {
    return this.element;
  }
  setElement(i) {
    if (this.element && this.destroy(), this.element = i, !i)
      return;
    const { options: s } = this, n = s.Manager;
    this.manager = new n(i, {
      touchAction: s.touchAction,
      recognizers: s.recognizers || vl
    }).on("hammer.input", this._onBasicInput), s.recognizers || Object.keys(kn).forEach((r) => {
      const o = this.manager.get(r);
      o && kn[r].forEach((l) => {
        o.recognizeWith(l);
      });
    });
    for (const r in s.recognizerOptions) {
      const o = this.manager.get(r);
      if (o) {
        const l = s.recognizerOptions[r];
        delete l.enable, o.set(l);
      }
    }
    this.wheelInput = new Ml(i, this._onOtherEvent, {
      enable: !1
    }), this.moveInput = new Al(i, this._onOtherEvent, {
      enable: !1
    }), this.keyInput = new Nl(i, this._onOtherEvent, {
      enable: !1,
      tabIndex: s.tabIndex
    }), this.contextmenuInput = new Il(i, this._onOtherEvent, {
      enable: !1
    });
    for (const [r, o] of this.events)
      o.isEmpty() || (this._toggleRecognizer(o.recognizerName, !0), this.manager.on(r, o.handleEvent));
  }
  destroy() {
    this.element && (this.wheelInput.destroy(), this.moveInput.destroy(), this.keyInput.destroy(), this.contextmenuInput.destroy(), this.manager.destroy(), this.wheelInput = null, this.moveInput = null, this.keyInput = null, this.contextmenuInput = null, this.manager = null, this.element = null);
  }
  on(i, s, n) {
    this._addEventHandler(i, s, n, !1);
  }
  once(i, s, n) {
    this._addEventHandler(i, s, n, !0);
  }
  watch(i, s, n) {
    this._addEventHandler(i, s, n, !1, !0);
  }
  off(i, s) {
    this._removeEventHandler(i, s);
  }
  _toggleRecognizer(i, s) {
    const { manager: n } = this;
    if (!n)
      return;
    const r = n.get(i);
    if (r && r.options.enable !== s) {
      r.set({ enable: s });
      const o = wl[i];
      o && !this.options.recognizers && o.forEach((l) => {
        const h = n.get(l);
        s ? (h.requireFailure(i), r.dropRequireFailure(l)) : h.dropRequireFailure(i);
      });
    }
    this.wheelInput.enableEventType(i, s), this.moveInput.enableEventType(i, s), this.keyInput.enableEventType(i, s), this.contextmenuInput.enableEventType(i, s);
  }
  _addEventHandler(i, s, n, r, o) {
    if (typeof i != "string") {
      n = s;
      for (const f in i)
        this._addEventHandler(f, i[f], n, r, o);
      return;
    }
    const { manager: l, events: h } = this, c = _n[i] || i;
    let p = h.get(c);
    p || (p = new Gl(this), h.set(c, p), p.recognizerName = bl[c] || c, l && l.on(c, p.handleEvent)), p.add(i, s, n, r, o), p.isEmpty() || this._toggleRecognizer(p.recognizerName, !0);
  }
  _removeEventHandler(i, s) {
    if (typeof i != "string") {
      for (const l in i)
        this._removeEventHandler(l, i[l]);
      return;
    }
    const { events: n } = this, r = _n[i] || i, o = n.get(r);
    if (o && (o.remove(i, s), o.isEmpty())) {
      const { recognizerName: l } = o;
      let h = !1;
      for (const c of n.values())
        if (c.recognizerName === l && !c.isEmpty()) {
          h = !0;
          break;
        }
      h || this._toggleRecognizer(l, !1);
    }
  }
}
class qn {
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
  #s = {
    left: !1
  };
  constructor(i) {
    this.#t = i;
  }
  has(i) {
    return this.#e.indexOf(i) != -1;
  }
  on(i, s, n, r) {
    let o = s;
    switch (i) {
      case "pointerdown":
        o = function(l) {
          this.logit(l), l.leftButton && (this.#t.pad.left = !0), this.#t.onPointerDown(l), s(this.#t.pointerEventData(l));
        };
        break;
      case "pointerup":
        o = function(l) {
          this.logit(l), this.#t.onPointerUp(l), s(this.#t.pointerEventData(l));
        };
        break;
      case "pointermove":
        o = function(l) {
          this.#t.motion(l), s(this.#t.pointerEventData(l));
        };
        break;
      case "click":
      case "dbclick":
      case "pointerenter":
      case "pointerleave":
      case "pointerout":
      case "pointerover":
      case "contextmenu":
        o = function(l) {
          this.logit(l), this.#t.location(l), s(this.#t.pointerEventData(l));
        };
        break;
      case "wheel":
        o = function(l) {
          this.logit(l), this.#t.wheeldelta = l, s(this.#t.pointerEventData(l));
        };
        break;
      case "pointercancel":
      case "gotpointercapture":
      case "lostpointercapture":
        o = function(l) {
          s(l);
        };
        break;
      case "pointerdrag":
        o = function(l) {
          this.logit(l), this.#t.motion(l), s(this.#t.pointerEventData(l));
        }, this.#t.agent.on("panstart", this.#t.startPointerDrag.bind(this.#t)), i = "panmove";
        break;
      case "pointerdragend":
        o = function(l) {
          this.logit(l), this.#t.motion(l), this.#t.endPointerDrag(l), s(this.#t.pointerEventData(l));
        }, i = "panend";
        break;
    }
    return r ? this.#t.agent.once(i, o.bind(this), n) : this.#t.agent.on(i, o.bind(this), n), o;
  }
  off(i, s, n) {
    this.#t.agent.off(i, s, n);
  }
  logit(i) {
  }
}
class Xn {
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
  constructor(i) {
    this.#t = i;
  }
  has(i) {
    return this.#e.indexOf(i) != -1;
  }
  on(i, s, n, r) {
    let o = s;
    return r ? this.#t.agent.once(i, o.bind(this), n) : this.#t.agent.on(i, o.bind(this), n), o;
  }
  off(i, s, n) {
    this.#t.agent.off(i, s, n);
  }
}
class jn {
  #e = [
    "keydown",
    "keyup"
  ];
  #t;
  constructor(i) {
    this.#t = i;
  }
  has(i) {
    return this.#e.indexOf(i) != -1;
  }
  on(i, s, n, r) {
    let o = s;
    return r ? this.#t.agent.once(i, o.bind(this), n) : this.#t.agent.on(i, o.bind(this), n), o;
  }
  off(i, s, n) {
    this.#t.agent.off(i, s, n);
  }
}
const Xl = {
  element: void 0,
  contextMenu: !0,
  panX: !0,
  panY: !0
};
class Ve {
  #e;
  #t;
  #s;
  #r = null;
  #n = null;
  #i = null;
  #o;
  #a;
  #c = !1;
  #l;
  #h;
  #d;
  pad = { left: !1 };
  constructor(i, s) {
    if (this.#e = { ...Xl, ...s }, this.#a = cl.idle, this.#o = hl, this.#t = i, !this.#t && this.#e.elementId && (this.#t = document.getElementById(this.#e.elementId)), !J(this.#t))
      throw "Must specify an element to receive user input.";
    this.#e.contextMenu || (window.oncontextmenu = (o) => (o.preventDefault(), !1));
    const r = {
      recognizerOptions: {
        pan: { threshold: this.#o ? 10 : 0 },
        pinch: { threshold: 0 }
      }
    };
    this.#s = new ql(this.#t, r), this.pointerInit();
  }
  get agent() {
    return this.#s;
  }
  get pointer() {
    return this.#r instanceof qn ? this.#r : (this.#r = new qn(this), this.#r);
  }
  get touch() {
    return this.#i instanceof Xn ? this.#i : (this.#i = new Xn(this), this.#i);
  }
  get key() {
    return this.#n instanceof jn ? this.#n : (this.#n = new jn(this), this.#n);
  }
  get status() {
    return this.#a;
  }
  get element() {
    return this.#t;
  }
  get isTouch() {
    return this.#o;
  }
  get isPan() {
    return this.#c;
  }
  set panX(i) {
    Q(i) && (this.#l = i);
  }
  set panY(i) {
    Q(y) && (this.#h = y);
  }
  set wheeldelta(i) {
    this.#d = i.delta;
  }
  get wheeldelta() {
    return this.#d;
  }
  destroy() {
    this.#s.destroy(), this.#r = void 0, this.#n = void 0, this.#i = void 0;
  }
  isValid(i, s) {
    return !!(E(i) || U(s));
  }
  validOptions(i) {
    return S(i) && Q(i) ? i : void 0;
  }
  on(i, s, n, r = !1) {
    if (!this.isValid(i, s))
      return !1;
    this.pointer.has(i) ? this.#r.on(i, s, n, r) : this.touch.has(i) ? this.#i.on(i, s, n, r) : this.key.has(i) ? this.#n.on(i, s, n, r) : this.element.addEventListener(i, s, this.validOptions(n));
  }
  off(i, s, n) {
    this.#r?.has(i) ? this.#r.off(i, s, n) : this.#i?.has(i) ? this.#i.off(i, s, n) : this.#n?.has(i) ? this.#n.off(i, s, n) : this.element.removeEventListener(i, s, this.validOptions(n));
  }
  once(i, s, n) {
    this.on(i, s, n, !0);
  }
  setCursor(i) {
    this.#t.style.cursor = i;
  }
  pointerInit() {
    this.clientPosPrev = new ot([null, null]), this.position = new ot([0, 0]), this.movement = new ot([0, 0]), this.dragstart = new ot([null, null]), this.dragend = new ot([null, null]), this.dragCheckThreshold = 3, this.dragStatus = !1, this.wheeldelta = 0, this.pointerButtons = [!1, !1, !1, !1, !1], this.pointerdrag = new Event("pointerdrag"), this.pointerdragend = new Event("pointerdragend");
  }
  pointerEventData(i) {
    return {
      isProcessed: !1,
      pointerType: i.pointerType,
      position: this.position.clone(),
      movement: this.movement.clone(),
      dragstart: this.dragstart.clone(),
      dragend: this.dragend.clone(),
      wheeldelta: this.wheeldelta,
      buttons: this.pointerButtons,
      domEvent: i,
      timeStamp: Date.now()
    };
  }
  motion(i) {
    let s = { left: 0, top: 0 };
    try {
      s = i.srcEvent.target?.getBoundingClientRect();
    } catch {
    }
    const n = i.srcEvent.clientX || this.position.x, r = i.srcEvent.clientY || this.position.y;
    this.movement.x = n - this.clientPosPrev.x, this.movement.y = r - this.clientPosPrev.y, this.position.x = n - s.left, this.position.y = r - s.top, this.clientPosPrev.x = n, this.clientPosPrev.y = r;
  }
  location(i) {
    let s = { left: 0, top: 0 };
    try {
      s = i.srcEvent.target?.getBoundingClientRect();
    } catch {
    }
    this.clientPosPrev.x = i.srcEvent.clientX, this.clientPosPrev.y = i.srcEvent.clientY, this.position.x = i.srcEvent.clientX - s.left, this.position.y = i.srcEvent.clientY - s.top, this.movement.x = 0, this.movement.y = 0;
  }
  onPointerDown(i) {
    this.location(i), this.pointerButtons[i.srcEvent.button] = !0;
  }
  onPointerUp(i) {
    this.location(i), this.pointerButtons[i.srcEvent.button] = !1;
  }
  startPointerDrag(i) {
    this.#c = !0, this.onPointerDown(i);
  }
  endPointerDrag(i) {
    this.#c = !1;
  }
}
const jl = ["y", "M", "d", "h", "m", "s", "ms"], Kl = ["years", "months", "days", "hours", "minutes", "seconds", "milliseconds"], Zl = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], Ql = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], _r = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Jl = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], Hr = 1231006505e3, Qe = 1, Y = 1e3, q = Y * 60, te = q * 60, z = te * 24, bt = z * 7, me = z * 30;
function $r(a = 3, i = !1) {
  let s = _r[a % 12] * z;
  return i && a > 0 && (s += z), s;
}
const Se = z * 365, Xt = {
  y: Se,
  M: me,
  w: bt,
  d: z,
  h: te,
  m: q,
  s: Y,
  u: Qe
}, Ur = {
  years: Se,
  months: me,
  weeks: bt,
  days: z,
  hours: te,
  minutes: q,
  seconds: Y,
  milliseconds: Qe
}, eh = { ...Xt, ...Ur }, ei = {
  YEARS10: [Se * 10, "years"],
  YEARS5: [Se * 5, "years"],
  YEARS3: [Se * 3, "years"],
  YEARS2: [Se * 2, "years"],
  YEARS: [Se, "years"],
  MONTH6: [me * 6, "months"],
  MONTH4: [me * 4, "months"],
  MONTH3: [me * 3, "months"],
  MONTH2: [me * 2, "months"],
  MONTH: [me, "months"],
  DAY15: [z * 15, "years"],
  DAY10: [z * 10, "days"],
  DAY7: [z * 7, "days"],
  DAY5: [z * 5, "days"],
  DAY3: [z * 3, "days"],
  DAY2: [z * 2, "days"],
  DAY: [z, "days"],
  HOUR12: [te * 12, "hours"],
  HOUR6: [te * 6, "hours"],
  HOUR4: [te * 4, "hours"],
  HOUR2: [te * 2, "hours"],
  HOUR: [te, "hours"],
  MINUTE30: [q * 30, "minutes"],
  MINUTE15: [q * 15, "minutes"],
  MINUTE10: [q * 10, "minutes"],
  MINUTE5: [q * 5, "minutes"],
  MINUTE2: [q * 2, "minutes"],
  MINUTE: [q, "minutes"],
  SECOND30: [Y * 30, "seconds"],
  SECOND15: [Y * 15, "seconds"],
  SECOND10: [Y * 10, "seconds"],
  SECOND5: [Y * 5, "seconds"],
  SECOND2: [Y * 2, "seconds"],
  SECOND: [Y, "seconds"],
  MILLISECOND500: [Qe * 500, "milliseconds"],
  MILLISECOND250: [Qe * 250, "milliseconds"],
  MILLISECOND100: [Qe * 100, "milliseconds"],
  MILLISECOND50: [Qe * 50, "milliseconds"],
  MILLISECOND: [Qe, "milliseconds"]
}, th = () => {
  const a = Object.values(ei), i = [];
  for (let s = a.length; --s; s > 0)
    i[s] = a[s][0];
  return i;
}, Vt = th(), ih = () => {
  const a = Object.values(ei), i = [];
  for (let s = a.length; --s; s > 0)
    i[s] = a[s][1];
  return i;
}, vs = ih(), sh = Object.keys(ei), nh = () => {
  const a = {};
  for (const [i, s] of Object.entries(ei))
    a[i] = s[0];
  return a;
}, rh = nh(), ws = {
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
function oh() {
  const a = (/* @__PURE__ */ new Date()).getTimezoneOffset();
  return Object.prototype.hasOwnProperty.call(ws, a) ? ws[a.toString()] : "Etc/UTC";
}
function ah() {
  const a = {};
  for (let i in Xt) {
    let s = 0;
    a[i] = [];
    do
      a[i].push(Math.round(Xt[i] * s)), s += 0.125;
    while (s < 1);
  }
  return a;
}
function Br(a) {
  const i = new Date(a).getTime();
  return T(i);
}
function Vr(a, i = Hr, s = Date.now()) {
  return Br(a) ? a > i && a < s : !1;
}
function $t(a, i, s) {
  a = new Date(a), i = new Date(i);
  var n = i.getTime(), r = a.getTime();
  return parseInt((n - r) / s);
}
const Ze = {
  inSeconds: function(a, i) {
    return $t(a, i, Y);
  },
  inMinutes: function(a, i) {
    return $t(a, i, q);
  },
  inHours: function(a, i) {
    return $t(a, i, te);
  },
  inDays: function(a, i) {
    return $t(a, i, z);
  },
  inWeeks: function(a, i) {
    return $t(a, i, bt);
  },
  inMonths: function(a, i) {
    a = new Date(a), i = new Date(i);
    let s = a.getUTCFullYear(), n = i.getUTCFullYear(), r = a.getUTCMonth();
    return i.getUTCMonth() + 12 * n - (r + 12 * s);
  },
  inYears: function(a, i) {
    let s = new Date(a);
    return new Date(i).getUTCFullYear() - s.getUTCFullYear();
  }
};
function lh(a, i) {
  let s = Ze.inYears(a, i), n = Ze.inMonths(a, i), r = Ze.inWeeks(a, i), o = Ze.inDays(a, i), l = Ze.inHours(a, i), h = Ze.inMinutes(a, i), c = Ze.inSeconds(a, i), p = new Date(i).getTime() - new Date(a).getTime();
  return {
    y: s,
    M: n,
    w: r,
    d: o,
    h: l,
    m: h,
    s: c,
    ms: p,
    years: s,
    months: n,
    weeks: r,
    days: o,
    hours: l,
    minutes: h,
    seconds: c,
    milliseconds: p
  };
}
function bi(a) {
  let i = Y;
  return E(a) ? (i = zr(a), i ? a = a : (i = Y, a = "1s")) : a = "1s", { tf: a, ms: i };
}
function zr(a) {
  if (!E(a))
    return !1;
  const i = /([0-9]{1,2})([s|m|h|d|w|M|y])/gm;
  let s;
  return (s = i.exec(a)) !== null ? Xt[s[2]] * s[1] : !1;
}
function Vs(a) {
  let i = Math.floor(a / 1e3), s = Math.floor(i / 60);
  i = i % 60;
  let n = Math.floor(s / 60);
  s = s % 60;
  let r = Math.floor(n / 24);
  n = n % 24;
  let o = Math.floor(r / 7);
  r = r % 7;
  let l = Math.floor(o / 4), h = Math.floor(o / 52), c = o % 4;
  return l = l % 13, {
    y: h,
    M: l,
    w: c,
    d: r,
    h: n,
    m: s,
    s: i,
    years: h,
    months: l,
    weeks: c,
    days: r,
    hours: n,
    minutes: s,
    seconds: i
  };
}
function Gt(a) {
  const i = Vs(a);
  for (const s in i)
    if (i[s])
      return `${i[s]}${s}`;
}
function Wr(a) {
  return a ? new Date(a).getUTCSeconds() : null;
}
function zs(a) {
  return new Date(a).setUTCMilliseconds(0, 0);
}
function Fr(a) {
  return a ? new Date(a).getUTCMinutes() : null;
}
function Ws(a) {
  return new Date(a).setUTCSeconds(0, 0);
}
function Gr(a) {
  return a ? new Date(a).getUTCHours() : null;
}
function Fs(a) {
  return new Date(a).setUTCMinutes(0, 0, 0);
}
function Gs(a) {
  return a ? new Date(a).getUTCDate() : null;
}
function hh(a, i = "en-GB", s = "short") {
  return new Date(a).toLocaleDateString(i, { weekday: s });
}
function jt(a) {
  return new Date(a).setUTCHours(0, 0, 0, 0);
}
function Ys(a) {
  if (a)
    return new Date(a).getUTCMonth();
}
function Yr(a, i = "en-GB", s = "short") {
  return new Date(a).toLocaleDateString(i, { month: s });
}
function qs(a) {
  let i = new Date(a);
  return Date.UTC(
    i.getUTCFullYear(),
    i.getUTCMonth(),
    1
  );
}
function qr(a) {
  let i = (Ys(a) + 1) % 12;
  return a += $r(i, Ui(a)), a;
}
function Xr(a) {
  if (a)
    return new Date(a).getUTCFullYear();
}
function Xs(a) {
  return Date.UTC(new Date(a).getUTCFullYear());
}
function jr(a) {
  return a = a + Se + z, Ui(a), a;
}
function Ui(a) {
  let s = new Date(a).getUTCFullYear();
  return s & 3 ? !1 : s % 100 != 0 || s % 400 == 0;
}
function ch(a) {
  let i = new Date(a), s = i.getUTCMonth(), n = i.getUTCDate(), r = dayCount[s] + n;
  return s > 1 && Ui() && r++, r;
}
function Ci(a, i) {
  return {
    years: (n) => Xs(n),
    months: (n) => qs(n),
    weeks: (n) => jt(n),
    days: (n) => jt(n),
    hours: (n) => Fs(n),
    minutes: (n) => Ws(n),
    seconds: (n) => zs(n)
  }[i](a);
}
function uh(a, i) {
  let s, n;
  switch (i) {
    case "years":
      s = Xs(a), n = jr(a);
      break;
    case "months":
      s = qs(a), n = qr(a);
      break;
    case "weeks":
      s = jt(a), n = s + z;
      break;
    case "days":
      s = jt(a), n = s + z;
      break;
    case "hours":
      s = Fs(a), n = s + te;
      break;
    case "minutes":
      s = Ws(a), n = s + q;
      break;
    case "seconds":
      s = zs(a), n = s + Y;
  }
  return { start: s, end: n };
}
function xs(a) {
  let { h: i, m: s } = js(a);
  return i == 0 && s == 0 ? `${d}` : `${i}:${s}`;
}
function dh(a) {
  let { h: i, m: s, s: n } = js(a);
  return i == 0 && s == 0 && n == 0 ? `${d}` : `${i}:${s}:${n}`;
}
function bs(a) {
  let { h: i, m: s, s: n } = js(a);
  return i == 0 && s == 0 && n == 0 ? `${d}` : `${s}:${n}`;
}
function js(a) {
  let i, s, n, r;
  return i = String(Gs(a)), s = String(Gr(a)).padStart(2, "0"), n = String(Fr(a)).padStart(2, "0"), r = String(Wr(a)).padStart(2, "0"), { d: i, h: s, m: n, s: r };
}
function mh(a, i) {
  let s = 1 / 0, n = null, r = -1;
  for (let o = 0; o < i.length; o++) {
    let l = i[o][0];
    Math.abs(l - a) < s && (s = Math.abs(l - a), n = i[o], r = o);
  }
  return [r, n];
}
const ph = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BTCGENESIS: Hr,
  DAY_MS: z,
  HM: xs,
  HMS: dh,
  HOUR_MS: te,
  MILLISECOND: Qe,
  MINUTE_MS: q,
  MONTHMAP: Jl,
  MONTHR_MS: me,
  MONTH_MS: $r,
  MS: bs,
  SECOND_MS: Y,
  TIMESCALES: Vt,
  TIMESCALESKEYS: sh,
  TIMESCALESRANK: vs,
  TIMESCALESVALUES: ei,
  TIMESCALESVALUESKEYS: rh,
  TIMEUNITS: jl,
  TIMEUNITSLONG: Kl,
  TIMEUNITSVALUES: eh,
  TIMEUNITSVALUESLONG: Ur,
  TIMEUNITSVALUESSHORT: Xt,
  WEEK_MS: bt,
  YEAR_MS: Se,
  buildSubGrads: ah,
  dayCntInc: Zl,
  dayCntLeapInc: Ql,
  dayOfYear: ch,
  day_start: jt,
  getTimezone: oh,
  get_day: Gs,
  get_dayName: hh,
  get_hour: Gr,
  get_minute: Fr,
  get_month: Ys,
  get_monthName: Yr,
  get_second: Wr,
  get_year: Xr,
  hour_start: Fs,
  interval2MS: zr,
  isLeapYear: Ui,
  isTimeFrame: bi,
  isValidTimeInRange: Vr,
  isValidTimestamp: Br,
  minute_start: Ws,
  monthDayCnt: _r,
  month_start: qs,
  ms2Interval: Gt,
  ms2TimeUnits: Vs,
  nearestTs: mh,
  nextMonth: qr,
  nextYear: jr,
  second_start: zs,
  time_start: Ci,
  timestampDiff: Ze,
  timestampDifference: lh,
  timezones: ws,
  unitRange: uh,
  year_start: Xs
}, Symbol.toStringTag, { value: "Module" })), gh = q, fh = "1m", Ri = gh, yh = 6, Kn = 0.05, vh = 100, Zn = 100, qe = ["default", "percent", "log"], Qn = 0.3, Jn = 30, pi = 200, er = 200, tr = 20, ir = 4096, Bi = 5, sr = 50, nr = 30, wh = 8, Cs = 30, Kr = [!0, "top"];
class be {
  static t = 0;
  static o = 1;
  static h = 2;
  static l = 3;
  static c = 4;
  static v = 5;
}
const Ti = {
  mainPane: {},
  primaryPane: {},
  secondaryPane: {},
  scale: {},
  timeline: {}
};
Array.from(Object.keys(Ti));
class de {
  #e;
  #t;
  #s;
  #r;
  #n;
  #i;
  #o;
  #a;
  #c;
  #l;
  #h;
  static dividerList = {};
  static divideCnt = 0;
  static class = On;
  static name = "Dividers";
  static type = "Divider";
  static create(i, s) {
    const n = `${s.core.id}_divider_${++de.divideCnt}`;
    return s.id = n, de.dividerList[n] = new de(i, s), de.dividerList[n];
  }
  static destroy() {
    for (let i in de.dividerList)
      de.dividerList[i].destroy();
    delete de.dividerList[id];
  }
  static defaultNode() {
    return `
  <div slot="widget" class="${On}" style="position: absolute;"></div>
  `;
  }
  constructor(i, s) {
    const n = { ...s };
    this.#n = i, this.#t = n.core, this.#s = n, this.#r = n.core.theme, this.#e = n.id, this.#i = n.chartPane, this.#o = i.elements.elDividers, this.init();
  }
  get el() {
    return this.#a;
  }
  get id() {
    return this.#e;
  }
  get chartPane() {
    return this.#i;
  }
  get config() {
    return this.#t.config;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return ce(this.#a);
  }
  get height() {
    return this.#a.getBoundingClientRect().height;
  }
  set cursor(i) {
    this.setCursorStyle(i);
  }
  get cursor() {
    return this.#l;
  }
  get type() {
    return de.type;
  }
  init() {
    this.mount();
  }
  start() {
    this.cursor = "row-resize", this.eventsListen();
  }
  destroy() {
    this.#h.destroy(), this.el.remove(), delete de.dividerList[this.id];
  }
  eventsListen() {
    this.#h = new Ve(this.#a, { disableContextMenu: !1 }), this.#h.on("pointerover", this.onMouseEnter.bind(this)), this.#h.on("pointerout", this.onMouseOut.bind(this)), this.#h.on("pointerdrag", this.onPointerDrag.bind(this)), this.#h.on("pointerdragend", this.onPointerDragEnd.bind(this));
  }
  on(i, s, n = this) {
    this.#t.on(i, s, n);
  }
  off(i, s, n = this) {
    this.#t.off(i, s, n);
  }
  emit(i, s) {
    this.#t.emit(i, s);
  }
  onMouseEnter() {
    this.#a.style.background = this.#r.divider.active, this.#t.MainPane.onMouseEnter();
  }
  onMouseOut() {
    this.#a.style.background = this.#r.divider.idle, this.#t.MainPane.onMouseEnter();
  }
  onPointerDrag(i) {
    this.#c = this.#t.MainPane.cursorPos, this.#a.style.background = this.#r.divider.active, this.emit(`${this.id}_pointerdrag`, this.#c), this.emit("divider_pointerdrag", {
      id: this.id,
      e: i,
      pos: this.#c,
      chartPane: this.chartPane
    }), this.chartPane.resize();
  }
  onPointerDragEnd(i) {
    this.#a.style.background = this.#r.divider.idle, this.#c = this.#t.MainPane.cursorPos, this.emit(`${this.id}_pointerdragend`, this.#c), this.emit("divider_pointerdragend", {
      id: this.id,
      e: i,
      pos: this.#c,
      chartPane: this.chartPane
    }), this.chartPane.resize();
  }
  mount() {
    this.#o.lastElementChild == null ? this.#o.innerHTML = this.dividerNode() : this.#o.lastElementChild.insertAdjacentHTML("afterend", this.dividerNode()), this.#a = Lr(`#${this.#e}`, this.#o);
  }
  dividerNode() {
    let i = this.#t.theme, s = this.#i.pos.top - ce(this.#o).top, n = this.#t.elBody.width, r = T(this.config.dividerHeight) ? this.config.dividerHeight : wh, o = i.tools.width;
    switch (s -= r / 2, i.tools.location) {
      case "left":
        break;
      case !1:
      case "none":
      case "right":
        o *= -1;
        break;
    }
    const l = `position: absolute; top: ${s}px; left: ${o}px; z-index:100; width: ${n}px; height: ${r}px; background: ${i.divider.idle};`, h = `width: 100%; margin: 3.5px 0; border: 0; border-top: ${i.divider.style} ${i.divider.line};`;
    return `
      <div id="${this.#e}" class="divider" style="${l}"><hr style="${h}"></div>
    `;
  }
  setPos() {
    let i = this.#i.pos.top - ce(this.#o).top;
    i = i - this.height / 2 + 1, this.#a.style.top = `${i}px`;
  }
  setWidth() {
    this.#a.style.width = `${this.#t.MainPane.width}px`;
  }
  setCursorStyle(i) {
    E(i) && (this.#l = i, this.#a.style.cursor = i);
  }
  hide() {
    this.#a.style.display = "none";
  }
  show() {
    this.#a.style.display = "block";
  }
}
const xh = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4" ><path d="M471.993 112h-89.2l-16.242-46.75a32.023 32.023 0 00-30.229-21.5H175.241a31.991 31.991 0 00-30.294 21.691L129.1 112H40a24.027 24.027 0 00-24 24v312a24.027 24.027 0 0024 24h431.993a24.027 24.027 0 0024-24V136a24.027 24.027 0 00-24-24zm-8 328H48.007V144h104.01l23.224-68.25h161.081l23.71 68.25h103.961z" class="ci-primary"></path><path d="M256 168a114 114 0 10114 114 114.13 114.13 0 00-114-114zm0 196a82 82 0 1182-82 82.093 82.093 0 01-82 82z"></path></svg>', bh = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M376 160v32h65.372L252 381.373l-72-72L76.686 412.686l22.628 22.628L180 354.627l72 72 212-211.999V280h32V160H376z"></path><path d="M48 104H16v392h480v-32H48V104z"></path></svg>', Ch = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M271.514 95.5h-32v178.111l115.613 54.948 13.737-28.902-97.35-46.268V95.5z"></path><path d="M256 16C123.452 16 16 123.452 16 256s107.452 240 240 240 240-107.452 240-240S388.548 16 256 16zm0 448c-114.875 0-208-93.125-208-208S141.125 48 256 48s208 93.125 208 208-93.125 208-208 208z"></path></svg>', Zr = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M245.151 168a88 88 0 1088 88 88.1 88.1 0 00-88-88zm0 144a56 56 0 1156-56 56.063 56.063 0 01-56 56z"></path><path d="M464.7 322.319l-31.77-26.153a193.081 193.081 0 000-80.332l31.77-26.153a19.941 19.941 0 004.606-25.439l-32.612-56.483a19.936 19.936 0 00-24.337-8.73l-38.561 14.447a192.038 192.038 0 00-69.54-40.192l-6.766-40.571A19.936 19.936 0 00277.762 16H212.54a19.937 19.937 0 00-19.728 16.712l-6.762 40.572a192.03 192.03 0 00-69.54 40.192L77.945 99.027a19.937 19.937 0 00-24.334 8.731L21 164.245a19.94 19.94 0 004.61 25.438l31.767 26.151a193.081 193.081 0 000 80.332l-31.77 26.153A19.942 19.942 0 0021 347.758l32.612 56.483a19.937 19.937 0 0024.337 8.73l38.562-14.447a192.03 192.03 0 0069.54 40.192l6.762 40.571A19.937 19.937 0 00212.54 496h65.222a19.936 19.936 0 0019.728-16.712l6.763-40.572a192.038 192.038 0 0069.54-40.192l38.564 14.449a19.938 19.938 0 0024.334-8.731l32.609-56.487a19.939 19.939 0 00-4.6-25.436zm-50.636 57.12l-48.109-18.024-7.285 7.334a159.955 159.955 0 01-72.625 41.973l-10 2.636L267.6 464h-44.89l-8.442-50.642-10-2.636a159.955 159.955 0 01-72.625-41.973l-7.285-7.334-48.117 18.024L53.8 340.562l39.629-32.624-2.7-9.973a160.9 160.9 0 010-83.93l2.7-9.972L53.8 171.439l22.446-38.878 48.109 18.024 7.285-7.334a159.955 159.955 0 0172.625-41.973l10-2.636L222.706 48H267.6l8.442 50.642 10 2.636a159.955 159.955 0 0172.625 41.973l7.285 7.334 48.109-18.024 22.447 38.877-39.629 32.625 2.7 9.972a160.9 160.9 0 010 83.93l-2.7 9.973 39.629 32.623z"></path></svg>', Th = '<svg width="46.08" height="46.08" version="1.1" viewBox="-51.2 -51.2 614.4 614.4"><rect x="16" y="240.18" width="188.84" height="31.635"/><g transform="translate(-3.3234e-7 -112.18)"><rect x="307.16" y="352.37" width="188.84" height="31.635"/></g><rect transform="rotate(-90)" x="-496" y="240.18" width="188.84" height="31.635"/><rect transform="rotate(-90)" x="-204.84" y="240.18" width="188.84" height="31.635"/></svg>', Sh = '<svg width="46.08" height="46.08" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"></path><path d="M6.535 3H21a1 1 0 011 1v16a1 1 0 01-1 1H6.535a1 1 0 01-.832-.445l-5.333-8a1 1 0 010-1.11l5.333-8A1 1 0 016.535 3zm.535 2l-4.666 7 4.666 7H20V5H7.07zM13 10.586l2.828-2.829 1.415 1.415L14.414 12l2.829 2.828-1.415 1.415L13 13.414l-2.828 2.829-1.415-1.415L11.586 12 8.757 9.172l1.415-1.415L13 10.586z"></path></svg>', Eh = '<svg width="46.08" height="46.08" version="1.1" viewBox="-51.2 -51.2 614.4 614.4"><g stroke-width="30.155"><rect x="14.757" y="240.92" width="482.49" height="30.155" rx="15.078"/><rect x="14.757" y="147" width="482.49" height="30.155" rx="15.078"/><rect x="14.757" y="334.84" width="482.49" height="30.155" rx="15.078"/></g ><g transform="translate(5.937 -288.34)"><path d="m23.904 712.34c-8.3532 0-15.078 6.7252-15.078 15.078s6.7249 15.078 15.078 15.078h173.93c-0.65295-3.3651-2.0312-6.4697-2.0312-10.026 0-7.1393 1.5573-13.888 4.0625-20.13zm276.35 0c2.5051 6.2423 4.0365 12.991 4.0365 20.13 0 3.5554-1.3526 6.6618-2.0052 10.026h173.93c8.3532 0 15.078-6.7252 15.078-15.078s-6.7249-15.078-15.078-15.078z"/><path d="m250.06 759.97c17.965 0 32.545-14.58 32.545-32.545 0-17.965-14.58-32.545-32.545-32.545-17.965 0-32.545 14.58-32.545 32.545 0 17.965 14.58 32.545 32.545 32.545zm0 21.697c-29.964 0-54.242-24.279-54.242-54.242 0-29.964 24.279-54.242 54.242-54.242 29.964 0 54.242 24.279 54.242 54.242 0 29.964-24.279 54.242-54.242 54.242z" stroke-width="21.697"/></g ><path d="m144.05 18.672c-24.694 0-45.285 16.595-51.849 39.167h-62.37c-8.3532 0-15.078 6.7252-15.078 15.078s6.7249 15.078 15.078 15.078h62.37c6.5639 22.572 27.155 39.167 51.849 39.167s45.285-16.595 51.849-39.167h120.03c6.5639 22.572 27.155 39.167 51.849 39.167 24.694 0 45.285-16.595 51.849-39.167h62.552c8.3532 0 15.078-6.7252 15.078-15.078s-6.7249-15.078-15.078-15.078h-62.552c-6.5639-22.572-27.155-39.167-51.849-39.167-24.694 0-45.285 16.595-51.849 39.167h-120.03c-6.5639-22.572-27.155-39.167-51.849-39.167zm0 21.693c17.965 0 32.552 14.587 32.552 32.552 0 17.965-14.587 32.552-32.552 32.552-17.965 1e-5 -32.552-14.587-32.552-32.552 0-17.965 14.587-32.552 32.552-32.552zm223.72 0c17.965 0 32.552 14.587 32.552 32.552 0 17.965-14.587 32.552-32.552 32.552-17.965 0-32.552-14.587-32.552-32.552 0-17.965 14.587-32.552 32.552-32.552z" stroke-width="30.155"/></svg>', nt = '<svg width="46.08" height="46.08" version="1.1" viewBox="-51.2 -51.2 614.4 614.4"><g transform="matrix(21.697 0 0 21.697 -47.758 -47.758)"><path d="m7.354 21.354 14-14-0.707-0.707-14 14z"/><path d="m22.5 7c0.828 0 1.5-0.672 1.5-1.5s-0.672-1.5-1.5-1.5-1.5 0.672-1.5 1.5 0.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zm-17 16c0.828 0 1.5-0.672 1.5-1.5s-0.672-1.5-1.5-1.5-1.5 0.672-1.5 1.5 0.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"/></g></svg>', Ph = '<svg width="46.08" height="46.08" viewBox="0 0 32 32"><path d="M 3.2758709,20.241377 11.758622,28.72413 28.72413,11.758622 20.241377,3.2758709 Z m 2.1206881,0 1.5905161,-1.590515 3.7112049,3.711203 1.060342,-1.060345 -3.7112027,-3.711204 1.0603441,-1.060344 2.1206876,2.12069 1.060346,-1.060346 -2.120689,-2.120688 1.060343,-1.060344 3.711203,3.711203 L 16,17.060346 l -3.711203,-3.711208 1.060341,-1.060341 2.12069,2.120687 1.060344,-1.060346 -2.120688,-2.120687 1.060344,-1.060343 3.711204,3.711205 1.060345,-1.060345 -3.711205,-3.7112046 1.060344,-1.0603441 2.120687,2.1206887 1.060346,-1.0603446 -2.120687,-2.1206883 1.590515,-1.5905161 6.362065,6.362063 -14.84482,14.84482 z" style="stroke-width:0.749776" /></svg>', Mh = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><g id="g930" transform="matrix(21.128963,0,0,21.128963,-29.235597,-50.369964)"><path clip-rule="evenodd" d="m 4.5,5 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z M 2,6.5 A 2.5,2.5 0 0 1 6.95,6 H 24 V 7 H 6.95 A 2.5,2.5 0 0 1 2,6.5 Z M 4.5,15 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z M 2,16.5 A 2.5,2.5 0 0 1 6.95,16 h 13.1 a 2.5,2.5 0 1 1 0,1 H 6.95 A 2.5,2.5 0 0 1 2,16.5 Z M 22.5,15 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z m -18,6 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z M 2,22.5 A 2.5,2.5 0 0 1 6.95,22 H 24 v 1 H 6.95 A 2.5,2.5 0 0 1 2,22.5 Z" id="path908" /><path clip-rule="evenodd" d="M 22.4,8.94 21.01,9.57 20.6,8.66 21.99,8.03 Z m -4,1.8 -1.39,0.63 -0.41,-0.91 1.39,-0.63 z m -4,1.8 -1.4,0.63 -0.4,-0.91 1.39,-0.63 z m -4,1.8 L 9,14.97 8.6,14.06 9.99,13.43 Z" id="path910" /></g></svg>', Lh = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M231.359 147l-80.921 205h45.155l15.593-39.5h89.628l15.593 39.5h45.155l-80.921-205zm-3.594 123.5L256 198.967l28.235 71.533z"></path><path d="M384 56H128V16H16v112h40v256H16v112h112v-40h256v40h112V384h-40V128h40V16H384zM48 96V48h48v48zm48 368H48v-48h48zm288-40H128v-40H88V128h40V88h256v40h40v256h-40zm80-8v48h-48v-48zM416 48h48v48h-48z"></path></svg>', Ah = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><g id="g718" transform="translate(0,1.2499996)"><path d="M 7.5010125,7.9560661 5.355012,10.103066 c -0.472,0.472 -1.18,-0.2360003 -0.708,-0.7080003 L 7.6470125,6.3950659 c 0.195364,-0.195858 0.512636,-0.195858 0.708,0 l 3.0000005,2.9999998 c 0.472,0.472 -0.236,1.1800003 -0.708,0.7080003 L 8.5010125,7.9560661 c -0.431103,-0.417289 -0.523896,-0.423024 -1,0 z" style="" id="path566-5" /><path d="m 7.4989873,5.5439348 -2.1460003,-2.147 c -0.472,-0.472 -1.18,0.236 -0.708,0.708 l 3.0000003,3 c 0.1953639,0.195858 0.5126361,0.195858 0.708,0 l 2.9999997,-3 c 0.472,-0.472 -0.236,-1.18 -0.708,-0.708 l -2.1459997,2.147 c -0.4311027,0.417289 -0.5238956,0.423024 -1,0 z" style="" id="path566-6-3" /></g></svg>', Oh = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><path d="m 7.4989873,7.7026182 -2.1460003,2.147 c -0.472,0.4719998 -1.18,-0.236 -0.708,-0.708 l 3.0000003,-3 c 0.1953639,-0.1958581 0.5126361,-0.1958581 0.708,0 l 2.9999997,3 c 0.472,0.472 -0.236,1.1799998 -0.708,0.708 l -2.1459997,-2.147 c -0.4311027,-0.417289 -0.5238956,-0.423024 -1,0 z" style="" id="path566-6-3" /></svg>', Nh = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><path d="m 7.4989873,8.2973819 -2.1460003,-2.147 c -0.472,-0.472 -1.18,0.236 -0.708,0.708 l 3.0000003,3 c 0.1953639,0.1958581 0.5126361,0.1958581 0.708,0 l 2.9999997,-3 c 0.472,-0.472 -0.236,-1.18 -0.708,-0.708 l -2.1459997,2.147 c -0.4311027,0.417289 -0.5238956,0.423024 -1,0 z" style="" id="path566-6-3" /></svg>', Ih = '<svg width="46.08" height="46.08" version="1.1" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"> <path d="m1 14a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-12a1 1 0 0 0-1-1h-12a1 1 0 0 0-1 1zm15 0a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-8.5-2.5a0.5 0.5 0 0 0 1 0v-5.793l2.146 2.147a0.50063 0.50063 0 1 0 0.708-0.708l-3-3a0.5 0.5 0 0 0-0.708 0l-3 3a0.50063 0.50063 0 0 0 0.708 0.708l2.146-2.147z" fill-rule="evenodd"/></svg>', Rh = '<svg width="46.08" height="46.08" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M 15,2 A 1,-1 0 0 0 14,1 H 2 A 1,-1 0 0 0 1,2 v 12 a 1,-1 0 0 0 1,1 h 12 a 1,-1 0 0 0 1,-1 z M 0,2 A 2,-2 0 0 1 2,0 h 12 a 2,-2 0 0 1 2,2 v 12 a 2,-2 0 0 1 -2,2 H 2 A 2,-2 0 0 1 0,14 Z m 8.5,2.5 a 0.5,-0.5 0 0 0 -1,0 v 5.793 L 5.354,8.146 A 0.5006316,-0.5006316 0 1 0 4.646,8.854 l 3,3 a 0.5,-0.5 0 0 0 0.708,0 l 3,-3 A 0.5006316,-0.5006316 0 0 0 10.646,8.146 L 8.5,10.293 Z" id="path2" /></svg>', Dh = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><g id="g687" transform="translate(15.647255,-0.0288128)"><path d="m -8.1462425,10.484879 -2.1460005,2.146999 c -0.472,0.472 -1.18,-0.236 -0.708,-0.708 l 3.0000005,-2.9999994 c 0.195364,-0.195858 0.512636,-0.195858 0.708,0 l 3.0000005,2.9999994 c 0.472,0.472 -0.236,1.18 -0.708,0.708 l -2.1460005,-2.146999 c -0.431103,-0.417289 -0.523896,-0.423024 -1,0 z" style="" id="path566-5" /><path d="m -8.1482677,5.5727476 -2.1460003,-2.147 c -0.472,-0.472 -1.18,0.236 -0.708,0.708 l 3.0000003,3 c 0.1953639,0.195858 0.5126361,0.195858 0.708,0 l 2.9999997,-3 c 0.472,-0.472 -0.236,-1.18 -0.708,-0.708 l -2.1459997,2.147 c -0.4311027,0.417289 -0.5238956,0.423024 -1,0 z" style="" id="path566-6-3" /></g></svg>', kh = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><g id="g611" transform="translate(0.2050748,-0.8829888)"><path d="m 7.2959375,11.933818 -2.146,-2.1469999 c -0.472,-0.4719998 -1.18,0.2359999 -0.708,0.7079999 l 3,3 c 0.195364,0.195858 0.512636,0.195858 0.708,0 l 3.0000005,-3 c 0.472,-0.472 -0.236,-1.1799997 -0.708,-0.7079999 L 8.2959375,11.933818 c -0.431103,0.417289 -0.523896,0.423024 -1,0 z" style="" id="path566" /><path d="m 7.2939123,5.8321596 -2.146,2.147 c -0.4719998,0.472 -1.1799998,-0.236 -0.708,-0.708 l 3,-3 c 0.1953639,-0.195858 0.5126361,-0.195858 0.708,0 l 2.9999997,3 c 0.472,0.472 -0.236,1.18 -0.708,0.708 l -2.1459997,-2.147 c -0.4311027,-0.417289 -0.5238956,-0.423024 -1,0 z" style="" id="path566-6" /></g></svg>', _h = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><path d="m 11.500447,8.5 c 0.666666,0 0.666666,-1 0,-1 H 4.444275 c -0.1571231,0 -0.224029,0.07336 -0.2978281,0.1459999 -0.1958579,0.195364 -0.1958579,0.5126361 0,0.7080001 0,0 0.113806,0.146 0.320186,0.146 z" style="" id="path887" /></svg>', Hh = '<svg style="height:46px;width:46px" version="1.1" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"> <g fill-rule="evenodd">  <path d="m15 2c0-0.55228-0.44772-1-1-1h-12c-0.55228 0-1 0.44772-1 1v12c0 0.55228 0.44772 1 1 1h12c0.55228 0 1-0.44772 1-1zm-15 0c0-1.1046 0.89543-2 2-2h12c1.1046 0 2 0.89543 2 2v12c0 1.1046-0.89543 2-2 2h-12c-1.1046 0-2-0.89543-2-2z"/>  <path d="m4.4449 4.097c-0.01964 0-0.037678 0.0018-0.054687 0.0039-0.017011 0.0022-0.034068 0.0058-0.048828 0.0098-0.014761 4e-3 -0.028126 0.0081-0.041016 0.01367-0.012889 0.0056-0.025711 0.01268-0.037109 0.01953-0.022796 0.01371-0.041442 0.02783-0.060547 0.04492s-0.038191 0.03653-0.056641 0.05469c-0.024482 0.02442-0.046092 0.05037-0.064453 0.07813-0.018362 0.02775-0.032681 0.05776-0.044922 0.08789s-0.021223 0.06023-0.027344 0.0918c-0.00612 0.03156-0.00977 0.06366-0.00977 0.0957 0 8e-3 -4.378e-4 0.01543 0 0.02344v1.2988c0 0.02083 6.41e-5 0.04102 0.00195 0.06055 0.00189 0.01953 0.0061 0.03841 0.00977 0.05664 0.00366 0.01823 0.00836 0.03581 0.013672 0.05273 0.00531 0.01693 0.010742 0.0332 0.017578 0.04883 0.013672 0.03125 0.029785 0.0599 0.048828 0.08594s0.041016 0.04948 0.064453 0.07031 0.049316 0.03906 0.076172 0.05469c0.026855 0.01563 0.054687 0.02865 0.083984 0.03906 0.029297 0.01042 0.059082 0.01823 0.089844 0.02344 0.030762 0.0052 0.0625 0.0078 0.09375 0.0078s0.062988-0.0026 0.09375-0.0078 0.060547-0.01302 0.089844-0.02344 0.057129-0.02344 0.083984-0.03906c0.026855-0.01563 0.052734-0.03385 0.076172-0.05469 0.023437-0.02083 0.04541-0.04427 0.064453-0.07031s0.035156-0.05469 0.048828-0.08594c0.00684-0.01563 0.012268-0.0319 0.017578-0.04883s0.01001-0.0345 0.013672-0.05273c0.00366-0.01823 0.00787-0.03711 0.00977-0.05664 0.00189-0.01953 0.00195-0.03971 0.00195-0.06055v-0.82227h6v0.98633c0 0.02083 2e-3 0.04102 0.0039 0.06055s0.0042 0.03841 0.0078 0.05664c0.0037 0.01823 0.0084 0.03581 0.01367 0.05273 0.0053 0.01693 0.01074 0.0332 0.01758 0.04883 0.01367 0.03125 0.03174 0.0599 0.05078 0.08594s0.03906 0.04948 0.0625 0.07031 0.04932 0.03906 0.07617 0.05469c0.02686 0.01563 0.05469 0.02865 0.08399 0.03906 0.0293 0.01042 0.06104 0.01823 0.0918 0.02344 0.03076 0.0052 0.06055 0.0078 0.0918 0.0078s0.06299-0.0026 0.09375-0.0078 0.06055-0.01302 0.08984-0.02344c0.0293-0.01042 0.05908-0.02344 0.08594-0.03906 0.02686-0.01563 0.05078-0.03385 0.07422-0.05469 0.02344-0.02083 0.04541-0.04427 0.06445-0.07031s0.03516-0.05469 0.04883-0.08594c0.0068-0.01563 0.01422-0.0319 0.01953-0.04883 0.0053-0.01693 0.01001-0.0345 0.01367-0.05273 0.0037-0.01823 0.0059-0.03711 0.0078-0.05664s2e-3 -0.03971 2e-3 -0.06055v-1.4629c3.25e-4 -0.0078 0-0.01563 0-0.02344 0-0.03125-0.0026-0.06299-0.0078-0.09375s-0.01302-0.06055-0.02344-0.08984c-0.01042-0.0293-0.02344-0.05713-0.03906-0.08398-0.01563-0.02685-0.03385-0.05273-0.05469-0.07617-0.02083-0.02344-0.04427-0.04541-0.07031-0.06445s-0.05469-0.03516-0.08594-0.04883c-0.01563-0.0068-0.0319-0.01227-0.04883-0.01758-0.01693-0.0053-0.0345-0.01001-0.05273-0.01367-0.01823-0.0037-0.03711-0.0059-0.05664-0.0078s-0.03971-0.0039-0.06055-0.0039h-6.5z"/>  <path d="m11.555 11.903c0.01964 0 0.03768-0.0018 0.05469-0.0039 0.01701-0.0022 0.03407-0.0058 0.04883-0.0098s0.02813-0.0081 0.04102-0.01367c0.01289-0.0056 0.02571-0.01268 0.03711-0.01953 0.0228-0.01371 0.04144-0.02783 0.06055-0.04492 0.0191-0.01709 0.03819-0.03653 0.05664-0.05469 0.02448-0.02442 0.04609-0.05037 0.06445-0.07813 0.01836-0.02775 0.03268-0.05776 0.04492-0.08789s0.02122-0.06023 0.02734-0.0918c0.0061-0.03156 0.0098-0.06366 0.0098-0.0957 0-8e-3 4.38e-4 -0.01543 0-0.02344v-1.2988c0-0.02083-6.4e-5 -0.04102-2e-3 -0.06055-0.0019-0.01953-0.0061-0.03841-0.0098-0.05664s-0.0084-0.03581-0.01367-0.05273c-0.0053-0.01693-0.01074-0.0332-0.01758-0.04883-0.01367-0.03125-0.02979-0.0599-0.04883-0.08594s-0.04102-0.04948-0.06445-0.07031c-0.02344-0.02083-0.04932-0.03906-0.07617-0.05469s-0.05469-0.02865-0.08398-0.03906c-0.0293-0.01042-0.05908-0.01823-0.08984-0.02344-0.03076-0.0052-0.0625-0.0078-0.09375-0.0078s-0.06299 0.0026-0.09375 0.0078-0.06055 0.01302-0.08984 0.02344c-0.0293 0.01042-0.05713 0.02344-0.08398 0.03906-0.02685 0.01563-0.05273 0.03385-0.07617 0.05469-0.02344 0.02083-0.04541 0.04427-0.06445 0.07031s-0.03516 0.05469-0.04883 0.08594c-0.0068 0.01563-0.01227 0.0319-0.01758 0.04883-0.0053 0.01693-0.01001 0.0345-0.01367 0.05273-0.0037 0.01823-0.0079 0.03711-0.0098 0.05664s-0.0019 0.03971-0.0019 0.06055v0.82227h-6v-0.98633c0-0.02083-2e-3 -0.04102-0.0039-0.06055s-0.0042-0.03841-0.0078-0.05664c-0.0037-0.01823-0.0084-0.03581-0.01367-0.05273-0.0053-0.01693-0.01074-0.0332-0.01758-0.04883-0.01367-0.03125-0.03174-0.0599-0.05078-0.08594s-0.03906-0.04948-0.0625-0.07031-0.04932-0.03906-0.07617-0.05469c-0.02686-0.01563-0.05469-0.02865-0.08399-0.03906-0.0293-0.01042-0.06104-0.01823-0.0918-0.02344-0.03076-0.0052-0.06055-0.0078-0.0918-0.0078s-0.06299 0.0026-0.09375 0.0078-0.06055 0.01302-0.08984 0.02344c-0.0293 0.01042-0.05908 0.02344-0.08594 0.03906-0.02686 0.01563-0.05078 0.03385-0.07422 0.05469-0.02344 0.02083-0.04541 0.04427-0.06445 0.07031s-0.03516 0.05469-0.04883 0.08594c-0.0068 0.01563-0.01422 0.0319-0.01953 0.04883-0.0053 0.01693-0.01001 0.03451-0.01367 0.05273-0.0037 0.01823-0.0059 0.03711-0.0078 0.05664s-2e-3 0.03971-2e-3 0.06055v1.4629c-3.25e-4 0.0078 0 0.01563 0 0.02344 0 0.03125 0.0026 0.06299 0.0078 0.09375s0.01302 0.06055 0.02344 0.08984c0.01042 0.0293 0.02344 0.05713 0.03906 0.08398 0.01563 0.02685 0.03385 0.05273 0.05469 0.07617 0.02083 0.02344 0.04427 0.04541 0.07031 0.06445s0.05469 0.03516 0.08594 0.04883c0.01563 0.0068 0.0319 0.01227 0.04883 0.01758 0.01693 0.0053 0.0345 0.01001 0.05273 0.01367 0.01823 0.0037 0.03711 0.0059 0.05664 0.0078s0.03971 0.0039 0.06055 0.0039h6.5z"/></g></svg>', $h = '<svg style="height:46px;width:46px" version="1.1" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"> <path d="m15 2c0-0.55228-0.44772-1-1-1h-12c-0.55228 0-1 0.44772-1 1v12c0 0.55228 0.44772 1 1 1h12c0.55228 0 1-0.44772 1-1zm-15 0c0-1.1046 0.89543-2 2-2h12c1.1046 0 2 0.89543 2 2v12c0 1.1046-0.89543 2-2 2h-12c-1.1046 0-2-0.89543-2-2z" fill-rule="evenodd"/> <path d="m13.291 7.7876c-1.0729-2.491-3.0911-4.0365-5.2687-4.0365-2.1776 0-4.1958 1.5456-5.2687 4.0365a0.53112 0.53112 0 0 0 0 0.4249c1.0729 2.491 3.0911 4.0365 5.2687 4.0365 2.1776 0 4.1959-1.5456 5.2687-4.0365a0.53112 0.53112 0 0 0 0-0.4249zm-5.2687 3.3992c-1.6836 0-3.277-1.2163-4.1958-3.1867 0.91884-1.9705 2.5122-3.1867 4.1958-3.1867 1.6837 0 3.277 1.2163 4.1959 3.1867-0.91884 1.9705-2.5122 3.1867-4.1959 3.1867zm0-5.3112a2.1245 2.1245 0 1 0 2.1245 2.1245 2.1245 2.1245 0 0 0-2.1245-2.1245zm0 3.1867a1.0622 1.0622 0 1 1 1.0622-1.0622 1.0622 1.0622 0 0 1-1.0622 1.0622z" stroke-width=".53112"/></svg>', Uh = '<svg style="height:46px;width:46px" version="1.1" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"> <path d="m15 2c0-0.55228-0.44772-1-1-1h-12c-0.55228 0-1 0.44772-1 1v12c0 0.55228 0.44772 1 1 1h12c0.55228 0 1-0.44772 1-1zm-15 0c0-1.1046 0.89543-2 2-2h12c1.1046 0 2 0.89543 2 2v12c0 1.1046-0.89543 2-2 2h-12c-1.1046 0-2-0.89543-2-2z" fill-rule="evenodd"/> <path d="m13.291 7.7876c-1.0729-2.491-3.0911-4.0365-5.2687-4.0365-2.1776 0-4.1958 1.5456-5.2687 4.0365a0.53112 0.53112 0 0 0 0 0.4249c1.0729 2.491 3.0911 4.0365 5.2687 4.0365 2.1776 0 4.1959-1.5456 5.2687-4.0365a0.53112 0.53112 0 0 0 0-0.4249zm-5.2687 3.3992c-1.6836 0-3.277-1.2163-4.1958-3.1867 0.91884-1.9705 2.5122-3.1867 4.1958-3.1867 1.6837 0 3.277 1.2163 4.1959 3.1867-0.91884 1.9705-2.5122 3.1867-4.1959 3.1867zm0-5.3112a2.1245 2.1245 0 1 0 2.1245 2.1245 2.1245 2.1245 0 0 0-2.1245-2.1245zm0 3.1867a1.0622 1.0622 0 1 1 1.0622-1.0622 1.0622 1.0622 0 0 1-1.0622 1.0622z" stroke-width=".53112"/> <path d="m12.757 3.0055c-0.11087 0.0051358-0.22696 0.051177-0.33008 0.1543l-4.9883 4.9902c-0.061946 0.061947-0.086644 0.12038-0.097656 0.17773l-4.8184 4.8164c-0.1111 0.1111-0.1066 0.2109-0.10742 0.31445-3.5e-4 0.27663 0.22337 0.50035 0.5 0.5 0 0 0.18415 0.022881 0.33008-0.12305l4.9746-4.9727c0.06758-0.06758 0.10951-0.13979 0.13281-0.21289l4.7832-4.7832c0.36828-0.36828 0.017071-0.87967-0.37891-0.86133z" fill-rule="evenodd"/></svg>', Bh = '<svg class="ov-icon" width="46.08" height="46.08" version="1.1" viewBox="-1.6 -1.6 19.2 19.2"><path d="m14 15c0.55228 0 1-0.44772 1-1v-12c0-0.55228-0.44772-1-1-1h-12c-0.55228 0-1 0.44772-1 1v12c0 0.55228 0.44772 1 1 1zm0-15c1.1046 0 2 0.89543 2 2v12c0 1.1046-0.89543 2-2 2h-12c-1.1046 0-2-0.89543-2-2v-12c0-1.1046 0.89543-2 2-2z" fill-rule="evenodd"/><g transform="translate(-1.1585)" fill-rule="evenodd">  <path d="m8.2964 7.5-2.147-2.146c-0.472-0.472 0.236-1.18 0.708-0.708l3 3c0.19586 0.19536 0.19586 0.51264 0 0.708l-3 3c-0.472 0.472-1.18-0.236-0.708-0.708l2.147-2.146c0.41729-0.4311 0.42302-0.5239 0-1z"/>  <path d="m12.323 4.4996c0-0.66667-1-0.66667-1 0v7.0562c0 0.15712 0.07336 0.22403 0.146 0.29783 0.19536 0.19586 0.51264 0.19586 0.708 0 0 0 0.146-0.11381 0.146-0.32019z"/></g></svg>', Vh = '<svg class="ov-icon" width="46.08" height="46.08" version="1.1" viewBox="-1.6 -1.6 19.2 19.2"><path d="m2 15c-0.55228 0-1-0.44772-1-1v-12c0-0.55228 0.44772-1 1-1h12c0.55228 0 1 0.44772 1 1v12c0 0.55228-0.44772 1-1 1zm0-15c-1.1046 0-2 0.89543-2 2v12c0 1.1046 0.89543 2 2 2h12c1.1046 0 2-0.89543 2-2v-12c0-1.1046-0.89543-2-2-2z" fill-rule="evenodd"/><g transform="matrix(-1 0 0 1 17.159 0)" fill-rule="evenodd">  <path d="m8.2964 7.5-2.147-2.146c-0.472-0.472 0.236-1.18 0.708-0.708l3 3c0.19586 0.19536 0.19586 0.51264 0 0.708l-3 3c-0.472 0.472-1.18-0.236-0.708-0.708l2.147-2.146c0.41729-0.4311 0.42302-0.5239 0-1z"/>  <path d="m12.323 4.4996c0-0.66667-1-0.66667-1 0v7.0562c0 0.15712 0.07336 0.22403 0.146 0.29783 0.19536 0.19586 0.51264 0.19586 0.708 0 0 0 0.146-0.11381 0.146-0.32019z"/></g></svg>', zh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 336.96 336.36" xmlns="http://www.w3.org/2000/svg"><path d="m0 0 168.48 336.36 168.48-336.36z"/></svg>', Wh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 336.96 336.36" xmlns="http://www.w3.org/2000/svg"><path d="m0 336.36 168.48-336.36 168.48 336.36z"/></svg>', Fh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m512 256c0 70.67-28.66 134.68-74.99 181.01s-110.34 74.99-181.01 74.99c-70.68 0-134.69-28.66-181.01-74.99-46.33-46.33-74.99-110.34-74.99-181.01 0-70.68 28.66-134.69 74.99-181.01 46.32-46.33 110.33-74.99 181.01-74.99 70.67 0 134.68 28.66 181.01 74.99 46.33 46.32 74.99 110.33 74.99 181.01zm-204.29-21.97v-67.04c0-7.53-6.19-13.72-13.73-13.72h-75.96c-7.53 0-13.72 6.17-13.72 13.72v67.03h-42.84c-16.5 0-24.78 19.64-13.86 31.54l94.74 110.57c7.44 9 21.03 9.01 28.66 0.37l93.71-111.31c10.69-12.27 1.64-31.14-14.19-31.16h-42.81zm105.52 179.2c40.22-40.24 65.11-95.84 65.11-157.23 0-61.4-24.89-117-65.11-157.23-40.24-40.23-95.84-65.11-157.23-65.11-61.4 0-117 24.88-157.23 65.11s-65.11 95.83-65.11 157.23c0 61.39 24.88 116.99 65.11 157.23 40.23 40.22 95.83 65.11 157.23 65.11 61.39 0 116.99-24.89 157.23-65.11z" fill-rule="nonzero"/></svg>', Gh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m512 256c0-70.67-28.66-134.68-74.99-181.01s-110.34-74.99-181.01-74.99c-70.68 0-134.69 28.66-181.01 74.99-46.33 46.33-74.99 110.34-74.99 181.01 0 70.68 28.66 134.69 74.99 181.01 46.32 46.33 110.33 74.99 181.01 74.99 70.67 0 134.68-28.66 181.01-74.99 46.33-46.32 74.99-110.33 74.99-181.01zm-204.29 21.97v67.04c0 7.53-6.19 13.72-13.73 13.72h-75.96c-7.53 0-13.72-6.17-13.72-13.72v-67.03h-42.84c-16.5 0-24.78-19.64-13.86-31.54l94.74-110.57c7.44-9 21.03-9.01 28.66-0.37l93.71 111.31c10.69 12.27 1.64 31.14-14.19 31.16zm105.52-179.2c40.22 40.24 65.11 95.84 65.11 157.23 0 61.4-24.89 117-65.11 157.23-40.24 40.23-95.84 65.11-157.23 65.11-61.4 0-117-24.88-157.23-65.11s-65.11-95.83-65.11-157.23c0-61.39 24.88-116.99 65.11-157.23 40.23-40.22 95.83-65.11 157.23-65.11 61.39 0 116.99 24.89 157.23 65.11z" fill-rule="nonzero"/></svg>', Yh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M512 256c0-70.67-28.66-134.68-74.98-181.02C390.69 28.66 326.68 0 256 0S121.31 28.66 74.98 74.98C28.66 121.32 0 185.33 0 256c0 70.68 28.66 134.69 74.98 181.02C121.31 483.34 185.32 512 256 512c70.67 0 134.69-28.66 181.02-74.98C483.34 390.69 512 326.68 512 256zm-160.23-21.5h-43.38v-67.93c0-7.63-6.27-13.9-13.91-13.9H217.5c-7.62 0-13.9 6.25-13.9 13.9v67.92h-43.41c-16.71 0-25.11 19.9-14.05 31.96l96.01 112.05c7.54 9.12 21.31 9.12 29.04.37l94.96-112.8c10.83-12.43 1.66-31.55-14.38-31.57z"/></svg>', qh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m512 256c0 70.67-28.66 134.68-74.98 181.02-46.33 46.32-110.34 74.98-181.02 74.98s-134.69-28.66-181.02-74.98c-46.32-46.34-74.98-110.35-74.98-181.02 0-70.68 28.66-134.69 74.98-181.02 46.33-46.32 110.34-74.98 181.02-74.98 70.67 0 134.69 28.66 181.02 74.98 46.32 46.33 74.98 110.34 74.98 181.02zm-160.23 21.5h-43.38v67.93c0 7.63-6.27 13.9-13.91 13.9h-76.98c-7.62 0-13.9-6.25-13.9-13.9v-67.92h-43.41c-16.71 0-25.11-19.9-14.05-31.96l96.01-112.05c7.54-9.12 21.31-9.12 29.04-0.37l94.96 112.8c10.83 12.43 1.66 31.55-14.38 31.57z"/></svg>', Xh = '<svg width="800px" height="800px" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">  <defs>   <clipPath id="clipPath1">    <path d="m6.1885 15.281v-9.0209h3.1721q1.0764 0 1.6765 0.65299 0.63822 0.71345 0.63822 1.7171 0 0.58043-0.22862 1.0158-0.21909 0.42323-0.743 0.84646 1.1812 0.87065 1.1812 2.1887 0 0.53206-0.19051 1.0762-0.19051 0.53206-0.51439 0.87065-0.60964 0.65299-1.7908 0.65299zm1.467-7.4731v2.0315h1.5813q1.0383 0 1.0383-1.0158 0-1.0158-1.0383-1.0158zm0 3.5793v2.3459h1.7432q1.0859 0 1.0859-1.1609 0-1.185-1.0859-1.185zm9.6876-5.1271h1.467v6.1066q0 1.4874-0.69538 2.2854-0.80016 0.91902-2.1242 0.91902t-2.1242-0.91902q-0.69538-0.79809-0.69538-2.2854v-6.1066h1.4574v6.1066q0 1.6083 1.3622 1.6083 1.3526 0 1.3526-1.6083zm6.2108 5.6834v3.3375h-1.467v-3.3375l-2.3528-5.6834h1.6289l1.4479 3.9784 1.3622-3.9784h1.6384z" display="none" stroke-width=".041213" style="white-space:pre" aria-label="BUY"/>    <path class="powerclip" d="m-5-5h42v42.001h-42zm11.189 20.281h3.2006q1.1812 0 1.7908-0.65299 0.32387-0.33859 0.51439-0.87065 0.19051-0.54416 0.19051-1.0762 0-1.3181-1.1812-2.1887 0.52391-0.42323 0.743-0.84646 0.22862-0.43532 0.22862-1.0158 0-1.0037-0.63822-1.7171-0.60012-0.65299-1.6765-0.65299h-3.1721zm1.467-7.4731v2.0315h1.5813q1.0383 0 1.0383-1.0158 0-1.0158-1.0383-1.0158zm0 3.5793v2.3459h1.7432q1.0859 0 1.0859-1.1609 0-1.185-1.0859-1.185zm9.6876-5.1271v6.1066q0 1.6083-1.3526 1.6083-1.3622 0-1.3622-1.6083v-6.1066h-1.4574v6.1066q0 1.4874 0.69538 2.2854 0.80016 0.91902 2.1242 0.91902t2.1242-0.91902q0.69538-0.79809 0.69538-2.2854v-6.1066zm6.2108 5.6834 2.2576-5.6834h-1.6384l-1.3622 3.9784-1.4479-3.9784h-1.6289l2.3528 5.6834v3.3375h1.467z" stroke-width=".041213" style="white-space:pre"/>   </clipPath>  </defs>  <g clip-path="url(#clipPath1)" fill="none" fill-rule="evenodd">   <g id="Icon-Set" transform="translate(-360 -255)" fill="#000">    <path d="m386.67 255h-21.334c-2.945 0-5.333 2.371-5.333 5.297v12.33c0 2.924 2.055 4.813 5 4.813h6.639l4.361 9.561 4.361-9.561h6.639c2.945 0 5-1.889 5-4.813v-12.33c0-2.926-2.388-5.297-5.333-5.297z"/>   </g>  </g> </svg>', jh = '<svg width="800px" height="800px" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">  <defs>   <clipPath id="clipPath4">    <path d="m10.026 8.6238h-1.2531q-0.06962-1.4148-1.3576-1.4148-0.51344 0-0.81803 0.30231-0.30458 0.30231-0.30458 0.81019 0 0.49579 0.25237 0.74972 0.26107 0.24185 0.97467 0.43532l1.0182 0.26603q0.90505 0.24185 1.3054 0.83437 0.40901 0.59252 0.40901 1.6566 0 1.3785-0.7049 2.1524-0.69619 0.77391-1.958 0.77391-1.2444 0-1.9406-0.76182-0.68749-0.77391-0.74841-2.225h1.2967q0.03481 0.72554 0.40901 1.1125t1.053 0.38696q0.60917 0 0.95727-0.32649 0.3568-0.32649 0.3568-0.89483 0-0.54416-0.27848-0.83437-0.27848-0.30231-0.94856-0.4716l-0.90505-0.25394q-0.99208-0.26603-1.4098-0.81019-0.41772-0.55625-0.41772-1.6083 0-1.3181 0.64398-2.0436 0.65268-0.73763 1.8188-0.73763 1.4185 0 2.0886 1.0278 0.46123 0.71345 0.46123 1.8743zm2.5672 2.3822v2.3459h3.5245v1.5478h-4.8559v-9.0209h4.6993v1.5478h-3.3678v2.0315h3.1155v1.5478zm5.9612-5.1271v7.4731h3.1068v1.5478h-4.4469v-9.0209zm5.439 0v7.4731h3.1068v1.5478h-4.4469v-9.0209z" display="none" stroke-width=".039392" style="white-space:pre" aria-label="SELL"/>    <path class="powerclip" d="m-5-5h42v42.001h-42zm15.026 13.624q0-1.1609-0.46123-1.8743-0.67009-1.0278-2.0886-1.0278-1.1661 0-1.8188 0.73763-0.64398 0.72554-0.64398 2.0436 0 1.052 0.41772 1.6083 0.41772 0.54416 1.4098 0.81019l0.90505 0.25394q0.67009 0.16929 0.94856 0.4716 0.27848 0.29022 0.27848 0.83437 0 0.56834-0.3568 0.89483-0.3481 0.32649-0.95727 0.32649-0.67879 0-1.053-0.38696-0.3742-0.38695-0.40901-1.1125h-1.2967q0.060917 1.4511 0.74841 2.225 0.69619 0.76182 1.9406 0.76182 1.2619 0 1.958-0.77391 0.7049-0.77391 0.7049-2.1524 0-1.0641-0.40901-1.6566-0.40031-0.59252-1.3054-0.83437l-1.0182-0.26603q-0.7136-0.19348-0.97467-0.43532-0.25237-0.25394-0.25237-0.74972 0-0.50788 0.30458-0.81019t0.81803-0.30231q1.288 0 1.3576 1.4148zm2.5672 2.3822h3.1155v-1.5478h-3.1155v-2.0315h3.3678v-1.5478h-4.6993v9.0209h4.8559v-1.5478h-3.5245zm5.9612-5.1271h-1.3402v9.0209h4.4469v-1.5478h-3.1068zm5.439 0h-1.3402v9.0209h4.4469v-1.5478h-3.1068z" stroke-width=".039392" style="white-space:pre"/>   </clipPath>  </defs>  <path d="m26.667 0h-21.334c-2.945 0-5.333 2.371-5.333 5.297v12.33c0 2.924 2.055 4.813 5 4.813h6.639l4.361 9.561 4.361-9.561h6.639c2.945 0 5-1.889 5-4.813v-12.33c0-2.926-2.388-5.297-5.333-5.297z" clip-path="url(#clipPath4)" fill-rule="evenodd"/> </svg>', Kh = '<svg width="493px" height="512px" clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 493 511.77" xmlns="http://www.w3.org/2000/svg"><path d="m33.11 458.2 104.5-79.1c3.09-3 7.08-4.47 11.08-4.45l302.6-0.08c2.67 0 5.09-1.08 6.78-2.77 1.74-1.81 2.84-4.24 2.84-6.87v-323.2c0-2.59-1.12-5-2.86-6.74-1.78-1.78-4.2-2.9-6.76-2.9h-409.56c-2.54 0-4.94 1.14-6.72 2.92s-2.92 4.18-2.92 6.72c0 793.72 1.02 39.329 1.02 416.47zm90.6-229.77c10.9 0 19.74 8.85 19.74 19.74s-8.84 19.73-19.74 19.73c-10.89 0-19.73-8.84-19.73-19.73s8.84-19.74 19.73-19.74zm0-101.14c10.9 0 19.74 8.85 19.74 19.74s-8.84 19.74-19.74 19.74c-10.89 0-19.73-8.85-19.73-19.74s8.84-19.74 19.73-19.74zm61.72 138.89c-9.95 0-18.02-8.07-18.02-18.01 0-9.95 8.07-18.02 18.02-18.02h185.56c9.95 0 18.01 8.07 18.01 18.02 0 9.94-8.06 18.01-18.01 18.01zm0-101.13c-9.95 0-18.02-8.07-18.02-18.02 0-9.94 8.07-18.01 18.02-18.01h185.56c9.95 0 18.01 8.07 18.01 18.01 0 9.95-8.06 18.02-18.01 18.02zm-30.38 241.61-125.97 99.69c-2.96 3.32-7.24 5.42-12.01 5.42-8.85 0-17.07-7.1228-17.07-15.963v-454.08c0-11.4 4.77-21.88 12.31-29.42s18.02-12.31 29.42-12.31h409.56c11.4 0 21.9 4.74 29.45 12.29 7.5 7.51 12.26 17.96 12.26 29.44v323.2c0 11.48-4.7 21.95-12.24 29.49-7.61 7.54-18.05 12.24-29.47 12.24z" fill-rule="nonzero"/></svg>', Zh = '<svg width="800px" height="800px" fill="none" version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m15.746 2.7281c-5.1207-2.0689-10.949 0.40512-13.018 5.5258-2.0689 5.1207 0.40512 10.949 5.5258 13.018 5.1207 2.0689 10.949-0.40508 13.018-5.5258 2.0689-5.1207-0.40508-10.949-5.5258-13.018zm-1.3378 8.3035-1.2703-0.51325c-0.21854-0.08829-0.32785-0.13246-0.3683-0.22775-0.04045-0.09529 0.0037-0.20461 0.09201-0.42314l1.6595-4.1073c0.33362-0.82575 0.50047-1.2387 0.33474-1.3523-0.16582-0.11359-0.49058 0.19103-1.1403 0.8003l-4.7426 4.4469c-1.0274 0.96338-1.541 1.445-1.4405 1.9835 0.10054 0.53837 0.75347 0.80216 2.0594 1.3298l1.2703 0.51325c0.21854 0.08829 0.32785 0.13246 0.3683 0.22775 0.04045 0.09529-0.0037 0.20461-0.09201 0.42314l-1.6595 4.1073c-0.33365 0.82582-0.50047 1.2387-0.33475 1.3523 0.16582 0.1136 0.49059-0.19104 1.1403-0.80025l4.7425-4.4469c1.0275-0.96346 1.5411-1.4451 1.4406-1.9836-0.10057-0.53838-0.75352-0.80218-2.0594-1.3298z" clip-rule="evenodd" fill-rule="evenodd"/></svg>', Qh = '<svg enable-background="new 0 0 100 100" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">  <g>   <rect transform="scale(-1)" x="-15" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-36.25" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.1s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-57.5" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.3s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-78.75" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.5s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-100" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.1s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>  </g> </svg>', Jh = '<svg version="1.1" id="L7" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">   <path fill="#fff" d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7  c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z">      <animateTransform         attributeName="transform"         attributeType="XML"         type="rotate"         dur="3s"         from="0 50 50"         to="360 50 50"         repeatCount="indefinite" />  </path> <path fill="#fff" d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5  L82,35.7z">      <animateTransform         attributeName="transform"         attributeType="XML"         type="rotate"         dur="2s"         from="0 50 50"         to="360 50 50"         repeatCount="indefinite" />  </path>   <path fill="#fff" d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3  c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z">      <animateTransform         attributeName="transform"         attributeType="XML"         type="rotate"         dur="1s"         from="0 50 50"         to="360 50 50"         repeatCount="indefinite" />  </path></svg>', Ye = 300, Yt = 400, ec = `${Yt}px`, Qr = `${Ye}px`, Jr = "100%", eo = "100%", Ge = 30, at = 35, Di = 25, to = 25, Ts = Di + to, Kt = 60, ft = "normal", yt = 12, ss = "normal", vt = "Avenir, Helvetica, Arial, sans-serif", Ks = "#141414", Zs = "#333", Qs = "#cccccc", Zt = "#888888", Ct = "#cccccc", io = "25px", tc = "position: relative;", B = {
  COLOUR_BG: Ks,
  COLOUR_BORDER: Zs,
  COLOUR_TXT: Qs,
  COLOUR_ICON: Zt,
  COLOUR_ICONHOVER: Ct,
  BORDER_THICKNESS: 0,
  FONTWEIGHT: ft,
  FONTSIZE: yt,
  FONTSTYLE: ss,
  FONTFAMILY: vt,
  FONT: `${ss} ${yt}px ${ft} ${vt}`,
  FONTSTRING: `font-style: ${ss}; font-size: ${yt}px; font-weight: ${ft}; font-family: ${vt};`
}, Ee = {
  fontSize: yt,
  fontWeight: ft,
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
}, Je = {
  COLOUR_ICON: Zt,
  COLOUR_ICONHOVER: Ct,
  ICONSIZE: io
}, wt = {
  COLOUR_ICON: Zt,
  COLOUR_ICONHOVER: Ct,
  ICONSIZE: io
}, ns = {
  COLOUR_BG: Ks,
  COLOUR_BORDER: Zs,
  COLOUR_TXT: Qs
}, Si = {
  COLOUR_BG: Ks,
  COLOUR_BORDER: Zs,
  COLOUR_TXT: Qs,
  SHADOW: "rgb(0,0,0) 0px 20px 30px -10px",
  CONTENT: "padding: 1em",
  TITLE: "padding: 2px 1em 5px; background: #333; white-space: nowrap;"
}, ic = {
  FILL: Ct + "88"
}, ee = {
  CANDLE_SOLID: "candle_solid",
  CANDLE_HOLLOW: "candle_hollow",
  CANDLE_UP_HOLLOW: "candle_up_hollow",
  CANDLE_DOWN_HOLLOW: "candle_down_hollow",
  OHLC: "ohlc",
  AREA: "area",
  LINE: "line"
}, gi = {
  COLOUR_CANDLE_UP: "#00F04088",
  COLOUR_CANDLE_DN: "#F0004088",
  COLOUR_WICK_UP: "#0F4",
  COLOUR_WICK_DN: "#F04"
}, Ei = {
  COLOUR_VOLUME_UP: "#00F04044",
  COLOUR_VOLUME_DN: "#F0004044",
  ONCHART_VOLUME_HEIGHT: 15
}, rr = ft, Pi = yt, Mi = vt, Re = {
  COLOUR_TICK: "#888",
  COLOUR_LABEL: "888",
  COLOUR_CURSOR: "#000",
  COLOUR_CURSOR_BG: "#CCC",
  FONTFAMILY: Mi,
  FONTSIZE: Pi,
  FONTWEIGHT: rr,
  FONT_LABEL: `${rr} ${Pi}px ${Mi}`,
  FONT_LABEL_BOLD: `bold ${Pi}px ${Mi}`
}, or = ft, ar = yt, lr = vt, rt = {
  COLOUR_TICK: "#888",
  COLOUR_LABEL: "888",
  COLOUR_CURSOR: "#000",
  COLOUR_CURSOR_BG: "#CCC",
  FONTFAMILY: lr,
  FONTSIZE: ar,
  FONTWEIGHT: or,
  FONT_LABEL: `${or} ${ar}px ${lr}`,
  FONT_LABEL_BOLD: `bold ${Pi}px ${Mi}`
}, so = {
  COLOUR_GRID: "#222"
}, sc = {
  width: 1,
  stroke: "#ccc",
  dash: [1, 1]
}, rs = {
  text: B.FONTSTRING,
  font: B.FONT,
  colour: B.COLOUR_TXT
}, fi = {
  ACTIVE: "#888888C0",
  IDLE: "#FFFFFF00",
  LINE: B.COLOUR_BORDER,
  STYLE: "1px solid"
}, nc = {
  FONTSIZE: 50,
  FONTWEIGHT: "bold",
  FONTFAMILY: B.FONTFAMILY,
  COLOUR: "#181818",
  IMGWIDTH: "200",
  IMGHEIGHT: "200"
}, rc = {
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
}, os = { arrowDown: zh, arrowUp: Wh, arrowDownRound: Fh, arrowUpRound: Gh, arrowDownRoundSolid: Yh, arrowUpRoundSolid: qh, buySolid: Xh, sellSolid: jh }, hr = { noteSolid: Kh, lightning: Zh }, Vi = {
  candle: {
    Type: ee.CANDLE_SOLID,
    UpBodyColour: gi.COLOUR_CANDLE_UP,
    UpWickColour: gi.COLOUR_WICK_UP,
    DnBodyColour: gi.COLOUR_CANDLE_DN,
    DnWickColour: gi.COLOUR_WICK_DN
  },
  volume: {
    Height: Ei.ONCHART_VOLUME_HEIGHT,
    UpColour: Ei.COLOUR_VOLUME_UP,
    DnColour: Ei.COLOUR_VOLUME_DN
  },
  xAxis: {
    colourTick: rt.COLOUR_TICK,
    colourLabel: rt.COLOUR_LABEL,
    colourCursor: rt.COLOUR_CURSOR,
    colourCursorBG: rt.COLOUR_CURSOR_BG,
    fontFamily: rt.FONTFAMILY,
    fontSize: rt.FONTSIZE,
    fontWeight: rt.FONTWEIGHT,
    line: "#656565",
    slider: "#555555",
    handle: "#55555588",
    icon: Zt,
    iconHover: Ct
  },
  yAxis: {
    colourTick: Re.COLOUR_TICK,
    colourLabel: Re.COLOUR_LABEL,
    colourCursor: Re.COLOUR_CURSOR,
    colourCursorBG: Re.COLOUR_CURSOR_BG,
    fontFamily: Re.FONTFAMILY,
    fontSize: Re.FONTSIZE,
    fontWeight: Re.FONTWEIGHT,
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
    GridColour: so.COLOUR_GRID
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
    font: rs.font,
    colour: "#96a9db",
    handleColour: "#586ea6"
  },
  legend: {
    font: rs.font,
    colour: rs.colour,
    controls: !0,
    controlsColour: "#aaa",
    controlsOver: "#fff",
    controlsW: 18,
    controlsH: 18
  },
  icon: {
    colour: Zt,
    hover: Ct
  },
  divider: {
    active: fi.ACTIVE,
    idle: fi.IDLE,
    line: fi.LINE,
    style: fi.STYLE
  },
  window: Si,
  watermark: nc,
  trades: {
    iconBuy: os.arrowUp,
    iconSell: os.arrowDown,
    iconHeight: 30,
    iconWidth: 30,
    iconMinDim: 10,
    buyColour: "#0f0",
    sellColour: "#f00",
    defaultIcons: os,
    offset: 10
  },
  events: {
    iconEvent: hr.lightning,
    iconHeight: 30,
    iconWidth: 30,
    iconMinDim: 10,
    iconColour: "#ccc",
    defaultIcons: hr,
    offset: 10
  },
  drawing: {
    node: rc
  }
}, oc = `
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
</style>`, ac = `
<style>
  tradex-chart {
    display: flex;
    width: var(--txc-width, 100%);
    height: var(--txc-height, 100%);
    min-width: var(--txc-min-width, ${ec});
    min-height: var(--txc-min-height, ${Qr});
    max-width: var(--txc-max-width, ${Jr});
    max-height: var(--txc-max-height, ${eo});
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
`, as = "Empty", lc = {
  id: void 0,
  title: as,
  symbol: as,
  width: Jr,
  height: eo,
  utils: {},
  tools: {},
  timeFrame: "1m",
  range: {
    startTS: void 0
  },
  theme: Vi,
  watermark: {
    display: !1,
    text: as
  },
  trades: {
    display: !0,
    displayInfo: !0
  },
  precision: Ga,
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
function hc(a, i) {
  return a = Math.ceil(a) + 1, i = Math.floor(i), Math.floor(Math.random() * (i - a) + a);
}
function Ss(a) {
  const i = {};
  return i.value = a, i.sign = !!a, i.integers = no(a), i.decimals = ro(a), i.total = i.integers + i.decimals, i;
}
function no(a) {
  return (Math.log10((a ^ a >> 31) - (a >> 31)) | 0) + 1;
}
function cc(a) {
  return a | 0;
}
function pe(a, i = 0) {
  var s = a * Math.pow(10, i), n = Math.round(s), r = (s > 0 ? s : -s) % 1 === 0.5 ? n % 2 === 0 ? n : n - 1 : n;
  return r / Math.pow(10, i);
}
function ro(a) {
  if (typeof a != "number" && (a = parseFloat(a)), isNaN(a) || !isFinite(a))
    return 0;
  for (var i = 1, s = 0; Math.round(a * i) / i !== a && (i *= 10, i !== 1 / 0); )
    s++;
  return s;
}
function Es(a, i = 18) {
  let { sign: s, integers: n, decimals: r, value: o } = a;
  i = isNaN(i) ? 18 : i, r = r > i ? i : r, o = new Number(o).toFixed(r);
  let l = `${o}`, h = "", c = 0, p = 0;
  return s = s ? 0 : 1, s > 0 && (h += "-", c++), n == 0 ? (h += "0", c++) : (h += l.slice(c, n), c += n), r != 0 && (h += `${l.slice(c)}`, n <= 1 ? p = r : n > 3 ? p = 2 : n >= 2 && (p = 4)), h = Number.parseFloat(h).toFixed(p), h;
}
function uc(a) {
  return Math.log(a) / Math.log(10);
}
function _(a, i, s) {
  return Math.min(s, Math.max(i, a));
}
class oo {
  #e;
  #t;
  #s;
  constructor(i) {
    this.#t = i, this.#e = this.#t.core, this.#s = this.#e.Chart;
  }
  get core() {
    return this.#e;
  }
  get chart() {
    return this.#s;
  }
  get parent() {
    return this.#t;
  }
  get theme() {
    return this.#e.theme;
  }
  get width() {
    return this.#s.width;
  }
  get height() {
    return this.#s.height;
  }
  get data() {
    return this.#s.data;
  }
  get range() {
    return this.#s.range;
  }
  get yDigits() {
    return this.#s.yAxisDigits;
  }
  float2Int(i) {
    return cc(i);
  }
  numDigits(i) {
    return no(i);
  }
  countDigits(i) {
    return Ss(i);
  }
  precision(i) {
    return ro(i);
  }
}
class Li extends oo {
  #e = 4;
  #t;
  #s = !0;
  constructor(i) {
    super(i);
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
    return pe(this.core.Chart.layerWidth / this.candleW);
  }
  get xAxisRatio() {
    return this.width / this.range.rangeDuration;
  }
  set xAxisTicks(i) {
    this.#e = T(i) ? i : 0;
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
  xPos(i) {
    return pe(this.range.rangeIndex(i) * this.candleW + this.candleW * 0.5);
  }
  t2Index(i) {
    return this.range.rangeIndex(i);
  }
  t2Pixel(i) {
    return this.xPos(i);
  }
  pixel2T(i) {
    let s = this.pixel2Index(i);
    return this.range.value(s)[0];
  }
  pixel2Index(i) {
    i -= this.candleW / 2;
    let s = this.range.indexStart, n = pe(i / this.candleW);
    return s + n;
  }
  pixelOHLCV(i) {
    let s = this.pixel2Index(i);
    return this.range.value(s);
  }
  xPosSnap2CandlePos(i) {
    let s = i % this.candleW, n = s ? this.candleW / 2 : 0;
    return pe(i - s + n);
  }
  xPos2Time(i) {
    return this.pixel2T(i);
  }
  xPos2Index(i) {
    return this.pixel2Index(i);
  }
  xPosOHLCV(i) {
    return this.pixelOHLCV(i);
  }
  initXAxisGrads() {
    this.#t = this.calcXAxisGrads();
  }
  doCalcXAxisGrads(i) {
    this.#t = this.calcXAxisGrads(i);
  }
  calcXAxisGrads(i = this.range.snapshot()) {
    const s = {
      entries: {},
      values: [],
      major: [],
      minor: []
    }, n = Vs(i.rangeDuration);
    s.units = n;
    for (let f in n)
      if (n[f] > 0) {
        s.units = [f, f], s.timeSpan = `${n[f]} ${f}`;
        break;
      }
    const r = i.interval, { xStep: o, rank: l } = this.xStep(i), h = this.pixel2T(this.width) + o;
    let c = i.timeMin - i.timeMin % o - o, p = c;
    for (; c < h; ) {
      let f = Ci(c, "years"), x = Ci(c, "months"), P = Ci(c, "days");
      !(f in s.entries) && f >= p ? s.entries[f] = [this.dateTimeValue(f, r, l), this.t2Pixel(f), f, "major"] : !(x in s.entries) && x >= p ? s.entries[x] = [this.dateTimeValue(x, r, l), this.t2Pixel(x), x, "major"] : !(P in s.entries) && P >= p && (s.entries[P] = [this.dateTimeValue(P, r, l), this.t2Pixel(P), P, "major"]), s.entries[c] = [this.dateTimeValue(c, r, l), this.t2Pixel(c), c, "minor"], c += o;
    }
    return s.values = Object.values(s.entries), s;
  }
  xStep(i) {
    let s = vh, n = this.#s ? i.interval : 1, r = Vt[0], o = pe(this.width / i.Length), l = vs[0], h = Vt.indexOf(n);
    for (; h-- >= 0 && !(o * (Vt[h] / n) >= s); )
      ;
    return r = Vt[h], l = vs[h], { xStep: r, rank: l };
  }
  dateTimeValue(i, s, n) {
    if (i / z % 1 === 0) {
      const r = Gs(i);
      return r === 1 ? Ys(i) === 0 ? Xr(i) : Yr(i) : r;
    } else
      switch (n) {
        case "milliseconds":
          return bs(i);
        case "seconds":
          return bs(i);
        case "minutes":
          return xs(i);
        case "hours":
          return xs(i);
      }
  }
}
class Ai extends oo {
  #e;
  #t;
  #s;
  #r = qe[0];
  #n = "automatic";
  #i = {
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
  #a = Zn;
  #c = yh;
  #l = 3;
  #h;
  #d;
  #u;
  constructor(i, s, n = qe[0], r) {
    super(i), this.#s = s, this.#t = i, this.#e = i.parent, this.yAxisType = n, r = r || this.core.range, this.setRange(r);
  }
  get chart() {
    return this.#s;
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
  set yAxisPadding(i) {
    this.#o = i;
  }
  get yAxisPadding() {
    return this.#o;
  }
  set yAxisType(i) {
    this.#r = qe.includes(i) ? i : qe[0];
  }
  get yAxisType() {
    return this.#r;
  }
  set yAxisStep(i) {
    this.#a = T(i) ? i : Zn;
  }
  get yAxisStep() {
    return this.#a;
  }
  set yAxisTicks(i) {
    this.#l = T(i) ? i : 0;
  }
  get yAxisTicks() {
    return this.#l;
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
  set mode(i) {
    this.setMode(i);
  }
  get mode() {
    return this.#n;
  }
  set offset(i) {
    this.setOffset(i);
  }
  get offset() {
    return this.#u.offset;
  }
  set zoom(i) {
    this.setZoom(i);
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
  yAxisCntDigits(i) {
    return this.countDigits(i);
  }
  yAxisCalcPrecision() {
    let i = this.numDigits(this.#u.max);
    return this.yDigits - i;
  }
  yAxisCursor() {
  }
  yPos(i) {
    switch (this.yAxisType) {
      case "percent":
        return pe(this.p100toPixel(i));
      case "log":
        return pe(this.$2Pixel(uc(i)));
      default:
        return pe(this.$2Pixel(i));
    }
  }
  yPos2Price(i) {
    return this.pixel2$(i);
  }
  $2Pixel(i) {
    const s = i - this.#u.min;
    return this.height - s * this.yAxisRatio;
  }
  lastYData2Pixel(i) {
    let s = i - this.core.stream.lastPriceMin;
    return this.height - s * this.yAxisRatio;
  }
  pixel2$(i) {
    let s = (this.height - i) / this.height, n = this.#u.diff * s;
    return this.#u.min + n;
  }
  p100toPixel(i) {
    let s = this.#u.max, n = this.height / (s - this.#u.min);
    return Math.floor(s - this.#u.max), (i - s) * -1 * n;
  }
  yAxisTransform() {
  }
  setMode(i) {
    if (!["automatic", "manual"].includes(i))
      return !1;
    const s = this.#i;
    return this.mode == "automatic" && i == "manual" ? (s.manual.zoom = 0, s.manual.max = this.#u.valueMax, s.manual.min = this.#u.valueMin, this.#n = i, this.core.emit("yaxis_setmode", { mode: i, axis: this })) : this.mode == "manual" && i == "automatic" && (s.manual.zoom = 0, this.#n = i, this.core.emit("yaxis_setmode", { mode: i, axis: this })), !0;
  }
  setOffset(i) {
    if (!T(i) || i == 0 || this.#n !== "manual")
      return !1;
    const s = this.#i;
    let n = this.pixel2$(i * -1), r = this.pixel2$(this.height - i), o = n - r;
    s.manual.min = r, s.manual.max = n, s.manual.mid = o / 2, s.manual.diff = o, s.manual.zoom = 0;
  }
  setZoom(i) {
    if (!T(i) || this.#n !== "manual")
      return !1;
    const s = this.#i;
    let n = s.manual.min, r = s.manual.max;
    const o = r - n, l = o * 0.01, h = i * l;
    n -= h, r += h, !(r < n || n <= 1 / 0 * -1 || r >= 1 / 0) && (s.manual.max = r, s.manual.min = n, s.manual.mid = o / 2, s.manual.diff = o, s.manual.zoom = h, this.calcGradations());
  }
  setRange(i) {
    this.#i.automatic.range = i, this.#u = new Proxy(i, {
      get: (s, n) => {
        const r = this.#n, o = this.#i;
        switch (n) {
          case "max":
            return o[r][n];
          case "min":
            return o[r][n];
          case "mid":
            return o[r][n];
          case "diff":
            return o[r][n];
          case "zoom":
            return o[r][n];
          case "offset":
            return o[r][n];
          default:
            return s[n];
        }
      }
    });
  }
  calcGradations() {
    let i, s, n;
    switch (this.yAxisType) {
      case "percent":
        i = this.#u.max > -10 ? this.#u.max : 110, s = this.#u.min > -10 ? this.#u.min : -10, n = this.#u.offset, this.#h = this.gradations(i + n, s + n);
        break;
      default:
        i = this.#u.max > 0 ? this.#u.max : 1, s = this.#u.min > 0 ? this.#u.min : 0, n = this.#u.offset, this.#h = this.gradations(i + n, s + n);
        break;
    }
    return this.#h;
  }
  gradations(i, s, n = !0) {
    let r, o, l;
    const h = [];
    o = i - s, o = this.rangeH > 0 ? this.rangeH : 1, l = o / (this.height / (this.core.theme.yAxis.fontSize * 1.75));
    let c = Math.pow(10, Math.ceil(Math.log10(l)));
    l < 0.25 * c ? c = 0.25 * c : l < 0.5 * c && (c = 0.5 * c);
    var p = Math.ceil(s / c) * c, f = Math.floor(i / c) * c;
    let x = this.height, P = (f - p) / c;
    this.height / P;
    let L = this.countDigits(c), O;
    this.#d = L;
    for (var D = p; D <= f; D += c)
      r = this.countDigits(D), O = Es(r, this.core.config), x = this.yPos(O), h.push([O, x, r]);
    return h;
  }
}
function Js(a, i) {
  return Math.round(a.measureText(i).width);
}
function Pt(a = Ee.fontSize, i = Ee.fontWeight, s = Ee.fontFamily) {
  return `${i} ${a}px ${s}`;
}
function zi(a, i, s) {
  a.font = Pt(s?.fontSize, s?.fontWeight, s?.fontFamily);
  const n = Js(a, i), r = s?.paddingLeft || 0, o = s?.paddingRight || 0, l = s?.borderWidth || 0;
  return r + o + n + l * 2;
}
function Wi(a) {
  const i = a?.paddingTop || 0, s = a?.paddingBottom || 0, n = a?.borderWidth || 0, r = a?.fontSize || 0;
  return i + s + r + n * 2;
}
function ao(a, i, s, n) {
  a.fillStyle = n?.colour, a.font = Pt(n?.fontSize, n?.fontWeight, n?.fontFamily), a.textAlign = n?.textAlign || "start", a.textBaseline = n?.textBaseLine || "alphabetic", a.direction = n?.direction || "inherit", a.lineWidth = n?.width, a.strokeStyle = n?.border, n?.stroke ? a.strokeText(n?.text, i, s, n?.max) : a.fillText(n?.text, i, s, n?.max);
}
function Tt(a, i, s, n, r) {
  a.save(), a.font = Pt(r?.fontSize, r?.fontWeight, r?.fontFamily), a.textBaseline = "top", a.fillStyle = r?.bakCol || Ee.bakCol;
  let o = r?.width || zi(a, i, r), l = r?.height || Wi(r);
  a.fillRect(s, n, o, l), a.fillStyle = r?.txtCol || Ee.txtCol, s = s + r?.paddingLeft, n = n + r?.paddingTop, a.fillText(`${i}`, s, n), a.restore();
}
function lo(a, i, s, n, r, o) {
  a.lineWidth = o?.width || Ee.borderWidth, a.strokeStyle = o?.border || Ee.stroke, a.beginPath(), a.rect(i, s, n, r), a.stroke();
}
function en(a, i, s, n, r, o) {
  a.fillStyle = o?.fill || Ee.fill, a.fillRect(i, s, n, r);
}
function dc(a, i, s, n, r, o) {
  E(o.fill) && en(a, i, s, n, r, o), T(o.width) && o.width > 0 && lo(a, i, s, n, r, o);
}
function ho(a, i, s, n, r, o, l) {
  a.lineWidth = l?.width || Ee.borderWidth, a.strokeStyle = l?.border || Ee.stroke, uo(a, i, s, n, r, o), a.stroke();
}
function co(a, i, s, n, r, o, l) {
  a.fillStyle = l?.fill || Ee.fill, uo(a, i, s, n, r, o), a.fill();
}
function uo(a, i, s, n, r, o) {
  a.beginPath(), a.moveTo(i + o, s), a.arcTo(i + n, s, i + n, s + r, o), a.arcTo(i + n, s + r, i, s + r, o), a.arcTo(i, s + r, i, s, o), a.arcTo(i, s, i + n, s, o), a.closePath();
}
function mc(a, i, s, n, r, o, l) {
  E(l.fill) && co(a, i, s, n, r, o, l?.fill), T(l.width) && l.width > 0 && ho(a, i, s, n, r, o, l?.border, l?.width);
}
function mt(a, i = [], s = [], n = []) {
  let [r, o, l, h] = i;
  const c = a.createLinearGradient(r, o, l, h);
  let p = 0;
  for (let O of n)
    c.addColorStop(p++, O);
  let [f, x, P, L] = s;
  a.fillStyle = c, a.fillRect(f, x, P, L);
}
function Mt(a, i, s, n) {
  E(i) && (a.fillStyle = i, a.fill()), T(n) && n > 0 && (a.lineWidth = n, a.strokeStyle = s || Ee.stroke, a.stroke());
}
function mo(a, i, s, n, r, o, l) {
  if (!(r < 3)) {
    var h = Math.PI * 2 / r;
    a.beginPath(), a.translate(i, s), a.rotate(o * Math.PI / 180), a.moveTo(n, 0);
    for (var c = 1; c < r; c++)
      a.lineTo(n * Math.cos(h * c), n * Math.sin(h * c));
    a.closePath(), Mt(a, l?.fill, l?.stroke, l?.width);
  }
}
function pc(a, i, s) {
  if (i.length > 0) {
    a.beginPath();
    var n = i[0];
    a.moveTo(n.x, n.y);
    for (var r = 1; r < i.length; ++r)
      n = i[r], a.lineTo(n.x, n.y);
    a.closePath(), Mt(a, s?.fill, s?.stroke, s?.width);
  }
}
function gc(a, i, s, n, r) {
  mo(a, i, s, n, 3, r?.rotate || 0, r), Mt(a, r?.fill, r?.stroke, r?.width);
}
function fc(a, i, s, n, r, o) {
  a.beginPath(), a.moveTo(i - n / 2, s), a.lineTo(i, s - r / 2), a.lineTo(i + n / 2, s), a.lineTo(i, s + r / 2), a.closePath(), Mt(a, o?.fill, o?.stroke, o?.width);
}
function Lt(a, i, s, n = () => {
}) {
  a.save();
  const r = s.width || 1;
  a.lineWidth = r, r % 2 && a.translate(0.5, 0.5), a.strokeStyle = s.stroke, A(s.dash) && a.setLineDash(s.dash), a.beginPath();
  let o = !0;
  i.forEach((l) => {
    l && l.x !== null && (o ? (a.moveTo(l.x, l.y), o = !1) : a.lineTo(l.x, l.y));
  }), U(n) && n(), a.restore();
}
function yc(a, i, s) {
  Lt(a, i, s, () => {
    a.stroke();
  });
}
function vc(a, i, s) {
  Lt(a, i, s, () => {
    a.closePath();
  }), Mt(a, opts?.fill, opts?.stroke, opts?.size);
}
function wc(a, i, s) {
  a.beginPath(), a.moveTo(i[0].x, i[0].y);
  for (var n = s ?? 1, r = 0; r < i.length - 1; r++) {
    var o = r > 0 ? i[r - 1] : i[0], l = i[r], h = i[r + 1], c = r != i.length - 2 ? i[r + 2] : h, p = l.x + (h.x - o.x) / 6 * n, f = l.y + (h.y - o.y) / 6 * n, x = h.x - (c.x - l.x) / 6 * n, P = h.y - (c.y - l.y) / 6 * n;
    a.bezierCurveTo(p, f, x, P, h.x, h.y);
  }
  a.stroke();
}
function Qt(a, i, s, n, r) {
  Lt(a, [{ x: s, y: i }, { x: n, y: i }], r, () => {
    a.stroke(), a.closePath();
  });
}
function xc(a, i, s, n, r) {
  coords = [{ x: i, y: s }, { x: i, y, bottom: n }], Lt(a, coords, r, () => {
    a.stroke(), a.closePath();
  });
}
function bc(a, i, s) {
  Lt(a, i, s, () => {
    a.stroke(), a.closePath();
  });
}
function Cc(a, i, s, n, r) {
  a.beginPath(), a.arc(i, s, n, 0, Math.PI * 2), a.closePath(), fillStroke(a, r?.fill, r?.stroke, r?.width);
}
function po(a, i, s, n, r, o) {
  for (let l = 0; l < s; l++)
    for (let h = 0; h < n; h++)
      h % 2 == 0 && l % 2 == 0 || h % 2 != 0 && l % 2 != 0 ? a.fillStyle = r : a.fillStyle = o, a.fillRect(h * i, l * i, i, i);
}
function Tc(a) {
  return a.ownerDocument && a.ownerDocument.defaultView && a.ownerDocument.defaultView.devicePixelRatio || 2;
}
function go(a, i, s, n, r, o, l, h, c, p) {
  a.drawImage(i, s, n, r, o, l, h, c, p);
}
function Sc(a, i) {
  let s = a.naturalWidth || a.width, n = a.naturalHeight || a.height;
  return i === void 0 && (i = fo(s, n)), i.ctx.drawImage(a, 0, 0), i;
}
const Ec = {
  red: "#FF0000FF",
  green: "#00FF00FF",
  blue: "#0000FFFF",
  alpa: "#000000FF"
};
function zt(a, i) {
  const s = imageToCanvs(i), n = s.ctx;
  return n.fillStyle = Ec[a], n.globalCompositeOperation = "multiply", n.fillRect(0, 0, n.canvas.width, n.canvas.height), n.globalCompositeOperation = "destination-in", n.drawImage(i, 0, 0), n.globalCompositeOperation = "source-over", s;
}
function Pc(a) {
  return {
    red: zt("red", a),
    green: zt("green", a),
    blue: zt("blue", a),
    alpha: zt("alpha", a)
  };
}
function fo(a, i) {
  const s = document.createElement("canvas");
  return s.ctx = s.getContext("2d", { willReadFrequently: !0 }), s.width = a || s.ctx.canvas.width, s.height = i || s.ctx.canvas.height, s;
}
const W = {
  createCanvas: fo,
  imageToCanvas: Sc,
  separateRGB: Pc,
  getChannel: zt,
  getPixelRatio: Tc,
  fillStroke: Mt,
  linearGradient: mt,
  calcTextWidth: Js,
  createFont: Pt,
  getTextRectHeight: Wi,
  getTextRectWidth: zi,
  renderImage: go,
  renderText: ao,
  renderTextBG: Tt,
  renderPath: Lt,
  renderPathStroke: yc,
  renderPathClosed: vc,
  renderSpline: wc,
  renderLine: bc,
  renderLineHorizontal: Qt,
  renderLineVertical: xc,
  renderCircle: Cc,
  renderRect: dc,
  renderRectFill: en,
  renderRectStroke: lo,
  renderRectRound: mc,
  renderRectRoundFill: co,
  renderRectRoundStroke: ho,
  renderPolygonRegular: mo,
  renderPolygonIrregular: pc,
  renderDiamond: fc,
  renderTriangle: gc,
  renderCheckerBoard: po
};
class F {
  static isOverlay = !0;
  #e;
  #t;
  #s = {};
  #r;
  #n;
  #i;
  #o;
  #a;
  #c;
  #l;
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
  constructor(i, s = !1, n = !1, r, o, l = {}) {
    this.#t = o.core, this.#e = o, this.#s = o.core.config, this.#o = i, this.#a = i.scene, this.#c = i.hit, this.#n = s, this.#i = n, this.#l = l, this.on("global_resize", this.onResize, this);
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
    return this.#s;
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
    return this.#a;
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
    return this.#s.state.allData.data;
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
    return this.#l.overlay.data;
  }
  get data() {
    return this.#l.overlay.data;
  }
  get stateMachine() {
    return this.#t.stateMachine;
  }
  get context() {
    return this.contextIs();
  }
  set position(i) {
    this.#o.setPosition(i[0], i[1]);
  }
  destroy() {
    this.#t.hub.expunge(this), "overlay" in this.#l && "data" in this.#l.overlay && delete this.#l.overlay.data;
  }
  on(i, s, n = this) {
    this.#t.on(i, s, n);
  }
  off(i, s, n = this) {
    this.#t.off(i, s, n);
  }
  expunge(i = this) {
    this.#t.expunge(i);
  }
  emit(i, s) {
    this.core.emit(i, s);
  }
  onResize() {
    this.#h.resize = !0;
  }
  setSize(i, s) {
    this.#o.setSize(i, s), this.#h.refresh = !0;
  }
  setRefresh() {
    this.#h.refresh = !0;
  }
  getXAxis() {
    return this.#n instanceof Li ? this.#n : this.core.Chart.time.xAxis instanceof Li ? this.core.Chart.time.xAxis : "time" in this.#e ? this.#e.time.xAxis : !1;
  }
  getYAxis() {
    return this.#i instanceof Ai ? this.#i : this.chart.yAxis instanceof Ai ? this.chart.yAxis : "scale" in this.#e ? this.#e.scale.yAxis : !1;
  }
  contextIs() {
    return !this.#n && !this.#i ? "chart" : this.#n instanceof Li ? "timeline" : this.#i instanceof Ai ? "scale" : !1;
  }
  mustUpdate() {
    const i = this.#t.range, s = this.#h;
    return this.#t.MainPane.elRows, s.valueMax !== i.valueMax || s.valueMin !== i.valueMin || s.indexStart !== i.indexStart || s.Length !== i.Length || s.refresh || s.resize ? this.#h : !1;
  }
  updated() {
    const i = this.#t.range, s = this.#h, n = this.#t.MainPane.elRows;
    s.valueMax = i.valueMax, s.valueMin = i.valueMin, s.indexStart = i.indexStart, s.Length = i.Length, s.rowsW = n.width, s.rowsH = n.height, s.rowsW = n.width, s.rowsH = n.height, s.refresh = !1, s.resize = !1;
  }
  plot(i, s, n) {
    const r = this.scene.context, o = i;
    switch (r.save(), s) {
      case "createCanvas":
        W[s](o[0], o[1]);
        break;
      case "fillStroke":
        W[s](r, o[0], o[1], o[2]);
        break;
      case "renderLine":
        W[s](r, o, n);
        break;
      case "renderLineHorizontal":
        W[s](r, o[0], o[1], o[2], n);
        break;
      case "renderLineVertical":
        W[s](r, o[0], o[1], o[2], n);
        break;
      case "renderPath":
        W[s](r, o, n.style, n);
        break;
      case "renderPathStroke":
        W[s](r, o, n.style, n);
        break;
      case "renderPathClosed":
        W[s](r, o, n);
        break;
      case "renderSpline":
        W[s](r, o, n);
        break;
      case "renderRect":
        W[s](r, o[0], o[1], o[2], o[3], n);
        break;
      case "renderRectFill":
        W[s](r, o[0], o[1], o[2], o[3], n);
        break;
      case "renderRectStroke":
        W[s](r, o[0], o[1], o[2], o[3], n);
        break;
      case "renderRectRound":
        W[s](r, o[0], o[1], o[2], o[3], o[4], n);
        break;
      case "renderRectRoundFill":
        W[s](r, o[0], o[1], o[2], o[3], o[4], n);
        break;
      case "renderRectRoundStroke":
        W[s](r, o[0], o[1], o[2], o[3], o[4], n);
        break;
      case "renderPolygonRegular":
        W[s](r, o[0], o[1], o[2], o[3], o[4], n);
        break;
      case "renderPolygonIrregular":
        W[s](r, o, n);
        break;
      case "renderTriangle":
        W[s](r, o[0], o[1], o[2], n);
        break;
      case "renderDiamond":
        W[s](r, o[0], o[1], o[2], o[3], n);
        break;
      case "renderCircle":
        W[s](r, o[0], o[1], o[2], n);
        break;
      case "renderImage":
        W[s](r, n.src, o[0], o[1], o[2], o[3], o[4], o[5], o[6], o[7]);
      case "renderText":
        W[s](r, o[0], o[1], n);
        break;
      case "renderTextBG":
        W[s](r, o[0], o[1], o[2], n);
        break;
    }
    r.restore();
  }
  clear() {
    this.scene.clear();
  }
}
class Ps {
  #e = Ri;
  #t = "1s";
  indexStart = 0;
  indexEnd = pi;
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
  initialCnt = Jn;
  limitFuture = pi;
  limitPast = er;
  minCandles = tr;
  maxCandles = ir;
  yAxisBounds = Qn;
  rangeLimit = pi;
  anchor;
  #s;
  #r;
  #n = !0;
  constructor(i, s, n = {}) {
    if (!S(n) || !(n?.core instanceof R))
      return !1;
    this.#n = !0, this.setConfig(n), this.#s = n.core, i = T(i) ? i : 0, s = T(s) ? s : this.data.length - 1, `${this.maxMinPriceVol.toString()}`;
    const r = n?.interval || Ri;
    if (this.data.length == 0) {
      let o = Date.now();
      i = 0, s = this.rangeLimit, this.#e = r, this.#t = Gt(this.interval), this.anchor = o - o % r;
    } else
      this.data.length < 2 ? (this.#e = r, this.#t = Gt(this.interval)) : (this.#e = Ms(this.data), this.#t = Gt(this.interval));
    s == 0 && this.data.length >= this.rangeLimit ? s = this.rangeLimit : s == 0 && (s = this.data.length), this.set(i, s);
  }
  get allData() {
    return this.#s.allData;
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
  set interval(i) {
    this.#e = i;
  }
  get interval() {
    return this.#e;
  }
  set intervalStr(i) {
    this.#t = i;
  }
  get intervalStr() {
    return this.#t;
  }
  end() {
  }
  set(i = 0, s = this.dataLength, n = this.maxCandles, r) {
    if (!T(i) || !T(s) || !T(n))
      return !1;
    i = i | 0, s = s | 0, n = n | 0, n = _(n, this.minCandles, this.maxCandles), i > s && ([i, s] = [s, i]), s = _(s, i + this.minCandles, i + n);
    let o = s - i;
    i = _(i, this.limitPast * -1, this.dataLength + this.limitFuture - this.minCandles - 1), s = _(s, i + this.minCandles, this.dataLength + this.limitFuture - 1), i = s - i < o ? i - (o - (s - i)) : i;
    const l = i, h = s, c = this.indexStart, p = this.indexEnd;
    let f = this.Length;
    this.indexStart = i, this.indexEnd = s, f -= this.Length;
    let x = this.maxMinPriceVol({ data: this.data, start: this.indexStart, end: this.indexEnd, that: this });
    return this.setMaxMin(x), this.setConfig(r), this.#s.emit("setRange", [l, h, c, p]), !0;
  }
  setConfig(i) {
    if (!S(i))
      return !1;
    this.initialCnt = T(i?.initialCnt) ? i.initialCnt : Jn, this.limitFuture = T(i?.limitFuture) ? i.limitFuture : pi, this.limitPast = T(i?.limitPast) ? i.limitPast : er, this.minCandles = T(i?.minCandles) ? i.minCandles : tr, this.maxCandles = T(i?.maxCandles) ? i.maxCandles : ir, this.yAxisBounds = T(i?.yAxisBounds) ? i.yAxisBounds : Qn;
  }
  setMaxMin(i) {
    for (let s in i)
      this.old[s] = this[s], this[s] = i[s];
    this.scale = this.dataLength != 0 ? this.Length / this.dataLength : 1;
  }
  value(i, s = "chart") {
    let n;
    if (s == "chart")
      n = this.data;
    else if (n = this.getDataById(s), !n)
      return null;
    T(i) || (i = n.length - 1);
    let r = n[i];
    if (r !== void 0)
      return r;
    {
      const o = n.length - 1;
      return r = [null, null, null, null, null, null], n.length < 1 ? (r[0] = Date.now() + this.interval * i, r) : i < 0 ? (r[0] = n[0][0] + this.interval * i, r) : i > o ? (r[0] = n[o][0] + this.interval * (i - o), r) : null;
    }
  }
  valueByTS(i, s = "") {
    if (!T(i) || !E(s))
      return !1;
    const n = this.getTimeIndex(i);
    switch (s) {
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
        if (s.length === 0)
          return this.value(n);
        s.split("_");
        break;
    }
  }
  getDataById(i) {
    if (!E(i))
      return !1;
    const s = i.split("_");
    switch (s[1]) {
      case "chart":
        return this.data;
      case "primary":
        for (let n of this.allData.primaryPane)
          if (s[2] in n)
            return n[s[2]];
        return !1;
      case "secondary":
        for (let n of this.allData.secondaryPane)
          if (s[2] in n)
            return n[s[2]];
        return !1;
      case "datasets":
        for (let n of this.allData.datasets)
          if (s[2] in n)
            return n[s[2]];
        return !1;
      default:
        return !1;
    }
  }
  getTimeIndex(i) {
    if (!T(i))
      return !1;
    i = i - i % this.interval;
    let s = this.data.length > 0 ? this.data[0][0] : this.anchor;
    return i === s ? 0 : i < s ? (s - i) / this.interval * -1 : (i - s) / this.interval;
  }
  inRange(i) {
    return i >= this.timeMin && i <= this.timeMax;
  }
  inPriceHistory(i) {
    return i >= this.timeStart && i <= this.timeFinish;
  }
  inRenderRange(i) {
    let s = this.getTimeIndex(i), n = this.#s.rangeScrollOffset;
    return s >= this.indexStart - n && s <= this.indexEnd + n;
  }
  rangeIndex(i) {
    return this.getTimeIndex(i) - this.indexStart;
  }
  maxMinPriceVol(i) {
    let { data: s, start: n, end: r, that: o } = { ...i }, l = pe(this.#s.bufferPx / this.#s.candleW);
    if (l = T(l) ? l : 0, n = T(n) ? n - l : 0, n = n > 0 ? n : 0, r = typeof r == "number" ? r : s?.length - 1, s.length == 0)
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
    let h = s.length - 1, c = oe(n, 0, h), p = oe(r, 0, h), f = s[c][3], x = s[c][2], P = s[c][5], L = s[c][5], O = c, D = c, re = c, fe = c;
    for (; c++ < p; )
      s[c][3] < f && (f = s[c][3], O = c), s[c][2] > x && (x = s[c][2], D = c), s[c][5] < P && (P = s[c][5], re = c), s[c][5] > L && (L = s[c][5], fe = c);
    let $ = x - f, k = f, N = x;
    return f -= $ * o.yAxisBounds, f = f > 0 ? f : 0, x += $ * o.yAxisBounds, $ = x - f, {
      valueLo: k,
      valueHi: N,
      valueMin: f,
      valueMax: x,
      valueDiff: x - f,
      volumeMin: P,
      volumeMax: L,
      volumeDiff: L - P,
      valueMinIdx: O,
      valueMaxIdx: D,
      volumeMinIdx: re,
      volumeMaxIdx: fe
    };
    function oe(K, ae, ye) {
      return Math.min(ye, Math.max(ae, K));
    }
  }
  snapshot(i, s) {
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
function Ms(a) {
  let i = Math.min(a.length - 1, 99), s = 1 / 0;
  return a.slice(0, i).forEach((n, r) => {
    let o = a[r + 1][0] - n[0];
    o === o && o < s && (s = o);
  }), s;
}
function Ls(a, i) {
  if (!T(i))
    return !1;
  let s, n = a.timeFrameMS;
  return i = i - i % n, i === a.range.data[0][0] ? s = 0 : i < a.range.data[0][0] ? s = (a.range.data[0][0] - i) / n * -1 : s = (i - a.range.data[0][0]) / n, s;
}
function ct(a, i) {
  return !S(a) || !S(i) ? i : (Object.keys(i).forEach((s) => {
    const n = a[s], r = i[s];
    Array.isArray(n) && Array.isArray(r) ? a[s] = ct(n.concat([]), r) : S(n) && S(r) ? a[s] = ct(Object.assign({}, n), r) : a[s] = r;
  }), a);
}
function ue(a, i = !0) {
  if (a === null || typeof a != "object" || "isActiveClone" in a)
    return a;
  let s;
  a instanceof Date ? s = new a.constructor() : s = Array.isArray(a) ? [] : {};
  for (let n in a)
    Object.prototype.hasOwnProperty.call(a, n) && (a.isActiveClone = null, s[n] = ue(a[n], !1), delete a.isActiveClone);
  return s;
}
function yo(a, i, s) {
  const [n, ...r] = i.split(".");
  return {
    ...a,
    [n]: r.length ? yo(a[n], r.join("."), s) : s
  };
}
function cr(a, i) {
  return i.split(".").reduce((n, r) => n && n[r] !== "undefined" ? n[r] : void 0, a);
}
function ki(a, i) {
  if (!A(a) || !A(i) || a.length !== i.length)
    return !1;
  let s = a.length;
  for (; s--; ) {
    if (A(a[s]) || A(i[s])) {
      if (!ki(a[s], i[s]))
        return !1;
      continue;
    }
    if (S(a[s]) || S(a[s])) {
      if (!S(a[s], i[s]))
        return !1;
      continue;
    }
    if (a[s] !== i[s])
      return !1;
  }
  return !0;
}
function Mc(a, i, s) {
  let n = a[i];
  a.splice(i, 1), a.splice(s, 0, n);
}
function Lc(a, i, s) {
  [myArray[i], myArray[s]] = [myArray[s], myArray[i]];
}
function vo(a, i) {
  return A(i) ? A(a) ? a.every((s) => i.includes(s)) : i.includes(a) : !1;
}
function Oi(a, i) {
  if (!S(a) || !S(i))
    return !1;
  const s = Object.keys(a).sort(), n = Object.keys(i).sort();
  return s.length !== n.length ? !1 : s.every((o, l) => {
    const h = a[o], c = i[n[l]];
    return A(h) || A(c) ? ki(h, c) : S(h) || S(c) ? Oi(h, c) : h === c;
  });
}
function Pe(a = "ID") {
  T(a) ? a = a.toString() : E(a) || (a = "ID"), a = _e(a);
  const i = Date.now().toString(36), s = Math.random().toString(36).substring(2, 5);
  return `${a}_${i}_${s}`;
}
function _e(a) {
  return String(a).replace(/ |,|;|:|\.|#/g, "_");
}
const Ac = (a) => a.entries().next().value, Oc = (a) => a.entries().next().value[0], Nc = (a) => a.entries().next().value[1], Ic = (a) => [...a].pop(), Rc = (a) => [...a.keys()].pop(), Dc = (a) => [...a.values()].pop();
class Me extends Map {
  constructor(i) {
    super(i);
  }
  indexOfKey(i) {
    return [...this.keys()].indexOf(i);
  }
  indexOfValue(i) {
    return [...this.values()].indexOf(i);
  }
  entryAtIndex(i) {
    return [...this.entries()][i];
  }
  keyAtIndex(i) {
    return [...this.keys()][i];
  }
  valueAtIndex(i) {
    return [...this.values()][i];
  }
  insert(i, s, n) {
    return insertAtMapIndex(n, i, s, this);
  }
  remove(i) {
    return removeMapIndex(i, this);
  }
  firstEntry() {
    return Ac(this);
  }
  firstKey() {
    return Oc(this);
  }
  firstValue() {
    return Nc(this);
  }
  lastEntry() {
    return Ic(this);
  }
  lastKey() {
    return Rc(this);
  }
  lastValue() {
    return Dc(this);
  }
  prevCurrNext(i) {
    let s = curr = next = null;
    for (let n of this)
      if (s = curr, curr = n, n.key == i)
        break;
    return { prev: s, curr, next };
  }
  union(...i) {
    if (typeof super.prototype.union == "function")
      super.union(...i);
    else
      for (const s of i)
        for (const n of s)
          this.set(...n);
  }
  setMultiple(i) {
    return A(i) ? (arr.forEach(([s, n]) => this.set(s, n)), !0) : !1;
  }
  populate(i) {
    return A(i) ? (this.clear(), arr.forEach(([s, n]) => this.set(s, n)), !0) : !1;
  }
  insertIndex(i, s, n) {
    if (!T(i))
      return !1;
    const r = [...this];
    return r.splice(i, 0, [s, n]), this.populate(r), !0;
  }
  removeIndex(i) {
    if (!T(i))
      return !1;
    const s = [...this];
    return s.splice(i, 1), this.populate(s), !0;
  }
  swapIndices(i, s) {
    if (!T(i) || !T(s))
      return !1;
    const n = [...this];
    return Lc(n, i, s), this.populate(n), !0;
  }
  swapKeys(i, s) {
    const n = [...this], r = n.findIndex(([l]) => l === i), o = n.findIndex(([l]) => l === s);
    return [n[r], n[o]] = [n[o], n[r]], this.clear(), n.forEach(([l, h]) => this.set(l, h)), !0;
  }
}
function ke(a, i = 100, s, n = !1) {
  let r;
  return function() {
    let o = s || this, l = arguments, h = function() {
      r = null, n || a.apply(o, l);
    }, c = n && !r;
    clearTimeout(r), r = setTimeout(h, i), c && a.apply(o, l);
  };
}
function kc(a, i = 250, s) {
  let n, r, o = function() {
    let h = s || this, c = /* @__PURE__ */ new Date(), p = arguments;
    n && c < n + i ? (clearTimeout(r), r = setTimeout(function() {
      n = c, a.apply(h, p);
    }, i)) : (n = c, a.apply(h, p));
  };
  function l() {
    timeout && (clearTimeout(r), timeout = void 0);
  }
  return o.reset = function() {
    l(), n = 0;
  }, o;
}
class Le extends F {
  static #e = 0;
  static get cnt() {
    return ++Le.#e;
  }
  static get isIndicator() {
    return !0;
  }
  #t;
  #s;
  #r;
  #n;
  #i;
  #o;
  #a;
  #c;
  #l;
  #h;
  #d;
  #u;
  #m;
  #v;
  #f;
  #x = [0, 0];
  #w;
  #p;
  #T = 2;
  #P = {};
  #g;
  #C;
  #S;
  definition = {
    input: {},
    output: {},
    meta: {
      input: {},
      output: {}
    }
  };
  style = {};
  constructor(i, s = !1, n = !1, r, o, l) {
    super(i, s, n, void 0, o, l), this.#s = F.cnt, this.#h = l, this.#d = l.overlay, this.#v = this.core.TALib, this.#f = this.xAxis.range;
    const h = l.overlay;
    this.id = l.overlay?.id || Pe(this.shortName), this.legendName = l.overlay?.legendName, this.legendVisibility = !!l.overlay?.legendVisibility || !0, this.style = h?.settings?.style ? { ...this.constructor.defaultStyle, ...h.settings.style } : { ...this.constructor.defaultStyle, ...r.style }, `${this.shortName}`, this.eventsListen();
  }
  get id() {
    return this.#t || `${this.core.id}-${this.chartPaneID}-${this.shortName}-${this.#s}`;
  }
  set id(i) {
    this.#t = _e(new String(i));
  }
  get chartPane() {
    return this.core.ChartPanes.get(this.chartPaneID);
  }
  get chartPaneID() {
    return this.#h.overlay.paneID;
  }
  get primaryPane() {
    return this.#o;
  }
  set primaryPane(i) {
    this.#o = i;
  }
  get scaleOverlay() {
    return this.#c;
  }
  set scaleOverlay(i) {
    this.#c = i;
  }
  get plots() {
    return this.#l;
  }
  set plots(i) {
    this.#l = i;
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
    return this.#m;
  }
  get overlay() {
    return this.#d;
  }
  get legend() {
    return this.chart.legend.list[this.#g];
  }
  get legendID() {
    return this.#g;
  }
  get legendName() {
    return this.#i || this.shortName || this.#t;
  }
  set legendName(i) {
    this.setLegendName(i);
  }
  set legendVisibility(i) {
    this.setLegendVisibility(i);
  }
  get indicator() {
    return this.#u;
  }
  get TALib() {
    return this.#v;
  }
  get range() {
    return this.core.range;
  }
  set setNewValue(i) {
    this.#w = i;
  }
  set setUpdateValue(i) {
    this.#p = i;
  }
  set precision(i) {
    this.#T = i;
  }
  get precision() {
    return this.#T;
  }
  set style(i) {
    this.#P = i;
  }
  get style() {
    return this.#P;
  }
  set position(i) {
    this.target.setPosition(i[0], i[1]);
  }
  get isIndicator() {
    return Le.isIndicator;
  }
  get status() {
    return this.#C;
  }
  get primaryPane() {
    return this.constructor.primaryPane;
  }
  get configDialogue() {
    return this.#S;
  }
  set value(i) {
    const s = this.core.time.timeFrameMS;
    let n = Math.floor(new Date(i[be.t]) / s) * s;
    i[be.t] = n, this.#x[be.t] !== i[be.t] ? (this.#x[be.t] = i[be.t], this.#w(i)) : this.#p(i);
  }
  get value() {
    return this.#x;
  }
  setLegendName(i) {
    this.#i = E(i) ? i : this.shortName || this.#t, this.chart.legend.modify(this.#g, { legendName: i });
  }
  setLegendVisibility(i) {
    this.chart.legend.modify(this.#g, { legendVisibility: !!i });
  }
  destroy() {
    if (this.#C !== "destroyed") {
      if (!this.chartPane.indicatorDeleteList[this.id]) {
        this.core.warn(`Cannot "destroy()": ${this.id} !!! Use "indicator.remove()" or "chart.removeIndicator()" instead.`);
        return;
      }
      this.core.hub.expunge(this), this.chart.legend.remove(this.#g), this.clear(), this.core.MainPane.draw(void 0, !0), this.chartPane.graph.removeOverlay(this.id), super.destroy(), this.core.state.removeIndicator(this.id), this.#C = "destroyed";
    }
  }
  remove() {
    this.core.log(`Deleting indicator: ${this.id} from: ${this.chartPaneID}`), this.chart.type === "primaryPane" || Object.keys(this.chart.indicators).length > 1 ? this.emit(`${this.chartPaneID}_removeIndicator`, { id: this.id, paneID: this.chartPaneID }) : this.chart.remove();
  }
  visible(i) {
    return Q(i) && (this.emit(`${this.chartPaneID}_visibleIndicator`, { id: this.id, paneID: this.chartPaneID, visible: i }), this.chartPane.indicators[this.id].layer.visible = i, this.draw()), this.chartPane.indicators[this.id].layer.visible;
  }
  settings(i) {
    return S(i) && (S(i?.config) && (this.params.overlay.settings = { ...this.params.overlay.settings, ...i.config }), S(i?.style) && (this.style = { ...this.style, ...i.style }), this.draw()), {
      config: this.params.overlay.settings,
      style: this.style,
      defaultStyle: this?.defaultStyle,
      plots: this.plots,
      precision: this.precision,
      definition: this.definition
    };
  }
  eventsListen() {
    this.on(et, this.onStreamUpdate, this);
  }
  on(i, s, n = this) {
    this.core.on(i, s, n);
  }
  off(i, s, n = this) {
    this.core.off(i, s, n);
  }
  emit(i, s) {
    this.core.emit(i, s);
  }
  onStreamNewValue(i) {
  }
  onStreamUpdate(i) {
    this.value = i;
  }
  onLegendAction(i) {
    const s = this.chart.legend.onPointerClick(i.currentTarget);
    switch (s.icon) {
      case "up":
        return;
      case "down":
        return;
      case "visible":
        this.onVisibility(s);
        return;
      case "notVisible":
        this.onVisibility(s);
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
  onVisibility(i) {
    this.visible(!this.visible()), i.parent.classList.toggle("visible"), i.parent.classList.toggle("notvisible");
  }
  invokeSettings(i) {
    if (U(i?.fn)) {
      let s = C.fn(this);
      if (i?.own)
        return s;
    } else if (U(this.core.config.callbacks?.indicatorSettings?.fn)) {
      let s = this.core.config.callbacks.indicatorSettings.fn(this);
      if (this.core.config.callbacks?.indicatorSettings?.own)
        return s;
    }
    this.core.log(`invokeSettings: ${this.id}`);
  }
  defineIndicator(i, s) {
    S(i) || (i = {}), this.definition.output = s.outputs;
    const n = { ...this.definition.input, ...i };
    delete n.style;
    for (let r of s.options)
      if (r.name in n)
        if (typeof n[r.name] !== r.type) {
          n[r.name] = r.defaultValue;
          continue;
        } else
          "range" in r && (n[r.name] = _(n[r.name], r.range.min, r.range.max));
      else
        r.name == "timePeriod" && (n.timePeriod = r.defaultValue);
    this.definition.input = n;
  }
  addLegend() {
    let i = {
      id: this.id,
      title: this.legendName,
      type: "indicator",
      parent: this,
      source: this.legendInputs.bind(this)
    };
    this.#g = this.chart.legend.add(i);
  }
  legendInputs(i = this.chart.cursorPos) {
    const s = [this.style.stroke];
    let r = this.Timeline.xPos2Index(i[0]) - (this.range.data.length - this.overlay.data.length), o = _(this.overlay.data.length - 1, 0, 1 / 0);
    return r = _(r, 0, o), { c: r, colours: s };
  }
  indicatorInput(i, s) {
    let n = {
      inReal: [],
      open: [],
      high: [],
      low: [],
      close: [],
      volume: []
    };
    do
      n.inReal.push(this.range.value(i)[be.c]), n.open.push(this.range.value(i)[be.o]), n.high.push(this.range.value(i)[be.h]), n.low.push(this.range.value(i)[be.l]), n.close.push(this.range.value(i)[be.c]), n.volume.push(this.range.value(i)[be.v]);
    while (i++ < s);
    return n;
  }
  regeneratePlots(i) {
    return i.map((s, n) => {
      const r = n + 1;
      return {
        key: `${this.shortName}${r}`,
        title: `${this.shortName}${r}: `,
        type: "line"
      };
    });
  }
  TALibParams() {
    let i = this.range.dataLength, s = this.definition.input.timePeriod, n = i - s, r = this.indicatorInput(n, i);
    return r.inReal.find((l) => l === null) ? !1 : { timePeriod: s, ...r };
  }
  calcIndicator(i, s = {}, n = this.range) {
    if (!E(i) || !(i in this.TALib) || !S(n) || !this.core.TALibReady)
      return !1;
    s.timePeriod = s.timePeriod || this.definition.input.timePeriod;
    let r, o, l = s.timePeriod, h = this.overlay.data;
    if (n instanceof Ps)
      r = 0, o = n.dataLength - l + 1;
    else if ("indexStart" in n || "indexEnd" in n || "tsStart" in n || "tsEnd" in n)
      r = n.indexStart || this.Timeline.t2Index(n.tsStart || 0) || 0, o = n.indexEnd || this.Timeline.t2Index(n.tsEnd) || this.range.Length - 1;
    else
      return !1;
    if (h.length != 0)
      if (h.length + l !== n.dataLength)
        if (h[0][0] > n.value(l)[0])
          r = 0, o = n.getTimeIndex(h[0][0]) - l, o = _(o, l, n.dataLength - 1);
        else if (h[h.length - 1][0] < n.value(n.dataLength - 1)[0])
          r = h.length - 1 + l, r = _(r, 0, n.dataLength), o = n.dataLength - 1;
        else
          return !1;
      else
        return !1;
    if (o - r < l)
      return !1;
    let c = [], p, f, x, P;
    for (; r < o; ) {
      P = this.indicatorInput(r, r + l), s = { ...s, ...P }, x = this.TALib[i](s), f = [], p = 0;
      for (let L of this.definition.output)
        f[p++] = x[L.name][0];
      c.push([n.value(r + l - 1)[0], ...f]), r++;
    }
    return c;
  }
  calcIndicatorHistory() {
    const i = () => {
      const s = this.calcIndicator(this.libName, this.definition.input, this.range);
      if (s) {
        const n = this.overlay.data;
        new Set(s), new Set(n);
        let r, o, l = {};
        if (!A(n) || n.length == 0) {
          this.overlay.data = s;
          return;
        } else
          s[0][0] < n[0][0] ? (r = s, o = n) : s[s.length - 1][0] > n[n.length - 1][0] && (r = n, o = s);
        for (let h of r)
          l[h[0]] = h;
        for (let h of o)
          l[h[0]] = h;
        this.overlay.data = Object.values(l), this.setRefresh();
      }
    };
    this.core.TALibReady ? i() : this.core.talibAwait.push(i.bind(this));
  }
  calcIndicatorStream(i, s, n = this.range) {
    if (!this.core.TALibReady || !E(i) || !(i in this.TALib) || !(n instanceof Ps) || n.dataLength < this.definition.input.timePeriod)
      return !1;
    let r = this.TALib[i](s), o = n.dataLength, l = n.value(o)[0], h = [], c = 0;
    for (let p of this.definition.output)
      h[c++] = r[p.name][0];
    return [l, ...h];
  }
  newValue(i) {
    let s = this.TALibParams();
    if (!s)
      return !1;
    let n = this.calcIndicatorStream(this.libName, s);
    if (!n)
      return !1;
    this.overlay.data.push(n), this.target.setPosition(this.core.scrollPos, 0), this.doDraw = !0, this.draw(this.range);
  }
  updateValue(i) {
    let s = this.overlay.data.length - 1, n = this.TALibParams();
    if (!n)
      return !1;
    let r = this.calcIndicatorStream(this.libName, n);
    if (!r)
      return !1;
    this.overlay.data[s] = r, this.target.setPosition(this.core.scrollPos, 0), this.doDraw = !0, this.draw(this.range);
  }
  plot(i, s, n) {
    super.plot(i, s, n);
  }
  draw() {
  }
  updated() {
    this.setRefresh(), super.updated();
  }
}
const _c = {
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
}, Hc = {
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
}, $c = {
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
}, Bc = {
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
}, zc = {
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
}, Wc = {
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
}, wo = {
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
}, Fc = {
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
}, Gc = {
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
}, qc = {
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
}, Xc = {
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
}, jc = {
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
}, xo = {
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
}, Kc = {
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
}, Zc = {
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
}, Qc = {
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
}, Jc = {
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
}, eu = {
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
}, tu = {
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
}, iu = {
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
}, su = {
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
}, nu = {
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
}, ru = {
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
}, ou = {
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
}, au = {
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
}, lu = {
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
}, hu = {
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
}, cu = {
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
}, uu = {
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
}, du = {
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
}, mu = {
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
}, pu = {
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
}, fu = {
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
}, yu = {
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
}, vu = {
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
}, wu = {
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
}, bu = {
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
}, Cu = {
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
}, Tu = {
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
}, Su = {
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
}, Eu = {
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
}, Pu = {
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
}, Mu = {
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
}, Lu = {
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
}, Au = {
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
}, Ou = {
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
}, Nu = {
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
}, Du = {
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
}, ku = {
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
}, _u = {
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
}, Hu = {
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
}, $u = {
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
}, Bu = {
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
}, zu = {
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
}, Wu = {
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
}, Fu = {
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
}, Gu = {
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
}, qu = {
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
}, Xu = {
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
}, ju = {
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
}, Ku = {
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
}, Zu = {
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
}, Qu = {
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
}, Ju = {
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
}, ed = {
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
}, td = {
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
}, bo = {
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
}, gd = {
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
}, fd = {
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
}, xd = {
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
}, bd = {
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
}, Id = {
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
}, Rd = {
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
}, Dd = {
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
}, Ud = {
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
}, Bd = {
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
}, Vd = {
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
}, zd = {
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
}, Yd = {
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
}, qd = {
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
}, Co = {
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
}, To = {
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
}, So = {
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
}, g0 = {
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
}, f0 = {
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
}, x0 = {
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
}, b0 = {
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
}, np = {
  ACCBANDS: _c,
  ACOS: Hc,
  AD: $c,
  ADD: Uc,
  ADOSC: Bc,
  ADX: Vc,
  ADXR: zc,
  APO: Wc,
  AROON: wo,
  AROONOSC: Fc,
  ASIN: Gc,
  ATAN: Yc,
  ATR: qc,
  AVGDEV: Xc,
  AVGPRICE: jc,
  BBANDS: xo,
  BETA: Kc,
  BOP: Zc,
  CCI: Qc,
  CDL2CROWS: Jc,
  CDL3BLACKCROWS: eu,
  CDL3INSIDE: tu,
  CDL3LINESTRIKE: iu,
  CDL3OUTSIDE: su,
  CDL3STARSINSOUTH: nu,
  CDL3WHITESOLDIERS: ru,
  CDLABANDONEDBABY: ou,
  CDLADVANCEBLOCK: au,
  CDLBELTHOLD: lu,
  CDLBREAKAWAY: hu,
  CDLCLOSINGMARUBOZU: cu,
  CDLCONCEALBABYSWALL: uu,
  CDLCOUNTERATTACK: du,
  CDLDARKCLOUDCOVER: mu,
  CDLDOJI: pu,
  CDLDOJISTAR: gu,
  CDLDRAGONFLYDOJI: fu,
  CDLENGULFING: yu,
  CDLEVENINGDOJISTAR: vu,
  CDLEVENINGSTAR: wu,
  CDLGAPSIDESIDEWHITE: xu,
  CDLGRAVESTONEDOJI: bu,
  CDLHAMMER: Cu,
  CDLHANGINGMAN: Tu,
  CDLHARAMI: Su,
  CDLHARAMICROSS: Eu,
  CDLHIGHWAVE: Pu,
  CDLHIKKAKE: Mu,
  CDLHIKKAKEMOD: Lu,
  CDLHOMINGPIGEON: Au,
  CDLIDENTICAL3CROWS: Ou,
  CDLINNECK: Nu,
  CDLINVERTEDHAMMER: Iu,
  CDLKICKING: Ru,
  CDLKICKINGBYLENGTH: Du,
  CDLLADDERBOTTOM: ku,
  CDLLONGLEGGEDDOJI: _u,
  CDLLONGLINE: Hu,
  CDLMARUBOZU: $u,
  CDLMATCHINGLOW: Uu,
  CDLMATHOLD: Bu,
  CDLMORNINGDOJISTAR: Vu,
  CDLMORNINGSTAR: zu,
  CDLONNECK: Wu,
  CDLPIERCING: Fu,
  CDLRICKSHAWMAN: Gu,
  CDLRISEFALL3METHODS: Yu,
  CDLSEPARATINGLINES: qu,
  CDLSHOOTINGSTAR: Xu,
  CDLSHORTLINE: ju,
  CDLSPINNINGTOP: Ku,
  CDLSTALLEDPATTERN: Zu,
  CDLSTICKSANDWICH: Qu,
  CDLTAKURI: Ju,
  CDLTASUKIGAP: ed,
  CDLTHRUSTING: td,
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
  EMA: bo,
  EXP: gd,
  FLOOR: fd,
  HT_DCPERIOD: yd,
  HT_DCPHASE: vd,
  HT_PHASOR: wd,
  HT_SINE: xd,
  HT_TRENDLINE: bd,
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
  MACD: Id,
  MACDEXT: Rd,
  MACDFIX: Dd,
  MAMA: kd,
  MAVP: _d,
  MAX: Hd,
  MAXINDEX: $d,
  MEDPRICE: Ud,
  MFI: Bd,
  MIDPOINT: Vd,
  MIDPRICE: zd,
  MIN: Wd,
  MININDEX: Fd,
  MINMAX: Gd,
  MINMAXINDEX: Yd,
  MINUS_DI: qd,
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
  RSI: Co,
  SAR: o0,
  SAREXT: a0,
  SIN: l0,
  SINH: h0,
  SMA: To,
  SQRT: c0,
  STDDEV: u0,
  STOCH: So,
  STOCHF: d0,
  STOCHRSI: m0,
  SUB: p0,
  SUM: g0,
  T3: f0,
  TAN: y0,
  TANH: v0,
  TEMA: w0,
  TRANGE: x0,
  TRIMA: b0,
  TRIX: C0,
  TSF: T0,
  TYPPRICE: S0,
  ULTOSC: E0,
  VAR: P0,
  WCLPRICE: M0,
  WILLR: L0,
  WMA: A0
};
class O0 extends Le {
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
  static scale = qe[1];
  static defaultStyle = {
    downStroke: "#c80",
    downLineWidth: "1",
    downLineDash: void 0,
    upStroke: "#08c",
    upLineWidth: "1",
    upLineDash: void 0,
    fillStyle: "#0080c044"
  };
  constructor(i, s = !1, n = !1, r, o, l) {
    super(i, s, n, r, o, l), this.defineIndicator(l.overlay?.settings, wo), this.calcIndicatorHistory(), this.setNewValue = (h) => {
      this.newValue(h);
    }, this.setUpdateValue = (h) => {
      this.updateValue(h);
    }, this.addLegend();
  }
  legendInputs(i = this.chart.cursorPos) {
    if (this.overlay.data.length == 0)
      return !1;
    const s = {};
    let n = [!1, !1], { c: r, colours: o } = super.legendInputs(i);
    return s.Dn = this.scale.nicePrice(this.overlay.data[r][1]), s.Up = this.scale.nicePrice(this.overlay.data[r][2]), o = [
      this.style.downStroke,
      this.style.upStroke
    ], { inputs: s, colours: o, labels: n };
  }
  draw(i = this.range) {
    if (this.overlay.data.length < 2)
      return;
    if (!super.mustUpdate())
      return !1;
    this.scene.clear();
    const s = { down: [], up: [] }, n = this.overlay.data, o = {
      w: this.xAxis.candleW
    };
    let l = i.value(i.indexStart)[0], h = this.overlay.data[0][0], c = (l - h) / i.interval, p = this.Timeline.rangeScrollOffset, f = i.Length + p + 2, x = {};
    for (; f; )
      c < 0 || c >= this.overlay.data.length ? (s.down.push({ x: null, y: null }), s.up.push({ x: null, y: null })) : (o.x = this.xAxis.xPos(n[c][0]), o.y = this.yAxis.yPos(n[c][1]), s.down.push({ ...o }), o.x = this.xAxis.xPos(n[c][0]), o.y = this.yAxis.yPos(n[c][2]), s.up.push({ ...o })), c++, f--;
    x = {
      width: this.style.LineWidth,
      stroke: this.style.downStroke,
      dash: this.style.downLineDash
    }, this.plot(s.down, "renderLine", x), x = {
      width: this.style.upLineWidth,
      stroke: this.style.upStroke,
      dash: this.style.upLineDash
    }, this.plot(s.up, "renderLine", x), this.target.viewport.render(), super.updated();
  }
}
class N0 extends Le {
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
    meta: {
      nbDevDn: 2,
      nbDevUp: 2,
      timePeriod: 5
    }
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
  constructor(i, s = !1, n = !1, r, o, l) {
    super(i, s, n, r, o, l), this.defineIndicator(l.overlay?.settings, xo), this.calcIndicatorHistory(), this.setNewValue = (h) => {
      this.newValue(h);
    }, this.setUpdateValue = (h) => {
      this.updateValue(h);
    }, this.addLegend();
  }
  legendInputs(i = this.chart.cursorPos) {
    if (this.overlay.data.length == 0)
      return !1;
    const s = {};
    let n = [!1, !1, !1], { c: r, colours: o } = super.legendInputs(i);
    return s.Hi = this.scale.nicePrice(this.overlay.data[r][1]), s.Mid = this.scale.nicePrice(this.overlay.data[r][2]), s.Lo = this.scale.nicePrice(this.overlay.data[r][3]), o = [
      this.style.upperStroke,
      this.style.middleStroke,
      this.style.lowerStroke
    ], { inputs: s, colours: o, labels: n };
  }
  draw(i = this.range) {
    if (this.overlay.data.length < 2)
      return;
    if (!super.mustUpdate())
      return !1;
    this.scene.clear();
    const s = { lower: [], middle: [], upper: [] }, n = this.overlay.data, o = {
      w: this.xAxis.candleW
    };
    let l = i.value(i.indexStart)[0], h = this.overlay.data[0][0], c = (l - h) / i.interval, p = this.Timeline.rangeScrollOffset, f = i.Length + p * 2 + 2, x = {};
    for (; f; )
      c < 0 || c >= this.overlay.data.length ? (s.lower.push({ x: null, y: null }), s.middle.push({ x: null, y: null }), s.upper.push({ x: null, y: null })) : (o.x = this.xAxis.xPos(n[c][0]), o.y = this.yAxis.yPos(n[c][1]), s.lower.push({ ...o }), o.x = this.xAxis.xPos(n[c][0]), o.y = this.yAxis.yPos(n[c][2]), s.middle.push({ ...o }), o.x = this.xAxis.xPos(n[c][0]), o.y = this.yAxis.yPos(n[c][3]), s.upper.push({ ...o })), c++, f--;
    x = {
      width: this.style.lowerLineWidth,
      stroke: this.style.lowerStroke,
      dash: this.style.lowerLineDash
    }, this.plot(s.lower, "renderLine", x), x = {
      width: this.style.middleLineWidth,
      stroke: this.style.middleStroke,
      dash: this.style.middleLineDash
    }, this.plot(s.middle, "renderLine", x), x = {
      width: this.style.upperLineWidth,
      stroke: this.style.upperStroke,
      dash: this.style.upperLineDash
    }, this.plot(s.upper, "renderLine", x), this.target.viewport.render(), super.updated();
  }
}
class tn extends Le {
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
        timePeriod: 30
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
  constructor(i, s = !1, n = !1, r, o, l) {
    super(i, s, n, r, o, l), tn.inCnt++, this.defineIndicator(l.overlay?.settings, bo), this.calcIndicatorHistory(), this.setNewValue = (h) => {
      this.newValue(h);
    }, this.setUpdateValue = (h) => {
      this.updateValue(h);
    }, this.addLegend();
  }
  updateLegend() {
    this.parent.legend.update();
  }
  legendInputs(i = this.chart.cursorPos) {
    if (this.overlay.data.length == 0)
      return !1;
    const s = {}, { c: n, colours: r } = super.legendInputs(i);
    return s.EMA_1 = this.scale.nicePrice(this.overlay.data[n][1]), { inputs: s, colours: r };
  }
  configInputs() {
    const i = {
      period: {
        label: "Period",
        type: "number",
        value: this.definition.input.timePeriod,
        "data-oldval": this.definition.input.timePeriod,
        default: 30,
        min: "3",
        class: "",
        title: "Number of time units to use in calculation",
        $function: this.configDialogue.provideEventListener(
          "#Period",
          "change",
          (n) => {
            console.log(`#Period = ${n.target.value}`);
          }
        )
      }
    }, s = this.buildConfigStyleTab();
    return { inputs: i, style: s };
  }
  draw(i = this.range) {
    if (this.overlay.data.length < 2)
      return;
    if (!super.mustUpdate())
      return !1;
    this.scene.clear();
    const s = this.overlay.data, n = this.xAxis.candleW, r = [];
    this.xAxis.smoothScrollOffset;
    const o = {
      w: n
    };
    let l = this.Timeline.rangeScrollOffset, h = i.data.length - this.overlay.data.length, c = i.indexStart - h - 2, p = i.Length + l * 2 + 2;
    for (; p; )
      c < 0 || c >= this.overlay.data.length ? r.push({ x: null, y: null }) : (o.x = this.xAxis.xPos(s[c][0]), o.y = this.yAxis.yPos(s[c][1]), r.push({ ...o })), c++, p--;
    this.plot(r, "renderLine", this.style), this.target.viewport.render(), super.updated();
  }
}
const ur = /^#?([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i, dr = /^hsla?((\d{1,3}?),\s*(\d{1,3}%),\s*(\d{1,3}%)(,\s*[01]?\.?\d*)?)$/, mr = /^hsla[(]\s*0*(?:[12]?\d{1,2}|3(?:[0-5]\d|60))\s*(?:\s*,\s*0*(?:\d\d?(?:\.\d+)?\s*%|\.\d+\s*%|100(?:\.0*)?\s*%)){2}\s*,\s*0*(?:\.\d+|1(?:\.0*)?)\s*[)]$/, pr = /^rgba?((\d{1,3}%?),\s*(\d{1,3}%?),\s*(\d{1,3}%?)(,\s*[01]?\.?\d*)?)$/, gr = /^^rgba[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*,){3}\s*0*(?:\.\d+|1(?:\.0*)?)\s*[)]$/;
class Eo {
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
  constructor(i) {
    this.#t(i), ur.test(i) && this.#s(i), dr.test(i) && this.#r(i), mr.test(i) && this.#n(i), pr.test(i) && this.#i(i), gr.test(i) && this.#o(i);
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
  #t(i) {
    if (ll) {
      let s = document.getElementById("divValidColourTest");
      s || (s = document.createElement("div"), s.id = "divValidColourTest"), s.style.backgroundColor = "", s.style.backgroundColor = i, this.#e.isValid = !!s.style.backgroundColor.length;
    } else
      this.#e.isValid = !!(ur.test(i) || dr.test(i) || mr.test(i) || pr.test(i) || gr.test(i));
  }
  setHex(i) {
    let s = this.#e;
    [
      s.r16,
      s.g16,
      s.b16,
      s.a16
    ] = i, s.hex = "#" + s.r16 + s.g16 + s.b16 + s.a16;
  }
  setRGBA(i) {
    let s = this.#e;
    [
      s.r,
      s.g,
      s.b,
      s.a
    ] = i, s.rgb = `rgb(${i[0]},${i[1]},${i[2]})`, s.rgba = `rgb(${i[0]},${i[1]},${i[2]},${i[3]})`;
  }
  setHSLA(i) {
    let s = this.#e;
    [
      s.h,
      s.s,
      s.l,
      s.a
    ] = i, s.hsl = `hsl(${i[0]},${i[1]}%,${i[2]}%)`, s.hsla = `hsl(${i[0]},${i[1]}%,${i[2]}%,${i[3]})`;
  }
  #s(i) {
    this.#e.hex = i;
    let s = i.length, n;
    switch (s) {
      case 4:
        n = [`${i[1]}${i[1]}`, `${i[2]}${i[2]}`, `${i[3]}${i[3]}`, "ff"];
        break;
      case 7:
        n = [i.substr(1, 2), i.substr(3, 2), i.substr(5, 2), "ff"];
        break;
      case 9:
        n = [i.substr(1, 2), i.substr(3, 2), i.substr(5, 2), i.substr(7, 2)];
        break;
    }
    this.setHex(n), this.#d(n), this.#u(n);
  }
  #r(i) {
    this.#e.hsl = i;
  }
  #n(i) {
    this.#e.hsla = i;
  }
  #i(i) {
    this.#e.rgb = i, this.#v(rgba);
  }
  #o(i) {
    this.#e.rgba = i, this.#v(i);
  }
  #a(i) {
    let { r: s, g: n, b: r, a: o } = this.#m(i);
    return s.length == 1 && (s = "0" + s), n.length == 1 && (n = "0" + n), r.length == 1 && (r = "0" + r), o.length == 1 && (o = "0" + o), this.value.r = s, this.value.g = n, this.value.b = r, this.value.a = o, this.setHex([s, n, r, o]), this;
  }
  #c(i) {
    let { r: s, g: n, b: r, a: o } = this.#m(i);
    s = parseInt(s, 16) / 255, n = parseInt(n, 16) / 255, r = parseInt(r, 16) / 255, o = parseInt(o, 16) / 255;
    const l = Math.max(s, n, r), h = l - Math.min(s, n, r), c = h ? l === s ? (n - r) / h : l === n ? 2 + (r - s) / h : 4 + (s - n) / h : 0;
    let p = [
      (60 * c < 0 ? 60 * c + 360 : 60 * c).toString(),
      (100 * (h ? l <= 0.5 ? h / (2 * l - h) : h / (2 - (2 * l - h)) : 0)).toString(),
      (100 * (2 * l - h) / 2).toString(),
      o.toString()
    ];
    return this.setHSLA(p), this;
  }
  #l(i, s, n) {
    s /= 100, n /= 100;
    const r = (h) => (h + i / 30) % 12, o = s * Math.min(n, 1 - n), l = (h) => n - o * Math.max(-1, Math.min(r(h) - 3, Math.min(9 - r(h), 1)));
    return [255 * l(0), 255 * l(8), 255 * l(4)];
  }
  #h(i, s, n) {
    n /= 100;
    const r = s * Math.min(n, 1 - n) / 100, o = (l) => {
      const h = (l + i / 30) % 12, c = n - r * Math.max(Math.min(h - 3, 9 - h, 1), -1);
      return Math.round(255 * c).toString(16).padStart(2, "0");
    };
    return `#${o(0)}${o(8)}${o(4)}`;
  }
  #d(i) {
    E(i) && (i = /([a-f\d]{2})/ig.exec(i));
    var s = [
      parseInt(i[0], 16),
      parseInt(i[1], 16),
      parseInt(i[2], 16),
      parseInt(i[3], 16) / 255
    ];
    this.setRGBA(s);
  }
  #u(i) {
    E(i) && (i = /([a-f\d]{2})/ig.exec(i));
    let s = parseInt(i[0], 16), n = parseInt(i[1], 16), r = parseInt(i[2], 16), o = parseInt(i[3], 16);
    s /= 255, n /= 255, r /= 255, o /= 255, this.setHSLA([s, n, r, o]);
  }
  #m(i) {
    let s, n, r, o, l = this.#e;
    if (l.r && l.g && l.b && l.a)
      return { r: s, g: n, b: r, a: o } = { ...l };
    if (E(i)) {
      let h = i.indexOf(",") > -1 ? "," : " ";
      i = i.substr(4).split(")")[0].split(h);
    }
    if (A(i)) {
      if (i.length < 3 || i.length > 4)
        return !1;
      s = i[0], n = i[1], r = i[2], o = E(i[3]) ? i[3] : "";
    } else if (S(i))
      s = i.r, n = i.g, r = i.b, o = "a" in i ? i.a : "";
    else
      return !1;
    return { r: s, g: n, b: r, a: o };
  }
  #v(i) {
    let s, n, r = 0, o = [], l = [], h = i.replace(/\s/g, "").match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i);
    h.shift();
    for (let c of h)
      n = c.indexOf("%") > -1, s = parseFloat(c), r < 3 && n ? s = Math.round(255 * s / 100) : r == 3 && (!n && s >= 0 && s <= 1 ? s = Math.round(255 * s) : n && s >= 0 && s <= 100 ? s = Math.round(255 * s / 100) : s = ""), o[r] = (s | 256).toString(16).slice(1), l[r++] = s;
    this.setHex(o), this.setRGBA(l), this.#u(this.#e.hex);
  }
}
class I0 extends Le {
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
          label: "Period",
          type: "number",
          value: 5,
          min: "3",
          title: "Number of time units to use in calculation",
          $function: (i) => {
            console.log(`#Period = ${i.target.value}`);
          }
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
  static scale = qe[1];
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
  constructor(i, s = !1, n = !1, r, o, l) {
    super(i, s, n, r, o, l), this.defineIndicator(l.overlay?.settings, Co), this.calcIndicatorHistory(), this.setNewValue = (h) => {
      this.newValue(h);
    }, this.setUpdateValue = (h) => {
      this.updateValue(h);
    }, this.addLegend();
  }
  legendInputs(i = this.chart.cursorPos) {
    if (this.overlay.data.length == 0)
      return !1;
    const s = {}, { c: n, colours: r } = super.legendInputs(i);
    return s.RSI_1 = this.scale.nicePrice(this.overlay.data[n][1]), { inputs: s, colours: r };
  }
  configInputs() {
    const i = {
      period: {
        label: "Period",
        type: "number",
        value: this.definition.input.timePeriod,
        "data-oldval": this.definition.input.timePeriod,
        "data-default": this.definition.input.timePeriod,
        default: 5,
        min: "3",
        class: "",
        title: "Number of time units to use in calculation",
        $function: this.configDialogue.provideEventListener(
          "#Period",
          "change",
          (n) => {
            console.log(`#Period = ${n.target.value}`);
          }
        )
      }
    }, s = this.buildConfigStyleTab();
    return { inputs: i, style: s };
  }
  draw(i = this.range) {
    if (this.overlay.data.length < 2 || !super.mustUpdate())
      return !1;
    this.scene.clear();
    const s = this.scene.width + this.xAxis.bufferPx * 2, n = this.yAxis.yPos(this.style?.high || this.style.defaultHigh), r = this.yAxis.yPos(this.style?.low || this.style.defaultLow), o = [0, n, this.scene.width, r - n];
    let l = { fill: this.style.highLowRangeStyle };
    if (this.plot(o, "renderRect", l), o.length = 0, o[0] = { x: 0, y: n }, o[1] = { x: s, y: n }, l = {
      width: this.style.highLowLineWidth,
      stroke: this.style.highStroke,
      dash: [1, 1]
    }, this.plot(o, "renderLine", l), o.length = 0, o[0] = { x: 0, y: r }, o[1] = { x: s, y: r }, l = {
      width: this.style.highLowLineWidth,
      stroke: this.style.lowStroke,
      dash: [1, 1]
    }, this.plot(o, "renderLine", l), this.overlay.data.length < 2)
      return this.target.viewport.render(), !1;
    const h = this.overlay.data, c = this.xAxis.candleW;
    o.length = 0, this.Timeline.smoothScrollOffset;
    const p = {
      w: c
    };
    let f = this.Timeline.rangeScrollOffset, x = i.data.length - this.overlay.data.length, P = i.indexStart - x - 2, L = i.Length + f * 2 + 2, O = 0;
    for (; L; )
      P < 0 || P >= this.overlay.data.length || (O > h[P][0] && console.log(P, O, h[P][0]), O = h[P][0], p.x = this.xAxis.xPos(h[P][0]), p.y = this.yAxis.yPos(h[P][1]), o.push({ ...p })), P++, L--;
    this.plot(o, "renderLine", this.style), this.target.viewport.render(), super.updated();
  }
}
class sn extends Le {
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
  constructor(i, s = !1, n = !1, r, o, l) {
    super(i, s, n, r, o, l), sn.inCnt++, this.defineIndicator(l.overlay?.settings, To), this.calcIndicatorHistory(), this.setNewValue = (h) => {
      this.newValue(h);
    }, this.setUpdateValue = (h) => {
      this.updateValue(h);
    }, this.addLegend();
  }
  updateLegend() {
    this.parent.legend.update();
  }
  legendInputs(i = this.chart.cursorPos) {
    if (this.overlay.data.length == 0)
      return !1;
    const s = {}, { c: n, colours: r } = super.legendInputs(i);
    return s.SMA_1 = this.scale.nicePrice(this.overlay.data[n][1]), { inputs: s, colours: r };
  }
  draw(i = this.range) {
    if (this.overlay.data.length < 2 || !super.mustUpdate())
      return;
    this.scene.clear();
    const s = this.overlay.data, n = this.xAxis.candleW, r = [];
    this.xAxis.smoothScrollOffset;
    const o = {
      w: n
    };
    let l = this.Timeline.rangeScrollOffset, h = i.data.length - this.overlay.data.length, c = i.indexStart - h - 2, p = i.Length + l * 2 + 2;
    for (; p; )
      c < 0 || c >= this.overlay.data.length ? r.push({ x: null, y: null }) : (o.x = this.xAxis.xPos(s[c][0]), o.y = this.yAxis.yPos(s[c][1]), r.push({ ...o })), c++, p--;
    this.plot(r, "renderLine", this.style), this.target.viewport.render(), super.updated();
  }
}
class R0 extends Le {
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
  static scale = qe[1];
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
  constructor(i, s = !1, n = !1, r, o, l) {
    super(i, s, n, r, o, l), this.defineIndicator(l.overlay?.settings, So), this.calcIndicatorHistory(), this.setNewValue = (h) => {
      this.newValue(h);
    }, this.setUpdateValue = (h) => {
      this.updateValue(h);
    }, this.addLegend();
  }
  legendInputs(i = this.chart.cursorPos) {
    if (this.overlay.data.length == 0)
      return !1;
    const s = {};
    let n = [!1, !1, !1], { c: r, colours: o } = super.legendInputs(i);
    return s.SlowK = this.scale.nicePrice(this.overlay.data[r][1]), s.SlowD = this.scale.nicePrice(this.overlay.data[r][1]), o = [
      this.style.slowD,
      this.style.slowK
    ], { inputs: s, colours: o, labels: n };
  }
  draw(i = this.range) {
    if (this.overlay.data.length < 2 || !super.mustUpdate())
      return !1;
    this.scene.clear();
    const s = this.scene.width + this.xAxis.bufferPx * 2, n = this.yAxis.yPos(this.style.defaultHigh), r = this.yAxis.yPos(this.style.defaultLow);
    let o = [0, n, this.scene.width, r - n], l = { fill: this.style.highLowRangeStyle };
    if (this.plot(o, "renderRect", l), o.length = 0, o[0] = { x: 0, y: n }, o[1] = { x: s, y: n }, l = {
      width: this.style.highLowLineWidth,
      stroke: this.style.highStroke,
      dash: [1, 1]
    }, this.plot(o, "renderLine", l), o.length = 0, o[0] = { x: 0, y: r }, o[1] = { x: s, y: r }, l = {
      width: this.style.highLowLineWidth,
      stroke: this.style.lowStroke,
      dash: [1, 1]
    }, this.plot(o, "renderLine", l), this.overlay.data.length < 2)
      return this.target.viewport.render(), !1;
    o = { slowD: [], slowK: [] };
    const h = this.overlay.data, p = {
      w: this.xAxis.candleW
    };
    let f = i.value(i.indexStart)[0], x = this.overlay.data[0][0], P = (f - x) / i.interval, L = this.Timeline.rangeScrollOffset, O = i.Length + L * 2 + 2;
    for (; O; )
      P < 0 || P >= this.overlay.data.length ? (o.slowD.push({ x: null, y: null }), o.slowK.push({ x: null, y: null })) : (p.x = this.xAxis.xPos(h[P][0]), p.y = this.yAxis.yPos(h[P][1]), o.slowK.push({ ...p }), p.x = this.xAxis.xPos(h[P][0]), p.y = this.yAxis.yPos(h[P][2]), o.slowD.push({ ...p })), P++, O--;
    l = {
      width: this.style.slowKLineWidth,
      stroke: this.style.slowKStroke,
      dash: this.style.slowKLineDash
    }, this.plot(o.slowK, "renderLine", l), l = {
      width: this.style.slowDLineWidth,
      stroke: this.style.slowDStroke,
      dash: this.style.slowDLineDash
    }, this.plot(o.slowD, "renderLine", l), this.target.viewport.render(), super.updated();
  }
}
class Po {
  constructor(i, s) {
    this.scene = i, this.ctx = this.scene.context, this.width = this.scene.width, this.cfg = "volume" in s ? s.volume : s;
  }
  draw(i) {
    const s = this.ctx, r = i.raw[4] >= i.raw[1] ? this.cfg.UpColour : this.cfg.DnColour;
    s.save(), s.strokeStyle = r, s.fillStyle = r, s.fillRect(
      Math.floor(i.x),
      Math.floor(i.z - i.h),
      Math.floor(i.w),
      Math.floor(i.h)
    ), s.restore();
  }
}
class nn extends Le {
  name = "Volume";
  shortName = "VOL";
  checkParamCount = !1;
  scaleOverlay = !0;
  plots = [
    { key: "VOL_1", title: " ", type: "bar" }
  ];
  #e = Vi.volume;
  #t;
  #s = "both";
  static inCnt = 0;
  static primaryPane = "both";
  static scale = qe[1];
  constructor(i, s = !1, n = !1, r, o, l) {
    super(i, s, n, r, o, l), nn.inCnt++;
    const h = l.overlay;
    this.id = l.overlay?.id || Pe(this.shortName), this.#e = { ...this.defaultStyle, ...this.theme.volume }, this.style = h?.settings?.style ? { ...this.#e, ...h.settings.style } : { ...this.#e, ...r.style }, this.chart.type === "primaryPane" ? (this.style.Height = _(this.style.Height, 0, 100) || 100, this.#s = !0) : (this.style.Height = 100, this.#s = !1), this.#t = new Po(i.scene, this.style), this.setNewValue = (c) => {
    }, this.setUpdateValue = (c) => {
    }, this.addLegend();
  }
  get primaryPane() {
    return this.#s;
  }
  get defaultStyle() {
    return this.#e;
  }
  legendInputs(i = this.chart.cursorPos) {
    if (this.range.dataLength == 0)
      return !1;
    const s = super.Timeline.xPos2Index(i[0]), n = _(s, 0, this.range.data.length - 1), r = this.range.data[n];
    this.chart.theme.candle;
    const o = r[4] >= r[1] ? [this.style.UpColour.slice(0, 7)] : [this.style.DnColour.slice(0, 7)];
    return { inputs: { V: this.scale.nicePrice(r[5]) }, colours: o };
  }
  calcIndicatorHistory() {
  }
  draw(i = this.range) {
    if (i.dataLength < 2 || !super.mustUpdate())
      return !1;
    this.scene.clear();
    const s = i.data, n = this.scene.height, r = this.xAxis.smoothScrollOffset || 0;
    let o = Math.max(this.xAxis.candleW - 1, 1);
    o < 3 ? o = 1 : o < 5 ? o = 3 : o > 5 && (o = Math.ceil(o * 0.8));
    const l = {
      x: 0 + r - this.xAxis.candleW,
      w: o,
      z: n
    }, h = Math.floor(n * this.style.Height / 100);
    let c = this.core.rangeScrollOffset, p = i.indexStart - c, f = i.Length + c * 2, x = f, P = p, L, O = 0;
    for (; x--; )
      L = i.value(P), L[4] !== null && (O = L[5] > O ? L[5] : O), P++;
    for (; f--; )
      L = i.value(p), l.x = pe(this.xAxis.xPos(L[0]) - o / 2), L[4] !== null && (l.h = h - h * ((O - L[5]) / O), l.raw = s[p], this.#t.draw(l)), p++;
    super.updated();
  }
}
const Mo = {
  AROON: { id: "AROON", name: "Aroon", event: "addIndicator", ind: O0 },
  BB: { id: "BB", name: "Bollinger Bands", event: "addIndicator", ind: N0 },
  EMA: { id: "EMA", name: "Exponential Moving Average", event: "addIndicator", ind: tn },
  RSI: { id: "RSI", name: "Relative Strength Index", event: "addIndicator", ind: I0 },
  SMA: { id: "SMA", name: "Simple Moving Average", event: "addIndicator", ind: sn },
  STOCH: { id: "STOCH", name: "Stochastic Oscillator", event: "addIndicator", ind: R0 },
  VOL: { id: "VOL", name: "Volume", event: "addIndicator", ind: nn }
}, rn = "0.142.8";
class D0 {
  #e;
  #t;
  #s;
  #r = [];
  constructor(i, s) {
    this.#e = i, this.#t = E(s.id) ? s.id : Pe, this.#s = E(s.type) ? s.type : "default", this.#r = A(s.data) ? s.data : [];
  }
}
function k0(a, i = !1) {
  if (!A(a))
    return !1;
  let s = hc(0, a.length);
  if (!Ni(a[0], i) || !Ni(a[s], i) || !Ni(a[a.length - 1], i))
    return !1;
  let n = a[0][0], r = a[1][0], o = a[2][0];
  return !(n > r && r > o);
}
function _0(a, i = !1) {
  if (!A(a))
    return !1;
  let s = 0, n = 0;
  for (; s < a.length; ) {
    if (!Ni(a[s], i) || a[s][0] < n)
      return !1;
    n = a[s][0], s++;
  }
  return !0;
}
function H0(a, i) {
  if (!A(a) || a.length == 1)
    return !1;
  let s, n, r, o, l = [], h = 0, c = (a[a.length - 1][0] - a[h][0]) / i;
  for (; h < c; )
    s = a[h][0], n = a[h + 1][0], r = n - s, r == i ? l.push(a[h]) : r > i && (o = [s + i, null, null, null, null, null], l.push(o), a.splice(h + 1, 0, o)), h++;
  return a;
}
function Ni(a, i = !1) {
  return !(!A(a) || a.length !== 6 || i && !Vr(a[0]) || !T(a[1]) || !T(a[2]) || !T(a[3]) || !T(a[4]) || !T(a[5]));
}
function $0(a) {
  for (let i of a)
    for (let s = 0; s < 6; s++)
      i.length = 6, i[s] *= 1;
  return a;
}
const U0 = "defaultState", B0 = {
  version: rn,
  id: U0,
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
    tf: fh,
    tfms: Ri
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
}, fr = {
  timestamp: "number",
  id: "string",
  side: "string",
  price: "number",
  amount: "number",
  filled: "number",
  average: "number",
  total: "number",
  tag: "string"
}, yr = {
  timestamp: "number",
  id: "string",
  title: "string",
  content: "string",
  url: "string"
};
class H {
  static #e = new Me();
  static #t = {};
  static get default() {
    return ue(B0);
  }
  static get list() {
    return H.#e;
  }
  static create(i, s = !1, n = !1) {
    const r = new H(i, s, n), o = r.key;
    return H.#e.set(o, r), r;
  }
  static validate(i, s = !1, n = !1) {
    const r = H.default;
    if (S(i) || (i = {}), S(i.chart) || (i.chart = r.chart, i.chart.isEmpty = !0, i.chart.data = A(i.ohlcv) ? i.ohlcv : [], delete i.ohlcv), i = ct(r, i), s ? i.chart.data = _0(i.chart.data, n) ? i.chart.data : [] : i.chart.data = k0(i.chart.data, n) ? i.chart.data : [], i.chart.isEmpty = i.chart.data.length == 0, !T(i.chart?.tf) || s) {
      let c = Ms(i.chart.data);
      c < Y && (c = Ri), i.chart.tfms = c;
    }
    if ((!E(i.chart?.tfms) || s) && (i.chart.tf = Gt(i.chart.tfms)), A(i.views) || (i.views = r.views), A(i.primary) || (i.primary = r.primary), A(i.secondary) || (i.secondary = r.secondary), S(i.chart.settings) || (i.chart.settings = r.chart.settings), A(i.datasets) || (i.datasets = []), i.views.length == 0) {
      i.views.push(["primary", i.primary]);
      for (let c in i)
        c.indexOf("secondary") == 0 && i.views.push([c, i[c]]);
    }
    let o = i.views, l = o.length;
    for (; l--; )
      if (!A(o[l]) || o[l].length == 0)
        o.splice(l, 1);
      else {
        let c = i.views[l][1], p = c.length;
        for (; p--; )
          !S(c[p]) || !E(c[p].name) || !E(c[p].type) ? c.splice(p, 1) : S(c[p].settings) || (c[p].settings = {});
        o[l].length == 0 && o.splice(l, 1);
      }
    i.views.length == 0 && (i.views[0] = ["primary", r.primary]), i.views = new Me(i.views), i.views.has("primary") || i.views.insert("primary", r.primary, 0), i.views.get("primary").push(i.chart);
    for (var h of i.datasets)
      this.#t || (this.#t = {}), this.dss[h.id] = new D0(this, h);
    return i;
  }
  static delete(i) {
    if (!E(i) || !H.has(i))
      return !1;
    H.#e.delete(i);
  }
  static has(i) {
    return H.#e.has(i);
  }
  static get(i) {
    return H.#e.get(i);
  }
  static export(i, s = {}) {
    if (!H.has(i))
      return !1;
    S(s) || (s = {});
    const n = H.get(i), r = s?.type, o = ue(n.data), l = o.chart.data;
    let h;
    switch (l.length > 0 && l[l.length - 1].length > 6 && (l.length = l.length - 1), o.views.get("primary").pop(), o.views = Array.from(o.views), o.version = rn, r) {
      case "json":
      default:
        const { replacer: c, space: p } = { ...s };
        h = JSON.stringify(o, c, p);
    }
    return h;
  }
  #s = "";
  #r = "";
  #n = {};
  #i;
  #o = !1;
  #a = !0;
  #c = [];
  constructor(i, s = !1, n = !1) {
    S(i) ? (this.#n = H.validate(i, s, n), this.#o = "valid", this.#a = !!this.#n.chart?.isEmpty, this.#i = i?.core instanceof R ? i.core : void 0) : (this.#n = H.default, this.#o = "default", this.#a = !0), this.#s = i?.id || "", this.#r = Pe(`${Ft}_state`);
  }
  get id() {
    return this.#s;
  }
  get key() {
    return this.#r;
  }
  get status() {
    return this.#o;
  }
  get isEmpty() {
    return this.#a;
  }
  get allData() {
    return {
      data: this.#n.chart.data,
      primaryPane: this.#n.primary,
      secondaryPane: this.#n.secondary,
      datasets: this.#n.datasets
    };
  }
  get data() {
    return this.#n;
  }
  get core() {
    return this.#i !== void 0 ? this.#i : !1;
  }
  get time() {
    return this.#i.time;
  }
  get range() {
    return this.#i.range;
  }
  error(i) {
    this.#i.error(i);
  }
  create(i, s, n) {
    return H.create(i, s, n);
  }
  delete(i) {
    if (!E(i))
      return !1;
    if (i !== this.key)
      H.delete(i);
    else if (H.has(i)) {
      const s = H.create();
      this.use(s.key), H.delete(i);
    }
    return !0;
  }
  list() {
    return H.list;
  }
  has(i) {
    return H.has(i);
  }
  get(i) {
    return H.get(i);
  }
  use(i) {
    const s = this.core;
    if (!H.has(i))
      return s.warn(`${s.name} id: ${s.id} : Specified state does not exist`), !1;
    if (i === this.key)
      return !0;
    s.stream.stop(), s.MainPane.reset();
    let n = H.get(i);
    this.#s = n.id, this.#o = n.status, this.#a = n.isEmpty, this.#n = n.data;
    const r = {
      interval: n.data.chart.tfms,
      core: s
    };
    if (s.getRange(null, null, r), this.range.Length > 1) {
      const o = Ls(s.time, void 0), l = o ? o + this.range.initialCnt : n.data.length - 1, h = o || l - this.range.initialCnt;
      this.range.initialCnt = l - h, s.setRange(h, l);
    }
    s.MainPane.restart(), s.refresh();
  }
  export(i = this.key, s = {}) {
    return H.export(i, s = {});
  }
  mergeData(i, s = !1, n = !1) {
    if (!S(i))
      return this.error(`ERROR: ${this.id}: merge data must be type Object!`), !1;
    let r = A(i?.ohlcv) ? i.ohlcv.length - 1 : 0;
    if (r > 1 && this.time.timeFrameMS !== Ms(i?.ohlcv))
      return this.error(`ERROR: ${this.core.id}: merge data time frame does not match existing time frame!`), !1;
    (this.#a || !T(this.time.timeFrameMS)) && (!S(s) || !T(s.start) || !T(s.end)) && r > 1 && (s = { start: r - this.range.initialCnt, end: r }), S(s) ? (T(s?.startTS) ? s.start = s.startTS : s.start = T(s.start) ? this.range.value(s.start)[0] : this.range.timeMin, T(s?.endTS) ? s.end = s.endTS : s.end = T(s.end) ? this.range.value(s.end)[0] : this.range.timeMax) : (s = {}, s.start = this.range.timeMin, s.end = this.range.timeMax);
    let o, l, h = i?.ohlcv || !1;
    const c = this.allData.data, p = this.allData?.primaryPane, f = i?.primary || !1, x = this.allData?.secondaryPane, P = i?.secondary || !1, L = this.allData?.dataset?.data, O = i?.dataset?.data || !1;
    this.allData?.trades, i?.trades, this.allData?.events, i?.events;
    const D = A(h) && this.range.inRange(h[0][0]) ? 1 : 0, re = {};
    if (A(h) && h.length > 0) {
      if (o = h.length - 1, c.length - 1, re.mData = this.range.inRange(h[0][0]) && this.range.inRange(h[0][o]), !Q(h[o][7]) && h[o].length !== 8 && h[o][6] !== null && h[o][7] !== !0 ? h = $0(h) : s.end >= this.range.timeFinish && s.start <= this.range.timeFinish && (s.start += this.range.interval, s.end += this.range.interval), c.length == 0)
        this.allData.data.push(...h);
      else {
        let k = this.time.timeFrameMS, N = h[0][0], oe = h[h.length - 1][0], K = (h.length - 1) * k;
        oe > N + K && (h = H0(h, k)), this.data.chart.data = this.merge(c, h);
      }
      if (n)
        this.#i.calcAllIndicators(n);
      else {
        if (A(f) && f.length > 0) {
          for (let k of f)
            if (A(k?.data) && k?.data.length > 0)
              for (let N of p)
                S(N) && N.name === k.name && N.type === k.type && Oi(N.settings, k.settings) && (N.data = this.merge(N.data, k.data), this.#i.getIndicator(N.id).drawOnUpdate = !0);
        }
        if (A(P) && P.length > 0) {
          for (let k of P)
            if (A(k?.data) && k?.data.length > 0)
              for (let N of x)
                S(N) && N.name === k.name && N.type === k.type && Oi(N.settings, k.settings) && (N.data = this.merge(N.data, k.data), this.#i.getIndicator(N.id).drawOnUpdate = !0);
        }
        this.#i.calcAllIndicators();
      }
      if (A(O) && O.length > 0) {
        for (let k of O)
          if (A(k?.data) && k?.data.length > 0)
            for (let N of L)
              N.name === k.name && N.type === k.type && Oi(N.settings, k.settings) && (N.data = this.merge(N.data, k.data));
      }
      s && (S(s) ? (l = T(s.start) ? this.range.getTimeIndex(s.start) : this.range.indexStart, r = T(s.end) ? this.range.getTimeIndex(s.end) : this.range.indexEnd) : (h[0][0] && (l = this.range.indexStart + D), r = this.range.indexEnd + D), this.#i.setRange(l, r));
      let fe, $ = !1;
      for (fe in re)
        $ = $ || fe;
      return i.ohlcv.length > 1 && this.#i.emit("state_mergeComplete"), $ && this.#i.refresh(), this.#a = !1, !0;
    }
  }
  merge(i, s) {
    let n = [], r, o;
    if (i[0][0] < s[0][0] ? (r = i, o = s) : (r = s, o = i), o.length == 1 && o[0][0] == r[r.length - 1][0])
      r[r.length - 1] = o[0], n = r;
    else if (o.length == 1 && o[0][0] == r[r.length - 1][0] + this.range.interval)
      n = r.concat(o);
    else if (r[r.length - 1][0] >= o[0][0]) {
      let l = 0;
      for (; r[l][0] < o[0][0]; )
        n.push(r[l]), l++;
      n = n.concat(o);
      let h = l + o.length;
      h < r.length && (n = n.concat(r.slice(h)));
    } else if (o[0][0] - r[r.length - 1][0] > this.range.interval) {
      n = r;
      let l = r[r.length - 1][0], h = Math.floor((o[0][0] - l) / this.range.interval);
      for (h; h > 0; h--) {
        let c = Array(o[0].length).fill(null);
        c[0] = l, l = +this.range.interval, n.push(c), n = n.concat(o);
      }
    } else
      n = r.concat(o);
    return n;
  }
  removeIndicator(i) {
    if (!E(i))
      return !1;
    const s = (n, r) => {
      const o = this.data[n];
      for (let l = 0; l < o.length; l++)
        if (o[l].id == r)
          return o.splice(l, 1), !0;
      return !1;
    };
    return !!(s("primary", i) || s("secondary", i));
  }
  addTrade(i) {
    const s = Object.keys(i), n = Object.keys(fr);
    if (!S(i) || !ki(s, n))
      return !1;
    for (let l of n)
      if (typeof i[l] !== fr[l])
        return !1;
    const r = i.timestamp - i.timestamp % this.time.timeFrameMS, o = new Date(r);
    return i.dateStr = `${o.getFullYear()}/${o.getMonth() + 1}/${o.getDate()} ${o.getHours()}:${o.getMinutes()}`, A(this.allData.trades[r]) || (this.allData.trades[r] = []), this.allData.trades[r].push(i), !0;
  }
  removeTrade(i) {
    console.log("TODO: state.removeTrade()");
  }
  addEvent(i) {
    const s = Object.keys(i), n = Object.keys(yr);
    if (!S(i) || !ki(s, n))
      return !1;
    for (let l of n)
      if (typeof t[l] !== yr[l])
        return !1;
    const r = t.timestamp - t.timestamp % this.time.timeFrameMS, o = new Date(r);
    return i.dateStr = `${o.getFullYear()}/${o.getMonth() + 1}/${o.getDate()} ${o.getHours()}:${o.getMinutes()}`, A(this.allData.events[r]) || (this.allData.events[r] = []), this.allData.events[r].push(i), !0;
  }
  removeEvent(i) {
    console.log("TODO: state.removeEvent()");
  }
}
class Xe {
  #e;
  #t;
  #s;
  #r = {};
  #n;
  #i;
  #o = "stopped";
  #a;
  #c;
  #l;
  #h;
  #d = ["await", "idle", "running", "stopped"];
  constructor(i, s) {
    if (!Xe.validateConfig(i))
      return !1;
    const n = { ...i };
    this.id = n.id, this.#n = n, this.#t = n.initial, this.#r.origin = s, this.#h = n.actions, this.#i = s.core, this.#u();
  }
  set id(i) {
    this.#e = _e(i);
  }
  get id() {
    return this.#e;
  }
  get state() {
    return this.#t;
  }
  get previousSate() {
    return this.#s;
  }
  get context() {
    return this.#r;
  }
  get core() {
    return this.#i;
  }
  get status() {
    return this.#o;
  }
  get event() {
    return this.#c;
  }
  get events() {
    return this.#a;
  }
  get eventData() {
    return this.#l;
  }
  get actions() {
    return this.#h;
  }
  notify(i, s) {
    this.#c = i, this.#l = s;
    const n = this.#n.states[this.#t];
    let r = n.on[i];
    if (!r || !U(r.action) || this.#o !== "running")
      return !1;
    let o = r?.condition?.type || r?.condition || !1;
    if (o && !this.condition.call(this, o, r.condition))
      return !1;
    const l = r.target, h = this.#n.states[l];
    if (n?.onExit.call(this, s), r.action.call(this, s), this.#s = this.#t, this.#t = l, h?.onEnter.call(this, s), this.#n.states[l]?.on && (this.#n.states[l].on[""] || this.#n.states[l].on?.always)) {
      const c = this.#n.states[l].on[""] || this.#n.states[l].on.always;
      if (A(c))
        for (let p of c) {
          let f = p?.condition?.type || p?.condition || !1;
          this.condition.call(this, f, p.condition) && E(p.target) && (p?.action.call(this, s), this.#s = this.#t, this.#t = p?.target, this.notify(null, null));
        }
      else if (S(c) && E(c.target)) {
        let p = c?.condition?.type || c?.condition || !1;
        this.condition.call(this, p, c.condition) && E(c.target) && (c?.action.call(this, s), this.#s = this.#t, this.#t = c.target, this.notify(null, null));
      }
    }
    return this.#t;
  }
  condition(i, s = null, n = {}) {
    return i ? this.#n.guards[i].call(this, this.#r, s, n) : !1;
  }
  canTransition(i) {
    const s = this.#n.states[this.#t];
    return i in s.on;
  }
  start() {
    this.#o = "running";
  }
  stop() {
    this.#o = "stopped";
  }
  destroy() {
    this.stop(), this.#m(), this.#n = null;
  }
  #u() {
    this.#a = /* @__PURE__ */ new Set();
    for (let i in this.#n.states)
      for (let s in this.#n.states[i].on) {
        let n = this.notify.bind(this, s);
        this.#a.add({ topic: s, cb: n }), this.#i.on(s, n, this.context);
      }
  }
  #m() {
    this.#i.hub.expunge(this.context), this.#a.clear();
  }
  static validateConfig(i) {
    if (!S(i))
      return !1;
    const s = ["id", "initial", "context", "states"];
    let n = Object.keys(i);
    if (!vo(s, n) || !(i.initial in i.states))
      return !1;
    for (let r in i.states) {
      if (!S(i.states[r]) || "onEnter" in i.states[r] && !U(i.states[r].onEnter) || "onExit" in i.states[r] && !U(i.states[r].onExit))
        return !1;
      if ("on" in i.states[r])
        for (let o in i.states[r].on) {
          let l = i.states[r].on[o];
          if (!E(l.target) || "action" in l && !U(l.action))
            return !1;
        }
    }
    return !0;
  }
}
const V0 = "alert";
class z0 {
  #e = new Me();
  #t = {};
  constructor(i) {
    if (A(i))
      for (let s of i)
        this.add(s?.price, s?.condition, s?.handler);
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
  batchAdd(i) {
    if (A(i)) {
      let s = [];
      for (let n of i)
        s.push(this.add(n?.price, n?.condition, n?.handler));
      return s;
    } else
      return !1;
  }
  add(i, s, n) {
    if (isNaN(i) || !U(n))
      return !1;
    const r = Pe(V0), o = { price: i, condition: s };
    if (this.list.has(o)) {
      let l = this.list.get(o);
      l[r] = n;
    } else {
      const l = {};
      l[r] = n, this.list.set(o, l);
    }
    return this.#t[r] = { alert: o, handler: n }, r;
  }
  remove(i) {
    if (!(i in this.#t))
      return !1;
    const s = this.#t[i], n = s.alert, r = this.#e.get(n);
    return r.delete(i), s.delete(i), Object.keys(r).length == 0 && this.#e.delete(n), !0;
  }
  delete(i, s) {
    if (this.list.has({ price: i, condition: s })) {
      const n = this.list.get({ price: i, condition: s });
      for (let r in n)
        this.#t.delete(r), n.delete(r);
    }
    return this.list.delete({ price: i, condition: s });
  }
  pause(i) {
    if (!(i in this.#t))
      return !1;
    this.#t[i];
  }
  handlerByID(i) {
    return i in this.#t ? this.#t[i].handler : !1;
  }
  check(i, s) {
    if (!(!A(i) || !A(s))) {
      for (let [n, r] of this.list)
        if (n.condition(n.price, i, s))
          for (let o in r)
            try {
              r[o](n.price, i, s);
            } catch (l) {
              console.error(l);
            }
    }
  }
}
const W0 = 0, F0 = 1, G0 = 2, Y0 = 3, q0 = 4, X0 = 5, yi = [null, null, null, null, null], vi = {
  tfCountDown: !0,
  alerts: []
};
class xt {
  #e;
  #t;
  #s;
  #r;
  #n;
  #i;
  #o;
  #a = yi;
  #c = 0;
  #l = 0;
  #h = "";
  #d = !1;
  #u;
  #m;
  #v = yi;
  #f;
  static validateConfig(i) {
    if (S(i)) {
      let s = ue(vi);
      i = ct(s, i), i.tfCountDown = Q(i.tfCountDown) ? i.tfCountDown : vi.tfCountDown, i.alerts = A(i.alerts) ? i.alerts : vi.alerts;
    } else
      return vi;
    return i;
  }
  constructor(i) {
    this.#e = i, this.#r = i.time, this.status = { status: $a }, this.#t = xt.validateConfig(i.config?.stream), this.#n = T(i.config?.maxCandleUpdate) ? i.config.maxCandleUpdate : Va, this.#o = T(i.config?.streamPrecision) ? i.config.streamPrecision : za;
  }
  get config() {
    return this.#t;
  }
  get countDownMS() {
    return this.#l;
  }
  get countDown() {
    return this.#h;
  }
  get range() {
    return this.#e.range;
  }
  get status() {
    return this.#s;
  }
  set status({ status: i, data: s }) {
    this.#s = i, this.emit(i, s);
  }
  set dataReceived(i) {
    this.#d || (this.#d = !0, this.status = { status: Rs, data: i });
  }
  get alerts() {
    return this.#f;
  }
  get lastPriceMin() {
    return this.#m;
  }
  set lastPriceMin(i) {
    T(i) && (this.#m = i);
  }
  get lastPriceMax() {
    return this.#u;
  }
  set lastPriceMax(i) {
    T(i) && (this.#u = i);
  }
  get lastTick() {
    return this.#v;
  }
  set lastTick(i) {
    A(i) && (this.#v, this.#v = i, this.alerts.check(i, this.#a));
  }
  set candle(i) {
    const s = [...this.#a];
    i.t = this.roundTime(new Date(i.t)), i.o = i.o * 1, i.h = i.h * 1, i.l = i.l * 1, i.c = i.c * 1, i.v = i.v * 1, this.#a[W0] !== i.t ? this.newCandle(i) : this.updateCandle(i), this.status = { status: xi, data: this.#a }, this.lastTick = s;
  }
  get candle() {
    return this.#a !== yi ? this.#a : null;
  }
  start() {
    this.#f = new z0(this.#t.alerts), this.status = { status: Rn }, this.#i = setInterval(this.onUpdate.bind(this), this.#n);
  }
  stop() {
    this.#f.destroy(), this.status = { status: Ua };
  }
  emit(i, s) {
    this.#e.emit(i, s);
  }
  error() {
    this.status = { status: Ba };
  }
  onTick(i) {
    (this.#s == Rn || this.#s == xi) && S(i) && (this.candle = i);
  }
  onUpdate() {
    this.#a !== yi && (this.status = { status: et, data: this.candle }, this.status = { status: xi, data: this.#a });
  }
  newCandle(i) {
    this.prevCandle(), this.#a = [
      i.t,
      i.o,
      i.h,
      i.l,
      i.c,
      i.v,
      null,
      !0
    ], this.#e.state.mergeData({ ohlcv: [this.#a] }, !0, !1), this.status = { status: Ds, data: { data: i, candle: this.#a } }, this.#l = this.#r.timeFrameMS, this.#c = this.roundTime(Date.now());
  }
  prevCandle() {
    const i = this.#e.allData.data;
    i.length > 0 && i[i.length - 1][7] && (i[i.length - 1].length = 6);
  }
  updateCandle(i) {
    let s = this.#a;
    s[F0] = i.o, s[G0] = i.h, s[Y0] = i.l, s[q0] = i.c, s[X0] = i.v, this.#a = s;
    const n = this.#e.allData.data, r = n.length > 0 ? n.length - 1 : 0;
    n[r] = this.#a, this.countDownUpdate();
  }
  countDownUpdate() {
    let i, s, n, r, o, l, h;
    this.#r.timeFrameMS;
    let c = this.#r.timeFrameMS - (Date.now() - this.#c);
    return c < 0 && (c = 0), this.#l = c, c > Se ? (i = String(Math.floor(c / Se)), s = String(Math.floor(c % Se / me)).padStart(2, "0"), this.#h = `${i}Y ${s}M`) : c > me ? (s = String(Math.floor(c / me)).padStart(2, "0"), r = String(Math.floor(c % me / z)).padStart(2, "0"), this.#h = `${s}M ${r}D`) : c > bt ? (n = String(Math.floor(c / bt)).padStart(2, "0"), r = String(Math.floor(c % me / z)).padStart(2, "0"), this.#h = `${n}W ${r}D`) : c > z ? (r = String(Math.floor(c / z)).padStart(2, "0"), o = String(Math.floor(c % z / te)).padStart(2, "0"), l = String(Math.floor(c % te / q)).padStart(2, "0"), this.#h = `${r}D ${o}:${l}`) : c > te ? (o = String(Math.floor(c / te)).padStart(2, "0"), l = String(Math.floor(c % te / q)).padStart(2, "0"), h = String(Math.floor(c % q / Y)).padStart(2, "0"), this.#h = `${o}:${l}:${h}`) : c > q ? (l = String(Math.floor(c / q)).padStart(2, "0"), h = String(Math.floor(c % q / Y)).padStart(2, "0"), this.#h = `00:${l}:${h}`) : (h = String(Math.floor(c / Y)).padStart(2, "0"), String(c % Y).padStart(4, "0"), this.#h = `00:00:${h}`), this.#h;
  }
  roundTime(i) {
    return i - i % this.#e.time.timeFrameMS;
  }
}
const vr = ["constructor", "list", "setCurrent", "setTheme", "setValue"];
class Ie {
  static #e = new Me();
  static get list() {
    return Ie.#e;
  }
  #t;
  static create(i, s) {
    if (!S(i))
      return !1;
    i.id = E(i.name) ? Pe(i.name) : `${s.id}.theme`;
    const n = new Ie(i, s);
    return Ie.list.set(i.id, n), n;
  }
  constructor(i, s) {
    this.#t = s, this.setCurrent(i);
  }
  get list() {
    return Ie.list;
  }
  setCurrent(i = {}) {
    i = S(i) ? i : {};
    const s = ue(Vi), n = ue(i), r = ct(s, n);
    for (let o in r)
      vr.includes(o) || (this[o] = r[o]);
    this.#t.refresh();
  }
  setTheme(i) {
    if (E(i) && Ie.list.has(i)) {
      const s = Ie.list.get(i);
      return this.setCurrent(s), !0;
    }
    return !1;
  }
  setProperty(i, s) {
    if (!E(i))
      return;
    const n = cr(this, i), r = i.split(".");
    if (r.length == 1)
      this[r[0]] = s;
    else {
      let o = r.shift();
      this[o] = yo(this[o], r.join("."), s);
    }
    return this.#t.refresh(), n;
  }
  getProperty(i) {
    return cr(this, i);
  }
  deleteTheme(i) {
    return E(i) && Ie.list.has(i) ? (Ie.list.delete(i), !0) : !1;
  }
  exportTheme(i = {}) {
    S || (i = {});
    const s = i?.type, n = {};
    let r;
    for (let o in this)
      vr.includes(o) || (n[o] = this[o]);
    switch (s) {
      case "json":
      default:
        const { replacer: o, space: l } = { ...i };
        r = JSON.stringify(n, o, l);
    }
    return r;
  }
}
class j0 {
  #e;
  constructor(i) {
    this.#e = i, self.onmessage = (s) => this._onmessage(s.data);
  }
  _onmessage(i) {
    const { r: s, data: n } = i;
    try {
      const r = this.#e(n, s);
      self.postMessage({ r: s, status: !0, result: r });
    } catch (r) {
      self.postMessage({ r: s, status: !1, result: r });
    }
  }
  end() {
    self.close();
  }
}
class K0 {
  #e;
  #t;
  #s;
  #r = 0;
  #n = {};
  #i;
  constructor(i, s, n, r) {
    this.#e = i, this.#t = n, this.#s = r;
    const o = `
      ${De.ThreadWorker.toString()};
      const fn = ${s}
      const worker = new ThreadWorker(fn)
    `, l = new Blob([`;(async () => {${o}})().catch(e => {console.error(e)})`], { type: "text/javascript" }), h = URL.createObjectURL(l);
    this.#i = new Worker(h);
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
  set cb(i) {
    this.#t = i;
  }
  onmessage(i) {
    return U(this.#t) ? this.#t(i) : i;
  }
  onerror(i) {
    return U(this.#s) ? this.#s(i) : i;
  }
  postMessage(i) {
    return new Promise((s, n) => {
      try {
        let r = this.req;
        this.#n[r] = { resolve: s, reject: n }, this.#i.postMessage({ r, data: i }), this.#i.onmessage = (o) => {
          const { r: l, status: h, result: c } = o.data;
          if (l in this.#n) {
            const { resolve: p, reject: f } = this.#n[l];
            delete this.#n[l], h ? p(this.onmessage(c)) : f(this.onerror({ r: l, result: c }));
          } else if (h == "resolved")
            this.onmessage(c);
          else
            throw new Error("Orphaned thread request ${r}");
        }, this.#i.onerror = (o) => {
          n(this.onerror(o));
        };
      } catch (r) {
        n(r);
      }
    });
  }
  terminate() {
    this.#i.terminate();
  }
}
class De {
  static #e = /* @__PURE__ */ new Map();
  static ThreadWorker = j0;
  static Thread = K0;
  static create(i, s = "worker", n) {
    if (typeof window.Worker > "u")
      return !1;
    if (U(i))
      i = i.toString();
    else if (!E(i))
      return !1;
    return s = E(s) ? Pe(s) : Pe("worker"), De.#e.set(s, new De.Thread(s, i, n)), De.#e.get(s);
  }
  static destroy(i) {
    if (!E(i))
      return !1;
    De.#e.get(i).terminate(), De.#e.delete(i);
  }
  static end() {
    De.#e.forEach((i, s, n) => {
      De.destroy(s);
    });
  }
}
class Ut {
  #e = {};
  constructor() {
  }
  on(i, s, n) {
    return !E(i) || !U(s) ? !1 : (this.#e[i] || (this.#e[i] = []), this.#e[i].push({ handler: s, context: n }), !0);
  }
  off(i, s, n) {
    if (!E(i) || !U(s) || !(i in this.#e))
      return !1;
    const r = this.#e[i];
    for (let o = 0; o < r.length; o++)
      if (r[o].handler === s) {
        if (n !== void 0 && r[o].context !== n)
          continue;
        if (r.splice(o, 1), r.length === 0) {
          delete this.#e[i];
          break;
        }
      }
    return !0;
  }
  expunge(i) {
    let s, n = this.#e;
    for (s in n)
      for (let r = 0; r < n[s].length; r++)
        if (n[s][r].context === i && (n[s].splice(r, 1), n[s].length === 0)) {
          delete n[s];
          break;
        }
    return !0;
  }
  emit(i, s) {
    E(i) && (this.#e[i] || []).forEach((n) => n.handler.call(n.context, s));
  }
  execute(i, s, n) {
  }
}
class ne extends HTMLElement {
  shadowRoot;
  template;
  id = Pe(Ft);
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
  constructor(i, s = "open") {
    super(), this.#e = new Ut(), this.template = i, this.shadowRoot = this.attachShadow({ mode: s });
  }
  destroy() {
  }
  connectedCallback(i) {
    this.doInit && (this.doInit = !1, this.shadowRoot.appendChild(this.template.content.cloneNode(!0)), this.style.display = "block", this.DOM.width = this.clientWidth, this.DOM.height = this.clientHeight, this.oldDOM.width = this.clientWidth, this.oldDOM.height = this.clientHeight, this.intersectionObserver = new IntersectionObserver(this.onResize.bind(this)), this.intersectionObserver.observe(this), this.resizeObserver = new ResizeObserver(this.onResize.bind(this)), this.resizeObserver.observe(this), U(i) && i());
  }
  disconnectedCallback() {
    this.resizeObserver.disconnect();
  }
  get width() {
    return this.DOM.width;
  }
  set width(i) {
    this.setDim(i, "width");
  }
  get oWidth() {
    return this.oldDOM.width;
  }
  get height() {
    return this.DOM.height;
  }
  set height(i) {
    this.setDim(i, "height");
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
  set cursor(i) {
    this.style.cursor = i;
  }
  get cursor() {
    return this.style.cursor;
  }
  get hub() {
    return this.#e;
  }
  setDim(i, s) {
    !["width", "height"].includes(s) || !E(i) || (T(i) ? (this.DOM[s] = i, i += "px") : E(i) ? i.match(Bt) || (V = "100%") : (this.DOM[s] = this.parentElement.getBoundingClientRect()[s], i = this.DOM[s] + "px"), this.style[s] = i);
  }
  getDims() {
    const i = this.getBoundingClientRect();
    for (let s in i) {
      const n = i[s];
      U(n) || (this.DOM[s] = n);
    }
    return this.DOM.visible = Et(this), this.DOM.viewport = ks(this), this.DOM;
  }
  onIntersection(i) {
    this.emit("intersection");
  }
  onMutation(i) {
    this.emit("mutation");
  }
  onResize(i) {
    this.oldDOM = { ...this.DOM }, this.getDims(), this.emit("resize", this.DOM);
  }
  on(i, s, n = this) {
    return this.#e instanceof Ut ? this.#e.on(i, s, n) : !1;
  }
  off(i, s, n = this) {
    return this.#e instanceof Ut ? this.#e.off(i, s, n) : !1;
  }
  expunge(i) {
    return this.#e instanceof Ut ? this.#e.expunge(i) : !1;
  }
  emit(i, s) {
    return this.#e instanceof Ut ? this.#e.emit(i, s) : !1;
  }
}
const ls = {
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
class on {
  static #e;
  #t;
  #s;
  #r;
  #n;
  #i = { w: 0, h: 0 };
  #o = { w: 0, h: 0, x: 0, y: 0 };
  #a = { x: !1, y: !0 };
  #c;
  #l = { x: 0, drag: !1 };
  #h;
  #d;
  constructor(i) {
    this.#t = on.#e++, this.#s = i.core, this.#r = J(i.elContainer) ? i.elContainer : !1, this.#n = J(i.elHandle) ? i.elHandle : !1, this.#d = U(i.callback) ? i.callback : !1, J(this.#r) && J(this.#n) && (this.mount(), this.eventsListen());
  }
  set cursor(i) {
    this.#n.style.cursor = i;
  }
  get cursor() {
    return this.#n.style.cursor;
  }
  eventsListen() {
    this.#h = new Ve(this.#n, { disableContextMenu: !1 }), this.#h.on("mouseenter", ke(this.onMouseEnter, 1, this, !0)), this.#h.on("mouseout", ke(this.onMouseOut, 1, this, !0)), this.#h.on("drag", kc(this.onHandleDrag, 100, this)), this.#h.on("enddrag", this.onHandleDragDone.bind(this)), this.#h.on("mousedown", ke(this.onMouseDown, 100, this, !0)), this.#h.on("mouseup", this.onMouseUp.bind(this));
  }
  on(i, s, n = this) {
    this.#s.on(i, s, n);
  }
  off(i, s, n = this) {
    this.#s.off(i, s, n);
  }
  emit(i, s) {
    this.#s.emit(i, s);
  }
  onMouseEnter() {
    const i = getComputedStyle(this.#n).backgroundColor;
    i && (this.colour = new Eo(i), this.#n.style.backgroundColor = this.colour.hex);
  }
  onMouseOut() {
    this.#n.style.backgroundColor = this.colour.hexa;
  }
  onMouseDown() {
  }
  onMouseUp(i) {
    this.onHandleDragDone(i);
  }
  onHandleDrag(i) {
    this.#l.drag || (this.#l.drag = !0, this.#l.x = i.position.x), this.handlePos(i);
  }
  onHandleDragDone(i) {
    this.handlePos(i), this.#l.drag = !1;
  }
  mount() {
    this.#i.w = this.#r.getBoundingClientRect().width, this.#i.h = this.#r.getBoundingClientRect().height, this.#r.style.overflow = "hidden", this.#o.w = this.#n.getBoundingClientRect().width, this.#o.h = this.#n.getBoundingClientRect().height, this.#n.style.marginRight = 0, this.#n.style.position = "absolute";
  }
  handlePos(i) {
    let s = this.#s.range, n = parseInt(this.#n.style.marginLeft), r = this.#r.getBoundingClientRect().width, o = this.#n.getBoundingClientRect().width, l = r - o, h = i.position.x - this.#l.x, c = _(n + h, 0, l), p = (s.dataLength + s.limitFuture + s.limitPast) / r, f = Math.floor(c * p);
    this.setHandleDims(c, o), this.#s.jumpToIndex(f);
  }
  setHandleDims(i, s) {
    let n = this.#r.getBoundingClientRect().width;
    s = s || this.#n.getBoundingClientRect().width, i = i / n * 100, this.#n.style.marginLeft = `${i}%`, s = s / n * 100, this.#n.style.width = `${s}%`;
  }
}
const Lo = ["source-over", "source-atop", "source-in", "source-out", "destination-over", "destination-atop", "destination-in", "destination-out", "lighter", "copy", "xor", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], Ao = typeof OffscreenCanvas < "u";
let Oo = class {
  #e = 0;
  constructor(i = {}) {
    if (!J(i.container))
      throw new Error("Viewport container is not a valid HTML element.");
    this.container = i.container, this.layers = [], this.id = X.idCnt++, this.scene = new X.Scene(), this.setSize(i.width || 0, i.height || 0);
  }
  get OffscreenCanvas() {
    return Ao;
  }
  generateKey() {
    return this.#e++;
  }
  setSize(i, s) {
    return this.width = i, this.height = s, this.scene.setSize(i, s), this.layers.forEach(function(n) {
      n.setSize(i, s);
    }), this;
  }
  addLayer(i) {
    return i instanceof As ? (this.layers.push(i), i.setSize(i.width || this.width, i.height || this.height), i.viewport = this, this) : !1;
  }
  removeLayer(i) {
    return i instanceof As ? (this.layers.splice(i.index, 1), !0) : !1;
  }
  getIntersection(i, s) {
    for (var n = this.layers, r = n.length - 1, o, l; r >= 0; ) {
      if (o = n[r], l = o.hit.getIntersection(i, s), l >= 0)
        return l;
      r--;
    }
    return -1;
  }
  get index() {
    let i = X.viewports, s, n = 0;
    for (s of i) {
      if (this.id === s.id)
        return n;
      n++;
    }
    return null;
  }
  destroy() {
    for (let i of this.layers)
      i.remove();
  }
  render(i = !1) {
    let { scene: s, layers: n } = this, r;
    s.clear();
    for (r of n)
      i && r.layers.length > 0 && r.render(i), r.visible && r.width > 0 && r.height > 0 && (s.context, Lo.includes(r?.composition) && (s.context.globalCompositeOperation = r.composition), s.context.globalAlpha = r.alpha, s.context.drawImage(
        r.scene.canvas,
        r.x,
        r.y,
        r.width,
        r.height
      ));
  }
};
class Z0 extends Oo {
  constructor(i = {}) {
    super(i);
    const s = this.scene.canvas, n = i.container;
    n?.hasCanvasSlot && (s.slot = "viewportCanvas"), n.innerHTML = "", n.appendChild(s), X.viewports.push(this);
  }
  destroy() {
    super.destroy(), this.container.innerHTML = "", X.viewports.splice(this.index, 1);
  }
}
class As {
  #e = 0;
  #t = 0;
  #s = 0;
  #r = 0;
  #n = 1;
  #i = !0;
  #o = null;
  constructor(i = {}) {
    this.id = X.idCnt++, this.hit = new X.Hit({
      layer: this,
      contextType: i.contextType,
      offscreen: !0
    }), this.scene = new X.Scene({
      layer: this,
      contextType: i.contextType,
      offscreen: !0
    }), i.x && i.y && this.setPosition(i.x, i.y), i.width && i.height && this.setSize(i.width, i.height), i.composition && (this.setComposition = i.composition), i.alpha && (this.alpha = i.alpha), i.visible && (this.visible = i.visible);
  }
  set x(i) {
    T(i) && (this.#e = i);
  }
  get x() {
    return this.#e;
  }
  set y(i) {
    T(i) && (this.#t = i);
  }
  get y() {
    return this.#t;
  }
  set width(i) {
    T(i) && (this.#s = i);
  }
  get width() {
    return this.#s;
  }
  set height(i) {
    T(i) && (this.#r = i);
  }
  get height() {
    return this.#r;
  }
  set alpha(i) {
    this.#n = T(i) ? _(i) : 1;
  }
  get alpha() {
    return this.#n;
  }
  set composition(i) {
    Lo.includes(comp) && (this.#o = i);
  }
  get composition() {
    return this.#o;
  }
  set visible(i) {
    Q(i) && (this.#i = i);
  }
  get visible() {
    return this.#i;
  }
  get index() {
    let i = this.viewport.layers, s = 0, n;
    for (n of i) {
      if (this.id === n.id)
        return s;
      s++;
    }
    return null;
  }
  setPosition(i, s) {
    return this.x = i, this.y = s, this;
  }
  setSize(i, s) {
    return this.width = i, this.height = s, this.scene.setSize(i, s), this.hit.setSize(i, s), this;
  }
  move(i) {
    let { index: s, viewport: n } = this, r = n.layers, o;
    switch (typeof i == "number" && (o = _(Math.floor(i), (r.length - 1) * -1, r.length - 1), i = "order"), i) {
      case "up":
        s < r.length - 1 && (r[s] = r[s + 1], r[s + 1] = this);
        break;
      case "down":
        s > 0 && (r[s] = r[s - 1], r[s - 1] = this);
        break;
      case "top":
        r.splice(s, 1), r.push(this);
        break;
      case "bottom":
        r.splice(s, 1), r.unshift(this);
        break;
      case "order":
        Mc(r, this.index, o);
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
}
class Q0 {
  #e = 0;
  #t = 0;
  constructor(i = { offscreen: !1 }) {
    this.id = X.idCnt++, this.layer = i.layer, this.contextType = i.contextType || "2d";
    const s = document.createElement("canvas");
    s.className = "scene-canvas", s.style.display = "block", i.width && i.height && this.setSize(i.width, i.height), Ao && i?.offscreen ? (this.canvas = s.transferControlToOffscreen(), this.offscreen = !0) : this.canvas = s, this.context = this.canvas.getContext(this.contextType);
  }
  set width(i) {
    T(i) && (this.#e = i);
  }
  get width() {
    return this.#e;
  }
  set height(i) {
    T(i) && (this.#t = i);
  }
  get height() {
    return this.#t;
  }
  setSize(i, s) {
    return Io(i, s, this);
  }
  clear() {
    return No(this);
  }
  toImage(i = "image/png", s, n) {
    let r = this, o = new Image(), l = this.canvas.toDataURL(i, s);
    o.onload = function() {
      o.width = r.width, o.height = r.height, n(o);
    }, o.src = l;
  }
  export(i, s, n = "image/png", r) {
    typeof s != "function" && (s = this.blobCallback.bind({ cfg: i })), this.canvas.toBlob(s, n, r);
  }
  exportHit(i, s, n = "image/png", r) {
    typeof s != "function" && (s = this.blobCallback.bind({ cfg: i })), this.layer.hit.canvas.toBlob(s, n, r);
  }
  blobCallback(i) {
    let s = document.createElement("a"), n = URL.createObjectURL(i), r = this.cfg.fileName || "canvas.png";
    s.setAttribute("href", n), s.setAttribute("target", "_blank"), s.setAttribute("download", r), document.createEvent ? Object.assign(document.createElement("a"), {
      href: n,
      target: "_blank",
      download: r
    }).click() : s.click && s.click();
  }
}
class J0 {
  #e = 0;
  #t = 0;
  constructor(i = {}) {
    this.layer = i.layer, this.contextType = i.contextType || "2d", this.canvas = document.createElement("canvas"), this.canvas.className = "hit-canvas", this.canvas.style.display = "none", this.canvas.style.position = "relative", this.context = this.canvas.getContext(this.contextType, {
      preserveDrawingBuffer: !0,
      antialias: !1
    }), i.width && i.height && this.setSize(i.width, i.height);
  }
  set width(i) {
    T(i) && (this.#e = i);
  }
  get width() {
    return this.#e;
  }
  set height(i) {
    T(i) && (this.#t = i);
  }
  get height() {
    return this.#t;
  }
  setSize(i, s) {
    return Io(i, s, this, !1);
  }
  clear() {
    return No(this);
  }
  getIntersection(i, s) {
    let n = this.context, r;
    if (i = Math.round(i - this.layer.x), s = Math.round(s - this.layer.y), i < 0 || s < 0 || i > this.width || s > this.height)
      return -1;
    if (this.contextType === "2d") {
      if (r = n.getImageData(i, s, 1, 1).data, r[3] < 255)
        return -1;
    } else if (r = new Uint8Array(4), n.readPixels(
      i * X.pixelRatio,
      (this.height - s - 1) * X.pixelRatio,
      1,
      1,
      n.RGBA,
      n.UNSIGNED_BYTE,
      r
    ), r[0] === 255 && r[1] === 255 && r[2] === 255)
      return -1;
    return this.rgbToInt(r);
  }
  getIndexValue(i) {
    let s = this.intToRGB(i);
    return "rgb(" + s[0] + ", " + s[1] + ", " + s[2] + ")";
  }
  rgbToInt(i) {
    let s = i[0], n = i[1], r = i[2];
    return (s << 16) + (n << 8) + r;
  }
  intToRGB(i) {
    let s = (i & 16711680) >> 16, n = (i & 65280) >> 8, r = i & 255;
    return [s, n, r];
  }
}
function No(a) {
  let i = a.context;
  return a.contextType === "2d" ? i.clearRect(
    0,
    0,
    a.width * X.pixelRatio,
    a.height * X.pixelRatio
  ) : i.clear(i.COLOR_BUFFER_BIT | i.DEPTH_BUFFER_BIT), a;
}
function Io(a, i, s, n = !0) {
  return s.width = a, s.height = i, s.canvas.width = a * X.pixelRatio, s.canvas.height = i * X.pixelRatio, s.offscreen || (s.canvas.style.width = `${a}px`, s.canvas.style.height = `${i}px`), n && s.contextType === "2d" && X.pixelRatio !== 1 && s.context.scale(X.pixelRatio, X.pixelRatio), s;
}
const X = {
  idCnt: 0,
  viewports: [],
  pixelRatio: window && window.devicePixelRatio || 1,
  Node: Oo,
  Viewport: Z0,
  Layer: As,
  Scene: Q0,
  Hit: J0
}, Te = X;
class em {
  #e;
  #t;
  #s;
  #r;
  #n;
  constructor(i, s = []) {
    this.#s = i, this.#e = i.core, this.#r = new Me([...s]);
    for (const [n, r] of this.#r)
      this.addOverlay(n, r);
  }
  log(i) {
    this.#e.log(i);
  }
  info(i) {
    this.#e.info(i);
  }
  warn(i) {
    this.#e.warn(i);
  }
  error(i) {
    this.#e.error(i);
  }
  get core() {
    return this.#e;
  }
  get parent() {
    return this.#s;
  }
  get layerConfig() {
    return this.#s.layerConfig().layerConfig;
  }
  get list() {
    return this.#r;
  }
  get scale() {
    return this.#s.parent.scale;
  }
  get time() {
    return this.#s.parent.time;
  }
  start() {
    this.eventsListen();
  }
  destroy() {
    if (this.#r.size != 0)
      for (let i of this.#r.keys())
        this.removeOverlay(i);
  }
  eventsListen() {
  }
  on(i, s, n = this) {
    this.#e.on(i, s, n);
  }
  off(i, s, n = this) {
    this.#e.off(i, s, n);
  }
  emit(i, s) {
    this.#e.emit(i, s);
  }
  get(i) {
    return this.#r.get(i);
  }
  addOverlays(i) {
    let s = [], n, r;
    for (let o of i)
      r = this.addOverlay(o[0], o[1]), n = r.instance?.id || o[0], s.push([n, r]);
    return s;
  }
  addOverlay(i, s) {
    const n = new Te.Layer(this.layerConfig);
    try {
      return this.parent.viewport.addLayer(n), s.layer = n, s.instance = new s.class(
        n,
        this.#s.TimeLine,
        this.#s.Scale,
        this.#e.theme,
        this,
        s.params
      ), E(s.instance?.id) || (s.instance.id = i), this.#r.set(s.instance.id, s), s;
    } catch (r) {
      return n.remove(), s.instance = void 0, this.#r.delete(i), this.#e.error(`ERROR: Cannot instantiate ${i} overlay / indicator : It will not be added to the chart.`), this.#e.error(r), !1;
    }
  }
  removeOverlay(i) {
    if (this.#r.has(i)) {
      const s = this.#r.get(i);
      s.instance?.isIndicator || s.instance.destroy(), s.layer.remove(), this.#r.delete(i);
    }
  }
}
class _i extends F {
  constructor(i, s = !1, n = !1, r, o, l) {
    super(i, s, n, r, o, l), this.params.axes = l?.axes || "both";
  }
  set position(i) {
    this.target.setPosition(i[0], i[1]);
  }
  draw(i) {
    if (!super.mustUpdate() || (i = i || this.params.axes, this.scene.clear(), i == "none"))
      return;
    const s = this.scene.context;
    if (s.save(), s.strokeStyle = this.core.theme.chart.GridColour || so.COLOUR_GRID, i != "y") {
      const r = this.xAxis.xAxisGrads.values;
      for (let o of r) {
        let l = pe(o[1]);
        s.beginPath(), s.moveTo(l + 0, 0), s.lineTo(l + 0, this.scene.height), s.stroke();
      }
    }
    if (i != "x") {
      const n = this.yAxis.yAxisGrads;
      for (let r of n) {
        let o = this.yAxis.$2Pixel(r[0]);
        s.beginPath(), s.moveTo(0, o), s.lineTo(this.scene.width, o), s.stroke();
      }
    }
    s.restore(), super.updated();
  }
  drawX() {
    this.draw("x");
  }
}
class Os extends F {
  #e = [0, 0];
  #t = !0;
  #s;
  constructor(i, s = !1, n = !1, r, o, l) {
    super(i, s, n, r, o, l), this.core.on("chart_pan", this.onMouseDragX, this), this.core.on("chart_panDone", this.onMouseDragX, this), this.core.on("main_mousemove", this.onMouseMoveX, this), this.#s = new Ve(this.target.viewport.container, { disableContextMenu: !1 }), this.#s.on("pointermove", this.onMouseMove.bind(this)), this.#s.on("pointerenter", this.onMouseMove.bind(this));
  }
  set position(i) {
  }
  get update() {
    return this.#t;
  }
  get always() {
    return !0;
  }
  onMouseDragX(i) {
    this.#e[0] = i[0], this.#e[1] = i[1], this.draw(!0), this.core.emit("chart_render");
  }
  onMouseMoveX(i) {
    this.#e[0] = i[0], this.draw(), this.core.emit("chart_render");
  }
  onMouseMove(i) {
    const s = S(i) ? i.position.x : i[0], n = S(i) ? i.position.y : i[1];
    this.#e[0] = s, this.#e[1] = n, this.draw(), this.core.emit("chart_render");
  }
  draw(i = !1) {
    const s = this.target.viewport.container.getBoundingClientRect();
    let n = this.core.mousePos.y - s.top, r = this.core.mousePos.x - s.left;
    i || (r = this.xAxis.xPosSnap2CandlePos(r) + this.xAxis.scrollOffsetPx), this.scene.clear();
    const o = this.scene.context;
    o.save(), o.setLineDash([5, 5]);
    const l = this.xAxis.smoothScrollOffset || 0;
    o.strokeStyle = "#666", o.beginPath(), o.moveTo(r + l, 0), o.lineTo(r + l, this.scene.height), o.stroke(), this.chart.cursorActive && (o.beginPath(), o.moveTo(0, n), o.lineTo(this.scene.width, n), o.stroke()), o.restore(), this.chart.scale.overlays.cursor.instance.scaleDraw();
  }
}
class Ro extends F {
  #e = [0, 0];
  constructor(i, s, n, r, o, l) {
    o = n, n = n.yAxis, super(i, s, n, r, o, l), this.viewport = i.viewport;
  }
  set position(i) {
    this.target.setPosition(i[0], i[1]);
  }
  draw() {
  }
  scaleDraw() {
    if (!this.parent.parent.cursorActive)
      return;
    const i = this.target.viewport.container.getBoundingClientRect();
    let s = this.core.mousePos.y - i.top, n = this.parent.yPos2Price(s), r = this.parent.nicePrice(n), o = {
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
    }, l = o.fontSize + o.paddingTop + o.paddingBottom, h = s - l * 0.5;
    const c = this.scene.context;
    this.scene.clear(), c.save(), c.fillStyle = o.bakCol, c.fillRect(1, h, this.width, l), Tt(c, `${r}`, 1, h, o), c.restore();
  }
  erase() {
    this.scene.clear(), this.target.viewport.render();
  }
}
const tm = [
  ["grid", { class: _i, fixed: !0 }],
  ["cursor", { class: Os, fixed: !0 }]
];
class St {
  #e;
  #t;
  #s;
  #r;
  #n;
  #i;
  #o;
  #a;
  #c;
  #l;
  constructor(i, s, n, r = !1) {
    this.#r = i, this.#e = i.core, this.#t = this.core.config, this.#s = this.core.theme, this.#o = this.#r.element, this.#c = s, this.createViewport(n, r);
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
  set width(i) {
    this.setWidth(i);
  }
  get width() {
    return this.#o.width;
  }
  set height(i) {
    this.setHeight(i);
  }
  get height() {
    return this.#o.height;
  }
  get dimensions() {
    return this.#o.dimensions;
  }
  set layerWidth(i) {
    this.#l = i || this.#o.width;
  }
  get layerWidth() {
    return this.#l;
  }
  get stateMachine() {
    return this.#r.stateMachine;
  }
  set state(i) {
    this.#e.setState(i);
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
    return this.#n;
  }
  get overlays() {
    return this.#i;
  }
  destroy() {
    this.#i.destroy(), this.#n.destroy();
  }
  setSize(i, s, n) {
    const r = this.#i.list;
    this.#n.setSize(i, s);
    for (let [o, l] of r)
      l.instance.setSize(n, s);
    this.draw(), this.render();
  }
  createViewport(i = [], s = !1) {
    i = i.length == 0 ? ue(tm) : i;
    const { width: n, height: r } = this.layerConfig();
    let o = s ? Te.Node : Te.Viewport;
    this.#n = new o({
      width: n,
      height: r,
      container: this.#c
    }), this.#a = this.#n.scene.canvas, this.#i = new em(this, i);
  }
  layerConfig() {
    const i = this.config?.buffer || Bi, s = this.#c.getBoundingClientRect().width, n = this.#c.getBoundingClientRect().height;
    this.layerWidth = Math.round(s * ((100 + i) * 0.01));
    const r = {
      width: this.layerWidth,
      height: n
    };
    return { width: s, height: n, layerConfig: r };
  }
  addOverlays(i) {
    return this.#i.addOverlays(i);
  }
  addOverlay(i, s) {
    return this.#i.addOverlay(i, s);
  }
  removeOverlay(i) {
    return this.#i.removeOverlay(i);
  }
  draw(i = this.range, s = !1) {
    const n = (r, o) => {
      o.instance instanceof F && (s && o.instance.setRefresh(), o.instance.draw(), o.fixed || (o.instance.position = [this.#e.scrollPos, 0]));
    };
    this.executeOverlayList(n);
  }
  drawAll() {
    const i = (s, n) => {
      n.instance instanceof F && n.instance.setRefresh();
    };
    this.executeOverlayList(i);
  }
  executeOverlayList(i) {
    const s = this.#i.list;
    if (!(s instanceof Me))
      return !1;
    let n = [];
    for (let [r, o] of s)
      try {
        i(r, o);
      } catch (l) {
        n.push({ overlay: r, error: l });
      }
    if (n.length > 0)
      for (let r of n)
        this.#e.error(`ERROR: executeOverlayList() ${r.overlay}`), this.#e.error(r.error);
    else
      n = !0;
    return n;
  }
  render() {
    this.#n.render();
  }
  refresh() {
    this.draw(this.range, !0), this.render();
  }
}
class im extends F {
  #e = [0, 0];
  #t;
  constructor(i, s = !1, n = !1, r, o, l) {
    s = o.time.xAxis, super(i, s, n, r, o);
  }
  set position(i) {
    this.target.setPosition(i[0], i[1]);
  }
  draw(i) {
    if (!super.mustUpdate())
      return;
    this.scene.clear();
    const s = this.scene.context, n = this.xAxis.xAxisGrads.values, r = 0, o = this.theme.xAxis, l = Q(o.tickMarker) ? o.tickMarker : !0;
    s.save(), s.strokeStyle = o.colourTick, s.fillStyle = o.colourTick, s.font = `${o.fontWeight} ${o.fontSize}px ${o.fontFamily}`;
    for (let h of n) {
      let c = pe(h[1]), p = Math.floor(s.measureText(`${h[0]}`).width * 0.5);
      s.fillText(h[0], c - p + r, this.xAxis.xAxisTicks + 12), l && (s.beginPath(), s.moveTo(c + r, 0), s.lineTo(c + r, this.xAxis.xAxisTicks), s.stroke());
    }
    s.restore(), super.updated();
  }
}
class sm extends F {
  #e = [0, 0];
  #t;
  constructor(i, s = !1, n = !1, r, o, l) {
    s = o.time.xAxis, super(i, s, n, r, o);
  }
  set position(i) {
    this.target.setPosition(i[0], i[1]);
  }
  draw() {
    this.scene.clear();
    const i = this.scene.context;
    this.xAxis.xAxisGrads.values, this.theme.xAxis, i.save(), i.restore();
  }
}
class nm extends F {
  #e = [0, 0];
  constructor(i, s = !1, n = !1, r, o) {
    s = o.time.xAxis, super(i, s, n, r, o), this.viewport = i.viewport;
  }
  set position(i) {
    this.target.setPosition(i[0], i[1]);
  }
  draw() {
    const i = this.scene.context, s = this.target.viewport.container.getBoundingClientRect(), n = this.core.mousePos.x - s.left;
    let r = this.xAxis.xPos2Time(n), o = new Date(r), l = o.toUTCString(), h = {
      fontSize: this.theme.xAxis.fontSize * 1.05,
      fontWeight: this.theme.xAxis.fontWeight,
      fontFamily: this.theme.xAxis.fontFamily,
      txtCol: this.theme.xAxis.colourCursor,
      bakCol: this.theme.xAxis.colourCursorBG,
      paddingTop: 5,
      paddingBottom: 3,
      paddingLeft: 4,
      paddingRight: 4
    }, c = zi(i, l, h), p = n + this.core.bufferPx;
    p = this.xAxis.xPosSnap2CandlePos(p), p = p - Math.round(c * 0.5) - this.core.scrollPos - this.core.bufferPx, this.scene.clear(), i.save(), Tt(i, l, p, 1, h), i.restore();
  }
}
const rm = [
  ["labels", { class: im, fixed: !1, required: !0 }],
  ["overlay", { class: sm, fixed: !1, required: !0 }],
  ["cursor", { class: nm, fixed: !1, required: !0 }]
];
class om {
  #e;
  #t = "Timeline";
  #s = "time";
  #r;
  #n;
  #i;
  #o;
  #a;
  #c;
  #l;
  #h;
  #d;
  #u = new Me();
  #m = [];
  #v;
  #f;
  #x;
  #w;
  #p;
  #T;
  #P;
  #g;
  #C;
  #S;
  #D;
  #A;
  #O;
  #b;
  #M = {
    width: 20,
    height: 20,
    fill: "#aaa"
  };
  #E = { end: !1, start: !1 };
  constructor(i, s) {
    this.#i = i, this.#r = s, this.#n = s.elements.elTime, this.#o = i.Chart, this.#a = new Li(this, this.#o), this.init();
  }
  log(i) {
    this.#i.log(i);
  }
  info(i) {
    this.#i.info(i);
  }
  warn(i) {
    this.#i.warn(i);
  }
  error(i) {
    this.#i.error(i);
  }
  set id(i) {
    this.#e = _e(i);
  }
  get id() {
    return this.#e || `${this.#i.id}-${this.#s}`;
  }
  get name() {
    return this.#t;
  }
  get shortName() {
    return this.#s;
  }
  get options() {
    return this.#r;
  }
  get core() {
    return this.#i;
  }
  get element() {
    return this.#n;
  }
  get elViewport() {
    return this.#l;
  }
  get height() {
    return this.#n.height;
  }
  set width(i) {
    this.setWidth(i);
  }
  get width() {
    return this.#n.width;
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
  get layerCursor() {
    return this.#C;
  }
  get layerLabels() {
    return this.#P;
  }
  get layerOverlays() {
    return this.#g;
  }
  get overlays() {
    return Object.fromEntries([...this.#d.overlays.list]);
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
    return this.#i.theme;
  }
  get config() {
    return this.#i.config;
  }
  get graph() {
    return this.#d;
  }
  get navigation() {
    return this.#v;
  }
  get range() {
    return this.#i.range;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return ce(this.#n);
  }
  get bufferPx() {
    return this.#i.bufferPx;
  }
  get scrollPos() {
    return this.#i.scrollPos;
  }
  get scrollOffsetPx() {
    return this.#i.scrollPos % this.candleW;
  }
  get smoothScrollOffset() {
    return this.#i.smoothScrollOffset;
  }
  get rangeScrollOffset() {
    return this.#i.rangeScrollOffset;
  }
  set stateMachine(i) {
    this.#c = new Xe(i, this);
  }
  get stateMachine() {
    return this.#c;
  }
  get time() {
    return this;
  }
  init() {
    const i = this.#n;
    this.#l = i.viewport, this.#h = i.overview, this.#f = i.overview.icons, this.#x = i.overview.scrollBar, this.#w = i.overview.handle, this.#p = i.overview.rwdStart, this.#T = i.overview.fwdEnd;
    const s = {
      core: this.#i,
      elContainer: this.#x,
      elHandle: this.#w,
      callback: null
    };
    this.#b = new on(s), this.#i.theme?.time?.navigation === !1 && this.navigationDisplay(!1);
  }
  setWidth(i) {
    this.#n.style.width = `${i}px`, this.#l.style.width = `${i}px`;
  }
  setDimensions(i) {
    const s = this.config.buffer || Bi, n = i.w, r = this.height, o = Math.round(n * ((100 + s) * 0.01));
    this.#d.setSize(n, r, o), this.draw();
  }
  navigationDisplay(i) {
    if (i)
      this.#T.style["margin-top"] = 0, this.#p.style["margin-top"] = 0;
    else {
      const s = this.core.theme.xAxis?.background ? this.core.theme.xAxis.Background : this.core.theme.chart.Background;
      this.#h.style.visibility = "hidden", this.#T.style["margin-top"] = `${this.#l.clientHeight * -1}px`, this.#p.style["margin-top"] = `${this.#l.clientHeight * -1}px`, this.#T.style.background = this.core.theme.chart.Background, this.#p.style.background = s;
    }
  }
  start() {
    this.createGraph(), this.onSetRange(), this.#a.initXAxisGrads(), this.draw(), this.eventsListen(), ls.id = this.id, ls.context = this, this.stateMachine = ls, this.stateMachine.start();
  }
  destroy() {
    this.stateMachine.destroy(), this.#S.destroy(), this.#D.destroy(), this.#A.destroy(), this.#i.hub.expunge(this), this.off("main_mousemove", this.#C.draw, this.#C), this.#T.removeEventListener("click", ke), this.#p.removeEventListener("click", ke), this.#d.destroy(), this.element.remove();
  }
  eventsListen() {
    this.#S = new Ve(this.#l, { disableContextMenu: !1 }), this.#S.on("dblclick", this.onDoubleClick.bind(this)), this.#S.on("pointerover", this.onPointerEnter.bind(this)), this.#S.on("pointerout", this.onPointerLeave.bind(this)), this.#S.on("pointerdrag", this.onPointerDrag.bind(this)), this.#D = new Ve(this.#T, { disableContextMenu: !1 }), this.#D.on("pointerover", () => this.showJump(this.#E.end)), this.#D.on("pointerleave", () => this.hideJump(this.#E.end)), this.#A = new Ve(this.#p, { disableContextMenu: !1 }), this.#A.on("pointerover", () => this.showJump(this.#E.start)), this.#A.on("pointerleave", () => this.hideJump(this.#E.start)), this.on("main_mousemove", this.#C.draw, this.#C), this.on("setRange", this.onSetRange, this), this.#T.addEventListener("click", ke(this.onPointerClick, 1e3, this, !0)), this.#p.addEventListener("click", ke(this.onPointerClick, 1e3, this, !0));
  }
  on(i, s, n = this) {
    this.#i.on(i, s, n);
  }
  off(i, s, n = this) {
    this.#i.off(i, s, n);
  }
  emit(i, s) {
    this.#i.emit(i, s);
  }
  onPointerClick(i) {
    switch (i?.currentTarget?.id || i.target.parentElement.id) {
      case "fwdEnd":
        this.onFwdEnd();
        break;
      case "rwdStart":
        this.onRwdStart();
        break;
    }
  }
  onPointerEnter(i) {
    i.domEvent.target.style.cursor = "ew-resize", this.#h.style.visibility = "visible", this.hideCursorTime();
  }
  onPointerLeave(i) {
    this.#i.theme?.time?.navigation === !1 && !(this.#E.end && this.#E.start) && (this.#h.style.visibility = "hidden");
  }
  onPointerDrag(i) {
    let s = this.range, n = s.indexStart - i.movement.x, r = s.indexEnd;
    s.set(n, r);
  }
  onDoubleClick(i) {
    this.core.jumpToEnd(), this.core.MainPane.draw(void 0, !0);
  }
  onFwdEnd() {
    this.core.jumpToEnd(), this.core.MainPane.draw(void 0, !0);
  }
  onRwdStart() {
    this.core.jumpToStart(), this.core.MainPane.draw(void 0, !0);
  }
  onSetRange() {
    let i = this.range, s = i.indexStart;
    i.indexEnd;
    let n = this.#x.getBoundingClientRect().width, r = i.dataLength + i.limitFuture + i.limitPast, o = n / r, l = i.Length * o, h = (s + i.limitPast) * o;
    this.#b.setHandleDims(h, l);
  }
  t2Index(i) {
    return this.#a.t2Index(i);
  }
  xPos(i) {
    return this.#a.xPos(i);
  }
  xPosSnap2CandlePos(i) {
    return this.#a.xPosSnap2CandlePos(i);
  }
  xPos2Time(i) {
    return this.#a.xPos2Time(i);
  }
  xPos2Index(i) {
    return this.#a.xPos2Index(i);
  }
  xPosOHLCV(i) {
    return this.#a.xPosOHLCV(i);
  }
  createGraph() {
    let i = ue(rm);
    this.#d = new St(this, this.#l, i, !1), this.#C = this.graph.overlays.get("cursor").instance, this.#P = this.graph.overlays.get("labels").instance, this.#g = this.graph.overlays.get("overlay").instance, this.graph.addOverlays(this.#m);
  }
  addOverlays(i) {
    if (!isArray(i))
      return !1;
    this.graph === void 0 ? this.#m.push(...i) : this.graph.addOverlays(i);
  }
  addOverlay(i, s) {
    if (!isObject(s))
      return !1;
    if (this.graph === void 0)
      this.#m.push([i, s]);
    else
      return this.graph.addOverlay(i, s);
  }
  render() {
    this.#d.render();
  }
  draw(i = this.range, s = !0) {
    this.#d.draw(i, s);
  }
  hideCursorTime() {
    this.#d.overlays.list.get("cursor").layer.visible = !1, this.#i.MainPane.draw();
  }
  showCursorTime() {
    this.#d.overlays.list.get("cursor").layer.visible = !0, this.#i.MainPane.draw();
  }
  hideJump(i) {
    this.#i.theme?.time?.navigation === !1 && (this.#h.style.visibility = "hidden");
  }
  showJump(i) {
    this.#h.style.visibility = "visible", this.hideCursorTime();
  }
}
const am = {
  renderQ: new Me(),
  rendered: [],
  renderLog: !1,
  dropFrames: !0,
  graphs: [],
  range: {},
  status: !1,
  init: function(a) {
    S(a) && (this.renderLog = a?.renderLog || !1, this.dropFrames = a?.dropFrames || !0, this.graphs = A(a?.graphs) ? [...a.graphs] : [], this.range = S(a?.range) ? a.range : {});
  },
  queueFrame: function(a = this.range, i = this.graphs, s = !1) {
    this.renderQ.size > 1 && this.dropFrames && (s = this.dropFrame() || s);
    const n = Date.now();
    return a = a.snapshot(), this.renderQ.set(n, { graphs: i, range: a, update: s }), n;
  },
  dropFrame: function(a = -1) {
    let i = !1;
    return a === -1 && (a = this.renderQ.lastKey()), this.renderQ.size > 1 && this.renderQ.has(a) && (i = a.update, this.renderQ.delete(a)), i;
  },
  expungeFrames() {
    this.renderQ.clear();
  },
  getFrame: function(a = 0) {
    return this.renderQ.has(a) ? this.renderQ.get(a) : this.renderQ.firstValue();
  },
  frameDone: function() {
    if (this.renderQ.size === 0)
      return;
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
    if (!this.status || (requestAnimationFrame(this.execute.bind(this)), this.renderQ.size === 0))
      return;
    const [a, i] = this.renderQ.firstEntry();
    if (i.range?.snapshot) {
      for (let s of i.graphs)
        U(s.draw) && s?.status !== "destroyed" && s.draw(i.range, i.update);
      for (let s of i.graphs)
        U(s.render) && s?.status !== "destroyed" && s.render();
      this.frameDone();
    }
  }
}, lm = am, wr = [
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
  #s;
  #r;
  #n;
  #i;
  #o;
  #a = [];
  #c;
  #l = {};
  #h;
  #d;
  #u = null;
  constructor(i, s) {
    this.#e = i, this.#t = s, this.#s = s.core, this.#r = s.core.theme.legend, this.init(), this.eventsListen();
  }
  get elTarget() {
    return this.#e;
  }
  get list() {
    return this.#l;
  }
  set collapse(i) {
    this.setCollapse(i);
  }
  get collapse() {
    return this.#o;
  }
  destroy() {
    this.#s.hub.expunge(this);
    for (let i in this.#l)
      i !== "collapse" && this.remove(i);
    this.#e.remove();
  }
  eventsListen() {
    this.#s.on("chart_pan", this.primaryPanePan, this), this.#s.on("chart_panDone", this.primaryPanePanDone, this);
  }
  init() {
    const i = this.#e.legends;
    this.#i = i.querySelector(".controls"), this.#o = i.querySelectorAll(".control"), this.#h = i.querySelector("#showLegends"), this.#d = i.querySelector("#hideLegends"), this.#i.style.display = "none", this.icons(this.#o, { id: "collapse", parent: this }), this.#e.legends.classList.add("hide"), this.#u = "hide", this.collapse = "show";
  }
  onPointerClick(i) {
    const s = (n) => E(n.dataset.icon) ? { id: n.id, icon: n.dataset.icon, parent: n.parentElement } : n.parentElement.className !== "controls" ? s(n.parentElement) : !1;
    return s(i);
  }
  onMouseOver(i) {
  }
  onLegendAction(i) {
    const s = this.onPointerClick(i.currentTarget);
    this.setCollapse(s.icon);
  }
  setCollapse(i) {
    i === "show" && this.#u !== "show" ? (this.#u = i, this.#h.style.display = "none", this.#d.style.display = "inline-block", this.#e.legends.classList.toggle("hide")) : i === "hide" && this.#u !== "hide" && (this.#u = i, this.#h.style.display = "inline-block", this.#d.style.display = "none", this.#e.legends.classList.toggle("hide"));
  }
  primaryPanePan() {
    for (let i of wr)
      this.#e.style.setProperty(i, "none");
  }
  primaryPanePanDone() {
    for (let i of wr)
      this.#e.style.removeProperty(i);
  }
  add(i) {
    if (!S(i))
      return !1;
    const s = () => {
      this.#s.error("ERROR: Legend parent missing!");
    };
    i.id = i?.id || Pe("legend"), i.type = i?.type || "overlay", i.title = i?.title || i?.parent.legendName, i.parent = i?.parent || s;
    const n = this.elTarget.buildLegend(i, this.#s.theme);
    this.#e.legends.insertAdjacentHTML("beforeend", n);
    const r = this.#e.legends.querySelector(`#legend_${i.id}`);
    return this.#c = r.querySelectorAll(".control"), this.#l[i.id] = {
      el: r,
      type: i.type,
      source: i?.source,
      click: []
    }, this.icons(this.#c, i), i.type == "indicator" && (this.#i.style.display = "block", !i.parent.primaryPane && Object.keys(this.#l).length < 3 && (this.#i.style.display = "none")), i.id;
  }
  remove(i) {
    if (!(i in this.#l) || this.#l[i].type === "chart")
      return !1;
    this.#l[i].el.remove();
    for (let s of this.#l[i].click)
      s.el.removeEventListener("click", s.click);
    return delete this.#l[i], Object.keys(this.#l).length < 2 && (this.#i.style.display = "none"), !0;
  }
  update(i, s) {
    if (!S(s) || !(i in this.#l) || this.#s.range.data.length == 0)
      return !1;
    let n = this.#l[i].source(s.pos);
    const r = this.#e.buildInputs(n);
    this.#e.legends.querySelector(`#legend_${i} dl`).innerHTML = r;
  }
  modify(i, s) {
    if (!(i in this.#l) || !S(s))
      return !1;
    const n = this.#l[i].el;
    for (let r in s)
      switch (r) {
        case "legendName":
          const o = n.querySelectorAll(".title");
          return o[0].innerHTML = s[r], o[1].innerHTML = s[r], !0;
        case "legendVisibility":
          const l = s[r] ? "block" : "none";
          return n.style.display = l, !0;
      }
  }
  icons(i, s) {
    let n;
    for (let r of i) {
      let o = r.querySelector("svg");
      o.style.width = `${this.#r.controlsW}px`, o.style.height = `${this.#r.controlsH}px`, o.style.fill = `${this.#r.controlsColour}`, o.onpointerover = (l) => l.currentTarget.style.fill = this.#r.controlsOver, o.onpointerout = (l) => l.currentTarget.style.fill = this.#r.controlsColour, n = s.parent.onLegendAction.bind(s.parent), s.id === "collapse" ? this.#a.push({ el: r, click: n }) : this.#l[s.id].click.push({ el: r, click: n }), r.addEventListener("click", n);
    }
  }
}
const hs = {
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
    toolSelectedThis(a, i) {
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
class um extends F {
  constructor(i, s, n, r, o, l) {
    o = n, n = n.yAxis, super(i, s, n, r, o, l), this.viewport = i.viewport;
  }
  set position(i) {
    this.target.setPosition(i[0], i[1]);
  }
  get always() {
    return !0;
  }
  draw() {
    if (!super.mustUpdate())
      return;
    const i = this.scene.context, s = this.yAxis, n = this.yAxis.calcGradations() || [], r = this.theme.yAxis, o = Q(r.tickMarker) ? r.tickMarker : !0;
    let l = [], h;
    switch (r?.location) {
      case "left":
        l = [this.width, this.width - s.yAxisTicks];
        break;
      case "right":
      default:
        l = [1, s.yAxisTicks];
        break;
    }
    this.scene.clear(), i.save(), i.strokeStyle = r.colourTick, i.fillStyle = r.colourTick, i.font = `${r.fontWeight} ${r.fontSize}px ${r.fontFamily}`;
    for (let c of n)
      h = s.$2Pixel(c[0]), i.fillText(c[0], s.yAxisTicks + 5, h + r.fontSize * 0.3), o && (i.beginPath(), i.moveTo(l[0], h), i.lineTo(l[1], h), i.stroke());
    i.restore(), super.updated();
  }
}
class dm extends F {
  constructor(i, s, n, r, o, l) {
    o = n, n = n.yAxis, super(i, s, n, r, o, l), this.viewport = i.viewport;
  }
  set position(i) {
    this.target.setPosition(i[0], i[1]);
  }
  draw() {
    const i = this.scene.context;
    this.yAxis.yAxis, this.scene.clear(), i.save(), i.restore();
  }
}
class mm extends F {
  constructor(i, s, n, r, o, l) {
    o = n, n = n.yAxis, super(i, s, n, r, o, l), this.viewport = i.viewport;
  }
  set position(i) {
    this.target.setPosition(i[0], i[1]);
  }
  draw(i) {
    if (i === void 0)
      return;
    const s = this.scene.context, n = this.core.stream instanceof xt && this.config.stream.tfCountDown;
    let r = i[4], o = this.parent.nicePrice(r), l = {
      fontSize: Re.FONTSIZE * 1.05,
      fontWeight: Re.FONTWEIGHT,
      fontFamily: Re.FONTFAMILY,
      txtCol: "#FFFFFF",
      bakCol: Re.COLOUR_CURSOR_BG,
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 5,
      paddingRight: 3,
      width: this.viewport.width
    }, h = 0, c = Wi(l), p = this.parent.yPos(r) - c * 0.5;
    this.scene.clear(), s.save(), i[4] >= i[1] ? l.bakCol = this.theme.candle.UpBodyColour : l.bakCol = this.theme.candle.DnBodyColour, Tt(s, o, h, p, l), n && (o = this.core.stream.countDownUpdate(), l.fontSize = l?.fontSize / 1.1, Tt(s, o, h, p + c, l)), s.restore(), this.viewport.render();
  }
}
const pm = [
  ["labels", { class: um, fixed: !0, required: !0 }],
  ["overlay", { class: dm, fixed: !0, required: !0 }],
  ["price", { class: mm, fixed: !0, required: !0 }],
  ["cursor", { class: Ro, fixed: !0, required: !0 }]
];
class gm {
  #e;
  #t = "Y Scale Axis";
  #s = "scale";
  #r;
  #n;
  #i;
  #o;
  #a;
  #c;
  #l;
  #h;
  #d;
  #u;
  #m;
  #v;
  #f;
  #x = new Me();
  #w = [];
  #p;
  #T;
  #P;
  #g;
  #C;
  #S = {};
  constructor(i, s) {
    this.#r = i, this.#n = { ...s }, this.#h = this.#n.elScale, this.#a = this.#n.chart, this.#i = this.#n.parent, this.id = `${this.#i.id}_scale`, this.#d = this.#h.viewport || this.#h;
  }
  log(i) {
    this.#r.log(i);
  }
  info(i) {
    this.#r.info(i);
  }
  warn(i) {
    this.#r.warn(i);
  }
  error(i) {
    this.#r.error(i);
  }
  set id(i) {
    this.#e = _e(i);
  }
  get id() {
    return this.#e || `${this.#r.id}-${this.#s}`;
  }
  get name() {
    return this.#t;
  }
  get shortName() {
    return this.#s;
  }
  get core() {
    return this.#r;
  }
  get options() {
    return this.#n;
  }
  get parent() {
    return this.#i;
  }
  set height(i) {
    this.setHeight(i);
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
  set cursor(i) {
    this.#h.style.cursor = i;
  }
  get cursor() {
    return this.#h.style.cursor;
  }
  get layerCursor() {
    return this.#f;
  }
  get layerLabels() {
    return this.#u;
  }
  get layerOverlays() {
    return this.#m;
  }
  get layerPriceLine() {
    return this.#v;
  }
  get overlays() {
    return Object.fromEntries([...this.#p.overlays.list]);
  }
  get yAxis() {
    return this.#l;
  }
  set yAxisType(i) {
    this.#l.yAxisType = YAXIS_TYPES.includes(i) ? i : YAXIS_TYPES[0];
  }
  get yAxisType() {
    return this.#l.yAxisType;
  }
  get yAxisHeight() {
    return this.#l.height;
  }
  get yAxisRatio() {
    return this.#l.yAxisRatio;
  }
  get yAxisGrads() {
    return this.#l.yAxisGrads;
  }
  set graph(i) {
    this.#p = i;
  }
  get graph() {
    return this.#p;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return ce(this.#h);
  }
  get theme() {
    return this.#r.theme;
  }
  get config() {
    return this.#r.config;
  }
  get digitCnt() {
    return this.#T;
  }
  set scaleRange(i) {
    this.setScaleRange(i);
  }
  get range() {
    return this.#l.range;
  }
  set rangeMode(i) {
    this.#l.mode = i;
  }
  get rangeMode() {
    return this.#l.mode;
  }
  set rangeYFactor(i) {
    this.core.range.yFactor(i);
  }
  set yOffset(i) {
    this.#l.offset = i;
  }
  get yOffset() {
    return this.#l.offset;
  }
  set stateMachine(i) {
    this.#o = new Xe(i, this);
  }
  get stateMachine() {
    return this.#o;
  }
  get Scale() {
    return this;
  }
  start() {
    const i = this.#i.name == "Chart" ? void 0 : this.#i.localRange;
    this.#l = new Ai(this, this, this.options.yAxisType, i), this.createGraph(), this.#l.calcGradations(), this.draw(), this.eventsListen();
    const s = ue(cm);
    s.id = this.id, s.context = this, this.stateMachine = s, this.stateMachine.start();
  }
  restart() {
    this.#l.setRange(this.#r.range), this.draw();
  }
  destroy() {
    this.#r.hub.expunge(this), this.off(`${this.#i.id}_pointerout`, this.#f.erase, this.#f), this.off(et, this.onStreamUpdate, this.#v), this.stateMachine.destroy(), this.#p.destroy(), this.#P.destroy(), this.element.remove();
  }
  eventsListen() {
    let i = this.#p.viewport.scene.canvas;
    this.#P = new Ve(i, { disableContextMenu: !1 }), this.#P.setCursor("ns-resize"), this.#P.on("pointerdrag", this.onDrag.bind(this)), this.#P.on("pointerdragend", this.onDragDone.bind(this)), this.#P.on("wheel", this.onMouseWheel.bind(this)), this.#P.on("dblclick", this.resetScaleRange.bind(this)), this.on(`${this.#i.id}_pointermove`, this.onMouseMove, this), this.on(`${this.#i.id}_pointerout`, this.#f.erase, this.#f), this.on(et, this.#v.draw, this.#v), this.on("setRange", this.draw, this);
  }
  on(i, s, n = this) {
    this.core.on(i, s, n);
  }
  off(i, s, n = this) {
    this.core.off(i, s, n);
  }
  emit(i, s) {
    this.core.emit(i, s);
  }
  onResize(i) {
    this.setDimensions(i);
  }
  onMouseMove(i) {
    this.#C = A(i) ? i : [Math.floor(i.position.x), Math.floor(i.position.y)], this.#f.draw(this.#C);
  }
  onDrag(i) {
    this.#C = [
      Math.floor(i.position.x),
      Math.floor(i.position.y),
      i.dragstart.x,
      i.dragstart.y,
      i.movement.x,
      i.movement.y
    ], this.setScaleRange(Math.sign(i.movement.y));
  }
  onDragDone(i) {
  }
  onMouseWheel(i) {
    i.domEvent.preventDefault(), this.setScaleRange(Math.sign(i.wheeldelta) * -2);
  }
  onStreamUpdate(i) {
  }
  onChartDrag(i) {
    this.#l.mode === "manual" && (this.#l.offset = i.domEvent.srcEvent.movementY, this.draw());
  }
  setHeight(i) {
    this.#h.style.height = `${i}px`;
  }
  setDimensions(i) {
    const s = this.#h.getBoundingClientRect().width;
    this.setHeight(i.h), this.graph instanceof St && (this.#p.setSize(s, i.h, s), this.draw()), this.#f instanceof Ro && this.calcPriceDigits();
  }
  setScaleRange(i = 0) {
    this.#l.mode == "automatic" && (this.#l.mode = "manual"), this.#l.zoom = i, this.draw(this.range, !0), this.#r.MainPane.draw();
  }
  resetScaleRange() {
    this.#l.mode = "automatic", this.draw(this.range, !0), this.#r.MainPane.draw();
  }
  yPos(i) {
    return this.#l.yPos(i);
  }
  yPosStream(i) {
    return this.#l.lastYData2Pixel(i);
  }
  yPos2Price(i) {
    return this.#l.yPos2Price(i);
  }
  nicePrice(i) {
    let s = Ss(i);
    return Es(s, this.config.precision);
  }
  createGraph() {
    let i = ue(pm);
    this.graph = new St(this, this.#d, i, !1), this.#f = this.graph.overlays.get("cursor").instance, this.#u = this.graph.overlays.get("labels").instance, this.#m = this.graph.overlays.get("overlay").instance, this.#v = this.graph.overlays.get("price").instance, this.graph.addOverlays(this.#w), this.#v.target.moveTop(), this.#f.target.moveTop(), this.calcPriceDigits();
  }
  calcPriceDigits() {
    let i = 8;
    if (this.#r.range.dataLength > 0) {
      const s = this.#r.range.valueMax, n = Ss(s);
      i = `${Es(n, this.config.precision)}`.length + 2;
    }
    return this.#T = i, this.#T;
  }
  calcScaleWidth() {
    const i = this.calcPriceDigits(), s = this.#r.MainPane.graph.viewport.scene.context, n = this.theme.yAxis;
    s.font = Pt(n.fontSize, n.fontWeight, n.fontFamily);
    const r = Js(s, "0");
    return i * r;
  }
  addOverlays(i) {
    if (!A(i))
      return !1;
    this.graph === void 0 ? this.#w.push(...i) : this.graph.addOverlays(i);
  }
  addOverlay(i, s) {
    if (!S(s))
      return !1;
    if (this.graph === void 0)
      this.#w.push([i, s]);
    else {
      let n = this.graph.addOverlay(i, s);
      return this.#v.target.moveTop(), this.#f.target.moveTop(), n;
    }
  }
  render() {
    this.#p.render();
  }
  draw(i = this.range, s = !0) {
    this.#p.draw(i, s), this.#i.drawGrid(s), this.parent.draw(this.range, !0);
  }
  resize(i = this.width, s = this.height) {
    this.setDimensions({ w: i, h: s });
  }
}
class fm extends F {
  watermark = {};
  constructor(i, s = !1, n = !1, r, o, l) {
    super(i, s, n, r, o, l), this.params.content = l?.content || "";
  }
  set position(i) {
    this.target.setPosition(0, 0);
  }
  draw() {
    const i = this.config?.watermark;
    if (super.mustUpdate(), i?.display !== !1) {
      if (i?.imgURL)
        this.watermark.imgURL = i.imgURL, _s(i?.imgURL, this.renderImage.bind(this));
      else if (E(i?.text)) {
        this.watermark.text = i.text, this.scene.clear();
        const s = this.scene.context;
        s.save(), this.renderText(i.text), s.restore();
      } else
        return;
      super.updated();
    }
  }
  renderText(i) {
    const s = Math.floor(this.core.height / Ye), n = this.core.config?.watermark?.fontSize, r = this.core.config?.watermark?.fontWeight, o = this.core.config?.watermark?.fontFamily, l = this.core.config?.watermark?.textColour, h = {
      fontSize: (n || this.theme.watermark.FONTSIZE) * s,
      fontWeight: r || this.theme.watermark.FONTWEIGHT,
      fontFamily: o || this.theme.watermark.FONTFAMILY,
      txtCol: l || this.theme.watermark.COLOUR
    }, c = this.scene.context;
    c.font = Pt(h?.fontSize, h?.fontWeight, h?.fontFamily), c.textBaseline = "top", c.fillStyle = h.txtCol;
    const p = Wi(h), f = zi(c, i, h), x = (this.scene.width - f) / 2, P = (this.core.Chart.height - p) / 2;
    c.fillText(i, x, P);
  }
  renderImage(i) {
    if (!i)
      return;
    const s = this.core.config?.watermark?.imgHeight || this.theme.watermark.IMGHEIGHT, n = this.core.config?.watermark?.imgWidth || this.theme.watermark.IMGWIDTH, r = (this.scene.width - n) / 2, o = (this.scene.height - s) / 2;
    this.scene.clear();
    const l = this.scene.context;
    l.save(), go(l, i, r, o, s, n), l.restore();
  }
}
class ym extends F {
  #e;
  #t;
  constructor(i, s = !1, n = !1, r, o, l) {
    super(i, s, n, r, o, l), this.#e = new Po(i.scene, r), this.theme.volume.Height = _(r?.volume?.Height, 0, 100) || 100;
  }
  set position(i) {
    this.target.setPosition(i[0], i[1]);
  }
  draw(i = this.core.range) {
    if (!super.mustUpdate())
      return;
    this.scene.clear();
    const s = i.data, n = this.scene.height, r = this.xAxis.smoothScrollOffset || 0;
    let o = Math.max(this.xAxis.candleW - 1, 1);
    o < 3 ? o = 1 : o < 5 ? o = 3 : o > 5 && (o = Math.ceil(o * 0.8));
    const l = {
      x: 0 + r - this.xAxis.candleW,
      w: o,
      z: n
    }, h = Math.floor(n * this.theme.volume.Height / 100);
    let c = this.core.rangeScrollOffset, p = i.indexStart - c, f = i.Length + c * 2, x = f, P = p, L, O = 0;
    for (; x--; )
      L = i.value(P), L[4] !== null && (O = L[5] > O ? L[5] : O), P++;
    for (; f--; )
      L = i.value(p), l.x = pe(this.xAxis.xPos(L[0]) - o / 2), L[4] !== null && (l.h = h - h * ((O - L[5]) / O), l.raw = s[p], this.#e.draw(l)), p++;
    super.updated();
  }
}
class Do {
  areaCoordinates = [];
  constructor(i, s) {
    this.scene = i, this.ctx = this.scene.context, this.width = this.scene.width, this.cfg = s;
  }
  draw(i) {
    const s = this.ctx, n = i.raw[4] >= i.raw[1], r = n ? this.cfg.candle.UpBodyColour : this.cfg.candle.DnBodyColour, o = n ? this.cfg.candle.UpWickColour : this.cfg.candle.DnWickColour;
    switch (this.cfg.candle.Type) {
      case ee.CANDLE_SOLID:
        this.fill = !0;
        break;
      case ee.CANDLE_HOLLOW:
      case ee.OHLC:
        this.fill = !1;
        break;
      case ee.CANDLE_UP_HOLLOW:
        this.fill = !n;
        break;
      case ee.CANDLE_DOWN_HOLLOW:
        this.fill = n;
    }
    let l = Math.max(i.w - 1, 1);
    l < 3 ? l = 1 : l < 5 ? l = 3 : l > 5 && (l = Math.ceil(l * 0.8));
    let h = Math.max(Math.floor(l * 0.5), 1), c = Math.abs(i.o - i.c), p = i.c === i.o ? 1 : 2, f = i.x, x = Math.floor(f) - 0.5;
    if (s.save(), s.strokeStyle = o, s.beginPath(), s.moveTo(x, Math.floor(i.h)), this.cfg.candle.Type === ee.OHLC ? s.lineTo(x, Math.floor(i.l)) : n ? (s.lineTo(x, Math.floor(i.c)), s.moveTo(x, Math.floor(i.o))) : (s.lineTo(x, Math.floor(i.o)), s.moveTo(x, Math.floor(i.c))), s.lineTo(x, Math.floor(i.l)), s.stroke(), l == 3) {
      s.fillStyle = o;
      let P = n ? 1 : -1;
      s.rect(
        Math.floor(f - h),
        i.c,
        Math.floor(h * 2),
        P * Math.max(c, p)
      ), s.fill(), s.stroke();
    } else if (l > 3 && this.fill) {
      s.fillStyle = r;
      let P = n ? 1 : -1;
      s.rect(
        Math.floor(f - h),
        i.c,
        Math.floor(h * 2),
        P * Math.max(c, p)
      ), s.fill(), s.stroke();
    } else if (l > 3 && !this.fill && this.cfg.candle.Type !== ee.OHLC) {
      let P = n ? 1 : -1;
      s.rect(
        Math.floor(f - h),
        i.c,
        Math.floor(h * 2),
        P * Math.max(c, p)
      ), s.stroke();
    } else
      this.cfg.candle.Type === ee.OHLC ? (s.beginPath(), s.moveTo(x - h, i.o), s.lineTo(x, i.o), s.moveTo(x, i.c), s.lineTo(x + h, i.c), s.stroke()) : (s.strokeStyle = o, s.beginPath(), s.moveTo(
        x,
        Math.floor(Math.min(i.o, i.c))
      ), s.lineTo(
        x,
        Math.floor(Math.max(i.o, i.c)) + (i.o === i.c ? 1 : 0)
      ), s.stroke());
    s.restore();
  }
  body(i) {
  }
  area(i) {
    this.areaCoordinates.push(i);
  }
  areaRender() {
    const i = this.areaCoordinates;
    if (!A(i) || i.length == 0)
      return;
    let s = this.ctx, n = this.cfg.candle, r;
    Math.max(i[0].w - 1, 1), i[0].x;
    let o = [i[0].x, i[0].h];
    s.save(), s.strokeStyle = n.AreaLineColour || n.UpBodyColour || n.DnBodyColour, s.lineWidth = 1, s.beginPath(), s.moveTo(i[0].x, i[0].h);
    let l = 0;
    for (; l < i.length; )
      s.lineTo(i[l].x, i[l].h), l++;
    if (n?.Type == "area") {
      if (r = s.createLinearGradient(0, 0, 0, this.scene.height), A(n.AreaFillColour))
        for (let [h, c] of n.AreaFillColour.entries())
          r.addColorStop(h, c);
      else
        E() ? r = n.AreaFillColour : r = n.UpBodyColour || n.DnBodyColour;
      s.stroke(), s.lineTo(i[l - 1].x, this.scene.height), s.lineTo(o[0], this.scene.height), s.fillStyle = r, s.closePath(), s.fill();
    } else
      s.stroke();
    s.restore(), i.length = 0;
  }
}
class ko extends F {
  #e;
  constructor(i, s = !1, n = !1, r, o) {
    super(i, s, n, r, o), this.#e = new Do(i.scene, r);
  }
  set position(i) {
    this.target.setPosition(i[0], i[1]);
  }
  draw(i = this.core.range) {
    if (!super.mustUpdate())
      return;
    this.scene.clear();
    let s, n = this.theme.candle.Type;
    switch (n) {
      case ee.AREA:
      case ee.LINE:
        s = (f) => {
          this.#e.area({ ...f });
        };
        break;
      default:
        s = (f) => {
          this.#e.draw(f);
        };
        break;
    }
    const o = {
      x: (this.xAxis.smoothScrollOffset || 0) - this.xAxis.candleW,
      w: this.xAxis.candleW
    };
    let l = this.core.rangeScrollOffset, h = i.indexStart - l, c = i.Length + l * 2, p;
    for (this.core.stream && (this.core.stream.lastPriceMax = i.valueMax, this.core.stream.lastPriceMin = i.valueMin); c; ) {
      if (h >= 0) {
        if (p = i.value(h), o.x = this.xAxis.xPos(p[0]), p?.[7]) {
          this.core.stream.lastXPos = o.x, this.core.stream.lastYPos = { ...o };
          break;
        }
        p[4] !== null && (o.o = this.yAxis.yPos(p[1]), o.h = this.yAxis.yPos(p[2]), o.l = this.yAxis.yPos(p[3]), o.c = this.yAxis.yPos(p[4]), o.raw = p, s(o));
      }
      h++, c--;
    }
    (n === ee.AREA || n === ee.LINE) && this.#e.areaRender(), super.updated();
  }
}
class vm extends F {
  #e;
  constructor(i, s = !1, n = !1, r, o, l) {
    super(i, s, n, r, o, l), this.#e = new Do(i.scene, r), this.theme.priceLineStyle = this.theme?.priceLineStyle || sc;
  }
  set position(i) {
    this.setPosition(i[0], i[1]);
  }
  setPosition(i, s) {
    this.core.stream !== void 0 && (this.target.setPosition(i, s), this.core.stream.lastScrollPos = this.core.scrollPos);
  }
  draw() {
    if (this.core.stream === void 0 || !A(this.chart.streamCandle))
      return;
    this.scene.clear();
    const i = this.core.range, s = this.chart.streamCandle, n = this.theme.candle.Type === ee.AREA || this.theme.candle.Type === ee.LINE ? (l) => {
      this.areaRender(l);
    } : (l) => {
      this.#e.draw(l);
    };
    this.xAxis.smoothScrollOffset;
    const o = {
      x: this.core.stream.lastXPos,
      w: this.xAxis.candleW
    };
    o.o = this.yAxis.yPos(s[1]), o.h = this.yAxis.yPos(s[2]), o.l = this.yAxis.yPos(s[3]), o.c = this.yAxis.yPos(s[4]), o.raw = s, i.inRenderRange(s[0]) && n(o), s[4] >= s[1] ? this.theme.priceLineStyle.stroke = this.core.theme.candle.UpBodyColour : this.theme.priceLineStyle.stroke = this.core.theme.candle.DnBodyColour, Qt(
      this.scene.context,
      o.c,
      0,
      this.target.width,
      this.theme.priceLineStyle
    );
  }
  areaRender(i) {
    const s = this.core.range, n = s.value(s.data.length - 2);
    if (n === null)
      return;
    const r = {
      x: this.xAxis.xPos(n[0]),
      o: this.yAxis.yPos(n[1]),
      h: this.yAxis.yPos(n[2]),
      l: this.yAxis.yPos(n[3]),
      c: this.yAxis.yPos(n[4])
    }, o = this.scene.context, l = this.theme, h = l.candle.UpBodyColour || l.candle.DnBodyColour;
    Math.max(i.w - 1, 1), i.x;
    let c;
    if (o.save(), o.fillStyle = h, o.strokeStyle = h, o.lineWidth = 1, o.beginPath(), o.moveTo(i.x, i.c), o.lineTo(r.x, r.h), l.candle.Type === ee.AREA) {
      if (c = o.createLinearGradient(0, 0, 0, this.scene.height), A(l.candle.AreaFillColour))
        for (let [p, f] of l.candle.AreaFillColour.entries())
          c.addColorStop(p, f);
      else
        E(l.candle.AreaFillColour) ? c = l.candle.AreaFillColour : c = l.candle.UpBodyColour || l.candle.DnBodyColour;
      o.stroke(), o.lineTo(r.x, this.scene.height), o.lineTo(i.x, this.scene.height), o.fillStyle = c, o.closePath(), o.fill();
    } else
      o.stroke();
    o.restore();
  }
}
const Wt = {
  colour: "#4444cc88",
  wdith: 1,
  dash: [1, 0]
};
class wm extends F {
  constructor(i, s = !1, n = !1, r, o, l) {
    super(i, s, n, r, o, l);
    const h = { class: xm, fixed: !0, required: !1 };
    this.core.config?.highLow === !0 && (this.scaleOverly = this.chart.scale.addOverlay("hiLo", h));
  }
  set position(i) {
    this.target.setPosition(0, 0);
  }
  draw(i = this.core.range) {
    if (this.core.config?.highLow !== !0 || !super.mustUpdate())
      return;
    this.scene.clear();
    let s, n, r, o = this.scene.width, l = 35, h = {};
    const c = i.valueHi, p = i.valueLo, f = { ...this.theme.yAxis }, x = this.scene.context;
    f.colourCursorBG = this.theme?.hilo?.colour || Wt.colour, x.save(), x.strokeStyle = this.theme?.highLow?.colour || Wt.colour, x.strokeWidth = this.theme?.highLow?.width || Wt.width, x.setLineDash(this.theme?.highLow?.dash || Wt.dash), r = this.yAxis.yPos(c), Qt(x, r, 0, o, h), s = "High", n = this.theme.yAxis.location == "left" ? 0 : o - (l + 25), Hi(x, s, n, r, l, f), r = this.yAxis.yPos(p), Qt(x, r, 0, o, h), s = "Low", Hi(x, s, n, r, l, f), x.restore(), super.updated(), "hiLo" in this.chart.scale.overlays && (this.chart.scale.overlays.hiLo.instance.setRefresh(), this.chart.scale.overlays.hiLo.instance.scaleDraw());
  }
}
class xm extends F {
  constructor(i, s = !1, n = !1, r, o, l) {
    super(i, s, n, r, o, l), this.viewport = i.viewport;
  }
  set position(i) {
    this.target.setPosition(0, 0);
  }
  draw() {
  }
  scaleDraw(i = this.core.range) {
    if (!super.mustUpdate())
      return;
    this.scene.clear();
    let s, n, r, o;
    const l = i.valueHi, h = i.valueLo, c = { ...this.theme.yAxis }, p = this.scene.context;
    c.colourCursorBG = this.theme?.hilo?.colour || Wt.colour, s = this.chart.Scale.nicePrice(l), n = 1, r = this.yAxis.yPos(l) + 1, o = this.viewport.width, Hi(p, s, n, r, o, c), s = this.chart.Scale.nicePrice(h), r = this.yAxis.yPos(h) + 1, Hi(p, s, n, r, o, c), super.updated();
  }
}
function Hi(a, i, s, n, r, o) {
  let l = {
    fontSize: o.fontSize * 1.05,
    fontWeight: o.fontWeight,
    fontFamily: o.fontFamily,
    txtCol: o.colourCursor,
    bakCol: o.colourCursorBG,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 3,
    paddingRight: 3,
    width: r
  }, h = l.fontSize + l.paddingTop + l.paddingBottom, c = n - h * 0.5;
  a.save(), a.fillStyle = l.bakCol, a.fillRect(s, c, r, h), Tt(a, `${i}`, s, c, l), a.restore();
}
class bm {
  data;
  icon;
  constructor(i, s) {
    this.scene = i.scene, this.hit = i.hit, this.ctx = this.scene.context, this.ctxH = this.hit.context, this.width = this.scene.width, this.cfg = s.events, this.dims = { w: this.cfg.iconWidth, h: this.cfg.iconHeight }, this.icon = gt(this.cfg.iconEvent, this.cfg.iconColour, this.dims);
  }
  draw(i) {
    this.data = i;
    const s = this.icon, n = this.cfg, r = this.hit.getIndexValue(i.key), o = gt(n.iconEvent, r, this.dims), l = _(i.w, n.iconMinDim, n.iconHeight), h = _(i.w, n.iconMinDim, n.iconWidth), c = this.data.x, p = this.data.y, f = this.ctx, x = this.ctxH;
    return f.save(), f.drawImage(s, c, p, h, l), f.restore(), x.save(), x.drawImage(o, c, p, h, l), x.restore(), { x: c, y: p, w: h, h: l, k: r };
  }
}
const xr = {
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
class Cm extends F {
  #e;
  #t = [];
  #s;
  constructor(i, s = !1, n = !1, r, o, l) {
    super(i, s, n, r, o, l), this.#e = new bm(i, r), this.emit(), this.core.on("primary_pointerdown", this.onPrimaryPointerDown, this), xr.parent = this, this.#s = this.core.WidgetsG.insert("Dialogue", xr), this.#s.start();
  }
  set position(i) {
    this.target.setPosition(i[0], i[1]);
  }
  get data() {
    return this.overlay.data;
  }
  onPrimaryPointerDown(i) {
    this.core.MainPane.stateMachine.state !== "chart_pan" && ke(this.isNewsEventSelected, qt, this)(i);
  }
  isNewsEventSelected(i) {
    const s = i[0], n = i[1], r = this.hit.getIntersection(s, n);
    if (this.core.config?.events?.display === !1 || this.core.config?.events?.displayInfo === !1 || r == -1)
      return;
    const o = this.theme.events, l = _(this.xAxis.candleW, o.iconMinDim, o.iconHeight), h = this.xAxis.pixel2T(s), c = this.xAxis.scrollOffsetPx, p = this.core.dimensions;
    let f = Object.keys(this.data)[r] * 1, x = this.xAxis.xPos(h) + c, P = n - l * 1.5 - p.height, L = "";
    for (let D of this.data[f])
      L += this.buildNewsEventHTML(D);
    const O = {
      dimensions: { h: void 0, w: 150 },
      position: { x: x + l / 2 + 1, y: P },
      content: L,
      offFocus: qt + 1
    };
    this.core.emit("event_selected", f), this.#s.open(O);
  }
  buildNewsEventHTML(i) {
    let s = i?.title, n = `<style>
    h1, p {display: inline-block; font-size: 0.9em;
    max-width: 98%;
    </style>`;
    return E(i?.url) && (s = `<a href="${i?.url}" target="${i?.target}">${s}</a>`), n += `<h1>${s}</h1>`, n += `<p>${i?.content}</p>`, n;
  }
  draw(i = this.core.range) {
    if (this.core.config?.events?.display === !1 || !super.mustUpdate())
      return;
    this.hit.clear(), this.scene.clear(), this.#t.length = 0;
    const n = {
      x: (this.xAxis.smoothScrollOffset || 0) - this.xAxis.candleW,
      w: this.xAxis.candleW
    };
    let r = this.theme.events, o = this.core.rangeScrollOffset, l = i.indexStart - o, h = i.Length + o * 2, c, p, f;
    for (; h; ) {
      if (c = i.value(l), p = `${c[0]}`, f = Object.keys(this.data).indexOf(p), f >= 0)
        for (let x of this.data[p])
          n.x = this.xAxis.xPos(c[0]) - this.xAxis.candleW / 2, n.y = this.scene.height - _(this.xAxis.candleW, r.iconMinDim, r.iconHeight) * 1.5, n.key = f, this.#t.push(this.#e.draw(n));
      l++, h--;
    }
    super.updated();
  }
}
class Tm {
  data;
  buy;
  sell;
  constructor(i, s) {
    this.scene = i.scene, this.hit = i.hit, this.ctx = this.scene.context, this.ctxH = this.hit.context, this.width = this.scene.width, this.cfg = s.trades, this.dims = { w: this.cfg.iconWidth, h: this.cfg.iconHeight }, this.buy = gt(this.cfg.iconBuy, this.cfg.buyColour, this.dims), this.sell = gt(this.cfg.iconSell, this.cfg.sellColour, this.dims);
  }
  draw(i) {
    this.data = i;
    const s = this.cfg, n = i.side === "buy" ? this.buy : this.sell, r = i.side === "buy" ? s.iconBuy : s.iconSell, o = this.hit.getIndexValue(i.key), l = gt(r, o, this.dims), h = _(i.w, s.iconMinDim, s.iconHeight), c = _(i.w, s.iconMinDim, s.iconWidth), p = this.data.x, f = this.data.y, x = this.ctx, P = this.ctxH;
    return x.save(), x.drawImage(n, p, f, c, h), x.restore(), P.save(), P.drawImage(l, p, f, c, h), P.restore(), { x: p, y: f, w: c, h, k: o };
  }
}
const br = {
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
class Sm extends F {
  #e;
  #t = [];
  #s;
  #r;
  constructor(i, s = !1, n = !1, r, o, l) {
    super(i, s, n, r, o, l), this.settings = l.settings, this.#e = new Tm(i, r), this.core.on("primary_pointerdown", this.onPrimaryPointerDown, this), br.parent = this, this.#r = this.core.WidgetsG.insert("Dialogue", br), this.#r.start();
  }
  destroy() {
    this.core.off("primary_pointerdown", this.onPrimaryPointerDown, this);
  }
  set position(i) {
    this.target.setPosition(i[0], i[1]);
  }
  get data() {
    return this.overlay.data;
  }
  get settings() {
    return this.params.settings;
  }
  set settings(i) {
    this.doSettings(i);
  }
  doSettings(i) {
    if (!S(i))
      return !1;
    let s = this.theme.trades;
    for (let n in i)
      i[n] !== void 0 && (s[n] = i[n]);
  }
  onPrimaryPointerDown(i) {
    this.core.MainPane.stateMachine.state !== "chart_pan" && ke(this.isTradeSelected, qt, this)(i);
  }
  isTradeSelected(i) {
    const s = i[2].domEvent.srcEvent, n = (s.target || s.srcElement).getBoundingClientRect(), r = s.clientX - (n.right - n.width), o = s.clientY - n.top, l = this.hit.getIntersection(r, o);
    if (this.core.config?.trades?.display === !1 || this.core.config?.trades?.displayInfo === !1 || l == -1)
      return;
    console.log("isTradeSelected()");
    const h = this.theme.trades, c = _(this.xAxis.candleW, h.iconMinDim, h.iconWidth), p = this.xAxis.pixel2T(r);
    this.core.range.valueByTS(p);
    const f = this.xAxis.scrollOffsetPx, x = this.core.dimensions;
    let P = Object.keys(this.data)[l] * 1, L = this.xAxis.xPos(p) + f, O = o - c * 1.5 - x.height, D = "";
    for (let fe of this.data[P])
      D += this.buildTradeHTML(fe);
    const re = {
      dimensions: { h: void 0, w: 150 },
      position: { x: L + c / 2 + 1, y: O },
      content: D,
      offFocus: qt + 1
    };
    this.core.emit("trade_selected", P), this.#r.open(re);
  }
  buildTradeHTML(i) {
    let s = `<style>
    dt, dd {display: inline-block; font-size: 0.9em;}
    dt {min-width: 40%;}
    dd {min-width: 60%; margin: 0;}
    </style>`;
    s += "<dl>";
    for (let n in i)
      n != "timestamp" && (s += `<dt>${n}</dt><dd>${i[n]}</dd>`);
    return s += "</dl>", s;
  }
  draw(i = this.core.range) {
    if (!super.mustUpdate() || this.core.config?.trades?.display === !1)
      return;
    this.hit.clear(), this.scene.clear(), this.#t.length = 0;
    const n = {
      x: (this.xAxis.smoothScrollOffset || 0) - this.xAxis.candleW,
      w: this.xAxis.candleW
    };
    let r = this.theme.trades, o = this.core.rangeScrollOffset, l = i.indexStart - o, h = i.Length + o * 2, c, p, f;
    for (; h; ) {
      if (c = i.value(l), p = `${c[0]}`, f = Object.keys(this.data).indexOf(p), f >= 0)
        for (let x of this.data[p])
          n.x = this.xAxis.xPos(c[0]) - this.xAxis.candleW / 2, n.y = this.yAxis.yPos(c[2]) - _(this.xAxis.candleW, r.iconMinDim, r.iconHeight) * 1.5, n.side = x.side, n.key = f, this.#t.push(this.#e.draw(n));
      l++, h--;
    }
    super.updated();
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
class ge extends F {
  static #e = 0;
  static #t = {};
  static get inCnt() {
    return ge.#e++;
  }
  static create(i, s) {
    const n = ++ge.#e;
    s.cnt = n, s.modID = `${s.toolID}_${n}`, s.toolID = s.modID, s.target = i;
    const r = new s.tool(s);
    return ge.#t[n] = r, i.chartToolAdd(r), r;
  }
  static destroy(i) {
    i instanceof chartTool && delete chartTool.#t[i.inCnt];
  }
  #s;
  #r = null;
  #n = "";
  #i = "";
  #o;
  #a;
  #c = [0, 0];
  #l = !1;
  #h;
  #d = { TL: [0, 0], BR: [0, 0] };
  constructor(i, s = !1, n = !1, r, o, l) {
    super(i, s, n, r, o, l), this.#r = ge.inCnt, this.#s = this.config.ID || Pe("TX_Tool_") + `_${this.#r}`, this.settings = l?.settings || {}, Cr.parent = this, this.#o = this.core.WidgetsG.insert("ConfigDialogue", Cr), this.#o.start(), this.chart, this.eventsListen();
  }
  set id(i) {
    this.#s = _e(i);
  }
  get id() {
    return this.#s || `${this.core.id}-${this.#i}_${this.#r}`;
  }
  get inCnt() {
    return this.#r;
  }
  get name() {
    return this.#n;
  }
  get shortName() {
    return this.#i;
  }
  get settings() {
    return this.params.settings;
  }
  set settings(i) {
    this.doSettings(i);
  }
  eventsListen() {
    const i = this.chart;
    i.on(`${i.id}_pointermove`, this.onPointerMove, this), i.on(`${i.id}_pointerdown`, this.onPointerDown, this), i.on(`${i.id}_pointerup`, this.onPointerUp, this);
  }
  onPointerMove(i) {
    this.chart.stateMachine.state;
  }
  onPointerDown(i) {
    this.chart.stateMachine.state !== "chart_pan" && ke(this.isToolSelected, qt, this)(e);
  }
  onPointerUp(i) {
  }
  isToolSelected(i) {
  }
  doSettings(i) {
    if (!S(i))
      return !1;
    let s = this.theme.trades;
    for (let n in i)
      i[n] !== void 0 && (s[n] = i[n]);
  }
  isVisible() {
  }
  draw(i = this.core.range) {
    if (!super.mustUpdate() || this.core.config?.tools?.display === !1)
      return;
    this.hit.clear(), this.scene.clear(), this.theme.tools;
    let s = this.core.rangeScrollOffset;
    i.indexStart - s, i.Length + s * 2, super.updated();
  }
}
const _o = {
  primaryPane: [
    ["watermark", { class: fm, fixed: !0, required: !0, params: { content: null } }],
    ["grid", { class: _i, fixed: !0, required: !0, params: { axes: "y" } }],
    ["candles", { class: ko, fixed: !1, required: !0 }],
    ["hiLo", { class: wm, fixed: !0, required: !1 }],
    ["stream", { class: vm, fixed: !1, required: !0 }],
    ["tools", { class: ge, fixed: !1, required: !0 }],
    ["cursor", { class: Os, fixed: !0, required: !0 }]
  ],
  secondaryPane: [
    ["grid", { class: _i, fixed: !0, required: !0, params: { axes: "y" } }],
    ["tools", { class: ge, fixed: !1, required: !0 }],
    ["cursor", { class: Os, fixed: !0, required: !0 }]
  ]
}, Ns = {
  primaryPane: {
    trades: { class: Sm, fixed: !1, required: !1 },
    events: { class: Cm, fixed: !1, required: !1 },
    volume: { class: ym, fixed: !1, required: !0, params: { maxVolumeH: Ei.ONCHART_VOLUME_HEIGHT } }
  },
  secondaryPane: {
    candles: { class: ko, fixed: !1, required: !0 }
  }
}, Oe = {
  id: "chart",
  title: "",
  type: "chart",
  source: () => {
  }
};
class lt {
  static #e = 0;
  static get cnt() {
    return lt.#e++;
  }
  #t;
  #s;
  #r;
  #n;
  #i;
  #o;
  #a;
  #c;
  #l;
  #h;
  #d = "idle";
  #u = {
    state: !1,
    height: null,
    rowsHeight: null,
    rowsCnt: 1
  };
  #m;
  #v;
  #f;
  #x;
  #w;
  #p;
  #T;
  #P;
  #g;
  #C;
  #S;
  #D;
  #A = new Me();
  #O = new Me();
  #b = [0, 0];
  #M = !1;
  #E;
  #y;
  #R;
  #k = {
    valueMax: 110,
    valueMin: -10,
    valueDiff: 120
  };
  #H = {};
  constructor(i, s) {
    if (this.#i = i, this.#l = lt.cnt, !S(s))
      return;
    this.#o = { ...s }, this.#s = this.#o.name, this.#r = this.#o.shortName, this.#n = this.#o.title, this.#h = this.#o.type == "primary" ? "primaryPane" : "secondaryPane", this.#S = this.#o.view, this.#v = this.#o.elements.elScale, this.#a = this.#o.parent, this.#m = this.#o.elements.elTarget, this.#m.id = this.id, this.legend = new hm(this.elLegend, this), this.isPrimary ? (Oe.type = "chart", Oe.title = this.title, Oe.parent = this, Oe.source = this.legendInputs.bind(this), this.legend.add(Oe), this.yAxisType = "default") : (Oe.type = "secondary", Oe.title = "", Oe.parent = this, Oe.source = () => ({ inputs: {}, colours: [], labels: [] }), this.legend.add(Oe), this.yAxisType = this.core.indicatorClasses[s.view[0].type].ind.scale);
    const n = { ...s };
    n.parent = this, n.chart = this, n.elScale = this.elScale, n.yAxisType = this.yAxisType, this.scale = new gm(this.core, n), this.#d = "init", this.log(`${this.name} instantiated`);
  }
  log(i) {
    this.core.log(i);
  }
  info(i) {
    this.core.info(i);
  }
  warn(i) {
    this.core.warn(i);
  }
  error(i) {
    this.core.error(i);
  }
  set id(i) {
    this.#t = _e(i);
  }
  get id() {
    return this.#t || _e(`${this.#i.id}-${this.#s}_${this.#l}`);
  }
  get name() {
    return this.#s;
  }
  get shortName() {
    return this.#r;
  }
  set title(i) {
    this.setTitle(i);
  }
  get title() {
    return this.#n;
  }
  get parent() {
    return this.#a;
  }
  get core() {
    return this.#i;
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
    return this.#o.view.primary || !1;
  }
  get options() {
    return this.#o;
  }
  get element() {
    return this.#m;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return ce(this.#m);
  }
  set width(i) {
    this.setWidth(i);
  }
  get width() {
    return this.#m.getBoundingClientRect().width;
  }
  set height(i) {
    this.setHeight(i);
  }
  get height() {
    return this.#m.getBoundingClientRect().height;
  }
  get data() {
  }
  get range() {
    return this.#i.range;
  }
  set localRange(i) {
    this.setLocalRange(i);
  }
  get localRange() {
    return this.#k;
  }
  get stream() {
    return this.#P;
  }
  get streamCandle() {
    return this.#C;
  }
  set cursor(i) {
    this.element.style.cursor = i;
  }
  get cursor() {
    return this.element.style.cursor;
  }
  get cursorPos() {
    return this.#b;
  }
  set cursorActive(i) {
    this.#M = i;
  }
  get cursorActive() {
    return this.#M;
  }
  get cursorClick() {
    return this.#E;
  }
  get candleW() {
    return this.#i.Timeline.candleW;
  }
  get theme() {
    return this.#i.theme;
  }
  get config() {
    return this.#i.config;
  }
  get scrollPos() {
    return this.#i.scrollPos;
  }
  get bufferPx() {
    return this.#i.bufferPx;
  }
  get elCanvas() {
    return this.#w.viewport.scene.canvas;
  }
  get elScale() {
    return this.#v;
  }
  get elLegend() {
    return this.#m.legend;
  }
  get elViewport() {
    return this.#m.viewport;
  }
  set layerWidth(i) {
    this.#w.layerWidth = i;
  }
  get layerWidth() {
    return this.#w.layerWidth;
  }
  set legend(i) {
    this.#p = i;
  }
  get legend() {
    return this.#p;
  }
  set time(i) {
    this.#x = i;
  }
  get time() {
    return this.#x;
  }
  set scale(i) {
    this.#f = i;
  }
  get scale() {
    return this.#f;
  }
  set yAxisType(i) {
    this.setYAxisType(i);
  }
  get yAxisType() {
    return this.#R;
  }
  get axes() {
    return "x";
  }
  set graph(i) {
    this.#w = i;
  }
  get graph() {
    return this.#w;
  }
  get view() {
    return this.#S;
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
    return this.#O;
  }
  get overlaysDefault() {
    return _o[this.type];
  }
  get indicators() {
    return this.getIndicators();
  }
  get indicatorDeleteList() {
    return this.#H;
  }
  set stateMachine(i) {
    this.#c = new Xe(i, this);
  }
  get stateMachine() {
    return this.#c;
  }
  get Divider() {
    return this.#T;
  }
  get siblingPrev() {
    return this.sibling("prev");
  }
  get siblingNext() {
    return this.sibling("next");
  }
  start() {
    this.#x = this.#i.Timeline, this.createGraph(), this.#f.start(), this.draw(this.range), this.cursor = "crosshair", hs.id = this.id, hs.context = this, this.stateMachine = hs, this.stateMachine.start(), this.eventsListen();
    let i = { chartPane: this };
    this.#T = this.core.WidgetsG.insert("Divider", i), this.#T.start(), i = { title: "Chart Config", content: `Configure chart ${this.id}`, parent: this }, this.#g = this.core.WidgetsG.insert("ConfigDialogue", i), this.#g.start(), this.#d = "running";
  }
  destroy() {
    if (this.#d !== "destroyed") {
      if (!this.core.MainPane.chartDeleteList[this.id]) {
        this.core.warn(`Cannot "destroy()": ${this.id} !!! Use "remove()" or "removeChartPane()" instead.`);
        return;
      }
      this.core.log(`Deleting chart pane: ${this.id}`), this.#i.hub.expunge(this), this.removeAllIndicators(), this.#c.destroy(), this.#T.destroy(), this.#f.destroy(), this.#w.destroy(), this.#y.destroy(), this.legend.destroy(), this.#c = void 0, this.#T = void 0, this.#p = void 0, this.#f = void 0, this.#w = void 0, this.#y = void 0, this.core.warn(`Deleting chart pane ${this.id} destroys all of its data!`), this.element.remove(), this.#d = "destroyed";
    }
  }
  remove() {
    this.emit("destroyChartView", this.id);
  }
  eventsListen() {
    this.#y = new Ve(this.#m, { disableContextMenu: !1 }), this.#y.on("pointerdrag", this.onChartDrag.bind(this)), this.#y.on("pointerdragend", this.onChartDragDone.bind(this)), this.#y.on("pointermove", this.onPointerMove.bind(this)), this.#y.on("pointerenter", this.onPointerEnter.bind(this)), this.#y.on("pointerout", this.onPointerOut.bind(this)), this.#y.on("pointerdown", this.onPointerDown.bind(this)), this.#y.on("pointerup", this.onPointerUp.bind(this)), this.on("main_mousemove", this.updateLegends, this), this.on(xi, this.onStreamListening, this), this.on(Ds, this.onStreamNewValue, this), this.on(et, this.onStreamUpdate, this), this.on(Rs, this.onStreamNewValue, this), this.on(`${this.id}_removeIndicator`, this.onDeleteIndicator, this), this.isPrimary && this.on("chart_yAxisRedraw", this.onYAxisRedraw, this);
  }
  on(i, s, n = this) {
    this.#i.on(i, s, n);
  }
  off(i, s, n = this) {
    this.#i.off(i, s, n);
  }
  expunge(i = this) {
    this.#i.expunge(i);
  }
  emit(i, s) {
    this.#i.emit(i, s);
  }
  onChartDrag(i) {
    this.cursor = "grab", this.core.MainPane.onChartDrag(i), this.scale.onChartDrag(i);
  }
  onChartDragDone(i) {
    this.cursor = "crosshair", this.core.MainPane.onChartDragDone(i);
  }
  onPointerMove(i) {
    this.core.MainPane.onPointerActive(this), this.scale.layerCursor.visible = !0, this.graph.overlays.list.get("cursor").layer.visible = !0, this.#b = [Math.round(i.position.x), Math.round(i.position.y)], this.#f.onMouseMove(this.#b), this.emit(`${this.id}_pointermove`, this.#b);
  }
  onPointerEnter(i) {
    this.core.MainPane.onPointerActive(this), this.#b = [Math.round(i.position.x), Math.round(i.position.y)], this.core.MainPane.onMouseEnter(), this.scale.layerCursor.visible = !0, this.graph.overlays.list.get("cursor").layer.visible = !0, this.emit(`${this.id}_pointerenter`, this.#b);
  }
  onPointerOut(i) {
    this.#M = !1, this.#b = [Math.round(i.position.x), Math.round(i.position.y)], this.scale.layerCursor.visible = !1, this.emit(`${this.id}_pointerout`, this.#b);
  }
  onPointerDown(i) {
    this.#i.pointerButtons[i.domEvent.srcEvent.button] = !0, this.#E = [Math.floor(i.position.x), Math.floor(i.position.y), i], this.stateMachine.state === "tool_activated" ? this.emit("tool_targetSelected", { target: this, position: i }) : this.isPrimary && this.emit("primary_pointerdown", this.#E);
  }
  onPointerUp(i) {
    this.#i.pointerButtons[i.domEvent.srcEvent.button] = !1;
  }
  onStreamListening(i) {
    this.#P !== i && (this.#P = i);
  }
  onStreamNewValue(i) {
    this.draw(this.range, !0);
  }
  onStreamUpdate(i) {
    this.isPrimary ? (this.#C = i, this.chartStreamCandle.draw(), this.layerStream.setPosition(this.core.stream.lastScrollPos, 0), this.updateLegends(this.cursorPos, i)) : this.updateLegends(), this.#i.MainPane.draw();
  }
  onYAxisRedraw() {
    this.isPrimary && this.refresh();
  }
  onDeleteIndicator(i) {
    this.removeIndicator(i.id);
  }
  setTitle(i) {
    if (!E(i))
      return !1;
    this.#n = i, Oe.title = i;
    const s = this.legend.list.chart.el.querySelectorAll(".title");
    for (let n of s)
      n.innerHTML = i;
    return !0;
  }
  setWatermark(i) {
    E(i.text) || E(i) ? this.core.config.watermark.text = i : "imgURL" in i && (this.core.config.watermark.imgURL = i);
  }
  setHeight(i) {
    T(i) || (i = this.height || this.#a.height), this.#m.style.height = `${i}px`, this.#v.style.height = `${i}px`, this.elViewport.style.height = `${i}px`, this.#f.setDimensions({ w: null, h: i }), this.Divider?.setPos(), this.Divider?.setWidth();
  }
  setDimensions(i) {
    const s = this.config.buffer || Bi;
    let { w: n, h: r } = i;
    n = this.width, r = r || this.height, this.setHeight(r), this.graph instanceof St && (this.layerWidth = Math.round(n * ((100 + s) * 0.01)), this.graph.setSize(n, r, this.layerWidth), this.draw(void 0, !0), this.core.MainPane.draw(void 0, !1), this.Divider.setPos(), this.Divider.setWidth());
  }
  setLocalRange(i, s) {
    if (!T(s) || !T(i))
      return !1;
    i > s && ([i, s] = [s, i]), this.#k = {
      valueMax: s,
      valueMin: i,
      valueDiff: s - i
    };
  }
  setYAxisType(i) {
    return !E(i) || !qe.includes(i) || this.type == "primaryPane" && i == "percent" ? !1 : (this.#R = i, !0);
  }
  addOverlays(i) {
    if (!A(i) || i.length < 1)
      return !1;
    const s = [];
    for (let n of i) {
      const r = { fixed: !1, required: !1 };
      if (n.type in this.core.indicatorClasses)
        r.cnt = this.core.indicatorClasses[n.type].ind.cnt, r.id = `${this.id}-${n.type}_${r.cnt}`, r.class = this.core.indicatorClasses[n.type].ind;
      else if (n.type in Ns[this.type])
        r.cnt = 1, r.id = `${this.id}-${n.type}`, r.class = Ns[this.type][n.type].class;
      else if (n.type in this.#i.customOverlays[this.type])
        r.cnt = 1, r.id = `${this.id}-${n.type}`, r.class = this.#i.customOverlays[this.type][n.type].class;
      else
        continue;
      r.params = { overlay: n }, n.id = r.id, n.paneID = this.id, s.push([n.id, r]);
    }
    return this.graph.addOverlays(s), !0;
  }
  addIndicator(i) {
    const s = this.type === "primaryPane", n = this.core.indicatorClasses[i.type].ind, r = !!i.settings?.isPrimary;
    if (i?.type in this.core.indicatorClasses && s === r) {
      i.paneID = this.id;
      const o = {
        class: n,
        params: { overlay: i }
      };
      return this.graph.addOverlay(i.name, o);
    } else
      return !1;
  }
  getIndicators() {
    const i = Object.keys(this.core.indicatorClasses), s = {};
    for (let [n, r] of Object.entries(this.overlays))
      if (i.includes(r.params?.overlay?.type)) {
        let o = r.id || r.instance.id;
        s[o] = r;
      }
    return s;
  }
  removeIndicator(i) {
    return !E(i) || !(i in this.indicators) ? !1 : (this.#H[i] = !0, Object.keys(this.indicators).length === 0 && !this.isPrimary ? this.emit("destroyChartView", this.id) : (this.indicators[i].instance.destroy(), this.graph.removeOverlay(i), this.draw(), delete this.#H[i]), !0);
  }
  removeAllIndicators() {
    const i = {}, s = this.getIndicators();
    for (let n in s)
      i[n] = this.removeIndicator(n);
    return i;
  }
  indicatorVisible(i, s) {
    return !E(i) || !(i in this.indicators) ? !1 : this.indicators[i].instance.visible(s);
  }
  indicatorSettings(i, s) {
    return !E(i) || !(i in this.indicators) ? !1 : this.indicators[i].instance.settings(s);
  }
  addTool(i) {
    let { layerConfig: s } = this.layerConfig(), n = new Te.Layer(s);
    this.#A.set(i.id, n), this.#D.addLayer(n), i.layerTool = n, this.#O.set(i.id, i);
  }
  addTools(i) {
  }
  overlayTools() {
  }
  overlayToolAdd(i) {
    this.#O.set(i.id, i);
  }
  overlayToolDelete(i) {
    this.#O.delete(i);
  }
  drawGrid() {
    this.layerGrid.setPosition(this.#i.scrollPos, 0), this.overlayGrid.setRefresh(), this.overlayGrid.draw("y"), this.#i.MainPane.draw();
  }
  refresh() {
    this.emit("pane_refresh", this), this.scale.draw(), this.draw(void 0, this.isPrimary);
  }
  legendsVisibility(i) {
    this.legend.setCollapse(i);
  }
  updateLegends(i = this.#b, s = !1) {
    if (!(this.#i.isEmpty || !S(this.#p)))
      for (const n in this.#p.list)
        this.#p.update(n, { pos: i, candle: s });
  }
  legendInputs() {
    const i = [!0, !0, !0, !0, !0], s = this.cursorPos, n = this.time.xPos2Index(s[0] - this.core.scrollPos), r = _(n, 0, this.range.data.length - 1), o = this.range.data[r], l = this.theme.candle, h = o[4] >= o[1] ? new Array(5).fill(l.UpWickColour) : new Array(5).fill(l.DnWickColour), c = {}, p = ["T", "O", "H", "L", "C", "V"];
    for (let f = 1; f < 6; f++)
      c[p[f]] = this.scale.nicePrice(o[f]);
    return { inputs: c, colours: h, labels: i };
  }
  onLegendAction(i) {
    switch (this.#p.onPointerClick(i.currentTarget).icon) {
      case "up":
        this.reorderUp();
        return;
      case "down":
        this.reorderDown();
        return;
      case "maximize":
        this.#i.MainPane.paneMaximize(this);
        return;
      case "restore":
        this.#i.MainPane.paneMaximize(this);
        return;
      case "collapse":
        this.#i.MainPane.paneCollapse(this);
        return;
      case "expand":
        this.#i.MainPane.paneCollapse(this);
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
      el: i,
      prevEl: s,
      parentEl: n,
      scaleEl: r,
      prevScaleEl: o,
      parentScaleEl: l,
      prevPane: h
    } = { ...this.currPrevNext() };
    return !S(s) || !S(o) ? !1 : (n.insertBefore(i, s), l.insertBefore(r, o), this.Divider.setPos(), h !== null && (h.Divider.setPos(), h.Divider.show(), this.core.ChartPanes.swapKeys(this.id, s.id)), i.previousElementSibling === null && this.Divider.hide(), !0);
  }
  reorderDown() {
    const {
      el: i,
      nextEl: s,
      parentEl: n,
      scaleEl: r,
      nextScaleEl: o,
      parentScaleEl: l,
      nextPane: h
    } = { ...this.currPrevNext() };
    return !S(s) || !S(o) ? !1 : (n.insertBefore(s, i), l.insertBefore(o, r), this.Divider.setPos(), h !== null && (h.Divider.setPos(), this.Divider.show(), this.core.ChartPanes.swapKeys(this.id, s.id)), s.previousElementSibling === null && h.Divider.hide(), !0);
  }
  createGraph() {
    let i = ue(this.overlaysDefault);
    this.graph = new St(this, this.elViewport, i, !1), this.isPrimary && (this.layerStream = this.graph.overlays.get("stream")?.layer, this.chartStreamCandle = this.graph.overlays.get("stream")?.instance), this.addOverlays(this.view);
  }
  render() {
    this.#w.render(), this.#f.render();
  }
  draw(i = this.range, s = !1) {
    this.#w.draw(i, s);
  }
  drawGrid(i) {
    this.layerGrid.setPosition(this.core.scrollPos, 0), this.overlayGrid.draw("y");
  }
  resize(i) {
    const s = this, n = this.sibling();
    if (n === null)
      return { active: null, prev: null };
    const r = this.core.MainPane.rowMinH, o = this.element.clientHeight, l = n.element.clientHeight;
    let h, c, p, f;
    return T(i) && i > r || (f = o + l, h = this.core.MainPane.cursorPos[5], c = o - h, p = l + h), c < r || p < r || f !== c + p || (s.setDimensions({ w: void 0, h: c }), n.setDimensions({ w: void 0, h: p }), s.Divider.setPos()), s.element.style.userSelect = "none", n.element.style.userSelect = "none", { active: s, prev: n };
  }
  collapse(i) {
    const s = this.graph.viewport.scene.canvas.style, n = this.#u, r = this.#f.graph.viewport.scene.canvas.style;
    n.state ? (this.setDimensions({ w: void 0, h: i }), r.visibility = "visible", s.display = "block", n.state = !1) : (r.visibility = "hidden", s.display = "none", n.state = !0, n.height = this.element.clientHeight, n.rowsHeight = this.core.MainPane.rowsH, n.rowsCnt = this.core.ChartPanes.size, this.setDimensions({ W: void 0, h: Cs }));
  }
  zoomRange() {
    this.draw(this.range, !0), this.emit("zoomDone");
  }
  time2XPos(i) {
    return this.time.xPos(i);
  }
  price2YPos(i) {
    return this.scale.yPos(i);
  }
  currPrevNext() {
    const i = this.element, s = i.previousElementSibling, n = i.nextElementSibling, r = i.parentNode, o = this.scale.element, l = o.previousElementSibling, h = o.nextElementSibling, c = o.parentNode, p = s !== null ? this.core.ChartPanes.get(s.id) : null, f = n !== null ? this.core.ChartPanes.get(n.id) : null;
    return {
      el: i,
      prevEl: s,
      nextEl: n,
      parentEl: r,
      scaleEl: o,
      prevScaleEl: l,
      nextScaleEl: h,
      parentScaleEl: c,
      prevPane: p,
      nextPane: f
    };
  }
  sibling(i) {
    i = ["prev", "next"].includes(i) ? i : "prev";
    let s = [...this.core.ChartPanes.keys()], n = s.indexOf(this.id);
    return i == "prev" ? --n : ++n, this.#i.ChartPanes.get(s[n]) || null;
  }
  configDialogue() {
    const i = this.#g;
    i.state.name === "closed" && i.open();
  }
}
const cs = {
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
        setRange: {
          target: "setRange",
          action(a) {
          }
        },
        addIndicator: {
          target: "addIndicator",
          action(a) {
          }
        },
        divider_pointerdrag: {
          target: "divider_pointerdrag",
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
    addIndicator: {
      onEnter(a) {
        this.context.origin.addIndicator(a);
      },
      onExit(a) {
      },
      on: {
        addIndicatorDone: {
          target: "idle",
          action(a) {
          }
        }
      }
    },
    divider_pointerdrag: {
      onEnter(a) {
      },
      onExit(a) {
      },
      on: {
        divider_pointerdrag: {
          target: "divider_pointerdrag",
          action(a) {
          }
        },
        divider_pointerdragend: {
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
      let a = this.context.pair.active, i = this.context.pair.prev;
      S(a) && a.element.style.removeProperty("user-select"), S(i) && i.element.style.removeProperty("user-select");
    }
  }
}, Em = [
  ["grid", { class: _i, fixed: !1, required: !0, params: { axes: "x" } }]
], Pm = ["candles", "trades", "events"];
class Ho {
  #e = "MainPane";
  #t = "Main";
  #s;
  #r;
  #n;
  #i;
  #o = !1;
  #a;
  #c;
  #l;
  #h;
  #d;
  #u;
  #m = {};
  #v;
  #f;
  #x;
  #w;
  #p;
  #T;
  #P;
  #g = new Me();
  #C;
  #S;
  #D;
  #A = {};
  #O = {
    instance: null,
    rowsH: 0,
    panes: {}
  };
  #b = nr;
  #M = sr;
  #E = {};
  #y = [0, 0];
  #R = {
    active: !1,
    start: [0, 0],
    prev: [0, 0],
    delta: [0, 0]
  };
  #k;
  #H;
  #L;
  #I = 0;
  #_ = 0;
  constructor(i, s) {
    this.#n = i, this.#s = s, this.#r = i, this.#c = this.#n.elMain, this.#a = this.#n.elYAxis, this.init(s);
  }
  log(i) {
    this.#n.log(i);
  }
  info(i) {
    this.#n.info(i);
  }
  warn(i) {
    this.#n.warn(i);
  }
  error(i) {
    this.#n.error(i);
  }
  get id() {
    return `${this.#n.id}-${this.#e}`;
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
  get chart() {
    return this.#C;
  }
  get chartPanes() {
    return this.#g;
  }
  get chartPaneMaximized() {
    return this.#O;
  }
  get chartDeleteList() {
    return this.#A;
  }
  get time() {
    return this.#S;
  }
  get options() {
    return this.#s;
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
    return this.#l.getBoundingClientRect().width;
  }
  get rowsH() {
    return this.#l.getBoundingClientRect().height;
  }
  get rowMinH() {
    return this.#M;
  }
  set rowMinH(i) {
    T(i) && (this.#M = Math.abs(i));
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return ce(this.#c);
  }
  get range() {
    return this.#n.range;
  }
  set cursor(i) {
    this.element.style.cursor = i;
  }
  get cursor() {
    return this.element.style.cursor;
  }
  get cursorPos() {
    return this.#y;
  }
  get candleW() {
    return this.#S.candleW;
  }
  get theme() {
    return this.#n.theme;
  }
  get config() {
    return this.#n.config;
  }
  get buffer() {
    return this.#k;
  }
  get bufferPx() {
    return this.getBufferPx();
  }
  get scrollPos() {
    return this.#n.scrollPos;
  }
  set stateMachine(i) {
    this.#i = new Xe(i, this);
  }
  get stateMachine() {
    return this.#i;
  }
  get renderLoop() {
    return lm;
  }
  get graph() {
    return this.#p;
  }
  get views() {
    return this.#n.state.data.views;
  }
  get indicators() {
    return this.getIndicators();
  }
  get indicatorClasses() {
    return this.#n.indicatorClasses;
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
  init(i) {
    if (this.#n, this.#l = this.#c.rows, this.#h = this.#c.time, this.#v = this.#c.rows.grid, this.#x = this.#c.viewport, this.#u = this.#n.elBody.scale, i.name = "Chart", i.shortName = "Chart", i.parent = this, i.chartData = this.#n.chartData, i.primaryPane = this.#n.primaryPane, i.secondaryPane = this.#n.secondaryPane, i.rangeLimit = this.#n.rangeLimit, i.settings = this.#n.settings, i.elements = {
      ...i.elements,
      ...this.elements
    }, this.#n.theme?.time?.navigation === !1) {
      const s = { height: Di };
      this.#n.theme.time = { ...this.#n.theme?.time, ...s }, this.#l.style.height = `calc(100% - ${Di}px)`;
    }
    this.#S = new om(this.#n, i), this.registerChartViews(i), this.#k = T(this.config.buffer) ? this.config.buffer : Bi, this.#M = T(this.config.rowMinH) ? this.config.rowMinH : sr, this.#b = T(this.config.secondaryPaneDefaultH) ? this.config.secondaryPaneDefaultH : nr, this.rowsOldH = this.rowsH, this.log(`${this.#e} instantiated`);
  }
  start() {
    let i = 0;
    this.#c.start(this.theme), this.#S.start(), this.createGraph();
    const s = this.chart.scale.calcScaleWidth();
    this.core.elBody.scale.style.width = `${s}px`, this.#x.style.width = `${this.#l.width}px`, this.#g.forEach((n, r) => {
      n.start(i++), i === 1 && n.Divider.hide();
    }), this.rowsOldH = this.rowsH, this.draw(this.range, !0), this.renderLoop.init({
      graphs: [this.#p],
      range: this.range
    }), this.renderLoop.start(), this.renderLoop.queueFrame(this.range, [this.#p], !1), this.eventsListen(), cs.id = this.id, cs.context = this, this.stateMachine = cs, this.stateMachine.start();
  }
  destroy() {
    this.#n.hub.expunge(this), this.renderLoop.stop(), this.#o = !0, this.stateMachine.destroy(), this.#S.destroy(), this.#g.forEach((i, s) => {
      this.#A[s] = !0, i.destroy(), delete this.#A[s];
    }), this.#p.destroy(), this.#L.destroy();
  }
  reset() {
    for (let i in this.#n.Indicators)
      for (let s in this.#n.Indicators[i])
        this.#n.Indicators[i][s].instance.remove();
  }
  restart() {
    this.chart.scale.restart(), this.validateIndicators();
    for (let [i, s] of this.views)
      for (let n of s)
        i === "primary" && n.type === "candles" || this.addIndicator(n.type, n.name, { data: n.data, settings: n.settings });
    this.draw(this.range, !0);
  }
  eventsListen() {
    this.#L = new Ve(this.#l, { disableContextMenu: !1 }), this.#L.on("keydown", this.onChartKeyDown.bind(this)), this.#L.on("keyup", this.onChartKeyUp.bind(this)), this.#L.on("wheel", this.onMouseWheel.bind(this)), this.#L.on("pointerenter", this.onMouseEnter.bind(this)), this.#L.on("pointerout", this.onMouseOut.bind(this)), this.#L.on("pointerup", this.onChartDragDone.bind(this)), this.#L.on("pointermove", this.onMouseMove.bind(this)), this.on(Rs, this.onFirstStreamValue, this), this.on(Ds, this.onNewStreamValue, this), this.on("setRange", this.onSetRange, this), this.on("scrollUpdate", this.draw, this), this.on("chart_render", this.draw, this), this.on("destroyChartView", this.removeChartPane, this);
  }
  on(i, s, n = this) {
    this.#n.on(i, s, n);
  }
  off(i, s, n = this) {
    this.#n.off(i, s, n);
  }
  emit(i, s) {
    this.#n.emit(i, s);
  }
  onSetRange() {
    if (this.#_ = this.#I, this.#I = this.chart.scale.calcScaleWidth(), this.#_ < this.#I) {
      const i = `${this.#I}px`;
      this.core.elBody.scale.style.width = i, this.#x.style.width = `calc(100% - ${this.#I}px)`, this.#l.style.width = `calc(100% - ${this.#I}px)`, this.#h.style.width = `calc(100% - ${this.#I}px)`, this.setDimensions();
    } else
      this.draw();
  }
  onMouseWheel(i) {
    const s = Math.sign(i.wheeldelta) * -1;
    if (i.domEvent.preventDefault(), this.#n.pointerButtons[0]) {
      i.dragstart.x = this.#y[0], i.dragstart.y = this.#y[1], i.position.x = this.#y[0] + s, i.position.y = this.#y[1], this.onChartDrag(i);
      return;
    }
    const n = this.range, r = n.indexStart - Math.floor(s * Kn * n.Length), o = n.indexEnd + Math.ceil(s * Kn * n.Length);
    this.#n.setRange(r, o), this.draw(this.range, !0);
  }
  onMouseMove(i) {
    const s = this.#E;
    s.d2x = s?.d1x || null, s.d2y = s?.d1y || null, s.d1x = i.movement.x, s.d1y = i.movement.y, s.dx = Math.floor((s.d1x + s.d2x) / 2), s.dy = Math.floor((s.d1y + s.d2y) / 2), s.ts2 = s?.ts1 || null, s.ts1 = Date.now(), this.#y = [
      i.position.x,
      i.position.y,
      i.dragstart.x,
      i.dragstart.y,
      s.dx,
      s.dy,
      s.ts1,
      s.ts1 - s.ts2
    ], this.core.Timeline.showCursorTime(), this.core.Chart.graph.overlays.list.get("cursor").layer.visible = !0;
    for (let [n, r] of this.chartPanes)
      r.graph.overlays.list.get("cursor").layer.visible = !0;
    this.emit("main_mousemove", this.#y);
  }
  onMouseEnter(i) {
    this.core.Timeline.showCursorTime(), this.core.Chart.graph.overlays.list.get("cursor").layer.visible = !0, this.core.Chart.graph.render();
    for (let [s, n] of this.chartPanes)
      n.graph.overlays.list.get("cursor").layer.visible = !0, n.graph.render();
  }
  onMouseOut(i) {
    this.onPointerActive(!1), this.core.Timeline.hideCursorTime(), this.core.Chart.graph.overlays.list.get("cursor").layer.visible = !1, this.core.Chart.graph.render();
    for (let [s, n] of this.chartPanes)
      n.graph.overlays.list.get("cursor").layer.visible = !1, n.graph.render();
    this.draw();
  }
  onChartDrag(i) {
    const s = this.#R;
    s.active ? (s.delta = [
      i.position.x - s.prev[0],
      i.position.y - s.prev[1]
    ], s.prev = [
      i.position.x,
      i.position.y
    ]) : (s.active = !0, s.start = [i.dragstart.x, i.dragstart.y], s.prev = s.start, s.delta = [0, 0]), this.#y = [
      i.position.x,
      i.position.y,
      ...s.start,
      ...s.delta
    ], this.emit("chart_pan", this.#y);
  }
  onChartDragDone(i) {
    const s = this.#R;
    s.active = !1, s.delta = [0, 0], this.#y = [
      ...s.prev,
      ...s.start,
      ...s.delta
    ], this.emit("chart_panDone", this.#y);
  }
  onChartKeyDown(i) {
    let s = this.candleW > 1 ? this.candleW : 1;
    switch (i.key) {
      case "ArrowLeft":
        this.emit("chart_pan", [0, null, s, null, s * -1, null]);
        break;
      case "ArrowRight":
        this.emit("chart_pan", [s, null, 0, null, s, null]);
        break;
      case "ArrowUp":
        i.wheeldelta = -1, i.domEvent = i.srcEvent, this.onMouseWheel(i);
        break;
      case "ArrowDown":
        i.wheeldelta = 1, i.domEvent = i.srcEvent, this.onMouseWheel(i);
        break;
    }
  }
  onChartKeyUp(i) {
    let s = this.candleW > 1 ? this.candleW : 1;
    switch (i.key) {
      case "ArrowLeft":
        this.emit("chart_panDone", [0, null, s, null, s * -1, null]);
        break;
      case "ArrowRight":
        this.emit("chart_panDone", [s, null, 0, null, s, null]);
        break;
    }
  }
  onFirstStreamValue(i) {
    this.chart.scale.xAxis.calcXAxisGrads(this.range), this.draw(this.range, !0);
  }
  onNewStreamValue(i) {
  }
  onPointerActive(i) {
    i && (i.cursorActive = !0, i.scale.layerCursor.visible = !0), i !== this.chart && (this.chart.cursorActive = !1, this.chart.scale.layerCursor.visible = !1, this.chart.scale.layerCursor.erase()), this.#g.forEach((s, n) => {
      i !== s && (s.cursorActive = !1, s.scale.layerCursor.visible = !1, s.scale.layerCursor.erase());
    });
  }
  setDimensions() {
    this.#l.previousDimensions();
    let i = this.#l.heightDeltaR, s = Math.round(this.chartH * i), n = this.rowsW, r = this.rowsH, o = Math.round(n * ((100 + this.#k) * 0.01)), l = {
      resizeH: i,
      mainH: this.element.height,
      mainW: this.element.width,
      rowsH: this.rowsH,
      rowsW: this.rowsW
    };
    this.#n.scrollPos = -1, this.#S.setDimensions({ w: n }), this.#p.setSize(n, r, o), this.#x.style.width = `${n}px`, this.#g.size == 1 && s != this.#l.height ? this.#C.setDimensions({ w: n, h: this.#l.height }) : this.#g.forEach((h, c) => {
      s = Math.round(h.viewport.height * i), h.setDimensions({ w: n, h: s });
    }), this.rowsOldH = this.rowsH, this.emit("rowsResize", l), this.draw(void 0, !0);
  }
  getBufferPx() {
    let i = Math.round(this.width * this.buffer / 100), s = i % this.candleW;
    return i - s;
  }
  registerChartViews(i) {
    this.#l.previousDimensions();
    const s = this.validateIndicators();
    let n = s[0];
    for (let r of s)
      r?.primary === !0 ? n = r : r.primary = !1;
    n.primary = !0, i.rowY = 0;
    for (let [r, o] of this.views)
      i.type = r, i.view = o, this.addChartPane(i);
  }
  chartPanesState() {
    const i = {
      list: [...this.#g.values()],
      collapsed: [],
      expanded: [],
      maximized: this.#O.instance
    };
    for (let s of i.list)
      s.collapsed.state ? i.collapsed.push(s) : i.expanded.push(s);
    return i;
  }
  addChartPane(i) {
    const { expanded: s } = this.chartPanesState(), n = this.calcChartPaneHeights(), r = n.new;
    let o;
    for (o in n)
      if (this.#g.has(o)) {
        let p = this.#g.get(o);
        s.indexOf(p) > -1 && p.setDimensions({ w: this.rowsW, h: n[o] });
      }
    let l;
    this.#l.insertAdjacentHTML(
      "beforeend",
      this.#c.rowNode(i.type, this.#n)
    ), l = this.#l.chartPaneSlot.assignedElements().slice(-1)[0], l.style.height = `${r}px`, l.style.width = "100%";
    let h;
    this.#a.insertAdjacentHTML(
      "beforeend",
      this.scaleNode(i.type)
    ), h = this.#a.chartPaneSlot.assignedElements().slice(-1)[0], h.style.height = `${r}px`, h.style.width = "100%", i.elements.elTarget = l, i.elements.elScale = h;
    let c;
    return i.type == "primary" ? (c = new lt(this.#n, i), this.#C = c) : (i.name = i.view[0].name || "Secondary", i.shortName = i.view[0].type || "Secondary", c = new lt(this.#n, i)), this.setPaneDividers(), this.#g.set(c.id, c), this.emit("addChartView", c), c;
  }
  removeChartPane(i) {
    if (!E(i) || !this.#g.has(i) || this.#A[i])
      return !1;
    const s = this.#g.get(i);
    if (s.isPrimary)
      return this.#n.error(`Cannot remove primary chart pane! ${i}`), !1;
    this.#A[i] = !0;
    const { expanded: n } = this.chartPanesState();
    let r = n.indexOf(s);
    r > -1 && n.splice(r, 1);
    let o = s.viewport.height, l = Math.floor(o / n.length), h = o % l;
    if (s.status !== "destroyed" && (s.destroy(), this.#c.removeRow(s.id)), this.#g.delete(i), this.#g.size === 1) {
      let c = this.#g.values().next().value;
      c.collapsed && (c.collapsed.state = !1), c.setDimensions({ w: void 0, h: this.rowsH });
    } else
      for (let c of n)
        o = c.viewport.height, c.setDimensions({ w: void 0, h: o + l + h }), h = 0;
    return this.setPaneDividers(), this.draw(this.range, !0), !0;
  }
  validateIndicators() {
    const i = [];
    for (let [s, n] of this.views) {
      if (s === "primary" && i.push(n), n.length === 0 && s !== "primary") {
        this.views.delete(s);
        continue;
      }
      for (const [r, o] of n.entries())
        S(o) && (o.type in this.core.indicatorClasses || Pm.includes(o.type)) || (this.#n.log(`indicator ${n.type} not added: not supported.`), n.splice(r, 1));
    }
    return i;
  }
  addIndicator(i, s = i, n = {}) {
    let r, o = this.indicatorClasses[i].ind?.primaryPane;
    if (!E(i) && !(i in this.indicatorClasses) && !E(s) && !S(n))
      return !1;
    switch (this.log(`Adding the ${s} : ${i} indicator`), this.emit("pane_refresh", this), A(n?.data) || (n.data = []), S(n?.settings) || (n.settings = {}), o) {
      case !0:
      case !1:
        break;
      case void 0:
      case "both":
        o = Q(n.settings?.isPrimary) ? n.settings.isPrimary : !0;
    }
    if (n.settings.isPrimary = o, o) {
      const h = {
        type: i,
        name: s,
        ...n
      };
      r = this.#C.addIndicator(h);
    } else {
      A(n.view) || (n.view = [{ name: s, type: i, ...n }]);
      for (let h = 0; h < n.view.length; h++)
        (!S(n.view[h]) || !vo(["name", "type"], Object.keys(n.view[h]))) && n.view.splice(h, 1);
      if (n.view.length == 0)
        return !1;
      n.parent = this, n.title = s, n.elements = { ...this.elements }, r = this.addChartPane(n), r.start();
    }
    const l = "instance" in r ? r.instance.id : r.id;
    return this.refresh(), this.emit("addIndicatorDone", r), this.#n.log("Added indicator:", l), r;
  }
  getIndicators() {
    const i = {};
    return this.#g.forEach(
      (s, n) => {
        i[n] = s.indicators;
      }
    ), i;
  }
  getIndicator(i) {
    if (!E(i))
      return !1;
    for (const s of this.#g.values())
      if (i in s.indicators)
        return s.indicators[i].instance;
  }
  removeIndicator(i) {
    if (E(i))
      for (const s of this.#g.values())
        i in s.indicators && (i = s.indicators[i].instance);
    return i instanceof Le ? (i.chart.type === "primaryPane" || Object.keys(i.chart.indicators).length > 1 ? (i.remove(), this.emit("pane_refresh", this)) : i.chart.remove(), !0) : !1;
  }
  indicatorSettings(i, s) {
    if (E(i)) {
      for (const n of this.#g.values())
        if (i in n.indicators)
          return n.indicators[i].instance.settings(s);
    } else
      return i instanceof Le ? i.settings(s) : !1;
  }
  calcChartPaneHeights() {
    const { collapsed: i, expanded: s } = this.chartPanesState(), n = this.#g.size + 1, r = this.#b * (n - 1), o = r / Math.log10(r * 2) / 100;
    Math.round(this.rowsH * o);
    const l = {};
    if (n === 1)
      l.new = this.rowsH;
    else if (n === 2 || s.length === 1) {
      let h;
      try {
        h = s[0].viewport.height;
      } catch {
        h = this.rowsH;
      }
      const c = Math.round(h * this.#b / 100);
      l[s[0].id] = h - c, l.new = c;
    } else if (s.length === 2) {
      const h = s[0].viewport.height, c = s[1].viewport.height, p = h + c, f = Math.round(p * this.#b / 100), x = p / (p + f);
      l[s[0].id] = Math.floor(h * x), l[s[1].id] = Math.floor(c * x), l.new = Math.floor(f * x), l.new += p - (l[s[0].id] + l[s[1].id] + l.new);
    } else if (s.length >= 3) {
      let h = this.rowsH, c = 0, p;
      for (let f of i)
        h -= f.viewport.height;
      l.new = Math.floor(h / (s.length + 1)), h / (h + l.new), p = h - l.new;
      for (let f of s)
        l[f.id] = p * (f.viewport.height / h), c += l[f.id];
      l.new += h - c;
    }
    return l;
  }
  scaleNode(i) {
    const s = tc + " width: 100%;";
    return `
    <div slot="chartpane" class="viewport scale ${i}" style="$${s}"></div>
  `;
  }
  createGraph() {
    let i = ue(Em);
    this.#p = new St(this, this.#x, i);
  }
  draw(i = this.range, s = !1) {
    this.time.xAxis.doCalcXAxisGrads(i);
    const n = [
      this.#p,
      this.#S
    ];
    this.#g.forEach((r, o) => {
      r.status !== "destroyed" ? n.push(r) : console.log("error destroyed pane");
    }), this.renderLoop.queueFrame(
      this.range,
      n,
      s
    );
  }
  refresh() {
    this.renderLoop.expungeFrames(), this.core.Chart.graph.refresh();
    for (let [i, s] of this.chartPanes)
      s.graph.refresh();
    this.draw(this.range, !0);
  }
  updateRange(i) {
    this.#n.updateRange(i);
  }
  zoomRange() {
    this.draw(this.range, !0);
  }
  paneMaximize(i) {
    if (!(i instanceof lt))
      return !1;
    const s = this.#O, n = i.legend.list.chart.el.querySelector(".controls");
    let r;
    if (n.classList.toggle("maximized"), n.classList.toggle("restored"), i === s.instance)
      this.panesRestore(), s.instance = null, s.panes = {}, i.collapsed.state && (i.graph.viewport.scene.canvas.style.display = "none", i.scale.graph.viewport.scene.canvas.style.visibility = "hidden");
    else {
      this.panesRestore(), s.instance = i, s.rowsH = this.rowsH;
      for (let [o, l] of this.#g.entries())
        s.panes[o] = l.element.clientHeight, r = l.element.style, i === l ? (r.display = "block", l.setDimensions({ w: void 0, h: this.rowsH }), l.graph.viewport.scene.canvas.style.display = "block", l.scale.graph.viewport.scene.canvas.style.visibility = "visible") : (r.display = "none", l.scale.element.style.display = "none");
      this.hidePaneDividers();
    }
    return this.emit("pane_refresh", this), !0;
  }
  panesRestore() {
    const i = this.#O;
    let s = 0;
    this.emit("pane_refresh", this), this.dimensions.height == i.height;
    for (let [n, r] of this.#g.entries())
      r.element.style.display = "block", r.scale.element.style.display = "block", n in i.panes && s++ > 0 && r.Divider.show(), r.setDimensions({ w: void 0, h: i.panes[n] });
  }
  paneCollapse(i) {
    if (!(i instanceof lt))
      return !1;
    this.emit("pane_refresh", this);
    const s = i.legend.list.chart.el.querySelector(".controls"), n = i.collapsed;
    let r = i.element.clientHeight, o, l, h;
    const { list: c, collapsed: p, expanded: f } = this.chartPanesState();
    if (o = p.indexOf(i), o > -1 && p.splice(o, 1), o = f.indexOf(i), o > -1 && f.splice(o, 1), i.collapsed.state) {
      s.classList.remove("collapsed"), s.classList.add("expanded"), n.rowsCnt !== c.length ? r = n.height * (n.rowsCnt / c.length) : n.rowsHeight !== this.rowsH ? r = n.height * (n.rowsHeight / this.rowsH) : r = n.height, l = (r - Cs) / f.length;
      for (let x of f)
        h = x.element.clientHeight - l, x.setDimensions({ w: void 0, h });
      i.collapse(r);
    } else {
      if (s.classList.add("collapsed"), s.classList.remove("expanded"), c.length < 2 || f.length < 1)
        return !1;
      r = (i.element.clientHeight - Cs) / f.length;
      for (let x of f)
        h = x.element.clientHeight + r, x.setDimensions({ w: void 0, h });
      i.collapse();
    }
    return this.setPaneDividers(), !0;
  }
  setPaneDividers() {
    const { list: i } = this.chartPanesState();
    let s = 0;
    for (let n of i)
      n.Divider instanceof de && s++ > 0 && (n.Divider.setWidth(), n.Divider.setPos(), n.Divider.show());
  }
  hidePaneDividers() {
    const { list: i } = this.chartPanesState();
    for (let s of i)
      s.Divider instanceof de && s.Divider.hide();
  }
}
class Mm extends ge {
  constructor(i) {
    super(i);
  }
}
class wi extends ge {
  #e = Tr.colour;
  #t = Tr.width;
  #s;
  constructor(i) {
    super(i);
  }
  set colour(i = this.#e) {
    this.#e = i;
  }
  get colour() {
    return this.#e;
  }
  set lineWidth(i) {
    this.#t = T(i) ? i : this.#t;
  }
  get lineWidth() {
    return this.#t;
  }
  set stateMachine(i) {
    this.#s = new Xe(i, this);
  }
  get stateMachine() {
    return this.#s;
  }
  start() {
    this.eventsListen();
  }
  destroy() {
    this.stateMachine.destroy();
  }
  draw() {
    let [i, s] = this.cursorClick;
    this.layerTool.scene.clear();
    const r = this.layerTool.scene.context;
    r.save(), r.lineWidth = this.lineWidth, r.strokeStyle = this.colour, r.beginPath(), r.moveTo(i, s), r.lineTo(300, 150), r.stroke(), r.closePath(), r.restore(), this.elViewport.render();
  }
}
class Lm extends ge {
  constructor(i) {
    super(i);
  }
}
class Am extends ge {
  constructor(i) {
    super(i);
  }
}
class Om extends ge {
  constructor(i) {
    super(i);
  }
}
const Nm = [
  {
    id: "cursor",
    name: "Cursor",
    icon: Th,
    event: "tool_activated"
  },
  {
    id: "line",
    name: "Line",
    icon: nt,
    event: "tool_activated",
    class: wi,
    sub: [
      {
        id: "ray",
        name: "Ray",
        icon: nt,
        event: "tool_activated",
        class: wi
      },
      {
        id: "hRay",
        name: "Horizontal Ray",
        icon: nt,
        event: "tool_activated",
        class: wi
      },
      {
        id: "vRay",
        name: "Vertical Ray",
        icon: nt,
        event: "tool_activated",
        class: wi
      }
    ]
  },
  {
    id: "fibonacci",
    name: "Fibonacci",
    icon: Eh,
    event: "tool_activated",
    class: Mm,
    sub: [
      {
        id: "fib",
        name: "Not Implemented Yet",
        icon: nt
      }
    ]
  },
  {
    id: "range",
    name: "Range",
    icon: Mh,
    event: "tool_activated",
    class: Am,
    sub: [
      {
        id: "rng",
        name: "Not Implemented Yet",
        icon: nt
      }
    ]
  },
  {
    id: "text",
    name: "Text",
    icon: Lh,
    event: "tool_activated",
    class: Om,
    sub: [
      {
        id: "txt",
        name: "Not Implemented Yet",
        icon: nt
      }
    ]
  },
  {
    id: "measure",
    name: "Measure",
    icon: Ph,
    event: "tool_activated",
    class: Lm
  },
  {
    id: "delete",
    name: "Delete",
    icon: Sh,
    event: "tool_activated",
    class: void 0
  }
], Tr = {
  colour: "#8888AACC",
  width: 1
}, us = {
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
class $o {
  #e;
  #t = "Toolbar";
  #s = "tools";
  #r;
  #n;
  #i;
  #o;
  #a;
  #c = ge;
  #l;
  #h = {};
  #d = void 0;
  #u;
  #m = { click: [], pointerover: [] };
  #v = [];
  constructor(i, s) {
    this.#r = i, this.#n = s, this.#o = i.elTools, this.#l = Nm || i.config.tools, this.#a = i.WidgetsG, this.init();
  }
  log(i) {
    this.#r.log(i);
  }
  info(i) {
    this.#r.info(i);
  }
  warn(i) {
    this.#r.warn(i);
  }
  error(i) {
    this.#r.error(i);
  }
  set id(i) {
    this.#e = _e(i);
  }
  get id() {
    return this.#e || `${this.#r.id}-${this.#s}`;
  }
  get name() {
    return this.#t;
  }
  get shortName() {
    return this.#s;
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
    return ce(this.#o);
  }
  set stateMachine(i) {
    this.#i = new Xe(i, this);
  }
  get stateMachine() {
    return this.#i;
  }
  init() {
    this.mount(this.#o), this.log(`${this.#t} instantiated`);
  }
  start() {
    this.initAllTools(), this.addAllTools(), this.eventsListen(), us.id = this.id, us.context = this, this.stateMachine = us, this.stateMachine.start();
  }
  destroy() {
    this.off("setRange", this.onSetRange, this);
    const i = this.#o.querySelectorAll(".icon-wrapper");
    for (let s of i)
      for (let n of this.#l)
        n.id === id && s.removeEventListener("click", this.#m[id].click), s.removeEventListener("pointerover", this.#m[id].pointerover), s.removeEventListener("pointerout", this.#m[id].pointerout);
    this.stateMachine.destroy();
  }
  eventsListen() {
    this.on("tool_selected", this.onToolSelect, this), this.on("tool_deselected", this.onToolDeselect, this);
  }
  on(i, s, n = this) {
    this.#r.on(i, s, n);
  }
  off(i, s, n = this) {
    this.#r.off(i, s, n);
  }
  emit(i, s) {
    this.#r.emit(i, s);
  }
  onResized() {
    for (let i of this.#v)
      i.position();
  }
  onIconClick(i) {
    i.currentTarget.dataset.event;
    let s = i.currentTarget.dataset.menu || !1, n = {
      target: i.currentTarget.id,
      menu: s,
      evt: i.currentTarget.dataset.event,
      tool: i.currentTarget.dataset.tool
    };
    s ? this.emit("menu_open", n) : this.emit("menuItem_selected", n);
  }
  onIconOut(i) {
    const s = i.currentTarget.querySelector("svg");
    s.style.fill = Je.COLOUR_ICON;
  }
  onIconOver(i) {
    const s = i.currentTarget.querySelector("svg");
    s.style.fill = Je.COLOUR_ICONHOVER;
  }
  onToolTargetSelected(i) {
    console.log("tool_targetSelected:", i.target), this.#u = i.target;
  }
  onToolActivated(i) {
    console.log("Tool activated:", i), this.#d = i;
  }
  onToolSelect(i) {
    console.log("Tool selected:", i);
  }
  onToolDeselect(i) {
    console.log("Tool deselected:", i);
  }
  mount(i) {
    i.innerHTML = this.#o.defaultNode(this.#l);
  }
  initAllTools() {
    const i = this.#o.querySelectorAll(".icon-wrapper");
    for (let s of i) {
      let n = s.id, r = s.querySelector("svg");
      r.style.fill = Je.COLOUR_ICON, r.style.width = "90%";
      for (let o of this.#l)
        if (o.id === n)
          if (this.#m[n] = {}, this.#m[n].click = this.onIconClick.bind(this), this.#m[n].pointerover = this.onIconOver.bind(this), this.#m[n].pointerout = this.onIconOut.bind(this), s.addEventListener("click", this.#m[n].click), s.addEventListener("pointerover", this.#m[n].pointerover), s.addEventListener("pointerout", this.#m[n].pointerout), o?.sub) {
            let l = {
              content: o.sub,
              primary: s
            }, h = this.#a.insert("Menu", l);
            s.dataset.menu = h.id, h.start(), this.#v.push(h);
            for (let c of o.sub)
              this.#h[c.id] = c.class;
          } else
            this.#h[o.id] = o.class;
    }
  }
  addTool(i = this.#d, s = this.#u) {
    let n = {
      name: i,
      tool: this.#h[i],
      pos: s.cursorClick
    }, r = this.#c.create(s, n);
    return r.start(), console.log(r), r;
  }
  addNewTool(i, s) {
    let n = this.addTool(i, s);
    this.activeTool = n, this.emit("tool_active", n), this.emit(`tool_${n.id}_active`, n);
  }
  addAllTools() {
  }
}
const Sr = 20, Im = 20, Rm = new Eo(B.COLOUR_BORDER), Is = document.createElement("template");
Is.innerHTML = `
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
    background-color: var(--txc-time-handle-color, ${Rm.hex}44); 
    width: 2px;
    height: 18px;
    margin: 1px;
    margin-left: 872.968px;
    margin-right: 0px;
    position: absolute;
  }
  .icon {
    flex-basis: ${Sr}px;
  }
  .icon svg {
    fill: var(--txc-time-icon-color, ${B.COLOUR_ICON});
    width: ${Sr}px;
    height: ${Im}px;
    margin-top: 1px;
  }
  .icon svg:hover {
    fill: var(--txc-time-icon-hover-color, ${B.COLOUR_ICONHOVER});
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
  <span id="fwdEnd" class="icon fwdEnd">${Bh}</span>
</div>
`;
class Dm extends ne {
  #e;
  #t;
  #s;
  #r;
  #n;
  #i;
  #o;
  #a;
  #c;
  #l;
  #h;
  #d;
  constructor() {
    super(Is), this.#e = Is;
  }
  destroy() {
  }
  connectedCallback() {
    super.connectedCallback(
      () => {
        document.getElementById("slider-bar"), this.#t = this.shadowRoot.querySelector(".scrollBarWidget"), this.#s = this.shadowRoot.querySelector(".rwdStart"), this.#r = this.shadowRoot.querySelector(".fwdEnd"), this.#n = this.shadowRoot.querySelector(".scrollBar"), this.#i = this.shadowRoot.querySelector(".viewport"), this.#o = this.shadowRoot.querySelector(".handle"), this.#a = this.shadowRoot.querySelectorAll("svg"), this.#c = this.shadowRoot.querySelector("#max"), this.#l = this.shadowRoot.querySelector("#min"), this.#h = this.shadowRoot.querySelectorAll("input"), this.#d = this.shadowRoot.querySelector("style[title=overview]"), this.max.addEventListener("input", this.onChangeSliderHandler.bind({ self: this, input: this.max })), this.min.addEventListener("input", this.onChangeSliderHandler.bind({ self: this, input: this.min }));
      }
    );
  }
  get scrollBarWidget() {
    return this.#t;
  }
  get rwdStart() {
    return this.#s;
  }
  get fwdEnd() {
    return this.#r;
  }
  get scrollBar() {
    return this.#n;
  }
  get viewport() {
    return this.#i;
  }
  get handle() {
    return this.#o;
  }
  get icons() {
    return this.#a;
  }
  get max() {
    return this.#c;
  }
  get min() {
    return this.#l;
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
customElements.get("tradex-overview") || window.customElements.define("tradex-overview", Dm);
const Uo = document.createElement("template");
Uo.innerHTML = `
<style>
  .viewport {
    width: 100%;
    height: ${Di}px;
  }
  tradex-overview {
    height: ${to}px;
  }
</style>
<div class="viewport"></div>
<tradex-overview></tradex-overview>
`;
class km extends ne {
  #e;
  #t;
  constructor() {
    super(Uo);
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
const Bo = document.createElement("template");
Bo.innerHTML = `
<style>
.scene-canvas {
  display: block;
}
</style>
<slot name="viewportCanvas"></slot>
<canvas class="scene-canvas"></canvas>
`;
class _m extends ne {
  #e;
  #t;
  #s = this.onSlotChange.bind(this);
  constructor() {
    super(Bo);
  }
  destroy() {
  }
  connectedCallback() {
    super.connectedCallback(
      () => {
        this.#e = this.shadowRoot.querySelector('slot[name="viewportCanvas"]'), this.#e.addEventListener("slotchange", this.#s);
      }
    );
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.#e.removeEventListener("slotchange", this.#s);
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
    this.#t = Array.from(this.canvasSlot.assignedElements()).find((i) => i.localName === "canvas")[0];
  }
}
customElements.get("tradex-viewport") || window.customElements.define("tradex-viewport", _m);
const Vo = document.createElement("template");
Vo.innerHTML = `
<style>
  tradex-viewport {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
  <tradex-viewport></tradex-viewport>
`;
class Hm extends ne {
  #e;
  constructor() {
    super(Vo);
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
const zo = document.createElement("template");
zo.innerHTML = `
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
    <span id="hideLegends" class="control" data-icon="hide" style="display:none">${Oh}</span>
    <span id="showLegends" class="control" data-icon="show" style="display:none">${Nh}</span>
  </div>
</div>
`;
class $m extends ne {
  #e;
  #t;
  #s;
  #r;
  #n;
  #i;
  #o = [];
  #a;
  constructor() {
    super(zo);
  }
  destroy() {
  }
  connectedCallback() {
    super.connectedCallback(
      () => {
        this.#i = this.shadowRoot.querySelector("slot"), this.#t = this.shadowRoot.querySelector(".legends"), this.#s = this.shadowRoot.querySelector(".title"), this.#r = this.shadowRoot.querySelector("dl"), this.#n = this.shadowRoot.querySelector(".controls"), this.#a = this.onSlotChange.bind(this), this.#i.addEventListener("slotchange", this.#a);
      }
    );
  }
  disconnectedCallback() {
    this.#i.removeEventListener("slotchange", this.#a);
  }
  get slot() {
    return this.#i;
  }
  get legends() {
    return this.#t;
  }
  get elTitle() {
    return this.#s;
  }
  get elInputs() {
    return this.#r;
  }
  get elControls() {
    return this.#n;
  }
  get title() {
    return this.#e;
  }
  set title(i) {
    this.setTittle(i);
  }
  onSlotChange(i) {
    this.#o.forEach((s) => s.handler.call(s.context, i));
  }
  insert(i) {
    this.legends.insertAdjacentHTML("beforeend", i);
  }
  setTittle(i) {
    E && (this.#e = i, this.elTitle.innerHTML = i);
  }
  buildLegend(i, s) {
    let n = "", r = `${s.legend.font}; color: ${s.legend.colour}; text-align: left;`, o = "", l = i?.type !== "chart" ? "visible" : "notvisible";
    const h = "", c = s.legend.controls ? `
      <div class="controls restored expanded ${l}" style="${h}">
        ${this.buildControls(i)}
      </div>
    ` : "";
    switch (i?.type) {
      case "chart":
        o += "font-size: 1.5em;";
        break;
      case "secondary":
        r += " margin-bottom: -1.5em;", o += "", i.title = "";
        break;
      default:
        o += "font-size: 1.2em;";
        break;
    }
    return `
      <div id="legend_${i.id}" class="legend ${i.type}" style="${r}" data-type="${i.type}" data-id="${i.id}" data-parent="${i.parent.id}">
        <div class="lower">
          <span class="title" style="${o}">${i.title}</span>
          <dl style="${n}">${this.buildInputs(i)}</dl>
        </div>
        <div class="upper">
            <span class="title" style="${o}">${i.title}</span>
            ${c}
      </div>
     </div>
    `;
  }
  buildInputs(i) {
    let s = 0, n = "", r, o = "", l = "", h = "";
    for (r in i.inputs) {
      let c = i?.colours?.[s] ? ` color: ${i.colours[s]};` : "", p = i?.inputs?.[r] !== void 0 ? i.inputs[r] : o, f = i?.labels?.[s] ? `${r}:` : o;
      l += i?.labels?.[s] ? "1em;" : ".25em", n += `<dt style="${l}">${f}</dt>
      <dd style="${h}${c}">${p}</dd>`, ++s;
    }
    return n;
  }
  buildControls(i) {
    let s = "", n = i.id;
    return s += `<span id="${n}_up" class="control up" data-icon="up">${Ih}</span>`, s += `<span id="${n}_down" class="control down" data-icon="down">${Rh}</span>`, i?.type === "indicator" && (s += `<span id="${n}_visible" class="control visible" data-icon="visible">${$h}</span>`, s += `<span id="${n}_notVisible" class="control notvisible" data-icon="notVisible">${Uh}</span>`), i?.type !== "indicator" && (s += `<span id="${n}_collapse" class="control collapse" data-icon="collapse">${_h}</span>`, s += `<span id="${n}_expand" class="control expand" data-icon="expand">${Hh}</span>`, s += `<span id="${n}_maximize" class="control maximize" data-icon="maximize">${kh}</span>`, s += `<span id="${n}_restore" class="control restore" data-icon="restore">${Dh}</span>`), s += i?.type !== "chart" ? `<span id="${n}_remove" class="control remove" data-icon="remove">${Ah}</span>` : "", s += i?.type !== "secondary" ? `<span id="${n}_config" class="control config" data-icon="config">${Zr}</span>` : "", s;
  }
}
customElements.get("tradex-legends") || window.customElements.define("tradex-legends", $m);
const Wo = document.createElement("template");
Wo.innerHTML = `
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
class Um extends ne {
  #e;
  #t;
  constructor() {
    super(Wo);
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
customElements.get("tradex-chartpane") || window.customElements.define("tradex-chartpane", Um);
const Fo = document.createElement("template");
Fo.innerHTML = `
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
class Bm extends ne {
  #e;
  #t;
  #s;
  #r;
  constructor() {
    super(Fo);
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
    return Array.from(this.chartPaneSlot.assignedElements()).find((i) => i.classList.contains("primary"));
  }
  get secondary() {
    return Array.from(this.chartPaneSlot.assignedElements()).find((i) => i.classList.contains("secondary"));
  }
  get chartPanes() {
    return this.chartPaneSlot.assignedElements();
  }
  get chartPaneSlot() {
    return this.shadowRoot.querySelector('slot[name="chartpane"]');
  }
  get width() {
    return this.#s;
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
    return this.#s / this.#e;
  }
  get heightDeltaR() {
    return this.#r / this.#t;
  }
  previousDimensions() {
    this.#e = this.#s ? this.#s : this.clientWidth, this.#t = this.#r ? this.#r : this.clientHeight, this.#s = this.clientWidth, this.#r = this.clientHeight;
  }
}
customElements.get("tradex-rows") || window.customElements.define("tradex-rows", Bm);
const Go = document.createElement("template");
Go.innerHTML = `
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
    width: calc(100% - ${Kt}px);
    height: calc(100% - ${Ts}px);
    border: 1px solid;
    border-color: var(--txc-border-color, ${B.COLOUR_BORDER}); 
  }
  tradex-time {
    position: relative;
    width: calc(100% - ${Kt}px);
    height: ${Ts}px;
    overflow: hidden;
    margin-left: 1px;
    z-index: 1;
  }
</style>
<div id="viewport"></div>
<tradex-rows></tradex-rows>
<tradex-time></tradex-time>
`;
class Vm extends ne {
  #e;
  #t;
  #s;
  #r;
  constructor() {
    super(Go);
  }
  destroy() {
  }
  connectedCallback() {
    super.connectedCallback(
      () => {
        this.#s = this.shadowRoot.querySelector("#viewport"), this.#e = this.shadowRoot.querySelector("tradex-rows"), this.#t = this.shadowRoot.querySelector("tradex-time");
      }
    );
  }
  disconnectedCallback() {
  }
  get viewport() {
    return this.#s;
  }
  get rows() {
    return this.#e;
  }
  get time() {
    return this.#t;
  }
  start(i) {
    this.#r = i, this.setMain();
  }
  rowNode(i, s) {
    return `
      <tradex-chartpane slot="chartpane" class="${i}" style="">
      </tradex-chartpane>
    `;
  }
  removeRow(i) {
    const s = this.shadowRoot.querySelector(`#${i}`);
    return s ? (s.remove(), !0) : !1;
  }
  setMain() {
    let i = T(this.#r?.time?.height) ? this.#r.time.height : Ts, s = this.#r.tools.location == "none" ? 60 : 0;
    this.rows.style.height = `calc(100% - ${i}px)`, this.rows.style.left = `${s}px`, this.time.style.left = `${s}px`, this.viewport.style.left = `${s}px`;
  }
}
customElements.get("tradex-main") || window.customElements.define("tradex-main", Vm);
const Yo = document.createElement("template");
Yo.innerHTML = `
  <slot></slot>
`;
class zm extends ne {
  constructor() {
    super(Yo);
  }
  destroy() {
  }
  get icons() {
    return this.shadowRoot.querySelector("slot").assignedElements();
  }
  defaultNode(i) {
    let s = `
    <style>
      svg {
        height: ${Je.ICONSIZE};
        width: ${Je.ICONSIZE};
        fill: ${Je.COLOUR_ICON};
      }
      svg:hover {
        fill: ${Je.COLOUR_ICONHOVER};
      }
      .icon-wrapper {
        width: ${Je.ICONSIZE};
        margin: 0 auto;
      }
    </style>
    `;
    for (const n of i)
      s += this.iconNode(n);
    return s;
  }
  iconNode(i) {
    const s = "sub" in i ? 'data-menu="true"' : "";
    return `
      <div id="${i.id}" data-event="${i.event}" ${s} class="icon-wrapper">${i.icon}</div>

    `;
  }
}
customElements.get("tradex-tools") || window.customElements.define("tradex-tools", zm);
const qo = document.createElement("template");
qo.innerHTML = `
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
class Wm extends ne {
  #e;
  #t;
  #s;
  constructor() {
    super(qo);
  }
  destroy() {
  }
  connectedCallback() {
    super.connectedCallback(
      () => {
        this.#e = this.shadowRoot.querySelector("tradex-viewport"), this.#s = this.shadowRoot.querySelector('slot[name="chartpane"]'), this.#t = this.chartPaneSlot.assignedElements();
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
    return this.#s;
  }
}
customElements.get("tradex-scale") || window.customElements.define("tradex-scale", Wm);
const Fm = `
<style>
  tradex-tools {
    position: absolute; 
    top: 0; left: 0;
    width: ${at}px;
    height: 100%; 
    min-height: 100%; 
  }
  tradex-main {
    position: absolute; 
    top: 0;
    right: 0;
    width: calc(100% - ${at}px);
    height: 100%;
  }
  tradex-scale {
    position: absolute; 
    top: 1px;
    right: 0; 
    width: ${Kt}px; 
    height: 100%;
  }
</style>
<tradex-tools></tradex-tools>
<tradex-main></tradex-main>
<tradex-scale></tradex-scale>
`, Xo = document.createElement("template");
Xo.innerHTML = Fm;
class Gm extends ne {
  #e;
  #t;
  #s;
  #r;
  constructor() {
    super(Xo);
  }
  destroy() {
  }
  connectedCallback() {
    super.connectedCallback(
      () => {
        this.#t = this.shadowRoot.querySelector("tradex-tools"), this.#s = this.shadowRoot.querySelector("tradex-main"), this.#r = this.shadowRoot.querySelector("tradex-scale");
      }
    );
  }
  get tools() {
    return this.#t;
  }
  get main() {
    return this.#s;
  }
  get scale() {
    return this.#r;
  }
  start(i) {
    this.#e = i, this.setToolsLocation();
  }
  setYAxisLocation(i = this.#e?.yAxis?.location) {
    let s = T(this.#e?.tools?.width) ? this.#e.tools.width : at, n;
    switch (i) {
      case "left":
        n = s == 0 ? 0 : Kt, this.scale.style.left = `${s}px`, this.scale.style.right = void 0, this.main.style.left = void 0, this.main.style.right = `-${n}px`, this.main.style.width = `calc(100% - ${s}px)`;
        break;
      case "both":
      case "right":
      default:
        n = s == 0 ? Kt : 0, this.scale.style.left = void 0, this.scale.style.right = 0, this.main.style.left = void 0, this.main.style.right = `${n}px`, this.main.style.width = `calc(100% - ${s}px)`;
        break;
    }
  }
  setToolsLocation(i = this.#e?.tools?.location) {
    switch (this.#e.tools = this.#e.tools || {}, i) {
      case "none":
      case !1:
        this.#e.tools.location = "none", this.#e.tools.width = 0, this.tools.style.display = "none", this.tools.style.width = "0px";
        break;
      case "right":
        this.#e.tools.location = "right", this.#e.tools.width = this.#e?.tools?.width || at, this.tools.style.display = "block", this.tools.style.left = void 0, this.tools.style.right = 0, this.tools.style.width = `${at}px`;
        break;
      case "left":
      default:
        this.#e.tools.location = "left", this.#e.tools.width = this.#e?.tools?.width || at, this.tools.style.display = "block", this.tools.style.left = 0, this.tools.style.right = void 0, this.tools.style.width = `${at}px`;
        break;
    }
    this.setYAxisLocation();
  }
}
customElements.get("tradex-body") || window.customElements.define("tradex-body", Gm);
const jo = document.createElement("template");
jo.innerHTML = `
  <style>
    .utilsOptions {
      display: inline-block; float: right;
    }
  </style>
  <slot></slot>
  <div class="utilsOptions">
  </div>
`;
class Ym extends ne {
  constructor() {
    super(jo);
  }
  destroy() {
  }
  get icons() {
    return this.shadowRoot.querySelector("slot").assignedElements()[0].children;
  }
  defaultNode(i) {
    let n = `
    <div style="display: inline-block; float: right;">
    <style>
      svg {
        height: ${wt.ICONSIZE};
        fill: ${wt.COLOUR_ICON};
      }
    </style>
    `;
    for (const r of i)
      n += this.iconNode(r);
    return n + "</div>";
  }
  iconNode(i) {
    const s = `display: inline-block; height: ${wt.ICONSIZE}; padding-top: 2px`, n = "sub" in i ? 'data-menu="true"' : "";
    return `
      <div id="TX_${i.id}" data-event="${i.event}" ${n} class="icon-wrapper" style="${s}">${i.icon}</div>

    `;
  }
}
customElements.get("tradex-utils") || window.customElements.define("tradex-utils", Ym);
const Ko = document.createElement("template");
Ko.innerHTML = `
<style>
</style>
<div class="colourpicker">
</div>
`;
class qm extends ne {
  #e;
  #t;
  #s;
  #r;
  #n;
  #i;
  #o;
  #a;
  #c = {
    size: 128
  };
  constructor() {
    super(Ko);
  }
  destroy() {
  }
  connectedCallback() {
    super.connectedCallback(
      () => {
        this.#e = this.shadowRoot.querySelector(".colourpicker"), this.build();
      }
    ), this.#t = this.shadowRoot.querySelector(".mixer"), this.#s = this.shadowRoot.querySelector(".palette"), this.#r = this.shadowRoot.querySelector(".value"), this.#n = this.shadowRoot.querySelector(".model"), this.#i = this.shadowRoot.querySelector(".rgb"), this.#o = this.shadowRoot.querySelector(".alpha"), this.#a = this.shadowRoot.querySelector(".submit");
  }
  disconnectedCallback() {
    super.disconnectedCallback();
  }
  get elMixer() {
    return this.#t;
  }
  get elPalette() {
    return this.#s;
  }
  get elValue() {
    return this.#r;
  }
  get elModel() {
    return this.#n;
  }
  get elRGB() {
    return this.#i;
  }
  get elAlpha() {
    return this.#o;
  }
  get elSubmit() {
    return this.#a;
  }
  build() {
    const i = "";
    this.#e.innerHTML = i, this.paletteNode(), this.canvasNode();
  }
  paletteNode() {
    this.canvasNode("palette");
  }
  mixerNode() {
    this.canvasNode("mixer");
  }
  canvasNode(i) {
    const s = document.createElement("div");
    s.classList.add("type");
    const n = this.viewportNode();
    s.appendChild(n.container), n.container.style.cursor = "url(), 0, 0, copy";
    const r = n.viewport, o = {};
    this.#c.layers = o, this.#c.view = r, o.red = new Te.Layer(0, 0, this.#c.size, this.#c.size), o.green = new Te.Layer(0, 0, this.#c.size, this.#c.size), o.blue = new Te.Layer(0, 0, this.#c.size, this.#c.size), o.value = new Te.Layer(0, 0, this.#c.size, this.#c.size), o.composite = new Te.Layer(0, 0, this.#c.size, this.#c.size), r.addLayer(o.composite), o.grid = new Te.Layer(0, 0, this.#c.size, this.#c.size), r.addLayer(o.grid), this.#c[i] = { element: s, viewport: n, layers: o };
    let l = o.red.scene.context, h = [0, 0, this.#c.size, 0];
    mt(l, h, h, ["#f00", "#ff000000"]), l = o.green.scene.context, mt(l, h, h, ["#0f0", "#00ff0000"]), l = o.blue.scene.context, mt(l, h, h, ["#00f", "#0000ff00"]), l = o.value.scene.context, h = [0, 0, 0, this.#c.size], mt(l, h, h, ["#fff", "#000"]), this.compositeLayers(), l = o.grid.scene.context, po(l, 8, 16, 16, "#ffffff", "#cccccc"), r.render();
  }
  viewportNode() {
    const i = document.createElement("div");
    i.classList.add("viewport");
    const s = new Te.Viewport({
      width: this.#c.size,
      height: this.#c.size,
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
  gradient(i, s, n, r) {
    mt(i, [0, 0, 0, 0], r, [s, n]);
  }
  compositeLayers() {
    const i = this.#c.layers, s = ["red", "green", "blue", "value"], n = i.composite.scene.context;
    for (let r of s)
      n.drawImage(
        i[r].scene.canvas,
        i[r].x,
        i[r].y,
        i[r].width,
        i[r].height
      );
  }
}
customElements.get("tradex-colourpicker") || window.customElements.define("tradex-colourpicker", qm);
const Zo = document.createElement("template");
Zo.innerHTML = `
  <slot name="widget"></slot>
`;
class Xm extends ne {
  constructor() {
    super(Zo);
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
      height: ${Ge}px; 
      width: 100%; 
    }
    tradex-body {
      position: relative;
      height: calc(100% - ${Ge}px); 
      min-height: ${Ye - Ge}px;
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
class Km extends ne {
  #e;
  #t;
  #s;
  #r;
  #n = Yt;
  #i = Ye;
  #o;
  #a;
  #c;
  #l;
  #h;
  #d;
  constructor() {
    const i = document.createElement("template");
    i.innerHTML = jm, super(i, "closed"), this.#r = i;
  }
  destroy() {
    this.resizeObserver.disconnect();
  }
  static get observedAttributes() {
    return ["config", "disabled", "height", "stream", "width"];
  }
  connectedCallback() {
    if (this.doInit) {
      this.doInit = !1, this.shadowRoot.appendChild(this.#r.content.cloneNode(!0)), this.style.display = "block", this.style.minHeight = Qr, this.#s = this.shadowRoot.querySelector("tradex-widgets"), this.#t = this.shadowRoot.querySelector("tradex-utils"), this.#e = this.shadowRoot.querySelector("tradex-body"), this.#i = this.parentElement.clientHeight || Ye, this.#n = this.parentElement.clientWidth || Yt;
      let i = this.getAttribute("height") || "100%", s = this.getAttribute("width") || "100%";
      this.setDimensions(s, i), this.resizeObserver = new ResizeObserver(ke(this.onResized, 100, this)), this.resizeObserver.observe(this);
    }
  }
  disconnectedCallback() {
    this.resizeObserver.disconnect(), this.removeEventListener("click", this.onClick);
  }
  attributeChangedCallback(i, s, n) {
    switch (i) {
      case "config":
        break;
      case "disabled":
        break;
      case "height":
        this.height(n);
        break;
      case "width":
        this.width(n);
        break;
    }
  }
  get id() {
    return this.getAttribute("id");
  }
  set id(i) {
    this.setAttribute("id", _e(i));
  }
  get disabled() {
    return this.hasAttribute("disabled");
  }
  set disabled(i) {
    i ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
  }
  get stream() {
  }
  set stream(i) {
  }
  get elBody() {
    return this.#e;
  }
  get elUtils() {
    return this.#t;
  }
  get elWidgets() {
    return this.#s;
  }
  get elWidgetsG() {
    return this.#s;
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
    return this.#n;
  }
  get height() {
    return this.#i;
  }
  get resizeEntries() {
    return this.#d;
  }
  elStart(i) {
    this.#h = i, this.setUtilsLocation();
  }
  onResized(i) {
    super.onResize(i);
    const s = Kr.includes(this.theme?.utils?.location) ? Ge : 0, { width: n, height: r } = i[0].contentRect;
    this.#n = n, this.#i = r, this.#d = i[0], this.elBody.style.height = `calc(100% - ${s}px)`, this.MainPane instanceof Ho, this.ToolsBar instanceof $o && this.ToolsBar.onResized(), this.log(`onResize w: ${n}, h: ${r}`), this.emit("global_resize", { w: n, h: r });
  }
  setWidth(i) {
    T(i) ? i += "px" : E(i) && i.match(Bt) || (i = "100%"), this.style.width = i, this.#n = Math.round(this.getBoundingClientRect().width);
  }
  setHeight(i) {
    T(i) ? i += "px" : E(i) && i.match(Bt) || (this.#i = this.parentElement.getBoundingClientRect().height, w = this.#i + "px"), this.style.height = i, this.#i = Math.round(this.getBoundingClientRect().height);
  }
  setWidthMin(i) {
    this.style.minWidth = `var(--txc-min-width, ${i})`;
  }
  setHeightMin(i) {
    this.style.minHeight = `var(--txc-min-height, ${w})`;
  }
  setWidthMax(i) {
    this.style.minWidth = `var(--txc-max-width, ${i})`;
  }
  setHeightMax(i) {
    this.style.minHeight = `var(--txc-max-height, ${w})`;
  }
  setDimensions(i, s) {
    let n, r = this.width, o = this.height;
    if (!i || !s) {
      const l = this.getBoundingClientRect(), h = this.parentElement.getBoundingClientRect();
      s = l.height ? l.height : h.height ? h.height : Ye, i = l.width ? l.width : h.width ? h.width : Yt;
    } else
      (!T(i) || !T(s)) && ((!E(i) || !i.match(Bt)) && (i = "100%"), (!E(s) || !s.match(Bt)) && (s = "100%"));
    return this.setWidth(i), this.setHeight(s), n = {
      width: this.width,
      height: this.height,
      resizeW: i / r,
      resizeH: s / o,
      resizeWDiff: i - r,
      resizeHDiff: s - o
    }, n;
  }
  setUtilsLocation(i = this.#h?.utils?.location) {
    switch (this.#h.utils = this.#h.utils || {}, i) {
      case "top":
      case !0:
        this.theme.setProperty("utils.location", "top"), this.theme.setProperty("utils.height", Ge), this.#h.utils.location = "top", this.#h.utils.height = Ge, this.elUtils.style.display = "block", this.elUtils.style.height = `${Ge}px`, this.elBody.style.height = `calc(100% - ${Ge}px)`, this.elBody.style.minHeight = `${Ye - Ge}px`;
        break;
      case "none":
      case !1:
      default:
        this.theme.setProperty("utils.location", "none"), this.theme.setProperty("utils.height", 0), this.#h.utils.location = "none", this.#h.utils.height = 0, this.elUtils.style.display = "none", this.elUtils.style.height = "0px", this.elBody.style.height = "100%", this.elBody.style.minHeight = `${Ye}px`;
        break;
    }
  }
}
const Zm = [
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
    icon: xh,
    event: "utils_screenshot"
  },
  {
    id: "settings",
    name: "Settings",
    icon: Zr,
    event: "utils_settings"
  }
];
class Qm {
  #e = "Utilities";
  #t = "utils";
  #s;
  #r;
  #n;
  #i;
  #o;
  #a;
  #c;
  #l = {};
  #h = {};
  #d;
  #u = {};
  constructor(i, s) {
    this.#s = i, this.#r = s, this.#n = i.elUtils, this.#i = i.config?.utilsBar || Zm, this.#a = i.WidgetsG, this.#c = i.indicatorClasses || Mo, this.#o = i.config.theme?.utils?.location || "none", (this.#o || this.#o == "none" || !Kr.includes(this.#o)) && (this.#n.style.height = 0, this.core.elBody.style.height = "100%"), this.#n.innerHTML = this.#n.defaultNode(this.#i), this.log(`${this.#e} instantiated`);
  }
  log(i) {
    this.#s.log(i);
  }
  info(i) {
    this.#s.info(i);
  }
  warn(i) {
    this.#s.warn(i);
  }
  error(i) {
    this.#s.error(i);
  }
  get name() {
    return this.#e;
  }
  get shortName() {
    return this.#t;
  }
  get core() {
    return this.#s;
  }
  get options() {
    return this.#r;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return ce(this.#n);
  }
  get stateMachine() {
    return this.#d;
  }
  get location() {
    return this.#o;
  }
  start() {
    this.initAllUtils(), this.eventsListen();
  }
  destroy() {
    const i = this.#s, s = Ar(`#${i.id} .${Da} .icon-wrapper`);
    for (let n of s) {
      let r = n.id.replace("TX_", "");
      for (let o of this.#i)
        o.id === r && n.removeEventListener("click", this.#h[r].click), n.removeEventListener("pointerover", this.#h[r].pointerover), n.removeEventListener("pointerout", this.#h[r].pointerout);
    }
    this.#s.hub.expunge(this);
  }
  eventsListen() {
    this.on("utils_indicators", this.onIndicators, this), this.on("utils_timezone", this.onTimezone, this), this.on("utils_settings", this.onSettings, this), this.on("utils_screenshot", this.onScreenshot, this);
  }
  on(i, s, n = this) {
    this.#s.on(i, s, n);
  }
  off(i, s, n = this) {
    this.#s.off(i, s, n);
  }
  emit(i, s) {
    this.#s.emit(i, s);
  }
  onIconClick(i) {
    const s = Us(i.target, "icon-wrapper");
    if (!S(s))
      return !1;
    const n = Date.now();
    if (n - this.#u[s.id] < 1e3)
      return !1;
    this.#u[s.id] = n;
    let r = s.dataset.event, o = s.dataset.menu || !1, l = {
      target: s.id,
      menu: o,
      evt: r
    }, h = s.dataset.action;
    this.emit(r, l), o ? this.emit("menu_open", l) : this.emit("util_selected", l), h && h(l, this.#s);
  }
  onIconOver(i) {
    const s = i.currentTarget.querySelector("svg");
    s.style.fill = wt.COLOUR_ICONHOVER;
  }
  onIconOut(i) {
    const s = i.currentTarget.querySelector("svg");
    s.style.fill = wt.COLOUR_ICON;
  }
  initAllUtils() {
    const i = this.#n.querySelectorAll(".icon-wrapper");
    for (let s of i) {
      this.#u[s.id] = 0;
      let n = s.id.replace("TX_", ""), r = s.querySelector("svg");
      r.style.fill = wt.COLOUR_ICON, r.style.height = "90%";
      for (let o of this.#i)
        if (o.id === n && (this.#h[n] = {}, this.#h[n].click = this.onIconClick.bind(this), this.#h[n].pointerover = this.onIconOver.bind(this), this.#h[n].pointerout = this.onIconOut.bind(this), s.addEventListener("click", this.#h[n].click), s.addEventListener("pointerover", this.#h[n].pointerover), s.addEventListener("pointerout", this.#h[n].pointerout), n === "indicators" && (o.sub = Object.values(this.#c)), o?.sub)) {
          let l = {
            content: o.sub,
            primary: s
          }, h = this.#a.insert("Menu", l);
          s.dataset.menu = h.id, h.start();
        }
    }
  }
  onIndicators(i) {
  }
  onTimezone(i) {
    this.#s.notImplemented();
  }
  onSettings(i) {
    this.#s.notImplemented();
  }
  onScreenshot(i) {
    this.#s.downloadImage();
  }
}
const Jm = 150;
class Ce {
  #e;
  #t;
  #s;
  #r;
  #n;
  #i;
  #o;
  #a;
  #c;
  #l = {};
  static menuList = {};
  static menuCnt = 0;
  static class = An;
  static name = "Menus";
  static type = "Menu";
  static currentActive;
  static create(i, s) {
    const n = `menu_${++Ce.menuCnt}`;
    return s.id = n, Ce.menuList[n] = new Ce(i, s), Ce.menuList[n];
  }
  static destroy(i) {
    Ce.menuList[i].end(), delete Ce.menuList[i];
  }
  constructor(i, s) {
    this.#t = i, this.#s = s.core, this.#r = s, this.#e = s.id, this.#i = i.elements.elMenus, this.#n = this.#s.elWidgetsG, this.mount(this.#i);
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
    return ce(this.#o);
  }
  get type() {
    return Ce.type;
  }
  start() {
    this.position(), this.eventsListen();
  }
  end() {
    this.#i.querySelectorAll(`#${this.id} li`).forEach((s) => {
      s.removeEventListener("click", this.#l[this.id][s.id]);
    }), document.removeEventListener("click", this.#l[this.id].outside), this.off("global_resize", this.onResize, this);
  }
  eventsListen() {
    const i = this.#i.querySelectorAll(`#${this.id} li`);
    this.#l[this.id] = {}, i.forEach((s) => {
      this.#l[this.id][s.id] = this.onMenuSelect.bind(this), s.addEventListener("click", this.#l[this.id][s.id]);
    }), this.on("global_resize", this.onResize, this);
  }
  on(i, s, n = this) {
    this.#s.on(i, s, n);
  }
  off(i, s, n = this) {
    this.#s.off(i, s, n);
  }
  emit(i, s) {
    this.#s.emit(i, s);
  }
  onMenuSelect(i) {
    let s = i.currentTarget.dataset.event, n = {
      target: i.currentTarget.id,
      menu: this.#e,
      evt: s
    };
    this.emit("menuItem_selected", n), this.emit("menu_close", n), this.#s.log(`menu_close: ${this.#e}`);
  }
  onOutsideClickListener(i) {
    if (!this.#o.contains(i.target) && !this.#r.primary.contains(i.target) && Et(this.#o)) {
      let s = {
        target: i.currentTarget.id,
        menu: this.#e
      };
      this.emit("menu_close", s);
    }
    document.removeEventListener("click", this.#l[this.id].outside);
  }
  onResize() {
    this.position();
  }
  mount(i) {
    i.lastElementChild == null ? i.innerHTML = this.menuNode() : i.lastElementChild.insertAdjacentHTML("afterend", this.menuNode()), this.#o = this.#i.querySelector(`#${this.id}`);
  }
  static defaultNode() {
    return `
      <div slot="widget" class="${An}" style=""></div>
    `;
  }
  menuNode() {
    const i = this.#r, s = `position: absolute; z-index: 1000; display: none; border: 1px solid ${ns.COLOUR_BORDER}; background: ${ns.COLOUR_BG}; color: ${ns.COLOUR_TXT}; box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;`;
    let n = this.content(i);
    return `
      <div id="${i.id}" class="${ka}" style="${s}">
        ${n}
      </div>
    `;
  }
  content(i) {
    const s = `list-style: none; text-align: left; margin:1em 1em 1em -2.5em; min-width: ${Jm}px`, n = "padding: .25em 1em .25em 1em; white-space: nowrap;", r = "display: inline-block; width: 4em;", o = "cursor: pointer;", l = `onmouseover="this.style.background ='#222'"`, h = `onmouseout="this.style.background ='none'"`;
    let c = `<ul style="${s}">`;
    if (i?.content)
      for (let p of i.content)
        c += `<li id="${p.id}" data-event="${p.event}" style="${n} ${o}" ${l} ${h}><a style="${o}"><span style="${r}">${p.id}</span><span>${p.name}</span></li></a>`;
    return c += "</ul>", c;
  }
  position() {
    let i = this.#n.getBoundingClientRect(), s = this.#r.primary.getBoundingClientRect(), n = Math.round(s.left - i.left), r = Math.round(s.bottom - i.top);
    this.#o.style.left = n + "px", this.#o.style.top = r + "px";
    let o = ce(this.#o);
    if (o.right > this.#n.offsetWidth) {
      let h = Math.floor(this.#n.offsetWidth - o.width);
      h = _(h, 0, this.#n.offsetWidth), this.#o.style.left = `${h}px`;
    }
    if (this.#s.MainPane.rowsH + r + o.height > this.#s.MainPane.rowsH) {
      let h = Math.floor(o.height * -1);
      h = _(h, this.#s.MainPane.rowsH * -1, 0), this.#o.style.top = `${h}px`;
    }
  }
  remove() {
  }
  open() {
    if (Ce.currentActive === this)
      return !0;
    Ce.currentActive = this, this.#o.style.display = "block", this.position(), setTimeout(() => {
      this.#l[this.id].outside = this.onOutsideClickListener.bind(this), document.addEventListener("click", this.#l[this.id].outside);
    }, 250);
  }
  close() {
    Ce.currentActive = null, this.#o.style.display = "none", this.emit("menuClosed", this.id);
  }
}
class ht {
  static opened = new ht("opened");
  static closed = new ht("closed");
  constructor(i) {
    this.name = i;
  }
}
class he {
  #e;
  #t;
  #s;
  #r;
  #n = ht.closed;
  #i;
  #o;
  #a;
  #c;
  #l;
  #h;
  #d;
  #u;
  #m;
  #v;
  #f;
  #x;
  #w = !1;
  #p = {};
  static windowList = {};
  static windowCnt = 0;
  static class = Nn;
  static name = "Windows";
  static type = "Window";
  static currentActive = null;
  static create(i, s) {
    const n = `window_${++he.windowCnt}`;
    s.id = n;
    const r = {
      window: { "box-shadow": "rgb(0,0,0) 0px 20px 30px -10px" },
      content: { padding: "1em" }
    };
    return s.styles = S(s?.styles) ? { ...r, ...s.styles } : r, s.class = s?.class || "window", he.windowList[n] = new he(i, s), he.windowList[n];
  }
  static destroy(i) {
    he.windowList[i].destroy(), delete he.windowList[i];
  }
  constructor(i, s) {
    this.#t = i, this.#s = s.core, this.#r = s, this.#e = s.id, this.#o = i.elements.elWindows, this.#i = this.#s.elWidgetsG, this.init();
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
  set config(i) {
    this.#r = i;
  }
  get state() {
    return this.#n;
  }
  get dimensions() {
    return mi.elementDimPos(this.#a);
  }
  set dimensions(i) {
    this.setDimensions(i);
  }
  get type() {
    return he.type;
  }
  get el() {
    return this.#a;
  }
  get elDragBar() {
    return this.#c;
  }
  get elTitle() {
    return this.#l;
  }
  get elCloseIcon() {
    return this.#h;
  }
  get elContent() {
    return this.#d;
  }
  init() {
    this.mount(this.#o);
  }
  start() {
    this.eventsListen(), this.close();
  }
  destroy() {
    this.#s.hub.expunge(), this.el.remove();
  }
  eventsListen() {
    this.on("closeWindow", this.onCloseWindow, this), this.on("global_resize", this.onGlobalResize, this);
  }
  on(i, s, n = this) {
    this.#s.on(i, s, n);
  }
  off(i, s, n = this) {
    this.#s.off(i, s, n);
  }
  emit(i, s) {
    this.#s.emit(i, s);
  }
  onGlobalResize(i) {
    const s = this.dimensions, n = {
      position: { x: s.left, y: s.top },
      dimensions: { w: s.w, h: s.h }
    };
    s.w > i.width && (n.position.x = i.width), s.h > i.height && (n.position.y = i.height), s.left + n.dimensions.w, s.bottom + n.dimensions.h, s.x < 0 ? n.position.x = 0 : s.x + n.dimensions.w > i.width && (n.position.x -= i.width), this.setProperties(n);
  }
  onOutsideClickListener(i) {
    if (!this.#a.contains(i.target) && mi.isVisible(this.#a) && !this.#w) {
      let s = {
        target: i.currentTarget.id,
        window: this.#e
      };
      this.emit("closeWindow", s), document.removeEventListener("click", this.#p.click), delete this.#p.click;
    }
  }
  onCloseWindow(i) {
    i.window === this.#e && this.close();
  }
  onWindow(i) {
    i.stopPropagation();
  }
  onDragBar(i) {
    this.#w = !0;
    let s = this.#a.offsetLeft + i.movement.x, n = this.#a.offsetTop + i.movement.y;
    this.position({ x: s, y: n });
  }
  onDragBarEnd(i) {
    setTimeout(() => {
      this.#w = !1;
    }, 250);
  }
  mount(i) {
    i.lastElementChild == null ? i.innerHTML = this.windowNode() : i.lastElementChild.insertAdjacentHTML("afterend", this.windowNode()), this.#a = this.#o.querySelector(`#${this.#r.id}`), this.#c = this.#a.querySelector(".dragBar"), this.#l = this.#a.querySelector(".title"), this.#h = this.#a.querySelector(".closeIcon"), this.#d = this.#a.querySelector(".content"), this.#a.addEventListener("click", this.onWindow.bind(this)), mi.isElement(this.#c) && (this.#x = new Ve(this.#c, { disableContextMenu: !1 }), this.#x.on("pointerdrag", this.onDragBar.bind(this)), this.#x.on("pointerdragend", this.onDragBarEnd.bind(this)));
    const s = this.dimensions, n = this.#r?.w || s.w, r = this.#r?.h || s.h;
    this.setDimensions({ w: n, h: r }), this.position();
  }
  static defaultNode() {
    return `
      <div slot="widget" class="${Nn}" style=""></div>
    `;
  }
  windowNode() {
    const i = this.#r;
    let s = `position: absolute; z-index: 100; display: block; border: 1px solid ${Si.COLOUR_BORDER}; background: ${Si.COLOUR_BG}; color: ${Si.COLOUR_TXT}; box-shadow: rgb(0,0,0) 0px 20px 30px -10px;`, n = this.config?.styles?.window;
    for (let p in n)
      s += `${p}: ${n[p]}; `;
    let r = i.dragBar ? this.dragBar(i) : "", o = !i.dragBar && i.title ? this.title(i) : "", l = this.content(i), h = this.closeIcon(i);
    return `
      <div id="${i.id}" class="${_a} ${this.#r.class}" style="${s}">
          ${r}
          ${o}
          ${h}
          ${l}
        </div>
      </div>
    `;
  }
  content(i) {
    let s = this.config?.styles?.content, n = "";
    for (let l in s)
      n += `${l}: ${s[l]}; `;
    let r = i?.content ? i.content : "";
    return `
      <div class="content" style="${n}">
        ${r}
      </div>
    `;
  }
  dragBar(i) {
    const s = "cursor: grab;", n = `onmouseover="this.style.background ='#222'"`, r = `onmouseout="this.style.background ='none'"`;
    let o = `${s} `, l = this.config?.styles?.dragBar;
    for (let c in l)
      o += `${c}: ${l[c]}; `;
    let h = "";
    return i.dragBar && (h += `
      <div class="dragBar" style="${o}" ${n} ${r}>
        ${this.title(i)}
      </div>
    `), h;
  }
  title(i) {
    const s = this.config, n = s?.styles?.title, r = E(s?.title) ? s.title : "";
    let o = "white-space: nowrap; ";
    for (let h in n)
      o += `${h}: ${n[h]}; `;
    return `
        <div class="title" style="${o}">${r}</div>
    `;
  }
  closeIcon(i) {
    const s = "cursor: pointer;", n = `onmouseover="this.style.background ='#222'"`, r = `onmouseout="this.style.background ='none'"`;
    let o = `${s} `, l = this.config?.styles?.closeIcon, h = "";
    for (let p in l)
      h += `${p}: ${l[p]}; `;
    let c = "";
    return i.closeIcon && (c += `
      <div class="closeIcon" style="${o}" ${n} ${r}>
        <span>X</span>
      </div>
    `), c;
  }
  position(i) {
    let s = this.dimensions, n = this.#s.dimensions;
    Math.round(n.left - s.left), Math.round(n.bottom - s.top);
    let r = Math.round((n.width - s.width) / 2), o = Math.round((n.height - s.height) / 2) * -1, l = mi.getStyle(this.#a, "z-index");
    if (S(i)) {
      let { x: h, y: c, z: p } = { ...i };
      T(h) && (r = h), T(c) && (o = c), T(p) && (l = p), this.#u = { x: h, y: c, z: l };
    }
    if (this.#a.style["z-index"] = `${l}`, this.config?.bounded) {
      const h = this.#a.clientWidth;
      if (r + h > this.#i.offsetWidth) {
        let p = Math.floor(this.#i.offsetWidth - h);
        p = _(p, 0, this.#i.offsetWidth), r = p;
      }
      const c = this.#a.clientHeight;
      if (o + n.height + c > n.height) {
        let p = Math.floor(c * -1);
        p = _(p, n.height * -1, 0), o = p;
      }
    }
    this.#a.style.left = `${r}px`, this.#a.style.top = `${o}px`;
  }
  setDimensions(i) {
    if (!S(i))
      return !1;
    T(i?.w) && (this.#a.style.width = `${i.w}px`), T(i?.h) && (this.#a.style.height = `${i.h}px`);
  }
  setProperties(i) {
    if (!S(i))
      return !1;
    if (E(i?.title) && (this.#l.innerHTML = i.title), E(i?.content) && (this.#d.innerHTML = i.content), this.setDimensions({ ...i?.dimensions }), this.position({ ...i?.position }), S(i?.styles)) {
      const s = (n, r) => {
        if (!S(r))
          return !1;
        const o = "el" + n.charAt(0).toUpperCase() + n.slice(1);
        if (S(this[o]))
          for (let l in r)
            this[o].style.p = r[l];
      };
      for (let n of Object.keys(i.styles))
        s(n, i.styles[n]);
    }
    return i;
  }
  remove() {
    return he.destroy(this.id);
  }
  open(i = {}) {
    if (he.currentActive === this && this.state === ht.opened)
      return !0;
    he.currentActive = this, this.#n = ht.opened, this.#a.style.display = "block", this.#a.style.zindex = "10", this.setProperties(i), this.emit("window_opened", this.id), setTimeout(() => {
      this.#p.click = this.onOutsideClickListener.bind(this), document.addEventListener("click", this.#p.click);
    }, i?.offFocus || 250);
  }
  close() {
    he.currentActive = null, this.#n = ht.closed, this.#a.style.display = "none", this.emit("window_closed", this.id);
  }
}
class Fi extends he {
  static type = "Window";
  static create(i, s) {
    const n = {
      window: { "box-shadow": "rgb(0,0,0) 0px 20px 30px -10px" },
      content: { padding: "1em" },
      title: { padding: "0 1em", background: "#333" }
    };
    return s.dragBar = Q(s?.dragBar) ? s.dragBar : !0, s.close = Q(s?.close) ? s.close : !0, s.styles = S(s?.styles) ? { ...n, ...s.styles } : n, s.class = "dialogue", super.create(i, s);
  }
  constructor(i, s) {
    super(i, s);
  }
  get type() {
    return Fi.type;
  }
}
class ep extends Fi {
  static type = "Window";
  static create(i, s) {
    return s.dragBar = !0, s.close = !0, s.class = "config", super.create(i, s);
  }
  constructor(i, s) {
    super(i, s);
  }
}
class Ne {
  static progressList = {};
  static progressCnt = 0;
  static class = In;
  static type = "progress";
  static name = "Progress";
  static icons = {
    loadingBars: Qh,
    loadingSpin: Jh
  };
  static defaultNode() {
    return `
      <div slot="widget" class="${In}" style=""></div>
    `;
  }
  static create(i, s) {
    const n = `progress_${++Ne.progressCnt}`;
    return s.id = n, Ne.progressList[n] = new Ne(i, s), Ne.progressList[n];
  }
  static destroy(i) {
    Ne.progressList[i].destroy(), delete Ne.progressList[i];
  }
  #e;
  #t;
  #s;
  #r;
  #n;
  #i;
  #o;
  #a;
  constructor(i, s) {
    this.#t = i, this.#s = s.core, this.#r = s, this.#e = s.id, this.#i = i.elements.elProgress, this.#n = this.#s.elWidgetsG, this.init();
  }
  destroy() {
    this.#i.remove();
  }
  get type() {
    return Ne.type;
  }
  init() {
    this.mount(this.#i);
  }
  start() {
    if (!S(this.#s.config?.progress) || !S(this.#s.config.progress?.loading))
      return !1;
    this.#o.style.display = "block";
    const i = this.#s.elBody.width / 2 - this.#o.clientWidth / 2, s = this.#s.elBody.height / -2 - this.#o.clientHeight / 2;
    this.#o.style.top = `${s}px`, this.#o.style.left = `${i}px`;
  }
  stop() {
    this.#o.style.display = "none";
  }
  progressNode(i) {
    const s = "position: absolute; z-index: 1000; display: none; justify-content: center; align-items: center;", r = `<div class="content" style="">${i.icon}</div>`;
    return `
      <div id="${this.#r.id}" class="progress ${i.type}" style="${s}">${r}</div>
    `;
  }
  mount(i) {
    let s = "loadingBars";
    this.#r?.type in Ne.icons && (s = this.#r?.type);
    const n = { type: s, icon: Ne.icons[s] };
    i.lastElementChild == null ? i.innerHTML = this.progressNode(n) : i.lastElementChild.insertAdjacentHTML("afterend", this.progressNode(n)), this.#o = this.#i.querySelector(`#${this.#r.id}`), this.#a = this.#o.querySelector("svg"), this.#a.style.fill = `${ic.COLOUR_ICONHOVER};`;
  }
}
const ds = {
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
class tp {
  #e;
  #t = "Widgets";
  #s = "widgets";
  #r;
  #n;
  #i;
  #o = {};
  #a = { Divider: de, Progress: Ne, Menu: Ce, Window: he, Dialogue: Fi, ConfigDialogue: ep };
  #c = {};
  #l = {};
  #h;
  #d;
  #u;
  constructor(i, s) {
    this.#r = i, this.#n = s, this.#o = { ...this.#a, ...s.widgets }, this.#h = i.elWidgetsG, this.init();
  }
  log(i) {
    this.#r.log(i);
  }
  info(i) {
    this.#r.info(i);
  }
  warn(i) {
    this.#r.warn(i);
  }
  error(i) {
    this.#r.error(i);
  }
  set id(i) {
    this.#e = _e(i);
  }
  get id() {
    return this.#e || `${this.#r.id}-${this.#s}`;
  }
  get name() {
    return this.#t;
  }
  get shortName() {
    return this.#s;
  }
  get core() {
    return this.#r;
  }
  get options() {
    return this.#n;
  }
  get elements() {
    return this.#l;
  }
  get instances() {
    return this.#c;
  }
  set stateMachine(i) {
    this.#i = new Xe(i, this);
  }
  get stateMachine() {
    return this.#i;
  }
  get types() {
    return this.#o;
  }
  init() {
    this.mount(this.#h);
    for (let i in this.#o) {
      let s = this.#o[i], n = `el${s.name}`;
      this.#l[n] = this.#h.querySelector(`.${s.class}`);
    }
  }
  start() {
    this.eventsListen(), ds.id = this.id, ds.context = this, this.stateMachine = ds, this.stateMachine.start();
  }
  destroy() {
    this.#r.hub.expunge(this), this.stateMachine.destroy();
    for (let i in this.#c)
      this.delete(i);
    for (let i in this.#o)
      this.#o[i].destroy(id);
  }
  eventsListen() {
    this.on("resize", this.onResize, this), this.on("menu_open", this.onOpenMenu, this), this.on("menu_close", this.onCloseMenu, this), this.on("menu_off", this.onCloseMenu, this), this.on("menuItem_selected", this.onMenuItemSelected, this), this.on("global_resize", this.onResize, this);
  }
  on(i, s, n = this) {
    this.#r.on(i, s, n);
  }
  off(i, s, n = this) {
    this.#r.off(i, s, n);
  }
  emit(i, s) {
    this.#r.emit(i, s);
  }
  onResize(i) {
    this.setDimensions(i);
  }
  onOpenMenu(i) {
    this.#c[i.menu].open();
  }
  onCloseMenu(i) {
    this.#c[i.menu].close();
  }
  onMenuItemSelected(i) {
    this.emit(i.evt, i.target);
  }
  onResize() {
    this.elements.elDividers.style.width = `${this.core.width}px`;
  }
  mount(i) {
    i.innerHTML = this.defaultNode();
  }
  setWidth(i) {
    this.#d = i;
  }
  setHeight(i) {
    this.#u = i;
  }
  setDimensions(i) {
    this.setWidth(i.mainW), this.setHeight(i.mainH);
  }
  defaultNode() {
    let i = "", s = [];
    for (let n in this.#o) {
      let r = this.#o[n];
      s.indexOf(r.type) === -1 && (i += r.defaultNode(), s.push(r.type));
    }
    return i;
  }
  insert(i, s) {
    if (!(i in this.#o) || !S(s))
      return !1;
    s.core = this.core;
    const n = this.#o[i].create(this, s);
    return this.#c[n.id] = n, n;
  }
  delete(i) {
    if (!E(i) || !(i in this.#c))
      return !1;
    const s = this.#c[i].type;
    return this.#o[s].destroy(i), !0;
  }
}
function Er(a, i, s, n, r, o) {
  const l = a.theme, h = document.createElement("template"), c = a.Timeline.graph.viewport.scene, p = a.MainPane, f = p.graph.viewport.scene, x = p.width, P = p.height, L = new Te.Viewport({
    width: x,
    height: P,
    container: h
  }), O = L.scene.context;
  let D = 0, re = 0, fe = x - a.Chart.scale.width;
  l?.yAxis?.location == "left" && (re = a.Chart.scale.width, fe = 0);
  let $;
  O.save(), en(O, 0, 0, x, P, { fill: l.chart.Background }), O.drawImage(f.canvas, re, 0, f.width, f.height);
  for (const [N, oe] of a.ChartPanes) {
    let K = oe.graph.viewport.scene, { width: ae, height: ye } = K, ve = oe.scale.graph.viewport.scene, { width: ut, height: je } = ve;
    D > 0 && ($ = { stroke: l.divider.line }, Qt(O, D, 0, p.width, $)), O.drawImage(K.canvas, re, D, ae, ye), O.drawImage(ve.canvas, fe, D - 1, ut, je), D += ye;
  }
  O.drawImage(c.canvas, 0, D, c.width, c.height), $ = {
    text: a.config.title,
    colour: l.chart.TextColour,
    fontSize: l.chart.FontSize * 1.5,
    fontWeight: "normal",
    fontFamily: l.chart.FontFamily,
    textBaseLine: "top"
  }, ao(O, 6, 6, $);
  const k = (N) => {
    if (N) {
      const K = o?.x || 0, ae = o?.y || 0, ye = o?.width || x * 0.25, ve = o?.height || P * 0.25;
      O.drawImage(N, K, ae, ye, ve);
    }
    O.restore();
    const oe = () => {
      L.destroy(), h.remove();
    };
    switch (r) {
      case "url":
        if (U(i)) {
          const K = (ae) => {
            i(ae), oe();
          };
          L.scene.toImage(s, n, K);
        } else
          new Promise(function(K, ae) {
            const ye = L.scene.toImage(s, n);
            ye ? K(ye) : ae(!1), oe();
          });
        break;
      case "download":
      default:
        L.scene.export({ fileName: i }, null, s, n), oe();
        break;
    }
  };
  S(o) ? _s(o?.imgURL).then((N) => {
    k(N);
  }).catch((N) => {
    console.error(N);
  }) : k();
}
class R extends Km {
  static #e = rn;
  static #t = 0;
  static #s = {};
  static #r = {};
  static #n = null;
  static #i = !1;
  static #o = [];
  static #a = null;
  static #c = null;
  static #l = !1;
  static get version() {
    return R.#e;
  }
  static get talibPromise() {
    return R.#n;
  }
  static get talibReady() {
    return R.#i;
  }
  static get talibAwait() {
    return R.#o;
  }
  static get talibError() {
    return R.#a;
  }
  static get webWorkers() {
    return De;
  }
  static get TALibWorker() {
    return R.#c;
  }
  static #h = `${Ht} requires "talib-web" to function properly. Without it, some features maybe missing or broken.`;
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
  #u = Ht;
  #m = Ft;
  #v;
  #f;
  #x;
  #w;
  #p;
  #T;
  #P;
  #g;
  #C;
  #S;
  #D;
  #A;
  #O = !1;
  #b = null;
  #M = H;
  #E;
  #y;
  #R = Mo;
  #k = { ...Ti };
  #H = { ...Ti };
  #L = { ...Ti };
  #I;
  #_;
  #j;
  chartWMin = Yt;
  chartHMin = Ye;
  chartW_Reactive = !0;
  chartH_Reactive = !0;
  chartBGColour = B.COLOUR_BG;
  chartTxtColour = B.COLOUR_TXT;
  chartBorderColour = B.COLOUR_BORDER;
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
  #$ = {
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
  #J = [!1, !1, !1];
  #q;
  #X;
  #B;
  #K;
  #Z;
  #Q;
  #V = !1;
  #z = !1;
  static create(i) {
    let s = ue(lc);
    return S(i) && Object.keys(i).length > 0 && ((!("watermark" in i) || !E(i?.watermark?.text) && !("imgURL" in i?.watermark)) && (s.watermark = { display: !1 }), s = ct(s, i)), R.#t == 0 && (R.#s.CPUCores = navigator.hardwareConcurrency, R.#s.api = {
      permittedClassNames: R.#d
    }), (typeof s.talib != "object" || typeof s.talib.init != "function") && (R.#i = !1, R.#a = new Error(`${R.#h}`)), !R.#i && R.#a === null && (R.#n = s.talib.init(s.wasm), R.#n.then(
      () => {
        R.#i = !0;
        for (let n of R.#o)
          U(n) && n();
      },
      () => {
        R.#i = !1;
      }
    )), s;
  }
  static destroy(i) {
    if (!(i instanceof R))
      return !1;
    const s = i.inCnt;
    return i.destuction = !0, i.destroy(), delete R.#r[s], !0;
  }
  static cnt() {
    return R.#t++;
  }
  constructor() {
    super(), this.#w = this, this.#v = this, this.#b = R.cnt(), this.logs = !1, this.infos = !1, this.warnings = !1, this.errors = !1, this.timer = !1, this.setID(null), this.#E = this.#M.create({}, !1, !1), console.warn(`!WARNING!: ${Ht} changes to config format, for details please refer to https://github.com/tradex-app/TradeX-chart/blob/master/docs/notices.md`), this.log(`${Ft} instance count: ${this.inCnt}`), this.oncontextmenu = window.oncontextmenu, this.#X = De;
    const i = this.#k;
    i.primaryPane = { ...i.primaryPane, ..._o.primaryPane }, this.#H = { ...Ns };
  }
  log(...i) {
    this.logs && console.log(...i);
  }
  info(...i) {
    this.infos && console.info(...i);
  }
  warn(...i) {
    this.warnings && console.warn(...i);
  }
  error(i) {
    this.errors && console.error(i);
  }
  time(i) {
    this.timer && console.time(i);
  }
  timeLog(i) {
    this.timer && console.timeLog(i);
  }
  timeEnd(i) {
    this.timer && console.timeEnd(i);
  }
  get version() {
    return R.version;
  }
  get name() {
    return this.#u;
  }
  get shortName() {
    return this.#m;
  }
  get options() {
    return this.#x;
  }
  get config() {
    return this.#f;
  }
  get core() {
    return this.#v;
  }
  get inCnt() {
    return this.#b;
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
    return this.#L;
  }
  get ready() {
    return this.#O;
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
    return T(this.#y.initialCnt) ? this.#y.initialCnt : Ha;
  }
  get range() {
    return this.#y;
  }
  get time() {
    return this.#$;
  }
  get TimeUtils() {
    return ph;
  }
  get theme() {
    return this.#_;
  }
  get settings() {
    return this.state.data.chart.settings;
  }
  get indicatorClasses() {
    return this.#R;
  }
  get TALib() {
    return this.#I;
  }
  get TALibReady() {
    return R.talibReady;
  }
  get TALibError() {
    return R.talibError;
  }
  get talibAwait() {
    return R.talibAwait;
  }
  get TALibPromise() {
    return R.talibPromise;
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
  set scrollPos(i) {
    this.setScrollPos(i);
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
    return this.#J;
  }
  get pricePrecision() {
    return this.#Z;
  }
  get volumePrecision() {
    return this.#Q;
  }
  set stream(i) {
    return this.setStream(i);
  }
  get stream() {
    return this.#B;
  }
  get worker() {
    return this.#X;
  }
  get isEmpty() {
    return this.#E.IsEmpty;
  }
  set candles(i) {
    S(i) && (this.#K = i);
  }
  get candles() {
    return this.#K;
  }
  get progress() {
    return this.#q;
  }
  get customOverlays() {
    return this.#L;
  }
  get optionalOverlays() {
    return ct({ ...this.#H }, this.#L);
  }
  start(i) {
    this.log(`${Ht} configuring...`), R.create(i);
    const s = R.create(i);
    this.logs = s?.logs ? s.logs : !1, this.infos = s?.infos ? s.infos : !1, this.warnings = s?.warnings ? s.warnings : !1, this.errors = s?.errors ? s.errors : !1, this.timer = s?.timer ? s.timer : !1, this.#f = s, this.#b = s.cnt || this.#b, this.#I = s.talib, (!("theme" in s) || !S(s.theme)) && (s.theme = Vi);
    const n = E(s?.id) ? s.id : null;
    this.setID(n), this.classList.add(this.id), this.log("processing state...");
    let r = ue(s?.state) || {};
    r.id = this.id, r.core = this;
    let o = s?.deepValidate || !1, l = s?.isCrypto || !1;
    this.#E = this.#M.create(r, o, l), delete s.state, this.log(`${this.name} id: ${this.id} : created with a ${this.state.status} state`);
    let h = "1s", c = Y;
    if (!S(s?.stream) && this.state.data.chart.data.length < 2 ? (this.warn(`${Ht} has no chart data or streaming provided.`), { tf: h, ms: c } = bi(s?.timeFrame)) : S(s?.stream) && this.state.data.chart.data.length < 2 ? ({ tf: h, ms: c } = bi(s?.timeFrame), this.#V = !0) : (h = this.state.data.chart.tf, c = this.state.data.chart.tfms), this.log(`tf: ${h} ms: ${c}`), this.#f.callbacks = this.#f.callbacks || {}, S(s))
      for (const f in s)
        f in this.props() && this.props()[f](s[f]);
    const p = S(s?.range) ? s.range : {};
    if (p.interval = c, p.core = this, this.getRange(null, null, p), this.#y.Length > 1) {
      const f = Ls(this.#$, this.#f?.range?.startTS), x = T(f) ? f + this.#y.initialCnt : this.allData.data.length, P = T(f) ? f : x - this.#y.initialCnt;
      this.#y.initialCnt = x - P, this.setRange(P, x), s.range?.center && this.jumpToIndex(P, !0, !0);
    }
    this.parentElement && this.insertAdjacentHTML("beforebegin", `<style title="${this.id}_style"></style>`), this.#G = new tp(this, { widgets: s?.widgets }), this.#W = new Qm(this, s), this.#F = new $o(this, s), this.#N = new Ho(this, s), this.setTheme(this.#j.id), this.log(`${this.#u} V${R.version} configured and running...`), this.#U = this.bufferPx * -1, this.eventsListen(), this.elStart(this.theme), this.elBody.start(this.theme), this.UtilsBar.start(), this.ToolsBar.start(), this.MainPane.start(), this.WidgetsG.start(), this.#q = this.WidgetsG.insert("Progress", {}), this.stream = this.#f.stream, this.#V && this.on(et, this.delayedSetRange, this), this.#O = !0, this.refresh();
  }
  destroy() {
    if (this?.destuction !== !0)
      return R.destroy(this), !0;
    this.log("...cleanup the mess"), this.removeEventListener("mousemove", this.onMouseMove), this.hub.expunge(this), this.UtilsBar.destroy(), this.ToolsBar.destroy(), this.MainPane.destroy(), this.WidgetsG.destroy(), this.#X.end(), this.#M = null;
  }
  eventsListen() {
    this.addEventListener("mousemove", this.onMouseMove.bind(this)), this.on(et, this.onStreamUpdate, this), this.on("state_mergeComplete", () => this.#q.stop());
  }
  onMouseMove(i) {
    this.#Y.x = i.clientX, this.#Y.y = i.clientY;
  }
  onStreamUpdate(i) {
    const s = this.range;
    if (s.inRange(i[0])) {
      const n = s.valueMax, r = s.valueMin;
      (i[2] > n || i[3] < r) && (this.setRange(s.indexStart, s.indexEnd), this.emit("chart_yAxisRedraw", this.range));
    }
  }
  props() {
    return {
      width: (i) => this.setWidth(i),
      height: (i) => this.setHeight(i),
      widthMin: (i) => this.setWidthMin(i),
      heightMin: (i) => this.setHeightMin(i),
      widthMax: (i) => this.setWidthMax(i),
      heightMax: (i) => this.setHeightMax(i),
      logs: (i) => this.logs = Q(i) ? i : !1,
      infos: (i) => this.infos = Q(i) ? i : !1,
      warnings: (i) => this.warnings = Q(i) ? i : !1,
      errors: (i) => this.errors = Q(i) ? i : !1,
      indicators: (i) => this.setIndicators(i),
      theme: (i) => {
        this.#j = this.addTheme(i);
      },
      stream: (i) => this.#B = S(i) ? i : {},
      pricePrecision: (i) => this.setPricePrecision(i),
      volumePrecision: (i) => this.setVolumePrecision(i)
    };
  }
  getInCnt() {
    return this.#b;
  }
  setID(i) {
    E(i) ? this.id = i : this.id = `${Pe(Ft)}_${this.#b}`;
  }
  setTitle(i) {
    this.Chart.setTitle(i);
  }
  setWatermark(i) {
    this.Chart.setWatermark(i);
  }
  setDimensions(i, s) {
    const n = super.setDimensions(i, s);
    this.emit("global_resize", n);
  }
  setUtilsH(i) {
    this.elUtils.style.height = `${i}px`;
  }
  setToolsW(i) {
    this.elTools.style.width = `${i}px`;
  }
  setPricePrecision(i) {
    (!T(i) || i < 0) && (i = Wa), this.#Z = i;
  }
  setVolumePrecision(i) {
    (!T(i) || i < 0) && (i = Fa), this.#Q = i;
  }
  addTheme(i) {
    const s = Ie.create(i, this);
    return this.#_ instanceof Ie || (this.#_ = s), s;
  }
  setTheme(i) {
    if (!this.theme.list.has(i))
      return !1;
    this.#_.setTheme(i, this);
    const s = this.#_, n = document.querySelector(`style[title=${this.id}_style]`), r = `var(--txc-border-color, ${s.chart.BorderColour}`;
    let o = `.${this.id} { `;
    o += `--txc-background: ${s.chart.Background}; `, this.style.background = `var(--txc-background, ${s.chart.Background})`, this.style.border = `${s.chart.BorderThickness || 0}px solid`, this.style.borderColor = r, o += `--txc-border-color:  ${s.chart.BorderColour}; `, s.chart.BorderThickness > 0 ? (this.elMain.rows.style.border = `1px solid ${r}`, this.elMain.rows.style.height = "calc(100% - 4px)") : (this.elMain.rows.style.border = "none", this.elMain.rows.style.height = "100%"), o += `--txc-time-scrollbar-color: ${s.chart.BorderColour}; `, o += `--txc-time-handle-color: ${s.xAxis.handle}; `, o += `--txc-time-slider-color: ${s.xAxis.slider}; `, o += `--txc-time-cursor-fore: ${s.xAxis.colourCursor}; `, o += `--txc-time-cursor-back: ${s.xAxis.colourCursorBG}; `, o += `--txc-time-icon-color: ${s.icon.colour}; `, o += `--txc-time-icon-hover-color: ${s.icon.hover}; `, this.elTime.overview.scrollBar.style.borderColor = r, this.elTime.overview.handle.style.backgroundColor = `var(--txc-time-handle-color, ${s.xAxis.handle})`, this.elTime.overview.style.setProperty("--txc-time-slider-color", s.xAxis.slider), this.elTime.overview.style.setProperty("--txc-time-icon-color", s.icon.colour), this.elTime.overview.style.setProperty("--txc-time-icon-hover-color", s.icon.hover);
    for (let [l, h] of Object.entries(this.Chart.legend.list))
      h.el.style.color = `var(--txc-legend-color, ${s.legend.colour})`, h.el.style.font = `var(--txc-legend-font, ${s.legend.font})`;
    for (let l of this.elUtils.icons)
      l.className == "icon-wrapper" && (l.children[0].style.fill = s.icon.colour);
    for (let l of this.elTools.icons)
      l.className == "icon-wrapper" && (l.children[0].style.fill = s.icon.colour);
    return o += " }", n.innerHTML = o, !0;
  }
  setScrollPos(i) {
    i = Math.round(i), T(i) && i <= 0 && i >= this.bufferPx * -1 ? this.#U = i : this.emit("Error", "setScrollPos: not a valid value");
  }
  setState(i) {
    if (!H.has(i))
      return this.warn(`${this.name} id: ${this.id} : Specified state does not exist`), !1;
    if (i === this.key)
      return !0;
    this.stream.stop(), this.MainPane.reset(), this.#E = H.get(i);
    const s = {
      interval: this.#E.data.chart.tfms,
      core: this
    };
    if (this.getRange(null, null, s), this.range.Length > 1) {
      const n = Ls(this.time, void 0), r = n ? n + this.range.initialCnt : this.#E.data.chart.data.length - 1, o = n || r - this.range.initialCnt;
      this.range.initialCnt = r - o, this.setRange(o, r);
    }
    this.MainPane.restart(), this.refresh();
  }
  createState(i, s, n) {
    return this.state.create(i, s, n);
  }
  deleteState(i) {
    return this.state.delete(i);
  }
  exportState(i = this.key, s = {}) {
    return this.state.export(i = this.key, s = {});
  }
  setStream(i) {
    if (this.stream instanceof xt)
      return this.error("ERROR: Invoke stopStream() before starting a new one."), !1;
    if (S(i))
      return this.allData.data.length == 0 && E(i.timeFrame) && ({ tf, ms } = bi(i?.timeFrame), this.range.interval = ms, this.range.intervalStr = tf, this.#$.timeFrameMS = ms, this.#$.timeFrame = tf), this.#B = new xt(this), this.#f.stream = this.#B.config, this.#B;
  }
  stopStream() {
    this.stream instanceof xt && this.stream.stop();
  }
  delayedSetRange() {
    for (; this.#V; ) {
      let i = this.range.Length * 0.5;
      this.setRange(i * -1, i), this.off(et, this.delayedSetRange, this), this.#V = !1;
    }
  }
  updateRange(i) {
    if (!A(i) || !T(i[4]) || i[4] == 0)
      return;
    let s, n;
    s = i[4], n = this.#U + s, n % this.candleW, n < this.bufferPx * -1 ? (n = 0, this.offsetRange(this.rangeScrollOffset * -1)) : n > 0 && (n = this.bufferPx * -1, this.offsetRange(this.rangeScrollOffset)), this.#U = n, this.emit("scrollUpdate", n);
  }
  offsetRange(i) {
    let s = this.range.indexStart - i, n = this.range.indexEnd - i;
    this.setRange(s, n);
  }
  getRange(i = 0, s = 0, n = {}) {
    this.#y = new Ps(i, s, n), this.#$.range = this.#y, this.#$.timeFrameMS = this.#y.interval, this.#$.timeFrame = this.#y.intervalStr;
  }
  setRange(i = 0, s = this.rangeLimit) {
    const n = this.config?.maxCandles ? this.config.maxCandles : this.Chart?.layerWidth ? this.Chart.layerWidth : this.Chart.width;
    this.#y.set(i, s, n), i < 0 && !this.#z ? this.emit("range_limitPast", { chart: this, start: i, end: s }) : s > this.range.dataLength && !this.#z && this.emit("range_limitFuture", { chart: this, start: i, end: s });
  }
  jumpToIndex(i, s = !0, n = !0) {
    s && (i = _(i, 0, this.range.dataLength));
    let r = this.range.Length, o = i + r;
    n && (i -= r / 2, o -= r / 2), this.setRange(i, o);
  }
  jumpToTS(i, s = !0, n = !0) {
    let r = this.Timeline.xAxis.t2Index(i);
    this.jumpToIndex(r, s, n);
  }
  jumpToStart(i = !1) {
    this.jumpToIndex(0, !0, i);
  }
  jumpToEnd(i = !0) {
    let s = this.range.dataLength - this.range.Length;
    i && (s += this.range.Length / 2), this.jumpToIndex(s, !0, !1);
  }
  mergeData(i, s = !1, n = !1) {
    this.#z = !0;
    let r = this.state.mergeData(i, s, n);
    return Q(r) && (this.#z = !1), r;
  }
  isOverlay(i) {
    return Dn(i) && U(i.prototype?.draw) && !this.isIndicator(i) && Object.getPrototypeOf(i.prototype).constructor.isOverlay;
  }
  hasOverlay(i) {
    const s = this.overlayEntries();
    return Object.keys(s).includes(i) ? s[i] : !1;
  }
  overlayKeys() {
    return Object.keys(this.overlayEntries());
  }
  overlayEntries() {
    const i = this.optionalOverlays;
    let s = {};
    for (let n in i)
      s = { ...s, ...i[n] };
    return s;
  }
  setCustomOverlays(i) {
    if (!S(i))
      return !1;
    const s = {};
    for (const [n, r] of Object.entries(i))
      S(r) && this.isOverlay(r?.class) && Object.keys(this.#L).includes(r?.location) ? (this.#L[r.location][n] = r, s[n] = !0, this.log(`Custom Overlay: ${n} - Registered`)) : (s[n] = !1, this.log(`Custom Overlay: ${n} - Rejected: Not a valid Overlay`));
    return s;
  }
  addOverlay(i, s) {
    let n;
    const r = this.findOverlayInGraph(i, s);
    if (!r)
      n = r;
    else {
      const { overlay: o, graph: l } = { ...r };
      n = l.addOverlay(i, o);
    }
    return n ? (this.log(`Overlay: ${i} - Added to ${s}`), !0) : (this.error(`Overlay: ${i} - Error attempting to add overlay to ${s}`), !1);
  }
  removeOverlay(i, s) {
    let n;
    const r = this.findOverlayInGraph(i, s);
    if (!r)
      n = r;
    else {
      const { overlay: o, graph: l } = { ...r };
      n = l.removeOverlay(i);
    }
    return n ? (this.log(`Overlay: ${i} - Removed from ${s}`), !0) : (this.error(`Overlay: ${i} - Error attempting to remove overlay from ${s}`), !1);
  }
  findGraph(i) {
    switch (i) {
      case "mainPane":
        return this.MainPane.graph;
      case "chartPane":
        return this.Chart.graph;
      case "chartScale":
        return this.Chart.scale.graph;
      case "timeLine":
        return this.Chart.time.graph;
      default:
        const s = Array.from(this.ChartPanes.keys());
        if (s.includes(i))
          return this.ChartPanes.get(i).graph;
        for (let n of s) {
          let r = this.ChartPanes.get(i).scale;
          if (r.id == i)
            return r.graph;
        }
        return !1;
    }
  }
  findOverlayInGraph(i, s) {
    if (!E(i) || !E(s))
      return !1;
    const n = this.hasOverlay(i);
    if (!n)
      return !1;
    const r = this.findGraph(s);
    return r ? { overlay: n, graph: r } : !1;
  }
  isIndicator(i) {
    return Dn(i) && U(i.prototype?.draw) && "primaryPane" in i.prototype && !!i?.isIndicator;
  }
  setIndicators(i, s = !1) {
    if (!S(i))
      return !1;
    s && (console.warn("Expunging all default indicators!"), this.#R = {});
    const n = {};
    for (const [r, o] of Object.entries(i))
      E(o?.id) && E(o?.name) && E(o?.event) && this.isIndicator(o?.ind) ? (this.#R[r] = o, n[r] = !0, this.log(`Custom Indicator: ${r} - Registered`)) : (n[r] = !1, this.warn(`Custom Indicator: ${r} - Rejected: Not a valid indicator`));
    return n;
  }
  addIndicator(i, s = i, n = {}) {
    return this.#N.addIndicator(i, s, n) || this.error(`Indicator: ${i} - Error failed to add indicator`), i;
  }
  getIndicator(i) {
    return this.#N.getIndicator(i);
  }
  removeIndicator(i) {
    return this.#N.removeIndicator(i) || this.error(`Indicator: ${i} - Error failed to remove indicator`), i;
  }
  indicatorSettings(i, s) {
    return this.#N.indicatorSettings(i, s);
  }
  hasStateIndicator(i, s = "searchAll") {
    if (!E(i) || !E(s))
      return !1;
    const n = function(r, o) {
      for (let l of o)
        return l?.id == r || l?.name == r;
    };
    if (s == "searchAll") {
      for (let r of this.allData)
        if (n(i, r))
          return !0;
      return !1;
    } else if (s in this.allData)
      return n(i, d);
  }
  async calcAllIndicators(i) {
    const s = [], n = (r) => new Promise((o) => setTimeout(() => {
      o(r());
    }, 0));
    for (const [r, o] of Object.entries(this.Indicators))
      for (const [l, h] of Object.entries(o))
        s.push(h.instance.calcIndicatorHistory.bind(h.instance, i));
    await Promise.all(s.map(async (r) => {
      n(r);
    })), this.refresh();
  }
  addTrade(i) {
    return this.#M.addTrade(i);
  }
  removeTrade(i) {
    return this.#M.removeTrade(i);
  }
  addEvent(i) {
    return this.#M.addEvent(i);
  }
  removeEvent(i) {
    return this.#M.removeEvent(i);
  }
  resize(i, s) {
    return !T(i) && !T(s) ? !1 : (this.setDimensions(i, s), !0);
  }
  refresh() {
    this.ready && this.#N.refresh();
  }
  toImageURL(i, s, n, r) {
    return Er(this, i, s, n, "url", r);
  }
  downloadImage(i = `${this.id}.png`, s, n, r) {
    Er(this, i, s, n, "download", r);
  }
  notImplemented() {
    if (this.implemented)
      this.implemented.open();
    else {
      let s = {
        content: `
        This feature is not implemented yet.
      `,
        styles: {
          content: { padding: "1em" }
        }
      };
      this.implemented = this.#G.insert("Dialogue", s), this.implemented.start();
    }
  }
}
window.customElements.get("tradex-chart") || (document.head.insertAdjacentHTML("beforeend", oc), document.head.insertAdjacentHTML("beforeend", ac), customElements.get("tradex-chart") || customElements.define("tradex-chart", R));
export {
  R as Chart,
  mi as DOM,
  Ut as EventHub,
  Le as Indicator,
  F as Overlay,
  Ps as Range,
  Xe as StateMachine,
  W as canvas,
  ue as copyDeep,
  ip as isPromise,
  ct as mergeDeep,
  np as talibAPI,
  Pe as uid
};
