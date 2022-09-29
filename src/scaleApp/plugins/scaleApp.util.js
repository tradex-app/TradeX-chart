(function() {
  var plugin;

  plugin = function(core) {
    var mix;
    mix = function(giv, rec, override) {
      var k, v, _results, _results1;
      if (override === true) {
        _results = [];
        for (k in giv) {
          v = giv[k];
          _results.push(rec[k] = v);
        }
        return _results;
      } else {
        _results1 = [];
        for (k in giv) {
          v = giv[k];
          if (!rec.hasOwnProperty(k)) {
            _results1.push(rec[k] = v);
          }
        }
        return _results1;
      }
    };
    core.uniqueId = function(length=8) {
      let id = "";
      while (id.length < length) {
        id += Math.random().toString(36).substring(2);
      }
      return id.substring(0, length);
    };
    core.clone = function(data) {
      let copy, k, v;
      if (data instanceof Array) {
        copy = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = data.length; _i < _len; _i++) {
            v = data[_i];
            _results.push(v);
          }
          return _results;
        })();
      } else {
        copy = {};
        for (k in data) {
          v = data[k];
          copy[k] = v;
        }
      }
      return copy;
    };
    core.countObjectKeys = function(o) {
      let k, v;
      if (typeof o === "object") {
        return ((function() {
          var _results;
          _results = [];
          for (k in o) {
            v = o[k];
            _results.push(k);
          }
          return _results;
        })()).length;
      }
    };
    return core.mixin = function(receivingClass, givingClass, override) {
      if (override == null) {
        override = false;
      }
      switch ("" + (typeof givingClass) + "-" + (typeof receivingClass)) {
        case "function-function":
          return mix(givingClass.prototype, receivingClass.prototype, override);
        case "function-object":
          return mix(givingClass.prototype, receivingClass, override);
        case "object-object":
          return mix(givingClass, receivingClass, override);
        case "object-function":
          return mix(givingClass, receivingClass.prototype, override);
      }
    };
  };

  if ((typeof define !== "undefined" && define !== null ? define.amd : void 0) != null) {
    define(function() {
      return plugin;
    });
  } else if ((typeof window !== "undefined" && window !== null ? window.scaleApp : void 0) != null) {
    window.scaleApp.plugins.util = plugin;
  } else if ((typeof module !== "undefined" && module !== null ? module.exports : void 0) != null) {
    module.exports = plugin;
  }

}).call(this);
