import * as talib from './node_modules/talib-web/lib/index.esm.js';

// DOM.js
// DOM utilities

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

  // returns true if it is a DOM node
  isNode(o){
    return (
      typeof Node === "object" ? o instanceof Node : 
      o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
    );
  },

  // returns true if it is a DOM element    
  isElement(o){
    return (
      typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
      o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
    );
  },

  // returns true if DOM element is visible
  // source (2018-03-11): https://github.com/jquery/jquery/blob/master/src/css/hiddenVisibleSelectors.js 
  isVisible(o) {
    return !!o && !!( o.offsetWidth || o.offsetHeight || o.getClientRects().length )
  },

  // https://www.javascripttutorial.net/dom/css/check-if-an-element-is-visible-in-the-viewport/
  isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  // https://stackoverflow.com/a/41698614/15109215
  isVisibleToUser(el) {
    if (!(el instanceof Element)) throw Error('DomUtil: el is not an element.');
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
    el1Location = this.elementDimPos(el1);
    el2Location = this.elementDimPos(el2);

    // fail if either are not elements
    if (!el1Location || !el2Location) return false

    return {
      x: el1Location.top - el2Location.top,
      y: el1Location.left . el2Location.left,
      el1Location: el1Location,
      el2Location: el2Location,
    }
  },

  /**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
  htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
  },

  /**
 * @param {String} HTML representing any number of sibling elements
 * @return {NodeList} 
 */
  htmlToElements(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.childNodes;
  },

  //  https://stackoverflow.com/a/3028037/15109215
  hideOnClickOutside(el) {
    const outsideClickListener = event => {
      if (!el.contains(event.target) && this.isVisible(el)) { 
      // or use: event.target.closest(selector) === null
      // if (event.target.closest(selector) === null) {
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
    const outsideClickListener = event => {
      if (!el.contains(event.target) && DOM.isVisible(el)) { 
      // or use: event.target.closest(selector) === null
      // if (event.target.closest(selector) === null) {
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

/**
 * @param value
 * @return {boolean}
 */
 function isArray (value) {
  return Array.isArray(value)
}

/**
 * @param {*} value
 * @return {boolean}
 */
function isFunction (value) {
  return value && typeof value === 'function'
}

/**
 * @param {*} value
 * @return {boolean}
 */
function isObject (value) {
  return (
  typeof value === 'object' &&
  !Array.isArray(value) &&
  value !== null)
}

/**
 * @param value
 * @returns {boolean}
 */
function isNumber (value) {
  return typeof value === 'number' && !isNaN(value)
}

/**
 * @param value
 * @returns {boolean}
 */
function isBoolean (value) {
  return typeof value === 'boolean'
}

/**
 * @param value
 * @return {boolean}
 */
function isString (value) {
  return typeof value === 'string'
}

/**
 * Deep merge two objects.
 * https://gist.github.com/ahtcx/0cd94e62691f539160b32ecda18af3d6?permalink_comment_id=2930530#gistcomment-2930530
 * @param {object} target
 * @param {object} source
 * @returns {object}
 */
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

/**
 * Deep copy an object - no shared object references
 * https://stackoverflow.com/a/122190/15109215
 *
 * @export
 * @param {object} obj
 * @return {object}  
 */
function copyDeep(obj) {
  if (obj === null || typeof (obj) !== 'object' || 'isActiveClone' in obj)
      return obj;

  if (obj instanceof Date)
      var temp = new obj.constructor(); //or new Date(obj);
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

function uid(tag="id") {
  if (!isString(tag)) tag = "ID";
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

// stateMachine.js

class StateMachine {

  #id
  #state
  #statePrev
  #context
  #config
  #mediator
  #status = "stopped"
  #event
  #eventData
  #actions
  #statuses = ["await", "idle", "running", "stopped"]

  constructor(config, mediator) {
    this.#id = config.id;
    this.#config = config;
    this.#state = config.initial;
    this.#context = config.context;
    this.#actions = config.actions;
    this.#mediator = mediator;

    if (!StateMachine.validateConfig) return false

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

    // null event - immediately transition (transient transition)
    if ( this.#config.states[destState]?.on
      && (this.#config.states[destState].on[''] 
      || this.#config.states[destState].on?.always) ) {

        const transient
          = this.#config.states[destState].on[''] 
          || this.#config.states[destState].on.always;

        // Do we have an array of conditions to check?
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
        // otherwise if only one condition
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

  #subscribe() {
    const events = new Set();

    for (let state in this.#config.states) {
      for (let event in this.#config.states[state].on) {
        events.add(event);
      }
    }

    for (let event of events) {
      this.#mediator.on(event, (data) => {this.notify(event, data);}, this.context);
    }
  }

  static validateConfig(c) {
    if (!isObject(c)) return false

    const required = ["id", "initial", "context", "states"];
      let keys = Object.keys(c);

    if (!isArrayEqual(required, keys)) return false

    if (!(c.initial in c.states)) return false

    for (state in c.states) {
      if ("onEnter" in c.states[state] && !isFunction(c.states[state])) return false
      if ("onExit" in c.states[state] && !isFunction(c.states[state])) return false
      if ("on" in c.states[state]) {
        for (let event of c.states[state].on) {
          if (!isString(event.target)) return false
          if ("action" in event && !isFunction(event.action)) return false
        }
      }
    }

    return true
  }

}

// mediator.js

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

    // Check that module has required methods
    const required = ['constructor','start','end',"name","shortName","mediator","options"];
    const target = Object.getOwnPropertyNames(modClass.prototype);
    const intersection = required.filter(x => target.includes(x));

    // Check that module has required properties
    // const propertiesToTest = ["name","shortName","mediator","options"];
    // const hasProperties = (propertiesToTest.every(function(x) { return x in modClass })) 

    let name = modClass.prototype.constructor.name;
    // check that module is in the (fundamental) permitted list
    // for modules that are fixed features of the project
    if ("permittedClassNames" in api && !api?.permittedClassNames.includes(name))
      // or check that module conforms to the naming convention
      // for modules that are 3rd party 
      // or dynamically added in the project lifecycle
      name = name.match(/^module_\s*([$A-Z_][0-9A-Z_$]*)/i);

    // does the module class validate?
    this.valid = 
      // has required methods?
      (required.length === intersection.length)
      // has required properties?
      // && hasProperties 
      // has a valid class name?
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

  /**
   * Provision for modules to spawn other modules
   *
   * @param {String} id
   * @param {Class} newModule
   * @param {Object} options - initial provided configuration
   * @param {Object} api - functions / methods, calculated properties
   * @return {Instance}  
   * @memberof Mediator
   */
  register(id, newModule, options, api) {

    const instance = this.#core.register(id, newModule, options, api);

    // track child modules instantiated by this module
    this.#subModules[instance.modID] = instance;
    return instance
  }

  /** Subscribe to a topic
  *
  * @param {String} topic      - The topic name
  * @param {Function} callback - The function that is called if another module
  *                              publishes to the specified topic
  * @param {Object}  context   - The context the function(s) belongs to
  */
  on(topic, handler, context) {
    if (!this.#hub[topic]) this.#hub[topic] = [];
    this.#hub[topic].push({handler, context});
  }

  /** Unsubscribe from a topic
  *
  * @param {String} topic - The topic name
  * @param {Function} cb  - The function that is called if an other module
  *                         publishes to the specified topic
  */
  off(topic, handler) {
    const i = (this.#hub[topic] || []).findIndex(h => h === handler);
    if (i > -1) this.#hub[topic].splice(i, 1);
    if (this.#hub[topic].length === 0) delete this.#hub[topic];
  }

  /** Publish an topic
  *
  * @param {String} topic - The topic name
  * @param {Object}  data - The data to publish
  */
  emit(topic, data) {
    (this.#hub[topic] || []).forEach(cb => cb.handler.call(cb.context, data));

    // (this.#hub[topic] || []).forEach(cb => cb.handler(data));
  }

  /** Execute a task
  *
  * @param {String} channel - The topic name
  * @param {Object} data    - The data that gets published
  * @param {Function} cb    - callback method
  */
  execute(channel, data, cb) {

  }


}

/**
 * A simple AOP implementation for JavaScript
 * V2.0.4
 * https://github.com/pford68/aspectjs
 *
 * @author Philip Ford
 */

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
              let result = adviser.apply(advised, arguments);		    // Invoke the advice.
              result = result && !transfer ? [result] : null;
              return $execute.apply(advised, result || arguments);	// Call the original function.
          };
          break;
      case 'after':
          f = function () {
              Array.prototype.push.call(arguments, args);
              let result = $execute.apply(advised, arguments);	// Call the original function and store the result.
              result = result && !transfer ? [result] : null;
              return adviser.apply(advised, result || arguments);				// Invoke the advice.
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




/*
Advisor class
*/
function Advisor(type, advised, advisedFunc = null){
  this.type = type;
  this.advised = advised;
  this.advisedMethod = advisedFunc;
  Object.freeze(this);
}
/**
* Applies advice
*
* @param adviser
* @param method
* @param transfer - pass result along 
* @param bound - values exclusively for the adviser
* @returns {*}
*/
Advisor.prototype.add = function(adviser, method = null, transfer = true, args){

  adviser = method ? adviser[method].bind(adviser) : adviser;
  if (typeof adviser !== 'function') {
      throw new TypeError("[aop] An adviser function is required in addAdvice.");
  }
  return weave(this.type, this.advised, this.advisedMethod, { adviser: adviser, transfer: transfer, args: args });
};
Object.freeze(Advisor.prototype);  // Freezing all copies


//======================================================================== Public methods
var aspect = {

  /**
   * Adds before advice to the specified method/function. Returns an object containing an
   * add() method.  Once add() is called, the advice is applied.  The new wrapped function
   * is returned form add().
   *
   * @param advised
   * @param advisedFunc
   * @returns {Advisor}
   */
  before: function (advised, advisedFunc = null) {
      return new Advisor('before', advised, advisedFunc);
  },

  /**
   * Adds after advice to the specified method/function. Returns an object containing an
   * add() method.  Once add() is called, the advice is applied.  The new wrapped function
   * is returned form add().
   *
   * @param advised
   * @param advisedFunc
   * @returns {Advisor}
   */
  after: function (advised, advisedFunc) {
      return new Advisor('after', advised, advisedFunc);
  },

  /**
   * Adds around advice to the specified method/function. Returns an object containing an
   * add() method.  Once add() is called, the advice is applied.  The new wrapped function
   * is returned form add().
   *
   * @param advised
   * @param advisedFunc
   * @returns {Advisor}
   */
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

    // process options
    if (isObject(options)) {
      for (const option in options) {
        if (option in this.props()) {
          this.props()[option](options[option]);
        }
      }
    }

  }

  // process and return only the options required for the Core
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

  /**
   * Register and create a new module by providing it with a Mediator
   * which acts as a proxy to the Core, presenting a select API (Facade)
   *
   * @param {String} id
   * @param {Class} newModule
   * @param {Object} options - initial provided configuration
   * @param {Object} api - functions / methods, calculated properties
   * @return {Instance}  
   * @memberof Core
   */
  register(id, newModule, options, api) {
    ++this.#modCnt;
    let instance = new Mediator(this, api, newModule, options);
    if (instance.constructor.name === "Mediator") {
      throw new Error("module failed")
    }
    aspect.before(instance, "start").add(this, "beforeModStart", false, id);
    
    // ensure module IDs are unique
    const modID = (isString(id)) ? `${id}_${this.#modCnt}` : `${this.#modCnt}`;

    instance.modID = modID;
    this.#modules[modID] = instance;
    return instance
  }

  // // https://stackoverflow.com/questions/61178885/dynamically-extending-a-class-in-javascript
  // extend(superclass, construct) {
  //   return class extends superclass {
  //       constructor(...args) {
  //           let _super = (...args2) => {
  //               super(...args2)
  //               return this;
  //           };
  //           construct(_super, ...args);
  //       }
  //   };
  // }

  beforeModStart() {
    const id = arguments[arguments.length - 1];
    this.#running[id] = this.#modules[id];
    this.log(`module ${id} is running`);
  }

  hookMountsAdd(targetObject, targetMethod) {

  }

  hookMount() {
    // hooks = () => {
      // for (const hook of hooks.prototype.hooks) {
      //   hook(...arguments)
      // }
    // }
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

/**
 * Global
 */
const GlobalStyle = {
  COLOUR_BG: "#141414",
  COLOUR_BORDER: "#666",
  COLOUR_TXT: "#CCC",
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

const CandleStyle = {
  COLOUR_CANDLE_UP: "#00F04088",
  COLOUR_CANDLE_DN: "#F0004088",
  COLOUR_WICK_UP: "#0F4",
  COLOUR_WICK_DN: "#F04",

};

const VolumeStyle = {
  COLOUR_VOLUME_UP: "#00F04088",
  COLOUR_VOLUME_DN: "#F0004088",
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
  FONT_LABEL: `${YAxisStyle_FONTWEIGHT} ${YAxisStyle_FONTSIZE}px ${YAxisStyle_FONTFAMILY}`
};

const XAxisStyle_FONTWEIGHT = "normal";
const XAxisStyle_FONTSIZE = 12;
const XAxisStyle_FONTFAMILY = "Arial";

const XAxisStyle = {
  COLOUR_TICK: "#888",
  COLOUR_LABEL: "888",
  FONTFAMILY: XAxisStyle_FONTFAMILY,
  FONTSIZE: XAxisStyle_FONTSIZE,
  FONTWEIGHT: XAxisStyle_FONTWEIGHT,
  FONT_LABEL: `${XAxisStyle_FONTWEIGHT} ${XAxisStyle_FONTSIZE}px ${XAxisStyle_FONTFAMILY}`
};

const GridStyle = {
  COLOUR_GRID: "#333"
};

const PriceLineStyle = {
  lineWidth: 1,
  strokeStyle: "#ccc",
  lineDash: [1,1]
};

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

// icons.js

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
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2 6.5A2.5 2.5 0 0 1 6.95 6H24v1H6.95A2.5 2.5 0 0 1 2 6.5zM4.5 15a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2 16.5a2.5 2.5 0 0 1 4.95-.5h13.1a2.5 2.5 0 1 1 0 1H6.95A2.5 2.5 0 0 1 2 16.5zM22.5 15a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-18 6a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2 22.5a2.5 2.5 0 0 1 4.95-.5H24v1H6.95A2.5 2.5 0 0 1 2 22.5z"></path><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M22.4 8.94l-1.39.63-.41-.91 1.39-.63.41.91zm-4 1.8l-1.39.63-.41-.91 1.39-.63.41.91zm-4 1.8l-1.4.63-.4-.91 1.39-.63.41.91zm-4 1.8l-1.4.63-.4-.91 1.39-.63.41.91z"></path></svg>`;
const text = 
  `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M231.359 147l-80.921 205h45.155l15.593-39.5h89.628l15.593 39.5h45.155l-80.921-205zm-3.594 123.5L256 198.967l28.235 71.533z"></path><path d="M384 56H128V16H16v112h40v256H16v112h112v-40h256v40h112V384h-40V128h40V16H384zM48 96V48h48v48zm48 368H48v-48h48zm288-40H128v-40H88V128h40V88h256v40h40v256h-40zm80-8v48h-48v-48zM416 48h48v48h-48z"></path></svg>`;

// utils.js

var utilsList = [
  {
    id: "indicators",
    name: "Indicators", 
    icon: chart, 
    event: "utils_indicators",
    sub: [],
    // action: (e, mediator) => {
    //   mediator.emit("utils_indicators", e)
    // }
  },
  {
    id: "timezone",
    name: "Timezone", 
    icon: clock, 
    event: "utils_timezone",
    // action: (e, mediator) => {
    //   mediator.emit("utils_timezone", e)
    // }
  },
  {
    id: "screenshot",
    name: "Screenshot", 
    icon: camera, 
    event: "utils_screenshot",
    // action: (e, mediator) => {
    //   mediator.emit("utils_screenshot", e)
    // }
  },
  {
    id: "settings",
    name: "Settings", 
    icon: config, 
    event: "utils_settings",
    // action: (e, mediator) => {
    //   mediator.emit("utils_settings", e)
    // }
  },

  // {name: "Save", icon: "./assets/svg/", event: "utils_save", action: () => {}},
  // {name: "Load", icon: "./assets/svg/", action: () => {}},
  // {name: "Refresh", icon: "./assets/svg/", action: () => {}},
];

/**
 * Filled rectangle
 * @param ctx
 * @param style
 * @param x
 * @param y
 * @param width
 * @param height
 */
function renderFillRect (ctx, x, y, width, height, style) {
  ctx.fillStyle = style;
  ctx.fillRect(x, y, width, height);
}

// path.js
/**
 * Draw a path
 * @param ctx
 * @param coordinates
 * @param strokeFill
 */
function renderPath (ctx, coordinates, style, strokeFill) {
  ctx.save();
  ctx.lineWidth = style.lineWidth || 1;
  if (ctx.lineWidth % 2) {
    ctx.translate(0.5, 0.5);
  }
  ctx.strokeStyle = style.strokeStyle;

  if ("lineDash" in style) ctx.setLineDash(style.lineDash);
  
  ctx.beginPath();
  let move = true;
  coordinates.forEach(coordinate => {
    if (coordinate && coordinate.x !== null) {
      if (move) {
        ctx.moveTo(coordinate.x, coordinate.y);
        move = false;
      } else {
        ctx.lineTo(coordinate.x, coordinate.y);
      }
    }
  });
  strokeFill();
  ctx.restore();
}

// line.js

/**
 * Draw a horizontal straight line
 * @param ctx
 * @param y
 * @param left
 * @param right
 */
function renderHorizontalLine (ctx, y, left, right, style) {
  const coordinates = [{x:left, y:y}, {x:right, y:y}];
  renderPath(ctx, coordinates, style, () => {
    ctx.stroke();
    ctx.closePath();
  });
}

/**
 * Render line - open path
 * @param ctx
 * @param coordinates
 */
function renderLine (ctx, coordinates, style) {
  renderPath(ctx, coordinates, style, () => {
    ctx.stroke();
    ctx.closePath();
  });
}

// indicator.js

class indicator {

  #target
  #scene
  #config
  #xAxis
  #yAxis
  #indicator
  #type

  constructor(target, xAxis, yAxis, config) {

    this.#target = target;
    this.#scene = target.scene;
    this.#config = config;
    this.#xAxis = xAxis;
    this.#yAxis = yAxis;
    this.#indicator = config.indicator;
    this.#type = config.type;
  }

  get target() { return this.#target }
  get scene() { return this.#scene }
  get xAxis() { return this.#xAxis }
  get yAxis() { return this.#yAxis }
  get type() { return this.#type }
  get indicator() { return this.#indicator }


  plot(plots, type, style) {

    const ctx = this.#scene.context;
    ctx.save();

    switch(type) {
      case "renderLine": renderLine(ctx, plots, style);
      case "renderFillRect": renderFillRect(ctx, plots[0], plots[1], plots[2], plots[3], style);
    }

    ctx.restore();
  }
}

// definitions/chart.js

const SECOND = 1000;
const MINUTE = SECOND * 60;

const DEFAULT_TIMEFRAME = "1m";
const DEFAULT_TIMEFRAMEMS = MINUTE;

const PRICEDIGITS$1 = 6;

const XAXIS_ZOOM$1 = 0.05;

const YAXIS_STEP = 100;
const YAXIS_GRID = 16;
const YAXIS_TYPES = ["default", "percent", "log"];
const YAXIS_BOUNDS = 0.005;

const LIMITFUTURE = 200;
const LIMITPAST = 200;
const MINCANDLES = 20;
const MAXGRADSPER = 100;
const BUFFERSIZE$1 = 20;  // %

const ROWMINHEIGHT = 50; // px
const OFFCHARTDEFAULTHEIGHT = 30; // %
const DIVIDERHEIGHT = 8; // px

// number.js

// Getting a random integer between two values
// inclusive of the minimum, exclusive of the maximum
function getRandomIntBetween(min, max) {
  min = Math.ceil(min) + 1;
  max = Math.floor(max);
  //The maximum is exclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min) + min); 
}

/**
 *
 *
 * @export
 * @param {number} value
 * @return {number}  
 */
function countDigits(value) {
  const digits = {};
  digits.value = value;
  digits.sign = (!value) ? false : true;
  digits.integers = numDigits(value);
  digits.decimals = precision(value);
  digits.total = digits.integers + digits.decimals;
  return digits
}

/**
 * count integer digits
 * bitwise operations in JavaScript only work with 32-bit values (so a max of 2,147,483,647)
 * @export
 * @param {Number} value
 * @return {Number}  
 */
function numDigits(value) {
  return (Math.log10((value ^ (value >> 31)) - (value >> 31)) | 0) + 1;
}

/**
 * truncate floating point, works for positives as well as negatives
 * @export
 * @param {Number} value
 * @return {Number}  
 */
function float2Int(value) {
  return value | 0
}


/**
 * round to precision - fastest
 * @param value
 * @param precision
 * @return {number}
 */
 function round (n, p) {
	p = p || 100;
  const d = Math.pow(10, p);
  return Math.round((n + Number.EPSILON) * d) / d;
}


/**
 * Get the number of decimal places
 * fastest method
 * @export
 * @param {number} value
 * @return {number}  
 */
function precision(value) {
  if (typeof value !== "number") value = parseFloat(value); 
  if (isNaN(value)) return 0;
  if (!isFinite(value)) return 0;
  var e = 1, p = 0;
  while (Math.round(value * e) / e !== value) { e *= 10; p++; }
  return p;
}

/**
 * log base 10
 * @param value
 * @return {number}
 */
function log10 (value) {
  return Math.log(value) / Math.log(10)
}

function power (base, exponent) {
  return Math.pow(base, exponent)
}

/**
 * limit number to a range
 * @param {number} val
 * @param {number} min
 * @param {number} max
 * @return {number}  
 */
function limit(val, min, max) {
  return Math.min(max, Math.max(min, val));
}

/**
 * EMA
 */
 
 class EMA extends indicator {
  name ='Exponential Moving Average'
  shortName = 'EMA'
  onChart = true
  series = 'price'
  calcParams = [6, 12, 20]
  precision = 2
  shouldCheckParamCount = false
  shouldOhlc = true
  plots = [
    { key: 'ema6', title: 'EMA6: ', type: 'line' },
    { key: 'ema12', title: 'EMA12: ', type: 'line' },
    { key: 'ema20', title: 'EMA20: ', type: 'line' }
  ]
  defaultStyle = {
    strokeStyle: "#C80",
    lineWidth: '1'
  }
  style = {}
  overlay
  TALib

  // YAXIS_TYPES - default
  static scale = YAXIS_TYPES[0]


  /**
   * Creates an instance of RSI.
   * @param {object} target - canvas scene
   * @param {object} overlay - data for the overlay
   * @param {instance} xAxis - timeline axis
   * @param {instance} yAxis - scale axis
   * @param {object} config - theme / styling
   * @memberof RSI
   */
  constructor(target, overlay, xAxis, yAxis, config) {
    super(target, xAxis, yAxis, config);

    this.overlay = overlay;
    this.style = config.style || this.defaultStyle;
    this.TALib = xAxis.mediator.api.core.TALib;
  }

  calcIndicator(input) {
    this.overlay.data = this.TALib.EMA(input);
  }






  regeneratePlots (params) {
    return params.map(p => {
      return { key: `ema${p}`, title: `EMA${p}: `, type: 'line' }
    })
  }

  calcTechnicalIndicator (dataList, { params, plots }) {
    let closeSum = 0;
    const emaValues = [];
    return dataList.map((kLineData, i) => {
      const ema = {};
      const close = kLineData.close;
      closeSum += close;
      params.forEach((p, index) => {
        if (i >= p - 1) {
          if (i > p - 1) {
            emaValues[index] = (2 * close + (p - 1) * emaValues[index]) / (p + 1);
          } else {
            emaValues[index] = closeSum / p;
          }
          ema[plots[index].key] = emaValues[index];
        }
      });
      return ema
    })
  }

  draw(range) {
    this.scene.clear();

    const data = this.overlay.data;
    const width = round(this.scene.width / range.Length, 1);
    const plots = [];
    const offset = this.xAxis.smoothScrollOffset || 0;
    const plot = {
      x: (width * 0.5) + 2 + offset - (width * 2),
      w: width,
    };

    // account for "missing" entries because of indicator calculation
    let o = (range.indexStart - 1 < 0) ? 0 : 2;
    let c = range.indexStart - (range.data.length - this.overlay.data.length) - o;
    let i = range.Length + o + 1;

    while(i) {
      if (c < 0 || c >= this.overlay.data.length) {
        plots[range.Length + o + 1 - i] = {x: null, y: null};
      }
      else {
        plot.y = this.yAxis.yPos(100 - data[c][1]);
        plots[range.Length + o + 1 - i] = {...plot};
      }
      c++;
      i--;
      plot.x = plot.x + plot.w;
    }

    this.plot(plots, "renderLine", this.style);

    this.target.viewport.render();
  }
}

// RSI.js

class RSI extends indicator {
  name = 'Relative Strength Index'
  shortName = 'RSI'
  onChart = false
  calcParams = [20]
  checkParamCount = false
  plots = [
    { key: 'RSI_1', title: ' ', type: 'line' },
  ]
  defaultStyle = {
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
  style = {}
  overlay
  TALib

  // YAXIS_TYPES - percent
  static scale = YAXIS_TYPES[1]


  /**
   * Creates an instance of RSI.
   * @param {object} target - canvas scene
   * @param {object} overlay - data for the overlay
   * @param {instance} xAxis - timeline axis
   * @param {instance} yAxis - scale axis
   * @param {object} config - theme / styling
   * @memberof RSI
   */
  constructor(target, overlay, xAxis, yAxis, config) {
    super(target, xAxis, yAxis, config);

    this.overlay = overlay;
    this.style = {...this.defaultStyle, ...config.style};
    this.TALib = xAxis.mediator.api.core.TALib;
  }

  calcIndicator(input) {
    this.overlay.data = this.TALib.EMA(input);
  }

  regeneratePlots (params) {
    return params.map((_, index) => {
      const num = index + 1;
      return { key: `rsi${num}`, title: `RSI${num}: `, type: 'line' }
    })
  }

  calcTechnicalIndicator (dataList, { params, plots }) {
    const sumCloseAs = [];
    const sumCloseBs = [];
    return dataList.map((kLineData, i) => {
      const rsi = {};
      const preClose = (dataList[i - 1] || kLineData).close;
      const tmp = kLineData.close - preClose;
      params.forEach((p, index) => {
        if (tmp > 0) {
          sumCloseAs[index] = (sumCloseAs[index] || 0) + tmp;
        } else {
          sumCloseBs[index] = (sumCloseBs[index] || 0) + Math.abs(tmp);
        }
        if (i >= p - 1) {
          if (sumCloseBs[index] !== 0) {
            rsi[plots[index].key] = 100 - (100.0 / (1 + sumCloseAs[index] / sumCloseBs[index]));
          } else {
            rsi[plots[index].key] = 0;
          }
          const agoData = dataList[i - (p - 1)];
          const agoPreData = dataList[i - p] || agoData;
          const agoTmp = agoData.close - agoPreData.close;
          if (agoTmp > 0) {
            sumCloseAs[index] -= agoTmp;
          } else {
            sumCloseBs[index] -= Math.abs(agoTmp);
          }
        }
      });
      return rsi
    })
  }

  draw(range) {
    this.scene.clear();

    const data = this.overlay.data;
    const width = this.xAxis.candleW;
    const x2 = this.scene.width + (this.xAxis.bufferPx * 2);
    const y1 = this.yAxis.yPos(100 - this.style.defaultHigh);
    const y2 = this.yAxis.yPos(100 - this.style.defaultLow);

    // Fill the range between high and low
    const plots = [0, y1, this.scene.width, y2 - y1];
    let style = this.style.highLowRangeStyle;
    this.plot(plots, "renderFillRect", style);

    // High RSI Range marker
    plots.length = 0;
    plots[0] = {x: 0, y: y1};
    plots[1] = {x: x2, y: y1};
    style = {
      lineWidth: this.style.highLowLineWidth,
      strokeStyle: this.style.highStrokeStyle,
      dash: [5, 5]
    };
    this.plot(plots, "renderLine", style);

    // Low RSI Range marker
    plots.length = 0;
    plots[0] = {x: 0, y: y2};
    plots[1] = {x: x2, y: y2};
    style = {
      lineWidth: this.style.highLowLineWidth,
      strokeStyle: this.style.lowStrokeStyle,
      dash: [5, 5]
    };
    this.plot(plots, "renderLine", style);

    // RSI plot
    plots.length = 0;
    const offset = this.xAxis.smoothScrollOffset || 0;
    const plot = {
      x: (width * 0.5) + 2 + offset - (width * 2),
      w: width,
    };

    // account for "missing" entries because of indicator calculation
    let o = this.xAxis.rangeScrollOffset;
    let c = range.indexStart - (range.data.length - this.overlay.data.length) - o - 1;
    let i = range.Length + o + 3;

    while(i) {
      if (c < 0 || c >= this.overlay.data.length) {
        plots[range.Length + o + 1 - i] = {x: null, y: null};
      }
      else {
        plot.y = this.yAxis.yPos(100 - data[c][1]);
        plots[range.Length + o + 1 - i] = {...plot};
      }
      c++;
      i--;
      plot.x = plot.x + plot.w;
    }

    this.plot(plots, "renderLine", this.style);

    this.target.viewport.render();
  }
}

// inidicators.js

var Indicators = {
  ADX: {id: "ADX", name: "Average Direction", event: "addIndicator"},
  BB: {id: "BB", name: "Bollinger Bands", event: "addIndicator", ind: ""},
  EMA: {id: "EMA", name: "Exponential Moving Average", event: "addIndicator", ind: EMA},
  DMI: {id: "DMI", name: "Directional Movement", event: "addIndicator", },
  RSI: {id: "RSI", name: "Relative Strength Index", event: "addIndicator", ind: RSI},
};

// utils.js


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

    // set up event listeners
    this.eventsListen();
  }

  end() {
    // remove event listeners
    const api = this.#mediator.api;
    const utils = DOM.findBySelectorAll(`#${api.id} .${CLASS_UTILS} .icon-wrapper`);

    for (let util of utils) {
      for (let u of this.#utils) {
        if (u.id === id)
          util.removeEventListener("click", this.onIconClick);
      }
    }
  }

  eventsListen() {
    this.on("utils_indicators", (e) => { this.onIndicators(e); });
    this.on("utils_timezone", (e) => { this.onTimezone(e); });
    this.on("utils_settings", (e) => { this.onSettings(e); });
    this.on("utils_screenshot", (e) => { this.onScreenshot(e); });
    // this.on("resize", (dimensions) => this.onResize.bind(this))

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
    // let utilsBar = ""
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

////////////////////////////////////////////////////////////////////////////////
// js-input-control
// A lightweight library to handle the mouse, keyboard and touch control.
//
// MIT License (C) 2015-2020 Jingwood, unvell.com, all rights reserved.
////////////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////////////

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

    // current mouse position
    this.position = new Point();

    // amount of mouse movement difference
    this.movement = new Point();
    this.firstMovementUpdate = true;

    // draging start and end position
    this.dragstart = new Point();
    this.dragend = new Point();
    this.dragCheckThreshold = 3;

    // mouse wheel
    this.wheeldelta = 0;

    // current pressed mouse buttons
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

      // FIXME: first drag doesn't pass correct movement
      
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

  // TODO: use stack
  setCursor(type) {
		this.element.style.cursor = type;
	}
}

////////////////////////////////////////////////////////////////////////////////

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

// if (!Array.prototype._t_arrayIndexOf) {
// 	Object.defineProperty(Array.prototype, "_t_arrayIndexOf", {
// 		value: function(element) {
// 			for (var i = 0; i < this.length; i++) {
// 				var item = this[i];
		
// 				if (item === element) {
// 					return i;
// 				}
// 			}
		
// 			return -1;
// 		},
// 		enumerable: false
// 	});
// }

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

// if (!Array.prototype._t_any) {
// 	Object.defineProperty(Array.prototype, "_t_any", {
// 		value: function(handler) {
// 			for (var i = 0; i < this.length; i++) {
// 				var item = this[i];
		
// 				if (handler(item)) {
// 					return true;
// 				}
// 			}
// 		}
// 	});
// }

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

////////////////////////////////////////////////////////////////////////////////

class EventDispatcher {
  constructor(cstor) {
    if (!cstor) {
      throw Error("Object to define events cannot be null or undefined");
    }

    this.cstor = cstor;

    // copy event defines from prototype of target object
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
    
    // addEventListener
    proto.addEventListener = addEventListener;

    // if (typeof proto.on !== "function") {
      proto.on = proto.addEventListener;
    // }

    // if (typeof proto.raiseEvent !== "function") {
      proto.raiseEvent = raiseEvent;
    // }

    // removeEventListener
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
    
    // define event property
    Object.defineProperty(proto, "on" + name, {
      
      get: function() {
        return function() {
          return raiseEvent.call(this, name, ...arguments);
        }
      },

      set: function(listener) {
        // if assign listener to an event, clear all current registered events
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

////////////////////////////////////////////////////////////////////////////////
// js-input-control
// A lightweight library to handle the mouse, keyboard and touch control.
//
// MIT License (C) 2015-2020 Jingwood, unvell.com, all rights reserved.
////////////////////////////////////////////////////////////////////////////////

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

    // hotkey
    // window.addEventListener("keydown", e => {
    //   const arg = this.createEventArgument(e);
     
    //   if (arg.isHotkey) {
    //     controller.raise(this, "hotkey", arg);
    //   }

    //   if (arg.isProcessed) {
    //     e.preventDefault();
    //     return false;
    //   }
    // });

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

////////////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////////////

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
    // this.touchAgent.createEventArgument(arg);
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

// tool.js


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
    // this.#controller.removeEventListener("mousemove", this.onMouseMove);
    // this.#controller.removeEventListener("mouseenter", this.onMouseEnter);
    // this.#controller.removeEventListener("mouseout", this.onMouseOut);

    // this.off("main_mousemove", this.onMouseMove)

    // progress state from active to idle
  }

  eventsListen() {
    // create controller and use 'on' method to receive input events 
    this.#controller = new InputController(this.#elCanvas, {disableContextMenu: false});

    // move event
    this.#controller.on("mousemove", this.onMouseMove.bind(this));
    // // enter event
    // this.#controller.on("mouseenter", this.onMouseEnter.bind(this));
    // // out event
    // this.#controller.on("mouseout", this.onMouseOut.bind(this));

    // // listen/subscribe/watch for parent notifications
    // this.on("main_mousemove", (pos) => this.updateLegends(pos))
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
    // this.#cursorPos = [e.layerX, e.layerY]
    this.#cursorPos = [Math.floor(e.position.x), Math.floor(e.position.y)];

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

// fibonacci


class Fibonacci extends Tool {

  constructor(config) {
    super(config);
  }

}

// line.js

// import tinycolor from 'tinycolor2';


class Line extends Tool {

  #colour = lineConfig.colour
  #lineWidth = lineConfig.lineWidth

  constructor(config) {
    super(config);
  }

  set colour(colour=this.#colour) {
    // const c = tinycolor(colour)
    // this.#colour = (c.isValid()) ? colour : this.#colour
    this.#colour = colour;
  }
  get colour() { return this.#colour }
  set lineWidth(width) { this.#lineWidth = (isNumber(width)) ? width : this.#lineWidth; }
  get lineWidth() { return this.#lineWidth }

  start() {
    this.eventsListen();
    // // start State Machine 
    // stateMachineConfig.context.origin = this
    // this.#mediator.stateMachine = stateMachineConfig
    // this.#mediator.stateMachine.start()
    // this.emit(`tool_start`, this.ID)
    // // progress state from idle to active
    // this.#mediator.stateMachine.notify(`tool_${this.#name}_start`, this.ID)

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

// measure.js


class Measure extends Tool {

  constructor(config) {
    super(config);
  }

}

// range.js


class Range extends Tool {

  constructor(config) {
    super(config);
  }

}

// text.js


class Text extends Tool {

  constructor(config) {
    super(config);
  }

}

// tools.js

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
    sub: []
  },
  {
    id: "range",
    name: "Range",
    icon: range,
    event: "tool_activated",
    class: Range,
    sub: []
  },
  {
    id: "text",
    name: "Text",
    icon: text,
    event: "tool_activated",
    class: Text,
    sub: []
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

// BTC Genesis Block: 03/01/2009, 19:15:05
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

/**
 * Timestamp difference in multiple units
 *
 * @param {timestamp} date1 - milliseconds
 * @param {timestamp} date2 - milliseconds
 * @return {object}  
 */
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


/**
 * Milliseconds broken down into major unit and remainders
 *
 * @export
 * @param {number} milliseconds
 * @return {object}  
 */
function ms2TimeUnits( milliseconds ) {
  // let years, months, _weeks, weeks, days, hours, minutes, seconds;
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
  // accumulative extra days of months (28 days) 
  // in 1 year (365 days) = 29 days
  // thus...
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

/**
 * day number of the month
 *
 * @param {timestamp} t - timestamp ms
 * @return {number} - day number of the month
 */
 function get_day(t) {
  return t ? new Date(t).getUTCDate() : null
}

function get_dayName(t, locale="en-GB", len="short") {
  return new Date(t).toLocaleDateString(locale, {weekday: len})
}

/**
 * Start of the day (zero millisecond)
 *
 * @param {timestamp} t - timestamp ms
 * @return {timestamp} - timestamp ms
 */
 function day_start(t) {
  return new Date(t).setUTCHours(0,0,0,0)
}

/**
 * month number of the year
 *
 * @param {timestamp} t - timestamp ms
 * @return {number} - month number of the year
 */
 function get_month(t) {
  if (!t) return undefined
  return new Date(t).getUTCMonth()
}

function get_monthName(t, locale="en-GB", len="short") {
  return new Date(t).toLocaleDateString(locale, {month: len})
}

/**
 * Start of the month (zero millisecond)
 *
 * @param {timestamp} t - timestamp ms
 * @return {timestamp} - timestamp ms
 */
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

/**
 * the year
 *
 * @param {timestamp} t - timestamp ms
 * @return {number} - the year
 */
 function get_year(t) {
  if (!t) return undefined
  return new Date(t).getUTCFullYear()
}

/**
 * Start of the year (zero millisecond)
 *
 * @param {timestamp} t - timestamp ms
 * @return {timestamp} - timestamp ms
 */
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
  buildSubGrads: buildSubGrads,
  isValidTimestamp: isValidTimestamp,
  isValidTimeInRange: isValidTimeInRange,
  timestampDiff: timestampDiff,
  timestampDifference: timestampDifference,
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

// state-chart.js

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
            // console.log(`${this.id}: transition from "${this.state}" to "idle"`)
            this.context.origin.onToolActivated(data);
          },
        },
      }
    },
    tool_activated: {
      onEnter (data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit (data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        tool_targetSelected: {
          target: 'tool_addToTarget',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "onIdle"`)
            this.context.origin.onToolTargetSelected(data);
          },
        },
      }
    },
    tool_addToTarget: {
      onEnter (data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit (data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        always: {
          target: 'idle',
          condition: 'toolTarget',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "onIdle"`)
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

// tools.js


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
    // build toolbar
    this.initAllTools();
    // add all on and off chart tools
    this.addAllTools();

    // set up event listeners
    this.eventsListen();

    // start State Machine 
    stateMachineConfig$6.context.origin = this;
    this.#mediator.stateMachine = stateMachineConfig$6;
    this.#mediator.stateMachine.start();
  }

  end() {
    // remove event listeners
    const api = this.#mediator.api;
    const tools = DOM.findBySelectorAll(`#${api.id} .${CLASS_TOOLS} .icon-wrapper`);
    for (let tool of tools) {
      for (let t of this.#tools) {
        if (t.id === id)
          tool.removeEventListener("click", this.onIconClick);
      }
    }
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
        
    // this.emit(evt, data)

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

      let id = tool.id, //.replace('TX_', ''),
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

  /**
   * add tool to chart row from data state
   * or add as new tool from toolbar
   * @param {class} tool 
   * @param {object} target
   */
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

    // add tool entry to Data State
  }

  // add all on and off chart tools
  addAllTools() {
    // iterate over Data State to add all tools
  }

}

// axis.js

class Axis {

  // chart

  constructor(chart) {
    // this.chart = chart
  }

  get width() { return this.chart.width }
  get height() { return this.chart.height }
  get data() { return this.chart.data }
  get range() { return this.chart.range }
  get yDigits() { return this.chart.yAxisDigits }

  float2Int(value) { return float2Int(value) }
  numDigits(value) { return numDigits(value) }
  countDigits(value) { return countDigits(value) }
  precision(value) { return precision(value) }

}

// xAxis.js

class xAxis extends Axis {

  #core
  #parent
  #chart

  #xAxisTicks = 4
  #xAxisGrads
  #xAxisSubGrads
  #xAxisOffset

  constructor(parent, chart) {
    super();
    this.#chart = chart;
    this.#parent = parent;
    this.#core = this.#parent.mediator.api.core;
    this.#xAxisSubGrads = buildSubGrads();
  }

  get core() { return this.#core }
  get chart() { return this.#parent.mediator.api.Chart }
  get data() { return this.chart.data }
  get range() { return this.#parent.range }
  get width() { return this.calcWidth() }
  get interval() { return this.range.interval }
  get intervalStr() { return this.range.intervalStr }
  get timeStart() { return this.range.timeStart }
  get timeFinish() { return this.range.timeFinish }
  get rangeDuration() { return this.range.rangeDuration }
  get indexStart() { return this.range.indexStart }
  get indexEnd() { return this.range.indexEnd }
  get timeMax() { return this.range.timeMax }
  get timeMin() { return this.range.timeMin }
  get candleW() { return round(this.width / this.range.Length, 1) }
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
  get scrollOffsetPx() { return this.#core.scrollPos % this.candleW }
  get bufferPx() { return this.#core.bufferPx }

  calcWidth() {
    return this.#core.Chart.width - this.#core.Chart.scale.width
  }



  /**
 * return canvas x co-ordinate
 * handles X Axis modes: default, indexed
 * @param {number} ts - chart time stamp
 * @return {number}  
 * @memberof xAxis
 */
  xPos(ts) {
    return (this.range.rangeIndex(ts) * this.candleW) + (this.candleW * 0.5)
  }

  t2Pixel(ts) {
    return this.xPos(ts)
  }

  pixel2T(x) {
    let c = this.pixel2Index(x);
    return this.range.value(c)[0]
  }

  pixel2Index(x) {
    let o = this.core.rangeScrollOffset;
    let c = this.range.indexStart - o; 
    return c + 1
      + Math.floor((x + (this.#core.scrollPos * -1)) / this.candleW) 
  }

  pixelOHLCV(x) {
    let c = this.pixel2Index(x);
    return this.range.value(c)
  }

  xPosSnap2CandlePos(x) {
    this.#core.scrollPos % this.candleW;
    // let o = (x % this.candleW < this.candleW / 2) ? this.candleW : this.candleW * -1
    let c = Math.floor((x / this.candleW)); // + o
    return  (c * this.candleW) + (this.candleW / 2) // + o

    // return ((this.pixel2Index(x) - this.range.indexStart) 
    //         * this.candleW) - (this.candleW / 2)
  }

  /**
   * return chart time
   * handles X Axis modes: default, indexed
   * @param {number} x
   * @returns {timestamp}
   * @memberof xAxis
   */
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
    const grads = {values: []};
    intervalStr.charAt(intervalStr.length - 1);
    
      let days, inc, month, next, t, t1, t2, units, 
          major, majorValue, minorValue, minorTick, majorTick;
    
      units = ms2TimeUnits(this.rangeDuration);
      grads.units = ms2TimeUnits(this.rangeDuration);
    
    // Years
    if (units.years > 0) {
      grads.unit = ["y", "year"];
      grads.timeSpan = `${units.years} years`;
      
      t1 = year_start(rangeStart);
      t2 = nextYear(year_start(rangeEnd)) + YEAR_MS;
        
      units = timestampDifference(t1, t2);
      major = units.years;
      majorTick = Math.ceil(1 / (this.gradsMax / major));
      minorTick = (units.years >= this.gradsMax - 1) ? 0 : Math.floor(this.gradsMax / major);
      
      majorValue = (t) => { 
        return get_year(t) 
      };
      minorValue = (t) => { 
        if (get_month(t) == 0) return get_year(t)
        else return get_monthName(t) 
      };
      
      t = t1;
      inc = Math.round((YEAR_MS + DAY_MS) / (minorTick + 1));
      grads.major = [];
      grads.minor = [];

      while (t < t2) {
        t = year_start(t);
        grads.major.push(t);
        next = t;
        for (let i = majorTick; i > -1; --i) {
          next = nextYear(next);
        }

        if (minorTick > 0 && this.interval < YEAR_MS) {
          while (t < next) {
            t = month_start(t + inc);
            grads.minor.push(t);
          }
        }
        t = next;
      }
    }
      
    // Months
    else if (units.months > 0) {
      let months = units.months;
      grads.unit = ["M", "month"];
      grads.timeSpan = `${units.months} months`;
      
      t1 = month_start(rangeStart);
      t2 = month_start(rangeEnd) + MONTH_MS(get_month(rangeEnd)) + YEAR_MS;
        
      units = timestampDifference(t1, t2);
      major = months;
      majorTick = Math.ceil(1 / (this.gradsMax / major));
      minorTick = (months >= this.gradsMax - 1) ? 0 : Math.floor(this.gradsMax / major);

      grads.majorTick = majorTick;
      grads.minorTick = minorTick;
      
      majorValue = (t) => { 
        if (get_month(t) == 0) return get_year(t)
        else return get_monthName(t)
      };
      minorValue = (t) => { 
        if (get_day(t) == 1) return get_monthName(t) 
        else return this.gradsDayName(t) 
      };
      
      t = t1;
      inc = Math.round((DAY_MS * 28) / (minorTick + 1));
      grads.inc = inc;
      grads.major = [];
      grads.minor = [];

      while (t < t2) {
        t = month_start(t);
        grads.major.push(t);
        next = t;
        for (let i = majorTick; i > 0; i--) {
          next = month_start(next + (DAY_MS * 31));
        }

        if (minorTick > 0 && this.interval < DAY_MS * 28) {
          month = month_start(t + (DAY_MS * 31));
          while (t < month) {
            t = day_start(t + inc);
            if (t >= month) break
            else if (month - t < inc * 0.75) break
            else grads.minor.push(t);
          }
        }
        t = next;
      }
    }
    
    // Days
    else if (units.weeks > 0 || units.days > 0) {
      days = units.weeks * 7 + units.days;

      grads.unit = ["d", "day"];
      grads.timeSpan = `${days} days`;
      
      t1 = day_start(rangeStart);
      t2 = day_start(rangeEnd) + MONTHR_MS;
        
      units = timestampDifference(t1, t2);
      major = days;
      majorTick = Math.ceil(1 / (this.gradsMax / major));
      minorTick = (days >= this.gradsMax - 1) ? 0 : Math.floor(this.gradsMax / major);
      
      majorValue = (t) => { 
        if (get_month(t) == 0 && get_day(t) == 1) return get_year(t)
        else if (get_day(t) == 1) return get_monthName(t)
        else return this.gradsDayName(t) // null
        // else if (unit == "h") return get_hour(t) + ":00" 
      };
      minorValue = (t) => { 
        if (get_day(t) == 1) return get_monthName(t)
        else if (get_hour(t) == 0) return this.gradsDayName(t) // null
        else return get_hour(t) + ":00" 
      };
      
      t = t1;
      inc = Math.round(DAY_MS / (minorTick + 1));
      grads.major = [];
      grads.minor = [];

      while (t < t2) {
        t = day_start(t);
        grads.major.push(t);
        next = t;
        for (let i = majorTick; i > 0; i--) {
          next = next + DAY_MS;
        }

        if (minorTick > 0 && this.interval < DAY_MS) {
          while (t < next) {
            t = hour_start(t + inc);
            grads.minor.push(t);
          }
        }
        t = next;
      }
    }
    
    // Hours
    else if (units.hours > 0) {
      grads.unit = ["h", "hour"];
      grads.timeSpan = `${units.hours} hours`;
      
      t1 = hour_start(rangeStart);
      t2 = hour_start(rangeEnd) + DAY_MS;
        
      units = timestampDifference(t1, t2);
      major = units.hours;
      majorTick = Math.ceil(1 / (this.gradsMax / major));
      minorTick = (units.hours >= this.gradsMax - 1) ? 0 : Math.floor(this.gradsMax / major);
      
      majorValue = (t) => { 
        if (get_hour(t) == 0) return this.gradsDayName(t)
        else if (get_minute(t) == 0) return get_hour(t) + ":00"
        else return "00:" + get_minute(t)
      };
      minorValue = (t) => { 
          if (get_minute(t) == 0) return get_hour(t) + ":00"
          else return "00:" + get_minute(t) 
      };
      
      t = t1;
      inc = Math.round(HOUR_MS / (minorTick + 1));
      grads.major = [];
      grads.minor = [];

      while (t < t2) {
        t = hour_start(t);
        grads.major.push(t);
        next = t;
        for (let i = majorTick; i > -1; --i) {
          next = next + HOUR_MS;
        }

        if (minorTick > 0 && this.interval < HOUR_MS) {
          while (t < next) {
            t = minute_start(t + inc);
            grads.minor.push(t);
          }
        }
        t = next;
      }
    }
    
    // Minutes
    else if (units.minutes > 0) {
      grads.unit = ["m", "minute"];
      grads.timeSpan = `${units.minutes} minutes`;
      
      t1 = minute_start(rangeStart);
      t2 = minute_start(rangeEnd) + HOUR_MS;
        
      units = timestampDifference(t1, t2);
      major = units.minutes;
      majorTick = Math.ceil(this.gradsMax / major);
      minorTick = (units.minutes >= this.gradsMax - 1) ? 0 : Math.floor(this.gradsMax / major);
      
      majorValue = (t) => { 
        if (get_minute(t) == 0) return get_hour(t) + ":00"
        else return "00:" + get_minute(t) 
      };
      
      t = t1;
      inc = Math.round(MINUTE_MS / (minorTick + 1));
      grads.major = [];
      grads.minor = [];

      while (t < t2) {
        grads.major.push(t);
        next = t;
        for (let i = majorTick; i > -1; --i) {
          next = next + MINUTE_MS;
        }

        if (minorTick > 0) {
          while (t < next) {
            t = second_start(t + inc);
            grads.minor.push(t);
          }
        }
        t = next;
      }
    }

    // Seconds
    else if (units.seconds > 0) {
      grads.unit = ["s", "second"];
      grads.timeSpan = `${units.seconds} seconds`;
      
      t1 = second_start(rangeStart);
      t2 = second_start(rangeEnd) + MINUTE_MS;
        
      units = timestampDifference(t1, t2);
      major = units.seconds;
      majorTick = Math.ceil(this.gradsMax / major);
      minorTick = (units.seconds >= this.gradsMax - 1) ? 0 : Math.floor(this.gradsMax / major);
      
      majorValue = (t) => { 
        if (get_second(t) == 0) return get_minute(t) + ":00"
        else return "00:" + get_second(t) 
      };
      
      t = t1;
  //       inc = Math.round(HOUR_MS / (minorTick + 1))
      grads.major = [];
      grads.minor = [];

      while (t < t2) {
        grads.major.push(t);
        next = t;
        for (let i = majorTick; i > -1; --i) {
          next = next + SECOND_MS;
        }

  //         if (minorTick > 0) {
  //           while (t < next) {
  //             t = second_start(t + inc)
  //             grads.minor.push(t)
  //           }
          t = next;
        }
    }

    let i = -1;
    while (++i < grads.major.length) {
      t = grads.major[i];
      grads.values.push([majorValue(t), this.t2Pixel(t), t, "major"]);
    }
    i = -1;
    while (++i < grads.minor.length) {
      t = grads.minor[i];
      grads.values.push([minorValue(t), this.t2Pixel(t), t, "minor"]);
    }

    return grads
  }

  idealTicks(t1, t2, unit) {
    let t = t1;
    let ticks = [];
    do {
      let i = -1;
      while (++i < this.#xAxisSubGrads[unit].length) {
        t += this.#xAxisSubGrads[unit][i];
        ticks.push(t);
      }
    }
    while (t < t2)
    return ticks
  }

  draw() {
    this.#xAxisGrads = this.calcXAxisGrads();
    this.drawGrads();
    this.drawOverlays();
  }

  drawGrads() {
    this.#parent.layerLabels.scene.clear();

    const grads = this.#xAxisGrads.values;
    const ctx = this.#parent.layerLabels.scene.context;
    this.width / this.range.Length * 0.5;
    const offset = 0;


    ctx.save();
    ctx.strokeStyle = XAxisStyle.COLOUR_TICK;
    ctx.fillStyle = XAxisStyle.COLOUR_TICK;
    ctx.font = XAxisStyle.FONT_LABEL;
    for (let tick of grads) { 
      let w = Math.floor(ctx.measureText(`${tick[0]}`).width * 0.5);
      ctx.fillText(tick[0], tick[1] - w + offset, this.xAxisTicks + 12);

      ctx.beginPath();
      ctx.moveTo(tick[1] + offset, 0);
      ctx.lineTo(tick[1] + offset, this.xAxisTicks);
      ctx.stroke();
    }
      ctx.restore();
  }

  drawOverlays() {
    this.#parent.layerOverlays.scene.clear();

    this.#xAxisGrads;

  }

}

// canvas.js

/**
 * Viewport constructor
 * @param {Object} cfg - {width, height}
 */
class Viewport {
  constructor(cfg) {
    if (!cfg) cfg = {};

    this.container = cfg.container;
    this.layers = [];
    this.id = CEL.idCnt++;
    this.scene = new CEL.Scene();

    this.setSize(cfg.width || 0, cfg.height || 0);

    // clear container
    cfg.container.innerHTML = "";
    cfg.container.appendChild(this.scene.canvas);

    CEL.viewports.push(this);
  }

  /**
   * set viewport size
   * @param {Integer} width - viewport width in pixels
   * @param {Integer} height - viewport height in pixels
   * @returns {Viewport}
   */
  setSize(width, height) {
    this.width = width;
    this.height = height;
    this.scene.setSize(width, height);

    this.layers.forEach(function (layer) {
      layer.setSize(width, height);
    });

    return this;
  }
  /**
   * add layer
   * @param {CEL.Layer} layer
   * @returns {Viewport}
   */
  addLayer(layer) {
    this.layers.push(layer);
    layer.setSize(layer.width || this.width, layer.height || this.height);
    layer.viewport = this;
    return this;
  }
  /**
   * get key's associated coordinate - applied to mouse events.
   * @param {Number} x
   * @param {Number} y
   * @returns {Integer} integer - returns -1 if no pixel is there
   */
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
  /**
   * get viewport index from all CEL viewports
   * @returns {Integer}
   */
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
  /**
   * destroy viewport
   */
  destroy() {
    // remove layers
    for (let layer of layers) {
      layer.remove();
    }

    // clear dom
    this.container.innerHTML = "";

    // remove self from #viewports array
    CEL.viewports.splice(this.getIndex(), 1);
  }
  /**
   * composite all layers onto canvas
   */
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
  /**
   * Layer constructor
   * @param {Object} cfg - {x, y, width, height}
   */
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

  /**
   * set layer position
   * @param {Number} x
   * @param {Number} y
   * @returns {Layer}
   */
  setPosition(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }
  /**
   * set layer size
   * @param {Number} width
   * @param {Number} height
   * @returns {Layer}
   */
  setSize(width, height) {
    this.width = width;
    this.height = height;
    this.scene.setSize(width, height);
    this.hit.setSize(width, height);
    return this;
  }
  /**
   * move up
   * @returns {Layer}
   */
  moveUp() {
    let index = this.getIndex(),
      viewport = this.viewport,
      layers = viewport.layers;

    if (index < layers.length - 1) {
      // swap
      layers[index] = layers[index + 1];
      layers[index + 1] = this;
    }

    return this;
  }
  /**
   * move down
   * @returns {Layer}
   */
  moveDown() {
    let index = this.getIndex(),
      viewport = this.viewport,
      layers = viewport.layers;

    if (index > 0) {
      // swap
      layers[index] = layers[index - 1];
      layers[index - 1] = this;
    }

    return this;
  }
  /**
   * move to top
   * @returns {Layer}
   */
  moveTop() {
    let index = this.getIndex(),
      viewport = this.viewport,
      layers = viewport.layers;

    layers.splice(index, 1);
    layers.push(this);
  }
  /**
   * move to bottom
   * @returns {Layer}
   */
  moveBottom() {
    let index = this.getIndex(),
      viewport = this.viewport,
      layers = viewport.layers;

    layers.splice(index, 1);
    layers.unshift(this);

    return this;
  }
  /**
   * get layer index from viewport layers
   * @returns {Number|null}
   */
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
  /**
   * remove
   */
  remove() {
    // remove this layer from layers array
    this.viewport.layers.splice(this.getIndex(), 1);
  }
}

class Scene {
  /**
   * Scene constructor
   * @param {Object} cfg - {width, height}
   */
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

  /**
   * set scene size
   * @param {Number} width
   * @param {Number} height
   * @returns {Scene}
   */
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
  /**
   * clear scene
   * @returns {Scene}
   */
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
    // webgl or webgl2
    else {
      context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT);
    }
    return this;
  }
  /**
   * convert scene into an image
   * @param {String} type - type of image format
   * @param {Number} quality - image quality 0 - 1
   * @param {Function} cb - callback
   */
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
  /**
   * export scene as an image
   * @param {Object} cfg - {filename}
   * @param {Function} cb - optional, by default opens image in new window / tab
   * @param {String} type - type of image format
   * @param {Number} quality - image quality 0 - 1
   */
  export(cfg, cb, type = "image/png", quality) {
    if (typeof cb !== "function") cb = this.blobCallback.bind({ cfg: cfg });
    this.canvas.toBlob(cb, type, quality);
  }

  blobCallback(blob) {
    let anchor = document.createElement("a"),
      dataUrl = URL.createObjectURL(blob),
      fileName = this.cfg.fileName || "canvas.png";

    // set <a></a> attributes
    anchor.setAttribute("href", dataUrl);
    anchor.setAttribute("target", "_blank");
    anchor.setAttribute("export", fileName);

    // invoke click
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
  /**
   * Hit constructor
   * @param {Object} cfg - {width, height}
   */
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
      // add preserveDrawingBuffer to pick colors with readPixels for hit detection
      preserveDrawingBuffer: true,
      // fix webgl antialiasing picking issue
      antialias: false,
    });

    if (cfg.width && cfg.height) {
      this.setSize(cfg.width, cfg.height);
    }
  }

  /**
   * set hit size
   * @param {Number} width
   * @param {Number} height
   * @returns {Hit}
   */
  setSize(width, height) {
    this.width = width;
    this.height = height;
    this.canvas.width = width * CEL.pixelRatio;
    this.canvas.style.width = `${width}px`;
    this.canvas.height = height * CEL.pixelRatio;
    this.canvas.style.height = `${height}px`;
    return this;
  }
  /**
   * clear hit
   * @returns {Hit}
   */
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
    // webgl or webgl2
    else {
      context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT);
    }
    return this;
  }
  /**
   * get key associated with coordinate. This can be used for mouse interactivity.
   * @param {Number} x
   * @param {Number} y
   * @returns {Integer} integer - returns -1 if no pixel is there
   */
  getIntersection(x, y) {
    let context = this.context,
      data;

    x = Math.round(x);
    y = Math.round(y);

    // if x or y are out of bounds return -1
    if (x < 0 || y < 0 || x > this.width || y > this.height) {
      return -1;
    }

    // 2d
    if (this.contextType === "2d") {
      data = context.getImageData(x, y, 1, 1).data;

      if (data[3] < 255) {
        return -1;
      }
    }
    // webgl
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
  /**
   * get canvas formatted color string from data index
   * @param {Number} index
   * @returns {String}
   */
  getColorFromIndex(index) {
    let rgb = this.intToRGB(index);
    return "rgb(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ")";
  }
  /**
   * converts rgb array to integer value
   * @param {Array.<Number} rgb - [r,g,b]
   * @returns {Integer}
   */
  rgbToInt(rgb) {
    let r = rgb[0];
    let g = rgb[1];
    let b = rgb[2];
    return (r << 16) + (g << 8) + b;
  }
  /**
   * converts integer value to rgb array
   * @param {Number} number - positive number between 0 and 256*256*256 = 16,777,216
   * @returns {Array.<Integer>}
   */
  intToRGB(number) {
    let r = (number & 0xff0000) >> 16;
    let g = (number & 0x00ff00) >> 8;
    let b = number & 0x0000ff;
    return [r, g, b];
  }
}

// Canvas Extension Layers
const CEL = {
  idCnt: 0,
  viewports: [],
  pixelRatio: (window && window.devicePixelRatio) || 1,

  Viewport: Viewport,
  Layer: Layer,
  Scene: Scene,
  Hit: Hit,
};

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

/**
 * Measure the width of the text
 * @param ctx
 * @param text
 * @returns {number}
 */
function calcTextWidth (ctx, text) {
  return Math.round(ctx.measureText(text).width)
}

/**
 * Create font
 * @param fontSize
 * @param fontFamily
 * @param fontWeight
 * @returns {string}
 */
function createFont (
  fontSize = defaultOptions.fontSize, 
  fontWeight = defaultOptions.fontWeight, 
  fontFamily = defaultOptions.fontFamily
  ) {
  return `${fontWeight} ${fontSize}px ${fontFamily}`
}

/**
 * Get the width of the text box
 * @param ctx
 * @param text
 * @param options
 * @returns {number}
 */
function getTextRectWidth (ctx, text, options) {
  ctx.font = createFont(options.fontSize, options.fontWeight, options.fontFamily);
  const textWidth = calcTextWidth(ctx, text);
  const paddingLeft = options.paddingLeft || 0;
  const paddingRight = options.paddingRight || 0;
  const borderSize = options.borderSize || 0;
  return paddingLeft + paddingRight + textWidth + (borderSize * 2)
}

/**
 * Get the height of the text box
 * @param options
 * @returns {number}
 */
function getTextRectHeight (options) {
  const paddingTop = options.paddingTop || 0;
  const paddingBottom = options.paddingBottom || 0;
  const borderSize = options.borderSize || 0;
  const fontSize = options.fontSize || 0;
  return paddingTop + paddingBottom + fontSize + (borderSize * 2)
}

/**
 * draw text with background
 * @export
 * @param {canvas} ctx
 * @param {string} txt
 * @param {number} x
 * @param {number} y
 * @param {object} options - styling options
 */
function drawTextBG(ctx, txt, x, y, options) {

  /// lets save current state as we make a lot of changes        
  ctx.save();

  ctx.font = createFont(options?.fontSize, options?.fontWeight, options?.fontFamily);
  /// draw text from top - makes life easier at the moment
  ctx.textBaseline = 'top';

  /// color for background
  ctx.fillStyle = options.bakCol || defaultOptions.bakCol;
  
  /// get width of text
  let width = getTextRectWidth(ctx, txt, options);
  let height = getTextRectHeight(options);

  /// draw background rect
  ctx.fillRect(x, y, width, height);

  // draw text on top
  ctx.fillStyle = options.txtCol || defaultOptions.txtCol;
  x = x + options?.paddingLeft;
  y = y + options?.paddingTop;
  ctx.fillText(txt, x, y);
  
  /// restore original state
  ctx.restore();
}

// state-chart.js

var stateMachineConfig$5 = {
  id: "time",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit(data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        resize: {
          target: 'resize',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to  "resize"`)
          },
        },
        xAxis_scale: {
          target: 'scale',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to  "scale"`)
          },
        },
        xAxis_inc: {
          target: 'incremental',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to  "incremental"`)
          },
        },
        xAxis_log: {
          target: 'logarithmic',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to  "logarithmic"`)
          },
        },
        xAxis_100: {
          target: 'percentual',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to  "percentual"`)
          },
        },
        chart_pan: {
          target: 'chart_pan',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to  "chart_pan"`)
          },
        },
        chart_zoom: {
          target: 'chart_zoom',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to  "chart_zoom"`)
          },
        },
      }
    },
    resize: {
      onEnter(data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit(data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        someEvent: {
          target: '',
          action (data) {
            // console.log('Time: transition action for event in "idle" state')
          },
        },
      }
    },
    chart_pan: {
      onEnter(data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit(data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        chart_pan: {
          target: 'chart_pan',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "chart_pan"`)
            // this.context.origin.draw()
          },
        },
        chart_panDone: {
          target: 'idle',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "chart_panDone"`)
            // this.context.origin.draw()
          },
        },
      }
    },
    chart_zoom: {
      onEnter(data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit(data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        always: {
          target: 'idle',
          condition: 'zoomDone',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "chart_pan"`)
            // this.context.origin.draw()
          },
        },
      }
    },
  },
  guards: {
    zoomDone () { return true },
  }
};

// timeLine.js

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
  #elViewTotal

  #viewport
  #viewTotal
  #layerLabels
  #layerOverlays
  #layerCursor

  #controller

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
  get viewTotal() { return this.#viewTotal }
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
    this.#elViewTotal = DOM.findBySelector(`#${api.id} .${CLASS_TIME} .viewTotal`);
  }

  defaultNode() {
    // const node = `
    //   <canvas width="" height="${this.mediator.api.timeH}"></canvas>
    // `
    const node = `
    <div class="viewport"></div>
    <div class="viewTotal"></div>
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
    const height = this.height;
    const layerWidth = Math.round(width * ((100 + buffer) * 0.01));

    this.#viewport.setSize(width, this.height);
    this.#layerLabels.setSize(layerWidth, height);
    this.#layerOverlays.setSize(layerWidth, height);
    this.#layerCursor.setSize(layerWidth, height);

    this.setWidth(dim.w);
    this.draw();
  }

  start() {
    this.emit("started");

    // prepare layered canvas
    this.createViewport();
    // draw the Timeline
    this.#xAxis.initXAxisGrads();
    this.draw();

    // set up event listeners
    this.eventsListen();

    // start State Machine 
    stateMachineConfig$5.context.origin = this;
    this.#mediator.stateMachine = stateMachineConfig$5;
    this.#mediator.stateMachine.start();
  }

  end() {
    
  }

  eventsListen() {
    let canvas = this.#viewport.scene.canvas;
    // create controller and use 'on' method to receive input events 
    this.#controller = new InputController(canvas, {disableContextMenu: false});

    this.on("main_mousemove", (e) => { this.drawCursorTime(e); });
    // this.on("chart_pan", (e) => { this.drawCursorTime(e, true) })
    // this.on("chart_panDone", (e) => { this.drawCursorTime(e, true) })
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

  // -----------------------

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

    // create viewport
    this.#viewport = new CEL.Viewport({
      width: width,
      height: height,
      container: this.#elViewport
    });

    // create layers - labels, overlays, cursor
    this.#layerLabels = new CEL.Layer(layerConfig);
    this.#layerOverlays = new CEL.Layer(layerConfig);
    this.#layerCursor = new CEL.Layer(layerConfig);

    // add layers
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
        opts = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' },
        dateTimeStr = date.toLocaleDateString('en-GB', opts),
        options = {
          fontSize: XAxisStyle.FONTSIZE * 1.05,
          fontWeight: XAxisStyle.FONTWEIGHT,
          fontFamily: XAxisStyle.FONTFAMILY,
          txtCol: XAxisStyle.COLOUR_CURSOR,
          bakCol: XAxisStyle.COLOUR_CURSOR_BG,
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
    // adjust element, viewport and layers
    this.setDimensions({w: width, h: height});
  }

}

// yAxis.js

class yAxis extends Axis {

  #parent
  #chart

  #yAxisType = YAXIS_TYPES[0]  // default, log, percent
  #yAxisPadding = 1.04
  #yAxisStep = YAXIS_STEP
  #yAxisGrid = YAXIS_GRID
  #yAxisDigits = PRICEDIGITS$1
  #yAxisRound = 3
  #yAxisTicks = 3
  #yAxisGrads

  constructor(parent, chart, yAxisType=YAXIS_TYPES[0]) {
    super();
    this.#chart = chart;
    this.#parent = parent; 
    this.yAxisType = yAxisType;
    this.#yAxisGrid = (this.#parent.core.config?.yAxisGrid) ? 
      this.#parent.core.config?.yAxisGrid : YAXIS_GRID;
  }

  get chart() { return this.#chart } //this.#parent.mediator.api.core.Chart }
  get data() { return this.chart.data }
  get range() { return this.#parent.mediator.api.core.range }
  get height() { return this.chart.height }
  get rangeH() { return this.range.height * this.yAxisPadding }
  get yAxisRatio() { return this.height / this.range.height }
  get yAxisPrecision() { return this.yAxisCalcPrecision }
  set yAxisPadding(p) { this.#yAxisPadding = p; }
  get yAxisPadding() { return this.#yAxisPadding }
  set yAxisType(t) { this.#yAxisType = YAXIS_TYPES.includes(t) ? t : YAXIS_TYPES[0]; }
  get yAxisType() { return this.#yAxisType }
  set yAxisStep(s) { this.#yAxisStep = isNumber(s) ? s : YAXIS_STEP; }
  get yAxisStep() { return this.#yAxisStep }
  set yAxisTicks(t) { this.#yAxisTicks = isNumber(t) ? t : 0; }
  get yAxisTicks() { return this.#yAxisTicks }
  get yAxisGrads() { return this.#yAxisGrads }

  calcHeight() {
    let api = this.#chart.mediator.api;
    return api.height - api.utilsW - api.scaleW
  }

  yAxisRangeBounds() {

  }

  yAxisLog() {
    
  }

  yAxisCntDigits(value) {
    return this.countDigits(value)
  }

  yAxisCalcPrecision() {
    let integerCnt = this.numDigits(this.range.priceMax);
    // let decimalCnt = this.precision(this.range.priceMax)
    return this.yDigits - integerCnt
  }

  yAxisCursor() {

  }

  /**
   * return canvas y co-ordinate
   * handles Y Axis modes: default, log, percentate
   * @param {number} yData - chart price or offchart indicator y data
   * @return {number}  
   * @memberof yAxis
   */
  yPos(yData) {
    switch(this.yAxisType) {
      case "percent" :
        return this.p100toPixel(yData)
      case "log" :
        return this.$2Pixel(log10(yData))
      default :
        return this.$2Pixel(yData)
    }
  }

  /**
   * return chart price
   * handles Y Axis modes: default, log, percentate
   * @param {number} y
   * @memberof yAxis
   */
  yPos2Price(y) {
    return this.pixel2$(y)
  }

  $2Pixel(yData) {
    let height = yData - this.range.priceMin;
    let yPos = this.height - (height * this.yAxisRatio);
    return yPos
  }

  pixel2$(y) {
    let ratio = (this.height - y) / this.height;
    let adjust = this.range.height * ratio;
    return this.range.priceMin + adjust
  }

  p100toPixel(yData) {
    return this.height * yData / 100
  }

  calcGradations() {

    switch (this.yAxisType) {
      case "percent":
        this.#yAxisGrads = this.gradations(100, 0, false, true);
        break;
      default:
        this.#yAxisGrads = this.gradations(this.range.priceMax, this.range.priceMin);
        break;
    }
  }

  gradations(max, min, decimals=true, fixed=false) {

      let digits;
    const scaleGrads = [];

    if (fixed) {
      const rangeMid = (max + min) * 0.5;
      const midH = this.height * 0.5;
      digits = this.countDigits(rangeMid);
      const scaleMid = this.niceValue(digits, decimals);
  
      scaleGrads.push([scaleMid, round(midH), digits]);
  
      let grad = round(power(log10(midH), 2) - 1),
          step$ = (max - scaleMid) / grad,
          stepP = midH / grad,
          upper = scaleMid + step$,
          pos = midH - stepP,
          nice, 
          entry;
      while (upper <= max) {
        digits = this.countDigits(upper);
        nice = this.niceValue(digits, decimals);
        entry = [nice, round(pos), digits];
        scaleGrads.unshift(entry);
        upper += step$;
        pos -= stepP;
      }
      let lower = scaleMid - step$;
          pos = midH + stepP;
      while (lower >= min) {
        digits = this.countDigits(lower);
        nice = this.niceValue(digits, decimals);
        entry = [nice, round(pos), digits];
        scaleGrads.push(entry);
        lower -= step$;
        pos += stepP;
      }
    }
    else {
      // roughly divide the yRange into cells
      let yGridSize = (this.rangeH)/this.#yAxisGrid;

      // try to find a nice number to round to
      let niceNumber = Math.pow( 10 , Math.ceil( Math.log10( yGridSize ) ) );
      if ( yGridSize < 0.25 * niceNumber ) niceNumber = 0.25 * niceNumber;
      else if ( yGridSize < 0.5 * niceNumber ) niceNumber = 0.5 * niceNumber;

      // find next largest nice number above yStart
      var yStartRoundNumber = Math.ceil( min/niceNumber ) * niceNumber;
      // find next lowest nice number below yEnd
      var yEndRoundNumber = Math.floor( max/niceNumber ) * niceNumber;

      let pos = this.height,
          step$ = (yEndRoundNumber - yStartRoundNumber) / niceNumber,
          stepP = this.height / step$,
          nice;

      for ( var y = yStartRoundNumber ; y <= yEndRoundNumber ; y += niceNumber )
      {
        digits = this.countDigits(y);
        nice = this.niceValue(digits, decimals);
        scaleGrads.push([nice, round(pos), digits]);

        pos -= stepP;
      }
    }

    return scaleGrads
  }

  niceValue(digits, decimals=true) {
    if (digits.integers) {
      let x = digits.integers - this.#yAxisRound;
      if (x > 0) {
        let factor = power(10, x);
        return Math.floor(digits.value / factor) * factor
      }
      else {
        if (!decimals) return Math.floor(digits.value)
        x = (x -1) * -1;
        return round(digits.value, x)
      }
    }
    else {
      let y = digits.decimals - this.#yAxisRound;
      y = (y -1) * -1;
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
    // calculate Y Axis gradations for labels and overlays
    this.calcGradations();
    this.drawLabels();
    this.drawOverlays();
  }

  drawLabels() {
    this.#parent.layerLabels.scene.clear();

    const grads = this.#yAxisGrads;
    const ctx = this.#parent.layerLabels.scene.context;
    ctx.save();
    ctx.strokeStyle = YAxisStyle.COLOUR_TICK;
    ctx.fillStyle = YAxisStyle.COLOUR_TICK;
    ctx.font = YAxisStyle.FONT_LABEL;
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

// draw overlays

    ctx.restore();
  }


}

// state-chart.js

var stateMachineConfig$4 = {
  id: "scale",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit(data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        resize: {
          target: 'resize',
          action (data) {
            // console.log('transition action for "resize" in "idle" state')
          },
        },
        yAxis_scale: {
          target: 'scale',
          action (data) {
            // console.log('transition action for "yAxis_scale" in "idle" state')
          },
        },
        yAxis_inc: {
          target: 'incremental',
          action (data) {
            // console.log('transition action for "yAxis_inc" in "idle" state')
          },
        },
        yAxis_log: {
          target: 'logarithmic',
          action (data) {
            // console.log('transition action for "yAxis_log" in "idle" state')
          },
        },
        yAxis_100: {
          target: 'percentual',
          action (data) {
            // console.log('transition action for "yAxis_100" in "idle" state')
          },
        },
        chart_pan: {
          target: 'chart_pan',
          action (data) {
            // console.log('Scale: from "idle" to "chart_pan" state')
          },
        },
        chart_zoom: {
          target: 'chart_zoom',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to  "chart_zoom"`)
          },
        },
      }
    },
    resize: {
      onEnter(data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit(data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        someEvent: {
          target: '',
          action (data) {
            // console.log('transition action for event in "idle" state')
          },
        },
      }
    },
    chart_pan: {
      onEnter(data) {
        // console.log('Scale: chart_pan: onEnter')
      },
      onExit(data) {
        // console.log('Scale: chart_pan: onExit')
      },
      on: {
        chart_pan: {
          target: 'chart_pan',
          action (data) {
            // console.log('Scale: transition action for "chart_panDone" in "chart_pan" state')
            this.context.origin.draw();
          },
        },
        chart_panDone: {
          target: 'idle',
          action (data) {
            // console.log('Scale: transition action for "chart_panDone" in "chart_pan" state')
            this.context.origin.draw(); 
          },
        },
      }
    },
    chart_zoom: {
      onEnter(data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit(data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        always: {
          target: 'idle',
          condition: 'zoomDone',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "chart_zoom"`)
            this.context.origin.draw();
          },
        },
      }
    },
  },
  guards: {
    zoomDone () { return true },
  }
};

// scale-priceLine.js


class scalePriceLine {

  #core
  #config
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

    this.start();
  }

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

    let price = candle[4],
        y = this.#scale.yPos(price),
        nice = this.#scale.nicePrice(price),
        options = {
          fontSize: YAxisStyle.FONTSIZE * 1.05,
          fontWeight: YAxisStyle.FONTWEIGHT,
          fontFamily: YAxisStyle.FONTFAMILY,
          txtCol: "#FFFFFF", //YAxisStyle.COLOUR_CURSOR,
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

    // TODO: get candle colours from config / theme
    if (candle[4] >= candle[1]) options.bakCol = CandleStyle.COLOUR_CANDLE_UP;
    else options.bakCol = CandleStyle.COLOUR_CANDLE_DN;

    ctx.fillStyle = options.bakCol;
    ctx.fillRect(1, yPos, this.width, height);

    drawTextBG(ctx, `${nice}`, 1, yPos , options);

    ctx.restore();
    this.#viewport.render();
  }
}

// scale.js

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

  #yAxisType = YAXIS_TYPES[0]  // default, log, percent

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
    this.#options = options;
    this.#elScale = mediator.api.elements.elScale;
    this.#chart = mediator.api.core.Chart;
    this.#parent = mediator.api.parent;
    this.#core = this.#mediator.api.core;

    this.#options = options;
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
  set height(h) { this.setHeight(h); }
  get height() { return this.#elScale.clientHeight }
  get width() { return this.#elScale.clientWidth }
  get yAxisHeight() { return this.#yAxis.height }
  get yAxisRatio() { return this.#yAxis.yAxisRatio }
  get layerLabels() { return this.#layerLabels }
  get layerOverlays() { return this.#layerOverlays }
  set yAxisType(t) { this.#yAxisType = YAXIS_TYPES.includes(t) ? t : YAXIS_TYPES[0]; }
  get yAxisType() { return this.#yAxisType }
  get yAxisGrads() { return this.#yAxis.yAxisGrads }
  get viewport() { return this.#viewport }
  get pos() { return this.dimensions }
  get dimensions() { return DOM.elementDimPos(this.#elScale) }
  get theme() { return this.#core.theme }
  get config() { return this.#core.config }

  init() {
    this.mount(this.#elScale);

    this.yAxisType = this.options.yAxisType;

    this.log(`${this.#name} instantiated`);
  }


  start(data) {
    this.emit("started",data);

    this.#yAxis = new yAxis(this, this, this.yAxisType);

    // prepare layered canvas
    this.createViewport();
    // draw the scale
    this.draw();

    // set up event listeners
    this.eventsListen();

    // start State Machine 
    const newConfig = copyDeep(stateMachineConfig$4);
    newConfig.context.origin = this;
    this.mediator.stateMachine = newConfig;
    this.mediator.stateMachine.start();
  }

  end() {
    this.off(`${this.#parent.ID}_mousemove`, this.onMouseMove);
    this.off(`${this.#parent.ID}_mouseout`, this.eraseCursorPrice);
    this.off(STREAM_UPDATE, this.onStreamUpdate);
    // this.off("chart_pan", (e) => { this.drawCursorPrice() })
    // this.off("chart_panDone", (e) => { this.eraseCursorPrice() })
  }

  eventsListen() {
    let canvas = this.#viewport.scene.canvas;
    // create controller and use 'on' method to receive input events 
    this.#controller = new InputController(canvas, {disableContextMenu: false});

    this.on(`${this.#parent.ID}_mousemove`, (e) => { this.onMouseMove(e); });
    this.on(`${this.#parent.ID}_mouseout`, (e) => { this.eraseCursorPrice(); });
    this.on(STREAM_UPDATE, (e) => { this.onStreamUpdate(e); });
    // this.on("chart_pan", (e) => { this.drawCursorPrice() })
    // this.on("chart_panDone", (e) => { this.drawCursorPrice() })
    // this.on("resizeChart", (dimensions) => this.onResize.bind(this))
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
    // adjust layers
    this.#layerLabels.setSize(width, dim.h);
    this.#layerOverlays.setSize(width, dim.h);
    this.#layerCursor.setSize(width, dim.h);

    this.setHeight(dim.h);
    this.draw(undefined, true);
  }

  defaultNode() {
    this.mediator.api;
    const node = `
      <div class="viewport"></div>
    `;
    return node
  }

  // -----------------------

  // convert chart price or offchart indicator y data to pixel pos
  yPos(yData) { return this.#yAxis.yPos(yData) }

  // convert pixel pos to chart price
  yPos2Price(y) { return this.#yAxis.yPos2Price(y) }

  nicePrice($) {
    let digits = this.#yAxis.countDigits($);
    return this.#yAxis.limitPrecision(digits)
  }

  // create canvas layers with handling methods
  createViewport() {

    const {layerConfig} = this.layerConfig();

    // create viewport
    this.#viewport = new CEL.Viewport({
      width: this.#elScale.clientWidth,
      height: this.#elScale.clientHeight,
      container: this.#elViewport
    });

    // create layers - labels, overlays, cursor
    this.#layerLabels = new CEL.Layer(layerConfig);
    this.#layerOverlays = new CEL.Layer(layerConfig);
    this.#layerCursor = new CEL.Layer();

    // add layers
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
    // if the layer and instance were no set, do it now
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
  }

  drawCursorPrice() {
    let [x, y] = this.#cursorPos,
        price =  this.yPos2Price(y),
        nice = this.nicePrice(price),

        options = {
          fontSize: YAxisStyle.FONTSIZE * 1.05,
          fontWeight: YAxisStyle.FONTWEIGHT,
          fontFamily: YAxisStyle.FONTFAMILY,
          txtCol: YAxisStyle.COLOUR_CURSOR,
          bakCol: YAxisStyle.COLOUR_CURSOR_BG,
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
    // adjust partent element
    this.setDimensions({w: width, h: height});
    // // adjust layers
    // width -= this.#elScale.clientWidth
    // this.#layerCursor.setSize(width, height)
    // // adjust width for scroll buffer
    // const buffer = this.config.buffer || BUFFERSIZE
    //       width = Math.round(width * ((100 + buffer) * 0.01))
    // this.#layerLabels.setSize(width, height)
    // this.#layerOverlays.setSize(width, height)
    // // render
    // this.draw(undefined, true)
  }

}

// legend.js

class Legends {

  #targetEl
  #list

  constructor(target) {
    this.#targetEl = target;
    this.#list = {};

    this.mount(target);
  }

  get list() { return this.#list }

  mount(el) {
    // el.innerHTML = this.defaultNode()
  }

  defaultNode() {
  }

  buildLegend(o) {
    const styleLegend = "margin: .5em 0 1em 1em; font-size: 12px;";
      let styleLegendTitle = "margin-right: 1em; white-space: nowrap;";
    const styleInputs = "display: inline; margin-left: -1em;";

    styleLegendTitle += (o?.type === "chart")? "font-size: 1.5em;" : "font-size: 1.2em;";

    const node = `
      <div id="${o.id}" class="legend" style="${styleLegend}">
        <span class="title" style="${styleLegendTitle}">${o.title}</span>
        <dl style="${styleInputs}">${this.buildInputs(o)}</dl>
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
      let colour = "";
      if (o.colours?.[i]) colour = ` color: ${o.colours[i]};`;
      inp +=
      `<dt style="${styleDT}">${input}:</dt>
      <dd style="${styleDD}${colour}">${o.inputs[input]}</dd>`;
      ++i;
    }
    return inp
  }

  add(options) {
    if (!isObject(options) || !("title" in options)) return false

    options.id = uid(options?.id || "legend");
    options.type = options?.type || "overlay";

    const html = this.buildLegend(options);
    const elem = DOM.htmlToElement(html);

    this.#targetEl.appendChild(elem); 
    this.#list[options.id] = {el: DOM.findByID(options.id), type: options.type};

    return options.id
  }

  remove(id) {
    if (!(id in this.#list)
    || this.#list[id].type === "chart") return false
    
    this.#list[id].el.remove();
    delete this.#list[id];

    return true
  }

  update(id, data) {
    if (!(isObject(data)) 
    || !(id in this.#list)) return false

    const html = this.buildInputs(data);
    const el = DOM.findBySelector(`#${id} dl`);
    el.innerHTML = html;
  }
}

// chart-grid.js


class chartGrid {

  #target
  #scene
  #config
  #xAxis
  #yAxis
  #core

  constructor(target, xAxis, yAxis, config) {

    this.#target = target;
    this.#scene = target.scene;
    this.#config = config;
    this.#xAxis = xAxis;
    this.#yAxis = yAxis;
    this.#core = xAxis.core;
    this.#config.axes = config.axes || "both";
  }

  draw(axes) {
    axes = axes || this.#config.axes;
    this.#scene.clear();
    
    const xGrads = this.#xAxis.xAxisGrads.values;
    const ctx = this.#scene.context;
    ctx.save();
    ctx.strokeStyle = GridStyle.COLOUR_GRID;

    // X Axis
    if (axes != "y") {
      const offset = this.#xAxis.smoothScrollOffset || 0;

      for (let tick of xGrads) {
        ctx.beginPath();
        ctx.moveTo(tick[1] + offset, 0);
        ctx.lineTo(tick[1] + offset, this.#scene.height);
        ctx.stroke();
      }
    }

    // Y Axis
    if (axes != "x") {
      const yGrads = this.#yAxis.yAxisGrads;
      for (let tick of yGrads) {
        ctx.beginPath();
        ctx.moveTo(0, tick[1]);
        ctx.lineTo(this.#scene.width, tick[1]);
        ctx.stroke();
      }
    }

    ctx.restore();
  }

}

// volume.js


class VolumeBar {

  constructor(scene, config) {
    this.scene = scene;
    this.ctx = this.scene.context;
    this.width = this.scene.width;
    this.cfg = config;
    this.cfg.colourVolumeUp = this.cfg?.colourVolumeUp || VolumeStyle.COLOUR_VOLUME_UP;
    this.cfg.colourVolumeDn = this.cfg?.colourVolumeDn || VolumeStyle.COLOUR_VOLUME_DN;
  }

  draw(data) {
    const ctx = this.ctx;
    const hilo = data.raw[4] >= data.raw[1];
    const barColour = hilo ? this.cfg.colourVolumeUp : this.cfg.colourVolumeDn;

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

// chart-volume.js

class chartVolume extends VolumeBar {

  #target
  #scene
  #config
  #xAxis
  #yAxis
  #core

  constructor(target, xAxis, yAxis, config) {

    super(target.scene, config);

    this.#target = target;
    this.#scene = target.scene;
    this.#config = config;
    this.#xAxis = xAxis;
    this.#core = xAxis.mediator.api.core;
    this.#config.maxVolumeH = config?.maxVolumeH || 100;
  }

  draw(range=this.#core.range) {
    this.#scene.clear();

    const data = range.data;
    const zeroPos = this.scene.height;
    const offset = this.#xAxis.smoothScrollOffset || 0;
    const volume = {
      x: 0 + offset - this.#xAxis.candleW,
      w: this.#xAxis.candleW,
      z: zeroPos
    };

    const volH = Math.floor(zeroPos * this.#config.maxVolumeH / 100);
    const maxVol = range.volumeMax;

    let o = this.#xAxis.rangeScrollOffset;
    let v = range.indexStart - o;
    let i = range.Length + o + 1;
    let x;

    while(i) {
      x = range.value( v );
      if (x[4] !== null) {
        volume.h = volH - ((maxVol - x[5]) * volH / maxVol);
        volume.raw = data[v];
        super.draw(volume);
      }
      v++;
      i--;
      volume.x = volume.x + volume.w;
    }
  }

}

// candle.js

class Candle {

  areaCoordinates

  constructor(scene, config) {
    this.scene = scene;
    this.ctx = this.scene.context;
    this.width = this.scene.width;
    this.cfg = config;
    this.cfg.candleType = this.cfg?.candleType || "CANDLE_SOLID";
    this.cfg.colourCandleUp = this.cfg?.colourCandleUp || CandleStyle.COLOUR_CANDLE_UP;
    this.cfg.colourCandleDn = this.cfg?.colourCandleDn || CandleStyle.COLOUR_CANDLE_DN;
    this.cfg.colourWickUp = this.cfg?.colourWickUp || CandleStyle.COLOUR_WICK_UP;
    this.cfg.colourWickDn = this.cfg?.colourWickDn || CandleStyle.COLOUR_WICK_DN;
  }

  draw(data) {
    const ctx = this.ctx;
    const hilo = data.raw[4] >= data.raw[1];
    const bodyColour = hilo ? this.cfg.colourCandleUp : this.cfg.colourCandleDn;
    const wickColour = hilo ? this.cfg.colourWickUp : this.cfg.colourWickDn;

    switch(this.cfg?.candleType) {
      case "CANDLE_SOLID": 
      this.fill = true;
      break;
      case "CANDLE_HOLLOW":
      case "OHLC":
        this.fill = false;
        break;
      case "CANDLE_UP_HOLLOW":
        this.fill = !hilo;
        break;
      case "CANDLE_DOWN_HOLLOW":
        this.fill = hilo;
      // default:
      //   this.fill = true
      //   break;
    }

    let w = Math.max(data.w -1, 1);
    let hw = Math.max(Math.floor(w * 0.5), 1);
    let h = Math.abs(data.o - data.c);
    let max_h = data.c === data.o ? 1 : 2;
    let x = data.x + hw;
    let x05 = Math.floor(x) - 0.5;

    ctx.save();
    ctx.strokeStyle = wickColour;

    ctx.beginPath();
    ctx.moveTo(x05, Math.floor(data.h));

    // Wicks
    if (this.cfg.candleType === "OHLC") {
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

    // Body
    if (data.w > 1.5 && this.fill) {

      ctx.fillStyle = bodyColour;

      let s = hilo ? 1 : -1;
      ctx.rect(
        Math.floor(x - hw -1),
        data.c,
        Math.floor(hw * 2 + 1),
        s * Math.max(h, max_h),
      );
      ctx.fill();
      ctx.stroke();
    } 
    else if (data.w > 1.5 && !this.fill && this.cfg.candleType !== "OHLC") {
      let s = hilo ? 1 : -1;
      ctx.rect(
        Math.floor(x - hw -1),
        data.c,
        Math.floor(hw * 2 + 1),
        s * Math.max(h, max_h),
      );
      ctx.stroke();
    } 
    else if (this.cfg.candleType === "OHLC") {
      // ctx.strokeStyle = wickColour
      ctx.beginPath();
      ctx.moveTo(x05 - hw, data.o);
      ctx.lineTo(x05, data.o);

      ctx.moveTo(x05, data.c);
      ctx.lineTo(x05 + hw, data.c);
      ctx.stroke();
    }
    else {
        // candle to thin for fill, just draw paths
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

// chart-candles.js

class chartCandles extends Candle {

  #target
  #scene
  #config
  #xAxis
  #yAxis
  #core

  constructor(target, xAxis, yAxis, config) {

    super(target.scene, config);

    this.#target = target;
    this.#scene = target.scene;
    this.#config = config;
    this.#xAxis = xAxis;
    this.#yAxis = yAxis;
    this.#core = xAxis.mediator.api.core;
  }

  get target() { return this.#target }

  draw(range=this.#core.range) {
    this.#scene.clear();

    const render = (this.#config.CandleType === "AREA") ?
      (candle) => {} :
      (candle) => {super.draw(candle);};
    const offset = this.#xAxis.smoothScrollOffset || 0;
    const candle = {
      x: 2 + offset - this.#xAxis.candleW,
      w: this.#xAxis.candleW
    };

    let o = this.#xAxis.rangeScrollOffset;
    let c = range.indexStart - o;
    let i = range.Length + o + 2;
    let x;

    while(i) {
      x = range.value( c );
      if (x?.[7]) {
        this.#core.stream.lastXPos = candle.x;
        break
      }
      if (x[4] !== null) {
        candle.o = this.#yAxis.yPos(x[1]);
        candle.h = this.#yAxis.yPos(x[2]);
        candle.l = this.#yAxis.yPos(x[3]);
        candle.c = this.#yAxis.yPos(x[4]);
        candle.raw = x;
        // super.draw(candle)
        render(candle);
      }
      c++;
      i--;
      candle.x = candle.x + candle.w;
    }

    if (this.#config.CandleType === "AREA") super.areaRender();
  }

}

// range.js

function getRange( allData, start=0, end=allData.data.length-1 ) {
  let r = allData;
  r.dataLength = r.data.length - 1;

  // check and correct start and end argument order
  if (start > end) [start, end] = [end, start];

  // minimum range constraint
  if ((end - start) < MINCANDLES) end = start + MINCANDLES + 1;

  // set out of history bounds limits
  start = (start < LIMITPAST * -1) ? LIMITPAST * -1 : start;
  end = (end < (LIMITPAST * -1) + MINCANDLES) ? (LIMITPAST * -1) + MINCANDLES + 1 : end;
  start = (start > r.dataLength + LIMITFUTURE - MINCANDLES) ? r.dataLength + LIMITFUTURE - MINCANDLES - 1: start;
  end = (end > r.dataLength + LIMITFUTURE) ? r.dataLength + LIMITFUTURE : end;
  
  r.value = (index) => { return rangeValue(index, r)};
  r.index = (ts) => { return getTimeIndex(ts, r) };
  r.inRange = (ts) => { return inRange(ts, r) };
  r.inPriceHistory = (ts) => { return inRange(ts, r) };
  r.rangeIndex = (ts) => { return getTimeIndex(ts, r) - r.indexStart };
  r.interval = r.data[1][0] - r.data[0][0];
  r.intervalStr = ms2Interval(r.interval);
  r.indexStart = start;
  r.indexEnd = end;
  r.Length = r.indexEnd - r.indexStart;
  r.timeStart = r.value(0)[0];
  r.timeFinish = r.value(r.dataLength)[0];
  r.timeDuration = r.timeFinish - r.timeStart;
  r.timeMin = r.value(r.indexStart)[0];
  r.timeMax = r.value(r.indexEnd)[0];
  r.rangeDuration = r.timeMax - r.timeMin;
  r = {...r, ...maxMinPriceVol(r.data, r.indexStart, r.indexEnd)};
  r.height = r.priceMax - r.priceMin;
  r.volumeHeight = r.volumeMax - r.volumeMin;
  r.scale = (r.Length) / (r.dataLength);
  return r
}

function inRange(t, range) {
  if (t >= range.timeMin && t <= range.timeMax)
    return true
  else return false
}

function rangeValue( index, range ) {
  // return last value as default
  if (!isNumber(index)) index = range.data.length - 1;

  let v = range.data[index];
  if (v !== undefined) return v
  else {
    const len = range.data.length - 1;
    v = [null, null, null, null, null, null];
    if (index < 0) {
      v[0] = range.data[0][0] + (range.interval * index);
      return v
    }
    else if (index > len) {
      v[0] = range.data[len][0] + (range.interval * (index - len));
      return v
    }
    else return null
  }
}

/**
 * Find price maximum and minimum, volume maximum and minimum
 *
 * @export
 * @param {array} data
 * @param {number} [start=0]
 * @param {number} [end=data.length-1]
 * @return {object}  
 */
function maxMinPriceVol( data, start=0, end=data.length-1 ) {

  let l = (data.length-1) ? data.length-1 : 0;
  let i = limit(start, 0, l);
  let c = limit(end, 0, l);

  let priceMin  = data[i][3];
  let priceMax  = data[i][2];
  let volumeMin = data[i][5];
  let volumeMax = data[i][5];

  while(i++ < c) {
    priceMin  = (data[i][3] < priceMin) ? data[i][3] : priceMin;
    priceMax  = (data[i][2] > priceMax) ? data[i][2] : priceMax;
    volumeMin = (data[i][5] < volumeMin) ? data[i][5] : volumeMin;
    volumeMax = (data[i][5] > volumeMax) ? data[i][5] : volumeMax;
  }

  return {
    priceMin: priceMin * (1 - YAXIS_BOUNDS),
    priceMax: priceMax * (1 + YAXIS_BOUNDS),
    volumeMin: volumeMin,
    volumeMax: volumeMax
  }
}


// Detects candles interval
function detectInterval(ohlcv) {

  let len = Math.min(ohlcv.length - 1, 99);
  let min = Infinity;
  ohlcv.slice(0, len).forEach((x, i) => {
      let d = ohlcv[i+1][0] - x[0];
      if (d === d && d < min) min = d;
  });
  // This saves monthly chart from being awkward
  // if (min >= WEEK_MS * 4 && min <= DAY_MS * 30) {
  //     return DAY_MS * 31
  // }
  return min
}

function getTimeIndex(ts, r) {
  // if (r.inRange(ts)) {
  //   let i = r.indexStart
  //   while (i++ <= r.indexEnd) {
  //     if (ts === r.value(i)[0]) return i
  //   }
  //   return false
  // }

  if (!isNumber(ts)) return false
  ts = ts - (ts % r.interval);

  let x = r.data[0][0];
  if (ts === x) 
    return 0
  else if (ts < x)
    return ((x - ts) / r.interval) * -1
  else 
    return (ts - x) / r.interval
}

function calcTimeIndex(time, dateStamp) {
  if (!isNumber(dateStamp)) return false

  let index;
  let timeFrameMS = time.timeFrameMS;
  dateStamp = dateStamp - (dateStamp % timeFrameMS);

  if (dateStamp === time.range.data[0][0])
    index = 0;
  else if (dateStamp < time.range.data[0][0]) 
    index = ((time.range.data[0][0] - dateStamp) / timeFrameMS) * -1;
  else 
    index = (dateStamp - time.range.data[0][0]) / timeFrameMS;

  return index
}

// chart-streamCandle.js

class chartStreamCandle extends Candle {

  #target
  #scene
  #config
  #xAxis
  #yAxis
  #core

  constructor(target, xAxis, yAxis, config) {

    super(target.scene, config);

    this.#target = target;
    this.#scene = target.scene;
    this.#config = config;
    this.#xAxis = xAxis;
    this.#yAxis = yAxis;
    this.#core = xAxis.mediator.api.core;
    this.#config.priceLineStyle = this.#config?.priceLineStyle || PriceLineStyle;
  }

  get target() { return this.#target }

  draw(stream) {
    this.#scene.clear();

    const r = this.#core.range;
    const render = (this.#config.CandleType === "AREA") ?
      (candle) => {} :
      (candle) => {super.draw(candle);};
    this.#xAxis.smoothScrollOffset || 0;
    const pos = this.#core.stream.lastXPos;
    const candle = {
      x: pos, // offset + pos,
      w: this.#xAxis.candleW
    };
    candle.o = this.#yAxis.yPos(stream[1]);
    candle.h = this.#yAxis.yPos(stream[2]);
    candle.l = this.#yAxis.yPos(stream[3]);
    candle.c = this.#yAxis.yPos(stream[4]);
    candle.raw = stream;

    if (r.inRange(stream[0])) {
      render(candle);

      if (this.#config.CandleType === "AREA") super.areaRender();
    }


    if (stream[4] >= stream[1]) this.#config.priceLineStyle.strokeStyle = CandleStyle.COLOUR_CANDLE_UP;
    else this.#config.priceLineStyle.strokeStyle = CandleStyle.COLOUR_CANDLE_DN;

    // draw price line 
    renderHorizontalLine (
      this.#scene.context, 
      candle.c, 
      0, 
      this.#target.width, 
      this.#config.priceLineStyle
    );
  }

}

// chart-cursor.js

class chartCursor {

  #target
  #scene
  #config
  #chart
  #xAxis
  #yAxis
  #cursorPos = [0,0]

  constructor(target, chart, xAxis, yAxis, config) {

    this.#target = target;
    this.#scene = target.scene;
    this.#config = config;
    this.#chart = chart;
    this.#xAxis = xAxis;
    this.#yAxis = yAxis;

    this.#chart.on("chart_pan", (e) => { this.onMouseDragX(e); });
    this.#chart.on("chart_panDone", (e) => { this.onMouseDragX(e); });
    this.#chart.on("main_mousemove", (e) => { this.onMouseMoveX(e); });
    this.#chart.on(`${this.#chart.ID}_mousemove`, (e) => { this.onMouseMoveY(e); });
  }

  onMouseDragX(e) {
    this.#cursorPos[0] = e[0];
    this.draw(true);
  }
  onMouseMoveX(e) {
    this.#cursorPos[0] = e[0];
    this.draw();
  }
  onMouseMoveY(e) {
    this.#cursorPos[1] = e[1];
    this.draw();
  }

  draw(drag = false) {

    let x = this.#cursorPos[0];
        if (!drag) x = this.#xAxis.xPosSnap2CandlePos(x) + this.#xAxis.scrollOffsetPx;
    let y = this.#cursorPos[1];

    this.#scene.clear();
    const ctx = this.#scene.context;
    ctx.save();

    ctx.setLineDash([5, 5]);

    // X
    const offset = this.#xAxis.smoothScrollOffset || 0;

    ctx.strokeStyle = "#666";
    ctx.beginPath();
    ctx.moveTo(x + offset, 0);
    ctx.lineTo(x + offset, this.#scene.height);
    ctx.stroke();
    // Y
    if (this.#chart.cursorActive) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.#scene.width, y);
      ctx.stroke();
    }
    ctx.restore();

    this.#target.viewport.render();
  }

}

// state-chart.js

var stateMachineConfig$3 = {
  id: "chart",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter (data) {
        this.context.origin.setCursor("crosshair");

        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit (data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        chart_pan: {
          target: 'chart_pan',
          action (data) {
            this.context.origin.setCursor("grab");

            // console.log(`${this.id}: transition from "${this.state}" to  "chart_pan"`)
          },
        },
        chart_tool: {
          target: 'chart_tool',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "chart_tool"`)
          },
        },
        chart_zoom: {
          target: 'chart_zoom',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to  "chart_zoom"`)
          },
        },
        xAxis_scale: {
          target: 'xAxis_scale',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to  "xAxis_scale"`)
          },
        },
        tool_activated: {
          target: 'tool_activated',
          action (data) {
            this.context.origin.setCursor("default");

            // console.log(`${this.id}: transition from "${this.state}" to  "xAxis_scale"`)
          },
        },
      }
    },
    chart_pan: {
      onEnter (data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit (data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        chart_pan: {
          target: 'chart_pan',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "chart_pan"`)
            this.context.origin.updateRange(data); 
          },
        },
        chart_panDone: {
          target: 'idle',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "chart_panDone"`)
            this.context.origin.updateRange(data); 
          },
        },
      }
    },
    chart_zoom: {
      onEnter (data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit (data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        always: {
          target: 'idle',
          condition: 'zoomDone',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "idle"`)
            this.context.origin.zoomRange(data); 
          },
        },
      }
    },
    xAxis_scale: {
      onEnter (data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit (data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        Idle: {
          target: 'idle',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "onIdle"`)
          },
        },
      }
    },
    tool_activated: {
      onEnter (data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit (data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        tool_targetSelected: {
          target: 'idle',
          condition: 'toolSelectedThis',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "onIdle"`)
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

// chart.js

const STYLE_CHART = ""; // "position: absolute; top: 0; left: 0; border: 1px solid; border-top: none; border-bottom: none;"
const STYLE_SCALE$2 = "position: absolute; top: 0; right: 0; border-left: 1px solid;";
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
  #chartVolume
  #chartIndicators = new Map()
  #chartCandles
  #chartStreamCandle
  #chartTools = new Map()
  #chartCursor

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
    this.#parent = {...this.#mediator.api.parent};
    this.#core = this.#mediator.api.core;
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

  init(options) {

    // process options
    if (isObject(options)) {
      for (const option in options) {
        if (option in this.props()) {
          this.props()[option](options[option]);
        }
      }
    }

    // mount chart on DOM
    this.mount(this.#elChart);

    // Legends - to display indicator overlay Title, inputs and options
    let chartLegend = {
      id: "chart",
      title: this.#title,
      type: "chart"
    };
    this.#Legends = new Legends(this.#elLegends);
    this.#Legends.add(chartLegend);

    // api - functions / methods, calculated properties provided by this module
    const api = {...this.#mediator.api};
    api.parent = this;
    api.chart = this;
    api.elements = 
    {...api.elements, 
      ...{
        // elWidgets: this.#elWidgets,
        // elCanvas: this.#elCanvas,
        elScale: this.#elScale
      }
    };
    api.onChart = this.#mediator.api.onChart;
    api.legends = this.#Legends;

    // Y Axis - Price Scale
    options.yAxisType = "default";
    this.#Scale = this.#mediator.register("Chart_ScaleBar", ScaleBar, options, api);


    // window.tradex_chart_scale = this.#Scale
    // onChart indicators
    // this.#onChart = this.#mediator.register("OnChart", OnChart, options, api)


    // set up layout responsiveness
    // let dimensions = {wdith: this.#width, height: this.#height}
    // this.emit("resizeChart", dimensions)


    this.log(`${this.#name} instantiated`);
  }


  start() {

    // X Axis - Timeline
    this.#Time = this.mediator.api.Timeline;

    // Y Axis - Price Scale
    this.#Scale.on("started",(data)=>{this.log(`Chart scale started: ${data}`);});
    this.#Scale.start(`Chart says to Scale, "Thanks for the update!"`);

    // prepare layered canvas
    this.createViewport();
    // draw the chart - grid, candles, volume
    this.draw(this.range);

    // set mouse pointer
    this.setCursor("crosshair");

    // set up event listeners
    this.eventsListen();

    // start State Machine 
    stateMachineConfig$3.context.origin = this;
    this.#mediator.stateMachine = stateMachineConfig$3;
    this.#mediator.stateMachine.start();
  }

  end() {
    this.#controller.removeEventListener("mousemove", this.onMouseMove);
    this.#controller.removeEventListener("mouseenter", this.onMouseEnter);
    this.#controller.removeEventListener("mouseout", this.onMouseOut);
    this.#controller.removeEventListener("mousedown", this.onMouseDown);

    this.off("main_mousemove", this.onMouseMove);
  }


  eventsListen() {
    // create controller and use 'on' method to receive input events 
    this.#controller = new InputController(this.#elCanvas, {disableContextMenu: false});
    this.#controller.on("mousemove", this.onMouseMove.bind(this));
    this.#controller.on("mouseenter", this.onMouseEnter.bind(this));
    this.#controller.on("mouseout", this.onMouseOut.bind(this));
    this.#controller.on("mousedown", this.onMouseDown.bind(this));

    // listen/subscribe/watch for parent notifications
    this.on("main_mousemove", (pos) => this.updateLegends(pos));
    this.on(STREAM_LISTENING, (stream) => this.onStreamListening(stream));
    this.on(STREAM_NEWVALUE, (candle) => this.onStreamNewValue(candle));
    this.on(STREAM_UPDATE, (candle) => this.onStreamUpdate(candle));
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

  onMouseWheel(e) {
    const direction = Math.sign(e.wheeldelta);
    const range = this.range;
    const newStart = range.indexStart - Math.floor(direction * XAXIS_ZOOM * range.Length);
    const newEnd = range.indexEnd + Math.floor(direction * XAXIS_ZOOM * range.Length);
    const oldStart = range.indexStart;
    const oldEnd = range.indexEnd;
    const inOut = (range)? "out" : "in";

    this.emit("setRange", [newStart, newEnd, oldStart, oldEnd]);
    this.emit("chart_zoom", [newStart, newEnd, oldStart, oldEnd, inOut]);
    this.emit(`chart_zoom_${inOut}`, [newStart, newEnd, oldStart, oldEnd]);
  }
  
  onMouseMove(e) {
    this.#cursorPos = [Math.floor(e.position.x), Math.floor(e.position.y)];
    this.emit("chart_mousemove", this.#cursorPos);
    this.updateLegends();
  }

  onMouseEnter(e) {
    this.#cursorActive = true;
    this.#cursorPos = [Math.floor(e.position.x), Math.floor(e.position.y)];
    this.emit(`${this.ID}_mouseenter`, this.#cursorPos);
  }

  onMouseOut(e) {
    this.#cursorActive = false;
    this.#cursorPos = [Math.floor(e.position.x), Math.floor(e.position.y)];
    this.emit(`${this.ID}_mouseout`, this.#cursorPos);
  }

  onMouseDown(e) {
    this.#cursorClick = [Math.floor(e.position.x), Math.floor(e.position.y)];
    if (this.stateMachine.state === "tool_activated") this.emit("tool_targetSelected", {target: this, position: e});
  }

  onStreamListening(stream) {
    if (this.#Stream !== stream) {
      this.#Stream = stream;
      if (this.#layerStream === undefined) this.layerStream();
    }
  }

  onStreamNewValue(candle) {
    // this.#chartStreamCandle.draw(candle)
    // this.#viewport.render()
    this.draw(this.range, true);
  }

  onStreamUpdate(candle) {
    this.#streamCandle = candle;
    this.#layerStream.setPosition(this.#core.stream.lastScrollPos, 0);
    this.#chartStreamCandle.draw(candle);
    this.#viewport.render();

    this.updateLegends(this.#cursorPos, candle);
  }

  onYAxisRedraw() {
    this.#Scale.draw();
    this.draw(this.range, true);
  }

  mount(el) {
    el.innerHTML = this.defaultNode();

    const api = this.#mediator.api;
    // this.#elWidgets = DOM.findBySelector(`#${api.id} .${CLASS_WIDGETS}`)
    this.#elViewport = DOM.findBySelector(`#${api.id} .${CLASS_CHART} .viewport`);
    this.#elLegends = DOM.findBySelector(`#${api.id} .${CLASS_CHART} .legends`);
    this.#elScale = DOM.findBySelector(`#${api.id} .${CLASS_CHART} .${CLASS_SCALE}`);
  }

  props() {
    return {
      // id: (id) => this.setID(id),
      title: (title) => this.#title = title,
      yAxisDigits: (digits) => this.setYAxisDigits(digits),
      theme: (theme) => this.setTheme(theme),
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
    const width = dim.w - this.#elScale.clientWidth;
    const height = dim.h;
    const layerWidth = Math.round(width * ((100 + buffer) * 0.01));

    this.#viewport.setSize(width, height);
    this.#layerGrid.setSize(layerWidth, height);
    this.#layerVolume.setSize(layerWidth, height);
    // TODO: iterate layersOnChart and setSize()
    // this.#layersOnChart.setSize(layerWidth, height)
    this.#layerCandles.setSize(layerWidth, height);
    this.#layerStream.setSize(layerWidth, height);
    this.#layerCursor.setSize(width, height);

    this.setWidth(dim.w);
    this.setHeight(dim.h);
    this.#Scale.resize(dim.w, dim.h);

    this.draw(undefined, true);
  }

  setTheme(theme) {
    this.#theme = theme;
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
    const styleLegend = `position: absolute; top: 0; left: 0; z-index:100;`;

    const node = `
      <div class="viewport" style="${styleChart}"></div>
      <div class="legends" style="${styleLegend}"></div>
      <div class="${CLASS_SCALE}" style="${styleScale}"></div>
    `;
    return node
  }


// -----------------------

  setTimezone(timezone) {}
  getTimezone(timezone) {}
  // setChartStyle(chartStyle) {}
  // getChartStyle(chartStyle) {}
  // setChartTheme(chartTheme) {}
  // getChartTheme(chartTheme) {}

  loadData(data) {}
  updateData(data) {}

  createViewport() {

    const {width, height, layerConfig} = this.layerConfig();

    // create viewport
    this.#viewport = new CEL.Viewport({
      width: width,
      height: height,
      container: this.#elViewport
    });
    this.#elCanvas = this.#viewport.scene.canvas;

    // create layers - grid, volume, candles
    this.#layerGrid = new CEL.Layer(layerConfig);
    this.#layerVolume = new CEL.Layer(layerConfig);
    this.#layerCandles = new CEL.Layer(layerConfig);
    this.#layersOnChart = this.layersOnChart(layerConfig);
    this.#layerCursor = new CEL.Layer();

    // add layers
    this.#viewport
          .addLayer(this.#layerGrid)
          .addLayer(this.#layerVolume);

    this.addLayersOnChart();

    this.#viewport
          .addLayer(this.#layerCandles);

    if (isObject(this.config.stream)) 
      this.addLayerStream();

    this.#viewport
          .addLayer(this.#layerCursor);

    // add overlays
    this.#chartCursor = 
    new chartCursor(
      this.#layerCursor, 
      this,
      this.#Time, 
      this.#Scale, 
      this.#theme);

    // this.#chartIndicators = this.chartIndicators()
    
    if (isObject(this.config.stream))
      this.#chartStreamCandle = 
        new chartStreamCandle(
          this.#layerStream, 
          this.#Time, 
          this.#Scale, 
          this.#theme);

    this.#chartCandles = 
      new chartCandles(
        this.#layerCandles, 
        this.#Time, 
        this.#Scale, 
        this.#theme);

    this.#theme.maxVolumeH = this.#theme?.onchartVolumeH || VolumeStyle.ONCHART_VOLUME_HEIGHT;
    this.#chartVolume =
      new chartVolume(
        this.#layerVolume, 
        this.#Time, 
        this.#Scale, 
        this.#theme);

    this.#chartGrid =
      new chartGrid(
        this.#layerGrid, 
        this.#Time, 
        this.#Scale, 
        this.#theme);
  }

  layerConfig() {
    const buffer = this.config.buffer || BUFFERSIZE$1;
    const width = this.#elViewport.clientWidth;
    const height = this.#options.chartH || this.#parent.rowsH - 1;
    const layerConfig = { 
      width: Math.round(width * ((100 + buffer) * 0.01)), 
      height: height
    };
    return {width, height, layerConfig}
  }

  layersOnChart() {
    let l = [];
    let { layerConfig } = this.layerConfig();

    for (let i = 0; i < this.#onChart.length; i++) {
      l[i] = new CEL.Layer(layerConfig);
    }
    return l
  }

  addLayersOnChart() {
    for (let i = 0; i < this.#layersOnChart.length; i++) {
      this.#viewport.addLayer(this.#layersOnChart[i]);
    }
  }

  chartIndicators() {
    const indicators = [];
    for (let i = 0; i < this.#layersOnChart.length; i++) {
      indicators[i] = 
        new indicator(
          this.#layersOnChart[i], 
          this.#Time,
          this.#Scale,
          this.config);
    } 
    return indicators
  }

  layersTools() {

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
    // for (let i = 0; i < this.#layersTools.length; i++) {
      // tools[i] = 
        // new indicator(
        //   this.#layersOnChart[i], 
        //   this.#Time,
        //   this.#Scale,
        //   this.config)
    // } 
    // return tools
  }

  chartToolAdd(tool) {
    // create new tool layer

    this.#chartTools.set(tool.id, tool);
  }

  chartToolDelete(tool) {
    this.#chartTools.delete(tool);
  }

  layerStream() {
    // if the layer and instance were no set from chart config, do it now
    this.addLayerStream();

    if (!this.#chartStreamCandle) {
      this.#chartStreamCandle = 
      new chartStreamCandle(
        this.#layerStream, 
        this.#Time, 
        this.#Scale, 
        this.#theme);
    }
  }

  addLayerStream() {
    if (!this.#layerStream) {
      const {width, height, layerConfig} = this.layerConfig();
      this.#layerStream = new CEL.Layer(layerConfig);
      this.#viewport.addLayer(this.#layerStream);
    }
  }

  draw(range=this.range, update=false) {
    this.#layerGrid.setPosition(this.#core.scrollPos, 0);
    this.#layerVolume.setPosition(this.#core.scrollPos, 0);
    this.#layerCandles.setPosition(this.#core.scrollPos, 0);
    if (this.#layerStream) {
      this.#layerStream.setPosition(this.#core.scrollPos, 0);
      this.#core.stream.lastScrollPos = this.#core.scrollPos;
    }

    if (this.scrollPos == this.bufferPx * -1 || 
        this.scrollPos == 0 || 
        update == true) 
    {
      this.#chartGrid.draw("y");
      this.#chartVolume.draw(range);
      this.#chartCandles.draw(range);
    }
    if (this.#layerStream && this.#streamCandle) 
      this.#chartStreamCandle.draw(this.#streamCandle);

    this.#viewport.render();
  }

  drawStream(candle) {

  }

  time2XPos(time) {
    return this.#Time.xPos(time)
  }

  price2YPos(price) {
    return this.#Scale.yPos(price)
  }

  /**
   * Set the price accuracy
   * @param pricePrecision - Price accuracy
   */
  setPriceVolumePrecision (pricePrecision) {
    if (!isNumber(pricePrecision) || pricePrecision < 0) {
      this.warning('setPriceVolumePrecision', 'pricePrecision', 'pricePrecision must be a number and greater than zero!!!');
      return
    }
    this.#pricePrecision = pricePrecision;
  }

  /**
   * Set the volume accuracy
   * @param volumePrecision - Volume accuracy
   */
  setPriceVolumePrecision (volumePrecision) {
    if (!isNumber(volumePrecision) || volumePrecision < 0) {
      logWarn('setPriceVolumePrecision', 'volumePrecision', 'volumePrecision must be a number and greater than zero!!!');
      return
    }
    this.#volumePrecision = volumePrecision;
  }

  updateLegends(pos=this.#cursorPos, candle=false) {

    const legends = this.#Legends.list;
    const inputs = {};
      let ohlcv = this.#Time.xPosOHLCV(pos[0]);
      let colours = [];

    if (this.#Stream && ohlcv[4] === null) ohlcv = candle;

    // TODO: get candle colours from config / theme
    if (ohlcv[4] >= ohlcv[1]) colours = new Array(5).fill(CandleStyle.COLOUR_WICK_UP);
    else colours = new Array(5).fill(CandleStyle.COLOUR_WICK_DN);

    inputs.O = this.#Scale.nicePrice(ohlcv[1]);
    inputs.H = this.#Scale.nicePrice(ohlcv[2]);
    inputs.L = this.#Scale.nicePrice(ohlcv[3]);
    inputs.C = this.#Scale.nicePrice(ohlcv[4]);
    inputs.V = this.#Scale.nicePrice(ohlcv[5]);

    for (const legend in legends) {
      this.#Legends.update(legend, {inputs: inputs, colours: colours});
    }
  }

  /**
   * Calculate new range index / position 
   * @param {array} pos - [x2, y2, x1, y1, xdelta, ydelta]
   * @returns 
   */
  updateRange(pos) {
    // draw the chart - grid, candles, volume
    this.draw(this.range);
  }

  /**
   * Zoom (contract or expand) range start
   * @param {array} data - [newStart, newEnd, oldStart, oldEnd, inOut]
   */
  zoomRange(data) {

    this.#core.setRange(data[0], data[1]);

    // draw the chart - grid, candles, volume
    this.draw(this.range, true);

    this.emit("chart_zoomDone");
  }

  resize(width=this.width, height=this.height) {
    // adjust element, viewport and layers
    this.setDimensions({w: width, h: height});
  }
}

// state-chart.js

var stateMachineConfig$2 = {
  id: "offChart",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(data) {
        this.context.origin.setCursor("crosshair");

        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit(data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        chart_pan: {
          target: 'chart_pan',
          action (data) {
            this.context.origin.setCursor("grab");

            // console.log('transition action for "chart_pan" in "idle" state')
          },
        },
        chart_zoom: {
          target: 'chart_zoom',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to  "chart_zoom"`)
          },
        },
        chart_tool: {
          target: 'chart_tool',
          action (data) {
            // console.log('transition action for "chart_tool" in "idle" state')
          },
        },
        xAxis_scale: {
          target: 'xAxis_scale',
          action (data) {
            // console.log('transition action for "xAxis_scale" in "idle" state')
          },
        },
        offChart_mouseDown: {
          target: 'offChart_mouseDown',
          action (data) {
            // console.log('transition action for "xAxis_scale" in "idle" state')
          },
        },
        offChart_mouseUp: {
          target: 'offChart_mouseUp',
          action (data) {
            // console.log('transition action for "xAxis_scale" in "idle" state')
          },
        },
        tool_activated: {
          target: 'tool_activated',
          action (data) {
            this.context.origin.setCursor("default");

            // console.log(`${this.id}: transition from "${this.state}" to  "xAxis_scale"`)
          },
        },
      }
    },
    chart_pan: {
      onEnter(data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit(data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        chart_pan: {
          target: 'chart_pan',
          action (data) {
            // console.log('offChart action for "chart_panDone" in "chart_pan" state')
            this.context.origin.updateRange(data); 
          },
        },
        chart_panDone: {
          target: 'idle',
          action (data) {
            // console.log('offChart action for "chart_panDone" in "chart_pan" state')
            this.context.origin.updateRange(data); 
          },
        },
      }
    },
    chart_zoom: {
      onEnter(data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit(data) {
        // console.log(`${this.id}: state: - onExit (${this.event})`)
      },
      on: {
        always: {
          target: 'idle',
          condition: 'zoomDone',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "chart_zoom"`)
            this.context.origin.range;
            this.context.origin.zoomRange();
          },
        },
      }
    },
    xAxis_scale: {
      onEnter(data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit(data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        Idle: {
          target: 'idle',
          action (data) {
            // console.log('transition action for "onIdle" in "XScale" state')
          },
        },
      }
    },
    offChart_mouseDown: {
      onEnter(data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit(data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        Idle: {
          target: 'idle',
          action (data) {
            // console.log('transition action for "onIdle" in "XScale" state')
          },
        },
      }
    },
    offChart_mouseUp: {
      onEnter(data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit(data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        Idle: {
          target: 'idle',
          action (data) {
            // console.log('transition action for "onIdle" in "XScale" state')
          },
        },
      }
    },
    tool_activated: {
      onEnter(data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit(data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        tool_targetSelected: {
          target: 'idle',
          condition: 'toolSelectedThis',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "onIdle"`)
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

// offChart.js

const STYLE_OFFCHART = ""; // "position: absolute; top: 0; left: 0; border: 1px solid; border-top: none; border-bottom: none;"
const STYLE_SCALE$1 = "position: absolute; top: 0; right: 0; border-left: 1px solid;";

class OffChart {

  #ID
  #name = "OffChart"
  #shortName = "offChart"
  #mediator
  #options
  #core
  #parent

  #elOffChart
  #elViewport
  #elLegends
  #elScale

  #Scale
  #Time
  #Legends
  #Indicator
  #overlay
  #offChartID
  #Divider
  #Stream

  #viewport
  #layerGrid
  #layerCursor
  #layersIndicator
  #layersTools
  #layerStream

  #overlayGrid
  #overlayIndicator
  #overlayCursor

  #cursorPos = [0, 0]
  #cursorActive = false

  #settings
  #chartCandle
  #title
  #theme
  #controller


  constructor (mediator, options) {

    this.#mediator = mediator;
    this.#elOffChart = mediator.api.elements.elOffChart;
    this.#parent = {...this.mediator.api.parent};
    this.#overlay = options.offChart;
    this.#core = this.mediator.api.core;

    this.#options = options;
    this.#ID = this.#options.offChartID || uid("TX_OC_");
    this.init(options);
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
  get range() { return this.#core.range }
  get pos() { return this.dimensions }
  get dimensions() { return DOM.elementDimPos(this.#elOffChart) }
  get stateMachine() { return this.#mediator.stateMachine }
  get elOffChart() { return this.#elOffChart }
  get element() { return this.#elOffChart }
  get widgets() { return this.#core.WidgetsG }
  get offChartID() { return this.#offChartID }
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

  init(options) {

    // process options
    if (isObject(options)) {
      for (const option in options) {
        if (option in this.props()) {
          this.props()[option](options[option]);
        }
      }
    }
    
    this.mount(this.#elOffChart);

    // Legends - to display indicator overlay Title, inputs and options
    let offChartLegend = {
      id: options.offChart.type,
      title: options.offChart.name,
      type: options.offChart.type
    };
    this.#Legends = new Legends(this.#elLegends);
    this.#Legends.add(offChartLegend);

    // api - functions / methods, calculated properties provided by this module
    const api = {...this.mediator.api};
    api.parent = this;
    api.elements.elScale = this.#elScale;

    // Y Axis - Price Scale
    this.#Indicator = this.#mediator.api.indicators[this.#overlay.type].ind;
    options.yAxisType = this.#Indicator.scale;
    const id = options.offChart.type + "_ScaleBar";
    this.#Scale = this.mediator.register(id, ScaleBar, options, api);
    this.#Time = this.core.Timeline;
  }

  start(index) {
    
    this.#offChartID = index;

    // X Axis - Timeline
    this.#Time = this.mediator.api.Timeline;

    // Y Axis - Price Scale
    this.#Scale.on("started",(data)=>{this.log(`OffChart scale started: ${data}`);});
    this.#Scale.start("OffChart",this.name,"yAxis Scale started");

    // add divider to allow manual resize of the offChart indicator
    const config = { offChart: this };
    this.#Divider = this.widgets.insert("Divider", config);
    this.#Divider.start();

    // prepare layered canvas
    this.createViewport();
    // draw the chart - grid, candles, volume
    this.draw(this.range);

    // set mouse pointer
    this.setCursor("crosshair");
  
    // set up event listeners
    this.eventsListen();

    // start State Machine 
    stateMachineConfig$2.context.origin = this;
    this.mediator.stateMachine = stateMachineConfig$2;
    this.mediator.stateMachine.start();
  }

  end() {
    this.#controller.removeEventListener("mousemove", this.onMouseMove);
    this.#controller.removeEventListener("mouseenter", this.onMouseEnter);
    this.#controller.removeEventListener("mouseout", this.onMouseOut);
    this.#controller.removeEventListener("mousedown", this.onMouseDown);

    this.off("main_mousemove", this.updateLegends);
  }


  eventsListen() {
    // create controller and use 'on' method to receive input events 
    this.#controller = new InputController(this.#elOffChart, {disableContextMenu: false});

    this.#controller.on("mousemove", this.onMouseMove.bind(this));
    this.#controller.on("mouseenter", this.onMouseEnter.bind(this));
    this.#controller.on("mouseout", this.onMouseOut.bind(this));
    this.#controller.on("mousedown", this.onMouseDown.bind(this));

    // listen/subscribe/watch for parent notifications
    this.on("main_mousemove", this.updateLegends.bind(this));
    this.on(STREAM_LISTENING, (stream) => this.onStreamListening(stream));
    this.on(STREAM_NEWVALUE, (value) => this.onStreamNewValue(value));
    this.on(STREAM_UPDATE, (value) => this.onStreamUpdate(value));
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
    // this.#cursorPos = [e.layerX, e.layerY]
    this.#cursorPos = [Math.floor(e.position.x), Math.floor(e.position.y)];
    this.emit(`${this.ID}_mousemove`, this.#cursorPos);
    this.updateLegends();
  }

  onMouseEnter(e) {
    this.#cursorActive = true;
    this.#cursorPos = [Math.floor(e.position.x), Math.floor(e.position.y)];
    this.emit(`${this.ID}_mouseenter`, this.#cursorPos);
  }

  onMouseOut(e) {
    this.#cursorActive = false;
    this.#cursorPos = [Math.floor(e.position.x), Math.floor(e.position.y)];
    this.emit(`${this.ID}_mouseout`, this.#cursorPos);
  }

  onMouseDown(e) {
    if (this.stateMachine.state === "tool_activated") this.emit("tool_targetSelected", {target: this, position: e});
  }

  onStreamListening(stream) {
    if (this.#Stream !== stream) {
      this.#Stream = stream;
      if (this.#layerStream === undefined) this.layerStream();
    }
  }


  onStreamNewValue(value) {

  }

  onStreamUpdate(value) {

  }

  mount(el) {
    el.id = this.#ID;
    el.innerHTML = this.defaultNode();

    this.mediator.api;
    // this.#elWidgets = DOM.findBySelector(`#${api.id} .${CLASS_WIDGETS}`)
    this.#elViewport = DOM.findBySelector(`#${this.#ID} .viewport`);
    this.#elLegends = DOM.findBySelector(`#${this.#ID} .legends`);
    this.#elScale = DOM.findBySelector(`#${this.#ID} .${CLASS_SCALE}`);
  }

  props() {
    return {
      // id: (id) => this.setID(id),
      title: (title) => this.#title = title,
      yAxisDigits: (digits) => this.setYAxisDigits(digits),
      theme: (theme) => this.setTheme(theme),
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
    const width = dim.w - this.#elScale.clientWidth;
    const height = dim.h;
    const layerWidth = Math.round(width * ((100 + buffer) * 0.01));

    this.#viewport.setSize(width, dim.h);
    this.#layerGrid.setSize(layerWidth, height);
    this.#layersIndicator.setSize(layerWidth, height);
    this.#layerCursor.setSize(width, height);

    this.setWidth(dim.w);
    this.setHeight(dim.h);
    this.#Scale.resize(dim.w, dim.h);

    this.draw(undefined, true);
  }

  setTheme(theme) {
    this.#theme = theme;
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
    const styleLegend = `position: absolute; top: 0; left: 0; z-index:100;`;

    const node = `
      <div class="viewport" style="${styleOffChart}"></div>
      <div class="legends" style="${styleLegend}"></div>
      <div class="${CLASS_SCALE}" style="${styleScale}"></div>
    `;
    return node
  }

// -----------------------

  // setOffChartStyle(chartStyle) {}
  // getOffChartStyle(chartStyle) {}
  // setOffChartTheme(chartTheme) {}
  // getOffChartTheme(chartTheme) {}

  createViewport() {

    const {width, height, layerConfig} = this.layerConfig();

    // create viewport
    this.#viewport = new CEL.Viewport({
      width: width,
      height: height,
      container: this.#elViewport
    });

    // create layers - grid, volume, candles
    this.#layerGrid = new CEL.Layer(layerConfig);
    this.#layersIndicator = this.layersOnRow(layerConfig);
    this.#layerCursor = new CEL.Layer();

    // add layers
    this.#viewport
    .addLayer(this.#layerGrid)
    .addLayer(this.#layersIndicator)
    .addLayer(this.#layerCursor);

    // add overlays
    this.#overlayCursor = 
    new chartCursor(
      this.#layerCursor, 
      this,
      this.#Time, 
      this.#Scale, 
      this.#theme);

    this.#overlayIndicator =
    new this.#Indicator(
      this.#layersIndicator,
      this.#overlay,
      this.#Time, 
      this.#Scale, 
      this.#theme);

    this.#overlayGrid =
    new chartGrid(
      this.#layerGrid, 
      this.#Time, 
      this.#Scale, 
      this.#theme);
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

  layersOnRow(layerConfig) {
    // let l = []

    // for (let i = 0; i < this.#overlay.length; i++) {
    //   l[i] = new CEL.Layer()
    // }
    // return l
    return new CEL.Layer(layerConfig)
  }

  addLayersOnChart() {
    // for (let i = 0; i < this.#layersIndicator.length; i++) {
    //   this.#viewport.addLayer(this.#layersIndicator[i])
    // }
    this.#viewport.addLayer(this.#layersIndicator);
  }

  layerStream() {
    const {width, height, layerConfig} = this.layerConfig();
    this.#layerStream = new CEL.Layer(layerConfig);
    this.#viewport.addLayer(this.#layerStream);
  }

  draw(range=this.range, update=false) {
    this.#layerGrid.setPosition(this.#core.scrollPos, 0);
    this.#layersIndicator.setPosition(this.#core.scrollPos, 0);

    if (this.scrollPos == this.bufferPx * -1 || 
      this.scrollPos == 0 || 
      update == true) 
    {
      this.#overlayGrid.draw("y");
      this.#overlayIndicator.draw(range);
    }

    this.#viewport.render();
  }

  updateLegends(pos=this.#cursorPos) {
    const legends = this.#Legends.list;
    const index = this.#Time.xPos2Index(pos[0]);
    const offset = this.range.data.length - this.#overlayIndicator.overlay.data.length;
    const entry = this.#overlayIndicator.overlay.data[index - offset];

    if (entry !== undefined) {
      const inputs = {};

      for (let i = 0; i < this.#overlayIndicator.plots.length; i++) {
        let plot = this.#overlayIndicator.plots[i];
        // first entry value is expected to be timestamp, so skip it
        inputs[plot.key] = this.#Scale.nicePrice(entry[i + 1]);
      }
  
      for (const legend in legends) {
        this.#Legends.update(legend, {inputs: inputs});
      }
    }
  }

  updateRange(pos) {
    // draw the chart - grid, candles, volume
    this.draw(this.range);
  }

  zoomRange(pos) {
    // draw the chart - grid, candles, volume
    this.draw(this.range, true);
  }

  resize(width=this.width, height=this.height) {
    // adjust partent element
    this.setDimensions({w: width, h: height});
  }

}

// state-chart.js

var stateMachineConfig$1 = {
  id: "main",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit(data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        chart_pan: {
          target: 'chart_pan',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to  "chart_pan"`)
          },
        },
        chart_zoom: {
          target: 'chart_zoom',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to  "chart_zoom"`)
          },
        },
        addIndicator: {
          target: 'addIndicator',
          action (data) {
            // console.log('offChart: transition from "idle" to "addIndicator" state')
          },
        },
        divider_mousedown: {
          target: 'divider_mousedown',
          action (data) {
            // console.log('offChart: transition from "idle" to "addIndicator" state')
          },
        },
        resize: {
          target: 'resize',
          action (data) {
            // console.log('offChart: transition from "idle" to "addIndicator" state')
          },
        },
      }
    },
    chart_pan: {
      onEnter (data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit (data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        chart_pan: {
          target: 'chart_pan',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "chart_pan"`)
            this.context.origin.updateRange(data); 
          },
        },
        chart_panDone: {
          target: 'idle',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "chart_panDone"`)
            this.context.origin.updateRange(data); 
          },
        },
      }
    },
    chart_zoom: {
      onEnter (data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit (data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        always: {
          target: 'idle',
          condition: 'zoomDone',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "idle"`)
            this.context.origin.zoomRange(data); 
          },
        },
      }
    },
    addIndicator: {
      onEnter(data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)

        this.context.origin.addIndicator(data); 
      },
      onExit(data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        addIndicatorDone: {
          target: "idle",
          action (data) {
            // console.log('transition action for "onIdle" in "addIndicator" state')

          },
        }
      }
    },
    divider_mousedown: {
      onEnter(data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)

        this.context.divider = data;
      },
      onExit(data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        main_mousemove: {
          target: "divider_mousemove",
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "ilde"`)
          },
        },
        main_mouseup: {
          target: "idle",
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "ilde"`)
          },
        }
      }
    },
    divider_mousemove: {
      onEnter(data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)

        let divider = this.context.divider;
        this.context.pair = this.context.origin.resizeRowPair(divider, data); 
      },
      onExit(data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        main_mousemove: {
          target: "divider_mousemove",
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "ilde"`)
          },
        },
        main_mouseup: {
          target: "idle",
          action (data) {
            this.actions.removeProperty.call(this);

            // console.log(`${this.id}: transition from "${this.state}" to "ilde"`)
          },
        },
        divider_mouseup: {
          target: "idle",
          action (data) {
            this.actions.removeProperty.call(this);

            // console.log(`${this.id}: transition from "${this.state}" to "ilde"`)
          },
        }
      }
    },
    resize: {
      onEnter(data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
        this.context.origin.setDimensions(data);
      },
      onExit(data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        always: {
          target: 'idle',
          condition: 'resizeDone',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "idle"`)
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
      // active.element.style.removeProperty('pointer-events');
      prev.element.style.removeProperty('user-select');
      // prev.element.style.removeProperty('pointer-events');
    }
  }
};

// main.js

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
  #elMain
  #elRows
  #elTime
  #elChart
  #elOffCharts = []
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

  #offChartDefaultH = OFFCHARTDEFAULTHEIGHT // %
  #offChartDefaultWpx = 120
  #rowMinH = ROWMINHEIGHT // px

  #cursorPos = [0, 0]
  #buffer
  
  #indicators
  #controller

  constructor (mediator, options) {

    this.#mediator = mediator;
    this.#options = options;
    this.#elMain = mediator.api.elements.elMain;
    this.#parent = {...this.#mediator.api.parent};
    this.#core = this.#mediator.api.core;
    this.init(options);
  }

  log(l) { this.#mediator.log(l); }
  info(i) { this.#mediator.info(i); }
  warning(w) { this.#mediator.warn(w); }
  error(e) { this.#mediator.error(e); }

  get name() { return this.#name }
  get shortName() { return this.#shortName }
  get mediator() { return this.#mediator }
  get chart() { return this.#Chart }
  get time() { return this.#Time }
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

    api.parent = this;
    api.chartData = this.mediator.api.chartData;
    api.onChart = this.#mediator.api.onChart;
    api.offChart = this.#mediator.api.offChart;
    api.rangeLimit = this.#mediator.api.rangeLimit;
    api.settings = this.#mediator.api.settings;

    // api - functions / methods, calculated properties provided by this module
    api.elements = 
      {...api.elements, 
        ...{
          elChart: this.#elChart,
          elTime: this.#elTime,
          elRows: this.#elRows,
          elOffCharts: this.#elOffCharts
        }
      };

    // register timeline - xAxis
    this.#Time = this.#mediator.register("Timeline", Timeline, options, api);
    // register offChart
    this.registerOffCharts(options, api);
    // register chart
    this.#Chart = this.#mediator.register("Chart", Chart, options, api);

    this.#buffer = isNumber(this.config.buffer)? this.config.buffer : BUFFERSIZE$1;
    this.#rowMinH = isNumber(this.config.rowMinH)? this.config.rowMinH : ROWMINHEIGHT;
    this.#offChartDefaultH = isNumber(this.config.offChartDefaultH)? this.config.offChartDefaultH : OFFCHARTDEFAULTHEIGHT;

    this.log(`${this.#name} instantiated`);
  }

  start() {
    this.#Time.start();
    this.#Chart.start();

    let i = 0;
    this.#OffCharts.forEach((offChart, key) => {
      offChart.start(i++);
    });

    // prepare layered canvas
    this.createViewport();
    // draw the chart - grid, candles, volume
    this.initXGrid();

    // set up event listeners
    this.eventsListen();

    // start State Machine 
    stateMachineConfig$1.context.origin = this;
    this.#mediator.stateMachine = stateMachineConfig$1;
    this.#mediator.stateMachine.start();
  }

  end() {
    this.#controller.removeEventListener("mousewheel", this.onMouseWheel);
    this.#controller.removeEventListener("mousemove", this.onMouseMove);
    this.#controller.removeEventListener("drag", this.onChartDrag);
    this.#controller.removeEventListener("enddrag", this.onChartDragDone);
    this.#controller.removeEventListener("keydown", this.onChartKeyDown);
    this.#controller.removeEventListener("keyup", this.onChartKeyDown);

    this.off(STREAM_NEWVALUE, this.onNewStreamValue);
  }


  eventsListen() {
    // Give Main focus so it can receive keyboard input
    this.#elMain.tabIndex = 0;
    this.#elMain.focus();

    // create controller and use 'on' method to receive input events 
    this.#controller = new InputController(this.#elMain, {disableContextMenu: false});

    this.#controller.on("mousewheel", this.onMouseWheel.bind(this));
    this.#controller.on("mousemove", this.onMouseMove.bind(this));
    this.#controller.on("drag", this.onChartDrag.bind(this));
    this.#controller.on("enddrag", this.onChartDragDone.bind(this));
    this.#controller.on("keydown", this.onChartKeyDown.bind(this));
    this.#controller.on("keyup", this.onChartKeyUp.bind(this));

    this.#controller.on("mouseup", this.onMouseUp.bind(this));

    // listen/subscribe/watch for parent notifications
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
    const newStart = range.indexStart - Math.floor(direction * XAXIS_ZOOM$1 * range.Length);
    const newEnd = range.indexEnd + Math.floor(direction * XAXIS_ZOOM$1 * range.Length);
    const oldStart = range.indexStart;
    const oldEnd = range.indexEnd;
    const inOut = (range)? "out" : "in";

    this.emit("setRange", [newStart, newEnd, oldStart, oldEnd]);
    this.emit("chart_zoom", [newStart, newEnd, oldStart, oldEnd, inOut]);
    this.emit(`chart_zoom_${inOut}`, [newStart, newEnd, oldStart, oldEnd]);

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
    this.#cursorPos = [
      e.position.x, e.position.y, 
      e.dragstart.x, e.dragstart.y,
      e.movement.x, e.movement.y
    ];
    this.emit("chart_pan", this.#cursorPos);
    this.draw();
  }

  onChartDragDone(e) {
    this.#cursorPos = [
      e.position.x, e.position.y, 
      e.dragstart.x, e.dragstart.y,
      e.movement.x, e.movement.y
    ];
    this.emit("chart_panDone", this.#cursorPos);
    this.draw();
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
    this.draw();
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
    this.draw();
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
    /*
    for (let row of rows) {
      row.style.width = `${Math.round(row.clientWidth * resize)}px`
    }
    */
    this.#elRows.style.width = `${Math.round(w * resize)}px`;
  }

  setHeight(h) {
    const api = this.#mediator.api;
    const resize = this.rowsH / (h - api.timeH);
    this.#elRows.children;
    /*
    for (let row of rows) {
      row.style.height = `${Math.round(row.style.height * resize)}px`
    }
    */
    this.#elRows.style.height = `${Math.round(this.#elRows.style.height * resize)}px`;
  }

  setDimensions(dimensions) {

    let height = dimensions.mainH - this.#Time.height;
    this.height;
    let chartW = dimensions.mainW; // this.#Chart.width
    let chartH = Math.round(this.#Chart.height * dimensions.resizeH) - this.time.height;
    let width = chartW - this.#Chart.scale.width;

    this.setWidth(dimensions.mainW);
    this.setHeight(dimensions.mainH);

    this.#core.scrollPos = -1;

    this.#Time.setDimensions({w: dimensions.mainW});
    this.#Time.draw();

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
      chartH = Math.round(offChart.height * dimensions.resizeH); //- this.time.height
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
      // adjust chart size for first offChart
      options.rowH = this.rowsH * this.#offChartDefaultH / 100;
      options.chartH = this.rowsH - options.rowH;

    }
    else {
      // adjust chart size for subsequent offCharts
      options.rowH = rowsH / this.#OffCharts.size;
      options.chartH = this.rowsH - rowsH;
    }

    for (let o of this.#mediator.api.offChart) {
      this.addOffChart(o, options, api);
    }
    // this.emit("resizeChart", {w: this.rowsW, h: options.chartH})
    // this.#Chart.setDimensions({w: this.rowsW, h: options.chartH})
  }

  /**
   * add off chart indicator below chart and any other off charts
   * @param {object} offChart - data for the indicator
   * @param {object} options 
   * @param {object} api 
   */
  addOffChart(offChart, options, api) {

    this.#elRows.lastElementChild.insertAdjacentHTML("afterend", this.rowNode(offChart.type));
    this.#elOffCharts.push(this.#elRows.lastElementChild);

    api.elements.elOffChart = this.#elRows.lastElementChild;
    options.offChart = offChart;

    let o = this.#mediator.register("OffChart", OffChart, options, api);
    
    this.#OffCharts.set(o.ID, o);

    this.emit("addOffChart", o);
  }

  addIndicator(ind) {
    console.log(`Add the ${ind} indicator`);

    // final indicator object
    const indicator = this.#indicators[ind].ind;
    console.log("indicator:",indicator);
    // check if we already have indicator data in the chart state
    // generate indicator data
    // let instance = new indicator(target, overlay, xAxis, yAxis, config)
    // instance.calcIndicator(...)
    // this.addOffChart(instance.overlay.data, options, api)
    // 

    this.emit("addIndicatorDone", indicator);
  }

  defaultNode() {
    const api = this.#mediator.api;
    const styleRows = STYLE_ROWS + `height: calc(100% - ${api.timeH}px)`;
    const styleTime = STYLE_TIME + ` height: ${api.timeH}px; border-color: ${api.chartBorderColour};`;
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
    return node
  }

  rowNode(type) {
    const api = this.#mediator.api;
    const styleRow = STYLE_ROW + ` border-top: 1px solid ${api.chartBorderColour};`;
    const styleScale = STYLE_SCALE + ` border-color: ${api.chartBorderColour};`;

    const node = `
      <div class="${CLASS_ROW} ${type}" style="${styleRow}">
        <canvas><canvas/>
        <div class="${styleScale}">
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

    // create viewport
    this.#viewport = new CEL.Viewport({
      width: width,
      height: height,
      container: this.#elViewport
    });
    this.#elCanvas = this.#viewport.scene.canvas;

    this.#layerLabels = new CEL.Layer(layerConfig);
    this.#layerGrid = new CEL.Layer(layerConfig);
    // add layers
    this.#viewport
          .addLayer(this.#layerLabels)
          .addLayer(this.#layerGrid);

    const config = {...this.theme, ...{ axes: "x" }};
    this.#chartGrid =
      new chartGrid(
        this.#layerGrid, 
        this.#Time, 
        null, 
        config);
  }

  initXGrid() {
    this.draw();
  }

  draw() {
    this.#layerGrid.setPosition(this.scrollPos, 0);
    this.#chartGrid.draw("x");
    this.#viewport.render();
    this.#Time.draw();
  }

  updateRange(pos) {
    this.#core.updateRange(pos);
    // draw the grid
    this.draw();
  }

  zoomRange() {
    // draw the gird
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
    // active.element.style.pointerEvents = 'none';
    prev.element.style.userSelect = 'none';
    // prev.element.style.pointerEvents = 'none';

    return {active, prev}
  }

}

// menu.js

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

    // add entry
    Menu.menuList[id] = new Menu(widgets, config);

    return Menu.menuList[id]
  }

  static destroy(id) {
    Menu.menuList[id].end();

    // remove entry
    delete Menu.menuList[id];
  }

  get el() { return this.#elMenu }
  get id() { return this.#id }
  get pos() { return this.dimensions }
  get dimensions() { return DOM.elementDimPos(this.#elMenu) }

  init() {
    // insert element
    this.mount(this.#elMenus);
  }

  start() {
    // position menus next to primary (icon)
    this.position(this.#config.primary);
    // set up event listeners
    this.eventsListen();
  }

  end() {
    // remove event listners
    const api = this.#mediator.api;
    const menuItems = DOM.findBySelectorAll(`#${api.id} .${CLASS_MENU} li`);
    menuItems.forEach((item) => {
      item.removeEventListener('click', this.onMenuSelect);
    });

    document.removeEventListener('click', this.onOutsideClickListener);
    // remove element
    // this.el.remove()
  }

  eventsListen() {
    const api = this.#mediator.api;
    const menuItems = DOM.findBySelectorAll(`#${api.id} #${this.#config.id} li`);
    menuItems.forEach((item) => {
      item.addEventListener('click', this.onMenuSelect.bind(this));
    });

    // click event outside of menu
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
    const listStyle = "list-style: none; text-align: left; margin:1em 1em 1em -2.5em;";
    const itemStyle = "padding: .25em 1em .25em 1em;";
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

  // display the menu
  open() {
    let id = Menu.currentActive?.id || false;
    if (id) this.emit("closeMenu", {menu: id});

    Menu.currentActive = this;
    this.#elMenu.style.display = "block";
  }

  // hide the menu
  close() {
    Menu.currentActive = null;
    this.#elMenu.style.display = "none";
    this.emit("menuClosed", this.id);
  }
}

// window.js

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

    // add entry
    Window.windowList[id] = new Window(widgets, config);

    return Window.windowList[id]
  }

  static destroy(id) {
    Window.windowList[id].end();

    // remove entry
    delete Window.windowList[id];
  }

  get el() { return this.#elWindow }
  get id() { return this.#id }
  get pos() { return this.dimensions }
  get config() { return this.#config }
  set config(c) { this.#config = c; }
  get dimensions() { return DOM.elementDimPos(this.#elWindow) }

  init() {
    // insert element
    this.mount(this.#elWindows);
  }

  start() {
    // set up event listeners
    this.eventsListen();
    this.open();
  }

  end() {
    // remove event listners
    document.removeEventListener('click', this.onOutsideClickListener);
    // remove element
    // this.el.remove()
  }

  eventsListen() {
    this.#mediator.api;
    // add event listener to dragbar
    // const windowItems = DOM.findBySelectorAll(`#${api.id} #${this.#config.id} li`)
    // windowItems.forEach((item) => {
    //   item.addEventListener('click', this.onWindowSelect.bind(this))
    // })

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

  // onWindowSelect(e) {
  //   let evt = e.currentTarget.dataset.event,
  //       data = {
  //         target: e.currentTarget.id, 
  //         window: this.#id,
  //         evt: evt
  //       };
        
  //   this.emit(evt, data)
  //   this.emit("windowItemSelected", data)
  //   this.emit("closeWindow", data)
  // }

  onOutsideClickListener(e) {
    if (!this.#elWindow.contains(e.target) 
    // && (!this.#config.primary.contains(e.target)) 
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
    // if x,y position not provided calculate default
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

  // get your drag on
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

  // display the window
  open() {
    // let id = Window.currentActive?.id || false
    // if (id !== this.#id) this.emit("closeWindow", {window: id})

    Window.currentActive = this;
    this.#elWindow.style.display = "block";
    this.emit("windowOpened", this.id);

    setTimeout(() => {
      // click event outside of window
      document.addEventListener('click', this.onOutsideClickListener.bind(this));
    }, 1000);
  }

  // hide the window
  close() {
    Window.currentActive = null;
    this.#elWindow.style.display = "none";
    this.emit("windowClosed", this.id);

    document.removeEventListener('click', this.onOutsideClickListener);
  }
}

// dialogue.js

class Dialogue extends Window {

  static type = "window"


  constructor(widgets, config) {
    super();

    config.dragbar = true;
    config.close = tue;
    this.config = config;
  }
  
}

// divider.js


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

    // add entry
    Divider.dividerList[id] = new Divider(widgets, config);

    return Divider.dividerList[id]
  }

  static destroy(id) {
    Divider.dividerList[id].end();

    // remove entry
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
    // insert element
    this.mount();
  }

  start() {
    // set mouse pointer
    this.setCursor("n-resize");

    // set up event listeners
    this.eventsListen();
  }

  end() {
    // remove event listners
    this.#controller.removeEventListener("mouseenter", this.onMouseEnter);
    this.#controller.removeEventListener("mouseout", this.onMouseOut);
    this.#controller.removeEventListener("drag", this.onDividerDrag);
    this.#controller.removeEventListener("enddrag", this.onDividerDragDone);

    // remove element
    this.el.remove();
  }

  eventsListen() {
    // create controller and use 'on' method to receive input events
    this.#controller = new InputController(this.#elDivider, {disableContextMenu: false});

    this.#controller.on("mouseenter", this.onMouseEnter.bind(this));
    this.#controller.on("mouseout", this.onMouseOut.bind(this));
    this.#controller.on("drag", this.onDividerDrag.bind(this));
    this.#controller.on("enddrag", this.onDividerDragDone.bind(this));
    this.#controller.on("mousedown", this.onMouseDown.bind(this));
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
    this.#cursorPos = [Math.floor(e.position.x), Math.floor(e.position.y)];
    this.emit(`${this.ID}_mousedown`, this.#cursorPos);
    this.emit(`divider_mousedown`, {
      id: this.ID,
      e: e,
      pos: this.#cursorPos,
      offChart: this.offChart
    });
  }

  onMouseUp(e) {
    this.#cursorPos = [Math.floor(e.position.x), Math.floor(e.position.y)];
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

// state-chart.js

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

        // this.context.origin.instances[data.menu].open()
        // this.context.origin.instances[data.menu].offMenu()

      },
      onExit(data) {
        console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`);

        // this.context.origin.instances[data.menu].close()
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

        // this.context.origin.instances[data.menu].open()
        // this.context.origin.instances[data.menu].offMenu()

      },
      onExit(data) {
        console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`);

        // this.context.origin.instances[data.menu].close()
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

// widgets.js

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

    // api - functions / methods, calculated properties provided by this module
    const api = this.#mediator.api;
    api.parent = this.#mediator;
    // api.elements = this.#elements

    // this.#elements = {
    //   elWidgetsG: this.#elWidgetsG,
    // }

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
    // set up event listeners
    this.eventsListen();

    // start State Machine 
    stateMachineConfig.context.origin = this;
    this.#mediator.stateMachine = stateMachineConfig;
    this.#mediator.stateMachine.start();
  }

  end() {
    // Stop and clean up the module to prevent memory leaks.
    // It should remove: event listeners, timers, ect.
    // Put your toys away or it will end in tears.
  }

  // listen/subscribe/watch for parent notifications
  eventsListen() {
    // this.on("resize", (dimensions) => this.onResize.bind(this))

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
    // console.log("onMenuItemSelected:",e)

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

      // only add one of each widget type
      // some widgets are extensions of a parent
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

// dataset.js


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

/**
 * Validate price history data
 *
 * @export
 * @param {Array} data
 * @return {Boolean}  
 */
function validateShallow(data, isCrypto=false) {

  if (!isArray(data)) return false

  let rnd = getRandomIntBetween(0, data.length);
  if (!isValidCandle(data[0], isCrypto)) return false
  if (!isValidCandle(data[rnd], isCrypto)) return false
  if (!isValidCandle(data[data.length - 1], isCrypto)) return false

  // is ascending order?
  let t1 = data[0][0];
  let t2 = data[1][0];
  let t3 = data[2][0];
  if (t1 > t2 && t2 > t3) return false
  
  // is (likely) valid - use validateDeep() to validate entire dataset
  return true
}

function validateDeep(data, isCrypto=false) {
  if (!isArray(data)) return false

  let i = 0;
  let prev = 0;
  while (i < data.length) {

    if (!isValidCandle(data[i], isCrypto)) return false

    // is ascending order?
    if (data[i][0] < prev) return false
    prev = data[i][0];
    i++;
  }

  // is valid!
  return true
}

/**
 * Validate Candle
 *
 * @export
 * @param {Array} c - [ timestamp(ms), open, high, low, close, volume ]
 * @param {Boolean} isCrypto - are we working with crypto? Validate against BTC genesis
 * @return {Boolean}  
 */
function isValidCandle(c, isCrypto=false) {
  if (!isArray(c)) return false
  if (c.length !== 6) return false
  // timestamp (ms)
  if (isCrypto)
    if (!isValidTimeInRange(c[0])) return false
  if (
    // open
    !isNumber(c[1]) ||
    // hight
    !isNumber(c[2]) ||
    // low
    !isNumber(c[3]) ||
    // close
    !isNumber(c[4]) ||
    // volume
    !isNumber(c[5])
  ) return false
  // is valid!
  return true
}

// state.js

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

  constructor(state, deepValidate=false, isCrypto=false) {
    // this.#store = new Store()

    // validate state
    if (isObject(state)) {
      this.#data = this.validateState(state, deepValidate, isCrypto);
      this.#status = "valid";
    }
    else {
      this.defaultState();
      this.#status = "default";
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

  validateState(state, deepValidate=false, isCrypto=false) {

    if (!('chart' in state)) {
      state.chart = {
          type: 'Candles',
          candleType: "CANDLE_SOLID",
          data: state.ohlcv || []
      };
    }

    if (deepValidate) 
      state.chart.data = validateDeep(state.chart.data, isCrypto) ? state.chart.data : [];
    else 
      state.chart.data = validateShallow(state.chart.data, isCrypto) ? state.chart.data : [];

    if (!isNumber(state.chart?.tf) || deepValidate) {
      let tfms = detectInterval(state.chart.data);
      // this SHOULD never happen, 
      // but there are limits to fixing broken data sent to chart
      if (tfms < SECOND) tfms = DEFAULT_TIMEFRAMEMS;
      state.chart.tfms = tfms;
    }
    
    if (!isString(state.chart?.tfms) || deepValidate)
      state.chart.tf = ms2Interval(state.chart.tfms);

    if (!('onchart' in state)) {
        state.onchart = [];
    }

    if (!('offchart' in state)) {
        state.offchart = [];
    }

    if (!state.chart.settings) {
        state.chart.settings = {};
    }

    // Remove ohlcv we have Data
    delete state.ohlcv;

    if (!('datasets' in state)) {
        state.datasets = [];
    }

    // Init dataset proxies
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
const empty = [0,0,0,0,0];

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
    // add empty value to range end
    // this.#core.chartData.push([0,0,0,0,0,0])
    // iterate over indicators add empty value to end

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

  /**
   * process price tick
   *
   * @param {object} data - t: timestamp, p: price, q: quantity
   * @memberof Stream
   */
  set candle(data) {
    // const r = this.range
    // if (data.p > r.priceMax || data.p < r.priceMin) {}

    // round time to nearest current time unit
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
    if (this.#candle !== empty) return this.#candle
  }

  /**
   * add new candle to state data
   *
   * @param {object} data - t: timestamp, p: price, q: quantity
   * @memberof Stream
   */
  newCandle(data) {
    // let open = this.range.value()[C] || data.p

    // create new stream candle
    this.prevCandle();
    // this.#candle = [data.t, open, data.p, data.p, open, data.q, null, true]
    this.#candle = [data.t, data.p, data.p, data.p, data.p, data.q, null, true];
    this.#core.mergeData({data: [this.#candle]}, true);
    this.status = {status: STREAM_NEWVALUE, data: {data: data, candle: this.#candle}};
  }

  prevCandle() {
    const d = this.#core.allData.data;
    if (d[d.length - 1][7]) d[d.length - 1].pop();
  }

  /**
   * update existing candle with current tick
   *
   * @param {object} data - t: timestamp, p: price, q: quantity
   * @memberof Stream
   */
  updateCandle(data) {

    data.p = parseFloat(data.p);
    data.q = parseFloat(data.q);

    // https://stackoverflow.com/a/52772191

    let candle = this.#candle;
    candle[H] = data.p > candle[H] ? data.p : candle[H];
    candle[L] = data.p < candle[L] ? data.p : candle[L];
    candle[C] = data.p;
    candle[V] = parseFloat((candle[V] + data.q).toFixed(this.#precision));

    // update the last candle in the state data
    this.#candle = candle;

    const d = this.#core.allData.data;
    d[d.length - 1] = this.#candle;
  }

}

// core.js

const STYLE_TXCHART = "overflow: hidden;";
const STYLE_UTILS = "border-bottom: 1px solid;";
const STYLE_BODY  = "position: relative;";
const STYLE_TOOLS = "position: absolute; top: 0; left: 0; height: 100%; min-height: 100%; border-right: 1px solid;";
const STYLE_MAIN  = "position: absolute; top: 0; height: 100%;";

// wait for talib wasm to initialize 
(async () => {
  await talib.init("node_modules/talib-web/lib/talib.wasm");
})();
class TradeXchart {


  static #cnt = 0
  static #instances = {}

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
  #elWidgetsG

  #inCnt = null
  #modID
  #state = {}
  #userClasses = []
  #data
  #range
  #rangeStartTS
  #rangeLimit = RANGELIMIT
  #indicators = Indicators
  #TALib = talib

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

  utilsH = 40
  toolsW = 45
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
  info = false
  warnings = false
  errors = false
  
  #mousePos = {x:0, y:0}
  #scrollPos = 0
  #smoothScrollOffset = 0
  #panBeginPos = [null, null, null, null]

  #stream
  #pricePrecision
  #volumePrecision


/**
 * Creates an instance of TradeXchart.
 * @param {instance} mediator
 * @param {object} [options={}]
 * @memberof TradeXchart
 */
constructor (mediator, options={}) {

this.oncontextmenu = window.oncontextmenu;

    let container = options?.container,
        state = options?.state, 
        deepValidate = options?.deepValidate || false, 
        isCrypto = options?.isCrypto || false;
    
    if (isString(container)) {
      if (container[0] === '#')
        container = DOM.findByID(container);
      else
        container = DOM.findBySelector(container);
    }

    if (DOM.isElement(container)) {
      this.#el = container;
      this.#mediator = mediator;
      this.#state = State.create(state, deepValidate, isCrypto);
      this.log(`Chart ${this.#id} created with a ${this.#state.status} state`);
      delete(options.state);

      this.#time.timeFrame = this.#state.data.chart.tf; 
      this.#time.timeFrameMS = this.#state.data.chart.tfms;

      this.init(options);
    }
    else this.error(`${NAME} cannot be mounted. Provided element does not exist in DOM`);
  }

  log(l) { this.#mediator.log(l); }
  info(i) { this.#mediator.info(i); }
  warning(w) { this.#mediator.warn(w); }
  error(e) { this.#mediator.error(e); }

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
  // get elTime() { return this.#elTime }
  get elMain() { return this.#elMain }
  // get elChart() { return this.#elChart }
  get elWidgetsG() { return this.#elWidgetsG }

  get UtilsBar() { return this.#UtilsBar }
  get ToolsBar() { return this.#ToolsBar }
  get MainPane() { return this.#MainPane }
  get Timeline() { return this.#MainPane.time }
  get WidgetsG() { return this.#WidgetsG }
  get Chart() { return this.#MainPane.chart }

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

  get theme() { return this.#theme }
  get settings() { return this.#state.data.chart.settings }
  get indicators() { return this.#indicators }
  get TALib() { return this.#TALib }

  get candleW() { return this.Timeline.candleW }
  get buffer() { return this.MainPane.buffer }
  get bufferPx() { return this.MainPane.bufferPx }
  set scrollPos(pos) { this.setScrollPos(pos); }
  get scrollPos() { return this.#scrollPos }
  get smoothScrollOffset() { return 0 } //{ return this.#smoothScrollOffset }
  get rangeScrollOffset() { return Math.floor(this.bufferPx / this.candleW) }
  get mousePos() { return this.#mousePos }

  get pricePrecision() { return this.#pricePrecision }
  get volumePrecision() { return this.#volumePrecision }

  get stream() { return this.#stream }



  /**
   * Create a new TradeXchart instance
   *
   * @static
   * @param {DOM element} container
   * @param {Object} [config={}]
   * @param {Object} state
   * @return {Instance}  
   * @memberof TradeXchart
   */
  static create(container, config={}, state) {
    const cnt = ++TradeXchart.#cnt;

    config.cnt = cnt;
    config.modID = `${ID}_${cnt}`;
    config.container = container;

    const core = new SX.Core(config);

    const api = {
      permittedClassNames:TradeXchart.permittedClassNames,
    };

    config.state = state;

    // register the parent module which will build and control everything
    const instance = core.register(config.modID, TradeXchart, config, api);
    TradeXchart.#instances[cnt] = core;
    return instance
  }

  static destroy(chart) {
    if (chart.constructor.name === "TradeXchart") {
      const inCnt = chart.inCnt;
      delete TradeXchart.#instances[inCnt];
    }
  }

  /**
   * Target element has been validated as a mount point
   * let's start building
   */
  init(config) {
    this.#config = config;
    this.#inCnt = config.cnt;
    this.#modID = config.modID;

    const id = (isObject(config) && isString(config.id)) ? config.id : null;
    this.setID(id);

    this.mount();

    // process config
    if (isObject(config)) {
      for (const option in config) {
        if (option in this.props()) {
          this.props()[option](config[option]);
        }
      }
    }

    // set default range
    this.setRange();
    // now set user defined (if any) range
    const rangeStart = calcTimeIndex(this.#time, this.#rangeStartTS);
    const end = (rangeStart) ? 
      rangeStart + this.#rangeLimit :
      this.chartData.length - 1;
    const start = (rangeStart) ? rangeStart : end - this.#rangeLimit;
    this.#rangeLimit = end - start;
    this.setRange(start, end);

    // api - functions / methods, calculated properties provided by this module
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

    if (isObject(this.#config.stream)) this.#stream = new Stream(this);
  }

  end() {
    this.log("...cleanup the mess");
    removeEventListener('mousemove', this.onMouseMove);

    this.off(STREAM_UPDATE, this.onStreamUpdate);
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
    // is candle visible?
    if (r.inRange(candle[0])) {
      const max = r.priceMax; // * (1 - YAXIS_BOUNDS)
      const min = r.priceMin; // * (1 + YAXIS_BOUNDS)
      // is candle testing display boundaries?
      if (candle[2] > max || candle[3] < min) {
        // recalculate range
        // TODO: instead of recalculate, update Range
        this.setRange(r.indexStart, r.indexEnd);

        this.emit("chart_yAxisRedraw", this.range);
      }
    }
  }

  mount() {
    // mount the framework
    this.#el.innerHTML = this.defaultNode();

    // define the elements for the components to mount onto
    this.#elTXChart = DOM.findBySelector(`#${this.id}`);
    this.#elUtils = DOM.findBySelector(`#${this.id} .${CLASS_UTILS}`);
    this.#elBody = DOM.findBySelector(`#${this.id} .${CLASS_BODY}`);
    this.#elTools = DOM.findBySelector(`#${this.id} .${CLASS_TOOLS}`);
    this.#elMain  = DOM.findBySelector(`#${this.id} .${CLASS_MAIN}`);
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

  unmount() {
    this.cleanup();
  }

  cleanup() {
    // remove all event listeners
    // destroy all objects
  }

  props() {
    return {
      // id: (id) => this.setID(id),
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
      theme: (theme) => this.setTheme(theme),
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

    /**
   * Set the price accuracy
   * @param pricePrecision - Price accuracy
   */
     setPricePrecision (pricePrecision) {
      if (!isNumber(pricePrecision) || pricePrecision < 0) {
        pricePrecision = PRICE_PRECISION;
      }
      this.#pricePrecision = pricePrecision;
    }

    /**
     * Set the volume accuracy
     * @param volumePrecision - Volume accuracy
     */
    setVolumePrecision (volumePrecision) {
      if (!isNumber(volumePrecision) || volumePrecision < 0) {
        volumePrecision = VOLUME_PRECISION;
      }
      this.#volumePrecision = volumePrecision;
    }

  setTheme(theme) {
    // TODO: validation
    this.#theme = theme;
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

  defaultNode() {

    const classesTXChart = CLASS_DEFAULT+" "+this.#userClasses; 
    const styleTXChart = STYLE_TXCHART + ` height: ${this.height}px; width: ${this.#chartW}px; background: ${this.chartBGColour}; color: ${this.chartTxtColour};`;
    const styleUtils = STYLE_UTILS + ` height: ${this.utilsH}px; width: ${this.#chartW}px; border-color: ${this.chartBorderColour};`;
    const styleBody = STYLE_BODY + ` height: calc(100% - ${this.utilsH}px); width: ${this.#chartW}px;`;
    const styleTools = STYLE_TOOLS + ` width: ${this.toolsW}px; border-color: ${this.chartBorderColour};`;
    const styleMain = STYLE_MAIN + ` left: ${this.toolsW}px; width: calc(100% - ${this.toolsW}px);`;
    const styleWidgets = ` position: relative;`;
    
    const node = `
      <div id="${this.id}" class="${classesTXChart}" style="${styleTXChart}">
        <div class="${CLASS_UTILS}" style="${styleUtils}"></div>
        <div class="${CLASS_BODY}" style="${styleBody}">
          <div class="${CLASS_TOOLS}" style="${styleTools}"></div>
          <div class="${CLASS_MAIN}" style="${styleMain}">
          </div>
        </div>
        <div class="${CLASS_WIDGETSG}" style="${styleWidgets}"></div>
      </div>
    `;
    return node
  }

  setClasses(classes) {

  }

  /**
   * Calculate new range index / position from position difference
   * typically mouse drag or cursor keys
   * @param {array} pos - [x2, y2, x1, y1, xdelta, ydelta]
   * @returns 
   */
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
    console.log("scrollPos:",this.#scrollPos);
  }

  offsetRange(offset) {
    let start = this.range.indexStart - offset,
        end = this.range.indexEnd - offset;

    this.setRange(start, end);
  }

  /**
   * set start and end of range
   * @param {number} start - index
   * @param {number} end - index
   */
  setRange(start=0, end=this.rangeLimit) {
    this.#range = getRange(this.allData, start, end);
    this.#range.interval = this.#time.timeFrameMS;
    this.#range.intervalStr = this.#time.timeFrame;
    this.#time.range = this.#range;
  }

  /**
   * Merge a block of data into the chart state
   * used for populating a chart with back history
   * or updating with a live stream
   */
  mergeData(merge, newRange=false) {
    if (!isObject(merge)) return false

    let i, j, start, end;
    const data = this.allData.data;
    const mData = merge?.data;
    const inc = (this.range.inRange(mData[0][0])) ? 1 : 0;

    if (isArray(mData) && mData.length > 0) {
      i = mData.length - 1;
      j = data.length - 1;

      if (data.length == 0) this.allData.data = mData;
      else {
        const r1 = [data[0][0], data[j][0]];
        const r2 = [mData[0][0], mData[i][0]];
        const o = [Math.max(r1[0], r2[0]), Math.min(r1[1], r2[1])];

        // overlap between existing data and merge data
        if (o[1] >= o[0]) ;
        // no overlap, insert the new data
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

export { TradeXchart as Chart, DOM };