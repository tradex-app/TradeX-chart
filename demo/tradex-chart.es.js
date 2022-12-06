const DOM = {
  findByID(id) {
    return document.getElementById(id)
  },
  findByClass(cl) {
    return document.getElementsByClassName(cl)
  },
  findByName(name) {
    return document.getElementsByName(name)
  },
  fndByTag(tag) {
    return document.getElementsByTagName(tag)
  },
  findBySelector(sel) {
    return document.querySelector(sel)
  },
  findBySelectorAll(sel) {
    return document.querySelectorAll(sel)
  },
  isNode(o){
    return (
      typeof Node === "object" ? o instanceof Node :
      o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
    );
  },
  isElement(o){
    return (
      typeof HTMLElement === "object" ? o instanceof HTMLElement :
      o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
    );
  },
  isVisible(o) {
    if (!this.isElement(o)) return false
    return !!o && !!( o.offsetWidth || o.offsetHeight || o.getClientRects().length )
  },
  isInViewport(el) {
    if (!this.isElement(el)) return false
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },
  isVisibleToUser(el) {
    if (!this.isElement(el)) return false
    const style = getComputedStyle(elem);
    if (style.display === 'none') return false;
    if (style.visibility !== 'visible') return false;
    if (style.opacity < 0.1) return false;
    if (el.offsetWidth + el.offsetHeight + el.getBoundingClientRect().height +
        el.getBoundingClientRect().width === 0) {
        return false;
    }
    const elCenter   = {
        x: el.getBoundingClientRect().left + el.offsetWidth / 2,
        y: el.getBoundingClientRect().top + el.offsetHeight / 2
    };
    if (elCenter.x < 0) return false;
    if (elCenter.x > (document.documentElement.clientWidth || window.innerWidth)) return false;
    if (elCenter.y < 0) return false;
    if (elCenter.y > (document.documentElement.clientHeight || window.innerHeight)) return false;
    let pointContainer = document.elementFromPoint(elCenter.x, elCenter.y);
    do {
        if (pointContainer === elem) return true;
    } while (pointContainer = pointContainer.parentNode);
    return false;
  },
  elementDimPos(el) {
    if (!this.isElement(el)) return false
    let _x = 0;
    let _y = 0;
    let El = el;
    while( El && El.tagName.toLowerCase() != 'body' && !isNaN( El.offsetLeft ) && !isNaN(El.offsetTop ) ) {
        _x += El.offsetLeft - El.scrollLeft;
        _y += El.offsetTop - El.scrollTop;
        El = El.offsetParent;
    }
    const dim = el.getBoundingClientRect();
    let _w = dim.right - dim.left;
    let _h = dim.bottom - dim.top;
    let _v = this.isVisible(el);
    let _vp = this.isInViewport(el);
    return { top: _y, left: _x, width: _w, height: _h, visible: _v, viewport: _vp };
  },
  elementsDistance(el1, el2) {
    if (!this.isElement(el1) || !this.isElement(el1)) return false
    el1Location = this.elementDimPos(el1);
    el2Location = this.elementDimPos(el2);
    return {
      x: el1Location.top - el2Location.top,
      y: el1Location.left . el2Location.left,
      el1Location: el1Location,
      el2Location: el2Location,
    }
  },
  htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
  },
  htmlToElements(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.childNodes;
  },
  hideOnClickOutside(el) {
    if (!this.isElement(el)) return false
    const outsideClickListener = event => {
      if (!el.contains(event.target) && this.isVisible(el)) {
        el.style.display = 'none';
        removeClickListener();
      }
    };
    const removeClickListener = () => {
      document.removeEventListener('click', outsideClickListener);
    };
    document.addEventListener('click', outsideClickListener);
  },
  onClickOutside(el, cb) {
    if (!this.isElement(el)) return false
    const outsideClickListener = event => {
      if (!el.contains(event.target) && DOM.isVisible(el)) {
        cb();
        removeClickListener();
      }
    };
    const removeClickListener = () => {
      document.removeEventListener('click', outsideClickListener);
    };
    document.addEventListener('click', outsideClickListener);
  }
};

function isArray (value) {
  return Array.isArray(value)
}
function isFunction (value) {
  return value && typeof value === 'function'
}
function isObject (value) {
  return (
  typeof value === 'object' &&
  !Array.isArray(value) &&
  value !== null)
}
function isNumber (value) {
  return typeof value === 'number' && !isNaN(value)
}
function isBoolean (value) {
  return typeof value === 'boolean'
}
function isString (value) {
  return typeof value === 'string'
}

function mergeDeep(target, source) {
  if (!isObject(target) || !isObject(source)) {
    return source;
  }
  Object.keys(source).forEach(key => {
    const targetValue = target[key];
    const sourceValue = source[key];
    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      target[key] = targetValue.concat(sourceValue);
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      target[key] = mergeDeep(Object.assign({}, targetValue), sourceValue);
    } else {
      target[key] = sourceValue;
    }
  });
  return target;
}
function copyDeep(obj) {
  if (obj === null || typeof (obj) !== 'object' || 'isActiveClone' in obj)
      return obj;
  if (obj instanceof Date)
      var temp = new obj.constructor();
  else
      var temp = obj.constructor();
  for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
          obj['isActiveClone'] = null;
          temp[key] = copyDeep(obj[key]);
          delete obj['isActiveClone'];
      }
  }
  return temp;
}
function uid(tag="ID") {
  if (isNumber(tag)) tag = tag.toString();
  else if (!isString(tag)) tag = "ID";
  const dateString = Date.now().toString(36);
  const randomness = Math.random().toString(36).substring(2,5);
  return `${tag}_${dateString}_${randomness}`
}
function isArrayEqual(a1, a2) {
  let i = a1.length;
  while (i--) {
      if (a1[i] !== a2[i]) return false;
  }
  return true
}
 function debounce(fn, wait=100, scope, immediate=false) {
  var timeout;
  var core = function() {
    var context = scope || this;
    var args = arguments;
    var later = function() {
        timeout = null;
        if (!immediate) fn.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) fn.apply(context, args);
  };
  return core
}function throttle(fn, threshhold=250, scope) {
  var last, deferTimer;
  var core = function () {
    var context = scope || this;
    var now = +new Date(),
      args = arguments;
    if (last && now < last + threshhold) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
  function cancelTimer() {
    if (timeout) {
       clearTimeout(deferTimer);
       timeout = undefined;
    }
  }
  core.reset = function() {
    cancelTimer();
    last = 0;
  };
  return core
}

class StateMachine {
  #id
  #state
  #statePrev
  #context
  #config
  #mediator
  #status = "stopped"
  #events
  #event
  #eventData
  #actions
  #statuses = ["await", "idle", "running", "stopped"]
  constructor(config, mediator) {
    if (!StateMachine.validateConfig(config)) return false
    this.#id = config.id;
    this.#config = config;
    this.#state = config.initial;
    this.#context = config.context;
    this.#actions = config.actions;
    this.#mediator = mediator;
    this.#subscribe();
  }
  get id() { return this.#id }
  get state() { return this.#state }
  get previousSate() { return this.#statePrev }
  get context() { return this.#context }
  get mediator() { return this.#mediator }
  get status() { return this.#status }
  get event() { return this.#event }
  get eventData() { return this.#eventData }
  get actions() { return this.#actions }
  notify(event, data) {
    this.#event = event;
    this.#eventData = data;
    const currStateConfig = this.#config.states[this.#state];
      let destTransition = currStateConfig.on[event];
    if ( !destTransition
      || !isFunction(destTransition.action)
      || this.#status !== "running") {
      return false
    }
    let cond = destTransition?.condition?.type || destTransition?.condition || false;
    if ( cond
      && !this.condition.call(this, cond, destTransition.condition)) {
      return false
    }
    const destState = destTransition.target;
    const destStateConfig = this.#config.states[destState];
    currStateConfig?.onExit.call(this, data);
    destTransition.action.call(this, data);
    this.#statePrev = this.#state;
    this.#state = destState;
    destStateConfig?.onEnter.call(this, data);
    if ( this.#config.states[destState]?.on
      && (this.#config.states[destState].on['']
      || this.#config.states[destState].on?.always) ) {
        const transient
          = this.#config.states[destState].on['']
          || this.#config.states[destState].on.always;
        if (isArray(transient)) {
          for (let transition of transient) {
            let cond = transition?.condition?.type || transition?.condition || false;
            if (
                this.condition.call(this, cond, transition.condition)
                && isString(transition.target)
              ) {
              transition?.action.call(this, data);
              this.#statePrev = this.#state;
              this.#state = transition?.target;
              this.notify(null, null);
            }
          }
        }
        else if (isObject(transient) && isString(transient.target)) {
          let cond = transient?.condition?.type || transient?.condition || false;
          if (
              this.condition.call(this, cond, transient.condition)
              && isString(transient.target)
            ) {
            transient?.action.call(this, data);
            this.#statePrev = this.#state;
            this.#state = transient.target;
            this.notify(null, null);
          }
        }
    }
    return this.#state
  }
  condition(cond, event=null, params={}) {
    return (cond)? this.#config.guards[cond].call(this, this.#context, event, params) : false
  }
  canTransition(event) {
    const currStateConfig = this.#config.states[this.#state];
    return event in currStateConfig.on
  }
  start() { this.#status = "running"; }
  stop() { this.#status = "stopped"; }
  destroy() {
    this.#unsubscribe();
    this.#config = null;
  }
  #subscribe() {
    this.#events = new Set();
    for (let state in this.#config.states) {
      for (let event in this.#config.states[state].on) {
        this.#events.add(event);
      }
    }
    for (let event of this.#events) {
      this.#mediator.on(event, this.notify.bind(this, event), this.context);
    }
  }
  #unsubscribe() {
    for (let event of this.#events) {
      this.#mediator.off(event, this.notify);
    }
  }
  static validateConfig(c) {
    if (!isObject(c)) return false
    const required = ["id", "initial", "context", "states"];
      let keys = Object.keys(c);
    if (!isArrayEqual(required, keys)) return false
    if (!(c.initial in c.states)) return false
    for (let state in c.states) {
      if (!isObject(c.states[state])) return false
      if ("onEnter" in c.states[state] && !isFunction(c.states[state].onEnter)) return false
      if ("onExit" in c.states[state] && !isFunction(c.states[state].onExit)) return false
      if ("on" in c.states[state]) {
        for (let e in c.states[state].on) {
          let event = c.states[state].on[e];
          if (!isString(event.target)) return false
          if ("action" in event && !isFunction(event.action)) return false
        }
      }
    }
    return true
  }
}

class Mediator {
  valid
  #core
  #api
  #hub
  #subModules = {}
  #stateMachine
  constructor(core, api, modClass, options) {
    this.#core = core;
    this.#hub = core.hub;
    this.#api = api;
    const required = ['constructor','start','end',"name","shortName","mediator","options"];
    const target = Object.getOwnPropertyNames(modClass.prototype);
    const intersection = required.filter(x => target.includes(x));
    let name = modClass.prototype.constructor.name;
    if ("permittedClassNames" in api && !api?.permittedClassNames.includes(name))
      name = name.match(/^module_\s*([$A-Z_][0-9A-Z_$]*)/i);
    this.valid =
      (required.length === intersection.length)
      && (name !== null);
    this.log(`Is Module ${name} valid: ${this.valid}`);
    if (this.valid)  return new modClass(this, options)
  }
  get api() { return this.#api }
  get core() { return this.#core }
  set stateMachine(config) { this.#stateMachine = new StateMachine(config, this); }
  get stateMachine() { return this.#stateMachine }
  isStateMachineConfigValid(config) { StateMachine.validateConfig(config); }
  log(l) { this.#core.log(l); }
  info(i) { this.#core.info(i); }
  warning(w) { this.#core.warn(w); }
  error(e) { this.#core.error(e); }
  register(id, newModule, options, api) {
    const instance = this.#core.register(id, newModule, options, api);
    this.#subModules[instance.modID] = instance;
    return instance
  }
  on(topic, handler, context) {
    if (!this.#hub[topic]) this.#hub[topic] = [];
    this.#hub[topic].push({handler, context});
  }
  off(topic, handler) {
    const i = (this.#hub[topic] || []).findIndex(h => h === handler);
    if (i > -1) this.#hub[topic].splice(i, 1);
    if (this.#hub[topic].length === 0) delete this.#hub[topic];
  }
  emit(topic, data) {
    (this.#hub[topic] || []).forEach(cb => cb.handler.call(cb.context, data));
  }
  execute(channel, data, cb) {
  }
}

function weave(type, advised, advisedFunc, aopProxy) {
  let f, $execute, standalone = false,
      transfer = aopProxy.transfer,
      adviser = aopProxy.adviser,
      args = aopProxy.args;
  if (!advisedFunc) {
      standalone = true;
      $execute = advised;
  } else {
      $execute = advised[advisedFunc].bind(advised);
  }
  aopProxy.advised = $execute;
  switch(type){
      case 'before':
          f = function () {
              Array.prototype.push.call(arguments, args);
              let result = adviser.apply(advised, arguments);
              result = result && !transfer ? [result] : null;
              return $execute.apply(advised, result || arguments);
          };
          break;
      case 'after':
          f = function () {
              Array.prototype.push.call(arguments, args);
              let result = $execute.apply(advised, arguments);
              result = result && !transfer ? [result] : null;
              return adviser.apply(advised, result || arguments);
          };
          break;
      case 'around':
          let invocation = {
              proceed: function () {
                  return this.method.apply(this, this.args);
              }
          };
          f = function () {
              Array.prototype.push.call(arguments, args);
              invocation.args = arguments;
              invocation.method = $execute;
              invocation.name = advisedFunc;
              return adviser(invocation);
          };
          break;
      default:
          console.log("AOP Error", "Unsupported advice type:  " + type);
  }
  if (standalone) {
      return (advised = f);
  } else {
      return (advised[advisedFunc] = f);
  }
}
function Advisor(type, advised, advisedFunc = null){
  this.type = type;
  this.advised = advised;
  this.advisedMethod = advisedFunc;
  Object.freeze(this);
}
Advisor.prototype.add = function(adviser, method = null, transfer = true, args){
  adviser = method ? adviser[method].bind(adviser) : adviser;
  if (typeof adviser !== 'function') {
      throw new TypeError("[aop] An adviser function is required in addAdvice.");
  }
  return weave(this.type, this.advised, this.advisedMethod, { adviser: adviser, transfer: transfer, args: args });
};
Object.freeze(Advisor.prototype);
var aspect = {
  before: function (advised, advisedFunc = null) {
      return new Advisor('before', advised, advisedFunc);
  },
  after: function (advised, advisedFunc) {
      return new Advisor('after', advised, advisedFunc);
  },
  around: function (advised, advisedFunc) {
      return new Advisor('around', advised, advisedFunc);
  }
};

class Core {
  #modules = {}
  #modCnt = 0
  #plugins = {}
  #instances
  #sandboxes
  #running = {}
  #mediator
  #hub = {}
  logs = false
  infos = false
  warnings = false
  errors = false
  constructor(options) {
    if (isObject(options)) {
      for (const option in options) {
        if (option in this.props()) {
          this.props()[option](options[option]);
        }
      }
    }
  }
  props() {
    return {
      logs: (logs) => this.logs = (isBoolean(logs)) ? logs : false,
      infos: (infos) => this.infos = (isBoolean(infos)) ? infos : false,
      warnings: (warnings) => this.warnings = (isBoolean(warnings)) ? warnings : false,
      errors: (errors) => this.errors = (isBoolean(errors)) ? errors : false,
    }
  }
  get hub() { return this.#hub }
  log(l) { if (this.logs) console.log(l); }
  info(i) { if (this.infos) console.info(i); }
  warning(w) { if (this.warnings) console.warn(w); }
  error(e) { if (this.errors) console.error(e); }
  time(n) { if(this.timer) console.time(n); }
  timeLog(n) { if(this.timer) console.timeLog(n); }
  timeEnd(n) { if(this.timer) console.timeEnd(n); }
  subscribe(topic, cb, context) {
  }
  unsubscribe(topic, cb) {
  }
  publish(topic, cb, context) {
  }
  register(id, newModule, options, api) {
    ++this.#modCnt;
    let instance = new Mediator(this, api, newModule, options);
    if (instance.constructor.name === "Mediator") {
      throw new Error("module failed")
    }
    aspect.before(instance, "start").add(this, "beforeModStart", false, id);
    const modID = (isString(id)) ? `${id}_${this.#modCnt}` : `${this.#modCnt}`;
    instance.modID = modID;
    this.#modules[modID] = instance;
    return instance
  }
  beforeModStart() {
    const id = arguments[arguments.length - 1];
    this.#running[id] = this.#modules[id];
    this.log(`module ${id} is running`);
  }
  hookMountsAdd(targetObject, targetMethod) {
  }
  hookMount() {
    this.hookMount.prototype = {
      hooks: [],
      get:function() {
        return this.hooks
      },
      add:function(hook) {
        this.hooks.push(hook);
      },
      remove:function(hook) {
      }
    };
    return hooks
  }
}

var SX = { Core, Mediator };

const GlobalStyle = {
  COLOUR_BG: "#141414",
  COLOUR_BORDER: "#666",
  COLOUR_TXT: "#CCC",
  BORDER_THICKNESS: 0,
};
const ToolsStyle = {
  COLOUR_ICON: "#888"
};
const UtilsStyle = {
  COLOUR_ICON: "#888"
};
const MenuStyle = {
  COLOUR_BG: "#141414",
  COLOUR_BORDER: "#666",
  COLOUR_TXT: "#CCC",
};
const WindowStyle = {
  COLOUR_BG: "#141414",
  COLOUR_BORDER: "#666",
  COLOUR_TXT: "#CCC",
};
const CandleType = {
  CANDLE_SOLID: 'candle_solid',
  CANDLE_HOLLOW: 'candle_hollow',
  CANDLE_UP_HOLLOW: 'candle_up_hollow',
  CANDLE_DOWN_HOLLOW: 'candle_down_hollow',
  OHLC: 'ohlc',
  AREA: 'area'
};
const CandleStyle = {
  COLOUR_CANDLE_UP: "#00F04088",
  COLOUR_CANDLE_DN: "#F0004088",
  COLOUR_WICK_UP: "#0F4",
  COLOUR_WICK_DN: "#F04",
};
const VolumeStyle = {
  COLOUR_VOLUME_UP: "#00F04044",
  COLOUR_VOLUME_DN: "#F0004044",
  ONCHART_VOLUME_HEIGHT: 15,
};
const YAxisStyle_FONTWEIGHT = "normal";
const YAxisStyle_FONTSIZE = 12;
const YAxisStyle_FONTFAMILY = "Arial";
const YAxisStyle = {
  COLOUR_TICK: "#888",
  COLOUR_LABEL: "888",
  COLOUR_CURSOR: "#000",
  COLOUR_CURSOR_BG: "#CCC",
  FONTFAMILY: YAxisStyle_FONTFAMILY,
  FONTSIZE: YAxisStyle_FONTSIZE,
  FONTWEIGHT: YAxisStyle_FONTWEIGHT,
  FONT_LABEL: `${YAxisStyle_FONTWEIGHT} ${YAxisStyle_FONTSIZE}px ${YAxisStyle_FONTFAMILY}`,
  FONT_LABEL_BOLD: `bold ${YAxisStyle_FONTSIZE}px ${YAxisStyle_FONTFAMILY}`
};
const XAxisStyle_FONTWEIGHT = "normal";
const XAxisStyle_FONTSIZE = 12;
const XAxisStyle_FONTFAMILY = "Arial";
const XAxisStyle = {
  COLOUR_TICK: "#888",
  COLOUR_LABEL: "888",
  COLOUR_CURSOR: "#000",
  COLOUR_CURSOR_BG: "#CCC",
  FONTFAMILY: XAxisStyle_FONTFAMILY,
  FONTSIZE: XAxisStyle_FONTSIZE,
  FONTWEIGHT: XAxisStyle_FONTWEIGHT,
  FONT_LABEL: `${XAxisStyle_FONTWEIGHT} ${XAxisStyle_FONTSIZE}px ${XAxisStyle_FONTFAMILY}`,
  FONT_LABEL_BOLD: `bold ${YAxisStyle_FONTSIZE}px ${YAxisStyle_FONTFAMILY}`
};
const GridStyle = {
  COLOUR_GRID: "#333"
};
const PriceLineStyle = {
  lineWidth: 1,
  strokeStyle: "#ccc",
  lineDash: [1,1]
};
const LegendStyle = {
  text: "font-size: 12px; font-family: Avenir, Helvetica, Arial, sans-serif;",
  colour: "#ccc"
};
const defaultTheme = {
  candle: {
    Type: CandleType.CANDLE_SOLID,
    UpBodyColour: CandleStyle.COLOUR_CANDLE_UP,
    UpWickColour: CandleStyle.COLOUR_WICK_UP,
    DnBodyColour: CandleStyle.COLOUR_CANDLE_DN,
    DnWickColour: CandleStyle.COLOUR_WICK_DN,
  },
  volume: {
    Height: VolumeStyle.ONCHART_VOLUME_HEIGHT,
    UpColour: VolumeStyle.COLOUR_VOLUME_UP,
    DnColour: VolumeStyle.COLOUR_VOLUME_DN,
  },
  xAxis: {
    colourTick: XAxisStyle.COLOUR_TICK,
    colourLabel: XAxisStyle.COLOUR_LABEL,
    colourCursor: XAxisStyle.COLOUR_CURSOR,
    colourCursorBG: XAxisStyle.COLOUR_CURSOR_BG,
    fontFamily: XAxisStyle.FONTFAMILY,
    fontSize: XAxisStyle.FONTSIZE,
    fontWeight: XAxisStyle.FONTWEIGHT,
    line: "#656565"
  },
  yAxis: {
    colourTick: YAxisStyle.COLOUR_TICK,
    colourLabel: YAxisStyle.COLOUR_LABEL,
    colourCursor: YAxisStyle.COLOUR_CURSOR,
    colourCursorBG: YAxisStyle.COLOUR_CURSOR_BG,
    fontFamily: YAxisStyle.FONTFAMILY,
    fontSize: YAxisStyle.FONTSIZE,
    fontWeight: YAxisStyle.FONTWEIGHT,
    line: "#656565"
  },
  chart: {
    Background: GlobalStyle.COLOUR_BG,
    BorderColour: GlobalStyle.COLOUR_BORDER,
    BorderThickness: GlobalStyle.BORDER_THICKNESS,
    TextColour: GlobalStyle.COLOUR_TXT,
    GridColour: GridStyle.COLOUR_GRID,
  },
  onChart: {
  },
  ofChart: {
  },
  maxVolumeH: VolumeStyle.ONCHART_VOLUME_HEIGHT,
  legend: {
    text: LegendStyle.text,
    colour: LegendStyle.colour,
  }
};
const style = `
<style>
  .tradeXchart {}
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

</style>
`;

const NAME = "TradeX-Chart";
const ID = "TradeXChart";
const CLASS_DEFAULT   = "tradeXchart";
const CLASS_UTILS     = "tradeXutils";
const CLASS_BODY      = "tradeXbody";
const CLASS_WIDGETSG  = "tradeXwidgetsG";
const CLASS_TOOLS     = "tradeXtools";
const CLASS_MAIN      = "tradeXmain";
const CLASS_TIME      = "tradeXtime";
const CLASS_ROWS      = "tradeXrows";
const CLASS_ROW       = "tradeXrow";
const CLASS_GRID      = "tradeXgrid";
const CLASS_CHART     = "tradeXchart";
const CLASS_SCALE     = "tradeXscale";
const CLASS_YAXIS     = "tradeXyAxis";
const CLASS_MENUS     = "tradeXmenus";
const CLASS_MENU      = "tradeXmenu";
const CLASS_DIVIDERS  = "tradeXdividers";
const CLASS_WINDOWS   = "tradeXwindows";
const CLASS_WINDOW    = "tradeXwindow";
const RANGELIMIT = 500;
const STREAM_NONE      = "stream_None";
const STREAM_LISTENING = "stream_Listening";
const STREAM_STARTED   = "stream_Started";
const STREAM_STOPPED   = "stream_Stopped";
const STREAM_ERROR     = "stream_Error";
const STREAM_UPDATE    = "stream_candleUpdate";
const STREAM_NEWVALUE  = "stream_candleNew";
const STREAM_MAXUPDATE = 250;
const STREAM_PRECISION = 8;
const PRICE_PRECISION  = 2;
const VOLUME_PRECISION = 2;

const camera =
  `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4" ><path d="M471.993 112h-89.2l-16.242-46.75a32.023 32.023 0 00-30.229-21.5H175.241a31.991 31.991 0 00-30.294 21.691L129.1 112H40a24.027 24.027 0 00-24 24v312a24.027 24.027 0 0024 24h431.993a24.027 24.027 0 0024-24V136a24.027 24.027 0 00-24-24zm-8 328H48.007V144h104.01l23.224-68.25h161.081l23.71 68.25h103.961z" class="ci-primary"></path><path d="M256 168a114 114 0 10114 114 114.13 114.13 0 00-114-114zm0 196a82 82 0 1182-82 82.093 82.093 0 01-82 82z"></path></svg>`;
const chart =
  `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M376 160v32h65.372L252 381.373l-72-72L76.686 412.686l22.628 22.628L180 354.627l72 72 212-211.999V280h32V160H376z"></path><path d="M48 104H16v392h480v-32H48V104z"></path></svg>`;
const clock =
  `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M271.514 95.5h-32v178.111l115.613 54.948 13.737-28.902-97.35-46.268V95.5z"></path><path d="M256 16C123.452 16 16 123.452 16 256s107.452 240 240 240 240-107.452 240-240S388.548 16 256 16zm0 448c-114.875 0-208-93.125-208-208S141.125 48 256 48s208 93.125 208 208-93.125 208-208 208z"></path></svg>`;
const config =
  `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M245.151 168a88 88 0 1088 88 88.1 88.1 0 00-88-88zm0 144a56 56 0 1156-56 56.063 56.063 0 01-56 56z"></path><path d="M464.7 322.319l-31.77-26.153a193.081 193.081 0 000-80.332l31.77-26.153a19.941 19.941 0 004.606-25.439l-32.612-56.483a19.936 19.936 0 00-24.337-8.73l-38.561 14.447a192.038 192.038 0 00-69.54-40.192l-6.766-40.571A19.936 19.936 0 00277.762 16H212.54a19.937 19.937 0 00-19.728 16.712l-6.762 40.572a192.03 192.03 0 00-69.54 40.192L77.945 99.027a19.937 19.937 0 00-24.334 8.731L21 164.245a19.94 19.94 0 004.61 25.438l31.767 26.151a193.081 193.081 0 000 80.332l-31.77 26.153A19.942 19.942 0 0021 347.758l32.612 56.483a19.937 19.937 0 0024.337 8.73l38.562-14.447a192.03 192.03 0 0069.54 40.192l6.762 40.571A19.937 19.937 0 00212.54 496h65.222a19.936 19.936 0 0019.728-16.712l6.763-40.572a192.038 192.038 0 0069.54-40.192l38.564 14.449a19.938 19.938 0 0024.334-8.731l32.609-56.487a19.939 19.939 0 00-4.6-25.436zm-50.636 57.12l-48.109-18.024-7.285 7.334a159.955 159.955 0 01-72.625 41.973l-10 2.636L267.6 464h-44.89l-8.442-50.642-10-2.636a159.955 159.955 0 01-72.625-41.973l-7.285-7.334-48.117 18.024L53.8 340.562l39.629-32.624-2.7-9.973a160.9 160.9 0 010-83.93l2.7-9.972L53.8 171.439l22.446-38.878 48.109 18.024 7.285-7.334a159.955 159.955 0 0172.625-41.973l10-2.636L222.706 48H267.6l8.442 50.642 10 2.636a159.955 159.955 0 0172.625 41.973l7.285 7.334 48.109-18.024 22.447 38.877-39.629 32.625 2.7 9.972a160.9 160.9 0 010 83.93l-2.7 9.973 39.629 32.623z"></path></svg>`;
const cursor =
  `<svg width="46.08" height="46.08" aria-hidden="true" version="1.1" viewBox="-51.2 -51.2 614.4 614.4" xmlns="http://www.w3.org/2000/svg"><rect x="16" y="240.18" width="188.84" height="31.635"/><g transform="translate(-3.3234e-7 -112.18)"><rect x="307.16" y="352.37" width="188.84" height="31.635"/></g><rect transform="rotate(-90)" x="-496" y="240.18" width="188.84" height="31.635"/><rect transform="rotate(-90)" x="-204.84" y="240.18" width="188.84" height="31.635"/></svg>`;
const del =
  `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="46.08" height="46.08" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"></path><path d="M6.535 3H21a1 1 0 011 1v16a1 1 0 01-1 1H6.535a1 1 0 01-.832-.445l-5.333-8a1 1 0 010-1.11l5.333-8A1 1 0 016.535 3zm.535 2l-4.666 7 4.666 7H20V5H7.07zM13 10.586l2.828-2.829 1.415 1.415L14.414 12l2.829 2.828-1.415 1.415L13 13.414l-2.828 2.829-1.415-1.415L11.586 12 8.757 9.172l1.415-1.415L13 10.586z"></path></svg>`;
const fibonacci =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="4" y="6" width="16" height="1" rx="0.5"></rect><rect x="4" y="9" width="16" height="1" rx="0.5"></rect><rect x="4" y="15" width="16" height="1" rx="0.5"></rect><rect x="4" y="18" width="16" height="1" rx="0.5"></rect><rect x="4" y="12" width="16" height="1" rx="0.5"></rect><ellipse cx="12" cy="18.5" rx="1.5" ry="1.5"></ellipse><ellipse cx="16" cy="6.5" rx="1.5" ry="1.5"></ellipse><ellipse cx="8" cy="6.5" rx="1.5" ry="1.5"></ellipse></svg>`;
const line =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><rect x="5.989593505859375" y="17.303298950195312" width="14" height="1" rx="0.5" transform="matrix(0.7071067690849304,-0.7071067690849304,0.7071067690849304,0.7071067690849304,-10.480968421384205,9.30330124707234)"></rect><ellipse cx="16" cy="8" rx="1.5" ry="1.5"></ellipse><ellipse cx="7" cy="17" rx="1.5" ry="1.5"></ellipse></g></svg>`;
const measure =
  `<svg aria-hidden="true" width="46.08" height="46.08" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"> <path d="M 3.2758709,20.241377 11.758622,28.72413 28.72413,11.758622 20.241377,3.2758709 Z m 2.1206881,0 1.5905161,-1.590515 3.7112049,3.711203 1.060342,-1.060345 -3.7112027,-3.711204 1.0603441,-1.060344 2.1206876,2.12069 1.060346,-1.060346 -2.120689,-2.120688 1.060343,-1.060344 3.711203,3.711203 L 16,17.060346 l -3.711203,-3.711208 1.060341,-1.060341 2.12069,2.120687 1.060344,-1.060346 -2.120688,-2.120687 1.060344,-1.060343 3.711204,3.711205 1.060345,-1.060345 -3.711205,-3.7112046 1.060344,-1.0603441 2.120687,2.1206887 1.060346,-1.0603446 -2.120687,-2.1206883 1.590515,-1.5905161 6.362065,6.362063 -14.84482,14.84482 z" style="stroke-width:0.749776" /></svg>`;
const range =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><path  clip-rule="evenodd" d="M4.5 5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2 6.5A2.5 2.5 0 0 1 6.95 6H24v1H6.95A2.5 2.5 0 0 1 2 6.5zM4.5 15a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2 16.5a2.5 2.5 0 0 1 4.95-.5h13.1a2.5 2.5 0 1 1 0 1H6.95A2.5 2.5 0 0 1 2 16.5zM22.5 15a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-18 6a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2 22.5a2.5 2.5 0 0 1 4.95-.5H24v1H6.95A2.5 2.5 0 0 1 2 22.5z"></path><path fill="currentColor"  clip-rule="evenodd" d="M22.4 8.94l-1.39.63-.41-.91 1.39-.63.41.91zm-4 1.8l-1.39.63-.41-.91 1.39-.63.41.91zm-4 1.8l-1.4.63-.4-.91 1.39-.63.41.91zm-4 1.8l-1.4.63-.4-.91 1.39-.63.41.91z"></path></svg>`;
const text =
  `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M231.359 147l-80.921 205h45.155l15.593-39.5h89.628l15.593 39.5h45.155l-80.921-205zm-3.594 123.5L256 198.967l28.235 71.533z"></path><path d="M384 56H128V16H16v112h40v256H16v112h112v-40h256v40h112V384h-40V128h40V16H384zM48 96V48h48v48zm48 368H48v-48h48zm288-40H128v-40H88V128h40V88h256v40h40v256h-40zm80-8v48h-48v-48zM416 48h48v48h-48z"></path></svg>`;
const close =
  `<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"> <path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /> <g id="g718" transform="translate(0,1.2499996)"> <path d="M 7.5010125,7.9560661 5.355012,10.103066 c -0.472,0.472 -1.18,-0.2360003 -0.708,-0.7080003 L 7.6470125,6.3950659 c 0.195364,-0.195858 0.512636,-0.195858 0.708,0 l 3.0000005,2.9999998 c 0.472,0.472 -0.236,1.1800003 -0.708,0.7080003 L 8.5010125,7.9560661 c -0.431103,-0.417289 -0.523896,-0.423024 -1,0 z" style="" id="path566-5" /> <path d="m 7.4989873,5.5439348 -2.1460003,-2.147 c -0.472,-0.472 -1.18,0.236 -0.708,0.708 l 3.0000003,3 c 0.1953639,0.195858 0.5126361,0.195858 0.708,0 l 2.9999997,-3 c 0.472,-0.472 -0.236,-1.18 -0.708,-0.708 l -2.1459997,2.147 c -0.4311027,0.417289 -0.5238956,0.423024 -1,0 z" style="" id="path566-6-3" /> </g></svg>`;
const up =
  `<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"> <path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /> <path d="m 7.4989873,7.7026182 -2.1460003,2.147 c -0.472,0.4719998 -1.18,-0.236 -0.708,-0.708 l 3.0000003,-3 c 0.1953639,-0.1958581 0.5126361,-0.1958581 0.708,0 l 2.9999997,3 c 0.472,0.472 -0.236,1.1799998 -0.708,0.708 l -2.1459997,-2.147 c -0.4311027,-0.417289 -0.5238956,-0.423024 -1,0 z" style="" id="path566-6-3" /></svg>`;
const down =
  `<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"> <path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /> <path d="m 7.4989873,8.2973819 -2.1460003,-2.147 c -0.472,-0.472 -1.18,0.236 -0.708,0.708 l 3.0000003,3 c 0.1953639,0.1958581 0.5126361,0.1958581 0.708,0 l 2.9999997,-3 c 0.472,-0.472 -0.236,-1.18 -0.708,-0.708 l -2.1459997,2.147 c -0.4311027,0.417289 -0.5238956,0.423024 -1,0 z" style="" id="path566-6-3" /></svg>`;
const restore =
  `<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"> <path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /> <g id="g687" transform="translate(15.647255,-0.0288128)"> <path d="m -8.1462425,10.484879 -2.1460005,2.146999 c -0.472,0.472 -1.18,-0.236 -0.708,-0.708 l 3.0000005,-2.9999994 c 0.195364,-0.195858 0.512636,-0.195858 0.708,0 l 3.0000005,2.9999994 c 0.472,0.472 -0.236,1.18 -0.708,0.708 l -2.1460005,-2.146999 c -0.431103,-0.417289 -0.523896,-0.423024 -1,0 z" style="" id="path566-5" /> <path d="m -8.1482677,5.5727476 -2.1460003,-2.147 c -0.472,-0.472 -1.18,0.236 -0.708,0.708 l 3.0000003,3 c 0.1953639,0.195858 0.5126361,0.195858 0.708,0 l 2.9999997,-3 c 0.472,-0.472 -0.236,-1.18 -0.708,-0.708 l -2.1459997,2.147 c -0.4311027,0.417289 -0.5238956,0.423024 -1,0 z" style="" id="path566-6-3" /> </g></svg>`;
const maximize =
  `<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"> <path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /> <g id="g611" transform="translate(0.2050748,-0.8829888)"> <path d="m 7.2959375,11.933818 -2.146,-2.1469999 c -0.472,-0.4719998 -1.18,0.2359999 -0.708,0.7079999 l 3,3 c 0.195364,0.195858 0.512636,0.195858 0.708,0 l 3.0000005,-3 c 0.472,-0.472 -0.236,-1.1799997 -0.708,-0.7079999 L 8.2959375,11.933818 c -0.431103,0.417289 -0.523896,0.423024 -1,0 z" style="" id="path566" /> <path d="m 7.2939123,5.8321596 -2.146,2.147 c -0.4719998,0.472 -1.1799998,-0.236 -0.708,-0.708 l 3,-3 c 0.1953639,-0.195858 0.5126361,-0.195858 0.708,0 l 2.9999997,3 c 0.472,0.472 -0.236,1.18 -0.708,0.708 l -2.1459997,-2.147 c -0.4311027,-0.417289 -0.5238956,-0.423024 -1,0 z" style="" id="path566-6" /> </g></svg>`;
const collapse =
  `<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"> <path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /> <path d="m 11.500447,8.5 c 0.666666,0 0.666666,-1 0,-1 H 4.444275 c -0.1571231,0 -0.224029,0.07336 -0.2978281,0.1459999 -0.1958579,0.195364 -0.1958579,0.5126361 0,0.7080001 0,0 0.113806,0.146 0.320186,0.146 z" style="" id="path887" /></svg>`;
const fwdEnd =
  `<svg class="ov-icon" width="46.08" height="46.08" font-size="2.88em" aria-hidden="true" version="1.1" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"> <path d="m14 15c0.55228 0 1-0.44772 1-1v-12c0-0.55228-0.44772-1-1-1h-12c-0.55228 0-1 0.44772-1 1v12c0 0.55228 0.44772 1 1 1zm0-15c1.1046 0 2 0.89543 2 2v12c0 1.1046-0.89543 2-2 2h-12c-1.1046 0-2-0.89543-2-2v-12c0-1.1046 0.89543-2 2-2z" fill-rule="evenodd"/> <g transform="translate(-1.1585)" fill-rule="evenodd">  <path d="m8.2964 7.5-2.147-2.146c-0.472-0.472 0.236-1.18 0.708-0.708l3 3c0.19586 0.19536 0.19586 0.51264 0 0.708l-3 3c-0.472 0.472-1.18-0.236-0.708-0.708l2.147-2.146c0.41729-0.4311 0.42302-0.5239 0-1z"/>  <path d="m12.323 4.4996c0-0.66667-1-0.66667-1 0v7.0562c0 0.15712 0.07336 0.22403 0.146 0.29783 0.19536 0.19586 0.51264 0.19586 0.708 0 0 0 0.146-0.11381 0.146-0.32019z"/> </g></svg>`;
const rwdStart =
  `<svg class="ov-icon" width="46.08" height="46.08" font-size="2.88em" aria-hidden="true" version="1.1" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"> <path d="m2 15c-0.55228 0-1-0.44772-1-1v-12c0-0.55228 0.44772-1 1-1h12c0.55228 0 1 0.44772 1 1v12c0 0.55228-0.44772 1-1 1zm0-15c-1.1046 0-2 0.89543-2 2v12c0 1.1046 0.89543 2 2 2h12c1.1046 0 2-0.89543 2-2v-12c0-1.1046-0.89543-2-2-2z" fill-rule="evenodd"/> <g transform="matrix(-1 0 0 1 17.159 0)" fill-rule="evenodd">  <path d="m8.2964 7.5-2.147-2.146c-0.472-0.472 0.236-1.18 0.708-0.708l3 3c0.19586 0.19536 0.19586 0.51264 0 0.708l-3 3c-0.472 0.472-1.18-0.236-0.708-0.708l2.147-2.146c0.41729-0.4311 0.42302-0.5239 0-1z"/>  <path d="m12.323 4.4996c0-0.66667-1-0.66667-1 0v7.0562c0 0.15712 0.07336 0.22403 0.146 0.29783 0.19536 0.19586 0.51264 0.19586 0.708 0 0 0 0.146-0.11381 0.146-0.32019z"/> </g></svg>`;

var utilsList = [
  {
    id: "indicators",
    name: "Indicators",
    icon: chart,
    event: "utils_indicators",
    sub: [],
  },
  {
    id: "timezone",
    name: "Timezone",
    icon: clock,
    event: "utils_timezone",
  },
  {
    id: "screenshot",
    name: "Screenshot",
    icon: camera,
    event: "utils_screenshot",
  },
  {
    id: "settings",
    name: "Settings",
    icon: config,
    event: "utils_settings",
  },
];

function renderFillRect (ctx, x, y, width, height, style) {
  ctx.fillStyle = style;
  ctx.fillRect(x, y, width, height);
}

function renderPath (ctx, coords, style, strokeFill) {
  ctx.save();
  ctx.lineWidth = style.lineWidth || 1;
  if (ctx.lineWidth % 2) {
    ctx.translate(0.5, 0.5);
  }
  ctx.strokeStyle = style.strokeStyle;
  if ("lineDash" in style) ctx.setLineDash(style.lineDash);
  ctx.beginPath();
  let move = true;
  coords.forEach(coord => {
    if (coord && coord.x !== null) {
      if (move) {
        ctx.moveTo(coord.x, coord.y);
        move = false;
      } else {
        ctx.lineTo(coord.x, coord.y);
      }
    }
  });
  strokeFill();
  ctx.restore();
}

function renderHorizontalLine (ctx, y, left, right, style) {
  const coords = [{x:left, y:y}, {x:right, y:y}];
  renderPath(ctx, coords, style, () => {
    ctx.stroke();
    ctx.closePath();
  });
}
function renderLine (ctx, coords, style) {
  renderPath(ctx, coords, style, () => {
    ctx.stroke();
    ctx.closePath();
  });
}

const T$1 = 0, C$1 = 4;
class indicator {
  #parent
  #core
  #config
  #theme
  #xAxis
  #yAxis
  #target
  #scene
  #overlay
  #indicator
  #type
  #TALib
  #range
  #value = [0, 0]
  #newValueCB
  #updateValueCB
  #precision = 2
  #calcParams
  #style = {}
  constructor (target, xAxis=false, yAxis=false, config, parent, params) {
    this.#parent = parent;
    this.#core = parent.core;
    this.#target = target;
    this.#scene = target.scene;
    this.#config = config;
    this.#xAxis = xAxis;
    this.#yAxis = yAxis;
    this.#overlay = params.overlay;
    this.#type = config.type;
    this.#indicator = config.indicator;
    this.#TALib = this.#core.TALib;
    this.#range = this.xAxis.range;
    this.eventsListen();
  }
  get core() { return this.#core }
  get parent() { return this.#parent }
  get chart() { return this.parent.parent.parent }
  get config() { return this.#config }
  get target() { return this.#target }
  get scene() { return this.#scene }
  get xAxis() { return this.#xAxis || this.#parent.time.xAxis }
  get yAxis() { return this.#yAxis || this.#parent.scale.yAxis }
  get Timeline() { return this.#core.Timeline }
  get Scale() { return this.#parent.scale }
  get type() { return this.#type }
  get overlay() { return this.#overlay }
  get indicator() { return this.#indicator }
  get TALib() { return this.#TALib }
  get range() { return this.#core.range }
  set setNewValue(cb) { this.#newValueCB = cb;}
  set setUpdateValue(cb) { this.#updateValueCB = cb; }
  set precision(p) { this.#precision = p; }
  get precision() { return this.#precision }
  set calcParams(p) { this.#calcParams = p; }
  get calcParams() { return this.#calcParams }
  set style(s) { this.#style = s; }
  get style() { return this.#style }
  set position(p) { this.#target.setPosition(p[0], p[1]); }
  set value(data) {
    const tfms = this.core.time.timeFrameMS;
    let roundedTime = Math.floor(new Date(data[T$1]) / tfms) * tfms;
    data[T$1] = roundedTime;
    if (this.#value[T$1] !== data[T$1]) {
      this.#value[T$1] = data[T$1];
      this.#newValueCB(data);
    }
    else {
      this.#updateValueCB(data);
    }
  }
  get value() {
    return this.#value
  }
  end() {
    this.off(STREAM_UPDATE, this.onStreamUpdate);
  }
  eventsListen() {
    this.on(STREAM_UPDATE, this.onStreamUpdate.bind(this));
  }
  on(topic, handler, context) {
    this.core.on(topic, handler, context);
  }
  off(topic, handler) {
    this.core.off(topic, handler);
  }
  emit(topic, data) {
    this.core.emit(topic, data);
  }
  onStreamNewValue(value) {
    console.log("onStreamNewValue(value):",value);
  }
  onStreamUpdate(candle) {
    this.value = candle;
  }
  indicatorInput(start, end) {
    let input = [];
    do {
      input.push(this.range.value(start)[C$1]);
    }
    while (start++ < end)
    return input
  }
  calcIndicator (indicator, params) {
    this.overlay.data = [];
    let step = this.calcParams[0];
    if (this.range.Length < step) return false
    let end, entry, time;
    let start = 0;
    let input = this.indicatorInput(start, this.range.Length - 1);
    let hasNull = input.find(element => element === null);
    if (hasNull) return false
    do {
      end = start + step;
      input.slice(start, end);
      entry = this.TALib[indicator](params);
      time = this.range.value(end - 1)[0];
      this.overlay.data.push([time, entry]);
      start++;
    }
    while (end < this.range.Length)
    return true
  }
  calcIndicatorStream (indicator, params) {
    let entry = this.TALib[indicator](params);
    let end = this.range.dataLength;
    let time = this.range.value(end)[0];
    return [time, entry.output[0]]
  }
  plot(plots, type, style) {
    const ctx = this.#scene.context;
    ctx.save();
    switch(type) {
      case "renderLine": renderLine(ctx, plots, style);
      case "renderFillRect": renderFillRect(ctx, plots[0], plots[1], plots[2], plots[3], style);
    }
    ctx.restore();
  }
  draw() {
  }
}

const SECOND = 1000;
const MINUTE = SECOND * 60;
const DEFAULT_TIMEINTERVAL = MINUTE;
const DEFAULT_TIMEFRAME = "1m";
const DEFAULT_TIMEFRAMEMS = DEFAULT_TIMEINTERVAL;
const PRICEDIGITS$1 = 6;
const XAXIS_ZOOM = 0.05;
const YAXIS_STEP = 100;
const YAXIS_GRID = 16;
const YAXIS_TYPES$1 = ["default", "percent", "log"];
const YAXIS_BOUNDS = 0.005;
const LIMITFUTURE = 200;
const LIMITPAST = 200;
const MINCANDLES = 20;
const MAXCANDLES = 4096;
const MAXGRADSPER = 75;
const BUFFERSIZE$1 = 20;
const ROWMINHEIGHT = 50;
const OFFCHARTDEFAULTHEIGHT = 30;
const DIVIDERHEIGHT = 8;

class DMI extends indicator {
  #ID
  #name = 'Directional Movement Index'
  #shortName = 'DMI'
  #onChart = false
  #precision = 2
  #calcParams = [20]
  #checkParamCount = false
  #scaleOverlay = true
  #plots = [
    { key: 'DMI_1', title: ' ', type: 'line' },
  ]
  #defaultStyle = {
    strokeStyle: "#C80",
    lineWidth: '1',
    defaultHigh: 75,
    defaultLow: 25,
    highLowLineWidth: 1,
    highLowStyle: "dashed",
    highStrokeStyle: "#848",
    lowStrokeStyle: "#848",
    highLowRangeStyle: "#22002220"
  }
  #style = {}
  static scale = YAXIS_TYPES$1[1]
  constructor(target, overlay, xAxis, yAxis, config) {
    super(target, xAxis, yAxis, config);
    this.#ID = uid(this.#shortName);
    this.style = {...this.defaultStyle, ...config.style};
  }
  get ID() { return this.#ID }
  get name() { return this.#name }
  get shortName() { return this.#shortName }
  get onChart() { return this.#onChart }
  get style() { return this.#style }
  get plots() { return this.#plots }
  indicatorStream() {
  }
  calcIndicator(input) {
    this.overlay.data = this.TALib.DMI(input);
  }
  regeneratePlots (params) {
    return params.map((_, index) => {
      const num = index + 1;
      return { key: `dmi${num}`, title: `DMI${num}: `, type: 'line' }
    })
  }
  updateIndicator (input) {
  }
  draw(range) {
    this.scene.clear();
    this.overlay.data;
    this.xAxis.candleW;
    this.scene.width + (this.xAxis.bufferPx * 2);
    this.yAxis.yPos(100 - this.style.defaultHigh);
    this.yAxis.yPos(100 - this.style.defaultLow);
  }
}

function getRandomIntBetween(min, max) {
  min = Math.ceil(min) + 1;
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
function countDigits(value) {
  const digits = {};
  digits.value = value;
  digits.sign = (!value) ? false : true;
  digits.integers = numDigits(value);
  digits.decimals = precision(value);
  digits.total = digits.integers + digits.decimals;
  return digits
}
function numDigits(value) {
  return (Math.log10((value ^ (value >> 31)) - (value >> 31)) | 0) + 1;
}
function float2Int(value) {
  return value | 0
}
 function round (n, p) {
	p = p || 100;
  const d = Math.pow(10, p);
  return Math.round((n + Number.EPSILON) * d) / d;
}
function bRound(n, d=0) {
  var x = n * Math.pow(10, d);
  var r = Math.round(x);
  var br = (((((x>0)?x:(-x))%1)===0.5)?(((0===(r%2)))?r:(r-1)):r);
  return br / Math.pow(10, d);
}
function precision(value) {
  if (typeof value !== "number") value = parseFloat(value);
  if (isNaN(value)) return 0;
  if (!isFinite(value)) return 0;
  var e = 1, p = 0;
  while (Math.round(value * e) / e !== value) { e *= 10; p++; }
  return p;
}
function log10 (value) {
  return Math.log(value) / Math.log(10)
}
function power (base, exponent) {
  return Math.pow(base, exponent)
}
function limit(val, min, max) {
  return Math.min(max, Math.max(min, val));
}

const calcParams$1 = [20];
 class EMA extends indicator {
  #ID
  #name ='Exponential Moving Average'
  #shortName = 'EMA'
  #params
  #onChart = true
  #series = 'price'
  #precision = 2
  #calcParams = [6, 12, 20]
  #checkParamCount = false
  #scaleOverlay = false
  #plots = [
    { key: 'ema6', title: 'EMA6: ', type: 'line' },
    { key: 'ema12', title: 'EMA12: ', type: 'line' },
    { key: 'ema20', title: 'EMA20: ', type: 'line' }
  ]
  #defaultStyle = {
    strokeStyle: "#C80",
    lineWidth: '1'
  }
  #style = {}
  static scale = YAXIS_TYPES$1[0]
  constructor(target, xAxis=false, yAxis=false, config, parent, params) {
    super(target, xAxis, yAxis, config, parent, params);
    const overlay = params.overlay;
    this.#ID = params.overlay?.id || uid(this.#shortName);
    this.#params = params;
    this.calcParams = (overlay?.settings?.period) ? JSON.parse(overlay.settings.period) : calcParams$1;
    this.style = (overlay?.settings) ? {...this.#defaultStyle, ...overlay.settings} : {...this.#defaultStyle, ...config.style};
    this.setNewValue = (value) => { this.newValue(value); };
    this.setUpdateValue = (value) => { this.UpdateValue(value); };
    this.addLegend();
  }
  get ID() { return this.#ID }
  get name() { return this.#name }
  get shortName() { return this.#shortName }
  get onChart() { return this.#onChart }
  get plots() { return this.#plots }
  addLegend() {
    let legend = {
      id: this.#shortName,
      title: this.#shortName,
      type: this.#shortName,
      source: this.legendInputs.bind(this)
    };
    this.chart.Legends.add(legend);
  }
  updateLegend() {
    this.parent.Legends.update();
  }
  legendInputs(pos=this.chart.cursorPos, candle) {
    const inputs = {};
    const index = this.Timeline.xPos2Index(pos[0]);
    let c = index  - (this.range.data.length - this.overlay.data.length);
    let colours = [this.style.strokeStyle];
    c = limit(c, 0, this.overlay.data.length - 1);
    inputs.EMA_1 = this.Scale.nicePrice(this.overlay.data[c][1]);
    return {inputs, colours}
  }
  regeneratePlots (params) {
    return params.map((_, index) => {
      const num = index + 1;
      return { key: `ema${num}`, title: `EMA${num}: `, type: 'line' }
    })
  }
    newValue (value) {
    let p = this.TALibParams();
    if (!p) return false
    let v = this.calcIndicatorStream(this.#shortName, this.TALibParams());
    if (!v) return false
    this.overlay.data.push([v[0], v[1]]);
    this.target.setPosition(this.core.scrollPos, 0);
    this.draw(this.range);
  }
   UpdateValue (value) {
    let l = this.overlay.data.length - 1;
    let p = this.TALibParams();
    if (!p) return false
    let v = this.calcIndicatorStream(this.#shortName, p);
    if (!v) return false
    this.overlay.data[l] = [v[0], v[1]];
    this.target.setPosition(this.core.scrollPos, 0);
    this.draw(this.range);
  }
  TALibParams() {
    let end = this.range.dataLength;
    let step = this.calcParams[0];
    let start = end - step;
    let input = this.indicatorInput(start, end);
    let hasNull = input.find(element => element === null);
    if (hasNull) return false
    else return { inReal: input, timePeriod: step }
  }
  draw(range=this.range) {
    this.scene.clear();
    const data = this.overlay.data;
    const width = this.xAxis.candleW;
    const plots = [];
    this.xAxis.smoothScrollOffset || 0;
    const plot = {
      w: width,
    };
    let o = this.Timeline.rangeScrollOffset;
    let d = range.data.length - this.overlay.data.length;
    let c = range.indexStart - d - 2;
    let i = range.Length + (o * 2) + 2;
    while(i) {
      if (c < 0 || c >= this.overlay.data.length) {
        plots.push({x: null, y: null});
      }
      else {
        plot.x = this.xAxis.xPos(data[c][0]);
        plot.y = this.yAxis.yPos(data[c][1]);
        plots.push({...plot});
      }
      c++;
      i--;
    }
    this.plot(plots, "renderLine", this.style);
    this.target.viewport.render();
  }
}

const calcParams = [20];
class RSI extends indicator {
  #ID
  #name = 'Relative Strength Index'
  #shortName = 'RSI'
  #params
  #onChart = false
  #checkParamCount = false
  #scaleOverlay = true
  #plots = [
    { key: 'RSI_1', title: ' ', type: 'line' },
  ]
  #defaultStyle = {
    strokeStyle: "#C80",
    lineWidth: '1',
    defaultHigh: 75,
    defaultLow: 25,
    highLowLineWidth: 1,
    highLowStyle: "dashed",
    highStrokeStyle: "#848",
    lowStrokeStyle: "#848",
    highLowRangeStyle: "#22002220"
  }
  static scale = YAXIS_TYPES$1[1]
  constructor (target, xAxis=false, yAxis=false, config, parent, params)  {
    super (target, xAxis, yAxis, config, parent, params);
    const overlay = params.overlay;
    this.#ID = params.overlay?.id || uid(this.#shortName);
    this.#params = params;
    this.calcParams = (overlay?.settings?.period) ? JSON.parse(overlay.settings.period) : calcParams;
    this.style = (overlay?.settings) ? {...this.#defaultStyle, ...overlay.settings} : {...this.#defaultStyle, ...config.style};
    this.setNewValue = (value) => { this.newValue(value); };
    this.setUpdateValue = (value) => { this.UpdateValue(value); };
  }
  get ID() { return this.#ID }
  get name() { return this.#name }
  get shortName() { return this.#shortName }
  get onChart() { return this.#onChart }
  get plots() { return this.#plots }
  addLegend() {
    let legend = {
      id: this.#shortName,
      title: this.#shortName,
      type: this.#shortName,
      source: this.legendInputs.bind(this)
    };
    this.chart.Legends.add(legend);
  }
  legendInputs(pos=this.chart.cursorPos, candle) {
    const inputs = {};
    const index = this.Timeline.xPos2Index(pos[0]);
    let c = index  - (this.range.data.length - this.overlay.data.length);
    let colours = [this.style.strokeStyle];
    c = limit(c, 0, this.overlay.data.length - 1);
    inputs.RSI_1 = this.Scale.nicePrice(this.overlay.data[c][1]);
    return {inputs, colours}
  }
  regeneratePlots (params) {
    return params.map((_, index) => {
      const num = index + 1;
      return { key: `rsi${num}`, title: `RSI${num}: `, type: 'line' }
    })
  }
  newValue (value) {
    let p = this.TALibParams();
    if (!p) return false
    let v = this.calcIndicatorStream(this.#shortName, this.TALibParams());
    if (!v) return false
    this.overlay.data.push([v[0], v[1]]);
    this.target.setPosition(this.core.scrollPos, 0);
    this.draw(this.range);
  }
  UpdateValue (value) {
    let l = this.overlay.data.length - 1;
    let p = this.TALibParams();
    if (!p) return false
    let v = this.calcIndicatorStream(this.#shortName, p);
    if (!v) return false
    this.overlay.data[l] = [v[0], v[1]];
    this.target.setPosition(this.core.scrollPos, 0);
    this.draw(this.range);
  }
  TALibParams() {
    let end = this.range.dataLength;
    let step = this.calcParams[0];
    let start = end - step;
    let input = this.indicatorInput(start, end);
    let hasNull = input.find(element => element === null);
    if (hasNull) return false
    else return { inReal: input, timePeriod: step }
  }
  draw(range=this.range) {
    this.scene.clear();
    const data = this.overlay.data;
    const width = this.xAxis.candleW;
    const x2 = this.scene.width + (this.xAxis.bufferPx * 2);
    const y1 = this.yAxis.yPos(100 - this.style.defaultHigh);
    const y2 = this.yAxis.yPos(100 - this.style.defaultLow);
    const plots = [0, y1, this.scene.width, y2 - y1];
    let style = this.style.highLowRangeStyle;
    this.plot(plots, "renderFillRect", style);
    plots.length = 0;
    plots[0] = {x: 0, y: y1};
    plots[1] = {x: x2, y: y1};
    style = {
      lineWidth: this.style.highLowLineWidth,
      strokeStyle: this.style.highStrokeStyle,
      dash: [5, 5]
    };
    this.plot(plots, "renderLine", style);
    plots.length = 0;
    plots[0] = {x: 0, y: y2};
    plots[1] = {x: x2, y: y2};
    style = {
      lineWidth: this.style.highLowLineWidth,
      strokeStyle: this.style.lowStrokeStyle,
      dash: [5, 5]
    };
    this.plot(plots, "renderLine", style);
    plots.length = 0;
    this.Timeline.smoothScrollOffset || 0;
    const plot = {
      w: width,
    };
    let o = this.Timeline.rangeScrollOffset;
    let d = range.data.length - this.overlay.data.length;
    let c = range.indexStart - d - 2;
    let i = range.Length + (o * 2) + 2;
    while(i) {
      if (c < 0 || c >= this.overlay.data.length) {
        plots.push({x: null, y: null});
      }
      else {
        plot.x = this.xAxis.xPos(data[c][0]);
        plot.y = this.yAxis.yPos(100 - data[c][1]);
        plots.push({...plot});
      }
      c++;
      i--;
    }
    this.plot(plots, "renderLine", this.style);
    this.target.viewport.render();
  }
}

var Indicators = {
  ADX: {id: "ADX", name: "Average Direction", event: "addIndicator"},
  BB: {id: "BB", name: "Bollinger Bands", event: "addIndicator", ind: ""},
  DMI: {id: "DMI", name: "Directional Movement", event: "addIndicator", ind: DMI},
  EMA: {id: "EMA", name: "Exponential Moving Average", event: "addIndicator", ind: EMA},
  RSI: {id: "RSI", name: "Relative Strength Index", event: "addIndicator", ind: RSI},
};

class UtilsBar {
  #name = "Utilities"
  #shortName = "utils"
  #mediator
  #options
  #elUtils
  #utils
  #core
  #widgets
  #indicators
  #menus = {}
  constructor (mediator, options) {
    this.#mediator = mediator;
    this.#options = options;
    this.#elUtils = mediator.api.elements.elUtils;
    this.#utils = utilsList || options.utilsBar;
    this.#core = this.#mediator.api.core;
    this.#widgets = this.#mediator.api.core.WidgetsG;
    this.#indicators = this.options.indicators || Indicators;
    this.init();
  }
  log(l) { this.#mediator.log(l); }
  info(i) { this.#mediator.info(i); }
  warning(w) { this.#mediator.warn(w); }
  error(e) { this.#mediator.error(e); }
  get name() {return this.#name}
  get shortName() {return this.#shortName}
  get mediator() {return this.#mediator}
  get options() {return this.#options}
  get pos() { return this.dimensions }
  get dimensions() { return DOM.elementDimPos(this.#elUtils) }
  init() {
    this.mount(this.#elUtils);
    this.log(`${this.#name} instantiated`);
  }
  start() {
    this.initAllUtils();
    this.eventsListen();
  }
  end() {
    this.#mediator.stateMachine.destroy();
    const api = this.#mediator.api;
    const utils = DOM.findBySelectorAll(`#${api.id} .${CLASS_UTILS} .icon-wrapper`);
    for (let util of utils) {
      for (let u of this.#utils) {
        if (u.id === id)
          util.removeEventListener("click", this.onIconClick);
      }
    }
    this.off("utils_indicators", this.onIndicators);
    this.off("utils_timezone", this.onTimezone);
    this.off("utils_settings", this.onSettings);
    this.off("utils_screenshot", this.onScreenshot);
  }
  eventsListen() {
    this.on("utils_indicators", this.onIndicators.bind(this));
    this.on("utils_timezone", this.onTimezone.bind(this));
    this.on("utils_settings", this.onSettings.bind(this));
    this.on("utils_screenshot", this.onScreenshot.bind(this));
  }
  on(topic, handler, context) {
    this.#mediator.on(topic, handler, context);
  }
  off(topic, handler) {
    this.#mediator.off(topic, handler);
  }
  emit(topic, data) {
    this.#mediator.emit(topic, data);
  }
  onIconClick(e) {
    let evt = e.currentTarget.dataset.event,
        menu = e.currentTarget.dataset.menu || false,
        data = {
          target: e.currentTarget.id,
          menu: menu,
          evt: e.currentTarget.dataset.event
        };
    this.emit(evt, data);
    if (menu) this.emit("openMenu", data);
    else {
      this.emit("menuItemSelected", data);
      this.emit("utilSelected", data);
    }
  }
  mount(el) {
    el.innerHTML = this.defaultNode();
  }
  initAllUtils() {
    const api = this.#mediator.api;
    const utils = DOM.findBySelectorAll(`#${api.id} .${CLASS_UTILS} .icon-wrapper`);
    for (let util of utils) {
      let id = util.id.replace('TX_', ''),
          svg = util.querySelector('svg');
          svg.style.fill = UtilsStyle.COLOUR_ICON;
          svg.style.height = "90%";
      for (let u of this.#utils) {
        if (u.id === id) {
          util.addEventListener("click", this.onIconClick.bind(this));
          if (u.id === "indicators") u.sub = Object.values(this.#indicators);
          if (u?.sub) {
            let config = {
              content: u.sub,
              primary: util
            };
            let menu = this.#widgets.insert("Menu", config);
            util.dataset.menu = menu.id;
            menu.start();
          }
        }
      }
    }
  }
  defaultNode() {
    let style = `display: inline-block; float: right;`;
    let utilsBar = `<div style="${style}">`;
    for (const util of this.#utils) {
      utilsBar += this.iconNode(util);
    }
    return utilsBar + "</div>"
  }
  iconNode(util) {
    const iconStyle = `display: inline-block; height: ${this.#elUtils.clientHeight}px; padding-top: 2px`;
    const menu = ("sub" in util) ? `data-menu="true"` : "";
    return  `
      <div id="TX_${util.id}" data-event="${util.event}" ${menu} class="icon-wrapper" style="${iconStyle}">${util.icon}</div>\n
    `
  }
  onIndicators(data) {
    console.log(`Indicator:`,data);
  }
  onTimezone(data) {
    console.log(`Timezone:`,data);
    this.#core.notImplemented();
  }
  onSettings(data) {
    console.log(`Settings:`,data);
    this.#core.notImplemented();
  }
  onScreenshot(data) {
    console.log(`Screenshot:`,data);
    this.#core.notImplemented();
  }
}

const OperationModes = {
  None: 0,
  DragReady: 1,
  Dragging: 2,
};
class Point {
  constructor() {
    this.set(...arguments);
  }
  set() {
    if (arguments.length === 0) {
      this.x = 0; this.y = 0;
    } else if (arguments.length === 1) {
      const { x, y } = arguments[0];
      this.x = x; this.y = y;
    } else if (arguments.length > 1) {
      const [x, y] = arguments;
      this.x = x; this.y = y;
    }
  }
  clone() {
    return new Point(this.x, this.y);
  }
}

const MouseButtons = {
  None: 0,
  Left: 1,
  Middle: 2,
  Right: 3,
};
class MouseAgent {
  constructor(controller) {
    this.controller = controller;
    this.element = controller.element;
    this.position = new Point();
    this.movement = new Point();
    this.firstMovementUpdate = true;
    this.dragstart = new Point();
    this.dragend = new Point();
    this.dragCheckThreshold = 3;
    this.wheeldelta = 0;
    this.pressedButtons = [];
    this.attach();
  }
  attach() {
    const element = this.element;
    const controller = this.controller;
    element.addEventListener("mousedown", (e) => {
      const clientRect = element.getBoundingClientRect();
      this.position.x = e.clientX - clientRect.left;
      this.position.y = e.clientY - clientRect.top;
      this.movement.x = 0;
      this.movement.y = 0;
      this.dragstart.x = this.position.x;
      this.dragstart.y = this.position.y;
      switch (e.button) {
        case 0: this.pressedButtons._t_pushIfNotExist(MouseButtons.Left); break;
        case 1: this.pressedButtons._t_pushIfNotExist(MouseButtons.Middle); break;
        case 2: this.pressedButtons._t_pushIfNotExist(MouseButtons.Right); break;
      }
      this.controller.operationMode = OperationModes.DragReady;
      controller.raise(this, "mousedown", this.createEventArgument(e));
    });
    element.addEventListener("mousemove", e => {
      if (controller.operationMode == OperationModes.DragReady) {
        if (Math.abs(this.position.x - this.dragstart.x) > this.dragCheckThreshold
          || Math.abs(this.position.y - this.dragstart.y) > this.dragCheckThreshold) {
          controller.raise(this, "begindrag", this.createEventArgument(e));
          controller.operationMode = OperationModes.Dragging;
        }
      }
      else if (controller.operationMode === OperationModes.None) {
        const clientRect = element.getBoundingClientRect();
        const client = {
          x: e.clientX - clientRect.left,
          y: e.clientY - clientRect.top
        };
        if (this.firstMovementUpdate) {
          this.movement.x = 0;
          this.movement.y = 0;
          this.firstMovementUpdate = false;
        } else {
          this.movement.x = client.x - this.position.x;
          this.movement.y = client.y - this.position.y;
        }
        this.position.x = client.x;
        this.position.y = client.y;
        if (Math.abs(this.movement.x) > 0 || Math.abs(this.movement.y) > 0) {
          controller.raise(this, "mousemove", this.createEventArgument(e));
        }
      }
    });
    element.addEventListener("wheel", (e) => {
      this.wheeldelta = e.wheelDelta;
      const arg = this.createEventArgument(e);
      controller.raise(this, "mousewheel", arg);
      if (arg.isProcessed) {
        e.preventDefault();
        return false;
      }
    }, { passive: false });
    element.addEventListener("mouseenter", (e) => {
      controller.raise(this, "mouseenter", this.createEventArgument(e));
    });
    element.addEventListener("mouseout", (e) => {
      controller.raise(this, "mouseout", this.createEventArgument(e));
    });
    window.addEventListener("mousemove", (e) => {
      const clientRect = element.getBoundingClientRect();
      const client = {
        x: e.clientX - clientRect.left,
        y: e.clientY - clientRect.top
      };
      if (this.firstMovementUpdate) {
        this.movement.x = 0;
        this.movement.y = 0;
        this.firstMovementUpdate = false;
      } else {
        this.movement.x = client.x - this.position.x;
        this.movement.y = client.y - this.position.y;
      }
      this.position.x = client.x;
      this.position.y = client.y;
      switch (controller.operationMode) {
        case OperationModes.Dragging:
          controller.raise(this, "drag", this.createEventArgument(e));
          break;
      }
    });
    element.addEventListener("mouseup", e => {
      if (controller.operationMode !== OperationModes.Dragging) {
        controller.raise(this, "mouseup", this.createEventArgument(e));
      }
    });
    window.addEventListener("mouseup", e => {
      if (controller.operationMode === OperationModes.Dragging) {
        controller.raise(this, "enddrag", this.createEventArgument(e));
      }
      controller.operationMode = OperationModes.None;
      switch (e.button) {
        case 0: this.pressedButtons._t_remove(MouseButtons.Left); break;
        case 1: this.pressedButtons._t_remove(MouseButtons.Middle); break;
        case 2: this.pressedButtons._t_remove(MouseButtons.Right); break;
      }
    });
  }
  isButtonPressed(button) {
    return this.pressedButtons.includes(button);
  }
  createEventArgument(e) {
    return {
      isProcessed: false,
      position: this.position.clone(),
      movement: this.movement.clone(),
      dragstart: this.dragstart.clone(),
      dragend: this.dragend.clone(),
      wheeldelta: this.wheeldelta,
      domEvent: e,
    }
  }
  setCursor(type) {
		this.element.style.cursor = type;
	}
}

if (!Array.prototype._t_foreach) {
	Object.defineProperty(Array.prototype, "_t_foreach", {
		value: function(iterator) {
			if (typeof iterator !== "function") return;
			for (let i = 0; i < this.length; i++) {
				const element = this[i];
				iterator.call(this, i, element);
			}
		},
		enumerable: false
	});
}
if (!Array.prototype._t_remove) {
	Object.defineProperty(Array.prototype, "_t_remove", {
		value: function(element) {
			var index = this.indexOf(element);
			if (index > -1) this.splice(index, 1);
		},
		enumerable: false
	});
}
if (!Array.prototype._t_removeAt) {
	Object.defineProperty(Array.prototype, "_t_removeAt", {
		value: function(index, count = 1) {
			this.splice(index, count);
		}
	});
}
if (!Array.prototype._t_clear) {
	Object.defineProperty(Array.prototype, "_t_clear", {
		value: function() {
			this.length = 0;
		},
		enumerable: false
	});
}
if (!Array.prototype._t_pushIfNotExist) {
	Object.defineProperty(Array.prototype, "_t_pushIfNotExist", {
		value: function(element) {
			if (!this.includes(element)) {
				this.push(element);
			}
		},
		enumerable: false
	});
}
if (!Array.prototype._t_set) {
	Object.defineProperty(Array.prototype, "_t_set", {
		value: function(i) {
			if (arguments.length > 1) {
				for (var j = 1; j < arguments.length - 1; j++) {
					this[i++] = arguments[j];
				}
			}
		},
		enumerable: false
	});
}
if (!Object.prototype._t_foreach) {
  Object.defineProperty(Object.prototype, "_t_foreach", {
    value: function(iterator) {
      if (this == null) {
        throw Error("Cannot iterate over null object");
      }
      const _this = this || window;
      for (const key in _this) {
        if (_this.hasOwnProperty(key)) {
          const ret = iterator.call(_this, key, _this[key]);
          if (ret === false) break;
        }
      }
    },
    enumerable: false,
  });
}

class EventDispatcher {
  constructor(cstor) {
    if (!cstor) {
      throw Error("Object to define events cannot be null or undefined");
    }
    this.cstor = cstor;
    const cstorProto = Object.getPrototypeOf(cstor);
    if (cstorProto.__events) {
      cstor.__events = { ...cstorProto.__events };
    } else {
      cstor.__events = {};
    }
  }
  registerEvents() {
    for (let i = 0; i < arguments.length; i++) {
      const eventName = arguments[i];
      this.cstor.__events[eventName] = null;
      this.setupPrototypeEventDispatcher(this.cstor, eventName);
		}
  }
  setupPrototypeEventDispatcher(cstor, name) {
    const _this = this;
    const addEventListener = function(eventName, listener) {
      const obj = this;
      if (eventName.indexOf(" ") > 0) {
        const eventNames = eventName.split(" ");
        for (let i = 0; i < eventNames.length; i++) {
          _this.addEventListenerForObject(obj, eventNames[i], listener);
        }
      } else {
        _this.addEventListenerForObject(obj, eventName, listener);
      }
      return listener;
    };
    const raiseEvent = function(name, args) {
      if (typeof this._eventListeners !== "object"
        || !this._eventListeners.hasOwnProperty(name)) {
        return;
      }
      const listenerList = this._eventListeners[name];
      let ret;
      for (let i = 0; i < listenerList.length; i++) {
        const listener = listenerList[i];
        ret = listener.call(this, args);
        if (ret) {
          break;
        }
      }
      return ret;
    };
    const proto = cstor.prototype;
    proto.addEventListener = addEventListener;
      proto.on = proto.addEventListener;
      proto.raiseEvent = raiseEvent;
    if (typeof proto.removeEventListener !== "function") {
      proto.removeEventListener = function(eventName, listener) {
        if (!this._eventListeners.hasOwnProperty(eventName)) {
          if (!(function() {
            if (eventName.startsWith("on")) {
              const eventNameWithoutOn = eventName.substr(2);
              if (cstor.__events.hasOwnProperty(eventNameWithoutOn)) {
                console.warn("recommended to remove 'on' prefix for removing event listener: " + eventName);
                eventName = eventNameWithoutOn;
                return true;
              }
            }
            return false;
          })()) {
            console.warn("listener to be removed from an event which does not exist: " + eventName);
            return;
          }
        }
        this._eventListeners[eventName]._t_remove(listener);
      };
    }
    Object.defineProperty(proto, "on" + name, {
      get: function() {
        return function() {
          return raiseEvent.call(this, name, ...arguments);
        }
      },
      set: function(listener) {
        if (typeof this._eventListeners === "undefined") {
          Object.defineProperty(this, "_eventListeners", {
            value: {},
            enumerable: false,
          });
        }
        this._eventListeners[name] = [listener];
      },
      enumerable: false,
    });
  }
  addEventListenerForObject(obj, eventName, listener) {
    const cstor = Object.getPrototypeOf(obj).constructor;
    if (!cstor.__events.hasOwnProperty(eventName)) {
      if (!(function() {
        if (eventName.startsWith("on")) {
          const eventNameWithoutOn = eventName.substr(2);
          if (cstor.__events.hasOwnProperty(eventNameWithoutOn)) {
            console.warn("recommended to remove 'on' prefix for adding event listener: " + eventName);
            eventName = eventNameWithoutOn;
            return true;
          }
        }
        return false;
      }).call(this)) {
        console.warn("event to be listened does not exist: " + eventName);
        return;
      }
    }
    if (typeof obj._eventListeners === "undefined") {
      Object.defineProperty(obj, "_eventListeners", {
        value: {},
        enumerable: false,
      });
    }
    if (!obj._eventListeners.hasOwnProperty(eventName)) {
      obj._eventListeners[eventName] = [];
    }
    obj._eventListeners[eventName]._t_pushIfNotExist(listener);
  }
}

const Keys = {
  Backspace: 8, Tab: 9, Enter: 13,
  Shift: 16, Control: 17, Alt: 18,
  Escape: 27, Space: 32, PageUp: 33, PageDown: 34,
  End: 35, Home: 36,
  Left: 37, Up: 38, Right: 39, Down: 40,
  Insert: 45, Delete: 46,
  D0: 48, D1: 49, D2: 50, D3: 51, D4: 52,
  D5: 53, D6: 54, D7: 55, D8: 56, D9: 57,
  A: 65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71,
  H: 72, I: 73, J: 74, K: 75, L: 76, M: 77, N: 78,
  O: 79, P: 80, Q: 81, R: 82, S: 83, T: 84,
  U: 85, V: 86, W: 87, X: 88, Y: 89, Z: 90,
  Command_Firefox: 224, Command_Opera: 17,
  Command_Left: 91, Command_Right: 93,
  Multiply: 106, Add: 107, Subtract: 108, Divide: 111,
  Backquote: 192,
};
const FunctionKeys = {
  Control: 0x1000,
  Alt: 0x2000,
  Shift: 0x4000,
  Command: 0x10000,
  Windows: 0x20000,
};
const functionKeyCode = [
  Keys.Control, Keys.Shift, Keys.Alt,
  Keys.Command_Left, Keys.Command_Right,
  Keys.Command_Firefox, Keys.Command_Opera
];
function isFunctionKey(keyCode) {
  return functionKeyCode.includes(keyCode);
}
class KeyboardAgent {
  constructor(controller) {
    this.controller = controller;
    this.element = controller.element;
    this.lastKeyCode = 0;
    this.pressedKeys = [];
    this.attach();
  }
  attach() {
    const controller = this.controller;
    const element = this.element;
    element.addEventListener("keydown", e => {
      this.pressedKeys._t_pushIfNotExist(e.keyCode);
      this.lastKeyCode = e.keyCode;
      const arg = this.createEventArgument(e);
      if (arg.isHotkey) {
        controller.raise(this, "hotkey", arg);
      }
      if (!arg.isProcessed) {
        controller.raise(this, "keydown", arg);
      }
      if (arg.isProcessed) {
        e.preventDefault();
        return false;
      }
    });
    element.addEventListener("keyup", (e) => {
      this.pressedKeys._t_remove(e.keyCode);
      this.lastKeyCode = e.keyCode;
      const arg = this.createEventArgument(e);
      controller.raise(this, "keyup", arg);
      if (arg.isProcessed) {
        e.preventDefault();
        return false;
      }
    });
    element.addEventListener("blur", (e) => {
      this.pressedKeys = [];
    });
    window.addEventListener("blur", (e) => {
      this.pressedKeys = [];
    });
  }
  createEventArgument(e) {
    const arg = {
      domEvent: e,
      keyCode: e.keyCode,
      keyValue: e.keyCode,
    };
    let functionKeyDown = false;
    if (e.ctrlKey) {
      arg.keyValue |= FunctionKeys.Control;
      functionKeyDown = true;
    }
    if (e.altKey) {
      arg.keyValue |= FunctionKeys.Alt;
      functionKeyDown = true;
    }
    if (e.shiftKey) {
      arg.keyValue |= FunctionKeys.Shift;
      functionKeyDown = true;
    }
    if (e.metaKey) {
      arg.keyValue |= FunctionKeys.Command;
      functionKeyDown = true;
    }
    if (functionKeyDown) {
      if (!isFunctionKey(e.keyCode)) arg.isHotkey = true;
    }
    return arg;
  }
  isKeyPressed(key) {
    return this.pressedKeys.includes(key);
  }
}

class TouchAgent {
  constructor(controller) {
    this.controller = controller;
    this.element = controller.element;
    this.fingers = 0;
    this.attach();
  }
  attach() {
    const controller = this.controller;
    const element = this.element;
    const mouseAgent = this.controller.mouseAgent;
    element.addEventListener("touchstart", (e) => {
      if (typeof e.touches === "object") {
        const t = e.touches[0];
        const clientRect = element.getBoundingClientRect();
        mouseAgent.position.x = t.clientX - clientRect.left;
        mouseAgent.position.y = t.clientY - clientRect.top;
        mouseAgent.movement.x = 0;
        mouseAgent.movement.y = 0;
        mouseAgent.dragstart.x = mouseAgent.position.x;
        mouseAgent.dragstart.y = mouseAgent.position.y;
        controller.operationMode = OperationModes.DragReady;
        this.fingers = e.touches.length;
        controller.raise(this, "mousedown", this.createEventArgument(e));
      }
    }, { passive: true });
    window.addEventListener("touchmove", (e) => {
			if (typeof e.touches === "object") {
				const t = e.touches[0];
				const clientRect = element.getBoundingClientRect();
				const client = {
					x: t.clientX - clientRect.left,
					y: t.clientY - clientRect.top
        };
				mouseAgent.movement.x = (client.x - mouseAgent.position.x);
				mouseAgent.movement.y = (client.y - mouseAgent.position.y);
				mouseAgent.position.x = client.x;
				mouseAgent.position.y = client.y;
				switch (controller.operationMode) {
					case OperationModes.DragReady:
            controller.raise(this, "begindrag", this.createEventArgument(e));
						e.preventDefault();
						controller.operationMode = OperationModes.Dragging;
						break;
					case OperationModes.Dragging:
  					controller.raise(this, "drag", this.createEventArgument(e));
						e.preventDefault();
						break;
				}
			}
		}, { passive: false });
		window.addEventListener("touchend", (e) => {
			if (e.touches) {
				this.fingers = e.length;
			} else {
				this.fingers = 0;
      }
      if (controller.operationMode === OperationModes.Dragging) {
        controller.raise(this, "enddrag", this.createEventArgument(e));
        controller.operationMode = OperationModes.None;
      } else {
        controller.operationMode = OperationModes.None;
        controller.raise(this, "mouseup", this.createEventArgument(e));
      }
		});
	}
  createEventArgument(e) {
    const arg = this.controller.mouseAgent.createEventArgument(e);
    arg.touch = {
			fingers: this.fingers
		};
		return arg;
	}
}

const defaultOptions$1 = {
  elementId: undefined,
  elementInstance: undefined,
  disableContextMenu: true,
};
class InputController {
  constructor(element, options) {
    this.options = { ...defaultOptions$1, ...options };
    this.operationMode = OperationModes.None;
    this.element = element;
    if (!this.element && this.options.elementId) {
      this.element = document.getElementById(this.options.elementId);
    }
    if (!this.element) {
      throw "Must specify an element to receive user input.";
    }
    this.mouseAgent = new MouseAgent(this);
    this.keyboardAgent = new KeyboardAgent(this);
    this.touchAgent = new TouchAgent(this);
    this.currentAgent = null;
    if (this.options.disableContextMenu) {
      console.log("culprit");
      window.oncontextmenu = (e) => {
        e.preventDefault();
        return false;
      };
    }
  }
  raise(agent, eventName, args) {
    this.currentAgent = agent;
    this.raiseEvent(eventName, this.createEventArgument(args));
  }
  createEventArgument(args) {
    const arg = args || {};
    arg.isButtonPressed = button => this.isButtonPressed(button);
    arg.isKeyPressed = key => this.isKeyPressed(key);
    arg.controller = this;
    return arg;
  }
  isButtonPressed(button) {
    return this.mouseAgent.isButtonPressed(button);
  }
  isKeyPressed(key) {
    return this.keyboardAgent.isKeyPressed(key);
  }
  setCursor(type) {
    this.mouseAgent.setCursor(type);
  }
}
new EventDispatcher(InputController).registerEvents(
  "mousedown", "mouseup", "mousemove", "mouseenter", "mouseout", "mousewheel",
  "keydown", "keyup", "hotkey",
  "drag", "begindrag", "enddrag"
);

class Tool {
  static #cnt = 0
  static #instances = {}
  #ID
  #inCnt = null
  #name
  #shortName
  #mediator
  #options
  #config
  #core
  #parent
  #controller
  #elChart
  #elCanvas
  #elViewport
  #layerTool
  #target
  #cursorPos = [0, 0]
  #cursorActive = false
  #cursorClick
  constructor(config) {
    this.#config = config;
    this.#inCnt = config.cnt;
    this.#ID = this.#config.ID || uid("TX_Tool_");
    this.#name = config.name;
    this.#mediator = config.target.mediator;
    this.#core = this.#mediator.api.core;
    this.#elChart = this.#mediator.api.elements.elChart;
    this.#parent = {...this.#mediator.api.parent};
    this.#target = config.target;
    this.#target.addTool(this);
    this.#elViewport = this.#layerTool.viewport;
    this.#elCanvas = this.#elViewport.scene.canvas;
    this.#cursorClick = config.pos;
  }
  get inCnt() { return this.#inCnt }
  get ID() { return this.#ID }
  get name() {return this.#name}
  get shortName() { return this.#shortName }
  get mediator() { return this.#mediator }
  get stateMachine() { return this.#mediator.stateMachine }
  get state() { return this.#core.getState() }
  get data() { return this.#core.chartData }
  get range() { return this.#core.range }
  get target() { return this.#target }
  set layerTool(layer) { this.#layerTool = layer; }
  get layerTool() { return this.#layerTool }
  get elViewport() { return this.#elViewport }
  get cursorPos() { return this.#cursorPos }
  get cursorActive() { return this.#cursorActive }
  get cursorClick() { return this.#cursorClick }
  get candleW() { return this.#core.Timeline.candleW }
  get theme() { return this.#core.theme }
  get config() { return this.#core.config }
  get scrollPos() { return this.#core.scrollPos }
  get bufferPx() { return this.#core.bufferPx }
  static create(target, config) {
    const cnt = ++Tool.#cnt;
    config.cnt = cnt;
    config.modID = `${config.toolID}_${cnt}`;
    config.toolID = config.modID;
    config.target = target;
    const tool = new config.tool(config);
    Tool.#instances[cnt] = tool;
    target.chartToolAdd(tool);
    return tool
  }
  static destroy(tool) {
    if (tool.constructor.name === "Tool") {
      const inCnt = tool.inCnt;
      delete Tool.#instances[inCnt];
    }
  }
  end() { this.stop(); }
  stop() {
  }
  eventsListen() {
    this.#controller = new InputController(this.#elCanvas, {disableContextMenu: false});
    this.#controller.on("mousemove", this.onMouseMove.bind(this));
  }
  on(topic, handler, context) {
    this.#core.on(topic, handler, context);
  }
  off(topic, handler) {
    this.#core.off(topic, handler);
  }
  emit(topic, data) {
    this.#core.emit(topic, data);
  }
  onMouseMove(e) {
    this.#cursorPos = [Math.round(e.position.x), Math.round(e.position.y)];
    this.emit("tool_mousemove", this.#cursorPos);
  }
  createViewport() {
    this.config.buffer || BUFFERSIZE;
    this.#elViewport.clientWidth;
    this.#options.chartH || this.#parent.rowsH - 1;
  }
  draw() {
  }
}

class Fibonacci extends Tool {
  constructor(config) {
    super(config);
  }
}

class Line extends Tool {
  #colour = lineConfig.colour
  #lineWidth = lineConfig.lineWidth
  constructor(config) {
    super(config);
  }
  set colour(colour=this.#colour) {
    this.#colour = colour;
  }
  get colour() { return this.#colour }
  set lineWidth(width) { this.#lineWidth = (isNumber(width)) ? width : this.#lineWidth; }
  get lineWidth() { return this.#lineWidth }
  start() {
    this.eventsListen();
    let [x1, y1] = this.cursorClick;
    const scene = this.layerTool.scene;
    scene.clear();
    const ctx = this.layerTool.scene.context;
    ctx.save();
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.colour;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(300, 150);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
    this.elViewport.render();
  }
}

class Measure extends Tool {
  constructor(config) {
    super(config);
  }
}

class Range$1 extends Tool {
  constructor(config) {
    super(config);
  }
}

class Text extends Tool {
  constructor(config) {
    super(config);
  }
}

var tools = [
  {
    id: "cursor",
    name: "Cursor",
    icon: cursor,
    event: "tool_activated",
  },
  {
    id: "line",
    name: "Line",
    icon: line,
    event: "tool_activated",
    class: Line,
    sub: [
      {
        id: "ray",
        name: "Ray",
        icon: line,
        event: "tool_activated",
        class: Line,
      },
      {
        id: "hRay",
        name: "Horizontal Ray",
        icon: line,
        event: "tool_activated",
        class: Line,
      },
      {
        id: "vRay",
        name: "Vertical Ray",
        icon: line,
        event: "tool_activated",
        class: Line,
      },
    ]
  },
  {
    id: "fibonacci",
    name: "Fibonacci",
    icon: fibonacci,
    event: "tool_activated",
    class: Fibonacci,
    sub: [
      {
        id: "fib",
        name: "Not Implemented Yet",
        icon: line,
      }
    ]
  },
  {
    id: "range",
    name: "Range",
    icon: range,
    event: "tool_activated",
    class: Range$1,
    sub: [
      {
        id: "rng",
        name: "Not Implemented Yet",
        icon: line,
      }
    ]
  },
  {
    id: "text",
    name: "Text",
    icon: text,
    event: "tool_activated",
    class: Text,
    sub: [
      {
        id: "txt",
        name: "Not Implemented Yet",
        icon: line,
      }
    ]
  },
  {
    id: "measure",
    name: "Measure",
    icon: measure,
    event: "tool_activated",
    class: Measure,
  },
  {
    id: "delete",
    name: "Delete",
    icon: del,
    event: "tool_activated",
    class: undefined,
  }
];
const lineConfig = {
  colour: "#8888AACC",
  lineWidth: 1
};

const TIMEUNITS = ['y','M','d','h','m','s','ms'];
const TIMEUNITSLONG = ['years','months','days','hours','minutes','seconds','milliseconds'];
const dayCntInc = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
const dayCntLeapInc = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
const monthDayCnt = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
const BTCGENESIS = 1231006505000;
const SECOND_MS = 1000;
const MINUTE_MS = SECOND_MS*60;
const HOUR_MS = MINUTE_MS*60;
const DAY_MS = HOUR_MS*24;
const WEEK_MS = DAY_MS*7;
const MONTHR_MS = DAY_MS*30;
function MONTH_MS(m=3, l=false) {
  let ms = monthDayCnt[m % 12] * DAY_MS;
  if (l && m > 0) ms += DAY_MS;
  return ms
}
const YEAR_MS = DAY_MS*365;
const TIMEUNITSVALUESSHORT = {
  y: YEAR_MS,
  M: MONTHR_MS,
  w: WEEK_MS,
  d: DAY_MS,
  h: HOUR_MS,
  m: MINUTE_MS,
  s: SECOND_MS,
};
const TIMEUNITSVALUESLONG = {
  years: YEAR_MS,
  months: MONTHR_MS,
  weeks: WEEK_MS,
  days: DAY_MS,
  hours: HOUR_MS,
  minutes: MINUTE_MS,
  seconds: SECOND_MS,
};
const TIMEUNITSVALUES = { ...TIMEUNITSVALUESSHORT, ...TIMEUNITSVALUESLONG };
const timezones = {
  0: 'Europe/London',
  '-120': 'Europe/Tallinn',
  '-60': 'Europe/Zurich',
  180: 'America/Santiago',
  300: 'America/Toronto',
  240: 'America/Caracas',
  360: 'America/Mexico_City',
  540: 'America/Juneau',
  480: 'America/Vancouver',
  420: 'US/Mountain',
  120: 'America/Sao_Paulo',
  '-360': 'Asia/Almaty',
  '-300': 'Asia/Ashkhabad',
  '-180': 'Europe/Moscow',
  '-420': 'Asia/Jakarta',
  '-480': 'Asia/Taipei',
  '-240': 'Asia/Muscat',
  '-345': 'Asia/Kathmandu',
  '-330': 'Asia/Kolkata',
  '-540': 'Asia/Tokyo',
  '-210': 'Asia/Tehran',
  '-660': 'Pacific/Norfolk',
  '-630': 'Australia/Adelaide',
  '-600': 'Australia/Brisbane',
  '-780': 'Pacific/Fakaofo',
  '-825': 'Pacific/Chatham',
  600: 'Pacific/Honolulu',
};
function getTimezone() {
  const offset = new Date().getTimezoneOffset();
  if (Object.prototype.hasOwnProperty.call(timezones, offset)) {
    return timezones[offset.toString()];
  }
  return 'Etc/UTC';
}
function buildSubGrads() {
  const grads = {};
  for (let unit in TIMEUNITSVALUESSHORT) {
    let i = 0;
    grads[unit] = [];
    do {
      grads[unit].push(Math.round(TIMEUNITSVALUESSHORT[unit] * i));
      i += 0.125;
    }
    while(i < 1)
  }
  return grads
}
function isValidTimestamp( _timestamp ) {
  const newTimestamp = new Date(_timestamp).getTime();
  return isNumber(newTimestamp);
}
function isValidTimeInRange( time, start=BTCGENESIS,end=Date.now() ) {
  if (!isValidTimestamp(time)) return false
  return (time > start && time < end) ? true : false
}
const timestampDiff = {
  inSeconds: function(d1, d2) {
        d1 = new Date(d1);
        d2 = new Date(d2);
    var t2 = d2.getTime();
    var t1 = d1.getTime();
    return parseInt((t2-t1)/SECOND_MS);
  },
  inMinutes: function(d1, d2) {
        d1 = new Date(d1);
        d2 = new Date(d2);
    let t2 = d2.getTime();
    let t1 = d1.getTime();
    return parseInt((t2-t1)/MINUTE_MS);
  },
  inHours: function(d1, d2) {
        d1 = new Date(d1);
        d2 = new Date(d2);
    let t2 = d2.getTime();
    let t1 = d1.getTime();
    return parseInt((t2-t1)/HOUR_MS);
  },
  inDays: function(d1, d2) {
        d1 = new Date(d1);
        d2 = new Date(d2);
    let t2 = d2.getTime();
    let t1 = d1.getTime();
    return parseInt((t2-t1)/DAY_MS);
  },
  inWeeks: function(d1, d2) {
        d1 = new Date(d1);
        d2 = new Date(d2);
    let t2 = d2.getTime();
    let t1 = d1.getTime();
    return parseInt((t2-t1)/WEEK_MS);
  },
  inMonths: function(d1, d2) {
         d1 = new Date(d1);
         d2 = new Date(d2);
    let d1Y = d1.getUTCFullYear();
    let d2Y = d2.getUTCFullYear();
    let d1M = d1.getUTCMonth();
    let d2M = d2.getUTCMonth();
    return (d2M+12*d2Y)-(d1M+12*d1Y);
  },
  inYears: function(d1, d2) {
    let d1Y = new Date(d1);
    let d2Y = new Date(d2);
    return d2Y.getUTCFullYear()-d1Y.getUTCFullYear();
  }
};
function timestampDifference(date1,date2) {
  let years = timestampDiff.inYears(date1,date2);
  let months = timestampDiff.inMonths(date1,date2);
  let weeks = timestampDiff.inWeeks(date1,date2);
  let days = timestampDiff.inDays(date1,date2);
  let hours = timestampDiff.inHours(date1,date2);
  let minutes = timestampDiff.inMinutes(date1,date2);
  let seconds = timestampDiff.inSeconds(date1,date2);
  let milliseconds = new Date(date2).getTime() - new Date(date1).getTime();
  return {
    y: years,
    M: months,
    w:weeks,
    d:days,
    h:hours,
    m:minutes,
    s:seconds,
    ms:milliseconds,
    years: years,
    months: months,
    weeks:weeks,
    days:days,
    hours:hours,
    minutes:minutes,
    seconds:seconds,
    milliseconds:milliseconds
  }
}
function isTimeFrame(tf) {
  let ms = SECOND_MS;
  if (isString(tf)) {
    ms = interval2MS(tf);
    if (ms) tf = tf;
    else {
      ms = SECOND_MS;
      tf = "1s";
    }
  }
  else tf = "1s";
  return {tf, ms}
}
function interval2MS(tf) {
  if (!isString(tf)) return false
  const regex = /([0-9]{1,2})([s|m|h|d|w|M|y])/gm;
  let m;
  if ((m = regex.exec(tf)) !== null) {
    return TIMEUNITSVALUESSHORT[m[2]] * m[1]
  }
  else return false
}
function ms2TimeUnits( milliseconds ) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
      seconds = seconds % 60;
  let hours = Math.floor(minutes / 60);
      minutes = minutes % 60;
  let days = Math.floor(hours / 24);
      hours = hours % 24;
  let _weeks = Math.floor(days / 7);
      days = days % 7;
  let months = Math.floor(_weeks / 4);
  let years = Math.floor(_weeks / 52);
  let weeks = _weeks % 4;
  months = months % 13;
  return {
    y: years,
    M: months,
    w: weeks,
    d: days,
    h: hours,
    m: minutes,
    s: seconds,
    years: years,
    months: months,
    weeks: weeks,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}
function ms2Interval( milliseconds ) {
  const intervals = ms2TimeUnits(milliseconds);
  for (const unit in intervals) {
    if (intervals[unit]) return `${intervals[unit]}${unit}`
  }
}
function get_second(t) {
  return t ? new Date(t).getUTCSeconds() : null
}
function second_start(t) {
  let start = new Date(t);
  return start.setUTCMilliseconds(0,0)
}
function get_minute(t) {
  return t ? new Date(t).getUTCMinutes() : null
}
function minute_start(t) {
  let start = new Date(t);
  return start.setUTCSeconds(0,0)
}
function get_hour(t) {
  return t ? new Date(t).getUTCHours() : null
}
function hour_start(t) {
  let start = new Date(t);
  return start.setUTCMinutes(0,0,0)
}
 function get_day(t) {
  return t ? new Date(t).getUTCDate() : null
}
function get_dayName(t, locale="en-GB", len="short") {
  return new Date(t).toLocaleDateString(locale, {weekday: len})
}
 function day_start(t) {
  return new Date(t).setUTCHours(0,0,0,0)
}
 function get_month(t) {
  if (!t) return undefined
  return new Date(t).getUTCMonth()
}
function get_monthName(t, locale="en-GB", len="short") {
  return new Date(t).toLocaleDateString(locale, {month: len})
}
 function month_start(t) {
  let date = new Date(t);
  return Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(), 1
  )
}
function nextMonth(t) {
  let m = (get_month(t) + 1) % 12;
  t += MONTH_MS(m, isLeapYear(t));
  return t
}
 function get_year(t) {
  if (!t) return undefined
  return new Date(t).getUTCFullYear()
}
 function year_start(t) {
  return Date.UTC(new Date(t).getUTCFullYear())
}
function nextYear(t) {
  t = t + YEAR_MS + DAY_MS;
  if (!isLeapYear(t)) ;
  return t
}
function isLeapYear(t) {
  let date = new Date(t);
  let year = date.getUTCFullYear();
  if((year & 3) != 0) return false;
  return ((year % 100) != 0 || (year % 400) == 0);
}
function dayOfYear(t) {
  let date = new Date(t);
  let mn = date.getUTCMonth();
  let dn = date.getUTCDate();
  let dayOfYear = dayCount[mn] + dn;
  if(mn > 1 && isLeapYear()) dayOfYear++;
  return dayOfYear;
}

var Time = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  TIMEUNITS: TIMEUNITS,
  TIMEUNITSLONG: TIMEUNITSLONG,
  dayCntInc: dayCntInc,
  dayCntLeapInc: dayCntLeapInc,
  monthDayCnt: monthDayCnt,
  BTCGENESIS: BTCGENESIS,
  SECOND_MS: SECOND_MS,
  MINUTE_MS: MINUTE_MS,
  HOUR_MS: HOUR_MS,
  DAY_MS: DAY_MS,
  WEEK_MS: WEEK_MS,
  MONTHR_MS: MONTHR_MS,
  MONTH_MS: MONTH_MS,
  YEAR_MS: YEAR_MS,
  TIMEUNITSVALUESSHORT: TIMEUNITSVALUESSHORT,
  TIMEUNITSVALUESLONG: TIMEUNITSVALUESLONG,
  TIMEUNITSVALUES: TIMEUNITSVALUES,
  timezones: timezones,
  getTimezone: getTimezone,
  buildSubGrads: buildSubGrads,
  isValidTimestamp: isValidTimestamp,
  isValidTimeInRange: isValidTimeInRange,
  timestampDiff: timestampDiff,
  timestampDifference: timestampDifference,
  isTimeFrame: isTimeFrame,
  interval2MS: interval2MS,
  ms2TimeUnits: ms2TimeUnits,
  ms2Interval: ms2Interval,
  get_second: get_second,
  second_start: second_start,
  get_minute: get_minute,
  minute_start: minute_start,
  get_hour: get_hour,
  hour_start: hour_start,
  get_day: get_day,
  get_dayName: get_dayName,
  day_start: day_start,
  get_month: get_month,
  get_monthName: get_monthName,
  month_start: month_start,
  nextMonth: nextMonth,
  get_year: get_year,
  year_start: year_start,
  nextYear: nextYear,
  isLeapYear: isLeapYear,
  dayOfYear: dayOfYear
}, Symbol.toStringTag, { value: 'Module' }));

var stateMachineConfig$6 = {
  id: "template",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(data) {
        console.log('idle: onEnter');
      },
      onExit(data) {
        console.log('idle: onExit');
      },
      on: {
        tool_activated: {
          target: 'tool_activated',
          action (data) {
            this.context.origin.onToolActivated(data);
          },
        },
      }
    },
    tool_activated: {
      onEnter (data) {
      },
      onExit (data) {
      },
      on: {
        tool_targetSelected: {
          target: 'tool_addToTarget',
          action (data) {
            this.context.origin.onToolTargetSelected(data);
          },
        },
      }
    },
    tool_addToTarget: {
      onEnter (data) {
      },
      onExit (data) {
      },
      on: {
        always: {
          target: 'idle',
          condition: 'toolTarget',
          action (data) {
            this.context.origin.addNewTool();
          },
        },
      }
    },
  },
  guards: {
    toolTarget () { return true }
  }
};

class ToolsBar {
  #name = "Toolbar"
  #shortName = "tools"
  #mediator
  #options
  #elTools
  #widgets
  #Tool = Tool
  #tools
  #toolClasses = {}
  #activeTool = undefined
  #toolTarget
  constructor (mediator, options) {
    this.#mediator = mediator;
    this.#options = options;
    this.#elTools = mediator.api.elements.elTools;
    this.#tools = tools || options.tools;
    this.#widgets = this.#mediator.api.core.WidgetsG;
    this.init();
  }
  log(l) { this.#mediator.log(l); }
  info(i) { this.#mediator.info(i); }
  warning(w) { this.#mediator.warn(w); }
  error(e) { this.#mediator.error(e); }
  get name() {return this.#name}
  get shortName() {return this.#shortName}
  get mediator() {return this.#mediator}
  get options() {return this.#options}
  get pos() { return this.dimensions }
  get dimensions() { return DOM.elementDimPos(this.#elTools) }
  init() {
    this.mount(this.#elTools);
    this.log(`${this.#name} instantiated`);
  }
  start() {
    this.initAllTools();
    this.addAllTools();
    this.eventsListen();
    stateMachineConfig$6.context.origin = this;
    this.#mediator.stateMachine = stateMachineConfig$6;
    this.#mediator.stateMachine.start();
  }
  end() {
    this.#mediator.stateMachine.destroy();
    const api = this.#mediator.api;
    const tools = DOM.findBySelectorAll(`#${api.id} .${CLASS_TOOLS} .icon-wrapper`);
    for (let tool of tools) {
      for (let t of this.#tools) {
        if (t.id === id)
          tool.removeEventListener("click", this.onIconClick);
      }
    }
    this.off("tool_selected", this.onToolSelect);
    this.off("tool_deselected", this.onToolDeselect);
  }
  eventsListen() {
    this.on("tool_selected", (e) => { this.onToolSelect.bind(this); });
    this.on("tool_deselected", (e) => { this.onToolDeselect.bind(this); });
  }
  on(topic, handler, context) {
    this.#mediator.on(topic, handler, context);
  }
  off(topic, handler) {
    this.#mediator.off(topic, handler);
  }
  emit(topic, data) {
    this.#mediator.emit(topic, data);
  }
  onIconClick(e) {
    e.currentTarget.dataset.event;
        let menu = e.currentTarget.dataset.menu || false,
        data = {
          target: e.currentTarget.id,
          menu: menu,
          evt: e.currentTarget.dataset.event,
          tool: e.currentTarget.dataset.tool
        };
    if (menu) this.emit("openMenu", data);
    else {
      this.emit("menuItemSelected", data);
    }
  }
  onToolTargetSelected(tool) {
    console.log("tool_targetSelected", tool.target);
    this.#toolTarget = tool.target;
  }
  onToolActivated(tool) {
    console.log("Tool activated:", tool);
    this.#activeTool = tool;
  }
  onToolSelect(e) {
  }
  onToolDeselect(e) {
  }
  mount(el) {
    el.innerHTML = this.defaultNode();
  }
  initAllTools() {
    const api = this.#mediator.api;
    const tools = DOM.findBySelectorAll(`#${api.id} .${CLASS_TOOLS} .icon-wrapper`);
    for (let tool of tools) {
      let id = tool.id,
          svg = tool.querySelector('svg');
          svg.style.fill = ToolsStyle.COLOUR_ICON;
          svg.style.width = "90%";
      for (let t of this.#tools) {
        if (t.id === id) {
          tool.addEventListener("click", this.onIconClick.bind(this));
          if (t?.sub) {
            let config = {
              content: t.sub,
              primary: tool
            };
            let menu = this.#widgets.insert("Menu", config);
            tool.dataset.menu = menu.id;
            menu.start();
            for (let s of t.sub) {
              this.#toolClasses[s.id] = s.class;
            }
          }
          else {
            this.#toolClasses[t.id] = t.class;
          }
        }
      }
    }
  }
  defaultNode() {
    let toolbar = "";
    for (const tool of this.#tools) {
      toolbar += this.iconNode(tool);
    }
    return toolbar
  }
  iconNode(tool) {
    const iconStyle = `display: inline-block; height: ${this.#elTools.clientWidth}px; padding-right: 2px`;
    const menu = ("sub" in tool) ? `data-menu="true"` : "";
    return  `
      <div id="${tool.id}" data-event="${tool.event}" ${menu} class="icon-wrapper" style="${iconStyle}">${tool.icon}</div>\n
    `
  }
  addTool(tool=this.#activeTool, target=this.#toolTarget) {
    let config = {
      name: tool,
      tool: this.#toolClasses[tool],
      pos: target.cursorClick
    };
    let toolInstance = this.#Tool.create(target, config);
    toolInstance.start();
    console.log(toolInstance);
    return toolInstance
  }
  addNewTool(tool, target) {
    let t = this.addTool(tool, target);
    this.activeTool = (t);
    this.emit(`tool_active`, t);
    this.emit(`tool_${t.ID}_active`, t);
  }
  addAllTools() {
  }
}

class Axis {
  #core
  #parent
  #chart
  constructor(parent, chart) {
    this.#chart = chart;
    this.#parent = parent;
    this.#core = this.#parent.core;
  }
  get core() { return this.#chart.core }
  get chart() { return this.#chart }
  get parent() { return this.#parent }
  get width() { return this.#chart.width }
  get height() { return this.#chart.height }
  get data() { return this.#chart.data }
  get range() { return this.#chart.range }
  get yDigits() { return this.#chart.yAxisDigits }
  float2Int(value) { return float2Int(value) }
  numDigits(value) { return numDigits(value) }
  countDigits(value) { return countDigits(value) }
  precision(value) { return precision(value) }
}

class xAxis extends Axis {
  #xAxisTicks = 4
  #xAxisGrads
  #xAxisSubGrads
  constructor(parent, chart) {
    super(parent, chart);
    this.#xAxisSubGrads = buildSubGrads();
  }
  get chart() { return this.parent.mediator.api.Chart }
  get core() { return this.chart.core }
  get data() { return this.chart.data }
  get range() { return this.parent.range }
  get theme() { return this.chart.core.theme }
  get width() { return this.calcWidth() }
  get interval() { return this.range.interval }
  get intervalStr() { return this.range.intervalStr }
  get timeStart() { return this.range.timeStart }
  get timeFinish() { return this.range.timeFinish }
  get rangeDuration() { return this.range.rangeDuration }
  get rangeLength() { return this.range.Length }
  get indexStart() { return this.range.indexStart }
  get indexEnd() { return this.range.indexEnd }
  get timeMax() { return this.range.timeMax }
  get timeMin() { return this.range.timeMin }
  get candleW() { return bRound(this.width / this.range.Length) }
  get gradsMax() { return Math.trunc(this.width / MAXGRADSPER) }
      gradsYear(t) { return get_year(t) }
      gradsMonthName(t) { return get_monthName(t) }
      gradsDayName(t) { return get_dayName(t) +" "+ get_day(t) }
      gradsHour(t) { return get_hour(t) + ":00" }
      gradsMinute(t) { return "00:" + get_minute(t) }
  get xAxisRatio() { return this.width / this.range.rangeDuration }
  set xAxisTicks(t) { this.#xAxisTicks = isNumber(t) ? t : 0; }
  get xAxisTicks() { return this.#xAxisTicks }
  get xAxisGrads() { return this.#xAxisGrads }
  get xAxisSubGrads() { return this.#xAxisSubGrads }
  get scrollOffsetPx() { return this.core.scrollPos % this.candleW }
  get bufferPx() { return this.core.bufferPx }
  calcWidth() {
    return this.core.Chart.width - this.core.Chart.scale.width
  }
  xPos(ts) {
    return bRound((this.range.rangeIndex(ts) * this.candleW) + (this.candleW * 0.5))
  }
  t2Index(ts) {
    return this.range.rangeIndex(ts)
  }
  t2Pixel(ts) {
    return this.xPos(ts)
  }
  pixel2T(x) {
    let c = this.pixel2Index(x);
    return this.range.value(c)[0]
  }
  pixel2Index(x) {
    x -= this.candleW / 2;
    let c = this.range.indexStart;
    let o = bRound(x / this.candleW);
    return c + o
  }
  pixelOHLCV(x) {
    let c = this.pixel2Index(x);
    return this.range.value(c)
  }
  xPosSnap2CandlePos(x) {
    let r = x % this.candleW;
    let o = (r) ? this.candleW / 2 : 0;
    return bRound((x - r) + o)
  }
  xPos2Time(x) {
    return this.pixel2T(x)
  }
  xPos2Index(x) {
    return this.pixel2Index(x)
  }
  xPosOHLCV(x) {
    return this.pixelOHLCV(x)
  }
  initXAxisGrads() {
    this.#xAxisGrads = this.calcXAxisGrads();
  }
  calcXAxisGrads() {
    const rangeStart = this.timeMin;
    const rangeEnd = this.timeMax;
    const intervalStr = this.intervalStr;
    const grads = {
      entries: {},
      values: [],
      major: [],
      minor: []
    };
    intervalStr.charAt(intervalStr.length - 1);
      let days, t1, t2, units, unitStart,
          majorGrad, majorValue, minorValue;
      units = ms2TimeUnits(this.rangeDuration);
      grads.units = ms2TimeUnits(this.rangeDuration);
    if (units.years > 0) {
      t1 = year_start(rangeStart);
      t2 = nextYear(year_start(rangeEnd)) + YEAR_MS;
      grads.unit = ["y", "year"];
      grads.timeSpan = `${units.years} years`;
      majorGrad = (ts) => { return nextYear(ts) };
      unitStart = (ts) => { return month_start(ts) };
      majorValue = (ts) => {
        return get_year(ts)
      };
      minorValue = (ts) => {
        if (get_month(ts) == 0 && get_day(ts) == 1 && get_hour(ts) == 0) return get_year(ts)
        else return get_monthName(ts)
      };
      return this.buildGrads(grads, t1, t2, majorGrad, majorValue, minorValue, unitStart)
    }
    else if (units.months > 0) {
      t1 = month_start(rangeStart);
      t2 = month_start(rangeEnd) + MONTH_MS(get_month(rangeEnd));
      grads.unit = ["M", "month"];
      grads.timeSpan = `${units.months} months`;
      majorGrad = (ts) => { return MONTHR_MS };
      unitStart = (ts) => { return day_start(ts) };
      majorValue = (ts) => {
        if (get_month(ts) == 0) return get_year(ts)
        else return get_monthName(ts)
      };
      minorValue = (ts) => {
        if (get_month(ts) == 0 && get_day(ts) == 1) return get_year(ts)
        if (get_day(ts) == 1 && get_hour(ts) == 0) return get_monthName(ts)
        else return this.gradsDayName(ts)
      };
      return this.buildGrads(grads, t1, t2, majorGrad, majorValue, minorValue, unitStart)
    }
    else if (units.weeks > 0 || units.days > 0) {
      days = units.weeks * 7 + units.days;
      t1 = day_start(rangeStart);
      t2 = day_start(rangeEnd) + WEEK_MS;
      grads.unit = ["d", "day"];
      grads.timeSpan = `${days} days`;
      majorGrad = (ts) => { return DAY_MS };
      unitStart = (ts) => { return hour_start(ts) };
      majorValue = (ts) => {
        if (get_month(ts) == 0 && get_day(ts) == 1) return get_year(ts)
        else if (get_day(ts) == 1) return get_monthName(ts)
        else return this.gradsDayName(ts)
      };
      minorValue = (ts) => {
        if (get_day(ts) == 1 && get_hour(ts) == 0) return get_monthName(ts)
        else if (get_hour(ts) == 0) return this.gradsDayName(ts)
        else return get_hour(ts) + ":00"
      };
      return this.buildGrads(grads, t1, t2, majorGrad, majorValue, minorValue, unitStart)
    }
    else if (units.hours > 0) {
      t1 = hour_start(rangeStart);
      t2 = hour_start(rangeEnd) + DAY_MS;
      grads.unit = ["h", "hour"];
      grads.timeSpan = `${units.hours} hours`;
      majorGrad = (ts) => { return HOUR_MS };
      unitStart = (ts) => { return minute_start(ts) };
      majorValue = (ts) => {
        if (get_month(ts) == 0 && get_day(ts) == 1 && get_hour(ts) == 0) return get_year(ts)
        else if (get_day(ts) == 1 && get_hour(ts) == 0) return get_monthName(ts)
        else if (get_hour(ts) == 0) return this.gradsDayName(ts)
        else return this.HM(ts)
      };
      minorValue = (ts) => { return this.HM(ts) };
      return this.buildGrads(grads, t1, t2, majorGrad, majorValue, minorValue, unitStart)
    }
    else if (units.minutes > 0) {
      t1 = minute_start(rangeStart);
      t2 = minute_start(rangeEnd) + HOUR_MS;
      grads.unit = ["m", "minute"];
      grads.timeSpan = `${units.minutes} minutes`;
      majorGrad = (ts) => { return MINUTE_MS };
      unitStart = (ts) => { return second_start(ts) };
      majorValue = (ts) => {
        if (get_month(ts) == 0 && get_day(ts) == 1 && get_hour(ts) == 0 && get_minute(ts) == 0) return get_year(ts)
        else if (get_day(ts) == 1 && get_hour(ts) == 0 && get_minute(ts) == 0) return get_monthName(ts)
        else if (get_hour(ts) == 0 && get_minute(ts) == 0) return this.gradsDayName(ts)
        else return this.HM(ts)
      };
      minorValue = (ts) => { return this.HMS(ts) };
      return this.buildGrads(grads, t1, t2, majorGrad, majorValue, minorValue, unitStart)
    }
    else if (units.seconds > 0) {
      t1 = second_start(rangeStart) - MINUTE_MS;
      t2 = second_start(rangeEnd) + MINUTE_MS;
      grads.unit = ["s", "second"];
      grads.timeSpan = `${units.seconds} seconds`;
      majorGrad = (ts) => { return SECOND_MS };
      unitStart = (ts) => { return second_start(ts) };
      majorValue = (ts) => {
        if (get_month(ts) == 0 && get_day(ts) == 1 && get_hour(ts) == 0 && get_minute(ts) == 0) return get_year(ts)
        else if (get_day(ts) == 1 && get_hour(ts) == 0 && get_minute(ts) == 0) return get_monthName(ts)
        else if (get_hour(ts) == 0 && get_minute(ts) == 0) return this.gradsDayName(ts)
        else if (get_minute(ts) == 0 && get_second(ts) == 0) return this.HM(ts)
        else return this.MS(ts)
      };
      minorValue = (ts) => { return this.MS(ts) };
      return this.buildGrads(grads, t1, t2, majorGrad, majorValue, minorValue, unitStart)
    }
  }
  buildGrads(grads, t1, t2, majorGrad ,majorValue, minorValue, unitStart) {
    let th, to, min;
    const minorGrad = Math.floor(this.rangeLength / this.gradsMax) * this.range.interval;
    const limit = this.pixel2T(this.width + (this.candleW * 2));
    while (t1 < limit) {
      to = t1;
      grads.entries[t1] = [majorValue(t1), this.t2Pixel(t1), t1, "major"];
      th = t1;
      t1 += majorGrad(t1);
      while ((t1 - to) < minorGrad) {
        t1 += majorGrad(t1);
      }
      let x = Math.floor((t1 - to) / minorGrad);
      if (x > 0 ) {
        let y = Math.floor((t1 - to) / x);
        while (th < t1) {
          th += y;
          min = unitStart(th);
          grads.entries[min] = [minorValue(min), this.t2Pixel(min), min, "minor"];
        }
      }
    }
    grads.values = Object.values(grads.entries);
    return grads
  }
  gradsWorker() {
  }
  HM(t) {
    let h = String(get_hour(t)).padStart(2, '0');
    let m = String(get_minute(t)).padStart(2, '0');
    return `${h}:${m}`
  }
  HMS(t) {
    let h = String(get_hour(t)).padStart(2, '0');
    let m = String(get_minute(t)).padStart(2, '0');
    let s = String(get_second(t)).padStart(2, '0');
    return `${h}:${m}:${s}`
  }
  MS(t) {
    let m = String(get_minute(t)).padStart(2, '0');
    let s = String(get_second(t)).padStart(2, '0');
    return `${m}:${s}`
  }
  draw() {
    this.#xAxisGrads = this.calcXAxisGrads();
    this.drawGrads();
    this.drawOverlays();
  }
  drawGrads() {
    this.parent.layerLabels.scene.clear();
    const grads = this.#xAxisGrads.values;
    const ctx = this.parent.layerLabels.scene.context;
    bRound(this.width / this.range.Length * 0.5);
    const offset = 0;
    const theme = this.theme.xAxis;
    ctx.save();
    ctx.strokeStyle = theme.colourTick;
    ctx.fillStyle = theme.colourTick;
    ctx.font = `${theme.fontWeight} ${theme.fontSize}px ${theme.fontFamily}`;
    for (let tick of grads) {
      let x = bRound(tick[1]);
      let w = Math.floor(ctx.measureText(`${tick[0]}`).width * 0.5);
      ctx.fillText(tick[0], x - w + offset, this.xAxisTicks + 12);
      ctx.beginPath();
      ctx.moveTo(x + offset, 0);
      ctx.lineTo(x + offset, this.xAxisTicks);
      ctx.stroke();
    }
      ctx.restore();
  }
  drawOverlays() {
    this.parent.layerOverlays.scene.clear();
    this.#xAxisGrads;
  }
}

class Viewport {
  constructor(cfg) {
    if (!cfg) cfg = {};
    this.container = cfg.container;
    this.layers = [];
    this.id = CEL.idCnt++;
    this.scene = new CEL.Scene();
    this.setSize(cfg.width || 0, cfg.height || 0);
    cfg.container.innerHTML = "";
    cfg.container.appendChild(this.scene.canvas);
    CEL.viewports.push(this);
  }
  setSize(width, height) {
    this.width = width;
    this.height = height;
    this.scene.setSize(width, height);
    this.layers.forEach(function (layer) {
      layer.setSize(width, height);
    });
    return this;
  }
  addLayer(layer) {
    this.layers.push(layer);
    layer.setSize(layer.width || this.width, layer.height || this.height);
    layer.viewport = this;
    return this;
  }
  getIntersection(x, y) {
    var layers = this.layers,
      len = layers.length,
      n = len - 1,
      layer,
      key;
    while (n >= 0) {
      layer = layers[n];
      key = layer.hit.getIntersection(x, y);
      if (key >= 0) {
        return key;
      }
      n--;
    }
    return -1;
  }
  getIndex() {
    let viewports = CEL.viewports,
      viewport,
      n = 0;
    for (viewport of viewports) {
      if (this.id === viewport.id) return n;
      n++;
    }
    return null;
  }
  destroy() {
    for (let layer of layers) {
      layer.remove();
    }
    this.container.innerHTML = "";
    CEL.viewports.splice(this.getIndex(), 1);
  }
  render() {
    let scene = this.scene,
      layers = this.layers,
      layer;
    scene.clear();
    for (layer of layers) {
      if (layer.visible)
        scene.context.drawImage(
          layer.scene.canvas,
          layer.x,
          layer.y,
          layer.width,
          layer.height
        );
    }
  }
}
class Layer {
  constructor(cfg) {
    if (!cfg) cfg = {};
    this.id = CEL.idCnt++;
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.visible = true;
    this.hit = new CEL.Hit({
      contextType: cfg.contextType,
    });
    this.scene = new CEL.Scene({
      contextType: cfg.contextType,
    });
    if (cfg.x && cfg.y) {
      this.setPosition(cfg.x, cfg.y);
    }
    if (cfg.width && cfg.height) {
      this.setSize(cfg.width, cfg.height);
    }
  }
  setPosition(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }
  setSize(width, height) {
    this.width = width;
    this.height = height;
    this.scene.setSize(width, height);
    this.hit.setSize(width, height);
    return this;
  }
  moveUp() {
    let index = this.getIndex(),
      viewport = this.viewport,
      layers = viewport.layers;
    if (index < layers.length - 1) {
      layers[index] = layers[index + 1];
      layers[index + 1] = this;
    }
    return this;
  }
  moveDown() {
    let index = this.getIndex(),
      viewport = this.viewport,
      layers = viewport.layers;
    if (index > 0) {
      layers[index] = layers[index - 1];
      layers[index - 1] = this;
    }
    return this;
  }
  moveTop() {
    let index = this.getIndex(),
      viewport = this.viewport,
      layers = viewport.layers;
    layers.splice(index, 1);
    layers.push(this);
  }
  moveBottom() {
    let index = this.getIndex(),
      viewport = this.viewport,
      layers = viewport.layers;
    layers.splice(index, 1);
    layers.unshift(this);
    return this;
  }
  getIndex() {
    let layers = this.viewport.layers;
      layers.length;
      let n = 0,
      layer;
    for (layer of layers) {
      if (this.id === layer.id) return n;
      n++;
    }
    return null;
  }
  remove() {
    this.viewport.layers.splice(this.getIndex(), 1);
  }
}
class Scene {
  constructor(cfg) {
    if (!cfg) cfg = {};
    this.id = CEL.idCnt++;
    this.width = 0;
    this.height = 0;
    this.contextType = cfg.contextType || "2d";
    this.canvas = document.createElement("canvas");
    this.canvas.className = "scene-canvas";
    this.canvas.style.display = "block";
    this.context = this.canvas.getContext(this.contextType);
    if (cfg.width && cfg.height) {
      this.setSize(cfg.width, cfg.height);
    }
  }
  setSize(width, height) {
    this.width = width;
    this.height = height;
    this.canvas.width = width * CEL.pixelRatio;
    this.canvas.style.width = `${width}px`;
    this.canvas.height = height * CEL.pixelRatio;
    this.canvas.style.height = `${height}px`;
    if (this.contextType === "2d" && CEL.pixelRatio !== 1) {
      this.context.scale(CEL.pixelRatio, CEL.pixelRatio);
    }
    return this;
  }
  clear() {
    let context = this.context;
    if (this.contextType === "2d") {
      context.clearRect(
        0,
        0,
        this.width * CEL.pixelRatio,
        this.height * CEL.pixelRatio
      );
    }
    else {
      context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT);
    }
    return this;
  }
  toImage(type = "image/png", quality, cb) {
    let that = this,
      imageObj = new Image(),
      dataURL = this.canvas.toDataURL(type, quality);
    imageObj.onload = function () {
      imageObj.width = that.width;
      imageObj.height = that.height;
      cb(imageObj);
    };
    imageObj.src = dataURL;
  }
  export(cfg, cb, type = "image/png", quality) {
    if (typeof cb !== "function") cb = this.blobCallback.bind({ cfg: cfg });
    this.canvas.toBlob(cb, type, quality);
  }
  blobCallback(blob) {
    let anchor = document.createElement("a"),
      dataUrl = URL.createObjectURL(blob),
      fileName = this.cfg.fileName || "canvas.png";
    anchor.setAttribute("href", dataUrl);
    anchor.setAttribute("target", "_blank");
    anchor.setAttribute("export", fileName);
    if (document.createEvent) {
      Object.assign(document.createElement("a"), {
        href: dataUrl,
        target: "_blank",
        export: fileName,
      }).click();
    } else if (anchor.click) {
      anchor.click();
    }
  }
}
class Hit {
  constructor(cfg) {
    if (!cfg) cfg = {};
    this.width = 0;
    this.height = 0;
    this.contextType = cfg.contextType || "2d";
    this.canvas = document.createElement("canvas");
    this.canvas.className = "hit-canvas";
    this.canvas.style.display = "none";
    this.canvas.style.position = "relative";
    this.context = this.canvas.getContext(this.contextType, {
      preserveDrawingBuffer: true,
      antialias: false,
    });
    if (cfg.width && cfg.height) {
      this.setSize(cfg.width, cfg.height);
    }
  }
  setSize(width, height) {
    this.width = width;
    this.height = height;
    this.canvas.width = width * CEL.pixelRatio;
    this.canvas.style.width = `${width}px`;
    this.canvas.height = height * CEL.pixelRatio;
    this.canvas.style.height = `${height}px`;
    return this;
  }
  clear() {
    let context = this.context;
    if (this.contextType === "2d") {
      context.clearRect(
        0,
        0,
        this.width * CEL.pixelRatio,
        this.height * CEL.pixelRatio
      );
    }
    else {
      context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT);
    }
    return this;
  }
  getIntersection(x, y) {
    let context = this.context,
      data;
    x = Math.round(x);
    y = Math.round(y);
    if (x < 0 || y < 0 || x > this.width || y > this.height) {
      return -1;
    }
    if (this.contextType === "2d") {
      data = context.getImageData(x, y, 1, 1).data;
      if (data[3] < 255) {
        return -1;
      }
    }
    else {
      data = new Uint8Array(4);
      context.readPixels(
        x * CEL.pixelRatio,
        (this.height - y - 1) * CEL.pixelRatio,
        1,
        1,
        context.RGBA,
        context.UNSIGNED_BYTE,
        data
      );
      if (data[0] === 255 && data[1] === 255 && data[2] === 255) {
        return -1;
      }
    }
    return this.rgbToInt(data);
  }
  getColorFromIndex(index) {
    let rgb = this.intToRGB(index);
    return "rgb(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ")";
  }
  rgbToInt(rgb) {
    let r = rgb[0];
    let g = rgb[1];
    let b = rgb[2];
    return (r << 16) + (g << 8) + b;
  }
  intToRGB(number) {
    let r = (number & 0xff0000) >> 16;
    let g = (number & 0x00ff00) >> 8;
    let b = number & 0x0000ff;
    return [r, g, b];
  }
}
const CEL = {
  idCnt: 0,
  viewports: [],
  pixelRatio: (window && window.devicePixelRatio) || 1,
  Viewport: Viewport,
  Layer: Layer,
  Scene: Scene,
  Hit: Hit,
};

var stateMachineConfig$5 = {
  id: "time",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(data) {
      },
      onExit(data) {
      },
      on: {
        resize: {
          target: 'resize',
          action (data) {
          },
        },
        xAxis_scale: {
          target: 'scale',
          action (data) {
          },
        },
        xAxis_inc: {
          target: 'incremental',
          action (data) {
          },
        },
        xAxis_log: {
          target: 'logarithmic',
          action (data) {
          },
        },
        xAxis_100: {
          target: 'percentual',
          action (data) {
          },
        },
        chart_pan: {
          target: 'chart_pan',
          action (data) {
          },
        },
        chart_zoom: {
          target: 'chart_zoom',
          action (data) {
          },
        },
      }
    },
    resize: {
      onEnter(data) {
      },
      onExit(data) {
      },
      on: {
        someEvent: {
          target: '',
          action (data) {
          },
        },
      }
    },
    chart_pan: {
      onEnter(data) {
      },
      onExit(data) {
      },
      on: {
        chart_pan: {
          target: 'chart_pan',
          action (data) {
          },
        },
        chart_panDone: {
          target: 'idle',
          action (data) {
          },
        },
      }
    },
    chart_zoom: {
      onEnter(data) {
      },
      onExit(data) {
      },
      on: {
        always: {
          target: 'idle',
          condition: 'zoomDone',
          action (data) {
          },
        },
      }
    },
  },
  guards: {
    zoomDone () { return true },
  }
};

const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
typeof process !== 'undefined'
  && process.versions != null
  && process.versions.node != null;

const isHex  = /^#?([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
const isHSL  = /^hsla?((\d{1,3}?),\s*(\d{1,3}%),\s*(\d{1,3}%)(,\s*[01]?\.?\d*)?)$/;
const isHSLA = /^hsla[(]\s*0*(?:[12]?\d{1,2}|3(?:[0-5]\d|60))\s*(?:\s*,\s*0*(?:\d\d?(?:\.\d+)?\s*%|\.\d+\s*%|100(?:\.0*)?\s*%)){2}\s*,\s*0*(?:\.\d+|1(?:\.0*)?)\s*[)]$/;
const isRGB  = /^rgba?((\d{1,3}%?),\s*(\d{1,3}%?),\s*(\d{1,3}%?)(,\s*[01]?\.?\d*)?)$/;
const isRGBA = /^^rgba[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*,){3}\s*0*(?:\.\d+|1(?:\.0*)?)\s*[)]$/;
class Colour {
  #value = {
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
    isValid: false
  }
  constructor (colour) {
    this.#validate(colour);
    if (isHex.test(colour)) this.#valueIsHex(colour);
    if (isHSL.test(colour)) this.#valueIsHSL(colour);
    if (isHSLA.test(colour)) this.#valueIsHSLA(colour);
    if (isRGB.test(colour)) this.#valueIsRGB(colour);
    if (isRGBA.test(colour)) this.#valueIsRGBA(colour);
  }
  get value() { return this.#value }
  get isValid() { return this.#value.isValid }
  get hex() { return this.#value.hex.slice(0, -2) }
  get hexa() { return this.#value.hex }
  #validate(colour) {
    if (isBrowser) {
      let el = document.getElementById('divValidColourTest');
      if (!el) {
        el = document.createElement('div');
        el.id = 'divValidColourTest';
      }
      el.style.backgroundColor = "";
      el.style.backgroundColor = colour;
      this.#value.isValid = (el.style.backgroundColor.length) ? true : false;
    }
    else {
      this.#value.isValid = (
        isHex.test(colour) ||
        isHSL.test(colour) ||
        isHSLA.test(colour) ||
        isRGB.test(colour) ||
        isRGBA.test(colour)
      ) ? true : false;
    }
  }
  setHex(hex) {
    let val = this.#value;
    ([
      val.r16,
      val.g16,
      val.b16,
      val.a16
    ] = hex);
    val.hex = "#" + val.r16 +val.g16 + val.b16 + val.a16;
  }
  setRGBA(rgba) {
    let val = this.#value;
    ([
      val.r,
      val.g,
      val.b,
      val.a
    ] = rgba);
    val.rgb = `rgb(${rgba[0]},${rgba[1]},${rgba[2]})`;
    val.rgba = `rgb(${rgba[0]},${rgba[1]},${rgba[2]},${rgba[3]})`;
  }
  setHSLA(hsla) {
    let val = this.#value;
    ([
      val.h,
      val.s,
      val.l,
      val.a
    ] = hsla);
    val.hsl = `hsl(${hsla[0]},${hsla[1]}%,${hsla[2]}%)`;
    val.hsla = `hsl(${hsla[0]},${hsla[1]}%,${hsla[2]}%,${hsla[3]})`;
  }
  #valueIsHex(hex) {
    this.#value.hex = hex;
    let l = hex.length,
        rgba;
    switch (l) {
      case 4 :
        rgba = [`${hex[1]}${hex[1]}`, `${hex[2]}${hex[2]}`, `${hex[3]}${hex[3]}`, "ff"];
        break;
      case 7 :
        rgba = [hex.substr(1,2), hex.substr(3,2), hex.substr(5,2), "ff"];
        break;
      case 9 :
        rgba = [hex.substr(1,2), hex.substr(3,2), hex.substr(5,2), hex.substr(7,2)];
        break
    }
    this.setHex(rgba);
    this.#hexToRGB(rgba);
    this.#hexToHSL(rgba);
  }
  #valueIsHSL(hsl) {
    this.#value.hsl = hsl;
  }
  #valueIsHSLA(hsla) {
    this.#value.hsla = hsla;
  }
  #valueIsRGB(rgb) {
    this.#value.rgb = rgb;
    this.#RGBAToHex(rgba);
  }
  #valueIsRGBA(rgba) {
    this.#value.rgba = rgba;
    this.#RGBAToHex(rgba);
  }
  #RGBToHex (rgb) {
    let {r,g,b,a} = this.#getRGB(rgb);
    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
    if (a.length == 1)
      a = "0" + a;
    this.value.r = r;
    this.value.g = g;
    this.value.b = b;
    this.value.a = a;
    this.setHex([r,g,b,a]);
    return this
  }
  #RGBToHSL (rgb) {
    let {r,g,b,a} = this.#getRGB(rgb);
    r = parseInt(r, 16) / 255;
    g = parseInt(g, 16) / 255;
    b = parseInt(b, 16) / 255;
    a = parseInt(a, 16) / 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
      ? l === r
        ? (g - b) / s
        : l === g
        ? 2 + (b - r) / s
        : 4 + (r - g) / s
      : 0;
    let hsla = [
      (60 * h < 0 ? 60 * h + 360 : 60 * h).toString(),
      (100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0)).toString(),
      ((100 * (2 * l - s)) / 2).toString(),
      (a).toString()
    ];
    this.setHSLA(hsla);
    return this
  }
  #HSLToRGB (h, s, l) {
    s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [255 * f(0), 255 * f(8), 255 * f(4)];
  };
  #hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }
  #hexToRGB(hex) {
    if (isString(hex)) hex = /([a-f\d]{2})/ig.exec(hex);
    var rgba = [
        parseInt(hex[0], 16),
        parseInt(hex[1], 16),
        parseInt(hex[2], 16),
        parseInt(hex[3], 16) / 255
    ];
    this.setRGBA(rgba);
  }
  #hexToHSL(hex) {
    if (isString(hex)) hex = /([a-f\d]{2})/ig.exec(hex);
    let r = parseInt(hex[0], 16);
    let g = parseInt(hex[1], 16);
    let b = parseInt(hex[2], 16);
    let a = parseInt(hex[3], 16);
    r /= 255, g /= 255, b /= 255, a /= 255;
    this.setHSLA([r,g,b,a]);
  }
  #getRGB (rgb) {
    let r,g,b,a;
    let v = this.#value;
    if (v.r && v.g && v.b && v.a) return {r, g, b, a} = {...v}
    if (isString(rgb)) {
      let sep = rgb.indexOf(",") > -1 ? "," : " ";
      rgb = rgb.substr(4).split(")")[0].split(sep);
    }
    if (isArray(rgb)) {
      if (rgb.length < 3 || rgb.length > 4) return false
      r = rgb[0];
      g = rgb[1];
      b = rgb[2];
      a = (isString(rgb[3])) ? rgb[3] : "";
    }
    else if (isObject(rgb)) {
      r = rgb.r;
      g = rgb.g;
      b = rgb.b;
      a = ("a" in rgb) ? rgb.a : "";
    }
    else return false
    return {r, g, b, a}
  }
  #RGBAToHex (rgba) {
    let x, isPercent,
      i = 0,
      y = [],
      z = [],
      rgb = rgba.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i);
      rgb.shift();
      for (let v of rgb) {
        isPercent = v.indexOf("%") > -1;
        x = parseFloat(v);
        if (i < 3 && isPercent) {
          x = Math.round(255 * x / 100);
        }
        else if (i == 3) {
          if (!isPercent && x >= 0 && x <= 1) {
            x = Math.round(255 * x);
          } else if (isPercent && x >= 0 && x <= 100) {
            x = Math.round(255 * x / 100);
          } else {
            x = "";
          }
        }
        y[i] = (x | 1 << 8).toString(16).slice(1);
        z[i++] = x;
      }
      this.setHex(y);
      this.setRGBA(z);
      this.#hexToHSL(this.#value.hex);
  }
}

const defaultOptions = {
  fontSize: 12,
  fontWeight: "normal",
  fontFamily: 'Helvetica Neue',
  paddingLeft: 3,
  paddingRight: 3,
  paddingTop: 2,
  paddingBottom: 2,
  borderSize: 0,
  txtCol: "#000",
  bakCol: "#CCC"
};
function calcTextWidth (ctx, text) {
  return Math.round(ctx.measureText(text).width)
}
function createFont (
  fontSize = defaultOptions.fontSize,
  fontWeight = defaultOptions.fontWeight,
  fontFamily = defaultOptions.fontFamily
  ) {
  return `${fontWeight} ${fontSize}px ${fontFamily}`
}
function getTextRectWidth (ctx, text, options) {
  ctx.font = createFont(options.fontSize, options.fontWeight, options.fontFamily);
  const textWidth = calcTextWidth(ctx, text);
  const paddingLeft = options.paddingLeft || 0;
  const paddingRight = options.paddingRight || 0;
  const borderSize = options.borderSize || 0;
  return paddingLeft + paddingRight + textWidth + (borderSize * 2)
}
function getTextRectHeight (options) {
  const paddingTop = options.paddingTop || 0;
  const paddingBottom = options.paddingBottom || 0;
  const borderSize = options.borderSize || 0;
  const fontSize = options.fontSize || 0;
  return paddingTop + paddingBottom + fontSize + (borderSize * 2)
}
function drawTextBG(ctx, txt, x, y, options) {
  ctx.save();
  ctx.font = createFont(options?.fontSize, options?.fontWeight, options?.fontFamily);
  ctx.textBaseline = 'top';
  ctx.fillStyle = options.bakCol || defaultOptions.bakCol;
  let width = getTextRectWidth(ctx, txt, options);
  let height = getTextRectHeight(options);
  ctx.fillRect(x, y, width, height);
  ctx.fillStyle = options.txtCol || defaultOptions.txtCol;
  x = x + options?.paddingLeft;
  y = y + options?.paddingTop;
  ctx.fillText(txt, x, y);
  ctx.restore();
}

class Slider {
  #id
  #core
  #elContainer
  #elHandle
  #containerDims = {w: 0, h: 0}
  #handleDims = {w: 0, h: 0, x: 0, y: 0}
  #constraint = {x: false, y: true}
  #cursorPos
  #controller
  #callback
  constructor(config) {
    this.#core = config.core;
    this.#elContainer = (DOM.isElement(config.elContainer)) ? config.elContainer : false;
    this.#elHandle = (DOM.isElement(config.elHandle)) ? config.elHandle : false;
    this.#callback = (isFunction(config.callback)) ? config.callback : false;
    if (DOM.isElement(this.#elContainer) && DOM.isElement(this.#elHandle)) {
      this.mount();
      this.eventsListen();
    }
  }
  eventsListen() {
  this.#controller = new InputController(this.#elHandle, {disableContextMenu: false});
  this.#controller.on("mouseenter", this.onMouseEnter.bind(this));
  this.#controller.on("mouseout", this.onMouseOut.bind(this));
  this.#controller.on("drag", debounce(this.onHandleDrag, 1, this, true));
  this.#controller.on("enddrag", this.onHandleDragDone.bind(this));
  this.#controller.on("mousedown", debounce(this.onMouseDown, 100, this, true));
  this.#controller.on("mouseup", this.onMouseUp.bind(this));
  }
  on(topic, handler, context) {
    this.#core.on(topic, handler, context);
  }
  off(topic, handler) {
    this.#core.off(topic, handler);
  }
  emit(topic, data) {
    this.#core.emit(topic, data);
  }
  onMouseEnter() {
    console.log("slider enter");
    this.colour = new Colour(this.#elHandle.style.backgroundColor);
    this.#elHandle.style.backgroundColor = this.colour.hex;
  }
  onMouseOut() {
    console.log("slider out");
    this.#elHandle.style.backgroundColor = this.colour.hexa;
  }
  onMouseDown() {
    console.log("slider down");
  }
  onMouseUp() {
    console.log("slider up");
  }
  onHandleDrag(e) {
    console.log("slider drag",e);
    let x = parseInt(this.#elHandle.style.marginLeft);
    this.#elHandle.style.marginLeft = (x + e.position.x )+ "px";
  }
  onHandleDragDone() {
    console.log("slider drag done");
  }
  mount() {
    this.#containerDims.w = this.#elContainer.clientWidth;
    this.#containerDims.h = this.#elContainer.clientHeight;
    this.#elContainer.style.overflow = "hidden";
    this.#handleDims.w = this.#elHandle.clientWidth;
    this.#handleDims.h = this.#elHandle.clientHeight;
    this.#elHandle.style.marginRight = 0;
    this.#elHandle.style.position = "absolute";
  }
  setCursor(cursor) {
    this.#elHandle.style.cursor = cursor;
  }
  updateHandlePos(pos) {
    let dividerY = this.#elHandle.offsetTop;
        dividerY += pos[5];
    this.#elHandle.style.top = `${dividerY}px`;
  }
  setHandlePos() {
  }
}

class Timeline {
  #name = "Timeline"
  #shortName = "time"
  #mediator
  #options
  #elTime
  #core
  #parent
  #chart
  #xAxis
  #elViewport
  #elNavigation
  #viewport
  #navigation
  #elNavList
  #elNavScrollBar
  #elNavScrollHandle
  #layerLabels
  #layerOverlays
  #layerCursor
  #controller
  #slider
  #icons = {
    width: 20,
    height: 20,
    fill: "#aaa"
  }
  constructor (mediator, options) {
    this.#mediator = mediator;
    this.#options = options;
    this.#elTime = mediator.api.elements.elTime;
    this.#parent = mediator.api.MainPane;
    this.#chart = mediator.api.Chart;
    this.#core = mediator.api.core;
    this.#xAxis = new xAxis(this, this.#chart);
    this.init();
  }
  log(l) { this.#mediator.log(l); }
  info(i) { this.#mediator.info(i); }
  warning(w) { this.#mediator.warn(w); }
  error(e) { this.#mediator.error(e); }
  get name() { return this.#name }
  get shortName() { return this.#shortName }
  get mediator() { return this.#mediator }
  get options() { return this.#options }
  get core() { return this.#core }
  get height() { return this.#elTime.clientHeight }
  set width(w) { this.setWidth(w); }
  get width() { return this.#elTime.clientWidth }
  get xAxis() { return this.#xAxis }
  get xAxisWidth() { return this.#xAxis.width }
  get xAxisRatio() { return this.#xAxis.xAxisRatio }
  get layerLabels() { return this.#layerLabels }
  get layerOverlays() { return this.#layerOverlays }
  get xAxisGrads() { return this.#xAxis.xAxisGrads }
  get candleW() { return this.#xAxis.candleW }
  get theme() { return this.#core.theme }
  get config() { return this.#core.config }
  get viewport() { return this.#viewport }
  get navigation() { return this.#navigation }
  get range() { return this.#core.range }
  get pos() { return this.dimensions }
  get dimensions() { return DOM.elementDimPos(this.#elTime) }
  get bufferPx() { return this.#core.bufferPx }
  get scrollPos() { return this.#core.scrollPos }
  get scrollOffsetPx() { return this.#core.scrollPos % this.candleW }
  get smoothScrollOffset() { return this.#core.smoothScrollOffset }
  get rangeScrollOffset() { return this.#core.rangeScrollOffset }
  init() {
    this.mount(this.#elTime);
    this.log(`${this.#name} instantiated`);
  }
  mount(el) {
    el.innerHTML = this.defaultNode();
    const api = this.#mediator.api;
    this.#elViewport = DOM.findBySelector(`#${api.id} .${CLASS_TIME} .viewport`);
    this.#elNavigation = DOM.findBySelector(`#${api.id} .${CLASS_TIME} .navigation`);
    this.#elNavList = DOM.findBySelectorAll(`#${api.id} .${CLASS_TIME} .navigation .icon`);
    this.#elNavScrollBar = DOM.findBySelector(`#${api.id} .${CLASS_TIME} .navigation #tScrollBar`);
    this.#elNavScrollHandle = DOM.findBySelector(`#${api.id} .${CLASS_TIME} .navigation .handle`);
    for (let i of this.#elNavList) {
      let svg = i.querySelector('svg');
      svg.style.width = `${this.#icons.width}px`;
      svg.style.height = `${this.#icons.height}px`;
      svg.style.fill = `${this.#icons.fill}`;
    }
  }
  defaultNode() {
    const navStyle = `width: calc(100% - ${this.core.scaleW}px);`;
    const node = `
    <div class="viewport"></div>
    <div class="navigation" style="${navStyle}">${this.navigationNode()}</div>
  `;
    return node
  }
  navigationNode() {
    const theme = this.core.theme;
    const handleColour = new Colour(theme.chart.BorderColour);
    const scrollBarStyle = ` border: 1px solid ${theme.chart.BorderColour};`;
    const handleStyle = `background: ${handleColour.hex}44; margin-top: 1px;`;
    const node = `
    <span id="rwdStart" class="icon">${rwdStart}</span>
    <span id="tScrollBar" style="${scrollBarStyle}">
      <div class="viewport"></div>
      <div class="handle" style="${handleStyle}"></div>
    </span>
    <span id="fwdEnd" class="icon">${fwdEnd}</span>
    `;
    return node
  }
  setWidth(w) {
    this.#elTime.style.width = `${w}px`;
    this.#elViewport.style.width = w;
  }
  setDimensions(dim) {
    const buffer = this.config.buffer || BUFFERSIZE$1;
    const width = dim.w - this.#core.Chart.scale.width;
    const height = this.height / 2;
    const layerWidth = Math.round(width * ((100 + buffer) * 0.01));
    this.#viewport.setSize(width, this.height);
    this.#layerLabels.setSize(layerWidth, height);
    this.#layerOverlays.setSize(layerWidth, height);
    this.#layerCursor.setSize(layerWidth, height);
    this.setWidth(dim.w);
    this.draw();
  }
  start() {
    this.createViewport();
    this.onSetRange();
    this.#xAxis.initXAxisGrads();
    this.draw();
    const sliderCfg = {
      core: this.#core,
      elContainer: this.#elNavScrollBar,
      elHandle: this.#elNavScrollHandle,
      callback: null
    };
    this.#slider = new Slider(sliderCfg);
    this.eventsListen();
    stateMachineConfig$5.context.origin = this;
    this.#mediator.stateMachine = stateMachineConfig$5;
    this.#mediator.stateMachine.start();
  }
  end() {
    this.#mediator.stateMachine.destroy();
    this.#viewport.destroy();
    this.#controller = null;
    this.off("main_mousemove", this.drawCursorTime);
    this.off("setRange", this.onSetRange);
  }
  eventsListen() {
    let canvas = this.#viewport.scene.canvas;
    this.#controller = new InputController(canvas, {disableContextMenu: false});
    this.on("main_mousemove", this.drawCursorTime.bind(this));
    this.on("setRange", this.onSetRange.bind(this));
    for (let i of this.#elNavList) {
      i.addEventListener('click', debounce(this.onMouseClick, 1000, this, true));
    }
  }
  on(topic, handler, context) {
    this.#mediator.on(topic, handler, context);
  }
  off(topic, handler) {
    this.#mediator.off(topic, handler);
  }
  emit(topic, data) {
    this.#mediator.emit(topic, data);
  }
  onMouseClick(e) {
    const id = e?.currentTarget?.id || e.target.parentElement.id;
    switch (id) {
      case "fwdEnd":
        this.ffwdEnd();
        break
      case "rwdStart":
        this.rwdStart();
        break
    }
  }
  onSetRange() {
    let start = this.range.indexStart;
    this.range.indexEnd;
    let scrollBarW = this.#elNavScrollBar.clientWidth;
    let rangeW = this.range.dataLength + this.range.limitFuture + this.range.limitPast;
    let ratio = scrollBarW / rangeW;
    let handleW = this.range.Length * ratio;
    let pos = ((start + this.range.limitPast) * ratio);
    this.#elNavScrollHandle.style.width = `${handleW}px`;
    this.#elNavScrollHandle.style.marginLeft = `${pos}px`;
  }
  xPos(time) { return this.#xAxis.xPos(time) }
  xPosSnap2CandlePos(x) { return this.#xAxis.xPosSnap2CandlePos(x) }
  xPos2Time(x) { return this.#xAxis.xPos2Time(x) }
  xPos2Index(x) { return this.#xAxis.xPos2Index(x) }
  xPosOHLCV(x) { return this.#xAxis.xPosOHLCV(x) }
  createViewport() {
    const buffer = this.config.buffer || BUFFERSIZE$1;
    const width = this.xAxisWidth;
    const height = this.#elTime.clientHeight;
    const layerConfig = {
      width: Math.round(width * ((100 + buffer) * 0.01)),
      height: height
    };
    this.#viewport = new CEL.Viewport({
      width: width,
      height: height / 2,
      container: this.#elViewport
    });
    this.#layerLabels = new CEL.Layer(layerConfig);
    this.#layerOverlays = new CEL.Layer(layerConfig);
    this.#layerCursor = new CEL.Layer(layerConfig);
    this.#viewport
          .addLayer(this.#layerLabels)
          .addLayer(this.#layerOverlays)
          .addLayer(this.#layerCursor);
  }
  draw() {
    this.#layerCursor.setPosition(this.scrollPos, 0);
    this.#layerLabels.setPosition(this.scrollPos, 0);
    this.#layerOverlays.setPosition(this.scrollPos, 0);
    this.#xAxis.draw();
    this.drawCursorTime();
    this.#viewport.render();
  }
  drawCursorTime() {
    const ctx = this.#layerCursor.scene.context;
    const rect = this.#elViewport.getBoundingClientRect();
    const x = this.#core.mousePos.x - rect.left;
    let timestamp = this.xPos2Time(x),
        date = new Date(timestamp),
        dateTimeStr = date.toUTCString(),
        options = {
          fontSize: this.theme.xAxis.fontSize * 1.05,
          fontWeight: this.theme.xAxis.fontWeight,
          fontFamily: this.theme.xAxis.fontFamily,
          txtCol: this.theme.xAxis.colourCursor,
          bakCol: this.theme.xAxis.colourCursorBG,
          paddingTop: 5,
          paddingBottom: 3,
          paddingLeft: 4,
          paddingRight: 4
        },
        txtW = getTextRectWidth(ctx, dateTimeStr, options),
        xPos = x + this.bufferPx;
        xPos = this.#xAxis.xPosSnap2CandlePos(xPos);
        xPos = xPos - Math.round(txtW * 0.5) - this.scrollPos - this.bufferPx;
    this.#layerCursor.scene.clear();
    ctx.save();
    drawTextBG(ctx, dateTimeStr, xPos, 1 , options);
    ctx.restore();
    this.#viewport.render();
  }
  resize(width=this.width, height=this.height) {
    this.setDimensions({w: width, h: height});
  }
  ffwdEnd() {
    this.core.jumpToEnd();
    console.log("fwdEnd");
  }
  rwdStart() {
    this.core.jumpToStart();
    console.log("rwdStart");
  }
}

class yAxis extends Axis {
  #source
  #parent
  #chart
  #core
  #yAxisType = YAXIS_TYPES$1[0]
  #mode = "automatic"
  #transform = {
    automatic: {
      get max() { return this.range?.valueMax },
      get min() { return this.range?.valueMin },
      get mid() { return this.range?.valueMin + (this.range?.valueDiff * 0.5) },
      get diff() { return this.range?.valueDiff },
      zoom: 1,
      offset: 0,
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
  }
  #yAxisPadding = 1.04
  #yAxisStep = YAXIS_STEP
  #yAxisGrid = YAXIS_GRID
  #yAxisDigits = PRICEDIGITS$1
  #yAxisRound = 3
  #yAxisTicks = 3
  #yAxisGrads
  #range
  constructor(parent, chart, yAxisType=YAXIS_TYPES$1[0], range) {
    super(parent, chart);
    this.#core = parent.mediator.api.core;
    this.#chart = chart;
    this.#parent = parent;
    this.#source = parent.parent;
    this.yAxisType = yAxisType;
    this.#yAxisGrid = (this.core.config?.yAxisGrid) ?
      this.core.config?.yAxisGrid : YAXIS_GRID;
    range = (range) ? range : this.#core.range;
    this.#transform.automatic.range = range;
    this.#range = new Proxy(range, {
      get: (obj, prop) => {
        const m = this.#mode;
        const t = this.#transform;
        switch (prop) {
          case "max": return t[m][prop]
          case "min":  return t[m][prop]
          case "mid": return t[m][prop]
          case "diff": return t[m][prop]
          case "zoom": return t[m][prop]
          case "offset": return t[m][prop]
          default: return obj[prop]
        }
      }
    });
  }
  get core() { return this.#core }
  get chart() { return this.#chart }
  get data() { return this.chart.data }
  get height() { return this.chart.height }
  get rangeH() { return this.#range.diff * this.yAxisPadding }
  get yAxisRatio() { return this.getYAxisRatio() }
  get yAxisPrecision() { return this.yAxisCalcPrecision }
  set yAxisPadding(p) { this.#yAxisPadding = p; }
  get yAxisPadding() { return this.#yAxisPadding }
  set yAxisType(t) { this.#yAxisType = YAXIS_TYPES$1.includes(t) ? t : YAXIS_TYPES$1[0]; }
  get yAxisType() { return this.#yAxisType }
  set yAxisStep(s) { this.#yAxisStep = isNumber(s) ? s : YAXIS_STEP; }
  get yAxisStep() { return this.#yAxisStep }
  set yAxisTicks(t) { this.#yAxisTicks = isNumber(t) ? t : 0; }
  get yAxisTicks() { return this.#yAxisTicks }
  get yAxisGrads() { return this.#yAxisGrads }
  get theme() { return this.core.theme }
  set mode(m) { this.setMode(m); }
  get mode() { return this.#mode }
  set offset(o) { this.setOffset(o); }
  get offset() { return this.#range.offset }
  set zoom(z) { this.setZoom(z); }
  get zoom() { return this.#range.zoom }
  calcHeight() {
    let api = this.#chart.mediator.api;
    return api.height - api.utilsW - api.scaleW
  }
  getYAxisRatio() {
    return this.height / this.#range.diff
  }
  yAxisRangeBounds() {
  }
  yAxisLog() {
  }
  yAxisCntDigits(value) {
    return this.countDigits(value)
  }
  yAxisCalcPrecision() {
    let integerCnt = this.numDigits(this.#range.max);
    return this.yDigits - integerCnt
  }
  yAxisCursor() {
  }
  yPos(yData) {
    switch(this.yAxisType) {
      case "percent" : return bRound(this.p100toPixel(yData))
      case "log" : return bRound(this.$2Pixel(log10(yData)))
      default : return bRound(this.$2Pixel(yData))
    }
  }
  yPos2Price(y) {
    return this.pixel2$(y)
  }
  $2Pixel(yData) {
    const height = yData - this.#range.min;
    const yPos = this.height - (height * this.yAxisRatio) + this.#range.offset;
    return yPos
  }
  lastYData2Pixel(yData) {
    let height = yData - this.core.stream.lastPriceMin;
    let yPos = this.height - (height * this.yAxisRatio);
    return yPos
  }
  pixel2$(y) {
    let ratio = (this.height - y) / this.height;
    let adjust = this.#range.diff * ratio;
    return this.#range.min + adjust
  }
  p100toPixel(yData) {
    return this.height * yData / 100
  }
  yAxisTransform() {
  }
  setMode(m) {
    if (!["automatic","manual"].includes(m)) return false
    const t = this.#transform;
    if (this.mode == "automatic" && m == "manual") {
      t.manual.zoom = 0;
      t.manual.max = this.#range.valueMax;
      t.manual.min = this.#range.valueMin;
      this.#mode = m;
    }
    else if (this.mode == "manual" && m == "automatic") {
      t.manual.zoom = 0;
      this.#mode = m;
    }
  }
  setOffset(o) {
    if (!isNumber(o) || this.#mode !== "manual") return false
    const t = this.#transform;
    t.manual.offset += o;
    console.log("t.manual.offset:",t.manual.offset);
  }
  setZoom(z) {
    if (!isNumber(z) || this.#mode !== "manual") return false
    const t = this.#transform;
    t.manual.zoom += z;
    const r = z / this.height;
    const min = t.manual.min * (1 - r);
    const max = t.manual.max * (1 + r);
    if (max < min) return
    t.manual.max =  max;
    t.manual.min = (min >= 0)? min : 0;
    t.manual.mid = (max - min) / 2;
    t.manual.diff = max - min;
    t.manual.zoom = 1;
    t.manual.offset = 0;
  }
  calcGradations() {
    switch (this.yAxisType) {
      case "percent":
        this.#yAxisGrads = this.gradations(100, 0, false, true);
        break;
      default:
        let max = (this.#range.max > 0) ? this.#range.max : 1;
        let min = (this.#range.min > 0) ? this.#range.min : 0;
        this.#yAxisGrads = this.gradations(max, min);
        break;
    }
  }
  gradations(max, min, decimals=true, fixed=false) {
      let digits,
          rangeH,
          yGridSize;
    const scaleGrads = [];
    this.#yAxisRound = this.countDigits(this.#range.diff).integers;
    rangeH = max - min;
    rangeH = (this.rangeH > 0) ? this.rangeH : 1;
    yGridSize = (rangeH)/this.#yAxisGrid;
    let niceNumber = Math.pow( 10 , Math.ceil( Math.log10( yGridSize ) ) );
    if ( yGridSize < 0.25 * niceNumber ) niceNumber = 0.25 * niceNumber;
    else if ( yGridSize < 0.5 * niceNumber ) niceNumber = 0.5 * niceNumber;
    var yStartRoundNumber = Math.ceil( min/niceNumber ) * niceNumber;
    var yEndRoundNumber = Math.floor( max/niceNumber ) * niceNumber;
    let pos = this.height,
        step$ = (yEndRoundNumber - yStartRoundNumber) / niceNumber,
        stepP = this.height / step$,
        step = this.countDigits(step$),
        nice;
    for ( var y = yStartRoundNumber ; y <= yEndRoundNumber ; y += niceNumber )
    {
      digits = this.countDigits(y);
      nice = this.niceValue(digits, decimals, step);
      scaleGrads.push([nice, round(pos), digits]);
      pos -= stepP;
    }
    scaleGrads.shift();
    scaleGrads.pop();
    return scaleGrads
  }
  niceValue(digits, decimals=true, step) {
    if (digits.integers) {
      let x = step.integers;
      if (x - 2 > 0) {
        let factor = power(10, x - 2);
        return Math.floor(digits.value / factor) * factor
      }
      else {
        if (!decimals) return Math.floor(digits.value)
        x = (x > 0)? x : x * -1;
        return round(digits.value, x)
      }
    }
    else {
      let y = digits.decimals - step.decimals;
      y = (y > 0)? y : y * -1;
      return round(digits.value, y)
    }
  }
  limitPrecision(digits) {
    let value = digits.value,
        cnt = this.#yAxisDigits - digits.total,
        cnt2 = 4 - digits.integers;
    if (cnt < 1) {
      let decimals = limit(digits.decimals + cnt, 0, 100);
      value = Number.parseFloat(value).toFixed(decimals);
    }
    else if (cnt2 < 1) {
      let decimals = 2 - cnt2;
      value = Number.parseFloat(value).toFixed(decimals);
    }
    return value
  }
  draw() {
    this.calcGradations();
    this.drawLabels();
    this.drawOverlays();
  }
  drawLabels() {
    this.#parent.layerLabels.scene.clear();
    const grads = this.#yAxisGrads;
    const ctx = this.#parent.layerLabels.scene.context;
    const theme = this.theme.yAxis;
    ctx.save();
    ctx.strokeStyle = theme.colourTick;
    ctx.fillStyle = theme.colourTick;
    ctx.font = `${theme.fontWeight} ${theme.fontSize}px ${theme.fontFamily}`;
    for (let tick of grads) {
      ctx.fillText(tick[0], this.yAxisTicks + 5, tick[1] + 4);
      ctx.beginPath();
      ctx.moveTo(0, tick[1]);
      ctx.lineTo(this.yAxisTicks, tick[1]);
      ctx.stroke();
    }
    ctx.restore();
  }
  drawOverlays() {
    this.#parent.layerOverlays.scene.clear();
    this.#yAxisGrads;
    const ctx = this.#parent.layerOverlays.scene.context;
    ctx.save();
    ctx.restore();
  }
}

var stateMachineConfig$4 = {
  id: "scale",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(data) {
        this.context.origin.setCursor("ns-resize");
      },
      onExit(data) {
      },
      on: {
        resize: {
          target: 'resize',
          action (data) {
          },
        },
        yAxis_scale: {
          target: 'scale',
          action (data) {
          },
        },
        yAxis_inc: {
          target: 'incremental',
          action (data) {
          },
        },
        yAxis_log: {
          target: 'logarithmic',
          action (data) {
          },
        },
        yAxis_100: {
          target: 'percentual',
          action (data) {
          },
        },
        chart_zoom: {
          target: 'chart_zoom',
          action (data) {
          },
        },
        scale_drag: {
          target: 'scale_drag',
          condition: 'receiver',
          action (data) {
          },
        },
      }
    },
    resize: {
      onEnter(data) {
      },
      onExit(data) {
      },
      on: {
        someEvent: {
          target: '',
          action (data) {
          },
        },
      }
    },
    chart_zoom: {
      onEnter(data) {
      },
      onExit(data) {
      },
      on: {
        always: {
          target: 'idle',
          condition: 'zoomDone',
          action (data) {
            this.context.origin.draw();
          },
        },
      }
    },
    scale_drag: {
      onEnter(data) {
          console.log(`${this.context.origin.ID}: state: "${this.state}" - onEnter`);
          this.context.origin.setScaleRange(data.cursorPos[5]);
      },
      onExit(data) {
      },
      on: {
        scale_drag: {
          target: 'scale_drag',
          condition: 'receiver',
          action (data) {
          },
        },
        scale_dragDone: {
          target: 'idle',
          condition: 'receiver',
          action (data) {
            console.log(`${this.context.origin.ID}: transition from "${this.state}" to "idle"`);
          },
        },
      }
    },
  },
  guards: {
    receiver () { return (this.eventData.scale.ID == this.context.origin.ID) },
    zoomDone () { return true },
  }
};

class scalePriceLine {
  #core
  #config
  #theme
  #scale
  #target
  #viewport
  #scene
  constructor(target, scale, config) {
    this.#target = target;
    this.#viewport = target.viewport;
    this.#scene = target.scene;
    this.#config = config;
    this.#scale = scale;
    this.#core = scale.core;
    this.#theme = scale.core.theme;
    this.start();
  }
  set position(p) { this.#target.setPosition(p[0], p[1]); }
  start() {
    this.eventListeners();
  }
  end() {
    this.off(STREAM_UPDATE, this.onStreamUpdate);
  }
  eventListeners() {
    this.on(STREAM_UPDATE, (e) => { this.onStreamUpdate(e); });
  }
  on(topic, handler, context) {
    this.#scale.on(topic, handler, context);
  }
  off(topic, handler) {
    this.#scale.off(topic, handler);
  }
  emit(topic, data) {
    this.#scale.emit(topic, data);
  }
  onStreamUpdate(e) {
    this.draw(e);
  }
  draw(candle) {
    if (candle === undefined) return
    let price = candle[4],
        y = this.#scale.yPos(price),
        nice = this.#scale.nicePrice(price),
        options = {
          fontSize: YAxisStyle.FONTSIZE * 1.05,
          fontWeight: YAxisStyle.FONTWEIGHT,
          fontFamily: YAxisStyle.FONTFAMILY,
          txtCol: "#FFFFFF",
          bakCol: YAxisStyle.COLOUR_CURSOR_BG,
          paddingTop: 2,
          paddingBottom: 2,
          paddingLeft: 3,
          paddingRight: 3
        },
    height = options.fontSize + options.paddingTop + options.paddingBottom,
    yPos = y - (height * 0.5);
    this.#scene.clear();
    const ctx = this.#scene.context;
    ctx.save();
    if (candle[4] >= candle[1]) options.bakCol = this.#theme.candle.UpBodyColour;
    else options.bakCol = this.#theme.candle.DnBodyColour;
    ctx.fillStyle = options.bakCol;
    ctx.fillRect(1, yPos, this.width, height);
    drawTextBG(ctx, `${nice}`, 1, yPos , options);
    ctx.restore();
    this.#viewport.render();
  }
}

class ScaleBar {
  #ID
  #name = "Y Scale Axis"
  #shortName = "scale"
  #mediator
  #options
  #parent
  #core
  #chart
  #target
  #yAxis
  #elScale
  #elScaleCanvas
  #elViewport
  #viewport
  #layerLabels
  #layerOverlays
  #layerPriceLine
  #layerCursor
  #controller
  #priceLine
  #cursorPos
  constructor (mediator, options) {
    this.#mediator = mediator;
    this.#options = {...options};
    this.#elScale = mediator.api.elements.elScale;
    this.#chart = mediator.api.core.Chart;
    this.#parent = mediator.api.parent;
    this.#core = this.#mediator.api.core;
    this.#ID = this.#options.offChartID || uid("TX_scale_");
    this.init();
  }
  log(l) { this.#mediator.log(l); }
  info(i) { this.#mediator.info(i); }
  warning(w) { this.#mediator.warn(w); }
  error(e) { this.#mediator.error(e); }
  get ID() { return this.#ID }
  get name() { return this.#name }
  get shortName() { return this.#shortName }
  get mediator() { return this.#mediator }
  get options() { return this.#options }
  get core() { return this.#core }
  get parent() { return this.#parent }
  set height(h) { this.setHeight(h); }
  get height() { return this.#elScale.clientHeight }
  get width() { return this.#elScale.clientWidth }
  get layerLabels() { return this.#layerLabels }
  get layerOverlays() { return this.#layerOverlays }
  get yAxis() { return this.#yAxis }
  set yAxisType(t) { this.#yAxis.yAxisType = YAXIS_TYPES.includes(t) ? t : YAXIS_TYPES[0]; }
  get yAxisType() { return this.#yAxis.yAxisType }
  get yAxisHeight() { return this.#yAxis.height }
  get yAxisRatio() { return this.#yAxis.yAxisRatio }
  get yAxisGrads() { return this.#yAxis.yAxisGrads }
  get viewport() { return this.#viewport }
  get pos() { return this.dimensions }
  get dimensions() { return DOM.elementDimPos(this.#elScale) }
  get theme() { return this.#core.theme }
  get config() { return this.#core.config }
  set scaleRange(r) { this.setScaleRange(r); }
  set rangeMode(m) { this.#yAxis.mode = m; }
  get rangeMode() { return this.#yAxis.mode }
  set rangeYFactor(f) { this.core.range.yFactor(f); }
  set yOffset(o) { this.#yAxis.offset = o; }
  get yOffset() { return this.#yAxis.offset }
  init() {
    this.mount(this.#elScale);
    this.log(`${this.#name} instantiated`);
  }
  start(data) {
    const range = (this.#parent.name == "OffChart" ) ?
      this.#parent.localRange : undefined;
    this.#yAxis = new yAxis(this, this, this.options.yAxisType, range);
    this.createViewport();
    this.draw();
    this.eventsListen();
    const newConfig = copyDeep(stateMachineConfig$4);
    newConfig.context.origin = this;
    this.mediator.stateMachine = newConfig;
    this.mediator.stateMachine.start();
  }
  end() {
    this.#mediator.stateMachine.destroy();
    this.#controller = null;
    this.#viewport.destroy();
    this.#controller.removeEventListener("drag", this.onDrag);
    this.#controller.removeEventListener("enddrag", this.onDragDone);
    this.off(`${this.#parent.ID}_mousemove`, this.onMouseMove);
    this.off(`${this.#parent.ID}_mouseout`, this.eraseCursorPrice);
    this.off(STREAM_UPDATE, this.onStreamUpdate);
  }
  eventsListen() {
    let canvas = this.#viewport.scene.canvas;
    this.#controller = new InputController(canvas, {disableContextMenu: false});
    this.#controller.setCursor("ns-resize");
    this.on(`${this.#parent.ID}_mousemove`, (e) => { this.onMouseMove(e); });
    this.on(`${this.#parent.ID}_mouseout`, (e) => { this.eraseCursorPrice(); });
    this.on(STREAM_UPDATE, (e) => { this.onStreamUpdate(e); });
  }
  on(topic, handler, context) {
    this.mediator.on(topic, handler, context);
  }
  off(topic, handler) {
    this.mediator.off(topic, handler);
  }
  emit(topic, data) {
    this.mediator.emit(topic, data);
  }
  onResize(dimensions) {
    this.setDimensions(dimensions);
  }
  onMouseMove(e) {
    this.#cursorPos = (isArray(e)) ? e : [Math.floor(e.position.x), Math.floor(e.position.y)];
    this.drawCursorPrice();
  }
  onDrag(e) {
    this.#cursorPos = [
      Math.floor(e.position.x), Math.floor(e.position.y),
      e.dragstart.x, e.dragstart.y,
      e.movement.x, e.movement.y
    ];
    const dragEvent = {
      scale: this,
      cursorPos: this.#cursorPos
    };
    this.emit("scale_drag", dragEvent);
  }
  onDragDone(e) {
    this.#cursorPos = [
      Math.floor(e.position.x), Math.floor(e.position.y),
      e.dragstart.x, e.dragstart.y,
      e.movement.x, e.movement.y
    ];
    const dragEvent = {
      scale: this,
      cursorPos: this.#cursorPos
    };
    this.emit("scale_dragDone", dragEvent);
  }
  onMouseWheel(e) {
    e.domEvent.preventDefault();
    const direction = Math.sign(e.wheeldelta) * -1;
    this.range;
    console.log(`Scale: mousewheel: ${direction}`);
  }
  onStreamUpdate(e) {
  }
  mount(el) {
    el.innerHTML = this.defaultNode();
    this.#elViewport = el.querySelector(`.viewport`);
  }
  setHeight(h) {
    this.#elScale.style.height = `${h}px`;
  }
  setDimensions(dim) {
    const width = this.#elScale.clientWidth;
    this.#viewport.setSize(width, dim.h);
    this.#layerLabels.setSize(width, dim.h);
    this.#layerOverlays.setSize(width, dim.h);
    this.#layerCursor.setSize(width, dim.h);
    this.setHeight(dim.h);
    this.draw(undefined, true);
  }
  setScaleRange(r) {
    if (this.#yAxis.mode == "automatic") this.#yAxis.mode = "manual";
    this.#yAxis.zoom = r;
    this.parent.draw(this.range, true);
    this.draw();
  }
  setCursor(cursor) {
    this.#elScale.style.cursor = cursor;
  }
  defaultNode() {
    this.mediator.api;
    const node = `
      <div class="viewport"></div>
    `;
    return node
  }
  yPos(yData) { return this.#yAxis.yPos(yData) }
  yPosStream(yData) { return this.#yAxis.lastYData2Pixel(yData) }
  yPos2Price(y) { return this.#yAxis.yPos2Price(y) }
  nicePrice($) {
    let digits = this.#yAxis.countDigits($);
    return this.#yAxis.limitPrecision(digits)
  }
  createViewport() {
    const {layerConfig} = this.layerConfig();
    this.#viewport = new CEL.Viewport({
      width: this.#elScale.clientWidth,
      height: this.#elScale.clientHeight,
      container: this.#elViewport
    });
    this.#layerLabels = new CEL.Layer(layerConfig);
    this.#layerOverlays = new CEL.Layer(layerConfig);
    this.#layerCursor = new CEL.Layer();
    this.#viewport
          .addLayer(this.#layerLabels);
    if (isObject(this.config.stream))
          this.layerStream();
    this.#viewport
          .addLayer(this.#layerOverlays)
          .addLayer(this.#layerCursor);
  }
  layerConfig() {
    const width = this.#elScale.clientWidth;
    const height = this.#elScale.clientHeight;
    const layerConfig = {
      width: width,
      height: height
    };
    return {width, height, layerConfig}
  }
  layerStream() {
    if (!this.#layerPriceLine) {
      const {layerConfig} = this.layerConfig();
      this.#layerPriceLine = new CEL.Layer(layerConfig);
      this.#viewport.addLayer(this.#layerPriceLine);
    }
    if (!this.#priceLine) {
      this.#priceLine =
      new scalePriceLine(
        this.#layerPriceLine,
        this,
        this.theme
      );
    }
  }
  draw() {
    this.#yAxis.draw();
    this.#viewport.render();
    this.#parent.drawGrid();
  }
  drawCursorPrice() {
    let [x, y] = this.#cursorPos,
        price =  this.yPos2Price(y),
        nice = this.nicePrice(price),
        options = {
          fontSize: this.theme.yAxis.fontSize * 1.05,
          fontWeight: this.theme.yAxis.fontWeight,
          fontFamily: this.theme.yAxis.fontFamily,
          txtCol: this.theme.yAxis.colourCursor,
          bakCol: this.theme.yAxis.colourCursorBG,
          paddingTop: 2,
          paddingBottom: 2,
          paddingLeft: 3,
          paddingRight: 3
        },
        height = options.fontSize + options.paddingTop + options.paddingBottom,
        yPos = y - (height * 0.5);
    this.#layerCursor.scene.clear();
    const ctx = this.#layerCursor.scene.context;
    ctx.save();
    ctx.fillStyle = options.bakCol;
    ctx.fillRect(1, yPos, this.width, height);
    drawTextBG(ctx, `${nice}`, 1, yPos , options);
    ctx.restore();
    this.#viewport.render();
  }
  eraseCursorPrice() {
    this.#layerCursor.scene.clear();
    this.#viewport.render();
    return
  }
  resize(width=this.width, height=this.height) {
    this.setDimensions({w: width, h: height});
  }
}

class Overlays {
  #core
  #config
  #parent
  #list
  #elOverlays
  constructor (parent, list=[]) {
    this.#parent = parent;
    this.#core = parent.core;
    this.#list = new Map(list);
    for (const [key, overlay] of this.#list) {
      this.addOverlay(key, overlay);
    }
  }
  log(l) { this.#core.log(l); }
  info(i) { this.#core.info(i); }
  warning(w) { this.#core.warn(w); }
  error(e) { this.#core.error(e); }
  get core() { return this.#core }
  get parent() { return this.#parent }
  get layerConfig() { return this.#parent.layerConfig().layerConfig }
  get list() { return this.#list }
  get scale() { return this.#parent.parent.scale }
  get time() { return this.#parent.parent.time }
  start() {
    this.eventsListen();
  }
  end() {
  }
  eventsListen() {
    this.#parent.on("resize", (dimensions) => this.onResize.bind(this));
  }
  on(topic, handler, context) {
    this.#core.on(topic, handler, context);
  }
  off(topic, handler) {
    this.#core.off(topic, handler);
  }
  emit(topic, data) {
    this.#core.emit(topic, data);
  }
  get(overlay) {
    return this.#list.get(overlay)
  }
  addOverlays(overlays) {
    for (let o of overlays) {
      this.addOverlay(o[0], o[1]);
    }
  }
  addOverlay(key, overlay) {
    const layer = new CEL.Layer(this.layerConfig);
    this.parent.viewport.addLayer(layer);
    overlay.layer = layer;
    overlay.instance = new overlay.class(
      layer,
      this.#parent.TimeLine,
      this.#parent.Scale,
      this.#core.theme,
      this,
      overlay.params
    );
    this.#list.set(key, overlay);
  }
}

var stateMachineConfig$3 = {
  id: "chart",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter (data) {
        this.context.origin.setCursor("crosshair");
      },
      onExit (data) {
      },
      on: {
        chart_pan: {
          target: 'chart_pan',
          action (data) {
            this.context.origin.setCursor("grab");
          },
        },
        chart_zoom: {
          target: 'chart_zoom',
          action (data) {
          },
        },
        xAxis_scale: {
          target: 'xAxis_scale',
          action (data) {
          },
        },
        chart_yAxisRedraw: {
          target: 'chart_yAxisRedraw',
          action (data) {
          },
        },
        chart_tool: {
          target: 'chart_tool',
          action (data) {
          },
        },
        tool_activated: {
          target: 'tool_activated',
          action (data) {
            this.context.origin.setCursor("default");
          },
        },
      }
    },
    chart_pan: {
      onEnter (data) {
      },
      onExit (data) {
      },
      on: {
        chart_pan: {
          target: 'chart_pan',
          action (data) {
            this.context.origin.updateRange(data);
          },
        },
        chart_panDone: {
          target: 'idle',
          action (data) {
            this.context.origin.updateRange(data);
          },
        },
      }
    },
    chart_zoom: {
      onEnter (data) {
      },
      onExit (data) {
      },
      on: {
        always: {
          target: 'idle',
          condition: 'zoomDone',
          action (data) {
            this.context.origin.zoomRange(data);
          },
        },
      }
    },
    xAxis_scale: {
      onEnter (data) {
      },
      onExit (data) {
      },
      on: {
        Idle: {
          target: 'idle',
          action (data) {
          },
        },
      }
    },
    chart_yAxisRedraw: {
      onEnter(data) {
      },
      onExit(data) {
      },
      on: {
        always: {
          target: 'idle',
          condition: 'yAxisRedraw',
          action (data) {
            this.context.origin.drawGrid();
          },
        },
      }
    },
    tool_activated: {
      onEnter (data) {
      },
      onExit (data) {
      },
      on: {
        tool_targetSelected: {
          target: 'idle',
          condition: 'toolSelectedThis',
          action (data) {
            console.log("tool_targetSelected:", data);
          },
        },
      }
    },
  },
  guards: {
    priceMaxMin () { return true },
    toolSelectedThis (conditionType, condition) {
      if (this.eventData === this.context.origin)
        return true
      else
        return false
     },
    yAxisRedraw () { return true },
    zoomDone () { return true },
  }
};

class chartGrid {
  #parent
  #core
  #config = {}
  #theme
  #xAxis
  #yAxis
  #target
  #scene
  #params
  constructor(target, xAxis=false, yAxis=false, theme, parent, params) {
    this.#parent = parent;
    this.#core = parent.core;
    this.#target = target;
    this.#scene = target.scene;
    this.#theme = theme;
    this.#xAxis = xAxis;
    this.#yAxis = yAxis;
    this.#params = params;
    this.#config.axes = params?.axes || "both";
  }
  get xAxis() { return this.#xAxis || this.#parent.time.xAxis }
  get yAxis() { return this.#yAxis || this.#parent.scale.yAxis }
  set position(p) { this.#target.setPosition(p[0], p[1]); }
  draw(axes) {
    axes = axes || this.#config.axes;
    this.#scene.clear();
    if (axes == "none") return
    const xGrads = this.xAxis.xAxisGrads.values;
    const ctx = this.#scene.context;
    ctx.save();
    ctx.strokeStyle = this.#core.theme.chart.GridColour || GridStyle.COLOUR_GRID;
    if (axes != "y") {
      const offset = this.xAxis.smoothScrollOffset || 0;
      for (let tick of xGrads) {
        let x = bRound(tick[1]);
        ctx.beginPath();
        ctx.moveTo(x + offset, 0);
        ctx.lineTo(x + offset, this.#scene.height);
        ctx.stroke();
      }
    }
    if (axes != "x") {
      const yGrads = this.yAxis.yAxisGrads;
      for (let tick of yGrads) {
        let y = bRound(tick[1]);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(this.#scene.width, y);
        ctx.stroke();
      }
    }
    ctx.restore();
  }
  drawX() {
    this.#scene.clear();
    const xGrads = this.xAxis.xAxisGrads.values;
    const ctx = this.#scene.context;
    ctx.save();
    ctx.strokeStyle = this.#core.theme.chart.GridColour || GridStyle.COLOUR_GRID;
    const offset = this.xAxis.smoothScrollOffset || 0;
    for (let tick of xGrads) {
      let x = bRound(tick[1]);
      ctx.beginPath();
      ctx.moveTo(x + offset, 0);
      ctx.lineTo(x + offset, this.#scene.height);
      ctx.stroke();
    }
    ctx.restore();
  }
}

class chartCursor {
  #core
  #config
  #theme
  #xAxis
  #yAxis
  #parent
  #target
  #scene
  #cursorPos = [0,0]
  constructor(target, xAxis=false, yAxis=false, theme, parent) {
    this.#target = target;
    this.#scene = target.scene;
    this.#theme = theme;
    this.#parent = parent;
    this.#xAxis = xAxis;
    this.#yAxis = yAxis;
    this.#core = parent.core;
    this.#core.on("chart_pan", (e) => { this.onMouseDragX(e); });
    this.#core.on("chart_panDone", (e) => { this.onMouseDragX(e); });
    this.#core.on("main_mousemove", (e) => { this.onMouseMoveX(e); });
    this.#core.on(`${this.chart.ID}_mousemove`, (e) => { this.onMouseMove(e); });
  }
  get chart() { return this.#parent.parent.parent }
  get xAxis() { return this.#xAxis || this.#parent.time.xAxis }
  get yAxis() { return this.#yAxis || this.#parent.scale.yAxis }
  set position(p) { return }
  onMouseDragX(e) {
    this.#cursorPos[0] = e[0];
    this.draw(true);
  }
  onMouseMoveX(e) {
    this.#cursorPos[0] = e[0];
    this.draw();
  }
  onMouseMove(e) {
    this.#cursorPos[0] = e[0];
    this.#cursorPos[1] = e[1];
    this.draw();
  }
  draw(drag = false) {
    let x = this.#cursorPos[0];
    if (!drag)
        x = this.xAxis.xPosSnap2CandlePos(x) + this.xAxis.scrollOffsetPx;
    let y = this.#cursorPos[1];
    this.#scene.clear();
    const ctx = this.#scene.context;
    ctx.save();
    ctx.setLineDash([5, 5]);
    const offset = this.xAxis.smoothScrollOffset || 0;
    ctx.strokeStyle = "#666";
    ctx.beginPath();
    ctx.moveTo(x + offset, 0);
    ctx.lineTo(x + offset, this.#scene.height);
    ctx.stroke();
    if (this.chart.cursorActive) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.#scene.width, y);
      ctx.stroke();
    }
    ctx.restore();
    this.#target.viewport.render();
  }
}

const defaultOverlays$2 = [
  ["grid", {class: chartGrid, fixed: true}],
  ["cursor", {class: chartCursor, fixed: true}]
];
class graph {
  #core
  #config
  #theme
  #xAxis
  #yAxis
  #Scale
  #Time
  #controller
  #parent
  #viewport
  #scene
  #overlays
  #streamCandle
  #elChart
  #elCanvas
  #elViewport
  #elLegends
  #layerWidth
  constructor(parent, elViewport, overlays) {
    this.#parent = parent;
    this.#core = parent.core;
    this.#config = this.core.config;
    this.#theme = this.core.theme;
    this.#elChart = this.#parent.element;
    this.#elViewport = elViewport;
    this.createViewport(overlays);
  }
  get parent() { return this.#parent }
  get core() { return this.#core }
  get config() { return this.#config }
  set width(w) { this.setWidth(w); }
  get width() { return this.#elChart.clientWidth }
  set height(h) { this.setHeight(h); }
  get height() { return this.#elChart.clientHeight }
  get dimensions() { return DOM.elementDimPos(this.#elChart) }
  set layerWidth(w) { this.#layerWidth = w; }
  get layerWidth() { return this.#layerWidth }
  get stateMachine() { return this.#parent.stateMachine }
  set state(s) { this.#core.setState(s); }
  get state() { return this.#core.getState() }
  get data() { return this.#core.chartData }
  get range() { return this.#core.range }
  get stream() { return this.#core.stream }
  get TimeLine() { return this.#core.TimeLine }
  get xAxis() { return this.#core.TimeLine.xAxis }
  get Scale() { return this.#parent.Scale }
  get yAxis() { return this.#parent.Scale.yAxis }
  get viewport() { return this.#viewport }
  get overlays() { return this.#overlays }
  destroy() {
    let oList = this.#overlays.list;
    for (let [key, overlay] of oList) {
      overlay.instance = null;
    }
    oList = null;
    this.#viewport.destroy();
  }
  setSize(w, h, lw) {
    const oList = this.#overlays.list;
    this.#viewport.setSize(w, h);
    for (let [key, overlay] of oList) {
      overlay.layer.setSize(lw, h);
    }
  }
  eventsListen() {
  }
     on(topic, handler, context) {
      this.#core.on(topic, handler, context);
    }
    off(topic, handler) {
      this.#core.off(topic, handler);
    }
    emit(topic, data) {
      this.#core.emit(topic, data);
    }
  createViewport(overlays=[]) {
    overlays = (overlays.length == 0) ? defaultOverlays$2 : overlays;
    const {width, height} = this.layerConfig();
    this.#viewport = new CEL.Viewport({
      width: width,
      height: height,
      container: this.#elViewport
    });
    this.#elCanvas = this.#viewport.scene.canvas;
    this.#overlays = new Overlays(this, overlays);
  }
  layerConfig() {
    const buffer = this.config?.buffer || BUFFERSIZE$1;
    const width = this.#elViewport.clientWidth;
    const height = this.#parent.height || this.#parent.rowsH - 1;
    this.layerWidth = Math.round(width * ((100 + buffer) * 0.01));
    const layerConfig = {
      width: this.layerWidth,
      height: height
    };
    return {width, height, layerConfig}
  }
  addOverlays(overlays) {
    this.#overlays.addOverlays(overlays);
  }
  draw(range=this.range, update=false) {
    const oList = this.#overlays.list;
    for (let [key, overlay] of oList) {
      overlay.instance.position = [this.#core.scrollPos, 0];
      if (this.#core.scrollPos == this.#core.bufferPx * -1 ||
          this.#core.scrollPos == 0 ||
          update == true)
      {
        overlay.instance.draw();
      }
      else if (this.#parent.streamCandle) {
        oList.get("stream").instance.draw();
      }
    }
    this.#viewport.render();
  }
  render() {
    this.#viewport.render();
  }
}

class Legends {
  #targetEl
  #list
  #parent
  #core
  #controls = {
    width: 20,
    height: 20,
    fill: "#aaa"
  }
  #controlsList
  constructor(target, parent) {
    this.#targetEl = target;
    this.#list = {};
    this.#parent = parent;
    this.#core = parent.core;
    this.mount(target);
  }
  get list() { return this.#list }
  onMouseClick() {
  }
  mount(el) {
  }
  defaultNode() {
  }
  buildLegend(o) {
    const theme = this.#core.theme;
    const styleLegend = `width: calc(100% - ${this.#core.scaleW}px - 1em); margin: .5em 0 1em 1em; ${theme.legend.text}; color: ${theme.legend.colour}; text-align: left;`;
      let styleLegendTitle = "margin-right: 1em; white-space: nowrap;";
    const styleInputs = "display: inline; margin-left: -1em;";
    const styleControls = "float: right; margin: 0 0.5em 0; opacity:0";
    const mouseOver = "onmouseover='this.style.opacity=1'";
    const mouseOut = "onmouseout='this.style.opacity=0'";
    styleLegendTitle += (o?.type === "chart")? "font-size: 1.5em;" : "font-size: 1.2em;";
    const node = `
      <div id="${o.id}" class="legend" style="${styleLegend}">
        <span class="title" style="${styleLegendTitle}">${o.title}</span>
        <dl style="${styleInputs}">${this.buildInputs(o)}</dl>
        <div class="controls" style="${styleControls}" ${mouseOver} ${mouseOut}>${this.buildControls(o)}</div>
      </div>
    `;
    return node
  }
  buildInputs(o) {
    let i = 0,
        inp = "",
        input,
        styleDT = "display: inline; margin-left: 1em;",
        styleDD = "display: inline; margin-left: .25em;";
    for (input in o.inputs) {
      let colour = (o.colours?.[i]) ? ` color: ${o.colours[i]};` : "";
      let inputV = (o.inputs[input] !== undefined) ? o.inputs[input] : "---";
      inp +=
      `<dt style="${styleDT}">${input}:</dt>
      <dd style="${styleDD}${colour}">${inputV}</dd>`;
      ++i;
    }
    return inp
  }
  buildControls(o) {
    let inp = "";
    let id = this.#parent.ID;
    inp += `<span id="${id}_up" class="control">${up}</span>`;
    inp += `<span id="${id}_down" class="control">${down}</span>`;
    inp += `<span id="${id}_collapse" class="control">${collapse}</span>`;
    inp += `<span id="${id}_maximize" class="control">${maximize}</span>`;
    inp += `<span id="${id}_restore" class="control">${restore}</span>`;
    inp += `<span id="${id}_remove" class="control">${close}</span>`;
    inp += `<span id="${id}_config" class="control">${config}</span>`;
    return inp
  }
  add(options) {
    if (!isObject(options) || !("title" in options)) return false
    options.id = uid(options?.id || "legend");
    options.type = options?.type || "overlay";
    const html = this.buildLegend(options);
    const elem = DOM.htmlToElement(html);
    this.#targetEl.appendChild(elem);
    const legendEl = DOM.findByID(options.id);
    this.#list[options.id] = {el: legendEl, type: options.type, source: options?.source};
    this.#controlsList = DOM.findBySelectorAll(`#${options.id} .controls .control`);
    for (let c of this.#controlsList) {
      let svg = c.querySelector('svg');
      svg.style.width = `${this.#controls.width}px`;
      svg.style.height = `${this.#controls.height}px`;
      svg.style.fill = `${this.#controls.fill}`;
      c.addEventListener('click', this.onMouseClick.bind(this));
    }
    return options.id
  }
  remove(id) {
    if (!(id in this.#list)
    || this.#list[id].type === "chart") return false
    this.#list[id].el.remove();
    delete this.#list[id];
    for (let c of this.#controlsList) {
      c.removeEventListener('click', this.onMouseClick);
    }
    return true
  }
  update(id, data) {
    if (!(isObject(data))
    || !(id in this.#list)) return false
    let source = this.#list[id].source(data.pos);
    const html = this.buildInputs(source);
    const el = DOM.findBySelector(`#${id} dl`);
    el.innerHTML = html;
  }
}

class VolumeBar {
  constructor(scene, config) {
    this.scene = scene;
    this.ctx = this.scene.context;
    this.width = this.scene.width;
    this.cfg = {...defaultTheme, ...config};
  }
  draw(data) {
    const ctx = this.ctx;
    const hilo = data.raw[4] >= data.raw[1];
    const barColour = hilo ? this.cfg.volume.UpColour: this.cfg.volume.DnColour;
    ctx.save();
    ctx.strokeStyle = barColour;
    ctx.fillStyle = barColour;
    ctx.fillRect(
      Math.floor(data.x),
      Math.floor(data.z - data.h),
      Math.floor(data.w),
      Math.floor(data.h)
    );
    ctx.restore();
  }
}

class chartVolume extends VolumeBar {
  #parent
  #core
  #config
  #theme
  #xAxis
  #yAxis
  #target
  #scene
  #volH
  constructor(target, xAxis=false, yAxis=false, theme, parent) {
    super(target.scene, theme);
    this.#parent = parent;
    this.#core = parent.core;
    this.#target = target;
    this.#scene = target.scene;
    this.#theme = theme;
    this.#xAxis = xAxis;
    this.#yAxis = yAxis;
    this.#theme.maxVolumeH = theme?.maxVolumeH || 100;
  }
  get xAxis() { return this.#xAxis || this.#parent.time.xAxis }
  get yAxis() { return this.#yAxis || this.#parent.scale.yAxis }
  set position(p) { this.#target.setPosition(p[0], p[1]); }
  draw(range=this.#core.range) {
    this.#scene.clear();
    const data = range.data;
    const zeroPos = this.scene.height;
    const offset = this.xAxis.smoothScrollOffset || 0;
    const width = this.xAxis.candleW;
    const w = (width > 5) ? Math.ceil(width * 0.8) : width;
    const volume = {
      x: 0 + offset - this.xAxis.candleW,
      w: w,
      z: zeroPos
    };
    const volH = Math.floor(zeroPos * this.#theme.maxVolumeH / 100);
    let o = this.#core.rangeScrollOffset;
    let v = range.indexStart - o;
    let i = range.Length + (o * 2);
    let j = i;
    let u = v;
    let x;
    let maxVol = 0;
    while(j--) {
      x = range.value( u );
      if (x[4] !== null) {
        maxVol = (x[5] > maxVol) ? x[5] : maxVol;
      }
      u++;
    }
    while(i--) {
      x = range.value( v );
      volume.x = bRound(this.xAxis.xPos(x[0]) - (w / 2));
      if (x[4] !== null) {
        volume.h = volH - (volH * ((maxVol - x[5]) / maxVol));
        volume.raw = data[v];
        super.draw(volume);
      }
      v++;
    }
  }
}

class Candle {
  areaCoordinates
  constructor(scene, config) {
    this.scene = scene;
    this.ctx = this.scene.context;
    this.width = this.scene.width;
    this.cfg = {...defaultTheme.candle, ...config};
  }
  draw(data) {
    const ctx = this.ctx;
    const hilo = data.raw[4] >= data.raw[1];
    const bodyColour = hilo ? this.cfg.candle.UpBodyColour : this.cfg.candle.DnBodyColour;
    const wickColour = hilo ? this.cfg.candle.UpWickColour : this.cfg.candle.DnWickColour;
    switch(this.cfg.candle.Type) {
      case CandleType.CANDLE_SOLID :
      this.fill = true;
      break;
      case CandleType.CANDLE_HOLLOW :
      case CandleType.OHLC:
        this.fill = false;
        break;
      case CandleType.CANDLE_UP_HOLLOW :
        this.fill = !hilo;
        break;
      case CandleType.CANDLE_DOWN_HOLLOW :
        this.fill = hilo;
    }
    let w = Math.max(data.w -1, 1);
        w = (w > 5) ? Math.ceil(w * 0.8) : w;
    let hw = Math.max(Math.floor(w * 0.5), 1);
    let h = Math.abs(data.o - data.c);
    let max_h = data.c === data.o ? 1 : 2;
    let x = data.x;
    let x05 = Math.floor(x) - 0.5;
    ctx.save();
    ctx.strokeStyle = wickColour;
    ctx.beginPath();
    ctx.moveTo(x05, Math.floor(data.h));
    if (this.cfg.candle.Type === CandleType.OHLC) {
      ctx.lineTo(x05, Math.floor(data.l));
    }
    else {
      if (hilo) {
        ctx.lineTo(x05, Math.floor(data.c));
        ctx.moveTo(x05, Math.floor(data.o));
      }
      else {
        ctx.lineTo(x05, Math.floor(data.o));
        ctx.moveTo(x05, Math.floor(data.c));
      }
    }
    ctx.lineTo(x05, Math.floor(data.l));
    ctx.stroke();
    if (data.w > 1.5 && this.fill) {
      ctx.fillStyle = bodyColour;
      let s = hilo ? 1 : -1;
      ctx.rect(
        Math.floor(x - hw),
        data.c,
        Math.floor(hw * 2),
        s * Math.max(h, max_h),
      );
      ctx.fill();
      ctx.stroke();
    }
    else if (data.w > 1.5 && !this.fill && this.cfg.candle.Type !== CandleType.OHLC) {
      let s = hilo ? 1 : -1;
      ctx.rect(
        Math.floor(x - hw),
        data.c,
        Math.floor(hw * 2),
        s * Math.max(h, max_h),
      );
      ctx.stroke();
    }
    else if (this.cfg.candle.Type === CandleType.OHLC) {
      ctx.beginPath();
      ctx.moveTo(x05 - hw, data.o);
      ctx.lineTo(x05, data.o);
      ctx.moveTo(x05, data.c);
      ctx.lineTo(x05 + hw, data.c);
      ctx.stroke();
    }
    else {
        ctx.strokeStyle = bodyColour;
        ctx.beginPath();
        ctx.moveTo(
            x05,
            Math.floor(Math.min(data.o, data.c)),
        );
        ctx.lineTo(
            x05,
            Math.floor(Math.max(data.o, data.c)) +
                (data.o === data.c ? 1 : 0)
        );
        ctx.stroke();
    }
    ctx.restore();
  }
  body(fill) {
  }
  area(data) {
    this.areaCoordinates.push(data);
  }
  areaRender() {
    ctx.save();
    ctx.beginPath();
    let coords = this.areaCoordinates;
    for (let i = 0; i < coords.length; i++) {
      this.ctx;
      coords[i].raw[4] >= data[i+1].raw[4];
    }
    ctx.restore();
  }
}

class chartCandles extends Candle {
  #parent
  #core
  #config
  #theme
  #xAxis
  #yAxis
  #target
  #scene
  constructor(target, xAxis=false, yAxis=false, theme, parent) {
    super(target.scene, theme);
    this.#parent = parent;
    this.#core = parent.core;
    this.#target = target;
    this.#scene = target.scene;
    this.#theme = theme;
    this.#xAxis = xAxis;
    this.#yAxis = yAxis;
  }
  get target() { return this.#target }
  get xAxis() { return this.#xAxis || this.#parent.time.xAxis }
  get yAxis() { return this.#yAxis || this.#parent.scale.yAxis }
  set position(p) { this.#target.setPosition(p[0], p[1]); }
  draw(range=this.#core.range) {
    this.#scene.clear();
    const render = (this.#core.theme.candle.Type === CandleType.AREA) ?
        (candle) => {} :
        (candle) => {super.draw(candle);};
    const offset = this.xAxis.smoothScrollOffset || 0;
    const candle = {
      x: offset - this.xAxis.candleW,
      w: this.xAxis.candleW
    };
    let o = this.#core.rangeScrollOffset;
    let c = range.indexStart - o;
    let i = range.Length + (o * 2);
    let x;
    if (this.#core.stream) {
      this.#core.stream.lastPriceMax = range.valueMax;
      this.#core.stream.lastPriceMin = range.valueMin;
    }
    while(i) {
      x = range.value( c );
      candle.x = this.xAxis.xPos(x[0]);
      if (x?.[7]) {
        this.#core.stream.lastXPos = candle.x;
        this.#core.stream.lastYPos = {
          o: candle.o,
          h: candle.h,
          l: candle.l,
          c: candle.c,
        };
        break
      }
      if (x[4] !== null) {
        candle.o = this.yAxis.yPos(x[1]);
        candle.h = this.yAxis.yPos(x[2]);
        candle.l = this.yAxis.yPos(x[3]);
        candle.c = this.yAxis.yPos(x[4]);
        candle.raw = x;
        render(candle);
      }
      c++;
      i--;
    }
    if (this.#core.theme.candle.Type === CandleType.AREA) super.areaRender();
  }
}

class chartStreamCandle extends Candle {
  #parent
  #core
  #config
  #theme
  #xAxis
  #yAxis
  #target
  #scene
  #params
  #chart
  constructor(target, xAxis=false, yAxis=false, theme, parent, params) {
    super(target.scene, theme);
    this.#parent = parent;
    this.#core = parent.core;
    this.#target = target;
    this.#scene = target.scene;
    this.#theme = theme;
    this.#xAxis = xAxis;
    this.#yAxis = yAxis;
    this.#params = params;
    this.#chart = parent.parent.parent;
    this.#theme.priceLineStyle = this.#theme?.priceLineStyle || PriceLineStyle;
  }
  get target() { return this.#target }
  get xAxis() { return this.#xAxis || this.#parent.time.xAxis }
  get yAxis() { return this.#yAxis || this.#parent.scale.yAxis }
  set position(p) { this.setPosition(p[0], p[1]); }
  setPosition(x, y) {
    if (this.#core.stream === undefined) return
    this.#target.setPosition(x, y);
    this.#core.stream.lastScrollPos = this.#core.scrollPos;
  }
  yPos(p) {
    const rangeH = this.#core.stream.lastPriceMax - this.#core.stream.lastPriceMin;
    const height = p - this.#core.stream.lastPriceMin;
    const ratio = this.yAxis.height / rangeH;
    const yPos = this.yAxis.height - (height * ratio);
    return yPos
  }
  draw() {
    if (this.#core.stream === undefined ||
        !isArray(this.#chart.streamCandle)) return
    this.#scene.clear();
    const r = this.#core.range;
    const stream = this.#chart.streamCandle;
    const render = (this.#core.theme.candle.Type === CandleType.AREA) ?
      (candle) => {} :
      (candle) => {super.draw(candle);};
    this.xAxis.smoothScrollOffset || 0;
    const pos = this.#core.stream.lastXPos;
    const candle = {
      x: pos,
      w: this.xAxis.candleW
    };
    candle.o = this.yPos(stream[1]);
    candle.h = this.yPos(stream[2]);
    candle.l = this.yPos(stream[3]);
    candle.c = this.yPos(stream[4]);
    candle.raw = stream;
    if (r.inRenderRange(stream[0])) {
      render(candle);
      if (this.#core.theme.candle.Type === CandleType.AREA) super.areaRender();
    }
    if (stream[4] >= stream[1]) this.#theme.priceLineStyle.strokeStyle = this.#core.theme.candle.UpBodyColour;
    else this.#theme.priceLineStyle.strokeStyle = this.#core.theme.candle.DnBodyColour;
    renderHorizontalLine (
      this.#scene.context,
      candle.c,
      0,
      this.#target.width,
      this.#theme.priceLineStyle
    );
  }
}

const STYLE_CHART = "";
const STYLE_SCALE$2 = "position: absolute; top: 0; right: 0; border-left: 1px solid;";
const STYLE_SCALE2$1 = "top: 0; right: 0; border-left: 1px solid;";
const defaultOverlays$1 = [
  ["grid", {class: chartGrid, fixed: true, required: true, params: {axes: "y"}}],
  ["volume", {class: chartVolume, fixed: false, required: true, params: {maxVolumeH: VolumeStyle.ONCHART_VOLUME_HEIGHT}}],
  ["candles", {class: chartCandles, fixed: false, required: true}],
  ["stream", {class: chartStreamCandle, fixed: false, required: true}],
  ["cursor", {class: chartCursor, fixed: true, required: true}]
];
class Chart {
  #name = "Chart"
  #shortName = "chart"
  #mediator
  #options
  #core
  #parent
  #elChart
  #elCanvas
  #elViewport
  #elLegends
  #elScale
  #Scale
  #Time
  #Graph
  #Legends
  #onChart
  #Stream
  #chartXPadding = 5
  #chartYPadding = 2.5
  #yAxisDigits
  #pricePrecision
  #volumePrecision
  #viewport
  #layerGrid
  #layerVolume
  #layerCandles
  #layerStream
  #layerCursor
  #layersOnChart
  #layersTools = new Map()
  #chartGrid
  #chartOverlays = new Map()
  #chartStreamCandle
  #chartTools = new Map()
  #cursorPos = [0, 0]
  #cursorActive = false
  #cursorClick
  #settings
  #streamCandle
  #title
  #theme
  #controller
  constructor (mediator, options) {
    this.#mediator = mediator;
    this.#elChart = mediator.api.elements.elChart;
    this.#elScale = mediator.api.elements.elChartScale;
    this.#parent = {...this.#mediator.api.parent};
    this.#core = this.#mediator.api.core;
    this.#theme = this.#core.theme;
    this.#onChart = this.#mediator.api.onChart;
    this.#settings = this.#mediator.api.settings;
    this.#options = options;
    this.init(options);
  }
  log(l) { this.#mediator.log(l); }
  info(i) { this.#mediator.info(i); }
  warning(w) { this.#mediator.warn(w); }
  error(e) { this.#mediator.error(e); }
  get ID() { return "chart" }
  get name() {return this.#name}
  get shortName() { return this.#shortName }
  get mediator() { return this.#mediator }
  get options() { return this.#options }
  get element() { return this.#elChart }
  get core() { return this.#core }
  get time() { return this.#Time }
  get scale() { return this.#Scale }
  get elScale() { return this.#elScale }
  set width(w) { this.setWidth(w); }
  get width() { return this.#elChart.clientWidth }
  set height(h) { this.setHeight(h); }
  get height() { return this.#elChart.clientHeight }
  get pos() { return this.dimensions }
  get dimensions() { return DOM.elementDimPos(this.#elChart) }
  get stateMachine() { return this.#mediator.stateMachine }
  set state(s) { this.#core.setState(s); }
  get state() { return this.#core.getState() }
  get data() { return this.#core.chartData }
  get range() { return this.#core.range }
  get stream() { return this.#Stream }
  get streamCandle() { return this.#streamCandle }
  get onChart() { return this.#onChart }
  set priceDigits(digits) { this.setYAxisDigits(digits); }
  get priceDigits() { return this.#yAxisDigits || PRICEDIGITS }
  get cursorPos() { return this.#cursorPos }
  get cursorActive() { return this.#cursorActive }
  get cursorClick() { return this.#cursorClick }
  get candleW() { return this.#core.Timeline.candleW }
  get theme() { return this.#core.theme }
  get config() { return this.#core.config }
  get scrollPos() { return this.#core.scrollPos }
  get bufferPx() { return this.#core.bufferPx }
  set layerWidth(w) { this.#Graph.layerWidth = w; }
  get layerWidth() { return this.#Graph.layerWidth }
  get axes() { return "x" }
  get Legends() { return this.#Legends }
  get Graph() { return this.#Graph }
  init(options) {
    if (isObject(options)) {
      for (const option in options) {
        if (option in this.props()) {
          this.props()[option](options[option]);
        }
      }
    }
    this.mount(this.#elChart);
    let chartLegend = {
      id: "chart",
      title: this.#title,
      type: "chart",
      source: this.legendInputs.bind(this)
    };
    this.#Legends = new Legends(this.#elLegends, this);
    this.#Legends.add(chartLegend);
    const api = {...this.#mediator.api};
    api.parent = this;
    api.chart = this;
    api.elements =
    {...api.elements,
      ...{
        elScale: this.#elScale
      }
    };
    api.onChart = this.#mediator.api.onChart;
    api.legends = this.#Legends;
    options.yAxisType = "default";
    this.#Scale = this.#mediator.register("Chart_ScaleBar", ScaleBar, options, api);
    this.log(`${this.#name} instantiated`);
  }
  start() {
    this.#Time = this.mediator.api.Timeline;
    this.createGraph();
    this.addOverlays(this.mediator.api.onChart);
    if (isObject(this.Stream)) {
      ({stream: this.Stream});
    }
    this.#Scale.start(`Chart says to Scale, "Thanks for the update!"`);
    this.draw(this.range);
    this.setCursor("crosshair");
    this.eventsListen();
    stateMachineConfig$3.context.origin = this;
    this.#mediator.stateMachine = stateMachineConfig$3;
    this.#mediator.stateMachine.start();
  }
  end() {
    this.#mediator.stateMachine.destroy();
    this.#Scale.end();
    this.#Graph.destroy();
    this.#controller.removeEventListener("mousemove", this.onMouseMove);
    this.#controller.removeEventListener("mouseenter", this.onMouseEnter);
    this.#controller.removeEventListener("mouseout", this.onMouseOut);
    this.#controller.removeEventListener("mousedown", this.onMouseDown);
    this.#controller = null;
    this.off("main_mousemove", this.onMouseMove);
    this.off(STREAM_LISTENING, this.onStreamListening);
    this.off(STREAM_NEWVALUE, this.onStreamNewValue);
    this.off(STREAM_UPDATE, this.onStreamUpdate);
    this.off("chart_yAxisRedraw", this.onYAxisRedraw);
  }
  eventsListen() {
    this.#controller = new InputController(this.#elCanvas, {disableContextMenu: false});
    this.#controller.on("mousemove", this.onMouseMove.bind(this));
    this.#controller.on("mouseenter", this.onMouseEnter.bind(this));
    this.#controller.on("mouseout", this.onMouseOut.bind(this));
    this.#controller.on("mousedown", this.onMouseDown.bind(this));
    this.on("main_mousemove", this.updateLegends.bind(this));
    this.on(STREAM_LISTENING, this.onStreamListening.bind(this));
    this.on(STREAM_NEWVALUE, this.onStreamNewValue.bind(this));
    this.on(STREAM_UPDATE, this.onStreamUpdate.bind(this));
    this.on("chart_yAxisRedraw", this.onYAxisRedraw.bind(this));
  }
  on(topic, handler, context) {
    this.#mediator.on(topic, handler, context);
  }
  off(topic, handler) {
    this.#mediator.off(topic, handler);
  }
  emit(topic, data) {
    this.#mediator.emit(topic, data);
  }
  onMouseMove(e) {
    this.#cursorPos = [Math.round(e.position.x), Math.round(e.position.y)];
    this.emit("chart_mousemove", this.#cursorPos);
  }
  onMouseEnter(e) {
    this.#cursorActive = true;
    this.#cursorPos = [Math.round(e.position.x), Math.round(e.position.y)];
    this.emit(`${this.ID}_mouseenter`, this.#cursorPos);
  }
  onMouseOut(e) {
    this.#cursorActive = false;
    this.#cursorPos = [Math.round(e.position.x), Math.round(e.position.y)];
    this.emit(`${this.ID}_mouseout`, this.#cursorPos);
  }
  onMouseDown(e) {
    this.#cursorClick = [Math.floor(e.position.x), Math.floor(e.position.y)];
    if (this.stateMachine.state === "tool_activated") this.emit("tool_targetSelected", {target: this, position: e});
  }
  onStreamListening(stream) {
    if (this.#Stream !== stream) this.#Stream = stream;
  }
  onStreamNewValue(candle) {
    this.draw(this.range, true);
  }
  onStreamUpdate(candle) {
    this.#streamCandle = candle;
    this.#chartStreamCandle.draw();
    this.#layerStream.setPosition(this.#core.stream.lastScrollPos, 0);
    this.#Graph.render();
    this.updateLegends(this.#cursorPos, candle);
  }
  onYAxisRedraw() {
    this.#Scale.draw();
    this.draw(this.range, true);
  }
  mount(el) {
    el.innerHTML = this.defaultNode();
    const api = this.#mediator.api;
    this.#elViewport = DOM.findBySelector(`#${api.id} .${CLASS_CHART} .viewport`);
    this.#elLegends = DOM.findBySelector(`#${api.id} .${CLASS_CHART} .legends`);
  }
  props() {
    return {
      title: (title) => this.#title = title,
      yAxisDigits: (digits) => this.setYAxisDigits(digits),
    }
  }
  setWidth(w) {
    if (!isNumber(w)) w = this.width || this.#parent.width;
    this.#elChart.style.width = `${w}px`;
    this.#elViewport.style.width = `${w - this.#elScale.clientWidth}px`;
  }
  setHeight(h) {
    if (!isNumber(h)) h = this.height || this.#parent.height;
    this.#elChart.style.height = `${h}px`;
    this.#elScale.style.height = `${h}px`;
    this.#elViewport.style.height = `${h}px`;
    this.#Scale.setDimensions({w: null, h: h});
  }
  setDimensions(dim) {
    const buffer = this.config.buffer || BUFFERSIZE$1;
    const {w, h} = dim;
    const width = w - this.#elScale.clientWidth;
    this.layerWidth = Math.round(width * ((100 + buffer) * 0.01));
    this.#Graph.setSize(width, h, this.layerWidth);
    this.setWidth(w);
    this.setHeight(h);
    this.#Scale.resize(w, h);
    this.draw(this.range, true);
  }
  setYAxisDigits(digits) {
    this.#yAxisDigits = (isNumber(digits) && digits >= 3) ? parseInt(digits) : PRICEDIGITS;
  }
  getPriceDigits() {
    return this.#yAxisDigits
  }
  setCursor(cursor) {
    this.#elChart.style.cursor = cursor;
  }
  defaultNode() {
    const api = this.#mediator.api;
    const rowsH = api.height - api.utilsW - api.timeH;
    const width = api.width - api.toolsW - api.scaleW;
    const height = this.#options.chartH || rowsH - 1;
    const styleChart = STYLE_CHART + ` width: ${width}px; height: ${height}px`;
    const styleScale = STYLE_SCALE$2 + ` width: ${api.scaleW - 1}px; height: ${height}px; border-color: ${api.chartBorderColour};`;
    const styleLegend = `width: 100%; position: absolute; top: 0; left: 0; z-index:100;`;
    const node = `
      <div class="viewport" style="${styleChart}"></div>
      <div class="legends" style="${styleLegend}"></div>
      <div class="${CLASS_SCALE}" style="${styleScale}"></div>
    `;
    this.#elScale.style.cssText = STYLE_SCALE2$1 + ` width: ${api.scaleW - 1}px; height: ${height}px; border-color: ${api.chartBorderColour};`;
    return node
  }
  setTimezone(timezone) {}
  getTimezone(timezone) {}
  loadData(data) {}
  updateData(data) {}
  createGraph() {
    let overlays = new Map(defaultOverlays$1);
    if (overlays.has("volume")) {
      const volume = overlays.get("volume");
      volume.params.maxVolumeH = this.#theme?.volume?.Height || VolumeStyle.ONCHART_VOLUME_HEIGHT;
      overlays.set("volume", volume);
    }
    overlays = Array.from(overlays);
    this.#Graph = new graph(this, this.#elViewport, overlays);
    this.#layerStream = this.#Graph.overlays.get("stream").layer;
    this.#chartStreamCandle = this.#Graph.overlays.get("stream").instance;
    this.#layerGrid = this.#Graph.overlays.get("grid").layer;
    this.#chartGrid = this.#Graph.overlays.get("grid").instance;
    this.#viewport = this.#Graph.viewport;
    this.#elCanvas = this.#Graph.viewport.scene.canvas;
  }
  addOverlays(overlays) {
    for (let o of overlays) {
      const config = {fixed: false, required: false};
      if (o.type in this.core.TALib) {
        config.class = this.core.indicators[o.type].ind;
        config.params = {overlay: o};
        this.#chartOverlays.set(o.name, config);
      }
    }
    this.#Graph.addOverlays(Array.from(this.#chartOverlays));
  }
  addTool(tool) {
    let { layerConfig } = this.layerConfig();
    let layer = new CEL.Layer(layerConfig);
    this.#layersTools.set(tool.id, layer);
    this.#viewport.addLayer(layer);
    tool.layerTool = layer;
    this.#chartTools.set(tool.id, tool);
  }
  addTools(tools) {
  }
  chartTools() {
  }
  chartToolAdd(tool) {
    this.#chartTools.set(tool.id, tool);
  }
  chartToolDelete(tool) {
    this.#chartTools.delete(tool);
  }
  draw(range=this.range, update=false) {
    window.requestAnimationFrame(()=>this.#Graph.draw(range, update));
  }
  drawGrid() {
    this.#layerGrid.setPosition(this.#core.scrollPos, 0);
    this.#chartGrid.draw("y");
    this.#Graph.render();
  }
  drawStream(candle) {
  }
  refresh() {
    this.#Scale.draw();
    this.draw(this.range, true);
  }
  time2XPos(time) {
    return this.#Time.xPos(time)
  }
  price2YPos(price) {
    return this.#Scale.yPos(price)
  }
  setPriceVolumePrecision (pricePrecision) {
    if (!isNumber(pricePrecision) || pricePrecision < 0) {
      this.warning('setPriceVolumePrecision', 'pricePrecision', 'pricePrecision must be a number and greater than zero!!!');
      return
    }
    this.#pricePrecision = pricePrecision;
  }
  setPriceVolumePrecision (volumePrecision) {
    if (!isNumber(volumePrecision) || volumePrecision < 0) {
      logWarn('setPriceVolumePrecision', 'volumePrecision', 'volumePrecision must be a number and greater than zero!!!');
      return
    }
    this.#volumePrecision = volumePrecision;
  }
  legendInputs(pos=this.cursorPos, candle) {
        pos = this.cursorPos;
    let inputs = {};
    let colours = [];
    let index = this.#Time.xPos2Index(pos[0] - this.core.scrollPos);
        index = limit(index, 0, this.range.data.length - 1);
    let ohlcv = this.range.data[index];
    if (ohlcv[4] >= ohlcv[1]) colours = new Array(5).fill(this.theme.candle.UpWickColour);
    else colours = new Array(5).fill(this.theme.candle.DnWickColour);
    inputs.O = this.#Scale.nicePrice(ohlcv[1]);
    inputs.H = this.#Scale.nicePrice(ohlcv[2]);
    inputs.L = this.#Scale.nicePrice(ohlcv[3]);
    inputs.C = this.#Scale.nicePrice(ohlcv[4]);
    inputs.V = this.#Scale.nicePrice(ohlcv[5]);
    return {inputs, colours}
  }
  updateLegends(pos=this.#cursorPos, candle=false) {
    const legends = this.#Legends.list;
    for (const legend in legends) {
      this.#Legends.update(legend, {pos, candle});
    }
  }
  updateRange(pos) {
    let update = false;
    if (this.#Scale.rangeMode == "manual") {
      this.#Scale.yOffset = pos[5];
      update = true;
    }
    this.draw(this.range, update);
  }
  zoomRange(data) {
    this.draw(this.range, true);
    this.emit("chart_zoomDone");
  }
  resize(width=this.width, height=this.height) {
    this.setDimensions({w: width, h: height});
  }
}

var stateMachineConfig$2 = {
  id: "offChart",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(data) {
        this.context.origin.setCursor("crosshair");
      },
      onExit(data) {
      },
      on: {
        chart_pan: {
          target: 'chart_pan',
          action (data) {
            this.context.origin.setCursor("grab");
          },
        },
        chart_zoom: {
          target: 'chart_zoom',
          action (data) {
          },
        },
        chart_tool: {
          target: 'chart_tool',
          action (data) {
          },
        },
        xAxis_scale: {
          target: 'xAxis_scale',
          action (data) {
          },
        },
        offChart_mouseDown: {
          target: 'offChart_mouseDown',
          action (data) {
          },
        },
        offChart_mouseUp: {
          target: 'offChart_mouseUp',
          action (data) {
          },
        },
        tool_activated: {
          target: 'tool_activated',
          action (data) {
            this.context.origin.setCursor("default");
          },
        },
      }
    },
    chart_pan: {
      onEnter(data) {
      },
      onExit(data) {
      },
      on: {
        chart_pan: {
          target: 'chart_pan',
          action (data) {
            this.context.origin.updateRange(data);
          },
        },
        chart_panDone: {
          target: 'idle',
          action (data) {
            this.context.origin.updateRange(data);
          },
        },
      }
    },
    chart_zoom: {
      onEnter(data) {
      },
      onExit(data) {
      },
      on: {
        always: {
          target: 'idle',
          condition: 'zoomDone',
          action (data) {
            this.context.origin.range;
            this.context.origin.zoomRange();
          },
        },
      }
    },
    xAxis_scale: {
      onEnter(data) {
      },
      onExit(data) {
      },
      on: {
        Idle: {
          target: 'idle',
          action (data) {
          },
        },
      }
    },
    offChart_mouseDown: {
      onEnter(data) {
      },
      onExit(data) {
      },
      on: {
        Idle: {
          target: 'idle',
          action (data) {
          },
        },
      }
    },
    offChart_mouseUp: {
      onEnter(data) {
      },
      onExit(data) {
      },
      on: {
        Idle: {
          target: 'idle',
          action (data) {
          },
        },
      }
    },
    tool_activated: {
      onEnter(data) {
      },
      onExit(data) {
      },
      on: {
        tool_targetSelected: {
          target: 'idle',
          condition: 'toolSelectedThis',
          action (data) {
            console.log("tool_targetSelected:", data);
          },
        },
      }
    },
  },
  guards: {
    zoomDone () { return true },
    toolSelectedThis (conditionType, condition) {
      if (this.eventData === this.context.origin)
        return true
      else
        return false
     },
  }
};

const STYLE_OFFCHART = "";
const STYLE_SCALE$1 = "position: absolute; top: 0; right: 0; border-left: 1px solid;";
const STYLE_SCALE2 = "top: 0; right: 0; border-left: 1px solid;";
const defaultOverlays = [
  ["grid", {class: chartGrid, fixed: true, required: true, params: {axes: "y"}}],
  ["cursor", {class: chartCursor, fixed: true, required: true}]
];
class OffChart {
  #ID
  #name = "OffChart"
  #shortName = "offChart"
  #mediator
  #options
  #core
  #parent
  #elOffChart
  #elCanvas
  #elViewport
  #elLegends
  #elScale
  #offChartID
  #Scale
  #Time
  #Graph
  #Legends
  #Indicator
  #overlay
  #Divider
  #Stream
  #viewport
  #layerGrid
  #layerStream
  #layerCursor
  #layersIndicator
  #layersTools = new Map()
  #overlayGrid
  #overlayIndicators = new Map()
  #overlayIndicator
  #overlayTools = new Map()
  #cursorPos = [0, 0]
  #cursorActive = false
  #settings
  #streamCandle
  #title
  #theme
  #controller
  #localRange = {
    valueMax: 100,
    valueMin: 0,
    valueDiff: 100
  }
  constructor (mediator, options) {
    this.#mediator = mediator;
    this.#elOffChart = mediator.api.elements.elOffChart;
    this.#elScale = mediator.api.elements.elScale;
    this.#parent = {...this.mediator.api.parent};
    this.#overlay = {...options.offChart};
    this.#core = this.mediator.api.core;
    this.#theme = this.#core.theme;
    this.#options = {...options};
    this.#ID = this.#options.offChartID || uid("TX_OC_");
    this.init(this.#options);
  }
  log(l) { this.mediator.log(l); }
  info(i) { this.mediator.info(i); }
  warning(w) { this.mediator.warn(w); }
  error(e) { this.mediator.error(e); }
  get ID() { return this.#ID }
  get name() { return this.#name }
  get shortName() { return this.#shortName }
  get mediator() { return this.#mediator }
  get options() { return this.#options }
  get core() { return this.#core }
  get time() { return this.#Time }
  get scale() { return this.#Scale }
  get pos() { return this.dimensions }
  get dimensions() { return DOM.elementDimPos(this.#elOffChart) }
  get stateMachine() { return this.#mediator.stateMachine }
  get elOffChart() { return this.#elOffChart }
  get element() { return this.#elOffChart }
  get widgets() { return this.#core.WidgetsG }
  get offChartID() { return this.#offChartID }
  get localRange() { return this.#localRange }
  get data() {}
  get range() { return this.#core.range }
  get stream() { return this.#Stream }
  get cursorPos() { return this.#cursorPos }
  get cursorActive() { return this.#cursorActive }
  get candleW() { return this.#core.Timeline.candleW }
  get theme() { return this.#core.theme }
  get config() { return this.#core.config }
  get scrollPos() { return this.#core.scrollPos }
  get bufferPx() { return this.#core.bufferPx }
  get Divider() { return this.#Divider }
  get width() { return this.#elOffChart.clientWidth }
  set width(w) { this.setWidth(w); }
  get height() { return this.#elOffChart.clientHeight }
  set height(h) { this.setHeight(h); }
  get axes() { return "x" }
  init(options) {
    if (isObject(options)) {
      for (const option in options) {
        if (option in this.props()) {
          this.props()[option](options[option]);
        }
      }
    }
    this.mount(this.#elOffChart);
    const api = {...this.mediator.api};
    api.parent = this;
    api.elements.elScale = this.#elScale;
    this.#Indicator = api.indicators[this.#overlay.type].ind;
    options.yAxisType = this.#Indicator.scale;
    const id = options.offChart.type + "_ScaleBar";
    this.#Scale = this.mediator.register(id, ScaleBar, options, api);
    this.#Time = this.core.Timeline;
  }
  start(index) {
    this.#offChartID = index;
    this.#Time = this.mediator.api.Timeline;
    const config = { offChart: this };
    this.#Divider = this.widgets.insert("Divider", config);
    this.#Divider.start();
    this.createGraph();
    let instance = this.#overlayIndicator;
    let offChartLegend = {
      id: this.options.offChart.type,
      title: this.options.offChart.name,
      type: this.options.offChart.type,
      source: instance.legendInputs.bind(instance)
    };
    this.#Legends = new Legends(this.#elLegends, this);
    this.#Legends.add(offChartLegend);
    this.#Scale.on("started",(data)=>{this.log(`OffChart scale started: ${data}`);});
    this.#Scale.start("OffChart",this.name,"yAxis Scale started");
    this.draw(this.range);
    this.setCursor("crosshair");
    this.eventsListen();
    stateMachineConfig$2.context.origin = this;
    this.mediator.stateMachine = stateMachineConfig$2;
    this.mediator.stateMachine.start();
  }
  end() {
    this.#mediator.stateMachine.destroy();
    this.#Graph.destroy();
    this.#Scale.end();
    this.#Divider.end();
    this.#controller.removeEventListener("mousemove", this.onMouseMove);
    this.#controller.removeEventListener("mouseenter", this.onMouseEnter);
    this.#controller.removeEventListener("mouseout", this.onMouseOut);
    this.#controller.removeEventListener("mousedown", this.onMouseDown);
    this.#controller = null;
    this.off("main_mousemove", this.updateLegends);
    this.off(STREAM_LISTENING, this.onStreamListening);
    this.off(STREAM_NEWVALUE, this.onStreamNewValue);
    this.off(STREAM_UPDATE, this.onStreamUpdate);
  }
  eventsListen() {
    this.#controller = new InputController(this.#elOffChart, {disableContextMenu: false});
    this.#controller.on("mousemove", this.onMouseMove.bind(this));
    this.#controller.on("mouseenter", this.onMouseEnter.bind(this));
    this.#controller.on("mouseout", this.onMouseOut.bind(this));
    this.#controller.on("mousedown", this.onMouseDown.bind(this));
    this.on("main_mousemove", this.updateLegends.bind(this));
    this.on(STREAM_LISTENING, this.onStreamListening.bind(this));
    this.on(STREAM_NEWVALUE, this.onStreamNewValue.bind(this));
    this.on(STREAM_UPDATE, this.onStreamUpdate.bind(this));
  }
  on(topic, handler, context) {
    this.mediator.on(topic, handler, context);
  }
  off(topic, handler) {
    this.mediator.off(topic, handler);
  }
  emit(topic, data) {
    this.mediator.emit(topic, data);
  }
  onMouseMove(e) {
    this.#cursorPos = [Math.round(e.position.x), Math.round(e.position.y)];
    this.emit(`${this.ID}_mousemove`, this.#cursorPos);
  }
  onMouseEnter(e) {
    this.#cursorActive = true;
    this.#cursorPos = [Math.round(e.position.x), Math.round(e.position.y)];
    this.emit(`${this.ID}_mouseenter`, this.#cursorPos);
  }
  onMouseOut(e) {
    this.#cursorActive = false;
    this.#cursorPos = [Math.round(e.position.x), Math.round(e.position.y)];
    this.emit(`${this.ID}_mouseout`, this.#cursorPos);
  }
  onMouseDown(e) {
    if (this.stateMachine.state === "tool_activated") this.emit("tool_targetSelected", {target: this, position: e});
  }
  onStreamListening(stream) {
    if (this.#Stream !== stream) this.#Stream = stream;
  }
  onStreamNewValue(value) {
    this.draw(this.range, true);
  }
  onStreamUpdate(candle) {
    this.#streamCandle = candle;
    this.#layerStream.setPosition(this.#core.stream.lastScrollPos, 0);
    this.#viewport.render();
    this.updateLegends();
  }
  onStreamUpdate(candle) {
    this.#streamCandle = candle;
    this.#Graph.render();
    this.updateLegends();
  }
  mount(el) {
    el.id = this.#ID;
    el.innerHTML = this.defaultNode();
    this.mediator.api;
    this.#elViewport = DOM.findBySelector(`#${this.#ID} .viewport`);
    this.#elLegends = DOM.findBySelector(`#${this.#ID} .legends`);
  }
  props() {
    return {
      title: (title) => this.#title = title,
      yAxisDigits: (digits) => this.setYAxisDigits(digits),
    }
  }
  setWidth(w) {
    if (!isNumber(w)) w = this.width || this.#parent.width;
    this.#elOffChart.style.width = `${w}px`;
    this.#elViewport.style.width = `${w - this.#elScale.clientWidth}px`;
  }
  setHeight(h) {
    if (!isNumber(h)) h = this.height || this.#parent.height;
    this.#elOffChart.style.height = `${h}px`;
    this.#elScale.style.height = `${h}px`;
    this.#elViewport.style.height = `${h}px`;
    this.#Scale.setDimensions({w: null, h: h});
  }
  setDimensions(dim) {
    const buffer = this.config.buffer || BUFFERSIZE$1;
    const {w, h} = dim;
    const width = w - this.#elScale.clientWidth;
    const layerWidth = Math.round(width * ((100 + buffer) * 0.01));
    this.#Graph.setSize(width, h, layerWidth);
    this.setWidth(w);
    this.setHeight(h);
    this.#Scale.resize(w, h);
    this.draw(undefined, true);
  }
  setCursor(cursor) {
    this.#elOffChart.style.cursor = cursor;
  }
  defaultNode() {
    const api = this.mediator.api;
    const width = api.width - api.toolsW - api.scaleW;
    const height = this.#options.rowH;
    const styleOffChart = STYLE_OFFCHART + ` width: ${width}px; height: ${height}px`;
    const styleScale = STYLE_SCALE$1 + ` width: ${api.scaleW - 1}px; height: ${height}px; border-color: ${api.chartBorderColour};`;
    const styleLegend = `width: 100%; position: absolute; top: 0; left: 0; z-index:100;`;
    const node = `
      <div class="viewport" style="${styleOffChart}"></div>
      <div class="legends" style="${styleLegend}"></div>
      <div class="${CLASS_SCALE}" style="${styleScale}"></div>
    `;
    this.#elScale.style.cssText = STYLE_SCALE2 + ` width: ${api.scaleW - 1}px; height: ${height}px; border-color: ${api.chartBorderColour};`;
    return node
  }
  createGraph() {
    const indicator = [this.#overlay.name, {class: this.#Indicator, fixed: false, required: false, params: {overlay: this.#overlay}}];
    defaultOverlays.splice(1, 0, indicator);
    const overlays = defaultOverlays;
    this.#Graph = new graph(this, this.#elViewport, overlays);
    this.#overlayIndicator = this.#Graph.overlays.get(this.#overlay.name).instance;
    this.#layerGrid = this.#Graph.overlays.get("grid").layer;
    this.#overlayGrid = this.#Graph.overlays.get("grid").instance;
    this.#viewport = this.#Graph.viewport;
    this.#elCanvas = this.#Graph.viewport.scene.canvas;
  }
  layerConfig() {
    const buffer = this.config.buffer || BUFFERSIZE$1;
    const width = this.#elViewport.clientWidth;
    const height = this.#options.rowH || this.#parent.rowsH - 1;
    const layerConfig = {
      width: Math.round(width * ((100 + buffer) * 0.01)),
      height: height
    };
    return {width, height, layerConfig}
  }
  draw(range=this.range, update=false) {
    window.requestAnimationFrame(()=>this.#Graph.draw(range, update));
  }
  drawGrid() {
    this.#layerGrid.setPosition(this.#core.scrollPos, 0);
    this.#overlayGrid.draw("y");
    this.#Graph.render();
  }
  refresh() {
    this.draw();
    this.#Scale.draw();
  }
   updateLegends(pos=this.#cursorPos, candle=false) {
    const legends = this.#Legends.list;
    for (const legend in legends) {
      this.#Legends.update(legend, {pos, candle});
    }
  }
  updateRange(pos) {
    this.draw(this.range);
  }
  zoomRange(pos) {
    this.draw(this.range, true);
  }
  resize(width=this.width, height=this.height) {
    this.setDimensions({w: width, h: height});
  }
}

var stateMachineConfig$1 = {
  id: "main",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(data) {
      },
      onExit(data) {
      },
      on: {
        chart_pan: {
          target: 'chart_pan',
          action (data) {
          },
        },
        chart_zoom: {
          target: 'chart_zoom',
          action (data) {
          },
        },
        chart_scrollTo: {
          target: 'chart_scrollTo',
          action (data) {
          },
        },
        addIndicator: {
          target: 'addIndicator',
          action (data) {
          },
        },
        divider_mousedown: {
          target: 'divider_mousedown',
          action (data) {
          },
        },
        resize: {
          target: 'resize',
          action (data) {
          },
        },
      }
    },
    chart_pan: {
      onEnter (data) {
      },
      onExit (data) {
      },
      on: {
        chart_pan: {
          target: 'chart_pan',
          action (data) {
            this.context.origin.updateRange(data);
          },
        },
        chart_panDone: {
          target: 'idle',
          action (data) {
            this.context.origin.updateRange(data);
          },
        },
      }
    },
    chart_zoom: {
      onEnter (data) {
      },
      onExit (data) {
      },
      on: {
        always: {
          target: 'idle',
          condition: 'zoomDone',
          action (data) {
            this.context.origin.zoomRange(data);
          },
        },
      }
    },
    chart_scrollTo: {
      onEnter (data) {
      },
      onExit (data) {
      },
      on: {
        always: {
          target: 'idle',
          action (data) {
            console.log(`${this.id}: transition from "${this.state}" to "idle"`);
            this.context.origin.updateRange(data);
          },
        },
      }
    },
    addIndicator: {
      onEnter(data) {
        this.context.origin.addIndicator(data);
      },
      onExit(data) {
      },
      on: {
        addIndicatorDone: {
          target: "idle",
          action (data) {
          },
        }
      }
    },
    divider_mousedown: {
      onEnter(data) {
        this.context.divider = data;
      },
      onExit(data) {
      },
      on: {
        main_mousemove: {
          target: "divider_mousemove",
          action (data) {
          },
        },
        main_mouseup: {
          target: "idle",
          action (data) {
          },
        }
      }
    },
    divider_mousemove: {
      onEnter(data) {
        let divider = this.context.divider;
        this.context.pair = this.context.origin.resizeRowPair(divider, data);
      },
      onExit(data) {
      },
      on: {
        main_mousemove: {
          target: "divider_mousemove",
          action (data) {
          },
        },
        main_mouseup: {
          target: "idle",
          action (data) {
            this.actions.removeProperty.call(this);
          },
        },
        divider_mouseup: {
          target: "idle",
          action (data) {
            this.actions.removeProperty.call(this);
          },
        }
      }
    },
    resize: {
      onEnter(data) {
        this.context.origin.setDimensions(data);
      },
      onExit(data) {
      },
      on: {
        always: {
          target: 'idle',
          condition: 'resizeDone',
          action (data) {
          },
        },
      },
    }
  },
  guards: {
    zoomDone () { return true },
    resizeDone () { return true },
  },
  actions: {
    removeProperty () {
      let active = this.context.pair.active,
      prev = this.context.pair.prev;
      active.element.style.removeProperty('user-select');
      prev.element.style.removeProperty('user-select');
    }
  }
};

const STYLE_ROWS = "width:100%; min-width:100%;";
const STYLE_ROW = "position: relative; overflow: hidden;";
const STYLE_TIME = "border-top: 1px solid; width:100%; min-width:100%;";
const STYLE_SCALE = "border-left: 1px solid;";
class MainPane {
  #name = "Utilities"
  #shortName = "Main"
  #mediator
  #options
  #parent
  #core
  #elYAxis
  #elMain
  #elRows
  #elTime
  #elChart
  #elChartScale
  #elOffCharts = []
  #elYAxisScales = []
  #elGrid
  #elCanvas
  #elViewport
  #viewport
  #layerGrid
  #layerLabels
  #OffCharts = new Map()
  #Chart
  #Time
  #chartGrid
  #offChartDefaultH = OFFCHARTDEFAULTHEIGHT
  #offChartDefaultWpx = 120
  #rowMinH = ROWMINHEIGHT
  #cursorPos = [0, 0]
  #drag = {
    active: false,
    start: [0,0],
    prev: [0,0],
    delta: [0,0]
  }
  #buffer
  #indicators
  #controller
  constructor (mediator, options) {
    this.#mediator = mediator;
    this.#options = options;
    this.#parent = {...this.#mediator.api.parent};
    this.#core = this.#mediator.api.core;
    this.#elMain = this.#core.elMain;
    this.#elYAxis = this.#core.elYAxis;
    this.init(options);
  }
  log(l) { this.#mediator.log(l); }
  info(i) { this.#mediator.info(i); }
  warning(w) { this.#mediator.warn(w); }
  error(e) { this.#mediator.error(e); }
  get name() { return this.#name }
  get shortName() { return this.#shortName }
  get mediator() { return this.#mediator }
  get core() { return this.#core }
  get chart() { return this.#Chart }
  get time() { return this.#Time }
  get offCharts() { return this.#OffCharts }
  get options() { return this.#options }
  get width() { return this.#elMain.clientWidth }
  get height() { return this.#elMain.clientHeight }
  get chartW() { return this.#elChart.clientWidth }
  get chartH() { return this.#elChart.clientHeight }
  get rowsW() { return this.#elRows.clientWidth }
  get rowsH() { return this.#elRows.clientHeight }
  get rowMinH() { return this.#rowMinH }
  set rowMinH(h) { if (isNumber(h)) this.#rowMinH = Math.abs(h); }
  get pos() { return this.dimensions }
  get dimensions() { return DOM.elementDimPos(this.#elMain) }
  get range() { return this.#core.range }
  get cursorPos() { return this.#cursorPos }
  get candleW() { return this.#Time.candleW }
  get theme() { return this.#core.theme }
  get config() { return this.#core.config }
  get buffer() { return this.#buffer }
  get bufferPx() { return this.getBufferPx() }
  get scrollPos() { return this.#core.scrollPos }
  init(options) {
    this.mount(this.#elMain);
    this.#indicators = this.#core.indicators;
    const api = this.#mediator.api;
    this.#elRows = DOM.findBySelector(`#${api.id} .${CLASS_ROWS}`);
    this.#elTime = DOM.findBySelector(`#${api.id} .${CLASS_TIME}`);
    this.#elChart = DOM.findBySelector(`#${api.id} .${CLASS_CHART}`);
    this.#elGrid = DOM.findBySelector(`#${api.id} .${CLASS_GRID}`);
    this.#elViewport = DOM.findBySelector(`#${api.id} .${CLASS_GRID} .viewport`);
    this.#elChartScale  = DOM.findBySelector(`#${api.id} .${CLASS_YAXIS} .${CLASS_CHART}`);
    api.parent = this;
    api.chartData = this.mediator.api.chartData;
    api.onChart = this.#mediator.api.onChart;
    api.offChart = this.#mediator.api.offChart;
    api.rangeLimit = this.#mediator.api.rangeLimit;
    api.settings = this.#mediator.api.settings;
    api.elements =
      {...api.elements,
        ...{
          elChart: this.#elChart,
          elTime: this.#elTime,
          elRows: this.#elRows,
          elOffCharts: this.#elOffCharts,
          elChartScale: this.#elChartScale
        }
      };
    this.#Time = this.#mediator.register("Timeline", Timeline, options, api);
    this.registerOffCharts(options, api);
    this.#Chart = this.#mediator.register("Chart", Chart, options, api);
    this.#buffer = isNumber(this.config.buffer)? this.config.buffer : BUFFERSIZE$1;
    this.#rowMinH = isNumber(this.config.rowMinH)? this.config.rowMinH : ROWMINHEIGHT;
    this.#offChartDefaultH = isNumber(this.config.offChartDefaultH)? this.config.offChartDefaultH : OFFCHARTDEFAULTHEIGHT;
    this.log(`${this.#name} instantiated`);
  }
  start() {
    let i = 0;
    this.#Time.start();
    this.#Chart.start();
    this.#OffCharts.forEach((offChart, key) => {
      offChart.start(i++);
    });
    this.createViewport();
    this.initXGrid();
    this.eventsListen();
    stateMachineConfig$1.context.origin = this;
    this.#mediator.stateMachine = stateMachineConfig$1;
    this.#mediator.stateMachine.start();
  }
  end() {
    this.#mediator.stateMachine.destroy();
    this.#Time.end();
    this.#Chart.end();
    this.#OffCharts.forEach((offChart, key) => {
      offChart.end();
    });
    this.#viewport.destroy();
    this.#controller.removeEventListener("mousewheel", this.onMouseWheel);
    this.#controller.removeEventListener("mousemove", this.onMouseMove);
    this.#controller.removeEventListener("drag", this.onChartDrag);
    this.#controller.removeEventListener("enddrag", this.onChartDragDone);
    this.#controller.removeEventListener("keydown", this.onChartKeyDown);
    this.#controller.removeEventListener("keyup", this.onChartKeyDown);
    this.#controller = null;
    this.off(STREAM_NEWVALUE, this.onNewStreamValue);
  }
  eventsListen() {
    this.#elMain.tabIndex = 0;
    this.#elMain.focus();
    this.#controller = new InputController(this.#elRows, {disableContextMenu: false});
    this.#controller.on("mousewheel", this.onMouseWheel.bind(this));
    this.#controller.on("mousemove", this.onMouseMove.bind(this));
    this.#controller.on("drag", throttle(this.onChartDrag, 100, this));
    this.#controller.on("enddrag", this.onChartDragDone.bind(this));
    this.#controller.on("keydown", this.onChartKeyDown.bind(this));
    this.#controller.on("keyup", this.onChartKeyUp.bind(this));
    this.#controller.on("mouseup", this.onMouseUp.bind(this));
    this.on(STREAM_NEWVALUE, this.onNewStreamValue.bind(this));
  }
  on(topic, handler, context) {
    this.#mediator.on(topic, handler, context);
  }
  off(topic, handler) {
    this.#mediator.off(topic, handler);
  }
  emit(topic, data) {
    this.#mediator.emit(topic, data);
  }
  onMouseWheel(e) {
    e.domEvent.preventDefault();
    const direction = Math.sign(e.wheeldelta) * -1;
    const range = this.range;
    const newStart = range.indexStart - Math.floor(direction * XAXIS_ZOOM * range.Length);
    const newEnd = range.indexEnd + Math.floor(direction * XAXIS_ZOOM * range.Length);
    this.#core.setRange(newStart, newEnd);
    this.draw();
  }
  onMouseMove(e) {
    this.#cursorPos = [
      e.position.x, e.position.y,
      e.dragstart.x, e.dragstart.y,
      e.movement.x, e.movement.y
    ];
    this.emit("main_mousemove", this.#cursorPos);
  }
  onMouseUp(e) {
    this.emit("main_mouseup", e);
  }
  onChartDrag(e) {
    const d = this.#drag;
    if (!d.active) {
      d.active = true;
      d.start = [e.dragstart.x, e.dragstart.y];
      d.prev = d.start;
      d.delta = [e.movement.x, e.movement.y];
    }
    else {
      d.delta = [
        e.position.x - d.prev[0],
        e.position.y - d.prev[1]
      ];
      d.prev = [
        e.position.x,
        e.position.y
      ];
    }
    this.#cursorPos = ([
      e.position.x, e.position.y,
      ...d.start,
      ...d.delta
    ]);
    this.emit("chart_pan", this.#cursorPos);
  }
  onChartDragDone(e) {
    const d = this.#drag;
    d.active = false;
    d.delta = [
      e.position.x - d.prev[0],
      e.position.y - d.prev[1]
    ];
    this.#cursorPos = [
      e.position.x, e.position.y,
      ...d.start,
      ...d.delta
    ];
    this.emit("chart_panDone", this.#cursorPos);
  }
  onChartKeyDown(e) {
    let step = (this.candleW > 1) ? this.candleW : 1;
    switch (e.keyCode) {
      case Keys.Left:
        this.emit("chart_pan", [0,null,step,null,step * -1,null]);
        break;
      case Keys.Right:
        this.emit("chart_pan", [step,null,0,null,step,null]);
        break;
    }
  }
  onChartKeyUp(e) {
    let step = (this.candleW > 1) ? this.candleW : 1;
    switch (e.keyCode) {
      case Keys.Left:
        this.emit("chart_panDone", [0,null,step,null,step * -1,null]);
        break;
      case Keys.Right:
        this.emit("chart_panDone", [step,null,0,null,step,null]);
        break;
    }
  }
  onNewStreamValue(value) {
    this.draw();
  }
  mount(el) {
    el.innerHTML = this.defaultNode();
  }
  setWidth(w) {
    const resize = this.rowsW / w;
    this.#elRows.children;
    this.#elRows.style.width = `${Math.round(w * resize)}px`;
  }
  setHeight(h) {
    const api = this.#mediator.api;
    const resize = this.rowsH / (h - api.timeH);
    this.#elRows.children;
    this.#elRows.style.height = `${Math.round(this.#elRows.style.height * resize)}px`;
  }
  setDimensions(dimensions) {
    let height = dimensions.mainH - this.#Time.height;
    this.height;
    let chartW = dimensions.mainW;
    let chartH = Math.round(this.#Chart.height * dimensions.resizeH) - this.time.height;
    let width = chartW - this.#Chart.scale.width;
    this.setWidth(dimensions.mainW);
    this.setHeight(dimensions.mainH);
    this.#core.scrollPos = -1;
    this.#Time.setDimensions({w: dimensions.mainW});
    this.#elGrid.style.height = `${height}px`;
    this.#elGrid.style.width = `${width}px`;
    this.#elViewport.style.height = `${height}px`;
    this.#elViewport.style.width = `${width}px`;
    this.#viewport.setSize(width, height);
    const buffer = this.buffer;
    width = Math.round(width * ((100 + buffer) * 0.01));
    this.#layerGrid.setSize(width, height);
    this.#chartGrid.draw("x");
    this.#viewport.render();
    this.#Chart.resize(chartW, chartH);
    this.#OffCharts.forEach((offChart, key) => {
      chartH = Math.round(offChart.height * dimensions.resizeH);
      offChart.resize(chartW, chartH);
      offChart.Divider.setDividerPos();
    });
    this.#core.range;
    dimensions.rowsW = this.rowsW;
    dimensions.rowsH = this.rowsH;
    this.emit("rowsResize", dimensions);
  }
  getBufferPx() {
    let w = Math.round(this.width * this.buffer / 100);
    let r = w % this.candleW;
    return w - Math.round(r)
  }
  registerOffCharts(options, api) {
    let a = this.#offChartDefaultH * this.#mediator.api.offChart.length,
        offChartsH = Math.round( a / Math.log10( a * 2 ) ) / 100,
        rowsH = this.rowsH * offChartsH;
    if (this.#mediator.api.offChart.length === 1) {
      options.rowH = this.rowsH * this.#offChartDefaultH / 100;
      options.chartH = this.rowsH - options.rowH;
    }
    else {
      options.rowH = rowsH / this.#OffCharts.size;
      options.chartH = this.rowsH - rowsH;
    }
    for (let o of this.#mediator.api.offChart) {
      this.addOffChart(o, options, api);
    }
  }
  addOffChart(offChart, options, api) {
    this.#elRows.lastElementChild.insertAdjacentHTML("afterend", this.rowNode(offChart.type));
    this.#elOffCharts.push(this.#elRows.lastElementChild);
    this.#elYAxis.lastElementChild.insertAdjacentHTML("afterend", this.scaleNode(offChart.type));
    this.#elYAxisScales.push(this.#elYAxis.lastElementChild);
    api.elements.elOffChart = this.#elRows.lastElementChild;
    api.elements.elScale = this.#elYAxis.lastElementChild;
    options.offChart = offChart;
    let o = this.#mediator.register("OffChart", OffChart, options, api);
    this.#OffCharts.set(o.ID, o);
    this.emit("addOffChart", o);
  }
  addIndicator(ind) {
    console.log(`Add the ${ind} indicator`);
    const indicator = this.#indicators[ind].ind;
    console.log("indicator:",indicator);
    this.emit("addIndicatorDone", indicator);
  }
  defaultNode() {
    const api = this.#mediator.api;
    const styleRows = STYLE_ROWS + ` height: calc(100% - ${api.timeH}px)`;
    const styleTime = STYLE_TIME + ` height: ${api.timeH}px; border-color: ${this.theme.xAxis.line};`;
    const defaultRow = this.defaultRowNode();
    const node = `
    <div class="${CLASS_ROWS}" style="${styleRows}">
      ${defaultRow}
    </div>
    <div class="${CLASS_TIME}" style="${styleTime}">
      <canvas id=""><canvas/>
    </div>
    `;
    return node
  }
  defaultRowNode() {
    const api = this.#mediator.api;
    const width = api.width - api.toolsW - api.scaleW;
    const height = api.height - api.utilsH - api.timeH;
    const styleGrid = ` width: ${width}px; height: ${height}px; overflow: hidden`;
      let node = `<div class="${CLASS_GRID}" style="position: absolute;">
                      <div class="viewport" style="${styleGrid}"></div>
                  </div>`;
          node += this.rowNode(CLASS_CHART);
    this.#elYAxis.innerHTML = this.scaleNode(CLASS_CHART);
    return node
  }
  rowNode(type) {
    const styleRow = STYLE_ROW + ` border-top: 1px solid ${this.theme.chart.BorderColour};`;
    const styleScale = STYLE_SCALE + ` border-color: ${this.theme.xAxis.line};`;
    const node = `
      <div class="${CLASS_ROW} ${type}" style="${styleRow}">
        <canvas><canvas/>
        <div style="${styleScale}">
          <canvas id=""><canvas/>
        </div>
      </div>
    `;
    return node
  }
  scaleNode(type) {
    const styleRow = STYLE_ROW + ` border-top: 1px solid ${this.theme.chart.BorderColour};`;
    const styleScale = STYLE_SCALE + ` border-color: ${this.theme.yAxis.line};`;
    const node = `
      <div class="${CLASS_ROW} ${type}" style="${styleRow}">
        <div style="${styleScale}">
          <canvas id=""><canvas/>
        </div>
      </div>
    `;
    return node
  }
  createViewport() {
    const buffer = this.buffer;
    const width = this.width;
    const height = this.rowsH;
    const layerConfig = {
      width: Math.round(width * ((100 + buffer) * 0.01)),
      height: height
    };
    this.#viewport = new CEL.Viewport({
      width: width,
      height: height,
      container: this.#elViewport
    });
    this.#elCanvas = this.#viewport.scene.canvas;
    this.#layerLabels = new CEL.Layer(layerConfig);
    this.#layerGrid = new CEL.Layer(layerConfig);
    this.#viewport
          .addLayer(this.#layerLabels)
          .addLayer(this.#layerGrid);
    const config = {...this.theme, ...{ axes: "x" }};
    this.#chartGrid =
      new chartGrid(
        this.#layerGrid,
        this.#Time,
        null,
        config,
        this);
  }
  initXGrid() {
    this.draw();
  }
  draw() {
    window.requestAnimationFrame(()=> {
      this.#layerGrid.setPosition(this.scrollPos, 0);
      this.#chartGrid.draw("x");
      this.#viewport.render();
      this.#Time.draw();
    });
  }
  updateRange(pos) {
    this.#core.updateRange(pos);
    this.draw();
  }
  zoomRange() {
    this.draw();
  }
  resizeRowPair(divider, pos) {
    let active = divider.offChart;
    let ID = active.ID;
    let offCharts = Object.keys(this.#OffCharts);
    let i = offCharts.indexOf(ID) - 1;
    let prev = (i > 0) ?
      this.#OffCharts.get(offCharts[i]) :
      this.#Chart;
    let activeH = active.height - pos[5];
    let prevH  = prev.height + pos[5];
    if ( activeH >= this.#rowMinH
        && prevH >= this.#rowMinH) {
          divider.offChart.Divider.updateDividerPos(pos);
          active.resize(undefined, activeH);
          prev.resize(undefined, prevH);
    }
    active.element.style.userSelect = 'none';
    prev.element.style.userSelect = 'none';
    return {active, prev}
  }
}

const MENUMINWIDTH = 150;
class Menu {
  #id
  #widgets
  #mediator
  #core
  #config
  #elWidgetsG
  #elMenus
  #elMenu
  #cursorPos
  #controller
  static menuList = {}
  static menuCnt = 0
  static class = CLASS_MENUS
  static name = "Menus"
  static type = "menu"
  static currentActive
  constructor(widgets, config) {
    this.#widgets = widgets;
    this.#mediator = config.mediator;
    this.#core = this.#mediator.api.core;
    this.#config = config;
    this.#id = config.id;
    this.#elMenus = widgets.elements.elMenus;
    this.#elWidgetsG = this.#core.elWidgetsG;
    this.init();
  }
  static create(widgets, config) {
    const id = `menu${++Menu.menuCnt}`;
    config.id = id;
    Menu.menuList[id] = new Menu(widgets, config);
    return Menu.menuList[id]
  }
  static destroy(id) {
    Menu.menuList[id].end();
    delete Menu.menuList[id];
  }
  get el() { return this.#elMenu }
  get id() { return this.#id }
  get pos() { return this.dimensions }
  get dimensions() { return DOM.elementDimPos(this.#elMenu) }
  init() {
    this.mount(this.#elMenus);
  }
  start() {
    this.position(this.#config.primary);
    this.eventsListen();
  }
  end() {
    const api = this.#mediator.api;
    const menuItems = DOM.findBySelectorAll(`#${api.id} .${CLASS_MENU} li`);
    menuItems.forEach((item) => {
      item.removeEventListener('click', this.onMenuSelect);
    });
    document.removeEventListener('click', this.onOutsideClickListener);
  }
  eventsListen() {
    const api = this.#mediator.api;
    const menuItems = DOM.findBySelectorAll(`#${api.id} #${this.#config.id} li`);
    menuItems.forEach((item) => {
      item.addEventListener('click', this.onMenuSelect.bind(this));
    });
    document.addEventListener('click', this.onOutsideClickListener.bind(this));
  }
  on(topic, handler, context) {
    this.#mediator.on(topic, handler, context);
  }
  off(topic, handler) {
    this.#mediator.off(topic, handler);
  }
  emit(topic, data) {
    this.#mediator.emit(topic, data);
  }
  onMenuSelect(e) {
    let evt = e.currentTarget.dataset.event,
        data = {
          target: e.currentTarget.id,
          menu: this.#id,
          evt: evt
        };
    this.emit("menuItemSelected", data);
    this.emit("closeMenu", data);
  }
  onOutsideClickListener(e) {
    if (!this.#elMenu.contains(e.target)
    && (!this.#config.primary.contains(e.target))
    && DOM.isVisible(this.#elMenu)) {
      let data = {
        target: e.currentTarget.id,
        menu: this.#id,
      };
      this.emit("closeMenu", data);
    }
  }
  mount(el) {
    const api = this.#mediator.api;
    if (el.lastElementChild == null)
      el.innerHTML = this.menuNode();
    else
      el.lastElementChild.insertAdjacentHTML("afterend", this.menuNode());
    this.#elMenu = DOM.findBySelector(`#${api.id} #${this.#config.id}`);
  }
  static defaultNode() {
    const menuStyle = ``;
    const node = `
      <div class="${CLASS_MENUS}" style="${menuStyle}"></div>
    `;
    return node
  }
  menuNode() {
    const menu = this.#config;
    const menuStyle = `position: absolute; z-index: 1000; display: none; border: 1px solid ${MenuStyle.COLOUR_BORDER}; background: ${MenuStyle.COLOUR_BG}; color: ${MenuStyle.COLOUR_TXT};`;
    let content = this.content(menu);
    let node = `
      <div id="${menu.id}" class="${CLASS_MENU}" style="${menuStyle}">
        ${content}
      </div>
    `;
    return node
  }
  content(menu) {
    this.#mediator.api;
    const listStyle = `list-style: none; text-align: left; margin:1em 1em 1em -2.5em; min-width: ${MENUMINWIDTH}px`;
    const itemStyle = "padding: .25em 1em .25em 1em; white-space: nowrap;";
    const shortStyle = "display: inline-block; width: 4em;";
    const cPointer = "cursor: pointer;";
    const over = `onmouseover="this.style.background ='#222'"`;
    const out = `onmouseout="this.style.background ='none'"`;
    let content = `<ul style="${listStyle}">`;
    if (menu?.content) {
      for (let i of menu.content) {
        content += `<li id="${i.id}" data-event="${i.event}" style="${itemStyle} ${cPointer}" ${over} ${out}><a style="${cPointer}"><span style="${shortStyle}">${i.id}</span><span>${i.name}</span></li></a>`;
      }
    }
    content += "</ul>";
    return content
  }
  position(target) {
    let wPos = this.#elWidgetsG.getBoundingClientRect();
    let iPos = target.getBoundingClientRect();
    this.#elMenu.style.left = Math.round(iPos.left - wPos.left) + "px";
    this.#elMenu.style.top = Math.round(iPos.bottom - wPos.top) + "px";
  }
  remove() {
  }
  open() {
    let id = Menu.currentActive?.id || false;
    if (id) this.emit("closeMenu", {menu: id});
    Menu.currentActive = this;
    this.#elMenu.style.display = "block";
    let pos = DOM.elementDimPos(this.#elMenu);
    let posR = pos.left + pos.width;
    if (posR > this.#elWidgetsG.offsetWidth) {
      let o = Math.floor(this.#elWidgetsG.offsetWidth - pos.width);
          o = limit(o, 0, this.#elWidgetsG.offsetWidth);
      this.#elMenu.style.left = `${o}px`;
    }
  }
  close() {
    Menu.currentActive = null;
    this.#elMenu.style.display = "none";
    this.emit("menuClosed", this.id);
  }
}

class Window {
  #id
  #widgets
  #mediator
  #core
  #config
  #elWidgetsG
  #elWindows
  #elWindow
  #cursorPos
  #controller
  static windowList = {}
  static windowCnt = 0
  static class = CLASS_WINDOWS
  static name = "Windows"
  static type = "window"
  static currentActive = null
  constructor(widgets, config) {
    this.#widgets = widgets;
    this.#mediator = config.mediator;
    this.#core = this.#mediator.api.core;
    this.#config = config;
    this.#id = config.id;
    this.#elWindows = widgets.elements.elWindows;
    this.#elWidgetsG = this.#core.elWidgetsG;
    this.init();
  }
  static create(widgets, config) {
    const id = `window${++Window.windowCnt}`;
    config.id = id;
    Window.windowList[id] = new Window(widgets, config);
    return Window.windowList[id]
  }
  static destroy(id) {
    Window.windowList[id].end();
    delete Window.windowList[id];
  }
  get el() { return this.#elWindow }
  get id() { return this.#id }
  get pos() { return this.dimensions }
  get config() { return this.#config }
  set config(c) { this.#config = c; }
  get dimensions() { return DOM.elementDimPos(this.#elWindow) }
  init() {
    this.mount(this.#elWindows);
  }
  start() {
    this.eventsListen();
    this.open();
  }
  end() {
    document.removeEventListener('click', this.onOutsideClickListener);
  }
  eventsListen() {
    this.#mediator.api;
    this.on("closeWindow", (e) => {
      if (e.window === this.#id) this.close();
     });
  }
  on(topic, handler, context) {
    this.#mediator.on(topic, handler, context);
  }
  off(topic, handler) {
    this.#mediator.off(topic, handler);
  }
  emit(topic, data) {
    this.#mediator.emit(topic, data);
  }
  onOutsideClickListener(e) {
    if (!this.#elWindow.contains(e.target)
    && DOM.isVisible(this.#elWindow)) {
      let data = {
        target: e.currentTarget.id,
        window: this.#id,
      };
      this.emit("closeWindow", data);
    }
  }
  mount(el) {
    const api = this.#mediator.api;
    if (el.lastElementChild == null)
      el.innerHTML = this.windowNode();
    else
      el.lastElementChild.insertAdjacentHTML("afterend", this.windowNode());
    this.#elWindow = DOM.findBySelector(`#${api.id} #${this.#config.id}`);
    let x, y;
    if (this.#config.x && this.#config.y) {
      x = this.#config.x;
      y = this.#config.y;
    }
    else {
      let dims = DOM.elementDimPos(this.#elWindow);
      x = (this.#core.width - dims.width) / 2;
      y = (this.#core.height - dims.height) / 2;
    }
    this.#elWindow.style.bottom = `${y}px`;
    this.#elWindow.style.left = `${x}px`;
  }
  static defaultNode() {
    const windowStyle = ``;
    const node = `
      <div class="${CLASS_WINDOWS}" style="${windowStyle}"></div>
    `;
    return node
  }
  windowNode() {
    const window = this.#config;
    const windowStyle = `position: absolute; z-index: 1000; display: block; border: 1px solid ${WindowStyle.COLOUR_BORDER}; background: ${WindowStyle.COLOUR_BG}; color: ${WindowStyle.COLOUR_TXT};`;
    let dragBar = this.dragBar(window);
    let content = this.content(window);
    let closeIcon = this.closeIcon(window);
    let node = `
      <div id="${window.id}" class="${CLASS_WINDOW}" style="${windowStyle}">
          ${dragBar}
          ${closeIcon}
          ${content}
        </div>
      </div>
    `;
    return node
  }
  content(window) {
    const contentStyle = "padding: 2em;";
    let content = (window?.content)? window.content : '';
    let node = `
      <div class="content" style="${contentStyle}">
        ${content}
      </div>
    `;
    return node
  }
  dragBar(window) {
    this.#mediator.api;
    const cPointer = "cursor: grab;";
    const over = `onmouseover="this.style.background ='#222'"`;
    const out = `onmouseout="this.style.background ='none'"`;
    const dragBarStyle = `${cPointer}`;
    let node = ``;
    if (window.dragBar) node +=
    `
      <div class="dragBar" ${dragBarStyle} ${over} ${out}>
      </div>
    `;
    return node
  }
  closeIcon(window) {
    this.#mediator.api;
    const cPointer = "cursor: pointer;";
    const over = `onmouseover="this.style.background ='#222'"`;
    const out = `onmouseout="this.style.background ='none'"`;
    const closeIconStyle = `${cPointer}`;
    let node = ``;
    if (window.closeIcon) node +=
    `
      <div class="closeIcon" ${closeIconStyle} ${over} ${out}>
        <span>X</span>
      </div>
    `;
    return node
  }
  position(target) {
    let wPos = this.#elWidgetsG.getBoundingClientRect();
    let iPos = target.getBoundingClientRect();
    this.#elWindow.style.left = Math.round(iPos.left - wPos.left) + "px";
    this.#elWindow.style.top = Math.round(iPos.bottom - wPos.top) + "px";
  }
  remove() {
  }
  open() {
    Window.currentActive = this;
    this.#elWindow.style.display = "block";
    this.emit("windowOpened", this.id);
    setTimeout(() => {
      document.addEventListener('click', this.onOutsideClickListener.bind(this));
    }, 1000);
  }
  close() {
    Window.currentActive = null;
    this.#elWindow.style.display = "none";
    this.emit("windowClosed", this.id);
    document.removeEventListener('click', this.onOutsideClickListener);
  }
}

class Dialogue extends Window {
  static type = "window"
  constructor(widgets, config) {
    super();
    config.dragbar = true;
    config.close = tue;
    this.config = config;
  }
}

class Divider {
  #id
  #widgets
  #offChart
  #mediator
  #core
  #elDividers
  #elDivider
  #elOffChart
  #cursorPos
  #controller
  static dividerList = {}
  static divideCnt = 0
  static class = CLASS_DIVIDERS
  static name = "Dividers"
  static type = "divider"
  constructor(widgets, config) {
    this.#widgets = widgets;
    this.#offChart = config.offChart;
    this.#mediator = config.mediator;
    this.#core = this.#mediator.api.core;
    this.#id = config.id;
    this.#elDividers = widgets.elements.elDividers;
    this.#elOffChart = config.offChart.elOffChart;
    this.init();
  }
  static create(widgets, config) {
    const id = `divider${++Divider.divideCnt}`;
    config.id = id;
    Divider.dividerList[id] = new Divider(widgets, config);
    return Divider.dividerList[id]
  }
  static destroy(id) {
    Divider.dividerList[id].end();
    delete Divider.dividerList[id];
  }
  get el() { return this.#elDivider }
  get ID() { return this.#id }
  get offChart() { return this.#offChart }
  get config() { return this.#core.config }
  get pos() { return this.dimensions }
  get dimensions() { return DOM.elementDimPos(this.#elDivider) }
  get height() { return this.#elDivider.clientHeight }
  init() {
    this.mount();
  }
  start() {
    this.setCursor("n-resize");
    this.eventsListen();
  }
  end() {
    this.#controller.removeEventListener("mouseenter", this.onMouseEnter);
    this.#controller.removeEventListener("mouseout", this.onMouseOut);
    this.#controller.removeEventListener("drag", this.onDividerDrag);
    this.#controller.removeEventListener("enddrag", this.onDividerDragDone);
    this.#controller = null;
    this.el.remove();
  }
  eventsListen() {
    this.#controller = new InputController(this.#elDivider, {disableContextMenu: false});
    this.#controller.on("mouseenter", this.onMouseEnter.bind(this));
    this.#controller.on("mouseout", this.onMouseOut.bind(this));
    this.#controller.on("drag", debounce(this.onDividerDrag, 1, this, true));
    this.#controller.on("enddrag", this.onDividerDragDone.bind(this));
    this.#controller.on("mousedown", debounce(this.onMouseDown, 100, this, true));
    this.#controller.on("mouseup", this.onMouseUp.bind(this));
  }
  on(topic, handler, context) {
    this.#mediator.on(topic, handler, context);
  }
  off(topic, handler) {
    this.#mediator.off(topic, handler);
  }
  emit(topic, data) {
    this.#mediator.emit(topic, data);
  }
  onMouseEnter() {
    this.#elDivider.style.background = "#888888C0";
  }
  onMouseOut() {
    this.#elDivider.style.background = "#FFFFFF00";
  }
  onDividerDrag(e) {
    this.#cursorPos = [
      Math.floor(e.position.x), Math.floor(e.position.y),
      e.dragstart.x, e.dragstart.y,
      e.movement.x, e.movement.y
    ];
    const dragEvent = {
      divider: this,
      cursorPos: this.#cursorPos
    };
    this.emit("divider_drag", dragEvent);
  }
  onDividerDragDone(e) {
    this.#cursorPos = [
      Math.floor(e.position.x), Math.floor(e.position.y),
      e.dragstart.x, e.dragstart.y,
      e.movement.x, e.movement.y
    ];
    const dragEvent = {
      divider: this,
      cursorPos: this.#cursorPos
    };
    this.emit("divider_dragDone", dragEvent);
  }
  onMouseDown(e) {
    this.#cursorPos = [Math.round(e.position.x), Math.round(e.position.y)];
    this.emit(`${this.ID}_mousedown`, this.#cursorPos);
    this.emit(`divider_mousedown`, {
      id: this.ID,
      e: e,
      pos: this.#cursorPos,
      offChart: this.offChart
    });
  }
  onMouseUp(e) {
    this.#cursorPos = [Math.round(e.position.x), Math.round(e.position.y)];
    this.emit(`${this.ID}_mouseup`, this.#cursorPos);
    this.emit(`divider_mouseup`, {
      id: this.ID,
      e: e,
      pos: this.#cursorPos,
      offChart: this.offChart
    });
  }
  mount() {
    if (this.#elDividers.lastElementChild == null)
      this.#elDividers.innerHTML = this.dividerNode();
    else
      this.#elDividers.lastElementChild.insertAdjacentHTML("afterend", this.defaultNode());
    this.#elDivider = DOM.findBySelector(`#${this.#id}`);
  }
  setCursor(cursor) {
    this.#elDivider.style.cursor = cursor;
  }
  static defaultNode() {
    const dividersStyle = `position: absolute;`;
    const node = `
  <div class="${CLASS_DIVIDERS}" style="${dividersStyle}"></div>
  `;
    return node
  }
  dividerNode() {
    let top = this.#offChart.pos.top - DOM.elementDimPos(this.#elDividers).top,
      width = this.#core.MainPane.rowsW,
      height = (isNumber(this.config.dividerHeight)) ?
        this.config.dividerHeight : DIVIDERHEIGHT,
      left = this.#core.toolsW;
      top -= height / 2;
    const styleDivider = `position: absolute; top: ${top}px; left: ${left}px; z-index:100; width: ${width}px; height: ${height}px; background: #FFFFFF00;`;
    const node = `
  <div id="${this.#id}" class="divider" style="${styleDivider}"></div>
  `;
    return node
  }
  updateDividerPos(pos) {
    let dividerY = this.#elDivider.offsetTop;
        dividerY += pos[5];
    this.#elDivider.style.top = `${dividerY}px`;
  }
  setDividerPos() {
    let top = this.#offChart.pos.top - DOM.elementDimPos(this.#elDividers).top;
        top = top - (this.height / 2);
    this.#elDivider.style.top = `${top}px`;
  }
}

var stateMachineConfig = {
  id: "widgets",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(data) {
        console.log(`${this.id}: state: "${this.state}" - onEnter`);
      },
      onExit(data) {
        console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`);
      },
      on: {
        openMenu: {
          target: 'openMenu',
          action (data) {
            console.log(`${this.id}: transition from "${this.state}" to "openMenu" on ${this.event}`);
          },
        },
      }
    },
    openMenu: {
      onEnter(data) {
        console.log(`${this.id}: state: "${this.state}" - onEnter`);
      },
      onExit(data) {
        console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`);
      },
      on: {
        closeMenu: {
          target: "idle",
          action (data) {
            console.log(`${this.id}: transition from "${this.state}" to "idle" on "${this.event}"`);
          },
        },
      }
    },
    openWindow: {
      onEnter(data) {
        console.log(`${this.id}: state: "${this.state}" - onEnter`);
      },
      onExit(data) {
        console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`);
      },
      on: {
        closeWindow: {
          target: "idle",
          action (data) {
            console.log(`${this.id}: transition from "${this.state}" to "idle" on "${this.event}"`);
          },
        },
      }
    },
  }
};

class Widgets {
  #name = "Widgets"
  #shortName = "widgets"
  #mediator
  #options
  #parent
  #widgets
  #widgetsList = { Dialogue, Divider, Menu, Window }
  #widgetsInstances = {}
  #elements = {}
  #elWidgetsG
  #elMenus
  #elDividers
  #width
  #height
  constructor (mediator, options) {
    this.#mediator = mediator;
    this.#options = options;
    this.#widgets = options.widgets || this.#widgetsList;
    this.#elWidgetsG = this.#mediator.api.core.elWidgetsG;
    this.#parent = this.#mediator.api.parent;
    this.init();
  }
  log(l) { this.#mediator.log(l); }
  info(i) { this.#mediator.info(i); }
  warning(w) { this.#mediator.warn(w); }
  error(e) { this.#mediator.error(e); }
  get name() { return this.#name }
  get shortName() { return this.#shortName }
  get mediator() { return this.#mediator }
  get options() { return this.#options }
  get elements() { return this.#elements }
  get instances() { return this.#widgetsInstances }
  init() {
    this.mount(this.#elWidgetsG);
    const api = this.#mediator.api;
    api.parent = this.#mediator;
    api.elements =
    {...api.elements,
      ...{
        elWidgetsG: this.#elWidgetsG
      }
    };
    for (let i in this.#widgets) {
      let widget = this.#widgets[i];
      let entry = `el${widget.name}`;
      this.#elements[entry] = DOM.findBySelector(`#${api.id} .${widget.class}`);
    }
  }
  start() {
    this.eventsListen();
    stateMachineConfig.context.origin = this;
    this.#mediator.stateMachine = stateMachineConfig;
    this.#mediator.stateMachine.start();
  }
  end() {
  }
  eventsListen() {
    this.on("openMenu", this.onOpenMenu.bind(this));
    this.on("closeMenu", this.onCloseMenu.bind(this));
    this.on("offMenu", this.onCloseMenu.bind(this));
    this.on("menuItemSelected", this.onMenuItemSelected.bind(this));
  }
  on(topic, handler, context) {
    this.#mediator.on(topic, handler, context);
  }
  off(topic, handler) {
    this.#mediator.off(topic, handler);
  }
  emit(topic, data) {
    this.#mediator.emit(topic, data);
  }
  onResize(dimensions) {
    this.setDimensions(dimensions);
  }
  onOpenMenu(data) {
    console.log("onOpenMenu:", data);
    this.#widgetsInstances[data.menu].open();
  }
  onCloseMenu(data) {
    console.log("onCloseMenu:", data);
    this.#widgetsInstances[data.menu].close();
  }
  onMenuItemSelected(e) {
    this.emit(e.evt, e.target);
  }
  mount(el) {
    el.innerHTML = this.defaultNode();
  }
  setWidth(w) {
    this.#width = w;
  }
  setHeight(h) {
    this.#height = h;
  }
  setDimensions(dimensions) {
    this.setWidth(dimensions.mainW);
    this.setHeight(dimensions.mainH);
  }
  defaultNode() {
    let nodes = ``,
        types = [];
    for (let i in this.#widgets) {
      let widget = this.#widgets[i];
      if (types.indexOf(widget.type) === -1) {
        nodes += widget.defaultNode();
        types.push(widget.type);
      }
    }
    return nodes
  }
  insert(type, config) {
    config.mediator = this.mediator;
    const widget = this.#widgets[type].create(this, config);
    this.#widgetsInstances[widget.id] = widget;
    return widget
  }
  remove(type, id) {
    delete(this.#widgetsInstances[id]);
    this.#widgets[type].destroy(id);
  }
}

class Dataset {
  #state
  #id
  #type
  #data = []
  constructor(state, ds) {
    this.#state = state;
    this.#id = (isString(ds.id)) ? ds.id : uid;
    this.#type = (isString(ds.type)) ? ds.type : "default";
    this.#data = (isArray(ds.data)) ? ds.data : [];
  }
}

function validateShallow(data, isCrypto=false) {
  if (!isArray(data)) return false
  let rnd = getRandomIntBetween(0, data.length);
  if (!isValidCandle(data[0], isCrypto)) return false
  if (!isValidCandle(data[rnd], isCrypto)) return false
  if (!isValidCandle(data[data.length - 1], isCrypto)) return false
  let t1 = data[0][0];
  let t2 = data[1][0];
  let t3 = data[2][0];
  if (t1 > t2 && t2 > t3) return false
  return true
}
function validateDeep(data, isCrypto=false) {
  if (!isArray(data)) return false
  let i = 0;
  let prev = 0;
  while (i < data.length) {
    if (!isValidCandle(data[i], isCrypto)) return false
    if (data[i][0] < prev) return false
    prev = data[i][0];
    i++;
  }
  return true
}
function isValidCandle(c, isCrypto=false) {
  if (!isArray(c)) return false
  if (c.length !== 6) return false
  if (isCrypto)
    if (!isValidTimeInRange(c[0])) return false
  if (
    !isNumber(c[1]) ||
    !isNumber(c[2]) ||
    !isNumber(c[3]) ||
    !isNumber(c[4]) ||
    !isNumber(c[5])
  ) return false
  return true
}

class Range {
  data
  #interval = DEFAULT_TIMEFRAMEMS
  #intervalStr = "1s"
  indexStart = 0
  indexEnd = LIMITFUTURE
  valueMin = 0
  valueMax = 0
  valueDiff = 0
  volumeMin = 0
  volumeMax = 0
  volumeDiff = 0
  valueMinIdx = 0
  valueMaxIdx = 0
  volumeMinIdx = 0
  volumeMaxIdx = 0
  old = {}
  limitFuture = LIMITFUTURE
  limitPast = LIMITPAST
  minCandles = MINCANDLES
  maxCandles = MAXCANDLES
  yAxisBounds = YAXIS_BOUNDS
  rangeLimit = LIMITFUTURE
  anchor
  #core
  #worker
  #init = true
  constructor( allData, start=0, end=allData.data.length-1, config={}) {
    if (!isObject(allData)) return false
    if (!isObject(config)) return false
    if (!(config?.core?.constructor.name == "TradeXchart")) return false
    this.#init = true;
    this.limitFuture = (isNumber(this.config?.limitFuture)) ? this.config.limitFuture : LIMITFUTURE;
    this.limitPast = (isNumber(this.config?.limitPast)) ? this.config.limitPast : LIMITPAST;
    this.minCandles = (isNumber(this.config?.minCandles)) ? this.config.minCandles : MINCANDLES;
    this.maxCandles = (isNumber(this.config?.maxCandles)) ? this.config.maxCandles : MAXCANDLES;
    this.yAxisBounds = (isNumber(this.config?.limitBounds)) ? this.config.limitBounds : YAXIS_BOUNDS;
    this.#core = config.core;
    const MaxMinPriceVolStr = `
    (input) => {
      return maxMinPriceVol(input)
    }
    function ${this.maxMinPriceVol.toString()}
  `;
    this.#worker = this.#core.worker.create("range", MaxMinPriceVolStr, undefined, this.#core);
    const tf = config?.interval || DEFAULT_TIMEFRAMEMS;
    if (allData.data.length == 0) {
      let ts = Date.now();
      start = 0;
      end = this.rangeLimit;
      this.#interval = tf;
      this.#intervalStr = ms2Interval(this.interval);
      this.anchor = ts - (ts % tf);
    }
    else if (allData.data.length < 2) {
      this.#interval = tf;
      this.#intervalStr = ms2Interval(this.interval);
    }
    else if (end == 0 && allData.data.length >= this.rangeLimit)
      end = this.rangeLimit;
    else if (end == 0)
      end = allData.data.length;
    for (let data in allData) {
      this[data] = allData[data];
    }
    if (!this.set(start, end)) return false
    if (allData.data.length > 2) {
      this.#interval = detectInterval(this.data);
      this.#intervalStr = ms2Interval(this.interval);
    }
  }
  get dataLength () { return (this.data.length == 0) ? 0 : this.data.length - 1 }
  get Length () { return this.indexEnd - this.indexStart }
  get timeDuration () { return this.timeFinish - this.timeStart }
  get timeMin () { return this.value(this.indexStart)[0] }
  get timeMax () { return this.value(this.indexEnd)[0] }
  get rangeDuration () { return this.timeMax - this.timeMin }
  get timeStart () { return this.value(0)[0] }
  get timeFinish () { return this.value(this.dataLength)[0] }
  set interval (i) { this.#interval = i; }
  get interval () { return this.#interval }
  set intervalStr (i) { this.#intervalStr = i; }
  get intervalStr () { return this.#intervalStr }
  end() {
    WebWorker.destroy(this.#worker.ID);
  }
  set (start=0, end=this.dataLength, max=this.maxCandles) {
    if (!isNumber(start) ||
        !isNumber(end)) return false
    if (start > end) [start, end] = [end, start];
    end = limit(end, start + this.minCandles, start + max);
    start = (start < this.limitPast * -1) ? this.limitPast * -1 : start;
    end = (end < (this.limitPast * -1) + this.minCandles) ? (this.limitPast * -1) + this.minCandles + 1 : end;
    start = (start > this.dataLength + this.limitFuture - this.minCandles) ? this.dataLength + this.limitFuture - this.minCandles - 1: start;
    end = (end > this.dataLength + this.limitFuture) ? this.dataLength + this.limitFuture : end;
    const newStart = start;
    const newEnd = end;
    const oldStart = this.indexStart;
    const oldEnd = this.indexEnd;
      let inOut = this.Length;
    this.indexStart = start;
    this.indexEnd = end;
    inOut -= this.Length;
    if (this.#init) {
      this.#init = false;
      let maxMin = this.maxMinPriceVol({data: this.data, start: this.indexStart, end: this.indexEnd, that: this});
      this.setMaxMin(maxMin);
      return true
    }
    this.#worker.postMessage({data: this.data, start: start, end: end, that: this})
    .then(maxMin => {
      this.setMaxMin(maxMin);
      if (this.old.priceMax != this.priceMax || this.old.priceMin != this.priceMin) {
        this.#core.emit("range_priceMaxMin", [this.priceMax, this.priceMin]);
      }
      this.#core.emit("setRange", [newStart, newEnd, oldStart, oldEnd]);
      this.#core.emit("chart_zoom", [newStart, newEnd, oldStart, oldEnd, inOut]);
      this.#core.emit(`chart_zoom_${inOut}`, [newStart, newEnd, oldStart, oldEnd]);
    });
    return true
  }
  setMaxMin(maxMin) {
    for (let m in maxMin) {
      this.old[m] = this[m];
      this[m] = maxMin[m];
    }
    this.scale = (this.dataLength != 0) ? this.Length / this.dataLength : 1;
  }
  value ( index ) {
    if (!isNumber(index)) index = this.data.length - 1;
    let v = this.data[index];
    if (v !== undefined) return v
    else {
      const len = this.data.length - 1;
      v = [null, null, null, null, null, null];
      if (this.data.length < 1) {
        v[0] = Date.now() + (this.interval * index);
        return v
      }
      else if (index < 0) {
        v[0] = this.data[0][0] + (this.interval * index);
        return v
      }
      else if (index > len) {
        v[0] = this.data[len][0] + (this.interval * (index - len));
        return v
      }
      else return null
    }
  }
   getTimeIndex (ts) {
    if (!isNumber(ts)) return false
    ts = ts - (ts % this.interval);
    let x = (this.data.length > 0) ? this.data[0][0] : this.anchor;
    if (ts === x)
      return 0
    else if (ts < x)
      return ((x - ts) / this.interval) * -1
    else
      return (ts - x) / this.interval
  }
  inRange(t) {
    return (t >= this.timeMin && t <= this.timeMax) ? true : false
  }
  inPriceHistory (t) {
    return (t >= this.timeStart && t <= this.timeFinish) ? true : false
  }
  inRenderRange (t) {
    let i = this.getTimeIndex(t);
    let o = this.#core.rangeScrollOffset;
    return (i >= this.indexStart - o && i <= this.indexEnd + o) ? true : false
  }
  rangeIndex (ts) { return this.getTimeIndex(ts) - this.indexStart }
   maxMinPriceVol ( input ) {
    let {data, start, end, that} = {...input};
    start = (typeof start === "number")? start : 0;
    end = (typeof end === "number")? end : data?.length-1;
    if (data.length == 0) {
      return {
        valueMin: 0,
        valueMax: 1,
        volumeMin: 0,
        volumeMax: 0,
        valueMinIdx: 0,
        valueMaxIdx: 0,
        volumeMinIdx: 0,
        volumeMaxIdx: 0,
      }
    }
    let l = data.length - 1;
    let i = limit(start, 0, l);
    let c = limit(end, 0, l);
    let valueMin  = data[i][3];
    let valueMax  = data[i][2];
    let volumeMin = data[i][5];
    let volumeMax = data[i][5];
    let valueMinIdx  = i;
    let valueMaxIdx  = i;
    let volumeMinIdx = i;
    let volumeMaxIdx = i;
    while(i++ < c) {
      if (data[i][3] < valueMin) {
        valueMin = data[i][3];
        valueMinIdx = i;
      }
      if (data[i][2] > valueMax) {
        valueMax = data[i][2];
        valueMaxIdx = i;
      }
      if (data[i][5] < volumeMin) {
        volumeMin = data[i][5];
        volumeMinIdx = i;
      }
      if (data[i][5] > volumeMax) {
        volumeMax = data[i][5];
        volumeMaxIdx = i;
      }
    }
    valueMin *= (1 - that.yAxisBounds);
    valueMax *= (1 + that.yAxisBounds);
    return {
      valueMin: valueMin,
      valueMax: valueMax,
      valueDiff: valueMax - valueMin,
      volumeMin: volumeMin,
      volumeMax: volumeMax,
      volumeDiff: volumeMax - volumeMin,
      valueMinIdx: valueMinIdx,
      valueMaxIdx: valueMaxIdx,
      volumeMinIdx: volumeMinIdx,
      volumeMaxIdx: volumeMaxIdx,
    }
    function limit(val, min, max) {
      return Math.min(max, Math.max(min, val));
    }
  }
}
function detectInterval(ohlcv) {
  let len = Math.min(ohlcv.length - 1, 99);
  let min = Infinity;
  ohlcv.slice(0, len).forEach((x, i) => {
      let d = ohlcv[i+1][0] - x[0];
      if (d === d && d < min) min = d;
  });
  return min
}
function calcTimeIndex(time, timeStamp) {
  if (!isNumber(timeStamp)) return false
  let index;
  let timeFrameMS = time.timeFrameMS;
  timeStamp = timeStamp - (timeStamp % timeFrameMS);
  if (timeStamp === time.range.data[0][0])
    index = 0;
  else if (timeStamp < time.range.data[0][0])
    index = ((time.range.data[0][0] - timeStamp) / timeFrameMS) * -1;
  else
    index = (timeStamp - time.range.data[0][0]) / timeFrameMS;
  return index
}

const DEFAULT_STATE = {
  chart: {
    type: "candles",
    candleType: "CANDLE_SOLID",
    indexed: false,
    data: [],
    settings: {},
    row: {},
    tf: DEFAULT_TIMEFRAME,
    tfms: DEFAULT_TIMEFRAMEMS
  },
  onchart: [],
  offchart: [],
  datasets: [],
  tools: [],
  ohlcv: []
};
class State {
  static #stateList = []
  #id = ""
  #data = {}
  #initialState = ""
  #currentState = ""
  #nextState
  #states = {}
  #store
  #dss = {}
  #status = false
  #isEmpty = true
  constructor(state, deepValidate=false, isCrypto=false) {
    if (isObject(state)) {
      this.#data = this.validateState(state, deepValidate, isCrypto);
      this.#status = "valid";
      this.#isEmpty = (this.#data.chart?.isEmpty) ? true : false;
    }
    else {
      this.defaultState();
      this.#status = "default";
      this.#isEmpty = true;
    }
  }
  static create(state, deepValidate=false, isCrypto=false) {
    const instance = new State(state, deepValidate, isCrypto);
    State.#stateList.push(instance);
    return instance
  }
  static delete(state) {
  }
  get status() { return this.#status }
  get data() { return this.#data }
  get isEmpty() { return this.#isEmpty }
  validateState(state, deepValidate=false, isCrypto=false) {
    if (!('chart' in state)) {
      state.chart = DEFAULT_STATE.chart;
      state.chart.data = state?.ohlcv || [];
      state.chart.settings = state?.settings || state.chart.settings;
      state.chart.isEmpty = true;
    }
    if (deepValidate)
      state.chart.data = validateDeep(state.chart.data, isCrypto) ? state.chart.data : [];
    else
      state.chart.data = validateShallow(state.chart.data, isCrypto) ? state.chart.data : [];
    if (!isNumber(state.chart?.tf) || deepValidate) {
      let tfms = detectInterval(state.chart.data);
      if (tfms < SECOND) tfms = DEFAULT_TIMEFRAMEMS;
      state.chart.tfms = tfms;
    }
    if (!isString(state.chart?.tfms) || deepValidate)
      state.chart.tf = ms2Interval(state.chart.tfms);
    if (!('onchart' in state)) {
        state.onchart = DEFAULT_STATE.onchart;
    }
    if (!('offchart' in state)) {
        state.offchart = DEFAULT_STATE.offchart;
    }
    if (!state.chart.settings) {
        state.chart.settings = DEFAULT_STATE.chart.settings;
    }
    delete state.ohlcv;
    if (!('datasets' in state)) {
        state.datasets = [];
    }
    for (var ds of state.datasets) {
      if (!this.#dss) this.#dss = {};
      this.dss[ds.id] = new Dataset(this, ds);
    }
    return state
  }
  defaultState() {
    this.#data = DEFAULT_STATE;
  }
  deepMerge(target, source) {
    return mergeDeep(target, source)
  }
}

const T = 0, H = 2, L = 3, C = 4, V = 5;
const empty = [null, null, null, null, null];
class Stream {
  #core
  #maxUpdate
  #updateTimer
  #status
  #candle = empty
  #precision
  constructor(core) {
    this.#core = core;
    this.#maxUpdate = (isNumber(core.config?.maxCandleUpdate)) ? core.config.maxCandleUpdate : STREAM_MAXUPDATE;
    this.#precision = (isNumber(core.config?.streamPrecision)) ? core.config.streamPrecision : STREAM_PRECISION;
    this.status = {status: STREAM_NONE};
  }
  emit(topic, data) {
    this.#core.emit(topic, data);
  }
  start() {
    this.status = {status: STREAM_STARTED};
    this.#updateTimer = setInterval(this.onUpdate.bind(this), this.#maxUpdate);
  }
  stop() {
    this.status = {status: STREAM_STOPPED};
  }
  error() {
    this.status = {status: STREAM_ERROR};
  }
  onTick(tick) {
    if (this.#status == STREAM_STARTED || this.#status == STREAM_LISTENING) {
      if (isObject(tick)) this.candle = tick;
    }
  }
  onUpdate() {
    if (this.#candle !== empty) {
      this.status = {status: STREAM_UPDATE, data: this.candle};
      this.status = {status: STREAM_LISTENING, data: this.#candle};
    }
  }
  get range() { return this.#core.range }
  get status() { return this.#status }
  set status({status, data}) {
    this.#status = status;
    this.emit(status, data);
  }
  set candle(data) {
    const tfms = this.#core.time.timeFrameMS;
    let roundedTime = Math.floor(new Date(data.t) / tfms) * tfms;
    data.t = roundedTime;
    if (this.#candle[T] !== data.t) {
      this.newCandle(data);
    }
    else {
      this.updateCandle(data);
    }
    this.status = {status: STREAM_LISTENING, data: this.#candle};
  }
  get candle() {
    return (this.#candle !== empty) ? this.#candle : null
  }
  newCandle(data) {
    this.prevCandle();
    this.#candle = [data.t, data.p, data.p, data.p, data.p, data.q, null, true];
    this.#core.mergeData({data: [this.#candle]}, true);
    this.status = {status: STREAM_NEWVALUE, data: {data: data, candle: this.#candle}};
  }
  prevCandle() {
    const d = this.#core.allData.data;
    if (d.length > 0 && d[d.length - 1][7])
          d[d.length - 1].pop();
  }
  updateCandle(data) {
    data.p = parseFloat(data.p);
    data.q = parseFloat(data.q);
    let candle = this.#candle;
    candle[H] = data.p > candle[H] ? data.p : candle[H];
    candle[L] = data.p < candle[L] ? data.p : candle[L];
    candle[C] = data.p;
    candle[V] = parseFloat(candle[V] + data.q).toFixed(this.#precision);
    this.#candle = candle;
    const d = this.#core.allData.data;
    const l = (d.length > 0) ? d.length -1 : 0;
    d[l] = this.#candle;
  }
}

class Theme {
  static #list = new Map()
  static #current
  #config
  constructor(theme, core) {
    this.#config = (isObject(theme))? theme : {};
    const reserved = [
      "constructor"
    ];
    theme = {...defaultTheme, ...theme};
    for (let t in theme) {
      if (reserved.includes(t)) continue
      this[t] = theme[t];
    }
  }
  static create(theme, core) {
    if (!(isObject(theme))) return false
    theme.ID = (isString(theme.name))? uid(theme.name) : uid("theme");
    const instance = new Theme(theme, core);
    Theme.#list.set(theme.ID, instance);
    return instance
  }
  static get list() { return Theme.#list }
  static set current(theme) { Theme.setCurrent(theme); }
  static get current() { return Theme.#current }
  static setCurrent(theme) {
    if (isString(theme) && Theme.list.has(theme)) {
      Theme.#current = theme;
    }
    return Theme.getCurrent()
  }
  static getCurrent() {
    if (isString(Theme.#current) && Theme.list.has(Theme.#current))
      return Theme.#list.get(Theme.#current)
    else
      return defaultTheme
  }
}

class ThreadWorker {
  #fn
  constructor (fn) {
    this.#fn = fn;
    self.onmessage = m => this._onmessage(m.data);
  }
  _onmessage (m) {
    const {r, data} = m;
    const result = this.#fn(data);
    self.postMessage({r, result});
  }
  end() {
    self.close();
  }
}
class Thread {
  #ID
  #cb
  #err
  #req = 0
  #reqList = {}
  #worker
  constructor(ID, fn, cb, err) {
    this.#ID = ID;
    this.#cb = cb;
    this.#err = err;
    const workerFn = `
      ${WebWorker$1.ThreadWorker.toString()};
      const fn = ${fn}
      const worker = new ThreadWorker(fn)
    `;
    const blob = new Blob([`;(() => {${workerFn}})()`], { type: 'text/javascript' });
    const blobURL = URL.createObjectURL(blob);
    this.#worker = new Worker(blobURL);
    URL.revokeObjectURL(blobURL);
  }
  get ID() { return this.#ID }
  get req() { return `r_${this.#req}` }
  onmessage(m) {
    return (isFunction(this.#cb))? this.#cb(m) : m
  }
  onerror(e) {
    return (isFunction(this.#err))? this.#err(e) : e
  }
  postMessage(m) {
    return new Promise((resolve, reject) => {
      try {
        let r = this.req;
        this.#reqList[r] = {resolve, reject};
        this.#worker.postMessage({r: r, data: m});
        this.#worker.onmessage = m => {
          const {r, result} = m.data;
          if (r in this.#reqList) {
            const {resolve, reject} = this.#reqList[r];
            delete this.#reqList[r];
            resolve(this.onmessage(result));
          }
        };
        this.#worker.onerror = e => {
          reject(this.onerror(e));
        };
      } catch (error) { reject(error); }
    })
  }
  terminate() {
    this.#worker.terminate();
  }
}
class WebWorker$1 {
  static #threads = new Map()
  static ThreadWorker = ThreadWorker
  static Thread = Thread
  static create(ID="worker", worker, cb, core) {
    if (typeof window.Worker === "undefined") return false
    if (isFunction(worker)) {
      worker = worker.toString();
    }
    else if (isString(worker)) ;
    else { return false }
    ID = (isString(ID))? uid(ID) : uid("worker");
    WebWorker$1.#threads.set(ID, new WebWorker$1.Thread(ID, worker, cb));
    return WebWorker$1.#threads.get(ID)
  }
  static destroy(ID) {
    if (!isString(ID)) return false
    WebWorker$1.#threads.get(ID).terminate();
    WebWorker$1.#threads.delete(ID);
  }
  static end() {
    WebWorker$1.#threads.forEach( (value, key, map) => {
      WebWorker$1.destroy(key);
    });
  }
}

class TradeXchart {
  static #cnt = 0
  static #instances = {}
  static #talibReady = false
  static initErrMsg = `TradeX-chart requires "talib" to function properly. Without it, some features maybe missing or broken.`
  #id
  #name = NAME
  #shortName = NAME
  #el = undefined
  #mediator
  #config
  #options
  #elements = {}
  #elTXChart
  #elUtils
  #elBody
  #elTools
  #elMain
  #elRows
  #elTime
  #elYAxis
  #elWidgetsG
  #inCnt = null
  #modID
  #state = {}
  #userClasses = []
  #chartIsEmpty = true
  #data
  #range
  #rangeStartTS
  #rangeLimit = RANGELIMIT
  #indicators = Indicators
  #TALib
  #theme
  #chartW = 500
  #chartH = 400
  chartWMin = 500
  chartHMin = 400
  chartW_Reactive = true
  chartH_Reactive = true
  chartBGColour = GlobalStyle.COLOUR_BG
  chartTxtColour = GlobalStyle.COLOUR_TXT
  chartBorderColour = GlobalStyle.COLOUR_BORDER
  utilsH = 35
  toolsW = 40
  timeH  = 50
  scaleW = 60
  static permittedClassNames =
      ["TradeXchart","Chart","MainPane","OffChart","OnChart",
      "ScaleBar","Timeline","ToolsBar","UtilsBar","Widgets"]
  #UtilsBar
  #ToolsBar
  #MainPane = {
    chart: {},
    time: {}
  }
  #WidgetsG
  panes = {
    utils: this.#UtilsBar,
    tools: this.#ToolsBar,
    main: this.#MainPane,
  }
  #time = {
    rangeTotal: true,
    range: {},
    total: {},
    timeFrameMS: 0,
    timeFrame: '',
    timeZone: '',
    indexed: false
  }
  logs = false
  infos = false
  warnings = false
  errors = false
  #mousePos = {x:0, y:0}
  #scrollPos = 0
  #smoothScrollOffset = 0
  #panBeginPos = [null, null, null, null]
  #workers
  #stream
  #candles
  #pricePrecision
  #volumePrecision
  #delayedSetRange = false
constructor (mediator, config={}) {
    this.oncontextmenu = window.oncontextmenu;
    this.#workers = WebWorker$1;
    this.#TALib = config.talib;
    this.logs = (config?.logs) ? config.logs : false;
    this.infos = (config?.infos) ? config.infos : false;
    this.warnings = (config?.warnings) ? config.warnings : false;
    this.errors = (config?.errors) ? config.errors : false;
    let container = config?.container,
        state = config?.state,
        deepValidate = config?.deepValidate || false,
        isCrypto = config?.isCrypto || false;
    if (isString(container)) {
      if (container[0] === '#')
        container = DOM.findByID(container);
      else
        container = DOM.findBySelector(container);
    }
    if (!DOM.isElement(container))
      this.error(`${NAME} cannot be mounted. Provided element does not exist in DOM`);
    else {
      this.#el = container;
      this.#mediator = mediator;
      this.#state = State.create(state, deepValidate, isCrypto);
      this.log(`Chart ${this.#id} created with a ${this.#state.status} state`);
      delete(config.state);
      let tf = "1s";
      let ms = SECOND_MS;
      if (!isObject(config?.stream) && this.#state.data.chart.data.length < 2) {
        this.warning(`${NAME} has no chart data or streaming provided.`)
        ;({tf, ms} = isTimeFrame(config?.timeFrame));
        this.#time.timeFrame = tf;
        this.#time.timeFrameMS = ms;
        this.#chartIsEmpty = true;
      }
      else if (isObject(config?.stream) && this.#state.data.chart.data.length < 2) {
({tf, ms} = isTimeFrame(config?.timeFrame));
        console.log("tf:",tf,"ms:",ms);
        this.#time.timeFrame = tf;
        this.#time.timeFrameMS = ms;
        this.#chartIsEmpty = true;
        this.#delayedSetRange = true;
      }
      else {
        this.#time.timeFrame = this.#state.data.chart.tf;
        this.#time.timeFrameMS = this.#state.data.chart.tfms;
        this.#chartIsEmpty = false;
      }
      this.init(config);
    }
  }
  log(l) { if (this.logs) console.log(l); }
  info(i) { if (this.info) console.info(i); }
  warning(w) { if (this.warnings) console.warn(w); }
  error(e) { if (this.errors) console.error(e); }
  get id() { return this.#id }
  get name() { return this.#name }
  get shortName() { return this.#shortName }
  get mediator() { return this.#mediator }
  get options() { return this.#options }
  get config() { return this.#config }
  get inCnt() { return this.#inCnt }
  get width() { return this.#chartW }
  set width(w) { this.setWidth(w); }
  get height() { return this.#chartH }
  set height(h) { this.setHeight(h); }
  get elUtils() { return this.#elUtils }
  get elTools() { return this.#elTools }
  get elMain() { return this.#elMain }
  get elYAxis() { return this.#elYAxis }
  get elWidgetsG() { return this.#elWidgetsG }
  get UtilsBar() { return this.#UtilsBar }
  get ToolsBar() { return this.#ToolsBar }
  get MainPane() { return this.#MainPane }
  get Timeline() { return this.#MainPane.time }
  get WidgetsG() { return this.#WidgetsG }
  get Chart() { return this.#MainPane.chart }
  get state() { return this.#state.data }
  get chartData() { return this.#state.data.chart.data }
  get offChart() { return this.#state.data.offchart }
  get onChart() { return this.#state.data.onchart }
  get datasets() { return this.#state.data.datasets }
  get allData() {
    return {
      data: this.chartData,
      onChart: this.onChart,
      offChart: this.offChart,
      datasets: this.datasets
    }
  }
  get rangeLimit() { return (isNumber(this.#rangeLimit)) ? this.#rangeLimit : RANGELIMIT }
  get range() { return this.#range }
  get time() { return this.#time }
  get TimeUtils() { return Time }
  get theme() { return Theme.getCurrent() }
  get settings() { return this.#state.data.chart.settings }
  get indicators() { return this.#indicators }
  get TALib() { return this.#TALib }
  get candleW() { return this.Timeline.candleW }
  get buffer() { return this.MainPane.buffer }
  get bufferPx() { return this.MainPane.bufferPx }
  set scrollPos(pos) { this.setScrollPos(pos); }
  get scrollPos() { return this.#scrollPos }
  get smoothScrollOffset() { return 0 }
  get rangeScrollOffset() { return Math.floor(this.bufferPx / this.candleW) }
  get mousePos() { return this.#mousePos }
  get pricePrecision() { return this.#pricePrecision }
  get volumePrecision() { return this.#volumePrecision }
  set stream(stream) { return this.setStream(stream) }
  get stream() { return this.#stream }
  get worker() { return this.#workers }
  get isEmtpy() { return this.#chartIsEmpty }
  set candles(c) { if (isObject(c)) this.#candles = c; }
  get candles() { return this.#candles }
  static create(container, config={}, state) {
    if (!TradeXchart.#talibReady) {
      (async () => {
        try {
          if ((typeof config.talib !== "object") ||
              (typeof config.talib.init !== "function"))
                throw new Error(`${TradeXchart.initErrMsg}`)
          await config.talib.init("node_modules/talib-web/lib/talib.wasm");
          TradeXchart.#talibReady = true;
        } catch (e) {
          throw new Error(`${TradeXchart.initErrMsg} ${e.message}`)
        }
      })();
    }
    if (TradeXchart.#cnt == 0) document.head.insertAdjacentHTML("beforeend", style);
    const cnt = ++TradeXchart.#cnt;
    config.cnt = cnt;
    config.modID = `${ID}_${cnt}`;
    config.container = container;
    config.CPUCores = navigator.hardwareConcurrency;
    const core = new SX.Core(config);
    const api = {
      permittedClassNames:TradeXchart.permittedClassNames,
    };
    config.state = state;
    const instance = core.register(config.modID, TradeXchart, config, api);
    TradeXchart.#instances[cnt] = core;
    return instance
  }
  static destroy(chart) {
    if (chart.constructor.name === "TradeXchart") {
      chart.end();
      const inCnt = chart.inCnt;
      delete TradeXchart.#instances[inCnt];
    }
  }
  init(config) {
    this.#config = config;
    this.#inCnt = config.cnt;
    this.#modID = config.modID;
    const id = (isObject(config) && isString(config.id)) ? config.id : null;
    this.setID(id);
    this.mount();
    if (isObject(config)) {
      for (const option in config) {
        if (option in this.props()) {
          this.props()[option](config[option]);
        }
      }
    }
    this.getRange(null, null, {interval: this.#time.timeFrameMS, core: this});
    if (this.#range.Length > 1) {
      const rangeStart = calcTimeIndex(this.#time, this.#rangeStartTS);
      const end = (rangeStart) ?
        rangeStart + this.#rangeLimit :
        this.chartData.length - 1;
      const start = (rangeStart) ? rangeStart : end - this.#rangeLimit;
      this.#rangeLimit = end - start;
      this.setRange(start, end);
    }
    const api = {
      ...this.#mediator.api,
      ...{
        id: this.id,
        parent: this.#mediator,
        core: this,
        inCnt: this.inCnt,
        width: this.width,
        width: this.width,
        height: this.height,
        chartBGColour: this.chartBGColour,
        chartTxtColour: this.chartTxtColour,
        chartBorderColour: this.chartBorderColour,
        utilsH: this.utilsH,
        toolsW: this.toolsW,
        timeH: this.timeH,
        scaleW: this.scaleW,
        elements: this.#elements,
        UtilsBar: this.UtilsBar,
        ToolsBar: this.ToolsBar,
        MainPane: this.MainPane,
        WidgetsG: this.WidgetsG,
        Chart: this.Chart,
        chartData: this.chartData,
        offChart: this.offChart,
        onChart: this.onChart,
        datasets: this.datasets,
        rangeLimit: this.rangeLimit,
        range: this.#range,
        updateRange: (pos) => this.updateRange(pos),
        indicators: this.indicators,
        time: this.time,
        settings: this.settings,
      }
    };
    this.#WidgetsG = this.#mediator.register("WidgetsG", Widgets, config, api);
    this.#UtilsBar = this.#mediator.register("UtilsBar", UtilsBar, config, api);
    this.#ToolsBar = this.#mediator.register("ToolsBar", ToolsBar, config, api);
    this.#MainPane = this.#mediator.register("MainPane", MainPane, config, api);
    api.Timeline = this.Timeline;
    api.Chart = this.Chart;
    this.log(`${this.#name} instantiated`);
  }
  start() {
    this.log("...processing state");
    this.#scrollPos = this.bufferPx * -1;
    this.eventsListen();
    this.UtilsBar.start();
    this.ToolsBar.start();
    this.MainPane.start();
    this.WidgetsG.start();
    this.stream = this.#config.stream;
    if (this.#delayedSetRange)
      this.on(STREAM_UPDATE, this.delayedSetRange.bind(this));
    this.refresh();
  }
  end() {
    this.log("...cleanup the mess");
    this.#elTXChart.removeEventListener('mousemove', this.onMouseMove);
    this.off(STREAM_UPDATE, this.onStreamUpdate);
    this.UtilsBar.end();
    this.ToolsBar.end();
    this.MainPane.end();
    this.WidgetsG.end();
    this.#workers.end();
    this.#state = null;
    DOM.findByID(this.id).remove;
  }
  eventsListen() {
    this.#elTXChart.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.on(STREAM_UPDATE, this.onStreamUpdate.bind(this));
  }
  on(topic, handler, context) {
    this.#mediator.on(topic, handler, context);
  }
  off(topic, handler) {
    this.#mediator.off(topic, handler);
  }
  emit(topic, data) {
    this.#mediator.emit(topic, data);
  }
  onMouseMove(e) {
    this.#mousePos.x = e.clientX;
    this.#mousePos.y = e.clientY;
  }
  onStreamUpdate(candle) {
    const r = this.range;
    if (r.inRange(candle[0])) {
      const max = r.valueMax;
      const min = r.valueMin;
      if (candle[2] > max || candle[3] < min) {
        this.setRange(r.indexStart, r.indexEnd);
        this.emit("chart_yAxisRedraw", this.range);
      }
    }
  }
  mount() {
    this.#el.innerHTML = this.defaultNode();
    this.#elTXChart = DOM.findBySelector(`#${this.id}`);
    this.#elUtils = DOM.findBySelector(`#${this.id} .${CLASS_UTILS}`);
    this.#elBody = DOM.findBySelector(`#${this.id} .${CLASS_BODY}`);
    this.#elTools = DOM.findBySelector(`#${this.id} .${CLASS_TOOLS}`);
    this.#elMain  = DOM.findBySelector(`#${this.id} .${CLASS_MAIN}`);
    this.#elYAxis  = DOM.findBySelector(`#${this.id} .${CLASS_YAXIS}`);
    this.#elRows  = DOM.findBySelector(`#${this.id} .${CLASS_ROWS}`);
    this.#elTime  = DOM.findBySelector(`#${this.id} .${CLASS_TIME}`);
    this.#elWidgetsG = DOM.findBySelector(`#${this.id} .${CLASS_WIDGETSG}`);
    this.#elements = {
      elTXChart: this.#elTXChart,
      elUtils: this.#elUtils,
      elBody: this.#elBody,
      elTools: this.#elTools,
      elMain: this.#elMain,
      elRows: this.#elRows,
      elTime: this.#elTime,
      elWidgetsG: this.#elWidgetsG
    };
  }
  props() {
    return {
      userClasses: (classes) => this.setUserClasses(classes),
      width: (width) => this.setWidth(width),
      height: (height) => this.setHeight(height),
      logs: (logs) => this.logs = (isBoolean(logs)) ? logs : false,
      infos: (infos) => this.infos = (isBoolean(infos)) ? infos : false,
      warnings: (warnings) => this.warnings = (isBoolean(warnings)) ? warnings : false,
      errors: (errors) => this.errors = (isBoolean(errors)) ? errors : false,
      rangeStartTS: (rangeStartTS) => this.#rangeStartTS = (isNumber(rangeStartTS)) ? rangeStartTS : undefined,
      rangeLimit: (rangeLimit) => this.#rangeLimit = (isNumber(rangeLimit)) ? rangeLimit : RANGELIMIT,
      indicators: (indicators) => this.#indicators = {...Indicators, ...indicators },
      theme: (theme) => {
        let t = this.addTheme(theme);
        this.setTheme(t.ID);
      },
      stream: (stream) => this.#stream = (isObject(stream)) ? stream : {},
      pricePrecision: (precision) => this.setPricePrecision(precision),
      volumePrecision: (precision) => this.setVolumePrecision(precision),
    }
  }
  getInCnt() {
    return this.#inCnt
  }
  setID(id) {
    if (isString(id))
      this.#id = id + this.#inCnt;
    else
      this.#id = ID + this.#inCnt;
  }
  getID() { return this.#id }
  getModID() { return this.#modID }
  setWidth(w) {
    if (isNumber(w))
      this.#chartW = w;
    else
      this.#chartW = this.#el.parentElement.width;
    this.#elTXChart.style.width = `${this.#chartW}px`;
    this.#elUtils.style.width = `${this.#chartW}px`;
    this.#elBody.style.width = `${this.#chartW}px`;
    this.#elMain.style.width = `${this.#chartW - this.toolsW}px`;
  }
  setHeight(h) {
    if (isNumber(h))
      this.#chartH = h;
    else
      this.#chartH = this.#el.parentElement.clientHeight;
    this.#elTXChart.style.height = `${this.#chartH}px`;
    this.#elBody.style.height = `${this.#chartH - this.utilsH}px`;
    this.#elMain.style.height= `${this.#chartH - this.utilsH}px`;
  }
  setDimensions(w, h) {
    let width = this.width;
    let height = this.height;
    this.setWidth(w);
    this.setHeight(h);
    this.emit("resize", {
      width: this.width,
      height: this.height,
      mainW: this.#MainPane.width,
      mainH: this.#MainPane.height,
      resizeW: w / width,
      resizeH: h / height,
      resizeWDiff: w - width,
      resizeHDiff: h - height
    });
  }
  setUtilsH(h) {
    this.utilsH = h;
    this.#elUtils.style.height = `${h}px`;
  }
  setToolsW(w) {
    this.toolsW = w;
    this.#elTools.style.width = `${w}px`;
  }
    setPricePrecision (pricePrecision) {
    if (!isNumber(pricePrecision) || pricePrecision < 0) {
      pricePrecision = PRICE_PRECISION;
    }
    this.#pricePrecision = pricePrecision;
  }
  setVolumePrecision (volumePrecision) {
    if (!isNumber(volumePrecision) || volumePrecision < 0) {
      volumePrecision = VOLUME_PRECISION;
    }
    this.#volumePrecision = volumePrecision;
  }
  addTheme(theme) {
    return Theme.create(theme, this)
  }
  setTheme(ID) {
    Theme.current = ID;
    let chart = this.theme;
    this.#elTXChart.style.background = chart.Background;
    this.#elTXChart.style.border = `${chart.BorderThickness}px solid ${chart.BorderColour}`;
  }
  setScrollPos(pos) {
    pos = Math.round(pos);
    if (isNumber(pos) && pos <= 0 && pos >= this.bufferPx * -1) this.#scrollPos = pos;
    else {
      this.emit("Error", `setScrollPos: not a valid value`);
    }
  }
  setUserClasses(c) {
    if (isString(c)) {
      let uc = c.split(" ");
      this.#userClasses = uc;
    }
    else if (isArray(c)) {
      this.#userClasses = c;
    }
    else {
      this.warn(`Supplied user classes not valid. Expecting type String or Array`);
    }
    for (let cl of this.#userClasses) {
      classes.add(cl);
    }
  }
  setStream(stream) {
    if (this.stream?.constructor.name == "Stream") {
      this.error("Error: Invoke stopStream() before starting a new one.");
      return false
    }
    else if (isObject(stream)) {
      if (this.allData.data.length == 0 && isString(stream.timeFrame)) {
({tf, ms} = isTimeFrame(stream?.timeFrame));
        this.#time.timeFrame = tf;
        this.#time.timeFrameMS = ms;
      }
      this.#stream = new Stream(this);
      return this.#stream
    }
  }
  stopStream() {
    if (this.stream.constructor.name == "Stream") {
      this.stream.stop();
    }
  }
  delayedSetRange() {
    while (this.#delayedSetRange) {
      let r = this.range;
      let l = Math.floor((r.indexEnd - r.indexStart) / 2);
      this.setRange(l * -1, l);
      this.off(STREAM_UPDATE, this.delayedSetRange);
      this.#delayedSetRange = false;
      this.refresh();
    }
  }
  defaultNode() {
    const STYLE_TXCHART = "overflow: hidden;";
      let STYLE_UTILS = "border-bottom: 1px solid;";
      let STYLE_BODY  = "position: relative;";
    const STYLE_TOOLS = "position: absolute; top: 0; left: 0; height: 100%; min-height: 100%; border-right: 1px solid;";
    const STYLE_MAIN  = "position: absolute; top: 0; height: 100%;";
    if (this.config?.tools?.none) this.toolsW = 0;
    if (this.config?.utils?.none) {
      STYLE_UTILS = "border: none;";
      this.utilsH = 0;
      STYLE_BODY += " margin-top: -1px;";
    }
    const toolsVis = (this.toolsW == 0)? "visibility: hidden;" : "visibility: visible;";
    const utilsVis = (this.utilsH == 0)? "visibility: hidden;" : "visibility: visible;";
    const classesTXChart = CLASS_DEFAULT+" "+this.#userClasses;
    const styleTXChart = STYLE_TXCHART + ` height: ${this.height}px; width: ${this.#chartW}px; background: ${this.chartBGColour}; color: ${this.chartTxtColour};`;
    const styleUtils = STYLE_UTILS + ` height: ${this.utilsH}px; width: ${this.#chartW}px; border-color: ${this.chartBorderColour}; ${utilsVis}`;
    const styleBody = STYLE_BODY + ` height: calc(100% - ${this.utilsH}px); width: ${this.#chartW}px;`;
    const styleTools = STYLE_TOOLS + ` width: ${this.toolsW}px; border-color: ${this.chartBorderColour}; ${toolsVis}`;
    const styleMain = STYLE_MAIN + ` left: ${this.toolsW}px; width: calc(100% - ${this.toolsW}px);`;
    const styleWidgets = ` position: relative;`;
    const styleScale = `position: absolute; top: 0; right: 0; width: ${this.scaleW}px; height: 100%;`;
    const node = `
      <div id="${this.id}" class="${classesTXChart}" style="${styleTXChart}">
        <div class="${CLASS_UTILS}" style="${styleUtils}"></div>
        <div class="${CLASS_BODY}" style="${styleBody}">
          <div class="${CLASS_TOOLS}" style="${styleTools}"></div>
          <div class="${CLASS_MAIN}" style="${styleMain}"></div>
          <div class="${CLASS_YAXIS}" style="${styleScale}"></div>
        </div>
        <div class="${CLASS_WIDGETSG}" style="${styleWidgets}"></div>
      </div>
    `;
    return node
  }
  setClasses(classes) {
  }
  updateRange(pos) {
    let dist, offset, scrollPos;
    offset = 0;
    dist = pos[4];
    scrollPos = this.#scrollPos + dist;
    if (scrollPos < this.bufferPx * -1) {
      scrollPos = 0;
      offset = this.rangeScrollOffset * -1;
      this.offsetRange(offset);
    }
    else if (scrollPos > 0) {
      scrollPos = this.bufferPx * -1;
      offset = this.rangeScrollOffset;
      this.offsetRange(offset);
    }
    this.#scrollPos = scrollPos;
  }
  offsetRange(offset) {
    let start = this.range.indexStart - offset,
        end = this.range.indexEnd - offset;
    this.setRange(start, end);
  }
  getRange(start=0, end=0, config={}) {
    this.#range = new Range(this.allData, start, end, config);
    this.#range.interval = this.#time.timeFrameMS;
    this.#range.intervalStr = this.#time.timeFrame;
    this.#time.range = this.#range;
  }
  setRange(start=0, end=this.rangeLimit) {
    const max = (this.config?.maxCandles)? this.config.maxCandles :
      (this.Chart?.layerWidth) ? this.Chart.layerWidth : this.Chart.width;
    this.#range.set(start, end, max);
  }
  jumpToIndex(start, nearest=true, centre=true) {
    let length = this.range.Length;
    let end = start + length;
    if (nearest) start = limit(start, 0, this.range.dataLength);
    if (centre) {
      start -= length / 2;
      end -= length / 2;
    }
    this.setRange(start, end);
  }
  jumpToTS(ts, nearest=true, centre=true) {
    let start = this.Timeline.xAxis.t2Index(ts);
    this.jumpToIndex(start, nearest=true, centre=true);
  }
  jumpToStart(nearest=true, centre=true) {
    this.jumpToIndex(0, nearest=true, centre=true);
  }
  jumpToEnd(nearest=true, centre=true) {
    let end = this.range.dataLength - this.range.Length;
    if (centre) end += this.range.Length / 2;
    this.jumpToIndex(end, nearest=true, centre=false);
  }
  mergeData(merge, newRange=false) {
    if (!isObject(merge)) return false
    let i, j, start, end;
    const data = this.allData.data;
    const mData = merge?.data;
    const inc = (this.range.inRange(mData[0][0])) ? 1 : 0;
    if (isArray(mData) && mData.length > 0) {
      i = mData.length - 1;
      j = data.length - 1;
      if (data.length == 0) this.allData.data.push(...mData);
      else {
        const r1 = [data[0][0], data[j][0]];
        const r2 = [mData[0][0], mData[i][0]];
        const o = [Math.max(r1[0], r2[0]), Math.min(r1[1], r2[1])];
        if (o[1] >= o[0]) ;
        else {
          this.allData.data.push(...mData);
        }
      }
    }
    if (newRange) {
      if (isObject(newRange)) {
        start = (isNumber(newRange.start)) ? newRange.start : this.range.indexStart;
        end = (isNumber(newRange.end)) ? newRange.end : this.range.indexEnd;
      }
      else {
        if (mData[0][0] )
        start = this.range.indexStart + inc;
        end = this.range.indexEnd + inc;
      }
      this.setRange(start, end);
    }
  }
  resize(width, height) {
    if (!isNumber(width) && !isNumber(height)) return false
    this.setDimensions(width, height);
    return true
  }
  refresh() {
    this.MainPane.draw();
    this.Chart.refresh();
    const offCharts = this.MainPane.offCharts;
    offCharts.forEach((offChart, key) => {
      offChart.refresh();
    });
  }
  notImplemented() {
    if (!this.implemented) {
      let content = `
        This feature is not implemented yet.
      `;
      let config = { content };
      this.implemented = this.#WidgetsG.insert("Dialogue", config);
      this.implemented.start();
    }
    else this.implemented.open();
  }
}

export { TradeXchart as Chart, DOM, TradeXchart as default };
