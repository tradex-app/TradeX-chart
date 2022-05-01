(function() {
  var plugin,
    __slice = [].slice;

  plugin = function(core, options) {
    var addLocal, baseLanguage, channelName, get, getBrowserLanguage, getLanguage, getText, global, hasParent, lang, mediator, onChange, setGlobal, setLanguage, unsubscribe, _;
    if (options == null) {
      options = {};
    }
    hasParent = function() {
      var _ref;
      return (_ref = core._parentCore) != null ? _ref.i18n : void 0;
    };
    baseLanguage = "en";
    getBrowserLanguage = function() {
      return ((typeof navigator !== "undefined" && navigator !== null ? navigator.language : void 0) || (typeof navigator !== "undefined" && navigator !== null ? navigator.browserLanguage : void 0) || baseLanguage).split("-")[0];
    };
    channelName = "i18n";
    getText = function(key, x, l, global) {
      var _ref, _ref1;
      return ((_ref = x[l]) != null ? _ref[key] : void 0) || ((_ref1 = global[l]) != null ? _ref1[key] : void 0);
    };
    get = function(key, x, lang, global) {
      if (x == null) {
        x = {};
      }
      if (lang == null) {
        lang = "";
      }
      return getText(key, x, lang, global) || getText(key, x, lang.substring(0, 2), global) || getText(key, x, baseLanguage, global) || key;
    };
    addLocal = function(dict, i18n) {
      var k, lang, txt, v, _results;
      if (typeof dict !== "object") {
        return false;
      }
      _results = [];
      for (lang in dict) {
        txt = dict[lang];
        if (i18n[lang] == null) {
          i18n[lang] = {};
        }
        _results.push((function() {
          var _base, _results1;
          _results1 = [];
          for (k in txt) {
            v = txt[k];
            _results1.push((_base = i18n[lang])[k] != null ? _base[k] : _base[k] = v);
          }
          return _results1;
        })());
      }
      return _results;
    };
    mediator = new core.Mediator;
    lang = getBrowserLanguage();
    global = options.global || {};
    core.getBrowserLanguage = getBrowserLanguage;
    core.baseLanguage = baseLanguage;
    getLanguage = function() {
      return lang;
    };
    unsubscribe = function() {
      return mediator.off.apply(mediator, [channelName].concat(__slice.call(arguments)));
    };
    onChange = function() {
      return mediator.on.apply(mediator, [channelName].concat(__slice.call(arguments)));
    };
    setLanguage = function(code) {
      if (typeof code === "string") {
        lang = code;
        return mediator.emit(channelName, lang);
      }
    };
    setGlobal = function(obj) {
      var p;
      if (typeof obj === "object") {
        if ((p = hasParent()) != null) {
          p.setGlobal(obj);
        } else {
          global = obj;
        }
        return true;
      } else {
        return false;
      }
    };
    _ = function(text, o) {
      var p;
      if ((p = hasParent()) != null) {
        return p._(text, o);
      } else {
        return get(text, o, lang, global);
      }
    };
    core.i18n = {
      setLanguage: setLanguage,
      getLanguage: getLanguage,
      setGlobal: setGlobal,
      onChange: onChange,
      _: _,
      unsubscribe: unsubscribe
    };
    core.Sandbox.prototype.i18n = {
      onChange: onChange,
      unsubscribe: unsubscribe,
      getLanguage: getLanguage
    };
    return {
      id: "i18n",
      init: function(sb) {
        sb.i18n.addLocal = function(dict) {
          var _base;
          if ((_base = sb.options).i18n == null) {
            _base.i18n = {};
          }
          return addLocal(dict, sb.options.i18n);
        };
        return sb._ = (function(_this) {
          return function(text) {
            return _(text, sb.options.localDict || sb.options.i18n);
          };
        })(this);
      }
    };
  };

  if ((typeof define !== "undefined" && define !== null ? define.amd : void 0) != null) {
    define(function() {
      return plugin;
    });
  } else if ((typeof window !== "undefined" && window !== null ? window.scaleApp : void 0) != null) {
    window.scaleApp.plugins.i18n = plugin;
  } else if ((typeof module !== "undefined" && module !== null ? module.exports : void 0) != null) {
    module.exports = plugin;
  }

}).call(this);
