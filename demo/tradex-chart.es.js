function Ha(o, e) {
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
const kt = "TradeX-Chart", Vt = "TX", $a = "tradeXutils", Ln = "tradeXmenus", Ba = "tradeXmenu", An = "tradeXdividers", On = "tradeXwindows", Ua = "tradeXwindow", Nn = "tradeXprogress", za = 500, Va = "stream_None", yi = "stream_Listening", Dn = "stream_Started", Wa = "stream_Stopped", Fa = "stream_Error", Ns = "stream_candleFirst", Ze = "stream_candleUpdate", Ds = "stream_candleNew", Ga = 250, qa = 8, Ya = 2, Xa = 2, cs = 18, Gt = 100, $t = /^(\d*\.?\d+)\s?(px|em|ex|%|in|cn|mm|pt|pc+)$/igm;
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
function ip(o) {
  return !!o && (w(o) || N(o)) && N(o.then);
}
function In(o) {
  return !(o && o.constructor === Function) || o.prototype === void 0 ? !1 : Function.prototype !== Object.getPrototypeOf(o) ? !0 : Object.getOwnPropertyNames(o.prototype).length > 1;
}
const Er = ["id", "class", "style", "alt", "width", "height", "title"], Pr = [...Er, "name", "type", "value", "default", "placeholder", "max", "min", "maxlenght", "src", "checked", "disabled", "pattern", "readonly", "required", "size", "step", "multiple", "autofocus", "list", "autocomplete"], Mr = ["button", "color", "date", "datetime-local", "email", "file", "hidden", "image", "month", "number", "password", "radio", "range", "reset", "search", "submit", "tel", "text", "time", "url", "week"];
function ja(o, e = document) {
  return e.getElementById(o);
}
function Ka(o, e = document) {
  return e.getElementsByClassName(o);
}
function Za(o, e = document) {
  return e.getElementsByName(o);
}
function Qa(o, e = document) {
  return e.getElementsByTagName(o);
}
function Lr(o, e = document) {
  return e.querySelector(o);
}
function Ar(o, e = document) {
  return e.querySelectorAll(o);
}
function Ja(o) {
  return typeof Node == "object" ? o instanceof Node : o && typeof o == "object" && typeof o.nodeType == "number" && typeof o.nodeName == "string";
}
function Y(o) {
  return typeof HTMLElement == "object" ? o instanceof HTMLElement : o && typeof o == "object" && o !== null && o.nodeType === 1 && typeof o.nodeName == "string";
}
function ht(o) {
  return Y(o) ? !!o && !!(o.offsetWidth || o.offsetHeight || o.getClientRects().length) : !1;
}
function Is(o) {
  if (!Y(o))
    return !1;
  const e = o.getBoundingClientRect();
  return e.top >= 0 && e.left >= 0 && e.bottom <= (window.innerHeight || document.documentElement.clientHeight) && e.right <= (window.innerWidth || document.documentElement.clientWidth);
}
function el(o) {
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
function Rs(o, e) {
  if (ks(o)) {
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
function ks(o) {
  return C(o) ? /<\s*svg[^>]*>(.*?)<\s*\/\s*svg>/.test(o) : !1;
}
function tl(o) {
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
function ne(o) {
  if (!Y(o))
    return !1;
  let e = 0, i = 0, s = o;
  for (; s && s.tagName.toLowerCase() != "body" && !isNaN(s.offsetLeft) && !isNaN(s.offsetTop); )
    e += s.offsetLeft - s.scrollLeft, i += s.offsetTop - s.scrollTop, s = s.offsetParent;
  const n = o.getBoundingClientRect();
  let r = n.right - n.left, a = n.bottom - n.top, l = ht(o), h = Is(o);
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
function il(o, e) {
  if (!Y(o) || !Y(o))
    return !1;
  const i = ne(o), s = ne(e);
  return {
    x: i.top - s.top,
    y: i.left - s.left,
    el1Location: i,
    el2Location: s
  };
}
function Or(o) {
  if (!C(o))
    return !1;
  const e = document.createElement("template");
  return o = o.trim(), e.innerHTML = o, e.content.firstChild;
}
function sl(o) {
  if (!C(o))
    return !1;
  const e = document.createElement("template");
  return e.innerHTML = o, e.content.childNodes;
}
function ft(o, e, i) {
  if (!ks(o) || !x(i?.w) || !x(i?.h))
    return !1;
  let s = i.w, n = i.h, r = document.createElement("canvas");
  r.width = s, r.height = n;
  let a = Or(o);
  a.style.fill = e, a.setAttribute("width", s), a.setAttribute("height", n), a.xmlns = "http://www.w3.org/2000/svg";
  let l = new XMLSerializer().serializeToString(a), f = "data:image/svg+xml;base64," + btoa(l), v = new Image();
  return v.setAttribute("width", s), v.setAttribute("height", n), v.onload = () => {
    r.getContext("2d").drawImage(v, 0, 0, s, n);
  }, v.src = f, v;
}
function nl(o) {
  if (!Y(o))
    return !1;
  const e = (s) => {
    !o.contains(s.target) && ht(o) && (o.style.display = "none", i());
  }, i = () => {
    document.removeEventListener("click", e);
  };
  document.addEventListener("click", e);
}
function rl(o, e) {
  if (!Y(o))
    return !1;
  const i = (n) => {
    !o.contains(n.target) && ht(o) && (e(), s());
  }, s = () => {
    document.removeEventListener("click", i);
  };
  document.addEventListener("click", i);
}
function Nr(o, e) {
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
function ol(o, e, i, s) {
  let n = _s(o, e, i, s);
  if (n)
    n.i >= 0 ? n.rules[n.i].style[n.property] = n.value : Ir(n.styleSheet, n.selector, n.rules, n.index);
  else
    return;
}
function al(o, e, i) {
  let s = _s(o, e, i, "");
  (s.styleSheet.deleteRule || s.styleSheet.removeRule)(s.i);
}
function _s(o, e, i, s) {
  if (!o || !w(o))
    return null;
  if (o.constructor.name == "HTMLStyleElement")
    o = o.sheet;
  else if (o.constructor.name != "CSSStyleSheet")
    return null;
  let n = Dr(e, i, s);
  e = n[0], i = n[1], s = n[2];
  const r = o.cssRules || o.rules;
  for (var a = r.length - 1; a > 0 && r[a].selectorText !== e; --a)
    ;
  return { styleSheet: o, rules: r, selector: e, property: i, value: s, i: a };
}
function Dr(o, e, i) {
  return [
    o = o.toLowerCase().replace(/\s+/g, " "),
    e = e.toLowerCase(),
    i = i.toLowerCase()
  ];
}
function Ir(o, e, i, s) {
  o.insertRule ? o.insertRule(e + "{" + i + "}", s) : o.addRule(e, i, s);
}
function Hs(o, e) {
  return !Y(o) || !C(e) ? null : o.classList.contains(e) ? o : Hs(o.parentElement, e);
}
function Rr(o, e) {
  let i = C(e?.entry) ? e?.entry : "", s = C(e?.label) ? e?.label : i || "", n = `<label for="${i}">${s}</label><input id="${i}" class="subject" `;
  for (let r in e)
    (Pr.includes(r) || /^(data-[^\t\n\f \/>"'=]+)/g.test(r)) && (n += `${r}="${e[r]}" `);
  return n += `>
`;
}
const sp = {
  addCSSRule: Ir,
  addStyleRule: ol,
  deleteStyleRule: al,
  elementDimPos: ne,
  elementsDistance: il,
  findByClass: Ka,
  findByID: ja,
  findByName: Za,
  findBySelector: Lr,
  findBySelectorAll: Ar,
  findStyleRule: _s,
  findTargetParentWithClass: Hs,
  fndByTag: Qa,
  getStyle: Nr,
  hideOnClickOutside: nl,
  htmlAttr: Er,
  htmlInput: Rr,
  htmlToElement: Or,
  htmlToElements: sl,
  inputAttr: Pr,
  inputTypes: Mr,
  isElement: Y,
  isImage: Rs,
  isInViewport: Is,
  isNode: Ja,
  isSVG: ks,
  isVisible: ht,
  isVisibleToUser: el,
  onClickOutside: rl,
  styleRuleSanitize: Dr,
  svgToImage: ft,
  waitForElm: tl
}, ll = typeof window < "u" && typeof window.document < "u";
typeof process < "u" && process.versions != null && process.versions.node != null;
typeof window < "u" && window.name === "nodejs" || navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom");
const hl = ((o) => "onorientationchange" in o || o.matchMedia("(any-pointer:coarse)").matches || !!navigator.maxTouchPoints || !!navigator.msMaxTouchPoints || "ontouchstart" in o || o.DocumentTouch && document instanceof o.DocumentTouch)(typeof window < "u" ? window : {}), cl = {
  idle: 0,
  dragStart: 1,
  dragging: 2
};
class rt {
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
    return new rt(this.x, this.y);
  }
}
function ul(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
}
var kr = { exports: {} };
/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
(function(o) {
  (function(e, i, s, n) {
    var r = ["", "webkit", "Moz", "MS", "ms", "o"], a = i.createElement("div"), l = "function", h = Math.round, m = Math.abs, f = Date.now;
    function v(c, u, p) {
      return setTimeout(I(c, p), u);
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
    var D;
    typeof Object.assign != "function" ? D = function(u) {
      if (u === n || u === null)
        throw new TypeError("Cannot convert undefined or null to object");
      for (var p = Object(u), g = 1; g < arguments.length; g++) {
        var b = arguments[g];
        if (b !== n && b !== null)
          for (var S in b)
            b.hasOwnProperty(S) && (p[S] = b[S]);
      }
      return p;
    } : D = Object.assign;
    var re = M(function(u, p, g) {
      for (var b = Object.keys(p), S = 0; S < b.length; )
        (!g || g && u[b[S]] === n) && (u[b[S]] = p[b[S]]), S++;
      return u;
    }, "extend", "Use `assign`."), me = M(function(u, p) {
      return re(u, p, !0);
    }, "merge", "Use `assign`.");
    function _(c, u, p) {
      var g = u.prototype, b;
      b = c.prototype = Object.create(g), b.constructor = c, b._super = g, p && D(b, p);
    }
    function I(c, u) {
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
    function qe(c, u, p) {
      if (c.indexOf && !p)
        return c.indexOf(u);
      for (var g = 0; g < c.length; ) {
        if (p && c[g][p] == u || !p && c[g] === u)
          return g;
        g++;
      }
      return -1;
    }
    function Jt(c) {
      return Array.prototype.slice.call(c, 0);
    }
    function on(c, u, p) {
      for (var g = [], b = [], S = 0; S < c.length; ) {
        var A = u ? c[S][u] : c[S];
        qe(b, A) < 0 && g.push(c[S]), b[S] = A, S++;
      }
      return p && (u ? g = g.sort(function(j, ie) {
        return j[u] > ie[u];
      }) : g = g.sort()), g;
    }
    function ei(c, u) {
      for (var p, g, b = u[0].toUpperCase() + u.slice(1), S = 0; S < r.length; ) {
        if (p = r[S], g = p ? p + b : u, g in c)
          return g;
        S++;
      }
      return n;
    }
    var ia = 1;
    function sa() {
      return ia++;
    }
    function an(c) {
      var u = c.ownerDocument || c;
      return u.defaultView || u.parentWindow || e;
    }
    var na = /mobile|tablet|ip(ad|hone|od)|android/i, ln = "ontouchstart" in e, ra = ei(e, "PointerEvent") !== n, oa = ln && na.test(navigator.userAgent), Mt = "touch", aa = "pen", Vi = "mouse", la = "kinect", ha = 25, te = 1, Je = 2, z = 4, le = 8, ti = 1, Lt = 2, At = 4, Ot = 8, Nt = 16, Re = Lt | At, et = Ot | Nt, hn = Re | et, cn = ["x", "y"], ii = ["clientX", "clientY"];
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
        this.evEl && X(this.element, this.evEl, this.domHandler), this.evTarget && X(this.target, this.evTarget, this.domHandler), this.evWin && X(an(this.element), this.evWin, this.domHandler);
      },
      destroy: function() {
        this.evEl && ae(this.element, this.evEl, this.domHandler), this.evTarget && ae(this.target, this.evTarget, this.domHandler), this.evWin && ae(an(this.element), this.evWin, this.domHandler);
      }
    };
    function ca(c) {
      var u, p = c.options.inputClass;
      return p ? u = p : ra ? u = Fi : oa ? u = ri : ln ? u = Gi : u = ni, new u(c, ua);
    }
    function ua(c, u, p) {
      var g = p.pointers.length, b = p.changedPointers.length, S = u & te && g - b === 0, A = u & (z | le) && g - b === 0;
      p.isFirst = !!S, p.isFinal = !!A, S && (c.session = {}), p.eventType = u, da(c, p), c.emit("hammer.input", p), c.recognize(p), c.session.prevInput = p;
    }
    function da(c, u) {
      var p = c.session, g = u.pointers, b = g.length;
      p.firstInput || (p.firstInput = un(u)), b > 1 && !p.firstMultiple ? p.firstMultiple = un(u) : b === 1 && (p.firstMultiple = !1);
      var S = p.firstInput, A = p.firstMultiple, q = A ? A.center : S.center, j = u.center = dn(g);
      u.timeStamp = f(), u.deltaTime = u.timeStamp - S.timeStamp, u.angle = Wi(q, j), u.distance = si(q, j), ma(p, u), u.offsetDirection = pn(u.deltaX, u.deltaY);
      var ie = mn(u.deltaTime, u.deltaX, u.deltaY);
      u.overallVelocityX = ie.x, u.overallVelocityY = ie.y, u.overallVelocity = m(ie.x) > m(ie.y) ? ie.x : ie.y, u.scale = A ? ga(A.pointers, g) : 1, u.rotation = A ? fa(A.pointers, g) : 0, u.maxPointers = p.prevInput ? u.pointers.length > p.prevInput.maxPointers ? u.pointers.length : p.prevInput.maxPointers : u.pointers.length, pa(p, u);
      var _e = c.element;
      pe(u.srcEvent.target, _e) && (_e = u.srcEvent.target), u.target = _e;
    }
    function ma(c, u) {
      var p = u.center, g = c.offsetDelta || {}, b = c.prevDelta || {}, S = c.prevInput || {};
      (u.eventType === te || S.eventType === z) && (b = c.prevDelta = {
        x: S.deltaX || 0,
        y: S.deltaY || 0
      }, g = c.offsetDelta = {
        x: p.x,
        y: p.y
      }), u.deltaX = b.x + (p.x - g.x), u.deltaY = b.y + (p.y - g.y);
    }
    function pa(c, u) {
      var p = c.lastInterval || u, g = u.timeStamp - p.timeStamp, b, S, A, q;
      if (u.eventType != le && (g > ha || p.velocity === n)) {
        var j = u.deltaX - p.deltaX, ie = u.deltaY - p.deltaY, _e = mn(g, j, ie);
        S = _e.x, A = _e.y, b = m(_e.x) > m(_e.y) ? _e.x : _e.y, q = pn(j, ie), c.lastInterval = u;
      } else
        b = p.velocity, S = p.velocityX, A = p.velocityY, q = p.direction;
      u.velocity = b, u.velocityX = S, u.velocityY = A, u.direction = q;
    }
    function un(c) {
      for (var u = [], p = 0; p < c.pointers.length; )
        u[p] = {
          clientX: h(c.pointers[p].clientX),
          clientY: h(c.pointers[p].clientY)
        }, p++;
      return {
        timeStamp: f(),
        pointers: u,
        center: dn(u),
        deltaX: c.deltaX,
        deltaY: c.deltaY
      };
    }
    function dn(c) {
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
    function mn(c, u, p) {
      return {
        x: u / c || 0,
        y: p / c || 0
      };
    }
    function pn(c, u) {
      return c === u ? ti : m(c) >= m(u) ? c < 0 ? Lt : At : u < 0 ? Ot : Nt;
    }
    function si(c, u, p) {
      p || (p = cn);
      var g = u[p[0]] - c[p[0]], b = u[p[1]] - c[p[1]];
      return Math.sqrt(g * g + b * b);
    }
    function Wi(c, u, p) {
      p || (p = cn);
      var g = u[p[0]] - c[p[0]], b = u[p[1]] - c[p[1]];
      return Math.atan2(b, g) * 180 / Math.PI;
    }
    function fa(c, u) {
      return Wi(u[1], u[0], ii) + Wi(c[1], c[0], ii);
    }
    function ga(c, u) {
      return si(u[0], u[1], ii) / si(c[0], c[1], ii);
    }
    var ya = {
      mousedown: te,
      mousemove: Je,
      mouseup: z
    }, va = "mousedown", wa = "mousemove mouseup";
    function ni() {
      this.evEl = va, this.evWin = wa, this.pressed = !1, ge.apply(this, arguments);
    }
    _(ni, ge, {
      handler: function(u) {
        var p = ya[u.type];
        p & te && u.button === 0 && (this.pressed = !0), p & Je && u.which !== 1 && (p = z), this.pressed && (p & z && (this.pressed = !1), this.callback(this.manager, p, {
          pointers: [u],
          changedPointers: [u],
          pointerType: Vi,
          srcEvent: u
        }));
      }
    });
    var ba = {
      pointerdown: te,
      pointermove: Je,
      pointerup: z,
      pointercancel: le,
      pointerout: le
    }, xa = {
      2: Mt,
      3: aa,
      4: Vi,
      5: la
    }, fn = "pointerdown", gn = "pointermove pointerup pointercancel";
    e.MSPointerEvent && !e.PointerEvent && (fn = "MSPointerDown", gn = "MSPointerMove MSPointerUp MSPointerCancel");
    function Fi() {
      this.evEl = fn, this.evWin = gn, ge.apply(this, arguments), this.store = this.manager.session.pointerEvents = [];
    }
    _(Fi, ge, {
      handler: function(u) {
        var p = this.store, g = !1, b = u.type.toLowerCase().replace("ms", ""), S = ba[b], A = xa[u.pointerType] || u.pointerType, q = A == Mt, j = qe(p, u.pointerId, "pointerId");
        S & te && (u.button === 0 || q) ? j < 0 && (p.push(u), j = p.length - 1) : S & (z | le) && (g = !0), !(j < 0) && (p[j] = u, this.callback(this.manager, S, {
          pointers: p,
          changedPointers: [u],
          pointerType: A,
          srcEvent: u
        }), g && p.splice(j, 1));
      }
    });
    var Ca = {
      touchstart: te,
      touchmove: Je,
      touchend: z,
      touchcancel: le
    }, Ta = "touchstart", Sa = "touchstart touchmove touchend touchcancel";
    function yn() {
      this.evTarget = Ta, this.evWin = Sa, this.started = !1, ge.apply(this, arguments);
    }
    _(yn, ge, {
      handler: function(u) {
        var p = Ca[u.type];
        if (p === te && (this.started = !0), !!this.started) {
          var g = Ea.call(this, u, p);
          p & (z | le) && g[0].length - g[1].length === 0 && (this.started = !1), this.callback(this.manager, p, {
            pointers: g[0],
            changedPointers: g[1],
            pointerType: Mt,
            srcEvent: u
          });
        }
      }
    });
    function Ea(c, u) {
      var p = Jt(c.touches), g = Jt(c.changedTouches);
      return u & (z | le) && (p = on(p.concat(g), "identifier", !0)), [p, g];
    }
    var Pa = {
      touchstart: te,
      touchmove: Je,
      touchend: z,
      touchcancel: le
    }, Ma = "touchstart touchmove touchend touchcancel";
    function ri() {
      this.evTarget = Ma, this.targetIds = {}, ge.apply(this, arguments);
    }
    _(ri, ge, {
      handler: function(u) {
        var p = Pa[u.type], g = La.call(this, u, p);
        g && this.callback(this.manager, p, {
          pointers: g[0],
          changedPointers: g[1],
          pointerType: Mt,
          srcEvent: u
        });
      }
    });
    function La(c, u) {
      var p = Jt(c.touches), g = this.targetIds;
      if (u & (te | Je) && p.length === 1)
        return g[p[0].identifier] = !0, [p, p];
      var b, S, A = Jt(c.changedTouches), q = [], j = this.target;
      if (S = p.filter(function(ie) {
        return pe(ie.target, j);
      }), u === te)
        for (b = 0; b < S.length; )
          g[S[b].identifier] = !0, b++;
      for (b = 0; b < A.length; )
        g[A[b].identifier] && q.push(A[b]), u & (z | le) && delete g[A[b].identifier], b++;
      if (q.length)
        return [
          on(S.concat(q), "identifier", !0),
          q
        ];
    }
    var Aa = 2500, vn = 25;
    function Gi() {
      ge.apply(this, arguments);
      var c = I(this.handler, this);
      this.touch = new ri(this.manager, c), this.mouse = new ni(this.manager, c), this.primaryTouch = null, this.lastTouches = [];
    }
    _(Gi, ge, {
      handler: function(u, p, g) {
        var b = g.pointerType == Mt, S = g.pointerType == Vi;
        if (!(S && g.sourceCapabilities && g.sourceCapabilities.firesTouchEvents)) {
          if (b)
            Oa.call(this, p, g);
          else if (S && Na.call(this, g))
            return;
          this.callback(u, p, g);
        }
      },
      destroy: function() {
        this.touch.destroy(), this.mouse.destroy();
      }
    });
    function Oa(c, u) {
      c & te ? (this.primaryTouch = u.changedPointers[0].identifier, wn.call(this, u)) : c & (z | le) && wn.call(this, u);
    }
    function wn(c) {
      var u = c.changedPointers[0];
      if (u.identifier === this.primaryTouch) {
        var p = { x: u.clientX, y: u.clientY };
        this.lastTouches.push(p);
        var g = this.lastTouches, b = function() {
          var S = g.indexOf(p);
          S > -1 && g.splice(S, 1);
        };
        setTimeout(b, Aa);
      }
    }
    function Na(c) {
      for (var u = c.srcEvent.clientX, p = c.srcEvent.clientY, g = 0; g < this.lastTouches.length; g++) {
        var b = this.lastTouches[g], S = Math.abs(u - b.x), A = Math.abs(p - b.y);
        if (S <= vn && A <= vn)
          return !0;
      }
      return !1;
    }
    var bn = ei(a.style, "touchAction"), xn = bn !== n, Cn = "compute", Tn = "auto", qi = "manipulation", tt = "none", Dt = "pan-x", It = "pan-y", oi = Ia();
    function Yi(c, u) {
      this.manager = c, this.set(u);
    }
    Yi.prototype = {
      set: function(c) {
        c == Cn && (c = this.compute()), xn && this.manager.element.style && oi[c] && (this.manager.element.style[bn] = c), this.actions = c.toLowerCase().trim();
      },
      update: function() {
        this.set(this.manager.options.touchAction);
      },
      compute: function() {
        var c = [];
        return E(this.manager.recognizers, function(u) {
          L(u.options.enable, [u]) && (c = c.concat(u.getTouchAction()));
        }), Da(c.join(" "));
      },
      preventDefaults: function(c) {
        var u = c.srcEvent, p = c.offsetDirection;
        if (this.manager.session.prevented) {
          u.preventDefault();
          return;
        }
        var g = this.actions, b = fe(g, tt) && !oi[tt], S = fe(g, It) && !oi[It], A = fe(g, Dt) && !oi[Dt];
        if (b) {
          var q = c.pointers.length === 1, j = c.distance < 2, ie = c.deltaTime < 250;
          if (q && j && ie)
            return;
        }
        if (!(A && S) && (b || S && p & Re || A && p & et))
          return this.preventSrc(u);
      },
      preventSrc: function(c) {
        this.manager.session.prevented = !0, c.preventDefault();
      }
    };
    function Da(c) {
      if (fe(c, tt))
        return tt;
      var u = fe(c, Dt), p = fe(c, It);
      return u && p ? tt : u || p ? u ? Dt : It : fe(c, qi) ? qi : Tn;
    }
    function Ia() {
      if (!xn)
        return !1;
      var c = {}, u = e.CSS && e.CSS.supports;
      return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function(p) {
        c[p] = u ? e.CSS.supports("touch-action", p) : !0;
      }), c;
    }
    var ai = 1, ye = 2, dt = 4, Ye = 8, Be = Ye, Rt = 16, ke = 32;
    function Ue(c) {
      this.options = D({}, this.defaults, c || {}), this.id = sa(), this.manager = null, this.options.enable = oe(this.options.enable, !0), this.state = ai, this.simultaneous = {}, this.requireFail = [];
    }
    Ue.prototype = {
      defaults: {},
      set: function(c) {
        return D(this.options, c), this.manager && this.manager.touchAction.update(), this;
      },
      recognizeWith: function(c) {
        if (T(c, "recognizeWith", this))
          return this;
        var u = this.simultaneous;
        return c = li(c, this), u[c.id] || (u[c.id] = c, c.recognizeWith(this)), this;
      },
      dropRecognizeWith: function(c) {
        return T(c, "dropRecognizeWith", this) ? this : (c = li(c, this), delete this.simultaneous[c.id], this);
      },
      requireFailure: function(c) {
        if (T(c, "requireFailure", this))
          return this;
        var u = this.requireFail;
        return c = li(c, this), qe(u, c) === -1 && (u.push(c), c.requireFailure(this)), this;
      },
      dropRequireFailure: function(c) {
        if (T(c, "dropRequireFailure", this))
          return this;
        c = li(c, this);
        var u = qe(this.requireFail, c);
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
        p < Ye && g(u.options.event + Sn(p)), g(u.options.event), c.additionalEvent && g(c.additionalEvent), p >= Ye && g(u.options.event + Sn(p));
      },
      tryEmit: function(c) {
        if (this.canEmit())
          return this.emit(c);
        this.state = ke;
      },
      canEmit: function() {
        for (var c = 0; c < this.requireFail.length; ) {
          if (!(this.requireFail[c].state & (ke | ai)))
            return !1;
          c++;
        }
        return !0;
      },
      recognize: function(c) {
        var u = D({}, c);
        if (!L(this.options.enable, [this, u])) {
          this.reset(), this.state = ke;
          return;
        }
        this.state & (Be | Rt | ke) && (this.state = ai), this.state = this.process(u), this.state & (ye | dt | Ye | Rt) && this.tryEmit(u);
      },
      process: function(c) {
      },
      getTouchAction: function() {
      },
      reset: function() {
      }
    };
    function Sn(c) {
      return c & Rt ? "cancel" : c & Ye ? "end" : c & dt ? "move" : c & ye ? "start" : "";
    }
    function En(c) {
      return c == Nt ? "down" : c == Ot ? "up" : c == Lt ? "left" : c == At ? "right" : "";
    }
    function li(c, u) {
      var p = u.manager;
      return p ? p.get(c) : c;
    }
    function Pe() {
      Ue.apply(this, arguments);
    }
    _(Pe, Ue, {
      defaults: {
        pointers: 1
      },
      attrTest: function(c) {
        var u = this.options.pointers;
        return u === 0 || c.pointers.length === u;
      },
      process: function(c) {
        var u = this.state, p = c.eventType, g = u & (ye | dt), b = this.attrTest(c);
        return g && (p & le || !b) ? u | Rt : g || b ? p & z ? u | Ye : u & ye ? u | dt : ye : ke;
      }
    });
    function hi() {
      Pe.apply(this, arguments), this.pX = null, this.pY = null;
    }
    _(hi, Pe, {
      defaults: {
        event: "pan",
        threshold: 10,
        pointers: 1,
        direction: hn
      },
      getTouchAction: function() {
        var c = this.options.direction, u = [];
        return c & Re && u.push(It), c & et && u.push(Dt), u;
      },
      directionTest: function(c) {
        var u = this.options, p = !0, g = c.distance, b = c.direction, S = c.deltaX, A = c.deltaY;
        return b & u.direction || (u.direction & Re ? (b = S === 0 ? ti : S < 0 ? Lt : At, p = S != this.pX, g = Math.abs(c.deltaX)) : (b = A === 0 ? ti : A < 0 ? Ot : Nt, p = A != this.pY, g = Math.abs(c.deltaY))), c.direction = b, p && g > u.threshold && b & u.direction;
      },
      attrTest: function(c) {
        return Pe.prototype.attrTest.call(this, c) && (this.state & ye || !(this.state & ye) && this.directionTest(c));
      },
      emit: function(c) {
        this.pX = c.deltaX, this.pY = c.deltaY;
        var u = En(c.direction);
        u && (c.additionalEvent = this.options.event + u), this._super.emit.call(this, c);
      }
    });
    function Xi() {
      Pe.apply(this, arguments);
    }
    _(Xi, Pe, {
      defaults: {
        event: "pinch",
        threshold: 0,
        pointers: 2
      },
      getTouchAction: function() {
        return [tt];
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
    function ji() {
      Ue.apply(this, arguments), this._timer = null, this._input = null;
    }
    _(ji, Ue, {
      defaults: {
        event: "press",
        pointers: 1,
        time: 251,
        threshold: 9
      },
      getTouchAction: function() {
        return [Tn];
      },
      process: function(c) {
        var u = this.options, p = c.pointers.length === u.pointers, g = c.distance < u.threshold, b = c.deltaTime > u.time;
        if (this._input = c, !g || !p || c.eventType & (z | le) && !b)
          this.reset();
        else if (c.eventType & te)
          this.reset(), this._timer = v(function() {
            this.state = Be, this.tryEmit();
          }, u.time, this);
        else if (c.eventType & z)
          return Be;
        return ke;
      },
      reset: function() {
        clearTimeout(this._timer);
      },
      emit: function(c) {
        this.state === Be && (c && c.eventType & z ? this.manager.emit(this.options.event + "up", c) : (this._input.timeStamp = f(), this.manager.emit(this.options.event, this._input)));
      }
    });
    function Ki() {
      Pe.apply(this, arguments);
    }
    _(Ki, Pe, {
      defaults: {
        event: "rotate",
        threshold: 0,
        pointers: 2
      },
      getTouchAction: function() {
        return [tt];
      },
      attrTest: function(c) {
        return this._super.attrTest.call(this, c) && (Math.abs(c.rotation) > this.options.threshold || this.state & ye);
      }
    });
    function Zi() {
      Pe.apply(this, arguments);
    }
    _(Zi, Pe, {
      defaults: {
        event: "swipe",
        threshold: 10,
        velocity: 0.3,
        direction: Re | et,
        pointers: 1
      },
      getTouchAction: function() {
        return hi.prototype.getTouchAction.call(this);
      },
      attrTest: function(c) {
        var u = this.options.direction, p;
        return u & (Re | et) ? p = c.overallVelocity : u & Re ? p = c.overallVelocityX : u & et && (p = c.overallVelocityY), this._super.attrTest.call(this, c) && u & c.offsetDirection && c.distance > this.options.threshold && c.maxPointers == this.options.pointers && m(p) > this.options.velocity && c.eventType & z;
      },
      emit: function(c) {
        var u = En(c.offsetDirection);
        u && this.manager.emit(this.options.event + u, c), this.manager.emit(this.options.event, c);
      }
    });
    function ci() {
      Ue.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0;
    }
    _(ci, Ue, {
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
        return [qi];
      },
      process: function(c) {
        var u = this.options, p = c.pointers.length === u.pointers, g = c.distance < u.threshold, b = c.deltaTime < u.time;
        if (this.reset(), c.eventType & te && this.count === 0)
          return this.failTimeout();
        if (g && b && p) {
          if (c.eventType != z)
            return this.failTimeout();
          var S = this.pTime ? c.timeStamp - this.pTime < u.interval : !0, A = !this.pCenter || si(this.pCenter, c.center) < u.posThreshold;
          this.pTime = c.timeStamp, this.pCenter = c.center, !A || !S ? this.count = 1 : this.count += 1, this._input = c;
          var q = this.count % u.taps;
          if (q === 0)
            return this.hasRequireFailures() ? (this._timer = v(function() {
              this.state = Be, this.tryEmit();
            }, u.interval, this), ye) : Be;
        }
        return ke;
      },
      failTimeout: function() {
        return this._timer = v(function() {
          this.state = ke;
        }, this.options.interval, this), ke;
      },
      reset: function() {
        clearTimeout(this._timer);
      },
      emit: function() {
        this.state == Be && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input));
      }
    });
    function ze(c, u) {
      return u = u || {}, u.recognizers = oe(u.recognizers, ze.defaults.preset), new Qi(c, u);
    }
    ze.VERSION = "2.0.7", ze.defaults = {
      domEvents: !1,
      touchAction: Cn,
      enable: !0,
      inputTarget: null,
      inputClass: null,
      preset: [
        [Ki, { enable: !1 }],
        [Xi, { enable: !1 }, ["rotate"]],
        [Zi, { direction: Re }],
        [hi, { direction: Re }, ["swipe"]],
        [ci],
        [ci, { event: "doubletap", taps: 2 }, ["tap"]],
        [ji]
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
    var Ra = 1, Pn = 2;
    function Qi(c, u) {
      this.options = D({}, ze.defaults, u || {}), this.options.inputTarget = this.options.inputTarget || c, this.handlers = {}, this.session = {}, this.recognizers = [], this.oldCssProps = {}, this.element = c, this.input = ca(this), this.touchAction = new Yi(this, this.options.touchAction), Mn(this, !0), E(this.options.recognizers, function(p) {
        var g = this.add(new p[0](p[1]));
        p[2] && g.recognizeWith(p[2]), p[3] && g.requireFailure(p[3]);
      }, this);
    }
    Qi.prototype = {
      set: function(c) {
        return D(this.options, c), c.touchAction && this.touchAction.update(), c.inputTarget && (this.input.destroy(), this.input.target = c.inputTarget, this.input.init()), this;
      },
      stop: function(c) {
        this.session.stopped = c ? Pn : Ra;
      },
      recognize: function(c) {
        var u = this.session;
        if (!u.stopped) {
          this.touchAction.preventDefaults(c);
          var p, g = this.recognizers, b = u.curRecognizer;
          (!b || b && b.state & Be) && (b = u.curRecognizer = null);
          for (var S = 0; S < g.length; )
            p = g[S], u.stopped !== Pn && (!b || p == b || p.canRecognizeWith(b)) ? p.recognize(c) : p.reset(), !b && p.state & (ye | dt | Ye) && (b = u.curRecognizer = p), S++;
        }
      },
      get: function(c) {
        if (c instanceof Ue)
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
          var u = this.recognizers, p = qe(u, c);
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
            u ? p[g] && p[g].splice(qe(p[g], u), 1) : delete p[g];
          }), this;
        }
      },
      emit: function(c, u) {
        this.options.domEvents && ka(c, u);
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
        this.element && Mn(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null;
      }
    };
    function Mn(c, u) {
      var p = c.element;
      if (p.style) {
        var g;
        E(c.options.cssProps, function(b, S) {
          g = ei(p.style, S), u ? (c.oldCssProps[g] = p.style[g], p.style[g] = b) : p.style[g] = c.oldCssProps[g] || "";
        }), u || (c.oldCssProps = {});
      }
    }
    function ka(c, u) {
      var p = i.createEvent("Event");
      p.initEvent(c, !0, !0), p.gesture = u, u.target.dispatchEvent(p);
    }
    D(ze, {
      INPUT_START: te,
      INPUT_MOVE: Je,
      INPUT_END: z,
      INPUT_CANCEL: le,
      STATE_POSSIBLE: ai,
      STATE_BEGAN: ye,
      STATE_CHANGED: dt,
      STATE_ENDED: Ye,
      STATE_RECOGNIZED: Be,
      STATE_CANCELLED: Rt,
      STATE_FAILED: ke,
      DIRECTION_NONE: ti,
      DIRECTION_LEFT: Lt,
      DIRECTION_RIGHT: At,
      DIRECTION_UP: Ot,
      DIRECTION_DOWN: Nt,
      DIRECTION_HORIZONTAL: Re,
      DIRECTION_VERTICAL: et,
      DIRECTION_ALL: hn,
      Manager: Qi,
      Input: ge,
      TouchAction: Yi,
      TouchInput: ri,
      MouseInput: ni,
      PointerEventInput: Fi,
      TouchMouseInput: Gi,
      SingleTouchInput: yn,
      Recognizer: Ue,
      AttrRecognizer: Pe,
      Tap: ci,
      Pan: hi,
      Swipe: Zi,
      Pinch: Xi,
      Rotate: Ki,
      Press: ji,
      on: X,
      off: ae,
      each: E,
      merge: me,
      extend: re,
      assign: D,
      inherit: _,
      bindFn: I,
      prefixed: ei
    });
    var _a = typeof e < "u" ? e : typeof self < "u" ? self : {};
    _a.Hammer = ze, typeof n == "function" && n.amd ? n(function() {
      return ze;
    }) : o.exports ? o.exports = ze : e[s] = ze;
  })(window, document, "Hammer");
})(kr);
var Zt = kr.exports;
const dl = ul(Zt), He = /* @__PURE__ */ Ha({
  __proto__: null,
  default: dl
}, [Zt]), _r = 1, Hr = 2, us = 4, ml = {
  mousedown: _r,
  mousemove: Hr,
  mouseup: us
};
function pl(o, e) {
  for (let i = 0; i < o.length; i++)
    if (e(o[i]))
      return !0;
  return !1;
}
function fl(o) {
  const e = o.prototype.handler;
  o.prototype.handler = function(s) {
    const n = this.store;
    s.button > 0 && s.type === "pointerdown" && (pl(n, (r) => r.pointerId === s.pointerId) || n.push(s)), e.call(this, s);
  };
}
function gl(o) {
  o.prototype.handler = function(i) {
    let s = ml[i.type];
    s & _r && i.button >= 0 && (this.pressed = !0), s & Hr && i.which === 0 && (s = us), this.pressed && (s & us && (this.pressed = !1), this.callback(this.manager, s, {
      pointers: [i],
      changedPointers: [i],
      pointerType: "mouse",
      srcEvent: i
    }));
  };
}
fl(Zt.PointerEventInput);
gl(Zt.MouseInput);
const yl = Zt.Manager;
let _i = class {
  constructor(e, i, s) {
    this.element = e, this.callback = i, this.options = { enable: !0, ...s };
  }
};
const vl = He ? [
  [He.Pan, { event: "tripan", pointers: 3, threshold: 0, enable: !1 }],
  [He.Rotate, { enable: !1 }],
  [He.Pinch, { enable: !1 }],
  [He.Swipe, { enable: !1 }],
  [He.Pan, { threshold: 0, enable: !1 }],
  [He.Press, { enable: !1 }],
  [He.Tap, { event: "doubletap", taps: 2, enable: !1 }],
  [He.Tap, { event: "anytap", enable: !1 }],
  [He.Tap, { enable: !1 }]
] : null, Rn = {
  tripan: ["rotate", "pinch", "pan"],
  rotate: ["pinch"],
  pinch: ["pan"],
  pan: ["press", "doubletap", "anytap", "tap"],
  doubletap: ["anytap"],
  anytap: ["tap"]
}, wl = {
  doubletap: ["tap"]
}, bl = {
  pointerdown: "pointerdown",
  pointermove: "pointermove",
  pointerup: "pointerup",
  touchstart: "pointerdown",
  touchmove: "pointermove",
  touchend: "pointerup",
  mousedown: "pointerdown",
  mousemove: "pointermove",
  mouseup: "pointerup"
}, $s = {
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
}, kn = {
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
let ds = !1;
try {
  const o = {
    get passive() {
      return ds = !0, !0;
    }
  };
  pt.addEventListener("test", null, o), pt.removeEventListener("test", null);
} catch {
  ds = !1;
}
const Tl = Cl.indexOf("firefox") !== -1, { WHEEL_EVENTS: Sl } = $s, _n = "wheel", Hn = 4.000244140625, El = 40, Pl = 0.25;
class Ml extends _i {
  constructor(e, i, s) {
    super(e, i, s), this.handleEvent = (n) => {
      if (!this.options.enable)
        return;
      let r = n.deltaY;
      pt.WheelEvent && (Tl && n.deltaMode === pt.WheelEvent.DOM_DELTA_PIXEL && (r /= pt.devicePixelRatio), n.deltaMode === pt.WheelEvent.DOM_DELTA_LINE && (r *= El)), r !== 0 && r % Hn === 0 && (r = Math.floor(r / Hn)), n.shiftKey && r && (r = r * Pl), this.callback({
        type: _n,
        center: {
          x: n.clientX,
          y: n.clientY
        },
        delta: -r,
        srcEvent: n,
        pointerType: "mouse",
        target: n.target
      });
    }, this.events = (this.options.events || []).concat(Sl), this.events.forEach((n) => e.addEventListener(n, this.handleEvent, ds ? { passive: !1 } : !1));
  }
  destroy() {
    this.events.forEach((e) => this.element.removeEventListener(e, this.handleEvent));
  }
  enableEventType(e, i) {
    e === _n && (this.options.enable = i);
  }
}
const { MOUSE_EVENTS: Ll } = $s, $n = "pointermove", Bn = "pointerover", Un = "pointerout", zn = "pointerenter", Vn = "pointerleave";
class Al extends _i {
  constructor(e, i, s) {
    super(e, i, s), this.handleEvent = (r) => {
      this.handleOverEvent(r), this.handleOutEvent(r), this.handleEnterEvent(r), this.handleLeaveEvent(r), this.handleMoveEvent(r);
    }, this.pressed = !1;
    const { enable: n } = this.options;
    this.enableMoveEvent = n, this.enableLeaveEvent = n, this.enableEnterEvent = n, this.enableOutEvent = n, this.enableOverEvent = n, this.events = (this.options.events || []).concat(Ll), this.events.forEach((r) => e.addEventListener(r, this.handleEvent));
  }
  destroy() {
    this.events.forEach((e) => this.element.removeEventListener(e, this.handleEvent));
  }
  enableEventType(e, i) {
    e === $n && (this.enableMoveEvent = i), e === Bn && (this.enableOverEvent = i), e === Un && (this.enableOutEvent = i), e === zn && (this.enableEnterEvent = i), e === Vn && (this.enableLeaveEvent = i);
  }
  handleOverEvent(e) {
    this.enableOverEvent && e.type === "mouseover" && this._emit(Bn, e);
  }
  handleOutEvent(e) {
    this.enableOutEvent && e.type === "mouseout" && this._emit(Un, e);
  }
  handleEnterEvent(e) {
    this.enableEnterEvent && e.type === "mouseenter" && this._emit(zn, e);
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
          e.which === 0 && (this.pressed = !1), this.pressed || this._emit($n, e);
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
const { KEY_EVENTS: Ol } = $s, Wn = "keydown", Fn = "keyup";
class Nl extends _i {
  constructor(e, i, s) {
    super(e, i, s), this.handleEvent = (n) => {
      const r = n.target || n.srcElement;
      r.tagName === "INPUT" && r.type === "text" || r.tagName === "TEXTAREA" || (this.enableDownEvent && n.type === "keydown" && this.callback({
        type: Wn,
        srcEvent: n,
        key: n.key,
        target: n.target
      }), this.enableUpEvent && n.type === "keyup" && this.callback({
        type: Fn,
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
    e === Wn && (this.enableDownEvent = i), e === Fn && (this.enableUpEvent = i);
  }
}
const Gn = "contextmenu";
class Dl extends _i {
  constructor(e, i, s) {
    super(e, i, s), this.handleEvent = (n) => {
      this.options.enable && this.callback({
        type: Gn,
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
    e === Gn && (this.options.enable = i);
  }
}
const ps = 1, Ai = 2, fs = 4, Il = {
  pointerdown: ps,
  pointermove: Ai,
  pointerup: fs,
  mousedown: ps,
  mousemove: Ai,
  mouseup: fs
}, Rl = 1, kl = 2, _l = 3, Hl = 0, $l = 1, Bl = 2, Ul = 1, zl = 2, Vl = 4;
function Wl(o) {
  const e = Il[o.srcEvent.type];
  if (!e)
    return null;
  const { buttons: i, button: s, which: n } = o.srcEvent;
  let r = !1, a = !1, l = !1;
  return e === fs || e === Ai && !Number.isFinite(i) ? (r = n === Rl, a = n === kl, l = n === _l) : e === Ai ? (r = !!(i & Ul), a = !!(i & Vl), l = !!(i & zl)) : e === ps && (r = s === Hl, a = s === $l, l = s === Bl), { leftButton: r, middleButton: a, rightButton: l };
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
const Ji = {
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
    let h = Ji;
    typeof s == "string" || s && s.addEventListener ? h = { ...Ji, srcElement: s } : s && (h = { ...Ji, ...s });
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
const ql = {
  events: null,
  recognizers: null,
  recognizerOptions: {},
  Manager: yl,
  touchAction: "none",
  tabIndex: 0
};
class Yl {
  constructor(e = null, i) {
    this._onBasicInput = (n) => {
      const { srcEvent: r } = n, a = bl[r.type];
      a && this.manager.emit(a, n);
    }, this._onOtherEvent = (n) => {
      this.manager.emit(n.type, n);
    }, this.options = { ...ql, ...i }, this.events = /* @__PURE__ */ new Map(), this.setElement(e);
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
    }).on("hammer.input", this._onBasicInput), i.recognizers || Object.keys(Rn).forEach((n) => {
      const r = this.manager.get(n);
      r && Rn[n].forEach((a) => {
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
    }), this.moveInput = new Al(e, this._onOtherEvent, {
      enable: !1
    }), this.keyInput = new Nl(e, this._onOtherEvent, {
      enable: !1,
      tabIndex: i.tabIndex
    }), this.contextmenuInput = new Dl(e, this._onOtherEvent, {
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
      for (const f in e)
        this._addEventHandler(f, e[f], s, n, r);
      return;
    }
    const { manager: a, events: l } = this, h = kn[e] || e;
    let m = l.get(h);
    m || (m = new Gl(this), l.set(h, m), m.recognizerName = xl[h] || h, a && a.on(h, m.handleEvent)), m.add(e, i, s, n, r), m.isEmpty() || this._toggleRecognizer(m.recognizerName, !0);
  }
  _removeEventHandler(e, i) {
    if (typeof e != "string") {
      for (const a in e)
        this._removeEventHandler(a, e[a]);
      return;
    }
    const { events: s } = this, n = kn[e] || e, r = s.get(n);
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
class Xn {
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
class $e {
  #e;
  #t;
  #i;
  #r = null;
  #s = null;
  #n = null;
  #o;
  #h;
  #l = !1;
  #a;
  #c;
  #d;
  pad = { left: !1 };
  constructor(e, i) {
    if (this.#e = { ...Xl, ...i }, this.#h = cl.idle, this.#o = hl, this.#t = e, !this.#t && this.#e.elementId && (this.#t = document.getElementById(this.#e.elementId)), !Y(this.#t))
      throw "Must specify an element to receive user input.";
    this.#e.contextMenu || (window.oncontextmenu = (r) => (r.preventDefault(), !1));
    const n = {
      recognizerOptions: {
        pan: { threshold: this.#o ? 10 : 0 },
        pinch: { threshold: 0 }
      }
    };
    this.#i = new Yl(this.#t, n), this.pointerInit();
  }
  get agent() {
    return this.#i;
  }
  get pointer() {
    return this.#r instanceof qn ? this.#r : (this.#r = new qn(this), this.#r);
  }
  get touch() {
    return this.#n instanceof Yn ? this.#n : (this.#n = new Yn(this), this.#n);
  }
  get key() {
    return this.#s instanceof Xn ? this.#s : (this.#s = new Xn(this), this.#s);
  }
  get status() {
    return this.#h;
  }
  get element() {
    return this.#t;
  }
  get isTouch() {
    return this.#o;
  }
  get isPan() {
    return this.#l;
  }
  set panX(e) {
    F(e) && (this.#a = e);
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
    this.#i.destroy(), this.#r = void 0, this.#s = void 0, this.#n = void 0;
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
    this.pointer.has(e) ? this.#r.on(e, i, s, n) : this.touch.has(e) ? this.#n.on(e, i, s, n) : this.key.has(e) ? this.#s.on(e, i, s, n) : this.element.addEventListener(e, i, this.validOptions(s));
  }
  off(e, i, s) {
    this.#r?.has(e) ? this.#r.off(e, i, s) : this.#n?.has(e) ? this.#n.off(e, i, s) : this.#s?.has(e) ? this.#s.off(e, i, s) : this.element.removeEventListener(e, i, this.validOptions(s));
  }
  once(e, i, s) {
    this.on(e, i, s, !0);
  }
  setCursor(e) {
    this.#t.style.cursor = e;
  }
  pointerInit() {
    this.clientPosPrev = new rt([null, null]), this.position = new rt([0, 0]), this.movement = new rt([0, 0]), this.dragstart = new rt([null, null]), this.dragend = new rt([null, null]), this.dragCheckThreshold = 3, this.dragStatus = !1, this.wheeldelta = 0, this.pointerButtons = [!1, !1, !1, !1, !1], this.pointerdrag = new Event("pointerdrag"), this.pointerdragend = new Event("pointerdragend");
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
const jl = ["y", "M", "d", "h", "m", "s", "ms"], Kl = ["years", "months", "days", "hours", "minutes", "seconds", "milliseconds"], Zl = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], Ql = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], $r = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Jl = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], Br = 1231006505e3, je = 1, V = 1e3, W = V * 60, Q = W * 60, $ = Q * 24, xt = $ * 7, ue = $ * 30;
function Ur(o = 3, e = !1) {
  let i = $r[o % 12] * $;
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
  u: je
}, zr = {
  years: xe,
  months: ue,
  weeks: xt,
  days: $,
  hours: Q,
  minutes: W,
  seconds: V,
  milliseconds: je
}, eh = { ...qt, ...zr }, Qt = {
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
  MILLISECOND500: [je * 500, "milliseconds"],
  MILLISECOND250: [je * 250, "milliseconds"],
  MILLISECOND100: [je * 100, "milliseconds"],
  MILLISECOND50: [je * 50, "milliseconds"],
  MILLISECOND: [je, "milliseconds"]
}, th = () => {
  const o = Object.values(Qt), e = [];
  for (let i = o.length; --i; i > 0)
    e[i] = o[i][0];
  return e;
}, Bt = th(), ih = () => {
  const o = Object.values(Qt), e = [];
  for (let i = o.length; --i; i > 0)
    e[i] = o[i][1];
  return e;
}, gs = ih(), sh = Object.keys(Qt), nh = () => {
  const o = {};
  for (const [e, i] of Object.entries(Qt))
    o[e] = i[0];
  return o;
}, rh = nh(), ys = {
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
  const o = (/* @__PURE__ */ new Date()).getTimezoneOffset();
  return Object.prototype.hasOwnProperty.call(ys, o) ? ys[o.toString()] : "Etc/UTC";
}
function ah() {
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
function Vr(o) {
  const e = new Date(o).getTime();
  return x(e);
}
function Wr(o, e = Br, i = Date.now()) {
  return Vr(o) ? o > e && o < i : !1;
}
function _t(o, e, i) {
  o = new Date(o), e = new Date(e);
  var s = e.getTime(), n = o.getTime();
  return parseInt((s - n) / i);
}
const Xe = {
  inSeconds: function(o, e) {
    return _t(o, e, V);
  },
  inMinutes: function(o, e) {
    return _t(o, e, W);
  },
  inHours: function(o, e) {
    return _t(o, e, Q);
  },
  inDays: function(o, e) {
    return _t(o, e, $);
  },
  inWeeks: function(o, e) {
    return _t(o, e, xt);
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
function lh(o, e) {
  let i = Xe.inYears(o, e), s = Xe.inMonths(o, e), n = Xe.inWeeks(o, e), r = Xe.inDays(o, e), a = Xe.inHours(o, e), l = Xe.inMinutes(o, e), h = Xe.inSeconds(o, e), m = new Date(e).getTime() - new Date(o).getTime();
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
function vi(o) {
  let e = V;
  return C(o) ? (e = Fr(o), e ? o = o : (e = V, o = "1s")) : o = "1s", { tf: o, ms: e };
}
function Fr(o) {
  if (!C(o))
    return !1;
  const e = /([0-9]{1,2})([s|m|h|d|w|M|y])/gm;
  let i;
  return (i = e.exec(o)) !== null ? qt[i[2]] * i[1] : !1;
}
function Bs(o) {
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
function Wt(o) {
  const e = Bs(o);
  for (const i in e)
    if (e[i])
      return `${e[i]}${i}`;
}
function Gr(o) {
  return o ? new Date(o).getUTCSeconds() : null;
}
function Us(o) {
  return new Date(o).setUTCMilliseconds(0, 0);
}
function qr(o) {
  return o ? new Date(o).getUTCMinutes() : null;
}
function zs(o) {
  return new Date(o).setUTCSeconds(0, 0);
}
function Yr(o) {
  return o ? new Date(o).getUTCHours() : null;
}
function Vs(o) {
  return new Date(o).setUTCMinutes(0, 0, 0);
}
function Ws(o) {
  return o ? new Date(o).getUTCDate() : null;
}
function hh(o, e = "en-GB", i = "short") {
  return new Date(o).toLocaleDateString(e, { weekday: i });
}
function Yt(o) {
  return new Date(o).setUTCHours(0, 0, 0, 0);
}
function Fs(o) {
  if (o)
    return new Date(o).getUTCMonth();
}
function Xr(o, e = "en-GB", i = "short") {
  return new Date(o).toLocaleDateString(e, { month: i });
}
function Gs(o) {
  let e = new Date(o);
  return Date.UTC(
    e.getUTCFullYear(),
    e.getUTCMonth(),
    1
  );
}
function jr(o) {
  let e = (Fs(o) + 1) % 12;
  return o += Ur(e, Hi(o)), o;
}
function Kr(o) {
  if (o)
    return new Date(o).getUTCFullYear();
}
function qs(o) {
  return Date.UTC(new Date(o).getUTCFullYear());
}
function Zr(o) {
  return o = o + xe + $, Hi(o), o;
}
function Hi(o) {
  let i = new Date(o).getUTCFullYear();
  return i & 3 ? !1 : i % 100 != 0 || i % 400 == 0;
}
function ch(o) {
  let e = new Date(o), i = e.getUTCMonth(), s = e.getUTCDate(), n = dayCount[i] + s;
  return i > 1 && Hi() && n++, n;
}
function wi(o, e) {
  return {
    years: (s) => qs(s),
    months: (s) => Gs(s),
    weeks: (s) => Yt(s),
    days: (s) => Yt(s),
    hours: (s) => Vs(s),
    minutes: (s) => zs(s),
    seconds: (s) => Us(s)
  }[e](o);
}
function uh(o, e) {
  let i, s;
  switch (e) {
    case "years":
      i = qs(o), s = Zr(o);
      break;
    case "months":
      i = Gs(o), s = jr(o);
      break;
    case "weeks":
      i = Yt(o), s = i + $;
      break;
    case "days":
      i = Yt(o), s = i + $;
      break;
    case "hours":
      i = Vs(o), s = i + Q;
      break;
    case "minutes":
      i = zs(o), s = i + W;
      break;
    case "seconds":
      i = Us(o), s = i + V;
  }
  return { start: i, end: s };
}
function vs(o) {
  let { h: e, m: i } = Ys(o);
  return e == 0 && i == 0 ? `${d}` : `${e}:${i}`;
}
function dh(o) {
  let { h: e, m: i, s } = Ys(o);
  return e == 0 && i == 0 && s == 0 ? `${d}` : `${e}:${i}:${s}`;
}
function ws(o) {
  let { h: e, m: i, s } = Ys(o);
  return e == 0 && i == 0 && s == 0 ? `${d}` : `${i}:${s}`;
}
function Ys(o) {
  let e, i, s, n;
  return e = String(Ws(o)), i = String(Yr(o)).padStart(2, "0"), s = String(qr(o)).padStart(2, "0"), n = String(Gr(o)).padStart(2, "0"), { d: e, h: i, m: s, s: n };
}
function mh(o, e) {
  let i = 1 / 0, s = null, n = -1;
  for (let r = 0; r < e.length; r++) {
    let a = e[r][0];
    Math.abs(a - o) < i && (i = Math.abs(a - o), s = e[r], n = r);
  }
  return [n, s];
}
const ph = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BTCGENESIS: Br,
  DAY_MS: $,
  HM: vs,
  HMS: dh,
  HOUR_MS: Q,
  MILLISECOND: je,
  MINUTE_MS: W,
  MONTHMAP: Jl,
  MONTHR_MS: ue,
  MONTH_MS: Ur,
  MS: ws,
  SECOND_MS: V,
  TIMESCALES: Bt,
  TIMESCALESKEYS: sh,
  TIMESCALESRANK: gs,
  TIMESCALESVALUES: Qt,
  TIMESCALESVALUESKEYS: rh,
  TIMEUNITS: jl,
  TIMEUNITSLONG: Kl,
  TIMEUNITSVALUES: eh,
  TIMEUNITSVALUESLONG: zr,
  TIMEUNITSVALUESSHORT: qt,
  WEEK_MS: xt,
  YEAR_MS: xe,
  buildSubGrads: ah,
  dayCntInc: Zl,
  dayCntLeapInc: Ql,
  dayOfYear: ch,
  day_start: Yt,
  getTimezone: oh,
  get_day: Ws,
  get_dayName: hh,
  get_hour: Yr,
  get_minute: qr,
  get_month: Fs,
  get_monthName: Xr,
  get_second: Gr,
  get_year: Kr,
  hour_start: Vs,
  interval2MS: Fr,
  isLeapYear: Hi,
  isTimeFrame: vi,
  isValidTimeInRange: Wr,
  isValidTimestamp: Vr,
  minute_start: zs,
  monthDayCnt: $r,
  month_start: Gs,
  ms2Interval: Wt,
  ms2TimeUnits: Bs,
  nearestTs: mh,
  nextMonth: jr,
  nextYear: Zr,
  second_start: Us,
  time_start: wi,
  timestampDiff: Xe,
  timestampDifference: lh,
  timezones: ys,
  unitRange: uh,
  year_start: qs
}, Symbol.toStringTag, { value: "Module" })), fh = W, gh = "1m", Oi = fh, yh = 6, jn = 0.05, vh = 100, Kn = 100, De = ["default", "percent", "log"], Zn = 0.3, Qn = 30, ui = 200, Jn = 200, er = 20, tr = 4096, $i = 5, ir = 50, sr = 30, wh = 8, bs = 30, Qr = [!0, "top"];
class ve {
  static t = 0;
  static o = 1;
  static h = 2;
  static l = 3;
  static c = 4;
  static v = 5;
}
const bi = {
  mainPane: {},
  primaryPane: {},
  secondaryPane: {},
  scale: {},
  timeline: {}
};
Array.from(Object.keys(bi));
class ce {
  #e;
  #t;
  #i;
  #r;
  #s;
  #n;
  #o;
  #h;
  #l;
  #a;
  #c;
  static dividerList = {};
  static divideCnt = 0;
  static class = An;
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
  <div slot="widget" class="${An}" style="position: absolute;"></div>
  `;
  }
  constructor(e, i) {
    const s = { ...i };
    this.#s = e, this.#t = s.core, this.#i = s, this.#r = s.core.theme, this.#e = s.id, this.#n = s.chartPane, this.#o = e.elements.elDividers, this.init();
  }
  get el() {
    return this.#h;
  }
  get id() {
    return this.#e;
  }
  get chartPane() {
    return this.#n;
  }
  get config() {
    return this.#t.config;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return ne(this.#h);
  }
  get height() {
    return this.#h.getBoundingClientRect().height;
  }
  set cursor(e) {
    this.setCursorStyle(e);
  }
  get cursor() {
    return this.#a;
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
    this.#c = new $e(this.#h, { disableContextMenu: !1 }), this.#c.on("pointerover", this.onMouseEnter.bind(this)), this.#c.on("pointerout", this.onMouseOut.bind(this)), this.#c.on("pointerdrag", this.onPointerDrag.bind(this)), this.#c.on("pointerdragend", this.onPointerDragEnd.bind(this));
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
    this.#h.style.background = this.#r.divider.active, this.#t.MainPane.onMouseEnter();
  }
  onMouseOut() {
    this.#h.style.background = this.#r.divider.idle, this.#t.MainPane.onMouseEnter();
  }
  onPointerDrag(e) {
    this.#l = this.#t.MainPane.cursorPos, this.#h.style.background = this.#r.divider.active, this.emit(`${this.id}_pointerdrag`, this.#l), this.emit("divider_pointerdrag", {
      id: this.id,
      e,
      pos: this.#l,
      chartPane: this.chartPane
    }), this.chartPane.resize();
  }
  onPointerDragEnd(e) {
    this.#h.style.background = this.#r.divider.idle, this.#l = this.#t.MainPane.cursorPos, this.emit(`${this.id}_pointerdragend`, this.#l), this.emit("divider_pointerdragend", {
      id: this.id,
      e,
      pos: this.#l,
      chartPane: this.chartPane
    }), this.chartPane.resize();
  }
  mount() {
    this.#o.lastElementChild == null ? this.#o.innerHTML = this.dividerNode() : this.#o.lastElementChild.insertAdjacentHTML("afterend", this.dividerNode()), this.#h = Lr(`#${this.#e}`, this.#o);
  }
  dividerNode() {
    let e = this.#t.theme, i = this.#n.pos.top - ne(this.#o).top, s = this.#t.elBody.width, n = x(this.config.dividerHeight) ? this.config.dividerHeight : wh, r = e.tools.width;
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
    let e = this.#n.pos.top - ne(this.#o).top;
    e = e - this.height / 2 + 1, this.#h.style.top = `${e}px`;
  }
  setWidth() {
    this.#h.style.width = `${this.#t.MainPane.width}px`;
  }
  setCursorStyle(e) {
    C(e) && (this.#a = e, this.#h.style.cursor = e);
  }
  hide() {
    this.#h.style.display = "none";
  }
  show() {
    this.#h.style.display = "block";
  }
}
const bh = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4" ><path d="M471.993 112h-89.2l-16.242-46.75a32.023 32.023 0 00-30.229-21.5H175.241a31.991 31.991 0 00-30.294 21.691L129.1 112H40a24.027 24.027 0 00-24 24v312a24.027 24.027 0 0024 24h431.993a24.027 24.027 0 0024-24V136a24.027 24.027 0 00-24-24zm-8 328H48.007V144h104.01l23.224-68.25h161.081l23.71 68.25h103.961z" class="ci-primary"></path><path d="M256 168a114 114 0 10114 114 114.13 114.13 0 00-114-114zm0 196a82 82 0 1182-82 82.093 82.093 0 01-82 82z"></path></svg>', xh = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M376 160v32h65.372L252 381.373l-72-72L76.686 412.686l22.628 22.628L180 354.627l72 72 212-211.999V280h32V160H376z"></path><path d="M48 104H16v392h480v-32H48V104z"></path></svg>', Ch = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M271.514 95.5h-32v178.111l115.613 54.948 13.737-28.902-97.35-46.268V95.5z"></path><path d="M256 16C123.452 16 16 123.452 16 256s107.452 240 240 240 240-107.452 240-240S388.548 16 256 16zm0 448c-114.875 0-208-93.125-208-208S141.125 48 256 48s208 93.125 208 208-93.125 208-208 208z"></path></svg>', Jr = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M245.151 168a88 88 0 1088 88 88.1 88.1 0 00-88-88zm0 144a56 56 0 1156-56 56.063 56.063 0 01-56 56z"></path><path d="M464.7 322.319l-31.77-26.153a193.081 193.081 0 000-80.332l31.77-26.153a19.941 19.941 0 004.606-25.439l-32.612-56.483a19.936 19.936 0 00-24.337-8.73l-38.561 14.447a192.038 192.038 0 00-69.54-40.192l-6.766-40.571A19.936 19.936 0 00277.762 16H212.54a19.937 19.937 0 00-19.728 16.712l-6.762 40.572a192.03 192.03 0 00-69.54 40.192L77.945 99.027a19.937 19.937 0 00-24.334 8.731L21 164.245a19.94 19.94 0 004.61 25.438l31.767 26.151a193.081 193.081 0 000 80.332l-31.77 26.153A19.942 19.942 0 0021 347.758l32.612 56.483a19.937 19.937 0 0024.337 8.73l38.562-14.447a192.03 192.03 0 0069.54 40.192l6.762 40.571A19.937 19.937 0 00212.54 496h65.222a19.936 19.936 0 0019.728-16.712l6.763-40.572a192.038 192.038 0 0069.54-40.192l38.564 14.449a19.938 19.938 0 0024.334-8.731l32.609-56.487a19.939 19.939 0 00-4.6-25.436zm-50.636 57.12l-48.109-18.024-7.285 7.334a159.955 159.955 0 01-72.625 41.973l-10 2.636L267.6 464h-44.89l-8.442-50.642-10-2.636a159.955 159.955 0 01-72.625-41.973l-7.285-7.334-48.117 18.024L53.8 340.562l39.629-32.624-2.7-9.973a160.9 160.9 0 010-83.93l2.7-9.972L53.8 171.439l22.446-38.878 48.109 18.024 7.285-7.334a159.955 159.955 0 0172.625-41.973l10-2.636L222.706 48H267.6l8.442 50.642 10 2.636a159.955 159.955 0 0172.625 41.973l7.285 7.334 48.109-18.024 22.447 38.877-39.629 32.625 2.7 9.972a160.9 160.9 0 010 83.93l-2.7 9.973 39.629 32.623z"></path></svg>', Th = '<svg width="46.08" height="46.08" version="1.1" viewBox="-51.2 -51.2 614.4 614.4"><rect x="16" y="240.18" width="188.84" height="31.635"/><g transform="translate(-3.3234e-7 -112.18)"><rect x="307.16" y="352.37" width="188.84" height="31.635"/></g><rect transform="rotate(-90)" x="-496" y="240.18" width="188.84" height="31.635"/><rect transform="rotate(-90)" x="-204.84" y="240.18" width="188.84" height="31.635"/></svg>', Sh = '<svg width="46.08" height="46.08" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"></path><path d="M6.535 3H21a1 1 0 011 1v16a1 1 0 01-1 1H6.535a1 1 0 01-.832-.445l-5.333-8a1 1 0 010-1.11l5.333-8A1 1 0 016.535 3zm.535 2l-4.666 7 4.666 7H20V5H7.07zM13 10.586l2.828-2.829 1.415 1.415L14.414 12l2.829 2.828-1.415 1.415L13 13.414l-2.828 2.829-1.415-1.415L11.586 12 8.757 9.172l1.415-1.415L13 10.586z"></path></svg>', Eh = '<svg width="46.08" height="46.08" version="1.1" viewBox="-51.2 -51.2 614.4 614.4"><g stroke-width="30.155"><rect x="14.757" y="240.92" width="482.49" height="30.155" rx="15.078"/><rect x="14.757" y="147" width="482.49" height="30.155" rx="15.078"/><rect x="14.757" y="334.84" width="482.49" height="30.155" rx="15.078"/></g ><g transform="translate(5.937 -288.34)"><path d="m23.904 712.34c-8.3532 0-15.078 6.7252-15.078 15.078s6.7249 15.078 15.078 15.078h173.93c-0.65295-3.3651-2.0312-6.4697-2.0312-10.026 0-7.1393 1.5573-13.888 4.0625-20.13zm276.35 0c2.5051 6.2423 4.0365 12.991 4.0365 20.13 0 3.5554-1.3526 6.6618-2.0052 10.026h173.93c8.3532 0 15.078-6.7252 15.078-15.078s-6.7249-15.078-15.078-15.078z"/><path d="m250.06 759.97c17.965 0 32.545-14.58 32.545-32.545 0-17.965-14.58-32.545-32.545-32.545-17.965 0-32.545 14.58-32.545 32.545 0 17.965 14.58 32.545 32.545 32.545zm0 21.697c-29.964 0-54.242-24.279-54.242-54.242 0-29.964 24.279-54.242 54.242-54.242 29.964 0 54.242 24.279 54.242 54.242 0 29.964-24.279 54.242-54.242 54.242z" stroke-width="21.697"/></g ><path d="m144.05 18.672c-24.694 0-45.285 16.595-51.849 39.167h-62.37c-8.3532 0-15.078 6.7252-15.078 15.078s6.7249 15.078 15.078 15.078h62.37c6.5639 22.572 27.155 39.167 51.849 39.167s45.285-16.595 51.849-39.167h120.03c6.5639 22.572 27.155 39.167 51.849 39.167 24.694 0 45.285-16.595 51.849-39.167h62.552c8.3532 0 15.078-6.7252 15.078-15.078s-6.7249-15.078-15.078-15.078h-62.552c-6.5639-22.572-27.155-39.167-51.849-39.167-24.694 0-45.285 16.595-51.849 39.167h-120.03c-6.5639-22.572-27.155-39.167-51.849-39.167zm0 21.693c17.965 0 32.552 14.587 32.552 32.552 0 17.965-14.587 32.552-32.552 32.552-17.965 1e-5 -32.552-14.587-32.552-32.552 0-17.965 14.587-32.552 32.552-32.552zm223.72 0c17.965 0 32.552 14.587 32.552 32.552 0 17.965-14.587 32.552-32.552 32.552-17.965 0-32.552-14.587-32.552-32.552 0-17.965 14.587-32.552 32.552-32.552z" stroke-width="30.155"/></svg>', it = '<svg width="46.08" height="46.08" version="1.1" viewBox="-51.2 -51.2 614.4 614.4"><g transform="matrix(21.697 0 0 21.697 -47.758 -47.758)"><path d="m7.354 21.354 14-14-0.707-0.707-14 14z"/><path d="m22.5 7c0.828 0 1.5-0.672 1.5-1.5s-0.672-1.5-1.5-1.5-1.5 0.672-1.5 1.5 0.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zm-17 16c0.828 0 1.5-0.672 1.5-1.5s-0.672-1.5-1.5-1.5-1.5 0.672-1.5 1.5 0.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"/></g></svg>', Ph = '<svg width="46.08" height="46.08" viewBox="0 0 32 32"><path d="M 3.2758709,20.241377 11.758622,28.72413 28.72413,11.758622 20.241377,3.2758709 Z m 2.1206881,0 1.5905161,-1.590515 3.7112049,3.711203 1.060342,-1.060345 -3.7112027,-3.711204 1.0603441,-1.060344 2.1206876,2.12069 1.060346,-1.060346 -2.120689,-2.120688 1.060343,-1.060344 3.711203,3.711203 L 16,17.060346 l -3.711203,-3.711208 1.060341,-1.060341 2.12069,2.120687 1.060344,-1.060346 -2.120688,-2.120687 1.060344,-1.060343 3.711204,3.711205 1.060345,-1.060345 -3.711205,-3.7112046 1.060344,-1.0603441 2.120687,2.1206887 1.060346,-1.0603446 -2.120687,-2.1206883 1.590515,-1.5905161 6.362065,6.362063 -14.84482,14.84482 z" style="stroke-width:0.749776" /></svg>', Mh = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><g id="g930" transform="matrix(21.128963,0,0,21.128963,-29.235597,-50.369964)"><path clip-rule="evenodd" d="m 4.5,5 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z M 2,6.5 A 2.5,2.5 0 0 1 6.95,6 H 24 V 7 H 6.95 A 2.5,2.5 0 0 1 2,6.5 Z M 4.5,15 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z M 2,16.5 A 2.5,2.5 0 0 1 6.95,16 h 13.1 a 2.5,2.5 0 1 1 0,1 H 6.95 A 2.5,2.5 0 0 1 2,16.5 Z M 22.5,15 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z m -18,6 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z M 2,22.5 A 2.5,2.5 0 0 1 6.95,22 H 24 v 1 H 6.95 A 2.5,2.5 0 0 1 2,22.5 Z" id="path908" /><path clip-rule="evenodd" d="M 22.4,8.94 21.01,9.57 20.6,8.66 21.99,8.03 Z m -4,1.8 -1.39,0.63 -0.41,-0.91 1.39,-0.63 z m -4,1.8 -1.4,0.63 -0.4,-0.91 1.39,-0.63 z m -4,1.8 L 9,14.97 8.6,14.06 9.99,13.43 Z" id="path910" /></g></svg>', Lh = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M231.359 147l-80.921 205h45.155l15.593-39.5h89.628l15.593 39.5h45.155l-80.921-205zm-3.594 123.5L256 198.967l28.235 71.533z"></path><path d="M384 56H128V16H16v112h40v256H16v112h112v-40h256v40h112V384h-40V128h40V16H384zM48 96V48h48v48zm48 368H48v-48h48zm288-40H128v-40H88V128h40V88h256v40h40v256h-40zm80-8v48h-48v-48zM416 48h48v48h-48z"></path></svg>', Ah = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><g id="g718" transform="translate(0,1.2499996)"><path d="M 7.5010125,7.9560661 5.355012,10.103066 c -0.472,0.472 -1.18,-0.2360003 -0.708,-0.7080003 L 7.6470125,6.3950659 c 0.195364,-0.195858 0.512636,-0.195858 0.708,0 l 3.0000005,2.9999998 c 0.472,0.472 -0.236,1.1800003 -0.708,0.7080003 L 8.5010125,7.9560661 c -0.431103,-0.417289 -0.523896,-0.423024 -1,0 z" style="" id="path566-5" /><path d="m 7.4989873,5.5439348 -2.1460003,-2.147 c -0.472,-0.472 -1.18,0.236 -0.708,0.708 l 3.0000003,3 c 0.1953639,0.195858 0.5126361,0.195858 0.708,0 l 2.9999997,-3 c 0.472,-0.472 -0.236,-1.18 -0.708,-0.708 l -2.1459997,2.147 c -0.4311027,0.417289 -0.5238956,0.423024 -1,0 z" style="" id="path566-6-3" /></g></svg>', Oh = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><path d="m 7.4989873,7.7026182 -2.1460003,2.147 c -0.472,0.4719998 -1.18,-0.236 -0.708,-0.708 l 3.0000003,-3 c 0.1953639,-0.1958581 0.5126361,-0.1958581 0.708,0 l 2.9999997,3 c 0.472,0.472 -0.236,1.1799998 -0.708,0.708 l -2.1459997,-2.147 c -0.4311027,-0.417289 -0.5238956,-0.423024 -1,0 z" style="" id="path566-6-3" /></svg>', Nh = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><path d="m 7.4989873,8.2973819 -2.1460003,-2.147 c -0.472,-0.472 -1.18,0.236 -0.708,0.708 l 3.0000003,3 c 0.1953639,0.1958581 0.5126361,0.1958581 0.708,0 l 2.9999997,-3 c 0.472,-0.472 -0.236,-1.18 -0.708,-0.708 l -2.1459997,2.147 c -0.4311027,0.417289 -0.5238956,0.423024 -1,0 z" style="" id="path566-6-3" /></svg>', Dh = '<svg width="46.08" height="46.08" version="1.1" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"> <path d="m1 14a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-12a1 1 0 0 0-1-1h-12a1 1 0 0 0-1 1zm15 0a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-8.5-2.5a0.5 0.5 0 0 0 1 0v-5.793l2.146 2.147a0.50063 0.50063 0 1 0 0.708-0.708l-3-3a0.5 0.5 0 0 0-0.708 0l-3 3a0.50063 0.50063 0 0 0 0.708 0.708l2.146-2.147z" fill-rule="evenodd"/></svg>', Ih = '<svg width="46.08" height="46.08" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M 15,2 A 1,-1 0 0 0 14,1 H 2 A 1,-1 0 0 0 1,2 v 12 a 1,-1 0 0 0 1,1 h 12 a 1,-1 0 0 0 1,-1 z M 0,2 A 2,-2 0 0 1 2,0 h 12 a 2,-2 0 0 1 2,2 v 12 a 2,-2 0 0 1 -2,2 H 2 A 2,-2 0 0 1 0,14 Z m 8.5,2.5 a 0.5,-0.5 0 0 0 -1,0 v 5.793 L 5.354,8.146 A 0.5006316,-0.5006316 0 1 0 4.646,8.854 l 3,3 a 0.5,-0.5 0 0 0 0.708,0 l 3,-3 A 0.5006316,-0.5006316 0 0 0 10.646,8.146 L 8.5,10.293 Z" id="path2" /></svg>', Rh = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><g id="g687" transform="translate(15.647255,-0.0288128)"><path d="m -8.1462425,10.484879 -2.1460005,2.146999 c -0.472,0.472 -1.18,-0.236 -0.708,-0.708 l 3.0000005,-2.9999994 c 0.195364,-0.195858 0.512636,-0.195858 0.708,0 l 3.0000005,2.9999994 c 0.472,0.472 -0.236,1.18 -0.708,0.708 l -2.1460005,-2.146999 c -0.431103,-0.417289 -0.523896,-0.423024 -1,0 z" style="" id="path566-5" /><path d="m -8.1482677,5.5727476 -2.1460003,-2.147 c -0.472,-0.472 -1.18,0.236 -0.708,0.708 l 3.0000003,3 c 0.1953639,0.195858 0.5126361,0.195858 0.708,0 l 2.9999997,-3 c 0.472,-0.472 -0.236,-1.18 -0.708,-0.708 l -2.1459997,2.147 c -0.4311027,0.417289 -0.5238956,0.423024 -1,0 z" style="" id="path566-6-3" /></g></svg>', kh = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><g id="g611" transform="translate(0.2050748,-0.8829888)"><path d="m 7.2959375,11.933818 -2.146,-2.1469999 c -0.472,-0.4719998 -1.18,0.2359999 -0.708,0.7079999 l 3,3 c 0.195364,0.195858 0.512636,0.195858 0.708,0 l 3.0000005,-3 c 0.472,-0.472 -0.236,-1.1799997 -0.708,-0.7079999 L 8.2959375,11.933818 c -0.431103,0.417289 -0.523896,0.423024 -1,0 z" style="" id="path566" /><path d="m 7.2939123,5.8321596 -2.146,2.147 c -0.4719998,0.472 -1.1799998,-0.236 -0.708,-0.708 l 3,-3 c 0.1953639,-0.195858 0.5126361,-0.195858 0.708,0 l 2.9999997,3 c 0.472,0.472 -0.236,1.18 -0.708,0.708 l -2.1459997,-2.147 c -0.4311027,-0.417289 -0.5238956,-0.423024 -1,0 z" style="" id="path566-6" /></g></svg>', _h = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><path d="m 11.500447,8.5 c 0.666666,0 0.666666,-1 0,-1 H 4.444275 c -0.1571231,0 -0.224029,0.07336 -0.2978281,0.1459999 -0.1958579,0.195364 -0.1958579,0.5126361 0,0.7080001 0,0 0.113806,0.146 0.320186,0.146 z" style="" id="path887" /></svg>', Hh = '<svg style="height:46px;width:46px" version="1.1" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"> <g fill-rule="evenodd">  <path d="m15 2c0-0.55228-0.44772-1-1-1h-12c-0.55228 0-1 0.44772-1 1v12c0 0.55228 0.44772 1 1 1h12c0.55228 0 1-0.44772 1-1zm-15 0c0-1.1046 0.89543-2 2-2h12c1.1046 0 2 0.89543 2 2v12c0 1.1046-0.89543 2-2 2h-12c-1.1046 0-2-0.89543-2-2z"/>  <path d="m4.4449 4.097c-0.01964 0-0.037678 0.0018-0.054687 0.0039-0.017011 0.0022-0.034068 0.0058-0.048828 0.0098-0.014761 4e-3 -0.028126 0.0081-0.041016 0.01367-0.012889 0.0056-0.025711 0.01268-0.037109 0.01953-0.022796 0.01371-0.041442 0.02783-0.060547 0.04492s-0.038191 0.03653-0.056641 0.05469c-0.024482 0.02442-0.046092 0.05037-0.064453 0.07813-0.018362 0.02775-0.032681 0.05776-0.044922 0.08789s-0.021223 0.06023-0.027344 0.0918c-0.00612 0.03156-0.00977 0.06366-0.00977 0.0957 0 8e-3 -4.378e-4 0.01543 0 0.02344v1.2988c0 0.02083 6.41e-5 0.04102 0.00195 0.06055 0.00189 0.01953 0.0061 0.03841 0.00977 0.05664 0.00366 0.01823 0.00836 0.03581 0.013672 0.05273 0.00531 0.01693 0.010742 0.0332 0.017578 0.04883 0.013672 0.03125 0.029785 0.0599 0.048828 0.08594s0.041016 0.04948 0.064453 0.07031 0.049316 0.03906 0.076172 0.05469c0.026855 0.01563 0.054687 0.02865 0.083984 0.03906 0.029297 0.01042 0.059082 0.01823 0.089844 0.02344 0.030762 0.0052 0.0625 0.0078 0.09375 0.0078s0.062988-0.0026 0.09375-0.0078 0.060547-0.01302 0.089844-0.02344 0.057129-0.02344 0.083984-0.03906c0.026855-0.01563 0.052734-0.03385 0.076172-0.05469 0.023437-0.02083 0.04541-0.04427 0.064453-0.07031s0.035156-0.05469 0.048828-0.08594c0.00684-0.01563 0.012268-0.0319 0.017578-0.04883s0.01001-0.0345 0.013672-0.05273c0.00366-0.01823 0.00787-0.03711 0.00977-0.05664 0.00189-0.01953 0.00195-0.03971 0.00195-0.06055v-0.82227h6v0.98633c0 0.02083 2e-3 0.04102 0.0039 0.06055s0.0042 0.03841 0.0078 0.05664c0.0037 0.01823 0.0084 0.03581 0.01367 0.05273 0.0053 0.01693 0.01074 0.0332 0.01758 0.04883 0.01367 0.03125 0.03174 0.0599 0.05078 0.08594s0.03906 0.04948 0.0625 0.07031 0.04932 0.03906 0.07617 0.05469c0.02686 0.01563 0.05469 0.02865 0.08399 0.03906 0.0293 0.01042 0.06104 0.01823 0.0918 0.02344 0.03076 0.0052 0.06055 0.0078 0.0918 0.0078s0.06299-0.0026 0.09375-0.0078 0.06055-0.01302 0.08984-0.02344c0.0293-0.01042 0.05908-0.02344 0.08594-0.03906 0.02686-0.01563 0.05078-0.03385 0.07422-0.05469 0.02344-0.02083 0.04541-0.04427 0.06445-0.07031s0.03516-0.05469 0.04883-0.08594c0.0068-0.01563 0.01422-0.0319 0.01953-0.04883 0.0053-0.01693 0.01001-0.0345 0.01367-0.05273 0.0037-0.01823 0.0059-0.03711 0.0078-0.05664s2e-3 -0.03971 2e-3 -0.06055v-1.4629c3.25e-4 -0.0078 0-0.01563 0-0.02344 0-0.03125-0.0026-0.06299-0.0078-0.09375s-0.01302-0.06055-0.02344-0.08984c-0.01042-0.0293-0.02344-0.05713-0.03906-0.08398-0.01563-0.02685-0.03385-0.05273-0.05469-0.07617-0.02083-0.02344-0.04427-0.04541-0.07031-0.06445s-0.05469-0.03516-0.08594-0.04883c-0.01563-0.0068-0.0319-0.01227-0.04883-0.01758-0.01693-0.0053-0.0345-0.01001-0.05273-0.01367-0.01823-0.0037-0.03711-0.0059-0.05664-0.0078s-0.03971-0.0039-0.06055-0.0039h-6.5z"/>  <path d="m11.555 11.903c0.01964 0 0.03768-0.0018 0.05469-0.0039 0.01701-0.0022 0.03407-0.0058 0.04883-0.0098s0.02813-0.0081 0.04102-0.01367c0.01289-0.0056 0.02571-0.01268 0.03711-0.01953 0.0228-0.01371 0.04144-0.02783 0.06055-0.04492 0.0191-0.01709 0.03819-0.03653 0.05664-0.05469 0.02448-0.02442 0.04609-0.05037 0.06445-0.07813 0.01836-0.02775 0.03268-0.05776 0.04492-0.08789s0.02122-0.06023 0.02734-0.0918c0.0061-0.03156 0.0098-0.06366 0.0098-0.0957 0-8e-3 4.38e-4 -0.01543 0-0.02344v-1.2988c0-0.02083-6.4e-5 -0.04102-2e-3 -0.06055-0.0019-0.01953-0.0061-0.03841-0.0098-0.05664s-0.0084-0.03581-0.01367-0.05273c-0.0053-0.01693-0.01074-0.0332-0.01758-0.04883-0.01367-0.03125-0.02979-0.0599-0.04883-0.08594s-0.04102-0.04948-0.06445-0.07031c-0.02344-0.02083-0.04932-0.03906-0.07617-0.05469s-0.05469-0.02865-0.08398-0.03906c-0.0293-0.01042-0.05908-0.01823-0.08984-0.02344-0.03076-0.0052-0.0625-0.0078-0.09375-0.0078s-0.06299 0.0026-0.09375 0.0078-0.06055 0.01302-0.08984 0.02344c-0.0293 0.01042-0.05713 0.02344-0.08398 0.03906-0.02685 0.01563-0.05273 0.03385-0.07617 0.05469-0.02344 0.02083-0.04541 0.04427-0.06445 0.07031s-0.03516 0.05469-0.04883 0.08594c-0.0068 0.01563-0.01227 0.0319-0.01758 0.04883-0.0053 0.01693-0.01001 0.0345-0.01367 0.05273-0.0037 0.01823-0.0079 0.03711-0.0098 0.05664s-0.0019 0.03971-0.0019 0.06055v0.82227h-6v-0.98633c0-0.02083-2e-3 -0.04102-0.0039-0.06055s-0.0042-0.03841-0.0078-0.05664c-0.0037-0.01823-0.0084-0.03581-0.01367-0.05273-0.0053-0.01693-0.01074-0.0332-0.01758-0.04883-0.01367-0.03125-0.03174-0.0599-0.05078-0.08594s-0.03906-0.04948-0.0625-0.07031-0.04932-0.03906-0.07617-0.05469c-0.02686-0.01563-0.05469-0.02865-0.08399-0.03906-0.0293-0.01042-0.06104-0.01823-0.0918-0.02344-0.03076-0.0052-0.06055-0.0078-0.0918-0.0078s-0.06299 0.0026-0.09375 0.0078-0.06055 0.01302-0.08984 0.02344c-0.0293 0.01042-0.05908 0.02344-0.08594 0.03906-0.02686 0.01563-0.05078 0.03385-0.07422 0.05469-0.02344 0.02083-0.04541 0.04427-0.06445 0.07031s-0.03516 0.05469-0.04883 0.08594c-0.0068 0.01563-0.01422 0.0319-0.01953 0.04883-0.0053 0.01693-0.01001 0.03451-0.01367 0.05273-0.0037 0.01823-0.0059 0.03711-0.0078 0.05664s-2e-3 0.03971-2e-3 0.06055v1.4629c-3.25e-4 0.0078 0 0.01563 0 0.02344 0 0.03125 0.0026 0.06299 0.0078 0.09375s0.01302 0.06055 0.02344 0.08984c0.01042 0.0293 0.02344 0.05713 0.03906 0.08398 0.01563 0.02685 0.03385 0.05273 0.05469 0.07617 0.02083 0.02344 0.04427 0.04541 0.07031 0.06445s0.05469 0.03516 0.08594 0.04883c0.01563 0.0068 0.0319 0.01227 0.04883 0.01758 0.01693 0.0053 0.0345 0.01001 0.05273 0.01367 0.01823 0.0037 0.03711 0.0059 0.05664 0.0078s0.03971 0.0039 0.06055 0.0039h6.5z"/></g></svg>', $h = '<svg style="height:46px;width:46px" version="1.1" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"> <path d="m15 2c0-0.55228-0.44772-1-1-1h-12c-0.55228 0-1 0.44772-1 1v12c0 0.55228 0.44772 1 1 1h12c0.55228 0 1-0.44772 1-1zm-15 0c0-1.1046 0.89543-2 2-2h12c1.1046 0 2 0.89543 2 2v12c0 1.1046-0.89543 2-2 2h-12c-1.1046 0-2-0.89543-2-2z" fill-rule="evenodd"/> <path d="m13.291 7.7876c-1.0729-2.491-3.0911-4.0365-5.2687-4.0365-2.1776 0-4.1958 1.5456-5.2687 4.0365a0.53112 0.53112 0 0 0 0 0.4249c1.0729 2.491 3.0911 4.0365 5.2687 4.0365 2.1776 0 4.1959-1.5456 5.2687-4.0365a0.53112 0.53112 0 0 0 0-0.4249zm-5.2687 3.3992c-1.6836 0-3.277-1.2163-4.1958-3.1867 0.91884-1.9705 2.5122-3.1867 4.1958-3.1867 1.6837 0 3.277 1.2163 4.1959 3.1867-0.91884 1.9705-2.5122 3.1867-4.1959 3.1867zm0-5.3112a2.1245 2.1245 0 1 0 2.1245 2.1245 2.1245 2.1245 0 0 0-2.1245-2.1245zm0 3.1867a1.0622 1.0622 0 1 1 1.0622-1.0622 1.0622 1.0622 0 0 1-1.0622 1.0622z" stroke-width=".53112"/></svg>', Bh = '<svg style="height:46px;width:46px" version="1.1" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"> <path d="m15 2c0-0.55228-0.44772-1-1-1h-12c-0.55228 0-1 0.44772-1 1v12c0 0.55228 0.44772 1 1 1h12c0.55228 0 1-0.44772 1-1zm-15 0c0-1.1046 0.89543-2 2-2h12c1.1046 0 2 0.89543 2 2v12c0 1.1046-0.89543 2-2 2h-12c-1.1046 0-2-0.89543-2-2z" fill-rule="evenodd"/> <path d="m13.291 7.7876c-1.0729-2.491-3.0911-4.0365-5.2687-4.0365-2.1776 0-4.1958 1.5456-5.2687 4.0365a0.53112 0.53112 0 0 0 0 0.4249c1.0729 2.491 3.0911 4.0365 5.2687 4.0365 2.1776 0 4.1959-1.5456 5.2687-4.0365a0.53112 0.53112 0 0 0 0-0.4249zm-5.2687 3.3992c-1.6836 0-3.277-1.2163-4.1958-3.1867 0.91884-1.9705 2.5122-3.1867 4.1958-3.1867 1.6837 0 3.277 1.2163 4.1959 3.1867-0.91884 1.9705-2.5122 3.1867-4.1959 3.1867zm0-5.3112a2.1245 2.1245 0 1 0 2.1245 2.1245 2.1245 2.1245 0 0 0-2.1245-2.1245zm0 3.1867a1.0622 1.0622 0 1 1 1.0622-1.0622 1.0622 1.0622 0 0 1-1.0622 1.0622z" stroke-width=".53112"/> <path d="m12.757 3.0055c-0.11087 0.0051358-0.22696 0.051177-0.33008 0.1543l-4.9883 4.9902c-0.061946 0.061947-0.086644 0.12038-0.097656 0.17773l-4.8184 4.8164c-0.1111 0.1111-0.1066 0.2109-0.10742 0.31445-3.5e-4 0.27663 0.22337 0.50035 0.5 0.5 0 0 0.18415 0.022881 0.33008-0.12305l4.9746-4.9727c0.06758-0.06758 0.10951-0.13979 0.13281-0.21289l4.7832-4.7832c0.36828-0.36828 0.017071-0.87967-0.37891-0.86133z" fill-rule="evenodd"/></svg>', Uh = '<svg class="ov-icon" width="46.08" height="46.08" version="1.1" viewBox="-1.6 -1.6 19.2 19.2"><path d="m14 15c0.55228 0 1-0.44772 1-1v-12c0-0.55228-0.44772-1-1-1h-12c-0.55228 0-1 0.44772-1 1v12c0 0.55228 0.44772 1 1 1zm0-15c1.1046 0 2 0.89543 2 2v12c0 1.1046-0.89543 2-2 2h-12c-1.1046 0-2-0.89543-2-2v-12c0-1.1046 0.89543-2 2-2z" fill-rule="evenodd"/><g transform="translate(-1.1585)" fill-rule="evenodd">  <path d="m8.2964 7.5-2.147-2.146c-0.472-0.472 0.236-1.18 0.708-0.708l3 3c0.19586 0.19536 0.19586 0.51264 0 0.708l-3 3c-0.472 0.472-1.18-0.236-0.708-0.708l2.147-2.146c0.41729-0.4311 0.42302-0.5239 0-1z"/>  <path d="m12.323 4.4996c0-0.66667-1-0.66667-1 0v7.0562c0 0.15712 0.07336 0.22403 0.146 0.29783 0.19536 0.19586 0.51264 0.19586 0.708 0 0 0 0.146-0.11381 0.146-0.32019z"/></g></svg>', zh = '<svg class="ov-icon" width="46.08" height="46.08" version="1.1" viewBox="-1.6 -1.6 19.2 19.2"><path d="m2 15c-0.55228 0-1-0.44772-1-1v-12c0-0.55228 0.44772-1 1-1h12c0.55228 0 1 0.44772 1 1v12c0 0.55228-0.44772 1-1 1zm0-15c-1.1046 0-2 0.89543-2 2v12c0 1.1046 0.89543 2 2 2h12c1.1046 0 2-0.89543 2-2v-12c0-1.1046-0.89543-2-2-2z" fill-rule="evenodd"/><g transform="matrix(-1 0 0 1 17.159 0)" fill-rule="evenodd">  <path d="m8.2964 7.5-2.147-2.146c-0.472-0.472 0.236-1.18 0.708-0.708l3 3c0.19586 0.19536 0.19586 0.51264 0 0.708l-3 3c-0.472 0.472-1.18-0.236-0.708-0.708l2.147-2.146c0.41729-0.4311 0.42302-0.5239 0-1z"/>  <path d="m12.323 4.4996c0-0.66667-1-0.66667-1 0v7.0562c0 0.15712 0.07336 0.22403 0.146 0.29783 0.19536 0.19586 0.51264 0.19586 0.708 0 0 0 0.146-0.11381 0.146-0.32019z"/></g></svg>', Vh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 336.96 336.36" xmlns="http://www.w3.org/2000/svg"><path d="m0 0 168.48 336.36 168.48-336.36z"/></svg>', Wh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 336.96 336.36" xmlns="http://www.w3.org/2000/svg"><path d="m0 336.36 168.48-336.36 168.48 336.36z"/></svg>', Fh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m512 256c0 70.67-28.66 134.68-74.99 181.01s-110.34 74.99-181.01 74.99c-70.68 0-134.69-28.66-181.01-74.99-46.33-46.33-74.99-110.34-74.99-181.01 0-70.68 28.66-134.69 74.99-181.01 46.32-46.33 110.33-74.99 181.01-74.99 70.67 0 134.68 28.66 181.01 74.99 46.33 46.32 74.99 110.33 74.99 181.01zm-204.29-21.97v-67.04c0-7.53-6.19-13.72-13.73-13.72h-75.96c-7.53 0-13.72 6.17-13.72 13.72v67.03h-42.84c-16.5 0-24.78 19.64-13.86 31.54l94.74 110.57c7.44 9 21.03 9.01 28.66 0.37l93.71-111.31c10.69-12.27 1.64-31.14-14.19-31.16h-42.81zm105.52 179.2c40.22-40.24 65.11-95.84 65.11-157.23 0-61.4-24.89-117-65.11-157.23-40.24-40.23-95.84-65.11-157.23-65.11-61.4 0-117 24.88-157.23 65.11s-65.11 95.83-65.11 157.23c0 61.39 24.88 116.99 65.11 157.23 40.23 40.22 95.83 65.11 157.23 65.11 61.39 0 116.99-24.89 157.23-65.11z" fill-rule="nonzero"/></svg>', Gh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m512 256c0-70.67-28.66-134.68-74.99-181.01s-110.34-74.99-181.01-74.99c-70.68 0-134.69 28.66-181.01 74.99-46.33 46.33-74.99 110.34-74.99 181.01 0 70.68 28.66 134.69 74.99 181.01 46.32 46.33 110.33 74.99 181.01 74.99 70.67 0 134.68-28.66 181.01-74.99 46.33-46.32 74.99-110.33 74.99-181.01zm-204.29 21.97v67.04c0 7.53-6.19 13.72-13.73 13.72h-75.96c-7.53 0-13.72-6.17-13.72-13.72v-67.03h-42.84c-16.5 0-24.78-19.64-13.86-31.54l94.74-110.57c7.44-9 21.03-9.01 28.66-0.37l93.71 111.31c10.69 12.27 1.64 31.14-14.19 31.16zm105.52-179.2c40.22 40.24 65.11 95.84 65.11 157.23 0 61.4-24.89 117-65.11 157.23-40.24 40.23-95.84 65.11-157.23 65.11-61.4 0-117-24.88-157.23-65.11s-65.11-95.83-65.11-157.23c0-61.39 24.88-116.99 65.11-157.23 40.23-40.22 95.83-65.11 157.23-65.11 61.39 0 116.99 24.89 157.23 65.11z" fill-rule="nonzero"/></svg>', qh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M512 256c0-70.67-28.66-134.68-74.98-181.02C390.69 28.66 326.68 0 256 0S121.31 28.66 74.98 74.98C28.66 121.32 0 185.33 0 256c0 70.68 28.66 134.69 74.98 181.02C121.31 483.34 185.32 512 256 512c70.67 0 134.69-28.66 181.02-74.98C483.34 390.69 512 326.68 512 256zm-160.23-21.5h-43.38v-67.93c0-7.63-6.27-13.9-13.91-13.9H217.5c-7.62 0-13.9 6.25-13.9 13.9v67.92h-43.41c-16.71 0-25.11 19.9-14.05 31.96l96.01 112.05c7.54 9.12 21.31 9.12 29.04.37l94.96-112.8c10.83-12.43 1.66-31.55-14.38-31.57z"/></svg>', Yh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m512 256c0 70.67-28.66 134.68-74.98 181.02-46.33 46.32-110.34 74.98-181.02 74.98s-134.69-28.66-181.02-74.98c-46.32-46.34-74.98-110.35-74.98-181.02 0-70.68 28.66-134.69 74.98-181.02 46.33-46.32 110.34-74.98 181.02-74.98 70.67 0 134.69 28.66 181.02 74.98 46.32 46.33 74.98 110.34 74.98 181.02zm-160.23 21.5h-43.38v67.93c0 7.63-6.27 13.9-13.91 13.9h-76.98c-7.62 0-13.9-6.25-13.9-13.9v-67.92h-43.41c-16.71 0-25.11-19.9-14.05-31.96l96.01-112.05c7.54-9.12 21.31-9.12 29.04-0.37l94.96 112.8c10.83 12.43 1.66 31.55-14.38 31.57z"/></svg>', Xh = '<svg width="800px" height="800px" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">  <defs>   <clipPath id="clipPath1">    <path d="m6.1885 15.281v-9.0209h3.1721q1.0764 0 1.6765 0.65299 0.63822 0.71345 0.63822 1.7171 0 0.58043-0.22862 1.0158-0.21909 0.42323-0.743 0.84646 1.1812 0.87065 1.1812 2.1887 0 0.53206-0.19051 1.0762-0.19051 0.53206-0.51439 0.87065-0.60964 0.65299-1.7908 0.65299zm1.467-7.4731v2.0315h1.5813q1.0383 0 1.0383-1.0158 0-1.0158-1.0383-1.0158zm0 3.5793v2.3459h1.7432q1.0859 0 1.0859-1.1609 0-1.185-1.0859-1.185zm9.6876-5.1271h1.467v6.1066q0 1.4874-0.69538 2.2854-0.80016 0.91902-2.1242 0.91902t-2.1242-0.91902q-0.69538-0.79809-0.69538-2.2854v-6.1066h1.4574v6.1066q0 1.6083 1.3622 1.6083 1.3526 0 1.3526-1.6083zm6.2108 5.6834v3.3375h-1.467v-3.3375l-2.3528-5.6834h1.6289l1.4479 3.9784 1.3622-3.9784h1.6384z" display="none" stroke-width=".041213" style="white-space:pre" aria-label="BUY"/>    <path class="powerclip" d="m-5-5h42v42.001h-42zm11.189 20.281h3.2006q1.1812 0 1.7908-0.65299 0.32387-0.33859 0.51439-0.87065 0.19051-0.54416 0.19051-1.0762 0-1.3181-1.1812-2.1887 0.52391-0.42323 0.743-0.84646 0.22862-0.43532 0.22862-1.0158 0-1.0037-0.63822-1.7171-0.60012-0.65299-1.6765-0.65299h-3.1721zm1.467-7.4731v2.0315h1.5813q1.0383 0 1.0383-1.0158 0-1.0158-1.0383-1.0158zm0 3.5793v2.3459h1.7432q1.0859 0 1.0859-1.1609 0-1.185-1.0859-1.185zm9.6876-5.1271v6.1066q0 1.6083-1.3526 1.6083-1.3622 0-1.3622-1.6083v-6.1066h-1.4574v6.1066q0 1.4874 0.69538 2.2854 0.80016 0.91902 2.1242 0.91902t2.1242-0.91902q0.69538-0.79809 0.69538-2.2854v-6.1066zm6.2108 5.6834 2.2576-5.6834h-1.6384l-1.3622 3.9784-1.4479-3.9784h-1.6289l2.3528 5.6834v3.3375h1.467z" stroke-width=".041213" style="white-space:pre"/>   </clipPath>  </defs>  <g clip-path="url(#clipPath1)" fill="none" fill-rule="evenodd">   <g id="Icon-Set" transform="translate(-360 -255)" fill="#000">    <path d="m386.67 255h-21.334c-2.945 0-5.333 2.371-5.333 5.297v12.33c0 2.924 2.055 4.813 5 4.813h6.639l4.361 9.561 4.361-9.561h6.639c2.945 0 5-1.889 5-4.813v-12.33c0-2.926-2.388-5.297-5.333-5.297z"/>   </g>  </g> </svg>', jh = '<svg width="800px" height="800px" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">  <defs>   <clipPath id="clipPath4">    <path d="m10.026 8.6238h-1.2531q-0.06962-1.4148-1.3576-1.4148-0.51344 0-0.81803 0.30231-0.30458 0.30231-0.30458 0.81019 0 0.49579 0.25237 0.74972 0.26107 0.24185 0.97467 0.43532l1.0182 0.26603q0.90505 0.24185 1.3054 0.83437 0.40901 0.59252 0.40901 1.6566 0 1.3785-0.7049 2.1524-0.69619 0.77391-1.958 0.77391-1.2444 0-1.9406-0.76182-0.68749-0.77391-0.74841-2.225h1.2967q0.03481 0.72554 0.40901 1.1125t1.053 0.38696q0.60917 0 0.95727-0.32649 0.3568-0.32649 0.3568-0.89483 0-0.54416-0.27848-0.83437-0.27848-0.30231-0.94856-0.4716l-0.90505-0.25394q-0.99208-0.26603-1.4098-0.81019-0.41772-0.55625-0.41772-1.6083 0-1.3181 0.64398-2.0436 0.65268-0.73763 1.8188-0.73763 1.4185 0 2.0886 1.0278 0.46123 0.71345 0.46123 1.8743zm2.5672 2.3822v2.3459h3.5245v1.5478h-4.8559v-9.0209h4.6993v1.5478h-3.3678v2.0315h3.1155v1.5478zm5.9612-5.1271v7.4731h3.1068v1.5478h-4.4469v-9.0209zm5.439 0v7.4731h3.1068v1.5478h-4.4469v-9.0209z" display="none" stroke-width=".039392" style="white-space:pre" aria-label="SELL"/>    <path class="powerclip" d="m-5-5h42v42.001h-42zm15.026 13.624q0-1.1609-0.46123-1.8743-0.67009-1.0278-2.0886-1.0278-1.1661 0-1.8188 0.73763-0.64398 0.72554-0.64398 2.0436 0 1.052 0.41772 1.6083 0.41772 0.54416 1.4098 0.81019l0.90505 0.25394q0.67009 0.16929 0.94856 0.4716 0.27848 0.29022 0.27848 0.83437 0 0.56834-0.3568 0.89483-0.3481 0.32649-0.95727 0.32649-0.67879 0-1.053-0.38696-0.3742-0.38695-0.40901-1.1125h-1.2967q0.060917 1.4511 0.74841 2.225 0.69619 0.76182 1.9406 0.76182 1.2619 0 1.958-0.77391 0.7049-0.77391 0.7049-2.1524 0-1.0641-0.40901-1.6566-0.40031-0.59252-1.3054-0.83437l-1.0182-0.26603q-0.7136-0.19348-0.97467-0.43532-0.25237-0.25394-0.25237-0.74972 0-0.50788 0.30458-0.81019t0.81803-0.30231q1.288 0 1.3576 1.4148zm2.5672 2.3822h3.1155v-1.5478h-3.1155v-2.0315h3.3678v-1.5478h-4.6993v9.0209h4.8559v-1.5478h-3.5245zm5.9612-5.1271h-1.3402v9.0209h4.4469v-1.5478h-3.1068zm5.439 0h-1.3402v9.0209h4.4469v-1.5478h-3.1068z" stroke-width=".039392" style="white-space:pre"/>   </clipPath>  </defs>  <path d="m26.667 0h-21.334c-2.945 0-5.333 2.371-5.333 5.297v12.33c0 2.924 2.055 4.813 5 4.813h6.639l4.361 9.561 4.361-9.561h6.639c2.945 0 5-1.889 5-4.813v-12.33c0-2.926-2.388-5.297-5.333-5.297z" clip-path="url(#clipPath4)" fill-rule="evenodd"/> </svg>', Kh = '<svg width="493px" height="512px" clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 493 511.77" xmlns="http://www.w3.org/2000/svg"><path d="m33.11 458.2 104.5-79.1c3.09-3 7.08-4.47 11.08-4.45l302.6-0.08c2.67 0 5.09-1.08 6.78-2.77 1.74-1.81 2.84-4.24 2.84-6.87v-323.2c0-2.59-1.12-5-2.86-6.74-1.78-1.78-4.2-2.9-6.76-2.9h-409.56c-2.54 0-4.94 1.14-6.72 2.92s-2.92 4.18-2.92 6.72c0 793.72 1.02 39.329 1.02 416.47zm90.6-229.77c10.9 0 19.74 8.85 19.74 19.74s-8.84 19.73-19.74 19.73c-10.89 0-19.73-8.84-19.73-19.73s8.84-19.74 19.73-19.74zm0-101.14c10.9 0 19.74 8.85 19.74 19.74s-8.84 19.74-19.74 19.74c-10.89 0-19.73-8.85-19.73-19.74s8.84-19.74 19.73-19.74zm61.72 138.89c-9.95 0-18.02-8.07-18.02-18.01 0-9.95 8.07-18.02 18.02-18.02h185.56c9.95 0 18.01 8.07 18.01 18.02 0 9.94-8.06 18.01-18.01 18.01zm0-101.13c-9.95 0-18.02-8.07-18.02-18.02 0-9.94 8.07-18.01 18.02-18.01h185.56c9.95 0 18.01 8.07 18.01 18.01 0 9.95-8.06 18.02-18.01 18.02zm-30.38 241.61-125.97 99.69c-2.96 3.32-7.24 5.42-12.01 5.42-8.85 0-17.07-7.1228-17.07-15.963v-454.08c0-11.4 4.77-21.88 12.31-29.42s18.02-12.31 29.42-12.31h409.56c11.4 0 21.9 4.74 29.45 12.29 7.5 7.51 12.26 17.96 12.26 29.44v323.2c0 11.48-4.7 21.95-12.24 29.49-7.61 7.54-18.05 12.24-29.47 12.24z" fill-rule="nonzero"/></svg>', Zh = '<svg width="800px" height="800px" fill="none" version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m15.746 2.7281c-5.1207-2.0689-10.949 0.40512-13.018 5.5258-2.0689 5.1207 0.40512 10.949 5.5258 13.018 5.1207 2.0689 10.949-0.40508 13.018-5.5258 2.0689-5.1207-0.40508-10.949-5.5258-13.018zm-1.3378 8.3035-1.2703-0.51325c-0.21854-0.08829-0.32785-0.13246-0.3683-0.22775-0.04045-0.09529 0.0037-0.20461 0.09201-0.42314l1.6595-4.1073c0.33362-0.82575 0.50047-1.2387 0.33474-1.3523-0.16582-0.11359-0.49058 0.19103-1.1403 0.8003l-4.7426 4.4469c-1.0274 0.96338-1.541 1.445-1.4405 1.9835 0.10054 0.53837 0.75347 0.80216 2.0594 1.3298l1.2703 0.51325c0.21854 0.08829 0.32785 0.13246 0.3683 0.22775 0.04045 0.09529-0.0037 0.20461-0.09201 0.42314l-1.6595 4.1073c-0.33365 0.82582-0.50047 1.2387-0.33475 1.3523 0.16582 0.1136 0.49059-0.19104 1.1403-0.80025l4.7425-4.4469c1.0275-0.96346 1.5411-1.4451 1.4406-1.9836-0.10057-0.53838-0.75352-0.80218-2.0594-1.3298z" clip-rule="evenodd" fill-rule="evenodd"/></svg>', Qh = '<svg enable-background="new 0 0 100 100" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">  <g>   <rect transform="scale(-1)" x="-15" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-36.25" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.1s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-57.5" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.3s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-78.75" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.5s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-100" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.1s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>  </g> </svg>', Jh = '<svg version="1.1" id="L7" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">   <path fill="#fff" d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7  c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z">      <animateTransform         attributeName="transform"         attributeType="XML"         type="rotate"         dur="3s"         from="0 50 50"         to="360 50 50"         repeatCount="indefinite" />  </path> <path fill="#fff" d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5  L82,35.7z">      <animateTransform         attributeName="transform"         attributeType="XML"         type="rotate"         dur="2s"         from="0 50 50"         to="360 50 50"         repeatCount="indefinite" />  </path>   <path fill="#fff" d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3  c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z">      <animateTransform         attributeName="transform"         attributeType="XML"         type="rotate"         dur="1s"         from="0 50 50"         to="360 50 50"         repeatCount="indefinite" />  </path></svg>', We = 300, Ft = 400, ec = `${Ft}px`, eo = `${We}px`, to = "100%", io = "100%", Ve = 30, ot = 35, Ni = 25, so = 25, xs = Ni + so, Xt = 60, gt = "normal", yt = 12, es = "normal", vt = "Avenir, Helvetica, Arial, sans-serif", Xs = "#141414", js = "#333", Ks = "#cccccc", jt = "#888888", Ct = "#cccccc", no = "25px", tc = "position: relative;", H = {
  COLOUR_BG: Xs,
  COLOUR_BORDER: js,
  COLOUR_TXT: Ks,
  COLOUR_ICON: jt,
  COLOUR_ICONHOVER: Ct,
  BORDER_THICKNESS: 0,
  FONTWEIGHT: gt,
  FONTSIZE: yt,
  FONTSTYLE: es,
  FONTFAMILY: vt,
  FONT: `${es} ${yt}px ${gt} ${vt}`,
  FONTSTRING: `font-style: ${es}; font-size: ${yt}px; font-weight: ${gt}; font-family: ${vt};`
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
}, Ke = {
  COLOUR_ICON: jt,
  COLOUR_ICONHOVER: Ct,
  ICONSIZE: no
}, wt = {
  COLOUR_ICON: jt,
  COLOUR_ICONHOVER: Ct,
  ICONSIZE: no
}, ts = {
  COLOUR_BG: Xs,
  COLOUR_BORDER: js,
  COLOUR_TXT: Ks
}, nt = {
  COLOUR_BG: Xs,
  COLOUR_BORDER: js,
  COLOUR_TXT: Ks,
  SHADOW: "rgb(0,0,0) 0px 20px 30px -10px",
  CONTENT: "padding: 1em",
  TITLE: "padding: 2px 1em 5px; background: #333; white-space: nowrap;"
}, ic = {
  FILL: Ct + "88"
}, Z = {
  CANDLE_SOLID: "candle_solid",
  CANDLE_HOLLOW: "candle_hollow",
  CANDLE_UP_HOLLOW: "candle_up_hollow",
  CANDLE_DOWN_HOLLOW: "candle_down_hollow",
  OHLC: "ohlc",
  AREA: "area",
  LINE: "line"
}, di = {
  COLOUR_CANDLE_UP: "#00F04088",
  COLOUR_CANDLE_DN: "#F0004088",
  COLOUR_WICK_UP: "#0F4",
  COLOUR_WICK_DN: "#F04"
}, xi = {
  COLOUR_VOLUME_UP: "#00F04044",
  COLOUR_VOLUME_DN: "#F0004044",
  ONCHART_VOLUME_HEIGHT: 15
}, nr = gt, Ci = yt, Ti = vt, Oe = {
  COLOUR_TICK: "#888",
  COLOUR_LABEL: "888",
  COLOUR_CURSOR: "#000",
  COLOUR_CURSOR_BG: "#CCC",
  FONTFAMILY: Ti,
  FONTSIZE: Ci,
  FONTWEIGHT: nr,
  FONT_LABEL: `${nr} ${Ci}px ${Ti}`,
  FONT_LABEL_BOLD: `bold ${Ci}px ${Ti}`
}, rr = gt, or = yt, ar = vt, st = {
  COLOUR_TICK: "#888",
  COLOUR_LABEL: "888",
  COLOUR_CURSOR: "#000",
  COLOUR_CURSOR_BG: "#CCC",
  FONTFAMILY: ar,
  FONTSIZE: or,
  FONTWEIGHT: rr,
  FONT_LABEL: `${rr} ${or}px ${ar}`,
  FONT_LABEL_BOLD: `bold ${Ci}px ${Ti}`
}, ro = {
  COLOUR_GRID: "#222"
}, sc = {
  width: 1,
  stroke: "#ccc",
  dash: [1, 1]
}, is = {
  text: H.FONTSTRING,
  font: H.FONT,
  colour: H.COLOUR_TXT
}, mi = {
  ACTIVE: "#888888C0",
  IDLE: "#FFFFFF00",
  LINE: H.COLOUR_BORDER,
  STYLE: "1px solid"
}, nc = {
  FONTSIZE: 50,
  FONTWEIGHT: "bold",
  FONTFAMILY: H.FONTFAMILY,
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
}, ss = { arrowDown: Vh, arrowUp: Wh, arrowDownRound: Fh, arrowUpRound: Gh, arrowDownRoundSolid: qh, arrowUpRoundSolid: Yh, buySolid: Xh, sellSolid: jh }, lr = { noteSolid: Kh, lightning: Zh }, Bi = {
  candle: {
    Type: Z.CANDLE_SOLID,
    UpBodyColour: di.COLOUR_CANDLE_UP,
    UpWickColour: di.COLOUR_WICK_UP,
    DnBodyColour: di.COLOUR_CANDLE_DN,
    DnWickColour: di.COLOUR_WICK_DN
  },
  volume: {
    Height: xi.ONCHART_VOLUME_HEIGHT,
    UpColour: xi.COLOUR_VOLUME_UP,
    DnColour: xi.COLOUR_VOLUME_DN
  },
  xAxis: {
    colourTick: st.COLOUR_TICK,
    colourLabel: st.COLOUR_LABEL,
    colourCursor: st.COLOUR_CURSOR,
    colourCursorBG: st.COLOUR_CURSOR_BG,
    fontFamily: st.FONTFAMILY,
    fontSize: st.FONTSIZE,
    fontWeight: st.FONTWEIGHT,
    line: "#656565",
    slider: "#555555",
    handle: "#55555588",
    icon: jt,
    iconHover: Ct
  },
  yAxis: {
    colourTick: Oe.COLOUR_TICK,
    colourLabel: Oe.COLOUR_LABEL,
    colourCursor: Oe.COLOUR_CURSOR,
    colourCursorBG: Oe.COLOUR_CURSOR_BG,
    fontFamily: Oe.FONTFAMILY,
    fontSize: Oe.FONTSIZE,
    fontWeight: Oe.FONTWEIGHT,
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
    GridColour: ro.COLOUR_GRID
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
    font: is.font,
    colour: "#96a9db",
    handleColour: "#586ea6"
  },
  legend: {
    font: is.font,
    colour: is.colour,
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
    active: mi.ACTIVE,
    idle: mi.IDLE,
    line: mi.LINE,
    style: mi.STYLE
  },
  window: nt,
  watermark: nc,
  trades: {
    iconBuy: ss.arrowUp,
    iconSell: ss.arrowDown,
    iconHeight: 30,
    iconWidth: 30,
    iconMinDim: 10,
    buyColour: "#0f0",
    sellColour: "#f00",
    defaultIcons: ss,
    offset: 10
  },
  events: {
    iconEvent: lr.lightning,
    iconHeight: 30,
    iconWidth: 30,
    iconMinDim: 10,
    iconColour: "#ccc",
    defaultIcons: lr,
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
    min-height: var(--txc-min-height, ${eo});
    max-width: var(--txc-max-width, ${to});
    max-height: var(--txc-max-height, ${io});
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
`, ns = "Empty", lc = {
  id: void 0,
  title: ns,
  symbol: ns,
  width: to,
  height: io,
  utils: {},
  tools: {},
  timeFrame: "1m",
  range: {
    startTS: void 0
  },
  theme: Bi,
  watermark: {
    display: !1,
    text: ns
  },
  trades: {
    display: !0,
    displayInfo: !0
  },
  precision: cs,
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
function hc(o, e) {
  return o = Math.ceil(o) + 1, e = Math.floor(e), Math.floor(Math.random() * (e - o) + o);
}
function Cs(o) {
  const e = {};
  return e.value = o, e.sign = !!o, e.integers = oo(o), e.decimals = ao(o), e.total = e.integers + e.decimals, e;
}
function oo(o) {
  return (Math.log10((o ^ o >> 31) - (o >> 31)) | 0) + 1;
}
function cc(o) {
  return o | 0;
}
function de(o, e = 0) {
  var i = o * Math.pow(10, e), s = Math.round(i), n = (i > 0 ? i : -i) % 1 === 0.5 ? s % 2 === 0 ? s : s - 1 : s;
  return n / Math.pow(10, e);
}
function ao(o) {
  if (typeof o != "number" && (o = parseFloat(o)), isNaN(o) || !isFinite(o))
    return 0;
  for (var e = 1, i = 0; Math.round(o * e) / e !== o && (e *= 10, e !== 1 / 0); )
    i++;
  return i;
}
function Ts(o, e = cs) {
  let { sign: i, integers: s, decimals: n, value: r } = o;
  e = isNaN(e) ? cs : e, n = n > e ? e : n, r = new Number(r).toFixed(n);
  let a = `${r}`, l = "", h = 0, m = 0;
  return i = i ? 0 : 1, i > 0 && (l += "-", h++), s == 0 ? (l += "0", h++) : (l += a.slice(h, s), h += s), n != 0 && (l += `${a.slice(h)}`, s <= 1 ? m = n : s > 3 ? m = 2 : s >= 2 && (m = 4)), l = Number.parseFloat(l).toFixed(m), l;
}
function uc(o) {
  return Math.log(o) / Math.log(10);
}
function k(o, e, i) {
  return Math.min(i, Math.max(e, o));
}
class lo {
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
    return cc(e);
  }
  numDigits(e) {
    return oo(e);
  }
  countDigits(e) {
    return Cs(e);
  }
  precision(e) {
    return ao(e);
  }
}
class Si extends lo {
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
    }, s = Bs(e.rangeDuration);
    i.units = s;
    for (let f in s)
      if (s[f] > 0) {
        i.units = [f, f], i.timeSpan = `${s[f]} ${f}`;
        break;
      }
    const n = e.interval, { xStep: r, rank: a } = this.xStep(e), l = this.pixel2T(this.width) + r;
    let h = e.timeMin - e.timeMin % r - r, m = h;
    for (; h < l; ) {
      let f = wi(h, "years"), v = wi(h, "months"), T = wi(h, "days");
      !(f in i.entries) && f >= m ? i.entries[f] = [this.dateTimeValue(f, n, a), this.t2Pixel(f), f, "major"] : !(v in i.entries) && v >= m ? i.entries[v] = [this.dateTimeValue(v, n, a), this.t2Pixel(v), v, "major"] : !(T in i.entries) && T >= m && (i.entries[T] = [this.dateTimeValue(T, n, a), this.t2Pixel(T), T, "major"]), i.entries[h] = [this.dateTimeValue(h, n, a), this.t2Pixel(h), h, "minor"], h += r;
    }
    return i.values = Object.values(i.entries), i;
  }
  xStep(e) {
    let i = vh, s = this.#i ? e.interval : 1, n = Bt[0], r = de(this.width / e.Length), a = gs[0], l = Bt.indexOf(s);
    for (; l-- >= 0 && !(r * (Bt[l] / s) >= i); )
      ;
    return n = Bt[l], a = gs[l], { xStep: n, rank: a };
  }
  dateTimeValue(e, i, s) {
    if (e / $ % 1 === 0) {
      const n = Ws(e);
      return n === 1 ? Fs(e) === 0 ? Kr(e) : Xr(e) : n;
    } else
      switch (s) {
        case "milliseconds":
          return ws(e);
        case "seconds":
          return ws(e);
        case "minutes":
          return vs(e);
        case "hours":
          return vs(e);
      }
  }
}
class Ei extends lo {
  #e;
  #t;
  #i;
  #r = De[0];
  #s = "automatic";
  #n = {
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
  #h = Kn;
  #l = yh;
  #a = 3;
  #c;
  #d;
  #u;
  constructor(e, i, s = De[0], n) {
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
    this.#r = De.includes(e) ? e : De[0];
  }
  get yAxisType() {
    return this.#r;
  }
  set yAxisStep(e) {
    this.#h = x(e) ? e : Kn;
  }
  get yAxisStep() {
    return this.#h;
  }
  set yAxisTicks(e) {
    this.#a = x(e) ? e : 0;
  }
  get yAxisTicks() {
    return this.#a;
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
        return de(this.$2Pixel(uc(e)));
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
    const i = this.#n;
    return this.mode == "automatic" && e == "manual" ? (i.manual.zoom = 0, i.manual.max = this.#u.valueMax, i.manual.min = this.#u.valueMin, this.#s = e, this.core.emit("yaxis_setmode", { mode: e, axis: this })) : this.mode == "manual" && e == "automatic" && (i.manual.zoom = 0, this.#s = e, this.core.emit("yaxis_setmode", { mode: e, axis: this })), !0;
  }
  setOffset(e) {
    if (!x(e) || e == 0 || this.#s !== "manual")
      return !1;
    const i = this.#n;
    let s = this.pixel2$(e * -1), n = this.pixel2$(this.height - e), r = s - n;
    i.manual.min = n, i.manual.max = s, i.manual.mid = r / 2, i.manual.diff = r, i.manual.zoom = 0;
  }
  setZoom(e) {
    if (!x(e) || this.#s !== "manual")
      return !1;
    const i = this.#n;
    let s = i.manual.min, n = i.manual.max;
    const r = n - s, a = r * 0.01, l = e * a;
    s -= l, n += l, !(n < s || s <= 1 / 0 * -1 || n >= 1 / 0) && (i.manual.max = n, i.manual.min = s, i.manual.mid = r / 2, i.manual.diff = r, i.manual.zoom = l, this.calcGradations());
  }
  setRange(e) {
    this.#n.automatic.range = e, this.#u = new Proxy(e, {
      get: (i, s) => {
        const n = this.#s, r = this.#n;
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
    let n, r, a;
    const l = [];
    r = e - i, r = this.rangeH > 0 ? this.rangeH : 1, a = r / (this.height / (this.core.theme.yAxis.fontSize * 1.75));
    let h = Math.pow(10, Math.ceil(Math.log10(a)));
    a < 0.25 * h ? h = 0.25 * h : a < 0.5 * h && (h = 0.5 * h);
    var m = Math.ceil(i / h) * h, f = Math.floor(e / h) * h;
    let v = this.height, T = (f - m) / h;
    this.height / T;
    let E = this.countDigits(h), M;
    this.#d = E;
    for (var D = m; D <= f; D += h)
      n = this.countDigits(D), M = Ts(n, this.core.core.pricePrecision), v = this.yPos(M), l.push([M, v, n]);
    return l;
  }
}
function Zs(o, e) {
  return Math.round(o.measureText(e).width);
}
function Et(o = Ce.fontSize, e = Ce.fontWeight, i = Ce.fontFamily) {
  return `${e} ${o}px ${i}`;
}
function Ui(o, e, i) {
  o.font = Et(i?.fontSize, i?.fontWeight, i?.fontFamily);
  const s = Zs(o, e), n = i?.paddingLeft || 0, r = i?.paddingRight || 0, a = i?.borderWidth || 0;
  return n + r + s + a * 2;
}
function zi(o) {
  const e = o?.paddingTop || 0, i = o?.paddingBottom || 0, s = o?.borderWidth || 0, n = o?.fontSize || 0;
  return e + i + n + s * 2;
}
function ho(o, e, i, s) {
  o.fillStyle = s?.colour, o.font = Et(s?.fontSize, s?.fontWeight, s?.fontFamily), o.textAlign = s?.textAlign || "start", o.textBaseline = s?.textBaseLine || "alphabetic", o.direction = s?.direction || "inherit", o.lineWidth = s?.width, o.strokeStyle = s?.border, s?.stroke ? o.strokeText(s?.text, e, i, s?.max) : o.fillText(s?.text, e, i, s?.max);
}
function Tt(o, e, i, s, n) {
  o.save(), o.font = Et(n?.fontSize, n?.fontWeight, n?.fontFamily), o.textBaseline = "top", o.fillStyle = n?.bakCol || Ce.bakCol;
  let r = n?.width || Ui(o, e, n), a = n?.height || zi(n);
  o.fillRect(i, s, r, a), o.fillStyle = n?.txtCol || Ce.txtCol, i = i + n?.paddingLeft, s = s + n?.paddingTop, o.fillText(`${e}`, i, s), o.restore();
}
function co(o, e, i, s, n, r) {
  o.lineWidth = r?.width || Ce.borderWidth, o.strokeStyle = r?.border || Ce.stroke, o.beginPath(), o.rect(e, i, s, n), o.stroke();
}
function Qs(o, e, i, s, n, r) {
  o.fillStyle = r?.fill || Ce.fill, o.fillRect(e, i, s, n);
}
function dc(o, e, i, s, n, r) {
  C(r.fill) && Qs(o, e, i, s, n, r), x(r.width) && r.width > 0 && co(o, e, i, s, n, r);
}
function uo(o, e, i, s, n, r, a) {
  o.lineWidth = a?.width || Ce.borderWidth, o.strokeStyle = a?.border || Ce.stroke, po(o, e, i, s, n, r), o.stroke();
}
function mo(o, e, i, s, n, r, a) {
  o.fillStyle = a?.fill || Ce.fill, po(o, e, i, s, n, r), o.fill();
}
function po(o, e, i, s, n, r) {
  o.beginPath(), o.moveTo(e + r, i), o.arcTo(e + s, i, e + s, i + n, r), o.arcTo(e + s, i + n, e, i + n, r), o.arcTo(e, i + n, e, i, r), o.arcTo(e, i, e + s, i, r), o.closePath();
}
function mc(o, e, i, s, n, r, a) {
  C(a.fill) && mo(o, e, i, s, n, r, a?.fill), x(a.width) && a.width > 0 && uo(o, e, i, s, n, r, a?.border, a?.width);
}
function mt(o, e = [], i = []) {
  let [s, n, r, a] = e;
  const l = o.createLinearGradient(s, n, r, a);
  let h = 0;
  for (let m of i)
    l.addColorStop(h++, m);
  o.fillStyle = l;
}
function ct(o, e, i, s) {
  C(e) && (o.fillStyle = e, o.fill()), x(s) && s > 0 && (o.lineWidth = s, o.strokeStyle = i || Ce.stroke, o.stroke());
}
function fo(o, e, i, s, n, r, a) {
  if (!(n < 3)) {
    var l = Math.PI * 2 / n;
    o.beginPath(), o.translate(e, i), o.rotate(r * Math.PI / 180), o.moveTo(s, 0);
    for (var h = 1; h < n; h++)
      o.lineTo(s * Math.cos(l * h), s * Math.sin(l * h));
    o.closePath(), ct(o, a?.fill, a?.stroke, a?.width);
  }
}
function pc(o, e, i) {
  if (e.length > 0) {
    o.beginPath();
    var s = e[0];
    o.moveTo(s.x, s.y);
    for (var n = 1; n < e.length; ++n)
      s = e[n], o.lineTo(s.x, s.y);
    o.closePath(), ct(o, i?.fill, i?.stroke, i?.width);
  }
}
function fc(o, e, i, s, n) {
  fo(o, e, i, s, 3, n?.rotate || 0, n), ct(o, n?.fill, n?.stroke, n?.width);
}
function gc(o, e, i, s, n, r) {
  o.beginPath(), o.moveTo(e - s / 2, i), o.lineTo(e, i - n / 2), o.lineTo(e + s / 2, i), o.lineTo(e, i + n / 2), o.closePath(), ct(o, r?.fill, r?.stroke, r?.width);
}
function Pt(o, e, i, s = () => {
}) {
  o.save();
  const n = i.width || 1;
  o.lineWidth = n, n % 2 && o.translate(0.5, 0.5), o.strokeStyle = i.stroke, P(i.dash) && o.setLineDash(i.dash), o.beginPath();
  let r = !0;
  e.forEach((a) => {
    a && a.x !== null && (r ? (o.moveTo(a.x, a.y), r = !1) : o.lineTo(a.x, a.y));
  }), N(s) && s(), o.restore();
}
function yc(o, e, i) {
  Pt(o, e, i, () => {
    o.stroke();
  });
}
function vc(o, e, i, s) {
  Pt(o, e, i, () => {
    o.closePath();
  }), ct(o, s?.fill, s?.stroke, s?.size);
}
function wc(o, e, i) {
  o.beginPath(), o.moveTo(e[0].x, e[0].y);
  for (var s = i ?? 1, n = 0; n < e.length - 1; n++) {
    var r = n > 0 ? e[n - 1] : e[0], a = e[n], l = e[n + 1], h = n != e.length - 2 ? e[n + 2] : l, m = a.x + (l.x - r.x) / 6 * s, f = a.y + (l.y - r.y) / 6 * s, v = l.x - (h.x - a.x) / 6 * s, T = l.y - (h.y - a.y) / 6 * s;
    o.bezierCurveTo(m, f, v, T, l.x, l.y);
  }
  o.stroke();
}
function Kt(o, e, i, s, n) {
  Pt(o, [{ x: i, y: e }, { x: s, y: e }], n, () => {
    o.stroke(), o.closePath();
  });
}
function bc(o, e, i, s, n) {
  const r = [{ x: e, y: i }, { x: e, y, bottom: s }];
  Pt(o, r, n, () => {
    o.stroke(), o.closePath();
  });
}
function xc(o, e, i) {
  Pt(o, e, i, () => {
    o.stroke(), o.closePath();
  });
}
function Cc(o, e, i, s, n) {
  o.beginPath(), o.arc(e, i, s, 0, Math.PI * 2), o.closePath(), ct(o, n?.fill, n?.stroke, n?.width);
}
function go(o, e, i, s, n, r) {
  for (let a = 0; a < i; a++)
    for (let l = 0; l < s; l++)
      l % 2 == 0 && a % 2 == 0 || l % 2 != 0 && a % 2 != 0 ? o.fillStyle = n : o.fillStyle = r, o.fillRect(l * e, a * e, e, e);
}
function Tc(o) {
  return o.ownerDocument && o.ownerDocument.defaultView && o.ownerDocument.defaultView.devicePixelRatio || 2;
}
function yo(o, e, i, s, n, r, a, l, h, m) {
  o.drawImage(e, i, s, n, r, a, l, h, m);
}
function vo(o, e) {
  let i = o.naturalWidth || o.width, s = o.naturalHeight || o.height;
  return e === void 0 && (e = wo(i, s)), e.ctx.drawImage(o, 0, 0), e;
}
const Sc = {
  red: "#FF0000FF",
  green: "#00FF00FF",
  blue: "#0000FFFF",
  alpa: "#000000FF"
};
function Ut(o, e) {
  const i = vo(e), s = i.ctx;
  return s.fillStyle = Sc[o], s.globalCompositeOperation = "multiply", s.fillRect(0, 0, s.canvas.width, s.canvas.height), s.globalCompositeOperation = "destination-in", s.drawImage(e, 0, 0), s.globalCompositeOperation = "source-over", i;
}
function Ec(o) {
  return {
    red: Ut("red", o),
    green: Ut("green", o),
    blue: Ut("blue", o),
    alpha: Ut("alpha", o)
  };
}
function wo(o, e) {
  const i = document.createElement("canvas");
  return i.ctx = i.getContext("2d", { willReadFrequently: !0 }), i.width = o || i.ctx.canvas.width, i.height = e || i.ctx.canvas.height, i;
}
const B = {
  createCanvas: wo,
  imageToCanvas: vo,
  separateRGB: Ec,
  getChannel: Ut,
  getPixelRatio: Tc,
  fillStroke: ct,
  linearGradient: mt,
  calcTextWidth: Zs,
  createFont: Et,
  getTextRectHeight: zi,
  getTextRectWidth: Ui,
  renderImage: yo,
  renderText: ho,
  renderTextBG: Tt,
  renderPath: Pt,
  renderPathStroke: yc,
  renderPathClosed: vc,
  renderSpline: wc,
  renderLine: xc,
  renderLineHorizontal: Kt,
  renderLineVertical: bc,
  renderCircle: Cc,
  renderRect: dc,
  renderRectFill: Qs,
  renderRectStroke: co,
  renderRectRound: mc,
  renderRectRoundFill: mo,
  renderRectRoundStroke: uo,
  renderPolygonRegular: fo,
  renderPolygonIrregular: pc,
  renderDiamond: gc,
  renderTriangle: fc,
  renderCheckerBoard: go
};
class U {
  static isOverlay = !0;
  #e;
  #t;
  #i = {};
  #r;
  #s;
  #n;
  #o;
  #h;
  #l;
  #a;
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
    this.#t = r.core, this.#e = r, this.#i = r.core.config, this.#o = e, this.#h = e.scene, this.#l = e.hit, this.#s = i, this.#n = s, this.#a = a, this.on("global_resize", this.onResize, this);
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
    return this.#a;
  }
  get range() {
    return this.#t.range;
  }
  get state() {
    return this.#t.state;
  }
  get scene() {
    return this.#h;
  }
  get hit() {
    return this.#l;
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
    return this.#a.overlay;
  }
  get overlayData() {
    return this.#a.overlay.data;
  }
  get data() {
    return this.#a.overlay.data;
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
    this.#t.hub.expunge(this), "overlay" in this.#a && "data" in this.#a.overlay && delete this.#a.overlay.data;
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
    return this.#s instanceof Si ? this.#s : this.core.Chart.time.xAxis instanceof Si ? this.core.Chart.time.xAxis : "time" in this.#e ? this.#e.time.xAxis : !1;
  }
  getYAxis() {
    return this.#n instanceof Ei ? this.#n : this.chart.yAxis instanceof Ei ? this.chart.yAxis : "scale" in this.#e ? this.#e.scale.yAxis : !1;
  }
  contextIs() {
    return !this.#s && !this.#n ? "chart" : this.#s instanceof Si ? "timeline" : this.#n instanceof Ei ? "scale" : !1;
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
class Ss {
  #e = Oi;
  #t = "1s";
  indexStart = 0;
  indexEnd = ui;
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
  initialCnt = Qn;
  limitFuture = ui;
  limitPast = Jn;
  minCandles = er;
  maxCandles = tr;
  yAxisBounds = Zn;
  rangeLimit = ui;
  anchor;
  #i;
  #r;
  #s = !0;
  constructor(e, i, s = {}) {
    if (!w(s) || !(s?.core instanceof O))
      return !1;
    this.#s = !0, this.setConfig(s), this.#i = s.core, e = x(e) ? e : 0, i = x(i) ? i : this.data.length - 1, `${this.maxMinPriceVol.toString()}`;
    const n = s?.interval || Oi;
    if (this.data.length == 0) {
      let r = Date.now();
      e = 0, i = this.rangeLimit, this.#e = n, this.#t = Wt(this.interval), this.anchor = r - r % n;
    } else
      this.data.length < 2 ? (this.#e = n, this.#t = Wt(this.interval)) : (this.#e = Es(this.data), this.#t = Wt(this.interval));
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
    this.initialCnt = x(e?.initialCnt) ? e.initialCnt : Qn, this.limitFuture = x(e?.limitFuture) ? e.limitFuture : ui, this.limitPast = x(e?.limitPast) ? e.limitPast : Jn, this.minCandles = x(e?.minCandles) ? e.minCandles : er, this.maxCandles = x(e?.maxCandles) ? e.maxCandles : tr, this.yAxisBounds = x(e?.yAxisBounds) ? e.yAxisBounds : Zn;
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
    let l = i.length - 1, h = oe(s, 0, l), m = oe(n, 0, l), f = i[h][3], v = i[h][2], T = i[h][5], E = i[h][5], M = h, D = h, re = h, me = h;
    for (; h++ < m; )
      i[h][3] < f && (f = i[h][3], M = h), i[h][2] > v && (v = i[h][2], D = h), i[h][5] < T && (T = i[h][5], re = h), i[h][5] > E && (E = i[h][5], me = h);
    let _ = v - f, I = f, L = v;
    return f -= _ * r.yAxisBounds, f = f > 0 ? f : 0, v += _ * r.yAxisBounds, _ = v - f, {
      valueLo: I,
      valueHi: L,
      valueMin: f,
      valueMax: v,
      valueDiff: v - f,
      volumeMin: T,
      volumeMax: E,
      volumeDiff: E - T,
      valueMinIdx: M,
      valueMaxIdx: D,
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
function Es(o) {
  let e = Math.min(o.length - 1, 99), i = 1 / 0;
  return o.slice(0, e).forEach((s, n) => {
    let r = o[n + 1][0] - s[0];
    r === r && r < i && (i = r);
  }), i;
}
function Ps(o, e) {
  if (!x(e))
    return !1;
  let i, s = o.timeFrameMS;
  return e = e - e % s, e === o.range.data[0][0] ? i = 0 : e < o.range.data[0][0] ? i = (o.range.data[0][0] - e) / s * -1 : i = (e - o.range.data[0][0]) / s, i;
}
const hr = /^#?([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i, cr = /^hsla?((\d{1,3}?),\s*(\d{1,3}%),\s*(\d{1,3}%)(,\s*[01]?\.?\d*)?)$/, ur = /^hsla[(]\s*0*(?:[12]?\d{1,2}|3(?:[0-5]\d|60))\s*(?:\s*,\s*0*(?:\d\d?(?:\.\d+)?\s*%|\.\d+\s*%|100(?:\.0*)?\s*%)){2}\s*,\s*0*(?:\.\d+|1(?:\.0*)?)\s*[)]$/, dr = /^rgba?((\d{1,3}%?),\s*(\d{1,3}%?),\s*(\d{1,3}%?)(,\s*[01]?\.?\d*)?)$/, mr = /^^rgba[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*,){3}\s*0*(?:\.\d+|1(?:\.0*)?)\s*[)]$/;
class Js {
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
    this.#t(e), hr.test(e) && this.#i(e), cr.test(e) && this.#r(e), ur.test(e) && this.#s(e), dr.test(e) && this.#n(e), mr.test(e) && this.#o(e);
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
    if (ll) {
      let i = document.getElementById("divValidColourTest");
      i || (i = document.createElement("div"), i.id = "divValidColourTest"), i.style.backgroundColor = "", i.style.backgroundColor = e, this.#e.isValid = !!i.style.backgroundColor.length, i.remove();
    } else
      this.#e.isValid = !!(hr.test(e) || cr.test(e) || ur.test(e) || dr.test(e) || mr.test(e));
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
  #r(e) {
    this.#e.hsl = e;
  }
  #s(e) {
    this.#e.hsla = e;
  }
  #n(e) {
    this.#e.rgb = e, this.#v(rgba);
  }
  #o(e) {
    this.#e.rgba = e, this.#v(e);
  }
  #h(e) {
    let { r: i, g: s, b: n, a: r } = this.#m(e);
    return i.length == 1 && (i = "0" + i), s.length == 1 && (s = "0" + s), n.length == 1 && (n = "0" + n), r.length == 1 && (r = "0" + r), this.value.r = i, this.value.g = s, this.value.b = n, this.value.a = r, this.setHex([i, s, n, r]), this;
  }
  #l(e) {
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
  #m(e) {
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
  #v(e) {
    let i, s, n = 0, r = [], a = [], l = e.replace(/\s/g, "").match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i);
    l.shift();
    for (let h of l)
      s = h.indexOf("%") > -1, i = parseFloat(h), n < 3 && s ? i = Math.round(255 * i / 100) : n == 3 && (!s && i >= 0 && i <= 1 ? i = Math.round(255 * i) : s && i >= 0 && i <= 100 ? i = Math.round(255 * i / 100) : i = ""), r[n] = (i | 256).toString(16).slice(1), a[n++] = i;
    this.setHex(r), this.setRGBA(a), this.#u(this.#e.hexa);
  }
}
function lt(o, e) {
  return !w(o) || !w(e) ? e : (Object.keys(e).forEach((i) => {
    const s = o[i], n = e[i];
    Array.isArray(s) && Array.isArray(n) ? o[i] = lt(s.concat([]), n) : w(s) && w(n) ? o[i] = lt(Object.assign({}, s), n) : o[i] = n;
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
function bo(o, e, i) {
  const [s, ...n] = e.split(".");
  return {
    ...o,
    [s]: n.length ? bo(o[s], n.join("."), i) : i
  };
}
function pr(o, e) {
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
function Pc(o, e, i) {
  let s = o[e];
  o.splice(e, 1), o.splice(i, 0, s);
}
function Mc(o, e, i) {
  [o[e], o[i]] = [o[i], o[e]];
}
function xo(o, e) {
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
function J(o = "ID") {
  x(o) ? o = o.toString() : C(o) || (o = "ID"), o = Te(o);
  const e = Date.now().toString(36), i = Math.random().toString(36).substring(2, 5);
  return `${o}_${e}_${i}`;
}
function Te(o) {
  return String(o).replace(/ |,|;|:|\.|#/g, "_");
}
const Lc = (o) => o.entries().next().value, Ac = (o) => o.entries().next().value[0], Oc = (o) => o.entries().next().value[1], Nc = (o) => [...o].pop(), Dc = (o) => [...o.keys()].pop(), Ic = (o) => [...o.values()].pop();
class Se extends Map {
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
    return Lc(this);
  }
  firstKey() {
    return Ac(this);
  }
  firstValue() {
    return Oc(this);
  }
  lastEntry() {
    return Nc(this);
  }
  lastKey() {
    return Dc(this);
  }
  lastValue() {
    return Ic(this);
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
    return Mc(s, e, i), this.populate(s), !0;
  }
  swapKeys(e, i) {
    const s = [...this], n = s.findIndex(([a]) => a === e), r = s.findIndex(([a]) => a === i);
    return [s[n], s[r]] = [s[r], s[n]], this.clear(), s.forEach(([a, l]) => this.set(a, l)), !0;
  }
}
function Ie(o, e = 100, i, s = !1) {
  let n;
  return function() {
    let r = i || this, a = arguments, l = function() {
      n = null, s || o.apply(r, a);
    }, h = s && !n;
    clearTimeout(n), n = setTimeout(l, e), h && o.apply(r, a);
  };
}
function Rc(o, e = 250, i) {
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
class Fe {
  static opened = new Fe("opened");
  static closed = new Fe("closed");
  constructor(e) {
    this.name = e;
  }
}
class K {
  #e;
  #t;
  #i;
  #r;
  #s = Fe.closed;
  #n;
  #o;
  #h;
  #l;
  #a;
  #c;
  #d;
  #u;
  #m = {};
  #v;
  #f;
  #M;
  #w;
  #p = !1;
  #x = {};
  #S = "";
  #g = "";
  #b = {};
  static windowList = {};
  static windowCnt = 0;
  static class = On;
  static name = "Windows";
  static type = "Window";
  static currentActive = null;
  static stylesInstalled = !1;
  static defaultStyles = `
  /** default Window widget styles */

  .tradeXwindow {
    border: 1px solid ${nt.COLOUR_BORDER};
    border-radius: 5px;
    box-shadow: ${nt.SHADOW};
    background: ${nt.COLOUR_BG};
    color: ${nt.COLOUR_TXT};
  }

  .tradeXwindow .dragBar {
    cursor: grab;
  }

  .tradeXwindow .dragBar:hover {
    background: #222;
  }

  .tradeXwindow .dragBar .title {
    ${nt.TITLE}
  }

  .tradeXwindow .content {
    ${nt.CONTENT}
  }
 
  `;
  static create(e, i) {
    return i.id = i?.id || J("window"), i.id = `${i.id}_${++K.windowCnt}`, i.type = i?.type || K.type, i.class = i?.class || "window", K.windowList[i.id] = new K(e, i), K.windowList[i.id];
  }
  static destroy(e) {
    e in K.windowList && (K.windowList[e].destroy(), delete K.windowList[e]);
  }
  static defaultNode() {
    return `
      <div slot="widget" class="${On}" style=""></div>
    `;
  }
  constructor(e, i) {
    this.#t = e, this.#i = i.core || i.parent.core, this.#r = i, this.#e = i.id, this.#n = i.parent, this.#h = e.elements.elWindows, this.#o = this.#i.elWidgetsG, this.mount(this.#h);
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
    return this.#n;
  }
  get config() {
    return this.#r;
  }
  set config(e) {
    this.#r = e;
  }
  get theme() {
    return this.#i.theme;
  }
  get state() {
    return this.#s;
  }
  get dimensions() {
    return ne(this.#l);
  }
  set dimensions(e) {
    this.setDimensions(e);
  }
  get type() {
    return K.type;
  }
  get el() {
    return this.#l;
  }
  get elDragBar() {
    return this.#a;
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
    return this.#S;
  }
  set title(e) {
    this.setTitle(e);
  }
  get content() {
    return this.#g;
  }
  set content(e) {
    this.setContent(e);
  }
  get contentFields() {
    return this.#b;
  }
  setTitle(e) {
    return C(e) ? (this.#r.title = e, this.#c.innerHTML = e, this.#c) : !1;
  }
  setContent(e, i = {}) {
    if (!C(e) || !w(i))
      return !1;
    this.#r.content = e, this.#u.innerHTML = e;
    for (let s in i)
      N(i[s]) && i[s](this.#u);
    return this.#b = this.allContentFields(), this.#u;
  }
  start() {
    this.eventsListen(), this.#r?.openNow !== !0 && this.setClose();
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
    if (!this.#l.contains(e.target) && ht(this.#l) && !this.#p) {
      let i = {
        target: e.currentTarget.id,
        window: this.#e
      };
      this.emit("window_close", i), this.emit(`window_close_${this.parent.id}`, i), document.removeEventListener("click", this.#x.click), delete this.#x.click;
    }
  }
  onCloseWindow(e) {
    e.window === this.#e && this.close();
  }
  onWindow(e) {
    e.stopPropagation();
  }
  onDragBar(e) {
    this.#p = !0;
    let i = this.#l.offsetLeft + e.movement.x, s = this.#l.offsetTop + e.movement.y;
    this.position({ x: i, y: s });
  }
  onDragBarEnd(e) {
    setTimeout(() => {
      this.#p = !1;
    }, 250);
  }
  mount(e) {
    e.lastElementChild == null ? e.innerHTML = this.windowNode() : e.lastElementChild.insertAdjacentHTML("afterend", this.windowNode()), this.#l = this.#h.querySelector(`#${this.#r.id}`), this.#a = this.#l.querySelector(".dragBar"), this.#c = this.#l.querySelector(".title"), this.#d = this.#l.querySelector(".closeIcon"), this.#u = this.#l.querySelector(".content"), this.#b = this.allContentFields(), this.#l.addEventListener("click", this.onWindow.bind(this)), Y(this.#a) && (this.#w = new $e(this.#a, { disableContextMenu: !1 }), this.#w.on("pointerdrag", this.onDragBar.bind(this)), this.#w.on("pointerdragend", this.onDragBarEnd.bind(this)));
    const i = this.dimensions, s = this.#r?.w || i.w, n = this.#r?.h || i.h;
    this.setDimensions({ w: s, h: n }), this.position();
  }
  windowNode() {
    const e = this.#r;
    let i = "position: absolute; z-index: 100; display: block;", s = e.dragBar ? this.dragBar() : "", n = !e.dragBar && e.title ? this.titleNode() : "", r = this.contentNode(), a = this.closeIcon();
    return `
      <!-- ${this.constructor.type} ${this.parent.id} -->
      <div id="${e.id}" class="${Ua} ${e.class}" style="${i}">
          ${s}
          ${n}
          ${a}
          ${r}
        </div>
      </div>
    `;
  }
  contentNode() {
    const e = this.#r;
    let i = "", s = e?.content ? e.content : "";
    return `
      <div class="content" style="${i}">
        ${s}
      </div>
    `;
  }
  dragBar() {
    const e = this.#r, i = "cursor: grab;", s = `onmouseover="this.style.background ='#222'"`, n = `onmouseout="this.style.background ='none'"`;
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
    this.#r?.styles?.closeIcon;
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
    let r = this.#m?.iPos?.width !== n.width || this.#m.x100 ? s.width * this.#m.x100 : Math.round((n.width - s.width) / 2), a = this.#m?.iPos?.height !== n.height || this.#m.y100 ? s.height * this.#m.y100 : Math.round((n.height + s.height) / -2), l = Nr(this.#l, "z-index");
    if (w(e)) {
      let { x: T, y: E, z: M } = { ...e };
      x(T) && (r = T), x(E) && (a = E), x(M) && (l = M), this.#m = { x: T, y: E, z: l };
    }
    this.#l.style["z-index"] = `${l}`;
    const h = this.#l.clientWidth;
    r + h * i > this.#o.offsetWidth ? r = this.#o.offsetWidth - h * i : r < (h - h * i) * -1 && (r = (h - h * i) * -1);
    const m = this.#l.clientHeight;
    a < n.height * -1 ? a = n.height * -1 : a > m * i * -1 && (a = m * i * -1), r = Math.floor(r), a = Math.floor(a), this.#l.style.left = `${r}px`, this.#l.style.top = `${a}px`;
    const f = r / s.width, v = a / s.height;
    this.#m = {
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
    x(e?.w) && (this.#l.style.width = `${e.w}px`), x(e?.h) && (this.#l.style.height = `${e.h}px`);
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
    K.currentActive = this, this.#s = Fe.opened, this.#l.style.display = "block", this.#l.style.zindex = "10", this.#l.classList.add("active");
  }
  setClose() {
    K.currentActive = null, this.#s = Fe.closed, this.#l.style.display = "none", this.#l.classList.remove("active"), document.removeEventListener("click", this.#x.click);
  }
  remove() {
    return K.destroy(this.id);
  }
  open(e = {}) {
    return K.currentActive === this && this.state === Fe.opened || (this.setOpen(), this.setProperties(e), this.emit("window_opened", this.id), this.emit(`window_opened_${this.parent.id}`, this.id), setTimeout(() => {
      this.#x.click = this.onOutsideClickListener.bind(this), document.addEventListener("click", this.#x.click);
    }, e?.offFocus || 250)), !0;
  }
  close() {
    return this.#s !== Fe.closed && (this.setClose(), this.emit("window_closed", this.id), this.emit(`window_closed_${this.parent.id}`, this.id)), !0;
  }
}
class Ee extends U {
  static #e = 0;
  static get cnt() {
    return ++Ee.#e;
  }
  static get isIndicator() {
    return !0;
  }
  #t;
  #i;
  #r;
  #s;
  #n;
  #o;
  #h;
  #l;
  #a;
  #c;
  #d;
  #u;
  #m;
  #v = "indicator";
  #f;
  #M;
  #w = [0, 0];
  #p;
  #x;
  #S = 2;
  #g = {};
  #b;
  #T;
  #E;
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
    this.#i = U.cnt, this.#d = a, this.#u = l, this.#f = this.core.TALib, this.#M = this.xAxis.range, this.id = l?.id || J(this.shortName), this.legendName = l?.legendName, this.#o = F(l?.legendVisibility) ? l.legendVisibility : !0, this.style = l?.settings?.style ? { ...this.constructor.defaultStyle, ...l.settings.style } : { ...this.constructor.defaultStyle, ...n.style };
    const h = { title: `${this.legendName} Config`, content: "", params: l, parent: this };
    this.#E = this.core.WidgetsG.insert("ConfigDialogue", h);
  }
  get id() {
    return this.#t || `${this.core.id}-${this.chartPaneID}-${this.shortName}-${this.#i}`;
  }
  set id(e) {
    this.#t = Te(new String(e));
  }
  get chartPane() {
    return this.core.ChartPanes.get(this.chartPaneID);
  }
  get chartPaneID() {
    return this.#d.overlay.paneID;
  }
  get primaryPane() {
    return this.#h || this.constructor.primaryPane;
  }
  set primaryPane(e) {
    this.#h = e;
  }
  get scaleOverlay() {
    return this.#a;
  }
  set scaleOverlay(e) {
    this.#a = e;
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
    return this.#v;
  }
  get overlay() {
    return this.#u;
  }
  get legend() {
    return this.chart.legend.list[this.#b];
  }
  get legendID() {
    return this.#b;
  }
  get legendName() {
    return this.#n || this.shortName || this.#t;
  }
  set legendName(e) {
    this.setLegendName(e);
  }
  set legendVisibility(e) {
    this.setLegendVisibility(e);
  }
  get indicator() {
    return this.#m;
  }
  get TALib() {
    return this.#f;
  }
  get range() {
    return this.core.range;
  }
  set setNewValue(e) {
    this.#p = e;
  }
  set setUpdateValue(e) {
    this.#x = e;
  }
  set precision(e) {
    this.#S = e;
  }
  get precision() {
    return this.#S;
  }
  set style(e) {
    w(e) && (this.#g = e);
  }
  get style() {
    return this.#g;
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  get isIndicator() {
    return Ee.isIndicator;
  }
  get isPrimary() {
    return this.chart.isPrimary;
  }
  get status() {
    return this.#T;
  }
  get configDialogue() {
    return this.#E;
  }
  set value(e) {
    const i = this.core.time.timeFrameMS;
    let s = Math.floor(new Date(e[ve.t]) / i) * i;
    e[ve.t] = s, this.#w[ve.t] !== e[ve.t] ? (this.#w[ve.t] = e[ve.t], this.#p(e)) : this.#x(e);
  }
  get value() {
    return this.#w;
  }
  setLegendName(e) {
    this.#n = C(e) ? e : this.shortName || this.#t, this.chart.legend.modify(this.#b, { legendName: e });
  }
  setLegendVisibility(e) {
    this.#o = !!e, this.chart.legend.modify(this.#b, { legendVisibility: !!e });
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
    }, this.addLegend(), this.#E.start(), this.eventsListen();
  }
  destroy() {
    if (this.#T !== "destroyed") {
      if (!this.chartPane.indicatorDeleteList[this.id]) {
        this.core.warn(`Cannot "destroy()": ${this.id} !!! Use "indicator.remove()" or "chart.removeIndicator()" instead.`);
        return;
      }
      this.core.hub.expunge(this), this.chart.legend.remove(this.#b), this.clear(), this.core.MainPane.draw(void 0, !0), this.chartPane.graph.removeOverlay(this.id), super.destroy(), this.core.state.removeIndicator(this.id), this.#T = "destroyed";
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
    this.on(Ze, this.onStreamUpdate, this), this.on(`window_opened_${this.id}`, this.onConfigDialogueOpen, this), this.on(`window_closed_${this.id}`, this.onConfigDialogueCancel, this), this.on(`window_submit_${this.id}`, this.onConfigDialogueSubmit, this), this.on(`window_cancel_${this.id}`, this.onConfigDialogueCancel, this), this.on(`window_default_${this.id}`, this.onConfigDialogueDefault, this);
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
    if (console.log(`${this.id} Config Open`), this.#E.state === Fe.opened)
      return;
    this.#E.setOpen();
    const i = this.#E.contentFields;
    for (let s in i)
      for (let n of i[s])
        n.classList.contains("subject") && n.getAttribute("data-oldval") !== n.value && n.setAttribute("data-oldval", n.value);
  }
  onConfigDialogueSubmit(e) {
    console.log(`${this.id} Config Submit`), this.#E.setClose();
    let i, s = !1;
    const n = this.#E.contentFields;
    for (let r in n)
      for (let a of n[r])
        a.classList.contains("subject") && (a.setAttribute("data-oldval", a.value), i = this.setDefinitionValue(a.id, a.value), s = s || i == "input");
    s && (this.overlay.data.length = 0, this.calcIndicatorHistory()), this.setRefresh(), this.draw();
  }
  onConfigDialogueCancel(e) {
    this.#E.setClose();
    const i = this.#E.contentFields;
    for (let s in i)
      for (let n of i[s])
        n.classList.contains("subject") && (n.value = n.getAttribute("data-oldval"));
    this.setRefresh(), this.draw(), console.log(`${this.id} Config Cancel`);
  }
  onConfigDialogueDefault(e) {
    console.log(`${this.id} Config Default`);
    const i = this.#E.contentFields;
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
    const s = this.#E;
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
          let h = new Js(n);
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
    this.#b = this.chart.legend.add(e);
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
    if (s instanceof Ss)
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
    if (!this.core.TALibReady || !C(e) || !(e in this.TALib) || !(s instanceof Ss) || s.dataLength < this.definition.input.timePeriod)
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
const kc = {
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
}, _c = {
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
}, Hc = {
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
}, $c = {
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
}, Uc = {
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
}, Vc = {
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
}, Co = {
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
}, Wc = {
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
}, Fc = {
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
}, Gc = {
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
}, Yc = {
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
}, Xc = {
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
}, To = {
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
}, jc = {
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
}, Kc = {
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
}, Zc = {
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
}, Qc = {
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
}, Jc = {
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
}, eu = {
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
}, tu = {
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
}, iu = {
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
}, su = {
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
}, nu = {
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
}, ru = {
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
}, ou = {
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
}, au = {
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
}, lu = {
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
}, hu = {
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
}, cu = {
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
}, uu = {
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
}, du = {
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
}, mu = {
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
}, pu = {
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
}, gu = {
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
}, yu = {
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
}, vu = {
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
}, wu = {
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
}, xu = {
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
}, Cu = {
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
}, Tu = {
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
}, Su = {
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
}, Eu = {
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
}, Pu = {
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
}, Mu = {
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
}, Lu = {
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
}, Au = {
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
}, Ou = {
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
}, Nu = {
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
}, Du = {
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
}, Iu = {
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
}, Ru = {
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
}, ku = {
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
}, _u = {
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
}, Hu = {
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
}, $u = {
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
}, Uu = {
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
}, Vu = {
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
}, Wu = {
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
}, Fu = {
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
}, Gu = {
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
}, Yu = {
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
}, Xu = {
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
}, ju = {
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
}, Ku = {
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
}, Zu = {
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
}, Qu = {
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
}, Ju = {
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
}, ed = {
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
}, td = {
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
}, id = {
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
}, sd = {
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
}, nd = {
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
}, rd = {
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
}, od = {
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
}, ad = {
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
}, ld = {
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
}, hd = {
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
}, cd = {
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
}, ud = {
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
}, dd = {
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
}, So = {
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
}, md = {
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
}, pd = {
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
}, fd = {
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
}, gd = {
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
}, yd = {
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
}, vd = {
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
}, wd = {
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
}, bd = {
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
}, xd = {
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
}, Cd = {
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
}, Td = {
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
}, Sd = {
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
}, Ed = {
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
}, Pd = {
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
}, Md = {
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
}, Ld = {
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
}, Ad = {
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
}, Od = {
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
}, Nd = {
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
}, Id = {
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
}, Rd = {
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
}, kd = {
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
}, _d = {
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
}, Hd = {
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
}, $d = {
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
}, Bd = {
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
}, Ud = {
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
}, zd = {
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
}, Vd = {
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
}, Wd = {
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
}, Fd = {
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
}, Gd = {
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
}, qd = {
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
}, Yd = {
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
}, Xd = {
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
}, jd = {
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
}, Kd = {
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
}, Zd = {
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
}, Qd = {
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
}, Jd = {
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
}, e0 = {
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
}, t0 = {
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
}, i0 = {
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
}, s0 = {
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
}, Eo = {
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
}, n0 = {
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
}, r0 = {
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
}, o0 = {
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
}, a0 = {
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
}, Po = {
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
}, l0 = {
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
}, h0 = {
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
}, Mo = {
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
}, c0 = {
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
}, u0 = {
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
}, d0 = {
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
}, m0 = {
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
}, p0 = {
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
}, f0 = {
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
}, g0 = {
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
}, y0 = {
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
}, v0 = {
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
}, w0 = {
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
}, b0 = {
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
}, x0 = {
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
}, C0 = {
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
}, T0 = {
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
}, S0 = {
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
}, E0 = {
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
}, P0 = {
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
}, M0 = {
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
}, rp = {
  ACCBANDS: kc,
  ACOS: _c,
  AD: Hc,
  ADD: $c,
  ADOSC: Bc,
  ADX: Uc,
  ADXR: zc,
  APO: Vc,
  AROON: Co,
  AROONOSC: Wc,
  ASIN: Fc,
  ATAN: Gc,
  ATR: qc,
  AVGDEV: Yc,
  AVGPRICE: Xc,
  BBANDS: To,
  BETA: jc,
  BOP: Kc,
  CCI: Zc,
  CDL2CROWS: Qc,
  CDL3BLACKCROWS: Jc,
  CDL3INSIDE: eu,
  CDL3LINESTRIKE: tu,
  CDL3OUTSIDE: iu,
  CDL3STARSINSOUTH: su,
  CDL3WHITESOLDIERS: nu,
  CDLABANDONEDBABY: ru,
  CDLADVANCEBLOCK: ou,
  CDLBELTHOLD: au,
  CDLBREAKAWAY: lu,
  CDLCLOSINGMARUBOZU: hu,
  CDLCONCEALBABYSWALL: cu,
  CDLCOUNTERATTACK: uu,
  CDLDARKCLOUDCOVER: du,
  CDLDOJI: mu,
  CDLDOJISTAR: pu,
  CDLDRAGONFLYDOJI: fu,
  CDLENGULFING: gu,
  CDLEVENINGDOJISTAR: yu,
  CDLEVENINGSTAR: vu,
  CDLGAPSIDESIDEWHITE: wu,
  CDLGRAVESTONEDOJI: bu,
  CDLHAMMER: xu,
  CDLHANGINGMAN: Cu,
  CDLHARAMI: Tu,
  CDLHARAMICROSS: Su,
  CDLHIGHWAVE: Eu,
  CDLHIKKAKE: Pu,
  CDLHIKKAKEMOD: Mu,
  CDLHOMINGPIGEON: Lu,
  CDLIDENTICAL3CROWS: Au,
  CDLINNECK: Ou,
  CDLINVERTEDHAMMER: Nu,
  CDLKICKING: Du,
  CDLKICKINGBYLENGTH: Iu,
  CDLLADDERBOTTOM: Ru,
  CDLLONGLEGGEDDOJI: ku,
  CDLLONGLINE: _u,
  CDLMARUBOZU: Hu,
  CDLMATCHINGLOW: $u,
  CDLMATHOLD: Bu,
  CDLMORNINGDOJISTAR: Uu,
  CDLMORNINGSTAR: zu,
  CDLONNECK: Vu,
  CDLPIERCING: Wu,
  CDLRICKSHAWMAN: Fu,
  CDLRISEFALL3METHODS: Gu,
  CDLSEPARATINGLINES: qu,
  CDLSHOOTINGSTAR: Yu,
  CDLSHORTLINE: Xu,
  CDLSPINNINGTOP: ju,
  CDLSTALLEDPATTERN: Ku,
  CDLSTICKSANDWICH: Zu,
  CDLTAKURI: Qu,
  CDLTASUKIGAP: Ju,
  CDLTHRUSTING: ed,
  CDLTRISTAR: td,
  CDLUNIQUE3RIVER: id,
  CDLUPSIDEGAP2CROWS: sd,
  CDLXSIDEGAP3METHODS: nd,
  CEIL: rd,
  CMO: od,
  CORREL: ad,
  COS: ld,
  COSH: hd,
  DEMA: cd,
  DIV: ud,
  DX: dd,
  EMA: So,
  EXP: md,
  FLOOR: pd,
  HT_DCPERIOD: fd,
  HT_DCPHASE: gd,
  HT_PHASOR: yd,
  HT_SINE: vd,
  HT_TRENDLINE: wd,
  HT_TRENDMODE: bd,
  IMI: xd,
  KAMA: Cd,
  LINEARREG: Td,
  LINEARREG_ANGLE: Sd,
  LINEARREG_INTERCEPT: Ed,
  LINEARREG_SLOPE: Pd,
  LN: Md,
  LOG10: Ld,
  MA: Ad,
  MACD: Od,
  MACDEXT: Nd,
  MACDFIX: Dd,
  MAMA: Id,
  MAVP: Rd,
  MAX: kd,
  MAXINDEX: _d,
  MEDPRICE: Hd,
  MFI: $d,
  MIDPOINT: Bd,
  MIDPRICE: Ud,
  MIN: zd,
  MININDEX: Vd,
  MINMAX: Wd,
  MINMAXINDEX: Fd,
  MINUS_DI: Gd,
  MINUS_DM: qd,
  MOM: Yd,
  MULT: Xd,
  NATR: jd,
  OBV: Kd,
  PLUS_DI: Zd,
  PLUS_DM: Qd,
  PPO: Jd,
  ROC: e0,
  ROCP: t0,
  ROCR: i0,
  ROCR100: s0,
  RSI: Eo,
  SAR: n0,
  SAREXT: r0,
  SIN: o0,
  SINH: a0,
  SMA: Po,
  SQRT: l0,
  STDDEV: h0,
  STOCH: Mo,
  STOCHF: c0,
  STOCHRSI: u0,
  SUB: d0,
  SUM: m0,
  T3: p0,
  TAN: f0,
  TANH: g0,
  TEMA: y0,
  TRANGE: v0,
  TRIMA: w0,
  TRIX: b0,
  TSF: x0,
  TYPPRICE: C0,
  ULTOSC: T0,
  VAR: S0,
  WCLPRICE: E0,
  WILLR: P0,
  WMA: M0
};
class L0 extends Ee {
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
  static scale = De[1];
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
    super(e, i, s, n, r, a), this.init(Co);
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
class A0 extends Ee {
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
    super(e, i, s, n, r, a), this.init(To);
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
class en extends Ee {
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
    super(e, i, s, n, r, a), en.inCnt++, this.init(So);
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
class O0 extends Ee {
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
  static scale = De[1];
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
    super(e, i, s, n, r, a), this.init(Eo);
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
class tn extends Ee {
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
    super(e, i, s, n, r, a), tn.inCnt++, this.init(Po);
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
class N0 extends Ee {
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
  static scale = De[1];
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
    super(e, i, s, n, r, a), this.init(Mo);
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
class Lo {
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
class sn extends Ee {
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
  static scale = De[1];
  constructor(e, i = !1, s = !1, n, r, a) {
    super(e, i, s, n, r, a), sn.inCnt++;
    const l = a.overlay;
    this.id = a.overlay?.id || J(this.shortName), this.#e = { ...this.defaultStyle, ...this.theme.volume }, this.style = l?.settings?.style ? { ...this.#e, ...l.settings.style } : { ...this.#e, ...n.style }, this.chart.type === "primaryPane" ? (this.style.Height = k(this.style.Height, 0, 100) || 100, this.#i = !0) : (this.style.Height = 100, this.#i = !1), this.#t = new Lo(e.scene, this.style), this.init();
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
const Ao = {
  AROON: { id: "AROON", name: "Aroon", event: "addIndicator", ind: L0 },
  BB: { id: "BB", name: "Bollinger Bands", event: "addIndicator", ind: A0 },
  EMA: { id: "EMA", name: "Exponential Moving Average", event: "addIndicator", ind: en },
  RSI: { id: "RSI", name: "Relative Strength Index", event: "addIndicator", ind: O0 },
  SMA: { id: "SMA", name: "Simple Moving Average", event: "addIndicator", ind: tn },
  STOCH: { id: "STOCH", name: "Stochastic Oscillator", event: "addIndicator", ind: N0 },
  VOL: { id: "VOL", name: "Volume", event: "addIndicator", ind: sn }
}, nn = "0.143.1";
class D0 {
  #e;
  #t;
  #i;
  #r = [];
  constructor(e, i) {
    this.#e = e, this.#t = C(i.id) ? i.id : J, this.#i = C(i.type) ? i.type : "default", this.#r = P(i.data) ? i.data : [];
  }
}
function I0(o, e = !1) {
  if (!P(o))
    return !1;
  let i = hc(0, o.length);
  if (!Mi(o[0], e) || !Mi(o[i], e) || !Mi(o[o.length - 1], e))
    return !1;
  let s = o[0][0], n = o[1][0], r = o[2][0];
  return !(s > n && n > r);
}
function R0(o, e = !1) {
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
function k0(o, e) {
  if (!P(o) || o.length == 1)
    return !1;
  let i, s, n, r, a = [], l = 0, h = (o[o.length - 1][0] - o[l][0]) / e;
  for (; l < h; )
    i = o[l][0], s = o[l + 1][0], n = s - i, n == e ? a.push(o[l]) : n > e && (r = [i + e, null, null, null, null, null], a.push(r), o.splice(l + 1, 0, r)), l++;
  return o;
}
function Mi(o, e = !1) {
  return !(!P(o) || o.length !== 6 || e && !Wr(o[0]) || !x(o[1]) || !x(o[2]) || !x(o[3]) || !x(o[4]) || !x(o[5]));
}
function _0(o) {
  for (let e of o)
    for (let i = 0; i < 6; i++)
      e.length = 6, e[i] *= 1;
  return o;
}
const H0 = "defaultState", $0 = {
  version: nn,
  id: H0,
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
    tf: gh,
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
}, gr = {
  timestamp: "number",
  id: "string",
  title: "string",
  content: "string",
  url: "string"
};
class R {
  static #e = new Se();
  static #t = {};
  static get default() {
    return he($0);
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
    if (w(e) || (e = {}), w(e.chart) || (e.chart = n.chart, e.chart.isEmpty = !0, e.chart.data = P(e.ohlcv) ? e.ohlcv : [], delete e.ohlcv), e = lt(n, e), i ? e.chart.data = R0(e.chart.data, s) ? e.chart.data : [] : e.chart.data = I0(e.chart.data, s) ? e.chart.data : [], e.chart.isEmpty = e.chart.data.length == 0, !x(e.chart?.tf) || i) {
      let h = Es(e.chart.data);
      h < V && (h = Oi), e.chart.tfms = h;
    }
    if ((!C(e.chart?.tfms) || i) && (e.chart.tf = Wt(e.chart.tfms)), P(e.views) || (e.views = n.views), P(e.primary) || (e.primary = n.primary), P(e.secondary) || (e.secondary = n.secondary), w(e.chart.settings) || (e.chart.settings = n.chart.settings), P(e.datasets) || (e.datasets = []), e.views.length == 0) {
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
    e.views.length == 0 && (e.views[0] = ["primary", n.primary]), e.views = new Se(e.views), e.views.has("primary") || e.views.insert("primary", n.primary, 0), e.views.get("primary").push(e.chart);
    for (var l of e.datasets)
      this.#t || (this.#t = {}), this.dss[l.id] = new D0(this, l);
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
    switch (a.length > 0 && a[a.length - 1].length > 6 && (a.length = a.length - 1), r.views.get("primary").pop(), r.views = Array.from(r.views), r.version = nn, n) {
      case "json":
      default:
        const { replacer: h, space: m } = { ...i };
        l = JSON.stringify(r, h, m);
    }
    return l;
  }
  #i = "";
  #r = "";
  #s = {};
  #n;
  #o = !1;
  #h = !0;
  #l = [];
  constructor(e, i = !1, s = !1) {
    w(e) ? (this.#s = R.validate(e, i, s), this.#o = "valid", this.#h = !!this.#s.chart?.isEmpty, this.#n = e?.core instanceof O ? e.core : void 0) : (this.#s = R.default, this.#o = "default", this.#h = !0), this.#i = e?.id || "", this.#r = J(`${Vt}_state`);
  }
  get id() {
    return this.#i;
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
      primaryPane: this.#s.primary,
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
    this.#i = s.id, this.#o = s.status, this.#h = s.isEmpty, this.#s = s.data;
    const n = {
      interval: s.data.chart.tfms,
      core: i
    };
    if (i.getRange(null, null, n), this.range.Length > 1) {
      const r = Ps(i.time, void 0), a = r ? r + this.range.initialCnt : s.data.length - 1, l = r || a - this.range.initialCnt;
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
    if (n > 1 && this.time.timeFrameMS !== Es(e?.ohlcv))
      return this.error(`ERROR: ${this.core.id}: merge data time frame does not match existing time frame!`), !1;
    (this.#h || !x(this.time.timeFrameMS)) && (!w(i) || !x(i.start) || !x(i.end)) && n > 1 && (i = { start: n - this.range.initialCnt, end: n }), w(i) ? (x(i?.startTS) ? i.start = i.startTS : i.start = x(i.start) ? this.range.value(i.start)[0] : this.range.timeMin, x(i?.endTS) ? i.end = i.endTS : i.end = x(i.end) ? this.range.value(i.end)[0] : this.range.timeMax) : (i = {}, i.start = this.range.timeMin, i.end = this.range.timeMax);
    let r, a, l = e?.ohlcv || !1;
    const h = this.allData.data, m = this.allData?.primaryPane, f = e?.primary || !1, v = this.allData?.secondaryPane, T = e?.secondary || !1, E = this.allData?.dataset?.data, M = e?.dataset?.data || !1;
    this.allData?.trades, e?.trades, this.allData?.events, e?.events;
    const D = P(l) && this.range.inRange(l[0][0]) ? 1 : 0, re = {};
    if (P(l) && l.length > 0) {
      if (r = l.length - 1, h.length - 1, re.mData = this.range.inRange(l[0][0]) && this.range.inRange(l[0][r]), !F(l[r][7]) && l[r].length !== 8 && l[r][6] !== null && l[r][7] !== !0 ? l = _0(l) : i.end >= this.range.timeFinish && i.start <= this.range.timeFinish && (i.start += this.range.interval, i.end += this.range.interval), h.length == 0)
        this.allData.data.push(...l);
      else {
        let I = this.time.timeFrameMS, L = l[0][0], oe = l[l.length - 1][0], X = (l.length - 1) * I;
        oe > L + X && (l = k0(l, I)), this.data.chart.data = this.merge(h, l);
      }
      if (s)
        this.#n.calcAllIndicators(s);
      else {
        if (P(f) && f.length > 0) {
          for (let I of f)
            if (P(I?.data) && I?.data.length > 0)
              for (let L of m)
                w(L) && L.name === I.name && L.type === I.type && Pi(L.settings, I.settings) && (L.data = this.merge(L.data, I.data), this.#n.getIndicator(L.id).drawOnUpdate = !0);
        }
        if (P(T) && T.length > 0) {
          for (let I of T)
            if (P(I?.data) && I?.data.length > 0)
              for (let L of v)
                w(L) && L.name === I.name && L.type === I.type && Pi(L.settings, I.settings) && (L.data = this.merge(L.data, I.data), this.#n.getIndicator(L.id).drawOnUpdate = !0);
        }
        this.#n.calcAllIndicators();
      }
      if (P(M) && M.length > 0) {
        for (let I of M)
          if (P(I?.data) && I?.data.length > 0)
            for (let L of E)
              L.name === I.name && L.type === I.type && Pi(L.settings, I.settings) && (L.data = this.merge(L.data, I.data));
      }
      i && (w(i) ? (a = x(i.start) ? this.range.getTimeIndex(i.start) : this.range.indexStart, n = x(i.end) ? this.range.getTimeIndex(i.end) : this.range.indexEnd) : (l[0][0] && (a = this.range.indexStart + D), n = this.range.indexEnd + D), this.#n.setRange(a, n));
      let me, _ = !1;
      for (me in re)
        _ = _ || me;
      return e.ohlcv.length > 1 && this.#n.emit("state_mergeComplete"), _ && this.#n.refresh(), this.#h = !1, !0;
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
    const i = Object.keys(e), s = Object.keys(fr);
    if (!w(e) || !Di(i, s))
      return !1;
    for (let a of s)
      if (typeof e[a] !== fr[a])
        return !1;
    const n = e.timestamp - e.timestamp % this.time.timeFrameMS, r = new Date(n);
    return e.dateStr = `${r.getFullYear()}/${r.getMonth() + 1}/${r.getDate()} ${r.getHours()}:${r.getMinutes()}`, P(this.allData.trades[n]) || (this.allData.trades[n] = []), this.allData.trades[n].push(e), !0;
  }
  removeTrade(e) {
    console.log("TODO: state.removeTrade()");
  }
  addEvent(e) {
    const i = Object.keys(e), s = Object.keys(gr);
    if (!w(e) || !Di(i, s))
      return !1;
    for (let a of s)
      if (typeof t[a] !== gr[a])
        return !1;
    const n = t.timestamp - t.timestamp % this.time.timeFrameMS, r = new Date(n);
    return e.dateStr = `${r.getFullYear()}/${r.getMonth() + 1}/${r.getDate()} ${r.getHours()}:${r.getMinutes()}`, P(this.allData.events[n]) || (this.allData.events[n] = []), this.allData.events[n].push(e), !0;
  }
  removeEvent(e) {
    console.log("TODO: state.removeEvent()");
  }
}
class Ge {
  #e;
  #t;
  #i;
  #r = {};
  #s;
  #n;
  #o = "stopped";
  #h;
  #l;
  #a;
  #c;
  #d = ["await", "idle", "running", "stopped"];
  constructor(e, i) {
    if (!Ge.validateConfig(e))
      return !1;
    const s = { ...e };
    this.id = s.id, this.#s = s, this.#t = s.initial, this.#r.origin = i, this.#c = s.actions, this.#n = i.core, this.#u();
  }
  set id(e) {
    this.#e = Te(e);
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
    return this.#r;
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
    return e ? this.#s.guards[e].call(this, this.#r, i, s) : !1;
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
    this.stop(), this.#m(), this.#s = null;
  }
  #u() {
    this.#h = /* @__PURE__ */ new Set();
    for (let e in this.#s.states)
      for (let i in this.#s.states[e].on) {
        let s = this.notify.bind(this, i);
        this.#h.add({ topic: i, cb: s }), this.#n.on(i, s, this.context);
      }
  }
  #m() {
    this.#n.hub.expunge(this.context), this.#h.clear();
  }
  static validateConfig(e) {
    if (!w(e))
      return !1;
    const i = ["id", "initial", "context", "states"];
    let s = Object.keys(e);
    if (!xo(i, s) || !(e.initial in e.states))
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
const B0 = "alert";
class U0 {
  #e = new Se();
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
    const n = J(B0), r = { price: e, condition: i };
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
const z0 = 0, V0 = 1, W0 = 2, F0 = 3, G0 = 4, q0 = 5, pi = [null, null, null, null, null], fi = {
  tfCountDown: !0,
  alerts: []
};
class bt {
  #e;
  #t;
  #i;
  #r;
  #s;
  #n;
  #o;
  #h = pi;
  #l = 0;
  #a = 0;
  #c = "";
  #d = !1;
  #u;
  #m;
  #v = pi;
  #f;
  static validateConfig(e) {
    if (w(e)) {
      let i = he(fi);
      e = lt(i, e), e.tfCountDown = F(e.tfCountDown) ? e.tfCountDown : fi.tfCountDown, e.alerts = P(e.alerts) ? e.alerts : fi.alerts;
    } else
      return fi;
    return e;
  }
  constructor(e) {
    this.#e = e, this.#r = e.time, this.status = { status: Va }, this.#t = bt.validateConfig(e.config?.stream), this.#s = x(e.config?.maxCandleUpdate) ? e.config.maxCandleUpdate : Ga, this.#o = x(e.config?.streamPrecision) ? e.config.streamPrecision : qa;
  }
  get config() {
    return this.#t;
  }
  get countDownMS() {
    return this.#a;
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
    this.#d || (this.#d = !0, this.status = { status: Ns, data: e });
  }
  get alerts() {
    return this.#f;
  }
  get lastPriceMin() {
    return this.#m;
  }
  set lastPriceMin(e) {
    x(e) && (this.#m = e);
  }
  get lastPriceMax() {
    return this.#u;
  }
  set lastPriceMax(e) {
    x(e) && (this.#u = e);
  }
  get lastTick() {
    return this.#v;
  }
  set lastTick(e) {
    P(e) && (this.#v, this.#v = e, this.alerts.check(e, this.#h));
  }
  set candle(e) {
    const i = [...this.#h];
    e.t = this.roundTime(new Date(e.t)), e.o = e.o * 1, e.h = e.h * 1, e.l = e.l * 1, e.c = e.c * 1, e.v = e.v * 1, this.#h[z0] !== e.t ? this.newCandle(e) : this.updateCandle(e), this.status = { status: yi, data: this.#h }, this.lastTick = i;
  }
  get candle() {
    return this.#h !== pi ? this.#h : null;
  }
  start() {
    this.#f = new U0(this.#t.alerts), this.status = { status: Dn }, this.#n = setInterval(this.onUpdate.bind(this), this.#s);
  }
  stop() {
    this.#f.destroy(), this.status = { status: Wa };
  }
  emit(e, i) {
    this.#e.emit(e, i);
  }
  error() {
    this.status = { status: Fa };
  }
  onTick(e) {
    (this.#i == Dn || this.#i == yi) && w(e) && (this.candle = e);
  }
  onUpdate() {
    this.#h !== pi && (this.status = { status: Ze, data: this.candle }, this.status = { status: yi, data: this.#h });
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
    ], this.#e.state.mergeData({ ohlcv: [this.#h] }, !0, !1), this.status = { status: Ds, data: { data: e, candle: this.#h } }, this.#a = this.#r.timeFrameMS, this.#l = this.roundTime(Date.now());
  }
  prevCandle() {
    const e = this.#e.allData.data;
    e.length > 0 && e[e.length - 1][7] && (e[e.length - 1].length = 6);
  }
  updateCandle(e) {
    let i = this.#h;
    i[V0] = e.o, i[W0] = e.h, i[F0] = e.l, i[G0] = e.c, i[q0] = e.v, this.#h = i;
    const s = this.#e.allData.data, n = s.length > 0 ? s.length - 1 : 0;
    s[n] = this.#h, this.countDownUpdate();
  }
  countDownUpdate() {
    let e, i, s, n, r, a, l;
    this.#r.timeFrameMS;
    let h = this.#r.timeFrameMS - (Date.now() - this.#l);
    return h < 0 && (h = 0), this.#a = h, h > xe ? (e = String(Math.floor(h / xe)), i = String(Math.floor(h % xe / ue)).padStart(2, "0"), this.#c = `${e}Y ${i}M`) : h > ue ? (i = String(Math.floor(h / ue)).padStart(2, "0"), n = String(Math.floor(h % ue / $)).padStart(2, "0"), this.#c = `${i}M ${n}D`) : h > xt ? (s = String(Math.floor(h / xt)).padStart(2, "0"), n = String(Math.floor(h % ue / $)).padStart(2, "0"), this.#c = `${s}W ${n}D`) : h > $ ? (n = String(Math.floor(h / $)).padStart(2, "0"), r = String(Math.floor(h % $ / Q)).padStart(2, "0"), a = String(Math.floor(h % Q / W)).padStart(2, "0"), this.#c = `${n}D ${r}:${a}`) : h > Q ? (r = String(Math.floor(h / Q)).padStart(2, "0"), a = String(Math.floor(h % Q / W)).padStart(2, "0"), l = String(Math.floor(h % W / V)).padStart(2, "0"), this.#c = `${r}:${a}:${l}`) : h > W ? (a = String(Math.floor(h / W)).padStart(2, "0"), l = String(Math.floor(h % W / V)).padStart(2, "0"), this.#c = `00:${a}:${l}`) : (l = String(Math.floor(h / V)).padStart(2, "0"), String(h % V).padStart(4, "0"), this.#c = `00:00:${l}`), this.#c;
  }
  roundTime(e) {
    return e - e % this.#e.time.timeFrameMS;
  }
}
const yr = ["constructor", "list", "setCurrent", "setTheme", "setValue"];
class Ae {
  static #e = new Se();
  static get list() {
    return Ae.#e;
  }
  #t;
  static create(e, i) {
    if (!w(e))
      return !1;
    e.id = C(e.name) ? J(e.name) : `${i.id}.theme`;
    const s = new Ae(e, i);
    return Ae.list.set(e.id, s), s;
  }
  constructor(e, i) {
    this.#t = i, this.setCurrent(e);
  }
  get list() {
    return Ae.list;
  }
  setCurrent(e = {}) {
    e = w(e) ? e : {};
    const i = he(Bi), s = he(e), n = lt(i, s);
    for (let r in n)
      yr.includes(r) || (this[r] = n[r]);
    this.#t.refresh();
  }
  setTheme(e) {
    if (C(e) && Ae.list.has(e)) {
      const i = Ae.list.get(e);
      return this.setCurrent(i), !0;
    }
    return !1;
  }
  setProperty(e, i) {
    if (!C(e))
      return;
    const s = pr(this, e), n = e.split(".");
    if (n.length == 1)
      this[n[0]] = i;
    else {
      let r = n.shift();
      this[r] = bo(this[r], n.join("."), i);
    }
    return this.#t.refresh(), s;
  }
  getProperty(e) {
    return pr(this, e);
  }
  deleteTheme(e) {
    return C(e) && Ae.list.has(e) ? (Ae.list.delete(e), !0) : !1;
  }
  exportTheme(e = {}) {
    w || (e = {});
    const i = e?.type, s = {};
    let n;
    for (let r in this)
      yr.includes(r) || (s[r] = this[r]);
    switch (i) {
      case "json":
      default:
        const { replacer: r, space: a } = { ...e };
        n = JSON.stringify(s, r, a);
    }
    return n;
  }
}
class Y0 {
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
class X0 {
  #e;
  #t;
  #i;
  #r = 0;
  #s = {};
  #n;
  constructor(e, i, s, n) {
    this.#e = e, this.#t = s, this.#i = n;
    const r = `
      ${Ne.ThreadWorker.toString()};
      const fn = ${i}
      const worker = new ThreadWorker(fn)
    `, a = new Blob([`;(async () => {${r}})().catch(e => {console.error(e)})`], { type: "text/javascript" }), l = URL.createObjectURL(a);
    this.#n = new Worker(l);
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
    return N(this.#t) ? this.#t(e) : e;
  }
  onerror(e) {
    return N(this.#i) ? this.#i(e) : e;
  }
  postMessage(e) {
    return new Promise((i, s) => {
      try {
        let n = this.req;
        this.#s[n] = { resolve: i, reject: s }, this.#n.postMessage({ r: n, data: e }), this.#n.onmessage = (r) => {
          const { r: a, status: l, result: h } = r.data;
          if (a in this.#s) {
            const { resolve: m, reject: f } = this.#s[a];
            delete this.#s[a], l ? m(this.onmessage(h)) : f(this.onerror({ r: a, result: h }));
          } else if (l == "resolved")
            this.onmessage(h);
          else
            throw new Error("Orphaned thread request ${r}");
        }, this.#n.onerror = (r) => {
          s(this.onerror(r));
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
class Ne {
  static #e = /* @__PURE__ */ new Map();
  static ThreadWorker = Y0;
  static Thread = X0;
  static create(e, i = "worker", s) {
    if (typeof window.Worker > "u")
      return !1;
    if (N(e))
      e = e.toString();
    else if (!C(e))
      return !1;
    return i = C(i) ? J(i) : J("worker"), Ne.#e.set(i, new Ne.Thread(i, e, s)), Ne.#e.get(i);
  }
  static destroy(e) {
    if (!C(e))
      return !1;
    Ne.#e.get(e).terminate(), Ne.#e.delete(e);
  }
  static end() {
    Ne.#e.forEach((e, i, s) => {
      Ne.destroy(i);
    });
  }
}
class Ht {
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
class ee extends HTMLElement {
  shadowRoot;
  template;
  id = J(Vt);
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
    super(), this.#e = new Ht(), this.template = e, this.shadowRoot = this.attachShadow({ mode: i });
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
    !["width", "height"].includes(i) || !C(e) || (x(e) ? (this.DOM[i] = e, e += "px") : C(e) ? e.match($t) || (e = "100%") : (this.DOM[i] = this.parentElement.getBoundingClientRect()[i], e = this.DOM[i] + "px"), this.style[i] = e);
  }
  getDims() {
    const e = this.getBoundingClientRect();
    for (let i in e) {
      const s = e[i];
      N(s) || (this.DOM[i] = s);
    }
    return this.DOM.visible = ht(this), this.DOM.viewport = Is(this), this.DOM;
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
    return this.#e instanceof Ht ? this.#e.on(e, i, s) : !1;
  }
  off(e, i, s = this) {
    return this.#e instanceof Ht ? this.#e.off(e, i, s) : !1;
  }
  expunge(e) {
    return this.#e instanceof Ht ? this.#e.expunge(e) : !1;
  }
  emit(e, i) {
    return this.#e instanceof Ht ? this.#e.emit(e, i) : !1;
  }
}
const rs = {
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
class rn {
  static #e;
  #t;
  #i;
  #r;
  #s;
  #n = { w: 0, h: 0 };
  #o = { w: 0, h: 0, x: 0, y: 0 };
  #h = { x: !1, y: !0 };
  #l;
  #a = { x: 0, drag: !1 };
  #c;
  #d;
  constructor(e) {
    this.#t = rn.#e++, this.#i = e.core, this.#r = Y(e.elContainer) ? e.elContainer : !1, this.#s = Y(e.elHandle) ? e.elHandle : !1, this.#d = N(e.callback) ? e.callback : !1, Y(this.#r) && Y(this.#s) && (this.mount(), this.eventsListen());
  }
  set cursor(e) {
    this.#s.style.cursor = e;
  }
  get cursor() {
    return this.#s.style.cursor;
  }
  eventsListen() {
    this.#c = new $e(this.#s, { disableContextMenu: !1 }), this.#c.on("mouseenter", Ie(this.onMouseEnter, 1, this, !0)), this.#c.on("mouseout", Ie(this.onMouseOut, 1, this, !0)), this.#c.on("drag", Rc(this.onHandleDrag, 100, this)), this.#c.on("enddrag", this.onHandleDragDone.bind(this)), this.#c.on("mousedown", Ie(this.onMouseDown, 100, this, !0)), this.#c.on("mouseup", this.onMouseUp.bind(this));
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
    e && (this.colour = new Js(e), this.#s.style.backgroundColor = this.colour.hex);
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
    this.#a.drag || (this.#a.drag = !0, this.#a.x = e.position.x), this.handlePos(e);
  }
  onHandleDragDone(e) {
    this.handlePos(e), this.#a.drag = !1;
  }
  mount() {
    this.#n.w = this.#r.getBoundingClientRect().width, this.#n.h = this.#r.getBoundingClientRect().height, this.#r.style.overflow = "hidden", this.#o.w = this.#s.getBoundingClientRect().width, this.#o.h = this.#s.getBoundingClientRect().height, this.#s.style.marginRight = 0, this.#s.style.position = "absolute";
  }
  handlePos(e) {
    let i = this.#i.range, s = parseInt(this.#s.style.marginLeft), n = this.#r.getBoundingClientRect().width, r = this.#s.getBoundingClientRect().width, a = n - r, l = e.position.x - this.#a.x, h = k(s + l, 0, a), m = (i.dataLength + i.limitFuture + i.limitPast) / n, f = Math.floor(h * m);
    this.setHandleDims(h, r), this.#i.jumpToIndex(f);
  }
  setHandleDims(e, i) {
    let s = this.#r.getBoundingClientRect().width;
    i = i || this.#s.getBoundingClientRect().width, e = e / s * 100, this.#s.style.marginLeft = `${e}%`, i = i / s * 100, this.#s.style.width = `${i}%`;
  }
}
const Oo = ["source-over", "source-atop", "source-in", "source-out", "destination-over", "destination-atop", "destination-in", "destination-out", "lighter", "copy", "xor", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], No = typeof OffscreenCanvas < "u";
let Do = class {
  #e = 0;
  constructor(e = {}) {
    if (!Y(e.container))
      throw new Error("Viewport container is not a valid HTML element.");
    this.container = e.container, this.layers = [], this.id = G.idCnt++, this.scene = new G.Scene(), this.setSize(e.width || 0, e.height || 0);
  }
  get OffscreenCanvas() {
    return No;
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
    return e instanceof Ms ? (this.layers.push(e), e.setSize(e.width || this.width, e.height || this.height), e.viewport = this, this) : !1;
  }
  removeLayer(e) {
    return e instanceof Ms ? (this.layers.splice(e.index, 1), !0) : !1;
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
      e.remove();
  }
  render(e = !1) {
    let { scene: i, layers: s } = this, n;
    i.clear();
    for (n of s)
      e && n.layers.length > 0 && n.render(e), n.visible && n.width > 0 && n.height > 0 && (i.context, Oo.includes(n?.composition) && (i.context.globalCompositeOperation = n.composition), i.context.globalAlpha = n.alpha, i.context.drawImage(
        n.scene.canvas,
        n.x,
        n.y,
        n.width,
        n.height
      ));
  }
};
class j0 extends Do {
  constructor(e = {}) {
    super(e);
    const i = this.scene.canvas, s = e.container;
    s?.hasCanvasSlot && (i.slot = "viewportCanvas"), s.innerHTML = "", s.appendChild(i), G.viewports.push(this);
  }
  destroy() {
    super.destroy(), this.container.innerHTML = "", G.viewports.splice(this.index, 1);
  }
}
class Ms {
  #e = 0;
  #t = 0;
  #i = 0;
  #r = 0;
  #s = 1;
  #n = !0;
  #o = null;
  viewport;
  constructor(e = {}) {
    this.id = G.idCnt++, this.hit = new G.Hit({
      layer: this,
      contextType: e.contextType,
      offscreen: !0
    }), this.scene = new G.Scene({
      layer: this,
      contextType: e.contextType,
      offscreen: !0
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
    x(e) && (this.#r = e);
  }
  get height() {
    return this.#r;
  }
  set alpha(e) {
    this.#s = x(e) ? k(e, 0, 1) : 1;
  }
  get alpha() {
    return this.#s;
  }
  set composition(e) {
    Oo.includes(e) && (this.#o = e);
  }
  get composition() {
    return this.#o;
  }
  set visible(e) {
    F(e) && (this.#n = e);
  }
  get visible() {
    return this.#n;
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
        Pc(n, this.index, r);
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
class K0 {
  #e = 0;
  #t = 0;
  constructor(e = { offscreen: !1 }) {
    this.id = G.idCnt++, this.layer = e.layer, this.contextType = e.contextType || "2d";
    const i = document.createElement("canvas");
    i.className = "scene-canvas", i.style.display = "block", e.width && e.height && this.setSize(e.width, e.height), No && e?.offscreen ? (this.canvas = i.transferControlToOffscreen(), this.offscreen = !0) : this.canvas = i, this.context = this.canvas.getContext(this.contextType);
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
    return Ro(e, i, this);
  }
  clear() {
    return Io(this);
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
class Z0 {
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
    return Ro(e, i, this, !1);
  }
  clear() {
    return Io(this);
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
function Io(o) {
  let e = o.context;
  return o.contextType === "2d" ? e.clearRect(
    0,
    0,
    o.width * G.pixelRatio,
    o.height * G.pixelRatio
  ) : e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT), o;
}
function Ro(o, e, i, s = !0) {
  return i.width = o, i.height = e, i.canvas.width = o * G.pixelRatio, i.canvas.height = e * G.pixelRatio, i.offscreen || (i.canvas.style.width = `${o}px`, i.canvas.style.height = `${e}px`), s && i.contextType === "2d" && G.pixelRatio !== 1 && i.context.scale(G.pixelRatio, G.pixelRatio), i;
}
const G = {
  idCnt: 0,
  viewports: [],
  pixelRatio: window && window.devicePixelRatio || 1,
  Node: Do,
  Viewport: j0,
  Layer: Ms,
  Scene: K0,
  Hit: Z0
}, be = G;
class Q0 {
  #e;
  #t;
  #i;
  #r;
  #s;
  constructor(e, i = []) {
    this.#i = e, this.#e = e.core, this.#r = new Se([...i]);
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
    return this.#i;
  }
  get layerConfig() {
    return this.#i.layerConfig().layerConfig;
  }
  get list() {
    return this.#r;
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
    if (this.#r.size != 0)
      for (let e of this.#r.keys())
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
    return this.#r.get(e);
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
      ), C(i.instance?.id) || (i.instance.id = e), this.#r.set(i.instance.id, i), i;
    } catch (n) {
      return s.remove(), i.instance = void 0, this.#r.delete(e), this.#e.error(`ERROR: Cannot instantiate ${e} overlay / indicator : It will not be added to the chart.`), this.#e.error(n), !1;
    }
  }
  removeOverlay(e) {
    if (this.#r.has(e)) {
      const i = this.#r.get(e);
      i.instance?.isIndicator || i.instance.destroy(), i.layer.remove(), this.#r.delete(e);
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
    if (i.save(), i.strokeStyle = this.core.theme.chart.GridColour || ro.COLOUR_GRID, e != "y") {
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
class Ls extends U {
  #e = [0, 0];
  #t = !0;
  #i;
  constructor(e, i = !1, s = !1, n, r, a) {
    super(e, i, s, n, r, a), this.core.on("main_mousemove", this.onMouseMoveX, this), this.#i = new $e(this.target.viewport.container, { disableContextMenu: !1 }), this.#i.on("pointermove", this.onMouseMove.bind(this)), this.#i.on("pointerenter", this.onMouseMove.bind(this));
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
class ko extends U {
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
const J0 = [
  ["grid", { class: Ii, fixed: !0 }],
  ["cursor", { class: Ls, fixed: !0 }]
];
class St {
  #e;
  #t;
  #i;
  #r;
  #s;
  #n;
  #o;
  #h;
  #l;
  #a;
  constructor(e, i, s, n = !1) {
    this.#r = e, this.#e = e.core, this.#t = this.core.config, this.#i = this.core.theme, this.#o = this.#r.element, this.#l = i, this.createViewport(s, n);
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
    this.#a = e || this.#o.width;
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
    return this.#s;
  }
  get overlays() {
    return this.#n;
  }
  destroy() {
    this.#n.destroy(), this.#s.destroy();
  }
  setSize(e, i, s) {
    const n = this.#n.list;
    this.#s.setSize(e, i);
    for (let [r, a] of n)
      a.instance.setSize(s, i);
    this.draw(), this.render();
  }
  createViewport(e = [], i = !1) {
    e = e.length == 0 ? he(J0) : e;
    const { width: s, height: n } = this.layerConfig();
    let r = i ? be.Node : be.Viewport;
    this.#s = new r({
      width: s,
      height: n,
      container: this.#l
    }), this.#h = this.#s.scene.canvas, this.#n = new Q0(this, e);
  }
  layerConfig() {
    const e = this.config?.buffer || $i, i = this.#l.getBoundingClientRect().width, s = this.#l.getBoundingClientRect().height;
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
    const i = this.#n.list;
    if (!(i instanceof Se))
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
class em extends U {
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
class tm extends U {
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
class im extends U {
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
const sm = [
  ["labels", { class: em, fixed: !1, required: !0 }],
  ["overlay", { class: tm, fixed: !1, required: !0 }],
  ["cursor", { class: im, fixed: !1, required: !0 }]
];
class nm {
  #e;
  #t = "Timeline";
  #i = "time";
  #r;
  #s;
  #n;
  #o;
  #h;
  #l;
  #a;
  #c;
  #d;
  #u = new Se();
  #m = [];
  #v;
  #f;
  #M;
  #w;
  #p;
  #x;
  #S;
  #g;
  #b;
  #T;
  #E;
  #O;
  #N;
  #C;
  #L = {
    width: 20,
    height: 20,
    fill: "#aaa"
  };
  #P = { end: !1, start: !1 };
  constructor(e, i) {
    this.#n = e, this.#r = i, this.#s = i.elements.elTime, this.#o = e.Chart, this.#h = new Si(this), this.init();
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
    this.#e = Te(e);
  }
  get id() {
    return this.#e || `${this.#n.id}-${this.#i}`;
  }
  get name() {
    return this.#t;
  }
  get shortName() {
    return this.#i;
  }
  get options() {
    return this.#r;
  }
  get core() {
    return this.#n;
  }
  get element() {
    return this.#s;
  }
  get elViewport() {
    return this.#a;
  }
  get height() {
    return this.#s.height;
  }
  set width(e) {
    this.setWidth(e);
  }
  get width() {
    return this.#s.width;
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
  get layerCursor() {
    return this.#b;
  }
  get layerLabels() {
    return this.#S;
  }
  get layerOverlays() {
    return this.#g;
  }
  get overlays() {
    return Object.fromEntries([...this.#d.overlays.list]);
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
    return this.#d;
  }
  get navigation() {
    return this.#v;
  }
  get range() {
    return this.#n.range;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return ne(this.#s);
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
    this.#l = new Ge(e, this);
  }
  get stateMachine() {
    return this.#l;
  }
  get time() {
    return this;
  }
  init() {
    const e = this.#s;
    this.#a = e.viewport, this.#c = e.overview, this.#f = e.overview.icons, this.#M = e.overview.scrollBar, this.#w = e.overview.handle, this.#p = e.overview.rwdStart, this.#x = e.overview.fwdEnd;
    const i = {
      core: this.#n,
      elContainer: this.#M,
      elHandle: this.#w,
      callback: null
    };
    this.#C = new rn(i), this.#n.theme?.time?.navigation === !1 && this.navigationDisplay(!1);
  }
  setWidth(e) {
    this.#s.style.width = `${e}px`, this.#a.style.width = `${e}px`;
  }
  setDimensions(e) {
    const i = this.config.buffer || $i, s = e.w, n = this.height, r = Math.round(s * ((100 + i) * 0.01));
    this.#d.setSize(s, n, r), this.draw();
  }
  navigationDisplay(e) {
    if (e)
      this.#x.style["margin-top"] = 0, this.#p.style["margin-top"] = 0;
    else {
      const i = this.core.theme.xAxis?.background ? this.core.theme.xAxis.Background : this.core.theme.chart.Background;
      this.#c.style.visibility = "hidden", this.#x.style["margin-top"] = `${this.#a.clientHeight * -1}px`, this.#p.style["margin-top"] = `${this.#a.clientHeight * -1}px`, this.#x.style.background = this.core.theme.chart.Background, this.#p.style.background = i;
    }
  }
  start() {
    this.createGraph(), this.onSetRange(), this.#h.initXAxisGrads(), this.draw(), this.eventsListen(), rs.id = this.id, rs.context = this, this.stateMachine = rs, this.stateMachine.start();
  }
  destroy() {
    this.stateMachine.destroy(), this.#T.destroy(), this.#E.destroy(), this.#O.destroy(), this.#n.hub.expunge(this), this.off("main_mousemove", this.#b.draw, this.#b), this.#x.removeEventListener("click", Ie), this.#p.removeEventListener("click", Ie), this.#d.destroy(), this.element.remove();
  }
  eventsListen() {
    this.#T = new $e(this.#a, { disableContextMenu: !1 }), this.#T.on("dblclick", this.onDoubleClick.bind(this)), this.#T.on("pointerover", this.onPointerEnter.bind(this)), this.#T.on("pointerout", this.onPointerLeave.bind(this)), this.#T.on("pointerdrag", this.onPointerDrag.bind(this)), this.#E = new $e(this.#x, { disableContextMenu: !1 }), this.#E.on("pointerover", () => this.showJump(this.#P.end)), this.#E.on("pointerleave", () => this.hideJump(this.#P.end)), this.#O = new $e(this.#p, { disableContextMenu: !1 }), this.#O.on("pointerover", () => this.showJump(this.#P.start)), this.#O.on("pointerleave", () => this.hideJump(this.#P.start)), this.on("main_mousemove", this.#b.draw, this.#b), this.on("setRange", this.onSetRange, this), this.#x.addEventListener("click", Ie(this.onPointerClick, 1e3, this, !0)), this.#p.addEventListener("click", Ie(this.onPointerClick, 1e3, this, !0));
  }
  on(e, i, s = this) {
    this.#n.on(e, i, s);
  }
  off(e, i, s = this) {
    this.#n.off(e, i, s);
  }
  emit(e, i) {
    this.#n.emit(e, i);
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
    e.domEvent.target.style.cursor = "ew-resize", this.#c.style.visibility = "visible", this.hideCursorTime();
  }
  onPointerLeave(e) {
    this.#n.theme?.time?.navigation === !1 && !(this.#P.end && this.#P.start) && (this.#c.style.visibility = "hidden");
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
    let s = this.#M.getBoundingClientRect().width, n = e.dataLength + e.limitFuture + e.limitPast, r = s / n, a = e.Length * r, l = (i + e.limitPast) * r;
    this.#C.setHandleDims(l, a);
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
    let e = he(sm);
    this.#d = new St(this, this.#a, e, !1), this.#b = this.graph.overlays.get("cursor").instance, this.#S = this.graph.overlays.get("labels").instance, this.#g = this.graph.overlays.get("overlay").instance, this.graph.addOverlays(this.#m);
  }
  addOverlays(e) {
    if (!P(e))
      return !1;
    this.graph === void 0 ? this.#m.push(...e) : this.graph.addOverlays(e);
  }
  addOverlay(e, i) {
    if (!w(i))
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
    this.#d.overlays.list.get("cursor").layer.visible = !1, this.#n.MainPane.draw();
  }
  showCursorTime() {
    this.#d.overlays.list.get("cursor").layer.visible = !0, this.#n.MainPane.draw();
  }
  hideJump(e) {
    this.#n.theme?.time?.navigation === !1 && (this.#c.style.visibility = "hidden");
  }
  showJump(e) {
    this.#c.style.visibility = "visible", this.hideCursorTime();
  }
}
const rm = {
  renderQ: new Se(),
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
}, om = rm, vr = [
  "-webkit-touch-callout",
  "-webkit-user-select",
  "-khtml-user-select",
  "-moz-user-select",
  "-ms-user-select",
  "user-select"
];
class am {
  #e;
  #t;
  #i;
  #r;
  #s;
  #n;
  #o;
  #h = [];
  #l;
  #a = {};
  #c;
  #d;
  #u = null;
  constructor(e, i) {
    this.#e = e, this.#t = i, this.#i = i.core, this.#r = i.core.theme.legend, this.init(), this.eventsListen();
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
    for (let e in this.#a)
      e !== "collapse" && this.remove(e);
    this.#e.remove();
  }
  eventsListen() {
    this.#i.on("chart_pan", this.primaryPanePan, this), this.#i.on("chart_panDone", this.primaryPanePanDone, this);
  }
  init() {
    const e = this.#e.legends;
    this.#n = e.querySelector(".controls"), this.#o = e.querySelectorAll(".control"), this.#c = e.querySelector("#showLegends"), this.#d = e.querySelector("#hideLegends"), this.#n.style.display = "none", this.icons(this.#o, { id: "collapse", parent: this }), this.#e.legends.classList.add("hide"), this.#u = "hide", this.collapse = "show";
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
    for (let e of vr)
      this.#e.style.setProperty(e, "none");
  }
  primaryPanePanDone() {
    for (let e of vr)
      this.#e.style.removeProperty(e);
  }
  add(e) {
    if (!w(e))
      return !1;
    const i = () => {
      this.#i.error("ERROR: Legend parent missing!");
    };
    e.id = e?.id || J("legend"), e.type = e?.type || "overlay", e.title = e?.title || e?.parent.legendName, e.parent = e?.parent || i, e.visible = F(e?.visible) ? e.visible : !0;
    const s = this.elTarget.buildLegend(e, this.#i.theme);
    this.#e.legends.insertAdjacentHTML("beforeend", s);
    const n = this.#e.legends.querySelector(`#legend_${e.id}`);
    return this.#l = n.querySelectorAll(".control"), this.#a[e.id] = {
      el: n,
      type: e.type,
      source: e?.source,
      click: []
    }, this.icons(this.#l, e), e.type == "indicator" && (this.#n.style.display = "block", !e.parent.primaryPane && Object.keys(this.#a).length < 3 && (this.#n.style.display = "none")), n.style.display = e.visible ? "block" : "none", e.id;
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
    if (!w(i) || !(e in this.#a) || this.#i.range.data.length == 0)
      return !1;
    let s = this.#a[e].source(i.pos);
    const n = this.#e.buildInputs(s);
    this.#e.legends.querySelector(`#legend_${e} dl`).innerHTML = n;
  }
  modify(e, i) {
    if (!(e in this.#a) || !w(i))
      return !1;
    const s = this.#a[e].el;
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
      r.style.width = `${this.#r.controlsW}px`, r.style.height = `${this.#r.controlsH}px`, r.style.fill = `${this.#r.controlsColour}`, r.onpointerover = (a) => a.currentTarget.style.fill = this.#r.controlsOver, r.onpointerout = (a) => a.currentTarget.style.fill = this.#r.controlsColour, s = i.parent.onLegendAction.bind(i.parent), i.id === "collapse" ? this.#h.push({ el: n, click: s }) : this.#a[i.id].click.push({ el: n, click: s }), n.addEventListener("click", s);
    }
  }
}
const os = {
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
}, lm = {
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
class hm extends U {
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
class cm extends U {
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
class um extends U {
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
      fontSize: Oe.FONTSIZE * 1.05,
      fontWeight: Oe.FONTWEIGHT,
      fontFamily: Oe.FONTFAMILY,
      txtCol: "#FFFFFF",
      bakCol: Oe.COLOUR_CURSOR_BG,
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 5,
      paddingRight: 3,
      width: this.viewport.width
    }, l = 0, h = zi(a), m = this.parent.yPos(n) - h * 0.5;
    this.scene.clear(), i.save(), e[4] >= e[1] ? a.bakCol = this.theme.candle.UpBodyColour : a.bakCol = this.theme.candle.DnBodyColour, Tt(i, r, l, m, a), s && (r = this.core.stream.countDownUpdate(), a.fontSize = a?.fontSize / 1.1, Tt(i, r, l, m + h, a)), i.restore(), this.viewport.render();
  }
}
const dm = [
  ["labels", { class: hm, fixed: !0, required: !0 }],
  ["overlay", { class: cm, fixed: !0, required: !0 }],
  ["price", { class: um, fixed: !0, required: !0 }],
  ["cursor", { class: ko, fixed: !0, required: !0 }]
];
class mm {
  #e;
  #t = "Y Scale Axis";
  #i = "scale";
  #r;
  #s;
  #n;
  #o;
  #h;
  #l;
  #a;
  #c;
  #d;
  #u;
  #m;
  #v;
  #f;
  #M = new Se();
  #w = [];
  #p;
  #x;
  #S;
  #g;
  #b;
  #T = {};
  constructor(e, i) {
    this.#r = e, this.#s = { ...i }, this.#c = this.#s.elScale, this.#h = this.#s.chart, this.#n = this.#s.parent, this.id = `${this.#n.id}_scale`, this.#d = this.#c.viewport || this.#c;
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
    this.#e = Te(e);
  }
  get id() {
    return this.#e || `${this.#r.id}-${this.#i}`;
  }
  get name() {
    return this.#t;
  }
  get shortName() {
    return this.#i;
  }
  get core() {
    return this.#r;
  }
  get options() {
    return this.#s;
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
    return this.#a;
  }
  set yAxisType(e) {
    this.#a.yAxisType = De.includes(e) ? e : De[0];
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
    return ne(this.#c);
  }
  get theme() {
    return this.#r.theme;
  }
  get config() {
    return this.#r.config;
  }
  get digitCnt() {
    return this.#x;
  }
  set scaleRange(e) {
    this.setScaleRange(e);
  }
  get range() {
    return this.#a.range;
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
    this.#o = new Ge(e, this);
  }
  get stateMachine() {
    return this.#o;
  }
  get Scale() {
    return this;
  }
  start() {
    const e = this.#n.name == "Chart" ? void 0 : this.#n.localRange;
    this.#a = new Ei(this, this, this.options.yAxisType, e), this.createGraph(), this.#a.calcGradations(), this.draw(), this.eventsListen();
    const i = he(lm);
    i.id = this.id, i.context = this, this.stateMachine = i, this.stateMachine.start();
  }
  restart() {
    this.#a.setRange(this.#r.range), this.draw();
  }
  destroy() {
    this.#r.hub.expunge(this), this.off(`${this.#n.id}_pointerout`, this.#f.erase, this.#f), this.off(Ze, this.onStreamUpdate, this.#v), this.stateMachine.destroy(), this.#p.destroy(), this.#S.destroy(), this.element.remove();
  }
  eventsListen() {
    let e = this.#p.viewport.scene.canvas;
    this.#S = new $e(e, { disableContextMenu: !1 }), this.#S.setCursor("ns-resize"), this.#S.on("pointerdrag", this.onDrag.bind(this)), this.#S.on("pointerdragend", this.onDragDone.bind(this)), this.#S.on("wheel", this.onMouseWheel.bind(this)), this.#S.on("dblclick", this.resetScaleRange.bind(this)), this.on(`${this.#n.id}_pointermove`, this.onMouseMove, this), this.on(`${this.#n.id}_pointerout`, this.#f.erase, this.#f), this.on(Ze, this.#v.draw, this.#v), this.on("setRange", this.draw, this);
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
  onResize(e) {
    this.setDimensions(e);
  }
  onMouseMove(e) {
    this.#b = P(e) ? e : [Math.floor(e.position.x), Math.floor(e.position.y)], this.#f.draw(this.#b);
  }
  onDrag(e) {
    this.#b = [
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
    this.#a.mode === "manual" && (this.#a.offset = e.domEvent.srcEvent.movementY, this.draw());
  }
  setHeight(e) {
    this.#c.style.height = `${e}px`;
  }
  setDimensions(e) {
    const i = this.#c.getBoundingClientRect().width;
    this.setHeight(e.h), this.graph instanceof St && (this.#p.setSize(i, e.h, i), this.draw()), this.#f instanceof ko && this.calcPriceDigits();
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
    let i = Cs(e);
    return Ts(i, this.core.pricePrecision);
  }
  createGraph() {
    let e = he(dm);
    this.graph = new St(this, this.#d, e, !1), this.#f = this.graph.overlays.get("cursor").instance, this.#u = this.graph.overlays.get("labels").instance, this.#m = this.graph.overlays.get("overlay").instance, this.#v = this.graph.overlays.get("price").instance, this.graph.addOverlays(this.#w), this.#v.target.moveTop(), this.#f.target.moveTop(), this.calcPriceDigits();
  }
  calcPriceDigits() {
    let e = 8;
    if (this.#r.range.dataLength > 0) {
      const i = this.#r.range.valueMax, s = Cs(i);
      e = `${Ts(s, this.core.pricePrecision)}`.length + 2;
    }
    return this.#x = e, this.#x;
  }
  calcScaleWidth() {
    const e = this.calcPriceDigits(), i = this.#r.MainPane.graph.viewport.scene.context, s = this.theme.yAxis;
    i.font = Et(s.fontSize, s.fontWeight, s.fontFamily);
    const n = Zs(i, "0");
    return e * n;
  }
  addOverlays(e) {
    if (!P(e))
      return !1;
    this.graph === void 0 ? this.#w.push(...e) : this.graph.addOverlays(e);
  }
  addOverlay(e, i) {
    if (!w(i))
      return !1;
    if (this.graph === void 0)
      this.#w.push([e, i]);
    else {
      let s = this.graph.addOverlay(e, i);
      return this.#v.target.moveTop(), this.#f.target.moveTop(), s;
    }
  }
  render() {
    this.#p.render();
  }
  draw(e = this.range, i = !0) {
    this.#p.draw(e, i), this.#n.drawGrid(i), this.parent.draw(this.range, !0);
  }
  resize(e = this.width, i = this.height) {
    this.setDimensions({ w: e, h: i });
  }
}
class pm extends U {
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
        this.watermark.imgURL = e.imgURL, Rs(e?.imgURL, this.renderImage.bind(this));
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
    const i = Math.floor(this.core.height / We), s = this.core.config?.watermark?.fontSize, n = this.core.config?.watermark?.fontWeight, r = this.core.config?.watermark?.fontFamily, a = this.core.config?.watermark?.textColour, l = {
      fontSize: (s || this.theme.watermark.FONTSIZE) * i,
      fontWeight: n || this.theme.watermark.FONTWEIGHT,
      fontFamily: r || this.theme.watermark.FONTFAMILY,
      txtCol: a || this.theme.watermark.COLOUR
    }, h = this.scene.context;
    h.font = Et(l?.fontSize, l?.fontWeight, l?.fontFamily), h.textBaseline = "top", h.fillStyle = l.txtCol;
    const m = zi(l), f = Ui(h, e, l), v = (this.scene.width - f) / 2, T = (this.core.Chart.height - m) / 2;
    h.fillText(e, v, T);
  }
  renderImage(e) {
    if (!e)
      return;
    const i = this.core.config?.watermark?.imgHeight || this.theme.watermark.IMGHEIGHT, s = this.core.config?.watermark?.imgWidth || this.theme.watermark.IMGWIDTH, n = (this.scene.width - s) / 2, r = (this.scene.height - i) / 2;
    this.scene.clear();
    const a = this.scene.context;
    a.save(), yo(a, e, n, r, i, s), a.restore();
  }
}
class fm extends U {
  #e;
  #t;
  constructor(e, i = !1, s = !1, n, r, a) {
    super(e, i, s, n, r, a), this.#e = new Lo(e.scene, n), this.theme.volume.Height = k(n?.volume?.Height, 0, 100) || 100;
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
class _o {
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
class Ho extends U {
  #e;
  constructor(e, i = !1, s = !1, n, r) {
    super(e, i, s, n, r), this.#e = new _o(e.scene, n);
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
class gm extends U {
  #e;
  constructor(e, i = !1, s = !1, n, r, a) {
    super(e, i, s, n, r, a), this.#e = new _o(e.scene, n), this.theme.priceLineStyle = this.theme?.priceLineStyle || sc;
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
const zt = {
  colour: "#4444cc88",
  wdith: 1,
  dash: [1, 0]
};
class ym extends U {
  constructor(e, i = !1, s = !1, n, r, a) {
    super(e, i, s, n, r, a);
    const l = { class: vm, fixed: !0, required: !1 };
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
    f.colourCursorBG = this.theme?.hilo?.colour || zt.colour, v.save(), v.strokeStyle = this.theme?.highLow?.colour || zt.colour, v.strokeWidth = this.theme?.highLow?.width || zt.width, v.setLineDash(this.theme?.highLow?.dash || zt.dash), n = this.yAxis.yPos(h), Kt(v, n, 0, r, l), i = "High", s = this.theme.yAxis.location == "left" ? 0 : r - (a + 25), Ri(v, i, s, n, a, f), n = this.yAxis.yPos(m), Kt(v, n, 0, r, l), i = "Low", Ri(v, i, s, n, a, f), v.restore(), super.updated(), "hiLo" in this.chart.scale.overlays && (this.chart.scale.overlays.hiLo.instance.setRefresh(), this.chart.scale.overlays.hiLo.instance.scaleDraw());
  }
}
class vm extends U {
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
    h.colourCursorBG = this.theme?.hilo?.colour || zt.colour, i = this.chart.Scale.nicePrice(a), s = 1, n = this.yAxis.yPos(a) + 1, r = this.viewport.width, Ri(m, i, s, n, r, h), i = this.chart.Scale.nicePrice(l), n = this.yAxis.yPos(l) + 1, Ri(m, i, s, n, r, h), super.updated();
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
class wm {
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
const wr = {
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
class bm extends U {
  #e;
  #t = [];
  #i;
  constructor(e, i = !1, s = !1, n, r, a) {
    super(e, i, s, n, r, a), this.#e = new wm(e, n), this.core.on("primary_pointerdown", this.onPrimaryPointerDown, this), wr.parent = this, this.#i = this.core.WidgetsG.insert("Dialogue", wr), this.#i.start();
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  get data() {
    return this.overlay.data;
  }
  onPrimaryPointerDown(e) {
    this.core.MainPane.stateMachine.state !== "chart_pan" && Ie(this.isNewsEventSelected, Gt, this)(e);
  }
  isNewsEventSelected(e) {
    const i = e[0], s = e[1], n = this.hit.getIntersection(i, s);
    if (this.core.config?.events?.display === !1 || this.core.config?.events?.displayInfo === !1 || n == -1)
      return;
    const r = this.theme.events, a = k(this.xAxis.candleW, r.iconMinDim, r.iconHeight), l = this.xAxis.pixel2T(i), h = this.xAxis.scrollOffsetPx, m = this.core.dimensions;
    let f = Object.keys(this.data)[n] * 1, v = this.xAxis.xPos(l) + h, T = s - a * 1.5 - m.height, E = "";
    for (let D of this.data[f])
      E += this.buildNewsEventHTML(D);
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
class xm {
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
class Cm extends U {
  #e;
  #t = [];
  #i;
  #r;
  constructor(e, i = !1, s = !1, n, r, a) {
    super(e, i, s, n, r, a), this.settings = a.settings, this.#e = new xm(e, n), this.core.on("primary_pointerdown", this.onPrimaryPointerDown, this), br.parent = this, this.#r = this.core.WidgetsG.insert("Dialogue", br), this.#r.start();
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
    this.core.MainPane.stateMachine.state !== "chart_pan" && Ie(this.isTradeSelected, Gt, this)(e);
  }
  isTradeSelected(e) {
    const i = e[2].domEvent.srcEvent, s = (i.target || i.srcElement).getBoundingClientRect(), n = i.clientX - (s.right - s.width), r = i.clientY - s.top, a = this.hit.getIntersection(n, r);
    if (this.core.config?.trades?.display === !1 || this.core.config?.trades?.displayInfo === !1 || a == -1)
      return;
    console.log("isTradeSelected()");
    const l = this.theme.trades, h = k(this.xAxis.candleW, l.iconMinDim, l.iconWidth), m = this.xAxis.pixel2T(n);
    this.core.range.valueByTS(m);
    const f = this.xAxis.scrollOffsetPx, v = this.core.dimensions;
    let T = Object.keys(this.data)[a] * 1, E = this.xAxis.xPos(m) + f, M = r - h * 1.5 - v.height, D = "";
    for (let me of this.data[T])
      D += this.buildTradeHTML(me);
    const re = {
      dimensions: { h: void 0, w: 150 },
      position: { x: E + h / 2 + 1, y: M },
      content: D,
      offFocus: Gt + 1
    };
    this.core.emit("trade_selected", T), this.#r.open(re);
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
class se extends U {
  static #e = 0;
  static #t = {};
  static get inCnt() {
    return se.#e++;
  }
  static create(e, i) {
    const s = ++se.#e;
    i.cnt = s, i.modID = `${i.toolID}_${s}`, i.toolID = i.modID, i.target = e;
    const n = new i.tool(i);
    return se.#t[s] = n, e.chartToolAdd(n), n;
  }
  static destroy(e) {
    e instanceof se && delete se.#t[e.inCnt];
  }
  #i;
  #r;
  #s = "Chart Tools";
  #n = "TX_Tool";
  #o;
  #h;
  #l = [0, 0];
  #a = !1;
  #c;
  #d = { TL: [0, 0], BR: [0, 0] };
  constructor(e, i = !1, s = !1, n, r, a) {
    super(e, i, s, n, r, a), this.#r = se.inCnt, this.config.ID && (this.#i = Te(this.config.ID)), this.settings = a?.settings || {}, xr.parent = this, this.#o = this.core.WidgetsG.insert("ConfigDialogue", xr), this.#o.start(), this.eventsListen();
  }
  set id(e) {
    this.#i = Te(e);
  }
  get id() {
    return this.#i || `${this.core.id}-${J(this.#n)}_${this.#r}`;
  }
  get inCnt() {
    return this.#r;
  }
  get name() {
    return this.#s;
  }
  get shortName() {
    return this.#n;
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
    this.chart.stateMachine.state !== "chart_pan" && Ie(this.isToolSelected, Gt, this)(e);
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
const $o = {
  primaryPane: [
    ["watermark", { class: pm, fixed: !0, required: !0, params: { content: null } }],
    ["grid", { class: Ii, fixed: !0, required: !0, params: { axes: "y" } }],
    ["candles", { class: Ho, fixed: !1, required: !0 }],
    ["hiLo", { class: ym, fixed: !0, required: !1 }],
    ["stream", { class: gm, fixed: !1, required: !0 }],
    ["tools", { class: se, fixed: !1, required: !0 }],
    ["cursor", { class: Ls, fixed: !0, required: !0 }]
  ],
  secondaryPane: [
    ["grid", { class: Ii, fixed: !0, required: !0, params: { axes: "y" } }],
    ["tools", { class: se, fixed: !1, required: !0 }],
    ["cursor", { class: Ls, fixed: !0, required: !0 }]
  ]
}, As = {
  primaryPane: {
    trades: { class: Cm, fixed: !1, required: !1 },
    events: { class: bm, fixed: !1, required: !1 },
    volume: { class: fm, fixed: !1, required: !0, params: { maxVolumeH: xi.ONCHART_VOLUME_HEIGHT } }
  },
  secondaryPane: {
    candles: { class: Ho, fixed: !1, required: !0 }
  }
}, Me = {
  id: "chart",
  title: "",
  type: "chart",
  source: () => {
  }
};
class at {
  static #e = 0;
  static get cnt() {
    return at.#e++;
  }
  #t;
  #i;
  #r;
  #s;
  #n;
  #o;
  #h;
  #l;
  #a;
  #c;
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
  #M;
  #w;
  #p;
  #x;
  #S;
  #g;
  #b;
  #T;
  #E;
  #O = new Se();
  #N = new Se();
  #C = [0, 0];
  #L = !1;
  #P;
  #y;
  #R;
  #k = {
    valueMax: 110,
    valueMin: -10,
    valueDiff: 120
  };
  #H = {};
  constructor(e, i) {
    if (this.#n = e, this.#a = at.cnt, !w(i))
      return;
    this.#o = { ...i }, this.#i = this.#o.name, this.#r = this.#o.shortName, this.#s = this.#o.title, this.#c = this.#o.type == "primary" ? "primaryPane" : "secondaryPane", this.#T = this.#o.view, this.#v = this.#o.elements.elScale, this.#h = this.#o.parent, this.#m = this.#o.elements.elTarget, this.#m.id = this.id, this.legend = new am(this.elLegend, this), this.isPrimary ? (Me.type = "chart", Me.title = this.title, Me.parent = this, Me.source = this.legendInputs.bind(this), this.legend.add(Me), this.yAxisType = "default") : (Me.type = "secondary", Me.title = "", Me.parent = this, Me.source = () => ({ inputs: {}, colours: [], labels: [] }), this.legend.add(Me), this.yAxisType = this.core.indicatorClasses[i.view[0].type].ind.scale);
    const s = { ...i };
    s.parent = this, s.chart = this, s.elScale = this.elScale, s.yAxisType = this.yAxisType, this.scale = new mm(this.core, s), this.#d = "init", this.log(`${this.name} instantiated`);
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
    this.#t = Te(e);
  }
  get id() {
    return this.#t || Te(`${this.#n.id}-${this.#i}_${this.#a}`);
  }
  get name() {
    return this.#i;
  }
  get shortName() {
    return this.#r;
  }
  set title(e) {
    this.setTitle(e);
  }
  get title() {
    return this.#s;
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
    return this.#d;
  }
  get collapsed() {
    return this.#u;
  }
  get isPrimary() {
    return this.#o.view.primary || this.#c === "primaryPane" || !1;
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
    return ne(this.#m);
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
  get range() {
    return this.#n.range;
  }
  get localRange() {
    return this.#k;
  }
  get stream() {
    return this.#S;
  }
  get streamCandle() {
    return this.#b;
  }
  set cursor(e) {
    this.element.style.cursor = e;
  }
  get cursor() {
    return this.element.style.cursor;
  }
  get cursorPos() {
    return this.#C;
  }
  set cursorActive(e) {
    this.#L = e;
  }
  get cursorActive() {
    return this.#L;
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
    this.#M = e;
  }
  get time() {
    return this.#M;
  }
  set scale(e) {
    this.#f = e;
  }
  get scale() {
    return this.#f;
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
    return this.#T;
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
    return this.#N;
  }
  get overlaysDefault() {
    return $o[this.type];
  }
  get indicators() {
    return this.getIndicators();
  }
  get indicatorDeleteList() {
    return this.#H;
  }
  set stateMachine(e) {
    this.#l = new Ge(e, this);
  }
  get stateMachine() {
    return this.#l;
  }
  get Divider() {
    return this.#x;
  }
  get siblingPrev() {
    return this.sibling("prev");
  }
  get siblingNext() {
    return this.sibling("next");
  }
  start() {
    this.#M = this.#n.Timeline, this.createGraph(), this.#f.start(), this.draw(this.range), this.cursor = "crosshair", os.id = this.id, os.context = this, this.stateMachine = os, this.stateMachine.start(), this.eventsListen();
    let e = { chartPane: this };
    this.#x = this.core.WidgetsG.insert("Divider", e), this.#x.start();
    let s = {
      title: "Chart Config",
      content: `Configure chart ${this.id}`,
      parent: this,
      openNow: !1
    };
    this.#g = this.core.WidgetsG.insert("ConfigDialogue", s), this.#g.start(), this.#d = "running";
  }
  destroy() {
    if (this.#d !== "destroyed") {
      if (!this.core.MainPane.chartDeleteList[this.id]) {
        this.core.warn(`Cannot "destroy()": ${this.id} !!! Use "remove()" or "removeChartPane()" instead.`);
        return;
      }
      this.core.log(`Deleting chart pane: ${this.id}`), this.#n.hub.expunge(this), this.removeAllIndicators(), this.#l.destroy(), this.#x.destroy(), this.#f.destroy(), this.#w.destroy(), this.#y.destroy(), this.legend.destroy(), this.#l = void 0, this.#x = void 0, this.#p = void 0, this.#f = void 0, this.#w = void 0, this.#y = void 0, this.core.warn(`Deleting chart pane ${this.id} destroys all of its data!`), this.element.remove(), this.#d = "destroyed";
    }
  }
  remove() {
    this.emit("destroyChartView", this.id);
  }
  eventsListen() {
    this.#y = new $e(this.#m, { disableContextMenu: !1 }), this.#y.on("pointerdrag", this.onChartDrag.bind(this)), this.#y.on("pointerdragend", this.onChartDragDone.bind(this)), this.#y.on("pointermove", this.onPointerMove.bind(this)), this.#y.on("pointerenter", this.onPointerEnter.bind(this)), this.#y.on("pointerout", this.onPointerOut.bind(this)), this.#y.on("pointerdown", this.onPointerDown.bind(this)), this.#y.on("pointerup", this.onPointerUp.bind(this)), this.on("main_mousemove", this.updateLegends, this), this.on(yi, this.onStreamListening, this), this.on(Ds, this.onStreamNewValue, this), this.on(Ze, this.onStreamUpdate, this), this.on(Ns, this.onStreamNewValue, this), this.on(`${this.id}_removeIndicator`, this.onDeleteIndicator, this), this.isPrimary && this.on("chart_yAxisRedraw", this.onYAxisRedraw, this);
  }
  on(e, i, s = this) {
    this.#n.on(e, i, s);
  }
  off(e, i, s = this) {
    this.#n.off(e, i, s);
  }
  expunge(e = this) {
    this.#n.expunge(e);
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
  onPointerMove(e) {
    this.core.MainPane.onPointerActive(this), this.scale.layerCursor.visible = !0, this.graph.overlays.list.get("cursor").layer.visible = !0, this.#C = [Math.round(e.position.x), Math.round(e.position.y)], this.#f.onMouseMove(this.#C), this.emit(`${this.id}_pointermove`, this.#C);
  }
  onPointerEnter(e) {
    this.core.MainPane.onPointerActive(this), this.#C = [Math.round(e.position.x), Math.round(e.position.y)], this.core.MainPane.onMouseEnter(), this.scale.layerCursor.visible = !0, this.graph.overlays.list.get("cursor").layer.visible = !0, this.emit(`${this.id}_pointerenter`, this.#C);
  }
  onPointerOut(e) {
    this.#L = !1, this.#C = [Math.round(e.position.x), Math.round(e.position.y)], this.scale.layerCursor.visible = !1, this.emit(`${this.id}_pointerout`, this.#C);
  }
  onPointerDown(e) {
    this.#n.pointerButtons[e.domEvent.srcEvent.button] = !0, this.#P = [Math.floor(e.position.x), Math.floor(e.position.y), e], this.stateMachine.state === "tool_activated" ? this.emit("tool_targetSelected", { target: this, position: e }) : this.isPrimary && this.emit("primary_pointerdown", this.#P);
  }
  onPointerUp(e) {
    this.#n.pointerButtons[e.domEvent.srcEvent.button] = !1;
  }
  onStreamListening(e) {
    this.#S !== e && (this.#S = e);
  }
  onStreamNewValue(e) {
    this.draw(this.range, !0);
  }
  onStreamUpdate(e) {
    this.isPrimary ? (this.#b = e, this.chartStreamCandle.draw(), this.layerStream.setPosition(this.core.stream.lastScrollPos, 0), this.updateLegends(this.cursorPos, e)) : this.updateLegends(), this.#n.MainPane.draw();
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
    this.#s = e, Me.title = e;
    const i = this.legend.list.chart.el.querySelectorAll(".title");
    for (let s of i)
      s.innerHTML = e;
    return !0;
  }
  setWatermark(e) {
    C(e.text) || C(e) ? this.core.config.watermark.text = e : "imgURL" in e && (this.core.config.watermark.imgURL = e);
  }
  setHeight(e) {
    x(e) || (e = this.height || this.#h.height), this.#m.style.height = `${e}px`, this.#v.style.height = `${e}px`, this.elViewport.style.height = `${e}px`, this.#f.setDimensions({ w: null, h: e }), this.Divider?.setPos(), this.Divider?.setWidth();
  }
  setWidth(e) {
  }
  setDimensions(e) {
    const i = this.config.buffer || $i;
    let { w: s, h: n } = e;
    s = this.width, n = n || this.height, this.setHeight(n), this.graph instanceof St && (this.layerWidth = Math.round(s * ((100 + i) * 0.01)), this.graph.setSize(s, n, this.layerWidth), this.draw(void 0, !0), this.core.MainPane.draw(void 0, !1), this.Divider.setPos(), this.Divider.setWidth());
  }
  setLocalRange(e, i) {
    if (!x(i) || !x(e))
      return !1;
    e > i && ([e, i] = [i, e]), this.#k = {
      valueMax: i,
      valueMin: e,
      valueDiff: i - e
    };
  }
  setYAxisType(e) {
    return !C(e) || !De.includes(e) || this.type == "primaryPane" && e == "percent" ? !1 : (this.#R = e, !0);
  }
  addOverlays(e) {
    if (!P(e) || e.length < 1)
      return !1;
    const i = [];
    for (let s of e) {
      const n = { fixed: !1, required: !1 };
      if (s.type in this.core.indicatorClasses)
        n.cnt = this.core.indicatorClasses[s.type].ind.cnt, n.id = `${this.id}-${s.type}_${n.cnt}`, n.class = this.core.indicatorClasses[s.type].ind;
      else if (s.type in As[this.type])
        n.cnt = 1, n.id = `${this.id}-${s.type}`, n.class = As[this.type][s.type].class;
      else if (s.type in this.#n.customOverlays[this.type])
        n.cnt = 1, n.id = `${this.id}-${s.type}`, n.class = this.#n.customOverlays[this.type][s.type].class;
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
    return !C(e) || !(e in this.indicators) ? !1 : (this.#H[e] = !0, Object.keys(this.indicators).length === 0 && !this.isPrimary ? this.emit("destroyChartView", this.id) : (this.indicators[e].instance.destroy(), this.graph.removeOverlay(e), this.draw(), delete this.#H[e]), !0);
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
    this.#O.set(e.id, s), this.#E.addLayer(s), e.layerTool = s, this.#N.set(e.id, e);
  }
  addTools(e) {
  }
  overlayToolAdd(e) {
    this.#N.set(e.id, e);
  }
  overlayToolDelete(e) {
    this.#N.delete(e);
  }
  refresh() {
    this.emit("pane_refresh", this), this.scale.draw(), this.draw(void 0, this.isPrimary);
  }
  legendsVisibility(e) {
    this.legend.setCollapse(e);
  }
  updateLegends(e = this.#C, i = !1) {
    if (!(this.#n.isEmpty || !w(this.#p)))
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
        this.#n.MainPane.paneMaximize(this);
        return;
      case "restore":
        this.#n.MainPane.paneMaximize(this);
        return;
      case "collapse":
        this.#n.MainPane.paneCollapse(this);
        return;
      case "expand":
        this.#n.MainPane.paneCollapse(this);
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
    this.graph = new St(this, this.elViewport, e, !1), this.isPrimary && (this.layerStream = this.graph.overlays.get("stream")?.layer, this.chartStreamCandle = this.graph.overlays.get("stream")?.instance), this.addOverlays(this.view);
  }
  render() {
    this.#w.render(), this.#f.render();
  }
  draw(e = this.range, i = !1) {
    this.#w.draw(e, i);
  }
  drawGrid() {
    this.layerGrid.setPosition(this.#n.scrollPos, 0), this.overlayGrid.setRefresh(), this.overlayGrid.draw("y"), this.#n.MainPane.draw();
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
    const i = this.graph.viewport.scene.canvas.style, s = this.#u, n = this.#f.graph.viewport.scene.canvas.style;
    s.state ? (this.setDimensions({ w: void 0, h: e }), n.visibility = "visible", i.display = "block", s.state = !1) : (n.visibility = "hidden", i.display = "none", s.state = !0, s.height = this.element.clientHeight, s.rowsHeight = this.core.MainPane.rowsH, s.rowsCnt = this.core.ChartPanes.size, this.setDimensions({ W: void 0, h: bs }));
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
    return e == "prev" ? --s : ++s, this.#n.ChartPanes.get(i[s]) || null;
  }
  configDialogue() {
    const e = this.#g;
    e.state.name === "closed" && e.open();
  }
}
const as = {
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
}, Tm = [
  ["grid", { class: Ii, fixed: !1, required: !0, params: { axes: "x" } }]
], Sm = ["candles", "trades", "events"];
class Bo {
  #e = "MainPane";
  #t = "Main";
  #i;
  #r;
  #s;
  #n;
  #o = !1;
  #h;
  #l;
  #a;
  #c;
  #d;
  #u;
  #m = {};
  #v;
  #f;
  #M;
  #w;
  #p;
  #x;
  #S;
  #g = new Se();
  #b;
  #T;
  #E;
  #O = {};
  #N = {
    instance: null,
    rowsH: 0,
    panes: {}
  };
  #C = sr;
  #L = ir;
  #P = {};
  #y = [0, 0];
  #R = {
    active: !1,
    start: [0, 0],
    prev: [0, 0],
    delta: [0, 0]
  };
  #k;
  #H;
  #A;
  #I = 0;
  #_ = 0;
  constructor(e, i) {
    this.#s = e, this.#i = i, this.#r = e, this.#l = this.#s.elMain, this.#h = this.#s.elYAxis, this.init(i);
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
  get id() {
    return `${this.#s.id}-${this.#e}`;
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
  get chart() {
    return this.#b;
  }
  get chartPanes() {
    return this.#g;
  }
  get chartPaneMaximized() {
    return this.#N;
  }
  get chartDeleteList() {
    return this.#O;
  }
  get time() {
    return this.#T;
  }
  get options() {
    return this.#i;
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
    return this.#L;
  }
  set rowMinH(e) {
    x(e) && (this.#L = Math.abs(e));
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return ne(this.#l);
  }
  get range() {
    return this.#s.range;
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
    return this.#T.candleW;
  }
  get theme() {
    return this.#s.theme;
  }
  get config() {
    return this.#s.config;
  }
  get buffer() {
    return this.#k;
  }
  get bufferPx() {
    return this.getBufferPx();
  }
  get scrollPos() {
    return this.#s.scrollPos;
  }
  set stateMachine(e) {
    this.#n = new Ge(e, this);
  }
  get stateMachine() {
    return this.#n;
  }
  get renderLoop() {
    return om;
  }
  get graph() {
    return this.#p;
  }
  get views() {
    return this.#s.state.data.views;
  }
  get indicators() {
    return this.getIndicators();
  }
  get indicatorClasses() {
    return this.#s.indicatorClasses;
  }
  get elements() {
    return {
      elRows: this.elRows,
      elPrimary: this.elPrimary,
      elSecondarys: this.elSecondarys,
      elTime: this.#c,
      elScale: this.#u
    };
  }
  init(e) {
    if (this.#s, this.#a = this.#l.rows, this.#c = this.#l.time, this.#v = this.#l.rows.grid, this.#M = this.#l.viewport, this.#u = this.#s.elBody.scale, e.name = "Chart", e.shortName = "Chart", e.parent = this, e.chartData = this.#s.chartData, e.primaryPane = this.#s.primaryPane, e.secondaryPane = this.#s.secondaryPane, e.rangeLimit = this.#s.rangeLimit, e.settings = this.#s.settings, e.elements = {
      ...e.elements,
      ...this.elements
    }, this.#s.theme?.time?.navigation === !1) {
      const i = { height: Ni };
      this.#s.theme.time = { ...this.#s.theme?.time, ...i }, this.#a.style.height = `calc(100% - ${Ni}px)`;
    }
    this.#T = new nm(this.#s, e), this.registerChartViews(e), this.#k = x(this.config.buffer) ? this.config.buffer : $i, this.#L = x(this.config.rowMinH) ? this.config.rowMinH : ir, this.#C = x(this.config.secondaryPaneDefaultH) ? this.config.secondaryPaneDefaultH : sr, this.rowsOldH = this.rowsH, this.log(`${this.#e} instantiated`);
  }
  start() {
    let e = 0;
    this.#l.start(this.theme), this.#T.start(), this.createGraph();
    const i = this.chart.scale.calcScaleWidth();
    this.core.elBody.scale.style.width = `${i}px`, this.#M.style.width = `${this.#a.width}px`, this.#g.forEach((s, n) => {
      s.start(e++), e === 1 && s.Divider.hide();
    }), this.rowsOldH = this.rowsH, this.draw(this.range, !0), this.renderLoop.init({
      graphs: [this.#p],
      range: this.range
    }), this.renderLoop.start(), this.renderLoop.queueFrame(this.range, [this.#p], !1), this.eventsListen(), as.id = this.id, as.context = this, this.stateMachine = as, this.stateMachine.start();
  }
  destroy() {
    this.#s.hub.expunge(this), this.renderLoop.stop(), this.#o = !0, this.stateMachine.destroy(), this.#T.destroy(), this.#g.forEach((e, i) => {
      this.#O[i] = !0, e.destroy(), delete this.#O[i];
    }), this.#p.destroy(), this.#A.destroy();
  }
  reset() {
    for (let e in this.#s.Indicators)
      for (let i in this.#s.Indicators[e])
        this.#s.Indicators[e][i].instance.remove();
  }
  restart() {
    this.chart.scale.restart(), this.validateIndicators();
    for (let [e, i] of this.views)
      for (let s of i)
        e === "primary" && s.type === "candles" || this.addIndicator(s.type, s.name, { data: s.data, settings: s.settings });
    this.draw(this.range, !0);
  }
  eventsListen() {
    this.#A = new $e(this.#a, { disableContextMenu: !1 }), this.#A.on("keydown", this.onChartKeyDown.bind(this)), this.#A.on("keyup", this.onChartKeyUp.bind(this)), this.#A.on("wheel", this.onMouseWheel.bind(this)), this.#A.on("pointerenter", this.onMouseEnter.bind(this)), this.#A.on("pointerout", this.onMouseOut.bind(this)), this.#A.on("pointerup", this.onChartDragDone.bind(this)), this.#A.on("pointermove", this.onMouseMove.bind(this)), this.on(Ns, this.onFirstStreamValue, this), this.on(Ds, this.onNewStreamValue, this), this.on("setRange", this.onSetRange, this), this.on("scrollUpdate", this.draw, this), this.on("chart_render", this.draw, this), this.on("destroyChartView", this.removeChartPane, this);
  }
  on(e, i, s = this) {
    this.#s.on(e, i, s);
  }
  off(e, i, s = this) {
    this.#s.off(e, i, s);
  }
  emit(e, i) {
    this.#s.emit(e, i);
  }
  onSetRange() {
    if (this.#_ = this.#I, this.#I = this.chart.scale.calcScaleWidth(), this.#_ < this.#I) {
      const e = `${this.#I}px`;
      this.core.elBody.scale.style.width = e, this.#M.style.width = `calc(100% - ${this.#I}px)`, this.#a.style.width = `calc(100% - ${this.#I}px)`, this.#c.style.width = `calc(100% - ${this.#I}px)`, this.setDimensions();
    } else
      this.draw();
  }
  onMouseWheel(e) {
    const i = Math.sign(e.wheeldelta) * -1;
    if (e.domEvent.preventDefault(), this.#s.pointerButtons[0]) {
      e.dragstart.x = this.#y[0], e.dragstart.y = this.#y[1], e.position.x = this.#y[0] + i, e.position.y = this.#y[1], this.onChartDrag(e);
      return;
    }
    const s = this.range, n = s.indexStart - Math.floor(i * jn * s.Length), r = s.indexEnd + Math.ceil(i * jn * s.Length);
    this.#s.setRange(n, r), this.draw(this.range, !0);
  }
  onMouseMove(e) {
    const i = this.#P;
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
    let e = this.#a.heightDeltaR, i = Math.round(this.chartH * e), s = this.rowsW, n = this.rowsH, r = Math.round(s * ((100 + this.#k) * 0.01)), a = {
      resizeH: e,
      mainH: this.element.height,
      mainW: this.element.width,
      rowsH: this.rowsH,
      rowsW: this.rowsW
    };
    this.#s.scrollPos = -1, this.#T.setDimensions({ w: s }), this.#p.setSize(s, n, r), this.#M.style.width = `${s}px`, this.#g.size == 1 && i != this.#a.height ? this.#b.setDimensions({ w: s, h: this.#a.height }) : this.#g.forEach((l, h) => {
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
      list: [...this.#g.values()],
      collapsed: [],
      expanded: [],
      maximized: this.#N.instance
    };
    for (let i of e.list)
      i.collapsed.state ? e.collapsed.push(i) : e.expanded.push(i);
    return e;
  }
  addChartPane(e) {
    const { expanded: i } = this.chartPanesState(), s = this.calcChartPaneHeights(), n = s.new;
    let r;
    for (r in s)
      if (this.#g.has(r)) {
        let m = this.#g.get(r);
        i.indexOf(m) > -1 && m.setDimensions({ w: this.rowsW, h: s[r] });
      }
    let a;
    this.#a.insertAdjacentHTML(
      "beforeend",
      this.#l.rowNode(e.type, this.#s)
    ), a = this.#a.chartPaneSlot.assignedElements().slice(-1)[0], a.style.height = `${n}px`, a.style.width = "100%";
    let l;
    this.#h.insertAdjacentHTML(
      "beforeend",
      this.scaleNode(e.type)
    ), l = this.#h.chartPaneSlot.assignedElements().slice(-1)[0], l.style.height = `${n}px`, l.style.width = "100%", e.elements.elTarget = a, e.elements.elScale = l;
    let h;
    return e.type == "primary" ? (h = new at(this.#s, e), this.#b = h) : (e.name = e.view[0].name || "Secondary", e.shortName = e.view[0].type || "Secondary", h = new at(this.#s, e)), this.setPaneDividers(), this.#g.set(h.id, h), this.emit("addChartView", h), h;
  }
  removeChartPane(e) {
    if (!C(e) || !this.#g.has(e) || this.#O[e])
      return !1;
    const i = this.#g.get(e);
    if (i.isPrimary)
      return this.#s.error(`Cannot remove primary chart pane! ${e}`), !1;
    this.#O[e] = !0;
    const { expanded: s } = this.chartPanesState();
    let n = s.indexOf(i);
    n > -1 && s.splice(n, 1);
    let r = i.viewport.height, a = Math.floor(r / s.length), l = r % a;
    if (i.status !== "destroyed" && (i.destroy(), this.#l.removeRow(i.id)), this.#g.delete(e), this.#g.size === 1) {
      let h = this.#g.values().next().value;
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
        w(r) && (r.type in this.core.indicatorClasses || Sm.includes(r.type)) || (this.#s.log(`indicator ${s.type} not added: not supported.`), s.splice(n, 1));
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
      n = this.#b.addIndicator(l);
    } else {
      P(s.view) || (s.view = [{ name: i, type: e, ...s }]);
      for (let l = 0; l < s.view.length; l++)
        (!w(s.view[l]) || !xo(["name", "type"], Object.keys(s.view[l]))) && s.view.splice(l, 1);
      if (s.view.length == 0)
        return !1;
      s.parent = this, s.title = i, s.elements = { ...this.elements }, n = this.addChartPane(s), n.start();
    }
    const a = "instance" in n ? n.instance.id : n.id;
    return this.refresh(), this.emit("addIndicatorDone", n), this.#s.log("Added indicator:", a), n;
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
    if (!C(e))
      return !1;
    for (const i of this.#g.values())
      if (e in i.indicators)
        return i.indicators[e].instance;
  }
  removeIndicator(e) {
    if (C(e))
      for (const i of this.#g.values())
        e in i.indicators && (e = i.indicators[e].instance);
    return e instanceof Ee ? (e.chart.type === "primaryPane" || Object.keys(e.chart.indicators).length > 1 ? (e.remove(), this.emit("pane_refresh", this)) : e.chart.remove(), !0) : !1;
  }
  indicatorSettings(e, i) {
    if (C(e)) {
      for (const s of this.#g.values())
        if (e in s.indicators)
          return s.indicators[e].instance.settings(i);
    } else
      return e instanceof Ee ? e.settings(i) : !1;
  }
  calcChartPaneHeights() {
    const { collapsed: e, expanded: i } = this.chartPanesState(), s = this.#g.size + 1, n = this.#C * (s - 1), r = n / Math.log10(n * 2) / 100;
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
    const i = tc + " width: 100%;";
    return `
    <div slot="chartpane" class="viewport scale ${e}" style="$${i}"></div>
  `;
  }
  createGraph() {
    let e = he(Tm);
    this.#p = new St(this, this.#M, e);
  }
  draw(e = this.range, i = !1) {
    this.time.xAxis.doCalcXAxisGrads(e);
    const s = [
      this.#p,
      this.#T
    ];
    this.#g.forEach((n, r) => {
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
    this.#s.updateRange(e);
  }
  zoomRange() {
    this.draw(this.range, !0);
  }
  paneMaximize(e) {
    if (!(e instanceof at))
      return !1;
    const i = this.#N, s = e.legend.list.chart.el.querySelector(".controls");
    let n;
    if (s.classList.toggle("maximized"), s.classList.toggle("restored"), e === i.instance)
      this.panesRestore(), i.instance = null, i.panes = {}, e.collapsed.state && (e.graph.viewport.scene.canvas.style.display = "none", e.scale.graph.viewport.scene.canvas.style.visibility = "hidden");
    else {
      this.panesRestore(), i.instance = e, i.rowsH = this.rowsH;
      for (let [r, a] of this.#g.entries())
        i.panes[r] = a.element.clientHeight, n = a.element.style, e === a ? (n.display = "block", a.setDimensions({ w: void 0, h: this.rowsH }), a.graph.viewport.scene.canvas.style.display = "block", a.scale.graph.viewport.scene.canvas.style.visibility = "visible") : (n.display = "none", a.scale.element.style.display = "none");
      this.hidePaneDividers();
    }
    return this.emit("pane_refresh", this), !0;
  }
  panesRestore() {
    const e = this.#N;
    let i = 0;
    this.emit("pane_refresh", this), this.dimensions.height == e.height;
    for (let [s, n] of this.#g.entries())
      n.element.style.display = "block", n.scale.element.style.display = "block", s in e.panes && i++ > 0 && n.Divider.show(), n.setDimensions({ w: void 0, h: e.panes[s] });
  }
  paneCollapse(e) {
    if (!(e instanceof at))
      return !1;
    this.emit("pane_refresh", this);
    const i = e.legend.list.chart.el.querySelector(".controls"), s = e.collapsed;
    let n = e.element.clientHeight, r, a, l;
    const { list: h, collapsed: m, expanded: f } = this.chartPanesState();
    if (r = m.indexOf(e), r > -1 && m.splice(r, 1), r = f.indexOf(e), r > -1 && f.splice(r, 1), e.collapsed.state) {
      i.classList.remove("collapsed"), i.classList.add("expanded"), s.rowsCnt !== h.length ? n = s.height * (s.rowsCnt / h.length) : s.rowsHeight !== this.rowsH ? n = s.height * (s.rowsHeight / this.rowsH) : n = s.height, a = (n - bs) / f.length;
      for (let v of f)
        l = v.element.clientHeight - a, v.setDimensions({ w: void 0, h: l });
      e.collapse(n);
    } else {
      if (i.classList.add("collapsed"), i.classList.remove("expanded"), h.length < 2 || f.length < 1)
        return !1;
      n = (e.element.clientHeight - bs) / f.length;
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
class Em extends se {
  constructor(e) {
    super(e);
  }
}
class gi extends se {
  #e = Cr.colour;
  #t = Cr.width;
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
    this.#i = new Ge(e, this);
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
class Pm extends se {
  constructor(e) {
    super(e);
  }
}
class Mm extends se {
  constructor(e) {
    super(e);
  }
}
class Lm extends se {
  constructor(e) {
    super(e);
  }
}
const Am = [
  {
    id: "cursor",
    name: "Cursor",
    icon: Th,
    event: "tool_activated"
  },
  {
    id: "line",
    name: "Line",
    icon: it,
    event: "tool_activated",
    class: gi,
    sub: [
      {
        id: "ray",
        name: "Ray",
        icon: it,
        event: "tool_activated",
        class: gi
      },
      {
        id: "hRay",
        name: "Horizontal Ray",
        icon: it,
        event: "tool_activated",
        class: gi
      },
      {
        id: "vRay",
        name: "Vertical Ray",
        icon: it,
        event: "tool_activated",
        class: gi
      }
    ]
  },
  {
    id: "fibonacci",
    name: "Fibonacci",
    icon: Eh,
    event: "tool_activated",
    class: Em,
    sub: [
      {
        id: "fib",
        name: "Not Implemented Yet",
        icon: it
      }
    ]
  },
  {
    id: "range",
    name: "Range",
    icon: Mh,
    event: "tool_activated",
    class: Mm,
    sub: [
      {
        id: "rng",
        name: "Not Implemented Yet",
        icon: it
      }
    ]
  },
  {
    id: "text",
    name: "Text",
    icon: Lh,
    event: "tool_activated",
    class: Lm,
    sub: [
      {
        id: "txt",
        name: "Not Implemented Yet",
        icon: it
      }
    ]
  },
  {
    id: "measure",
    name: "Measure",
    icon: Ph,
    event: "tool_activated",
    class: Pm
  },
  {
    id: "delete",
    name: "Delete",
    icon: Sh,
    event: "tool_activated",
    class: void 0
  }
], Cr = {
  colour: "#8888AACC",
  width: 1
}, ls = {
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
class Uo {
  #e;
  #t = "Toolbar";
  #i = "tools";
  #r;
  #s;
  #n;
  #o;
  #h;
  #l = se;
  #a;
  #c = {};
  #d = void 0;
  #u;
  #m = { click: [], pointerover: [] };
  #v = [];
  constructor(e, i) {
    this.#r = e, this.#s = i, this.#o = e.elTools, this.#a = Am || e.config.tools, this.#h = e.WidgetsG, this.init();
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
    this.#e = Te(e);
  }
  get id() {
    return this.#e || `${this.#r.id}-${this.#i}`;
  }
  get name() {
    return this.#t;
  }
  get shortName() {
    return this.#i;
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
    return ne(this.#o);
  }
  set stateMachine(e) {
    this.#n = new Ge(e, this);
  }
  get stateMachine() {
    return this.#n;
  }
  init() {
    this.mount(this.#o), this.log(`${this.#t} instantiated`);
  }
  start() {
    this.initAllTools(), this.addAllTools(), this.eventsListen(), ls.id = this.id, ls.context = this, this.stateMachine = ls, this.stateMachine.start();
  }
  destroy() {
    this.#r.hub.expunge(this);
    const e = this.#e, i = this.#o.querySelectorAll(".icon-wrapper");
    for (let s of i)
      for (let n of this.#a)
        n.id === e && s.removeEventListener("click", this.#m[e].click), s.removeEventListener("pointerover", this.#m[e].pointerover), s.removeEventListener("pointerout", this.#m[e].pointerout);
    this.stateMachine.destroy();
  }
  eventsListen() {
    this.on("tool_selected", this.onToolSelect, this), this.on("tool_deselected", this.onToolDeselect, this);
  }
  on(e, i, s = this) {
    this.#r.on(e, i, s);
  }
  off(e, i, s = this) {
    this.#r.off(e, i, s);
  }
  emit(e, i) {
    this.#r.emit(e, i);
  }
  onResized() {
    for (let e of this.#v)
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
    i.style.fill = Ke.COLOUR_ICON;
  }
  onIconOver(e) {
    const i = e.currentTarget.querySelector("svg");
    i.style.fill = Ke.COLOUR_ICONHOVER;
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
    e.innerHTML = this.#o.defaultNode(this.#a);
  }
  initAllTools() {
    const e = this.#o.querySelectorAll(".icon-wrapper");
    for (let i of e) {
      let s = i.id, n = i.querySelector("svg");
      n.style.fill = Ke.COLOUR_ICON, n.style.width = "90%";
      for (let r of this.#a)
        if (r.id === s)
          if (this.#m[s] = {}, this.#m[s].click = this.onIconClick.bind(this), this.#m[s].pointerover = this.onIconOver.bind(this), this.#m[s].pointerout = this.onIconOut.bind(this), i.addEventListener("click", this.#m[s].click), i.addEventListener("pointerover", this.#m[s].pointerover), i.addEventListener("pointerout", this.#m[s].pointerout), r?.sub) {
            let a = {
              content: r.sub,
              primary: i
            }, l = this.#h.insert("Menu", a);
            i.dataset.menu = l.id, l.start(), this.#v.push(l);
            for (let h of r.sub)
              this.#c[h.id] = h.class;
          } else
            this.#c[r.id] = r.class;
    }
  }
  addTool(e = this.#d, i = this.#u) {
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
const Tr = 20, Om = 20, Nm = new Js(H.COLOUR_BORDER), Os = document.createElement("template");
Os.innerHTML = `
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
    background-color: var(--txc-time-handle-color, ${Nm.hex}44); 
    width: 2px;
    height: 18px;
    margin: 1px;
    margin-left: 872.968px;
    margin-right: 0px;
    position: absolute;
  }
  .icon {
    flex-basis: ${Tr}px;
  }
  .icon svg {
    fill: var(--txc-time-icon-color, ${H.COLOUR_ICON});
    width: ${Tr}px;
    height: ${Om}px;
    margin-top: 1px;
  }
  .icon svg:hover {
    fill: var(--txc-time-icon-hover-color, ${H.COLOUR_ICONHOVER});
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
class Dm extends ee {
  #e;
  #t;
  #i;
  #r;
  #s;
  #n;
  #o;
  #h;
  #l;
  #a;
  #c;
  #d;
  constructor() {
    super(Os), this.#e = Os;
  }
  destroy() {
  }
  connectedCallback() {
    super.connectedCallback(
      () => {
        document.getElementById("slider-bar"), this.#t = this.shadowRoot.querySelector(".scrollBarWidget"), this.#i = this.shadowRoot.querySelector(".rwdStart"), this.#r = this.shadowRoot.querySelector(".fwdEnd"), this.#s = this.shadowRoot.querySelector(".scrollBar"), this.#n = this.shadowRoot.querySelector(".viewport"), this.#o = this.shadowRoot.querySelector(".handle"), this.#h = this.shadowRoot.querySelectorAll("svg"), this.#l = this.shadowRoot.querySelector("#max"), this.#a = this.shadowRoot.querySelector("#min"), this.#c = this.shadowRoot.querySelectorAll("input"), this.#d = this.shadowRoot.querySelector("style[title=overview]"), this.max.addEventListener("input", this.onChangeSliderHandler.bind({ self: this, input: this.max })), this.min.addEventListener("input", this.onChangeSliderHandler.bind({ self: this, input: this.min }));
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
    return this.#r;
  }
  get scrollBar() {
    return this.#s;
  }
  get viewport() {
    return this.#n;
  }
  get handle() {
    return this.#o;
  }
  get icons() {
    return this.#h;
  }
  get max() {
    return this.#l;
  }
  get min() {
    return this.#a;
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
customElements.get("tradex-overview") || window.customElements.define("tradex-overview", Dm);
const zo = document.createElement("template");
zo.innerHTML = `
<style>
  .viewport {
    width: 100%;
    height: ${Ni}px;
  }
  tradex-overview {
    height: ${so}px;
  }
</style>
<div class="viewport"></div>
<tradex-overview></tradex-overview>
`;
class Im extends ee {
  #e;
  #t;
  constructor() {
    super(zo);
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
customElements.get("tradex-time") || window.customElements.define("tradex-time", Im);
const Vo = document.createElement("template");
Vo.innerHTML = `
<style>
.scene-canvas {
  display: block;
}
</style>
<slot name="viewportCanvas"></slot>
<canvas class="scene-canvas"></canvas>
`;
class Rm extends ee {
  #e;
  #t;
  #i = this.onSlotChange.bind(this);
  constructor() {
    super(Vo);
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
customElements.get("tradex-viewport") || window.customElements.define("tradex-viewport", Rm);
const Wo = document.createElement("template");
Wo.innerHTML = `
<style>
  tradex-viewport {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
  <tradex-viewport></tradex-viewport>
`;
class km extends ee {
  #e;
  constructor() {
    super(Wo);
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
customElements.get("tradex-grid") || window.customElements.define("tradex-grid", km);
const Fo = document.createElement("template");
Fo.innerHTML = `
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
class _m extends ee {
  #e;
  #t;
  #i;
  #r;
  #s;
  #n;
  #o = [];
  #h;
  constructor() {
    super(Fo);
  }
  destroy() {
  }
  connectedCallback() {
    super.connectedCallback(
      () => {
        this.#n = this.shadowRoot.querySelector("slot"), this.#t = this.shadowRoot.querySelector(".legends"), this.#i = this.shadowRoot.querySelector(".title"), this.#r = this.shadowRoot.querySelector("dl"), this.#s = this.shadowRoot.querySelector(".controls"), this.#h = this.onSlotChange.bind(this), this.#n.addEventListener("slotchange", this.#h);
      }
    );
  }
  disconnectedCallback() {
    this.#n.removeEventListener("slotchange", this.#h);
  }
  get slot() {
    return this.#n;
  }
  get legends() {
    return this.#t;
  }
  get elTitle() {
    return this.#i;
  }
  get elInputs() {
    return this.#r;
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
    return i += `<span id="${s}_up" class="control up" data-icon="up">${Dh}</span>`, i += `<span id="${s}_down" class="control down" data-icon="down">${Ih}</span>`, e?.type === "indicator" && (i += `<span id="${s}_visible" class="control visible" data-icon="visible">${$h}</span>`, i += `<span id="${s}_notVisible" class="control notvisible" data-icon="notVisible">${Bh}</span>`), e?.type !== "indicator" && (i += `<span id="${s}_collapse" class="control collapse" data-icon="collapse">${_h}</span>`, i += `<span id="${s}_expand" class="control expand" data-icon="expand">${Hh}</span>`, i += `<span id="${s}_maximize" class="control maximize" data-icon="maximize">${kh}</span>`, i += `<span id="${s}_restore" class="control restore" data-icon="restore">${Rh}</span>`), i += e?.type !== "chart" ? `<span id="${s}_remove" class="control remove" data-icon="remove">${Ah}</span>` : "", i += e?.type !== "secondary" ? `<span id="${s}_config" class="control config" data-icon="config">${Jr}</span>` : "", i;
  }
}
customElements.get("tradex-legends") || window.customElements.define("tradex-legends", _m);
const Go = document.createElement("template");
Go.innerHTML = `
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
class Hm extends ee {
  #e;
  #t;
  constructor() {
    super(Go);
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
customElements.get("tradex-chartpane") || window.customElements.define("tradex-chartpane", Hm);
const qo = document.createElement("template");
qo.innerHTML = `
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
class $m extends ee {
  #e;
  #t;
  #i;
  #r;
  constructor() {
    super(qo);
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
    return this.#r;
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
    return this.#r / this.#t;
  }
  previousDimensions() {
    this.#e = this.#i ? this.#i : this.clientWidth, this.#t = this.#r ? this.#r : this.clientHeight, this.#i = this.clientWidth, this.#r = this.clientHeight;
  }
}
customElements.get("tradex-rows") || window.customElements.define("tradex-rows", $m);
const Yo = document.createElement("template");
Yo.innerHTML = `
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
    height: calc(100% - ${xs}px);
    border: 1px solid;
    border-color: var(--txc-border-color, ${H.COLOUR_BORDER}); 
  }
  tradex-time {
    position: relative;
    width: calc(100% - ${Xt}px);
    height: ${xs}px;
    overflow: hidden;
    margin-left: 1px;
    z-index: 1;
  }
</style>
<div id="viewport"></div>
<tradex-rows></tradex-rows>
<tradex-time></tradex-time>
`;
class Bm extends ee {
  #e;
  #t;
  #i;
  #r;
  constructor() {
    super(Yo);
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
    this.#r = e, this.setMain();
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
    let e = x(this.#r?.time?.height) ? this.#r.time.height : xs, i = this.#r.tools.location == "none" ? 60 : 0;
    this.rows.style.height = `calc(100% - ${e}px)`, this.rows.style.left = `${i}px`, this.time.style.left = `${i}px`, this.viewport.style.left = `${i}px`;
  }
}
customElements.get("tradex-main") || window.customElements.define("tradex-main", Bm);
const Xo = document.createElement("template");
Xo.innerHTML = `
  <slot></slot>
`;
class Um extends ee {
  constructor() {
    super(Xo);
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
        height: ${Ke.ICONSIZE};
        width: ${Ke.ICONSIZE};
        fill: ${Ke.COLOUR_ICON};
      }
      svg:hover {
        fill: ${Ke.COLOUR_ICONHOVER};
      }
      .icon-wrapper {
        width: ${Ke.ICONSIZE};
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
customElements.get("tradex-tools") || window.customElements.define("tradex-tools", Um);
const jo = document.createElement("template");
jo.innerHTML = `
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
class zm extends ee {
  #e;
  #t;
  #i;
  constructor() {
    super(jo);
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
customElements.get("tradex-scale") || window.customElements.define("tradex-scale", zm);
const Vm = `
<style>
  tradex-tools {
    position: absolute; 
    top: 0; left: 0;
    width: ${ot}px;
    height: 100%; 
    min-height: 100%; 
  }
  tradex-main {
    position: absolute; 
    top: 0;
    right: 0;
    width: calc(100% - ${ot}px);
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
`, Ko = document.createElement("template");
Ko.innerHTML = Vm;
class Wm extends ee {
  #e;
  #t;
  #i;
  #r;
  constructor() {
    super(Ko);
  }
  destroy() {
  }
  connectedCallback() {
    super.connectedCallback(
      () => {
        this.#t = this.shadowRoot.querySelector("tradex-tools"), this.#i = this.shadowRoot.querySelector("tradex-main"), this.#r = this.shadowRoot.querySelector("tradex-scale");
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
    return this.#r;
  }
  start(e) {
    this.#e = e, this.setToolsLocation();
  }
  setYAxisLocation(e = this.#e?.yAxis?.location) {
    let i = x(this.#e?.tools?.width) ? this.#e.tools.width : ot, s;
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
        this.#e.tools.location = "right", this.#e.tools.width = this.#e?.tools?.width || ot, this.tools.style.display = "block", this.tools.style.left = void 0, this.tools.style.right = 0, this.tools.style.width = `${ot}px`;
        break;
      case "left":
      default:
        this.#e.tools.location = "left", this.#e.tools.width = this.#e?.tools?.width || ot, this.tools.style.display = "block", this.tools.style.left = 0, this.tools.style.right = void 0, this.tools.style.width = `${ot}px`;
        break;
    }
    this.setYAxisLocation();
  }
}
customElements.get("tradex-body") || window.customElements.define("tradex-body", Wm);
const Zo = document.createElement("template");
Zo.innerHTML = `
  <style>
    .utilsOptions {
      display: inline-block; float: right;
    }
  </style>
  <slot></slot>
  <div class="utilsOptions">
  </div>
`;
class Fm extends ee {
  constructor() {
    super(Zo);
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
customElements.get("tradex-utils") || window.customElements.define("tradex-utils", Fm);
const Qo = document.createElement("template");
Qo.innerHTML = `
<style>
</style>
<div class="colourpicker">
</div>
`;
class Gm extends ee {
  #e;
  #t;
  #i;
  #r;
  #s;
  #n;
  #o;
  #h;
  #l = {
    size: 128
  };
  constructor() {
    super(Qo);
  }
  destroy() {
  }
  connectedCallback() {
    super.connectedCallback(
      () => {
        this.#e = this.shadowRoot.querySelector(".colourpicker"), this.build();
      }
    ), this.#t = this.shadowRoot.querySelector(".mixer"), this.#i = this.shadowRoot.querySelector(".palette"), this.#r = this.shadowRoot.querySelector(".value"), this.#s = this.shadowRoot.querySelector(".model"), this.#n = this.shadowRoot.querySelector(".rgb"), this.#o = this.shadowRoot.querySelector(".alpha"), this.#h = this.shadowRoot.querySelector(".submit");
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
    return this.#r;
  }
  get elModel() {
    return this.#s;
  }
  get elRGB() {
    return this.#n;
  }
  get elAlpha() {
    return this.#o;
  }
  get elSubmit() {
    return this.#h;
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
    const n = s.viewport, r = {}, a = { x: 0, y: 0, width: this.#l.size, height: this.#l.size };
    this.#l.layers = r, this.#l.view = n, r.red = new be.Layer(a), r.green = new be.Layer(a), r.blue = new be.Layer(a), r.value = new be.Layer(a), r.composite = new be.Layer(a), n.addLayer(r.composite), r.grid = new be.Layer(a), n.addLayer(r.grid), this.#l[e] = { element: i, viewport: s, layers: r };
    let l = r.red.scene.context, h = [0, 0, this.#l.size, 0];
    mt(l, h, h), l = r.green.scene.context, mt(l, h, h), l = r.blue.scene.context, mt(l, h, h), l = r.value.scene.context, h = [0, 0, 0, this.#l.size], mt(l, h, h), this.compositeLayers(), l = r.grid.scene.context, go(l, 8, 16, 16, "#ffffff", "#cccccc"), n.render();
  }
  viewportNode() {
    const e = document.createElement("div");
    e.classList.add("viewport");
    const i = new be.Viewport({
      width: this.#l.size,
      height: this.#l.size,
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
    const e = this.#l.layers, i = ["red", "green", "blue", "value"], s = e.composite.scene.context;
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
customElements.get("tradex-colourpicker") || window.customElements.define("tradex-colourpicker", Gm);
const Jo = document.createElement("template");
Jo.innerHTML = `
  <slot name="widget"></slot>
`;
class qm extends ee {
  constructor() {
    super(Jo);
  }
  destroy() {
  }
}
customElements.get("tradex-widgets") || window.customElements.define("tradex-widgets", qm);
const Ym = `
  <style title="core">
    :host {
      position: relative;
      z-index: 0;
    }
    tradex-utils {
      height: ${Ve}px; 
      width: 100%; 
    }
    tradex-body {
      position: relative;
      height: calc(100% - ${Ve}px); 
      min-height: ${We - Ve}px;
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
class Xm extends ee {
  #e;
  #t;
  #i;
  #r;
  #s = Ft;
  #n = We;
  #o;
  #h;
  #l;
  #a;
  #c;
  #d;
  constructor() {
    const e = document.createElement("template");
    e.innerHTML = Ym, super(e, "closed"), this.#r = e;
  }
  destroy() {
    this.resizeObserver.disconnect();
  }
  static get observedAttributes() {
    return ["config", "disabled", "height", "stream", "width"];
  }
  connectedCallback() {
    if (this.doInit) {
      this.doInit = !1, this.shadowRoot.appendChild(this.#r.content.cloneNode(!0)), this.style.display = "block", this.style.minHeight = eo, this.#i = this.shadowRoot.querySelector("tradex-widgets"), this.#t = this.shadowRoot.querySelector("tradex-utils"), this.#e = this.shadowRoot.querySelector("tradex-body"), this.#n = this.parentElement.clientHeight || We, this.#s = this.parentElement.clientWidth || Ft;
      let e = this.getAttribute("height") || "100%", i = this.getAttribute("width") || "100%";
      this.setDimensions(i, e), this.resizeObserver = new ResizeObserver(Ie(this.onResized, 100, this)), this.resizeObserver.observe(this);
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
    this.setAttribute("id", Te(e));
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
    return this.#n;
  }
  get resizeEntries() {
    return this.#d;
  }
  elStart(e) {
    this.#c = e, this.setUtilsLocation();
  }
  onResized(e) {
    super.onResize(e);
    const i = Qr.includes(this.theme?.utils?.location) ? Ve : 0, { width: s, height: n } = e[0].contentRect;
    this.#s = s, this.#n = n, this.#d = e[0], this.elBody.style.height = `calc(100% - ${i}px)`, this.MainPane instanceof Bo, this.ToolsBar instanceof Uo && this.ToolsBar.onResized(), this.log(`onResize w: ${s}, h: ${n}`), this.emit("global_resize", { w: s, h: n });
  }
  setWidth(e) {
    x(e) ? e += "px" : C(e) && e.match($t) || (e = "100%"), this.style.width = e, this.#s = Math.round(this.getBoundingClientRect().width);
  }
  setHeight(e) {
    x(e) ? e += "px" : C(e) && e.match($t) || (this.#n = this.parentElement.getBoundingClientRect().height, e = this.#n + "px"), this.style.height = e, this.#n = Math.round(this.getBoundingClientRect().height);
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
      i = a.height ? a.height : l.height ? l.height : We, e = a.width ? a.width : l.width ? l.width : Ft;
    } else
      (!x(e) || !x(i)) && ((!C(e) || !e.match($t)) && (e = "100%"), (!C(i) || !i.match($t)) && (i = "100%"));
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
        this.theme.setProperty("utils.location", "top"), this.theme.setProperty("utils.height", Ve), this.#c.utils.location = "top", this.#c.utils.height = Ve, this.elUtils.style.display = "block", this.elUtils.style.height = `${Ve}px`, this.elBody.style.height = `calc(100% - ${Ve}px)`, this.elBody.style.minHeight = `${We - Ve}px`;
        break;
      case "none":
      case !1:
      default:
        this.theme.setProperty("utils.location", "none"), this.theme.setProperty("utils.height", 0), this.#c.utils.location = "none", this.#c.utils.height = 0, this.elUtils.style.display = "none", this.elUtils.style.height = "0px", this.elBody.style.height = "100%", this.elBody.style.minHeight = `${We}px`;
        break;
    }
  }
}
const jm = [
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
    icon: Ch,
    event: "utils_timezone"
  },
  {
    id: "screenshot",
    name: "Screenshot",
    icon: bh,
    event: "utils_screenshot"
  },
  {
    id: "settings",
    name: "Settings",
    icon: Jr,
    event: "utils_settings"
  }
];
class Km {
  #e = "Utilities";
  #t = "utils";
  #i;
  #r;
  #s;
  #n;
  #o;
  #h;
  #l;
  #a = {};
  #c = {};
  #d;
  #u = {};
  constructor(e, i) {
    this.#i = e, this.#r = i, this.#s = e.elUtils, this.#n = e.config?.utilsBar || jm, this.#h = e.WidgetsG, this.#l = e.indicatorClasses || Ao, this.#o = e.config.theme?.utils?.location || "none", (this.#o || this.#o == "none" || !Qr.includes(this.#o)) && (this.#s.style.height = 0, this.core.elBody.style.height = "100%"), this.#s.innerHTML = this.#s.defaultNode(this.#n), this.log(`${this.#e} instantiated`);
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
  get name() {
    return this.#e;
  }
  get shortName() {
    return this.#t;
  }
  get core() {
    return this.#i;
  }
  get options() {
    return this.#r;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return ne(this.#s);
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
    const e = this.#i, i = Ar(`#${e.id} .${$a} .icon-wrapper`);
    for (let s of i) {
      let n = s.id.replace("TX_", "");
      for (let r of this.#n)
        r.id === n && s.removeEventListener("click", this.#c[n].click), s.removeEventListener("pointerover", this.#c[n].pointerover), s.removeEventListener("pointerout", this.#c[n].pointerout);
    }
    this.#i.hub.expunge(this);
  }
  eventsListen() {
    this.on("utils_indicators", this.onIndicators, this), this.on("utils_timezone", this.onTimezone, this), this.on("utils_settings", this.onSettings, this), this.on("utils_screenshot", this.onScreenshot, this);
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
  onIconClick(e) {
    const i = Hs(e.target, "icon-wrapper");
    if (!w(i))
      return !1;
    const s = Date.now();
    if (s - this.#u[i.id] < 1e3)
      return !1;
    this.#u[i.id] = s;
    let n = i.dataset.event, r = i.dataset.menu || !1, a = {
      target: i.id,
      menu: r,
      evt: n
    }, l = i.dataset.action;
    this.emit(n, a), r ? this.emit("menu_open", a) : this.emit("util_selected", a), l && l(a, this.#i);
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
    const e = this.#s.querySelectorAll(".icon-wrapper");
    for (let i of e) {
      this.#u[i.id] = 0;
      let s = i.id.replace("TX_", ""), n = i.querySelector("svg");
      n.style.fill = wt.COLOUR_ICON, n.style.height = "90%";
      for (let r of this.#n)
        if (r.id === s && (this.#c[s] = {}, this.#c[s].click = this.onIconClick.bind(this), this.#c[s].pointerover = this.onIconOver.bind(this), this.#c[s].pointerout = this.onIconOut.bind(this), i.addEventListener("click", this.#c[s].click), i.addEventListener("pointerover", this.#c[s].pointerover), i.addEventListener("pointerout", this.#c[s].pointerout), s === "indicators" && (r.sub = Object.values(this.#l)), r?.sub)) {
          let a = {
            content: r.sub,
            primary: i
          }, l = this.#h.insert("Menu", a);
          i.dataset.menu = l.id, l.start();
        }
    }
  }
  onIndicators(e) {
  }
  onTimezone(e) {
    this.#i.notImplemented();
  }
  onSettings(e) {
    this.#i.notImplemented();
  }
  onScreenshot(e) {
    this.#i.downloadImage();
  }
}
const Zm = 150;
class we {
  #e;
  #t;
  #i;
  #r;
  #s;
  #n;
  #o;
  #h;
  #l;
  #a = {};
  static menuList = {};
  static menuCnt = 0;
  static class = Ln;
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
    this.#t = e, this.#i = i.core, this.#r = i, this.#e = i.id, this.#n = e.elements.elMenus, this.#s = this.#i.elWidgetsG, this.mount(this.#n);
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
    return ne(this.#o);
  }
  get type() {
    return we.type;
  }
  start() {
    this.position(), this.eventsListen();
  }
  end() {
    this.#n.querySelectorAll(`#${this.id} li`).forEach((i) => {
      i.removeEventListener("click", this.#a[this.id][i.id]);
    }), document.removeEventListener("click", this.#a[this.id].outside), this.off("global_resize", this.onResize, this);
  }
  eventsListen() {
    const e = this.#n.querySelectorAll(`#${this.id} li`);
    this.#a[this.id] = {}, e.forEach((i) => {
      this.#a[this.id][i.id] = this.onMenuSelect.bind(this), i.addEventListener("click", this.#a[this.id][i.id]);
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
    if (!this.#o.contains(e.target) && !this.#r.primary.contains(e.target) && ht(this.#o)) {
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
    e.lastElementChild == null ? e.innerHTML = this.menuNode() : e.lastElementChild.insertAdjacentHTML("afterend", this.menuNode()), this.#o = this.#n.querySelector(`#${this.id}`);
  }
  static defaultNode() {
    return `
      <div slot="widget" class="${Ln}" style=""></div>
    `;
  }
  menuNode() {
    const e = this.#r, i = `position: absolute; z-index: 1000; display: none; border: 1px solid ${ts.COLOUR_BORDER}; background: ${ts.COLOUR_BG}; color: ${ts.COLOUR_TXT}; box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;`;
    let s = this.content(e);
    return `
      <div id="${e.id}" class="${Ba}" style="${i}">
        ${s}
      </div>
    `;
  }
  content(e) {
    const i = `list-style: none; text-align: left; margin:1em 1em 1em -2.5em; min-width: ${Zm}px`, s = "padding: .25em 1em .25em 1em; white-space: nowrap;", n = "display: inline-block; width: 4em;", r = "cursor: pointer;", a = `onmouseover="this.style.background ='#222'"`, l = `onmouseout="this.style.background ='none'"`;
    let h = `<ul style="${i}">`;
    if (e?.content)
      for (let m of e.content)
        h += `<li id="${m.id}" data-event="${m.event}" style="${s} ${r}" ${a} ${l}><a style="${r}"><span style="${n}">${m.id}</span><span>${m.name}</span></li></a>`;
    return h += "</ul>", h;
  }
  position() {
    let e = this.#s.getBoundingClientRect(), i = this.#r.primary.getBoundingClientRect(), s = Math.round(i.left - e.left), n = Math.round(i.bottom - e.top);
    this.#o.style.left = s + "px", this.#o.style.top = n + "px";
    let r = ne(this.#o);
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
      this.#a[this.id].outside = this.onOutsideClickListener.bind(this), document.addEventListener("click", this.#a[this.id].outside);
    }, 250);
  }
  close() {
    we.currentActive = null, this.#o.style.display = "none", this.emit("menuClosed", this.id);
  }
}
class Qe extends K {
  static name = "Dialogues";
  static type = "Dialogue";
  static class = "tradeXdialogue";
  static defaultStyles = `
  /** default Dialogue widget styles */
  `;
  static create(e, i) {
    return i.dragBar = F(i?.dragBar) ? i.dragBar : !0, i.close = F(i?.close) ? i.close : !0, i.type = i?.type || Qe.type, i.class = i?.class || "dialogue", i.id = i?.id || J("dialogue"), super.create(e, i);
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
    return Qe.type;
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
const ea = `
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
`, ta = document.createElement("template");
ta.innerHTML = `
<style>
  ${ea}
}
</style>
<div class="tabbedContent">
</div>
`;
class Qm extends ee {
  #e;
  #t;
  #i;
  #r;
  #s = this.onSlotChange.bind(this);
  constructor() {
    super(ta);
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
    return this.#r;
  }
  onSlotChange() {
    this.#r = Array.from(this.tabsSlot.assignedElements()).find((e) => e.localName === "tabs")[0];
  }
  insertTab(e) {
    let { id: i, label: s, content: n, checked: r } = e;
    switch (typeof i) {
      case "string":
      case "number":
        break;
      default:
        i = this.#r.length;
    }
    let a = Li(i, s, n, r);
    a = this.#t.insertAdjacentHTML("afterend", a), this.#r.push({ id: i, label: s, content: n, checked: r, tab: a });
  }
  removeTab(e) {
    if (C(e)) {
      let i = this.#t.querySelectorAll(`.tab-${e}`);
      for (let s of i)
        s.remove();
      for (let s = 0; s < this.#r.length; s++)
        this.#r[s].id == e && delete this.#r[s];
    } else
      x(e) && this.#t.querySelectorAll(".input");
  }
}
function Jm(o = {}, e) {
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
customElements.get("tradex-tabs") || window.customElements.define("tradex-tabs", Qm);
class ki extends Qe {
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

  ${ea} 
  `;
  static create(e, i) {
    return i.dragBar = !0, i.close = !0, i.type = ki.type, i.class = "config", i.id = J("config"), new ki(e, i);
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
        ${Jm(i)}
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
        Mr.includes(e[n][r]?.type) && (i[n] += Rr(n, e[n][r]));
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
class ep extends Qe {
  static name = "ColourPicker";
  static type = "ColourPicker";
  static class = "tradeXcolourPicker";
  static defaultStyles = `
  /** default Colour Picker widget styles */

  .tradeXwindow.picker {
    overflow: hidden;
  }

  .tradeXwindow.picker .content {
    padding: 0;
  }
  `;
  static create(e, i) {
    return i.dragBar = !0, i.close = !0, i.type = Qe.type, i.class = "picker", i.id = J("picker"), new Qe(e, i);
  }
  static defaultNode() {
    return `
      <div slot="widget" class="tradeXcolourPicker" style="">
        <tradex-colourpicker></tradex-colourpicker>
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
}
class Le {
  static progressList = {};
  static progressCnt = 0;
  static class = Nn;
  static type = "progress";
  static name = "Progress";
  static icons = {
    loadingBars: Qh,
    loadingSpin: Jh
  };
  static defaultNode() {
    return `
      <div slot="widget" class="${Nn}" style=""></div>
    `;
  }
  static create(e, i) {
    const s = `progress_${++Le.progressCnt}`;
    return i.id = s, Le.progressList[s] = new Le(e, i), Le.progressList[s];
  }
  static destroy(e) {
    Le.progressList[e].destroy(), delete Le.progressList[e];
  }
  #e;
  #t;
  #i;
  #r;
  #s;
  #n;
  #o;
  #h;
  constructor(e, i) {
    this.#t = e, this.#i = i.core, this.#r = i, this.#e = i.id, this.#n = e.elements.elProgress, this.#s = this.#i.elWidgetsG, this.init();
  }
  destroy() {
    this.#n.remove();
  }
  get type() {
    return Le.type;
  }
  init() {
    this.mount(this.#n);
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
      <div id="${this.#r.id}" class="progress ${e.type}" style="${i}">${n}</div>
    `;
  }
  mount(e) {
    let i = "loadingBars";
    this.#r?.type in Le.icons && (i = this.#r?.type);
    const s = { type: i, icon: Le.icons[i] };
    e.lastElementChild == null ? e.innerHTML = this.progressNode(s) : e.lastElementChild.insertAdjacentHTML("afterend", this.progressNode(s)), this.#o = this.#n.querySelector(`#${this.#r.id}`), this.#h = this.#o.querySelector("svg"), this.#h.style.fill = `${ic.COLOUR_ICONHOVER};`;
  }
}
const hs = {
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
class tp {
  #e;
  #t = "Widgets";
  #i = "widgets";
  #r;
  #s;
  #n;
  #o = {};
  #h = { Divider: ce, Progress: Le, Menu: we, Window: K, Dialogue: Qe, ConfigDialogue: ki, ColourPicker: ep };
  #l = {};
  #a = {};
  #c;
  #d;
  #u;
  constructor(e, i) {
    this.#r = e, this.#s = i, this.#o = { ...this.#h, ...i.widgets }, this.#c = e.elWidgetsG, this.mount(this.#c);
    for (let s in this.#o) {
      let n = this.#o[s], r = `el${n.name}`;
      this.#a[r] = this.#c.querySelector(`.${n.class}`), this.#a[r].innerHTML = `
      <style title="${n.name}">
        ${n?.defaultStyles || ""}
      </style>
      `, n.stylesInstalled = !0;
    }
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
    this.#e = Te(e);
  }
  get id() {
    return this.#e || `${this.#r.id}-${this.#i}`;
  }
  get name() {
    return this.#t;
  }
  get shortName() {
    return this.#i;
  }
  get core() {
    return this.#r;
  }
  get options() {
    return this.#s;
  }
  get elements() {
    return this.#a;
  }
  get instances() {
    return this.#l;
  }
  set stateMachine(e) {
    this.#n = new Ge(e, this);
  }
  get stateMachine() {
    return this.#n;
  }
  get types() {
    return this.#o;
  }
  start() {
    this.eventsListen(), hs.id = this.id, hs.context = this, this.stateMachine = hs, this.stateMachine.start();
  }
  destroy() {
    this.#r.hub.expunge(this), this.stateMachine.destroy();
    for (let e in this.#l)
      this.delete(e);
    for (let e in this.#o)
      this.#o[e].destroy();
  }
  eventsListen() {
    this.on("resize", this.onResize, this), this.on("menu_open", this.onOpenMenu, this), this.on("menu_close", this.onCloseMenu, this), this.on("menu_off", this.onCloseMenu, this), this.on("menuItem_selected", this.onMenuItemSelected, this), this.on("global_resize", this.onResize, this);
  }
  on(e, i, s = this) {
    this.#r.on(e, i, s);
  }
  off(e, i, s = this) {
    this.#r.off(e, i, s);
  }
  emit(e, i) {
    this.#r.emit(e, i);
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
  onResize(e) {
    this.setDimensions(e), this.elements.elDividers.style.width = `${this.core.width}px`;
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
    for (let s in this.#o) {
      let n = this.#o[s];
      i.indexOf(n.type) === -1 && (e += n.defaultNode(), i.push(n.type));
    }
    return e;
  }
  insert(e, i) {
    if (!(e in this.#o) || !w(i))
      return !1;
    i.core = this.core;
    const s = this.#o[e].create(this, i);
    return this.#l[s.id] = s, s;
  }
  delete(e) {
    if (!C(e) || !(e in this.#l))
      return !1;
    const i = this.#l[e].type;
    return this.#o[i].destroy(e), !0;
  }
}
function Sr(o, e, i, s, n, r) {
  const a = o.theme, l = document.createElement("template"), h = o.Timeline.graph.viewport.scene, m = o.MainPane, f = m.graph.viewport.scene, v = m.width, T = m.height, E = new be.Viewport({
    width: v,
    height: T,
    container: l
  }), M = E.scene.context;
  let D = 0, re = 0, me = v - o.Chart.scale.width;
  a?.yAxis?.location == "left" && (re = o.Chart.scale.width, me = 0);
  let _;
  M.save(), Qs(M, 0, 0, v, T, { fill: a.chart.Background }), M.drawImage(f.canvas, re, 0, f.width, f.height);
  for (const [L, oe] of o.ChartPanes) {
    let X = oe.graph.viewport.scene, { width: ae, height: pe } = X, fe = oe.scale.graph.viewport.scene, { width: ut, height: qe } = fe;
    D > 0 && (_ = { stroke: a.divider.line }, Kt(M, D, 0, m.width, _)), M.drawImage(X.canvas, re, D, ae, pe), M.drawImage(fe.canvas, me, D - 1, ut, qe), D += pe;
  }
  M.drawImage(h.canvas, 0, D, h.width, h.height), _ = {
    text: o.config.title,
    colour: a.chart.TextColour,
    fontSize: a.chart.FontSize * 1.5,
    fontWeight: "normal",
    fontFamily: a.chart.FontFamily,
    textBaseLine: "top"
  }, ho(M, 6, 6, _);
  const I = (L) => {
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
  w(r) ? Rs(r?.imgURL).then((L) => {
    I(L);
  }).catch((L) => {
    console.error(L);
  }) : I();
}
class O extends Xm {
  static #e = nn;
  static #t = 0;
  static #i = {};
  static #r = {};
  static #s = null;
  static #n = !1;
  static #o = [];
  static #h = null;
  static #l = null;
  static #a = !1;
  static get version() {
    return O.#e;
  }
  static get talibPromise() {
    return O.#s;
  }
  static get talibReady() {
    return O.#n;
  }
  static get talibAwait() {
    return O.#o;
  }
  static get talibError() {
    return O.#h;
  }
  static get webWorkers() {
    return Ne;
  }
  static get TALibWorker() {
    return O.#l;
  }
  static #c = `${kt} requires "talib-web" to function properly. Without it, some features maybe missing or broken.`;
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
  #u = kt;
  #m = Vt;
  #v;
  #f;
  #M;
  #w;
  #p;
  #x;
  #S;
  #g;
  #b;
  #T;
  #E;
  #O;
  #N = !1;
  #C = null;
  #L = R;
  #P;
  #y;
  #R = Ao;
  #k = { ...bi };
  #H = { ...bi };
  #A = { ...bi };
  #I;
  #_;
  #j;
  chartWMin = Ft;
  chartHMin = We;
  chartW_Reactive = !0;
  chartH_Reactive = !0;
  chartBGColour = H.COLOUR_BG;
  chartTxtColour = H.COLOUR_TXT;
  chartBorderColour = H.COLOUR_BORDER;
  #W;
  #F;
  #D = {
    chart: {},
    time: {}
  };
  #G;
  panes = {
    utils: this.#W,
    tools: this.#F,
    main: this.#D
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
  #B = 0;
  #ee = 0;
  #q = { x: 0, y: 0 };
  #J = [!1, !1, !1];
  #Y;
  #X;
  #U;
  #K;
  #Z;
  #Q;
  #z = !1;
  #V = !1;
  static create(e) {
    let i = he(lc);
    return w(e) && Object.keys(e).length > 0 && ((!("watermark" in e) || !C(e?.watermark?.text) && !("imgURL" in e?.watermark)) && (i.watermark = { display: !1 }), i = lt(i, e)), O.#t == 0 && (O.#i.CPUCores = navigator.hardwareConcurrency, O.#i.api = {
      permittedClassNames: O.#d
    }), (typeof i.talib != "object" || typeof i.talib.init != "function") && (O.#n = !1, O.#h = new Error(`${O.#c}`)), !O.#n && O.#h === null && (O.#s = i.talib.init(i.wasm), O.#s.then(
      () => {
        O.#n = !0;
        for (let s of O.#o)
          N(s) && s();
      },
      () => {
        O.#n = !1;
      }
    )), i;
  }
  static destroy(e) {
    if (!(e instanceof O))
      return !1;
    const i = e.inCnt;
    return e.destuction = !0, e.destroy(), delete O.#r[i], !0;
  }
  static cnt() {
    return O.#t++;
  }
  constructor() {
    super(), this.#w = this, this.#v = this, this.#C = O.cnt(), this.logs = !1, this.infos = !1, this.warnings = !1, this.errors = !1, this.timer = !1, this.setID(null), this.#P = this.#L.create({}, !1, !1), console.warn(`!WARNING!: ${kt} changes to config format, for details please refer to https://github.com/tradex-app/TradeX-chart/blob/master/docs/notices.md`), this.log(`${Vt} instance count: ${this.inCnt}`), this.oncontextmenu = window.oncontextmenu, this.#X = Ne;
    const e = this.#k;
    e.primaryPane = { ...e.primaryPane, ...$o.primaryPane }, this.#H = { ...As };
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
    return this.#m;
  }
  get options() {
    return this.#M;
  }
  get config() {
    return this.#f;
  }
  get core() {
    return this.#v;
  }
  get inCnt() {
    return this.#C;
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
    return this.#D;
  }
  get Timeline() {
    return this.#D.time;
  }
  get WidgetsG() {
    return this.#G;
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
  get CustomOverlays() {
    return this.#A;
  }
  get ready() {
    return this.#N;
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
    return x(this.#y.initialCnt) ? this.#y.initialCnt : za;
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
    return this.#B;
  }
  get smoothScrollOffset() {
    return 0;
  }
  get rangeScrollOffset() {
    return Math.floor(this.bufferPx / this.candleW);
  }
  get mousePos() {
    return this.#q;
  }
  get pointerButtons() {
    return this.#J;
  }
  set pricePrecision(e) {
    this.setPricePrecision(e);
  }
  get pricePrecision() {
    return this.#Z;
  }
  get volumePrecision() {
    return this.#Q;
  }
  set stream(e) {
    return this.setStream(e);
  }
  get stream() {
    return this.#U;
  }
  get worker() {
    return this.#X;
  }
  get isEmpty() {
    return this.#P.IsEmpty;
  }
  set candles(e) {
    w(e) && (this.#K = e);
  }
  get candles() {
    return this.#K;
  }
  get progress() {
    return this.#Y;
  }
  get customOverlays() {
    return this.#A;
  }
  get optionalOverlays() {
    return lt({ ...this.#H }, this.#A);
  }
  start(e) {
    this.log(`${kt} configuring...`), O.create(e);
    const i = O.create(e);
    this.logs = i?.logs ? i.logs : !1, this.infos = i?.infos ? i.infos : !1, this.warnings = i?.warnings ? i.warnings : !1, this.errors = i?.errors ? i.errors : !1, this.timer = i?.timer ? i.timer : !1, this.#f = i, this.#C = i.cnt || this.#C, this.#I = i.talib, (!("theme" in i) || !w(i.theme)) && (i.theme = Bi);
    const s = C(i?.id) ? i.id : null;
    this.setID(s), this.classList.add(this.id), this.log("processing state...");
    let n = he(i?.state) || {};
    n.id = this.id, n.core = this;
    let r = i?.deepValidate || !1, a = i?.isCrypto || !1;
    this.#P = this.#L.create(n, r, a), delete i.state, this.log(`${this.name} id: ${this.id} : created with a ${this.state.status} state`);
    let l = "1s", h = V;
    if (!w(i?.stream) && this.state.data.chart.data.length < 2 ? (this.warn(`${kt} has no chart data or streaming provided.`), { tf: l, ms: h } = vi(i?.timeFrame)) : w(i?.stream) && this.state.data.chart.data.length < 2 ? ({ tf: l, ms: h } = vi(i?.timeFrame), this.#z = !0) : (l = this.state.data.chart.tf, h = this.state.data.chart.tfms), this.log(`tf: ${l} ms: ${h}`), this.#f.callbacks = this.#f.callbacks || {}, w(i))
      for (const f in i)
        f in this.props() && this.props()[f](i[f]);
    const m = w(i?.range) ? i.range : {};
    if (m.interval = h, m.core = this, this.getRange(null, null, m), this.#y.Length > 1) {
      const f = Ps(this.#$, this.#f?.range?.startTS), v = x(f) ? f + this.#y.initialCnt : this.allData.data.length, T = x(f) ? f : v - this.#y.initialCnt;
      this.#y.initialCnt = v - T, this.setRange(T, v), i.range?.center && this.jumpToIndex(T, !0, !0);
    }
    this.parentElement && this.insertAdjacentHTML("beforebegin", `<style title="${this.id}_style"></style>`), this.#G = new tp(this, { widgets: i?.widgets }), this.#W = new Km(this, i), this.#F = new Uo(this, i), this.#D = new Bo(this, i), this.setTheme(this.#j.id), this.log(`${this.#u} V${O.version} configured and running...`), this.#B = this.bufferPx * -1, this.eventsListen(), this.elStart(this.theme), this.elBody.start(this.theme), this.UtilsBar.start(), this.ToolsBar.start(), this.MainPane.start(), this.WidgetsG.start(), this.#Y = this.WidgetsG.insert("Progress", {}), this.stream = this.#f.stream, this.#z && this.on(Ze, this.delayedSetRange, this), this.#N = !0, this.refresh();
  }
  destroy() {
    if (this?.destuction !== !0)
      return O.destroy(this), !0;
    this.log("...cleanup the mess"), this.removeEventListener("mousemove", this.onMouseMove), this.hub.expunge(this), this.UtilsBar.destroy(), this.ToolsBar.destroy(), this.MainPane.destroy(), this.WidgetsG.destroy(), this.#X.end(), this.#L = null;
  }
  eventsListen() {
    this.addEventListener("mousemove", this.onMouseMove.bind(this)), this.on(Ze, this.onStreamUpdate, this), this.on("state_mergeComplete", () => this.#Y.stop());
  }
  onMouseMove(e) {
    this.#q.x = e.clientX, this.#q.y = e.clientY;
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
        this.#j = this.addTheme(e);
      },
      stream: (e) => this.#U = w(e) ? e : {},
      pricePrecision: (e) => this.setPricePrecision(e),
      volumePrecision: (e) => this.setVolumePrecision(e)
    };
  }
  getInCnt() {
    return this.#C;
  }
  setID(e) {
    C(e) ? this.id = e : this.id = `${J(Vt)}_${this.#C}`;
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
    (!x(e) || e < 0) && (e = Ya), this.#Z = e;
  }
  setVolumePrecision(e) {
    (!x(e) || e < 0) && (e = Xa), this.#Q = e;
  }
  addTheme(e) {
    const i = Ae.create(e, this);
    return this.#_ instanceof Ae || (this.#_ = i), i;
  }
  setTheme(e) {
    if (!this.theme.list.has(e))
      return !1;
    this.#_.setTheme(e, this);
    const i = this.#_, s = document.querySelector(`style[title=${this.id}_style]`), n = `var(--txc-border-color, ${i.chart.BorderColour}`;
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
    e = Math.round(e), x(e) && e <= 0 && e >= this.bufferPx * -1 ? this.#B = e : this.emit("Error", "setScrollPos: not a valid value");
  }
  setState(e) {
    if (!R.has(e))
      return this.warn(`${this.name} id: ${this.id} : Specified state does not exist`), !1;
    if (e === this.key)
      return !0;
    this.stream.stop(), this.MainPane.reset(), this.#P = R.get(e);
    const i = {
      interval: this.#P.data.chart.tfms,
      core: this
    };
    if (this.getRange(null, null, i), this.range.Length > 1) {
      const s = Ps(this.time, void 0), n = s ? s + this.range.initialCnt : this.#P.data.chart.data.length - 1, r = s || n - this.range.initialCnt;
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
      return this.allData.data.length == 0 && C(e.timeFrame) && ({ tf, ms } = vi(e?.timeFrame), this.range.interval = ms, this.range.intervalStr = tf, this.#$.timeFrameMS = ms, this.#$.timeFrame = tf), this.#U = new bt(this), this.#f.stream = this.#U.config, this.#U;
  }
  stopStream() {
    this.stream instanceof bt && this.stream.stop();
  }
  delayedSetRange() {
    for (; this.#z; ) {
      let e = this.range.Length * 0.5;
      this.setRange(e * -1, e), this.off(Ze, this.delayedSetRange, this), this.#z = !1;
    }
  }
  updateRange(e) {
    if (!P(e) || !x(e[4]) || e[4] == 0)
      return;
    let i, s;
    i = e[4], s = this.#B + i, s % this.candleW, s < this.bufferPx * -1 ? (s = 0, this.offsetRange(this.rangeScrollOffset * -1)) : s > 0 && (s = this.bufferPx * -1, this.offsetRange(this.rangeScrollOffset)), this.#B = s, this.emit("scrollUpdate", s);
  }
  offsetRange(e) {
    let i = this.range.indexStart - e, s = this.range.indexEnd - e;
    this.setRange(i, s);
  }
  getRange(e = 0, i = 0, s = {}) {
    this.#y = new Ss(e, i, s), this.#$.range = this.#y, this.#$.timeFrameMS = this.#y.interval, this.#$.timeFrame = this.#y.intervalStr;
  }
  setRange(e = 0, i = this.rangeLimit) {
    const s = this.config?.maxCandles ? this.config.maxCandles : this.Chart?.layerWidth ? this.Chart.layerWidth : this.Chart.width;
    this.#y.set(e, i, s), e < 0 && !this.#V ? this.emit("range_limitPast", { chart: this, start: e, end: i }) : i > this.range.dataLength && !this.#V && this.emit("range_limitFuture", { chart: this, start: e, end: i });
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
    this.#V = !0;
    let n = this.state.mergeData(e, i, s);
    return F(n) && (this.#V = !1), n;
  }
  isOverlay(e) {
    return In(e) && N(e.prototype?.draw) && !this.isIndicator(e) && Object.getPrototypeOf(e.prototype).constructor.isOverlay;
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
      w(n) && this.isOverlay(n?.class) && Object.keys(this.#A).includes(n?.location) ? (this.#A[n.location][s] = n, i[s] = !0, this.log(`Custom Overlay: ${s} - Registered`)) : (i[s] = !1, this.log(`Custom Overlay: ${s} - Rejected: Not a valid Overlay`));
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
    return In(e) && N(e.prototype?.draw) && "primaryPane" in e.prototype && !!e?.isIndicator;
  }
  setIndicators(e, i = !1) {
    if (!w(e))
      return !1;
    i && (console.warn("Expunging all default indicators!"), this.#R = {});
    const s = {};
    for (const [n, r] of Object.entries(e))
      C(r?.id) && C(r?.name) && C(r?.event) && this.isIndicator(r?.ind) ? (this.#R[n] = r, s[n] = !0, this.log(`Custom Indicator: ${n} - Registered`)) : (s[n] = !1, this.warn(`Custom Indicator: ${n} - Rejected: Not a valid indicator`));
    return s;
  }
  addIndicator(e, i = e, s = {}) {
    return this.#D.addIndicator(e, i, s) || this.error(`Indicator: ${e} - Error failed to add indicator`), e;
  }
  getIndicator(e) {
    return this.#D.getIndicator(e);
  }
  removeIndicator(e) {
    return this.#D.removeIndicator(e) || this.error(`Indicator: ${e} - Error failed to remove indicator`), e;
  }
  indicatorSettings(e, i) {
    return this.#D.indicatorSettings(e, i);
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
    return this.#L.addTrade(e);
  }
  removeTrade(e) {
    return this.#L.removeTrade(e);
  }
  addEvent(e) {
    return this.#L.addEvent(e);
  }
  removeEvent(e) {
    return this.#L.removeEvent(e);
  }
  resize(e, i) {
    return !x(e) && !x(i) ? !1 : (this.setDimensions(e, i), !0);
  }
  refresh() {
    this.ready && this.#D.refresh();
  }
  toImageURL(e, i, s, n) {
    return Sr(this, e, i, s, "url", n);
  }
  downloadImage(e = `${this.id}.png`, i, s, n) {
    Sr(this, e, i, s, "download", n);
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
window.customElements.get("tradex-chart") || (document.head.insertAdjacentHTML("beforeend", oc), document.head.insertAdjacentHTML("beforeend", ac), customElements.get("tradex-chart") || customElements.define("tradex-chart", O));
export {
  O as Chart,
  sp as DOM,
  Ht as EventHub,
  Ee as Indicator,
  U as Overlay,
  Ss as Range,
  Ge as StateMachine,
  B as canvas,
  he as copyDeep,
  ip as isPromise,
  lt as mergeDeep,
  rp as talibAPI,
  J as uid
};
