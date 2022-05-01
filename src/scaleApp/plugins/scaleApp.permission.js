(function() {
  var plugin,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  plugin = function(core) {
    var addPermission, controlledActions, grantAction, hasPermission, permissions, removePermission, tweakSandboxMethod;
    permissions = {};
    controlledActions = ["on", "emit", "off"];
    addPermission = function(id, action, channels) {
      var a, act, c, k, p, v, _i, _len, _ref, _ref1, _ref2;
      if (typeof id === "object") {
        return _ref = !false, __indexOf.call((function() {
          var _results;
          _results = [];
          for (k in id) {
            v = id[k];
            _results.push(addPermission(k, v));
          }
          return _results;
        })(), _ref) >= 0;
      } else if (typeof action === "object") {
        return _ref1 = !false, __indexOf.call((function() {
          var _results;
          _results = [];
          for (k in action) {
            v = action[k];
            _results.push(addPermission(id, k, v));
          }
          return _results;
        })(), _ref1) >= 0;
      } else if (channels != null) {
        p = permissions[id] != null ? permissions[id] : permissions[id] = {};
        if (typeof channels === "string") {
          channels = channels === '*' ? ["__all__"] : [channels];
        }
        if (typeof action === "string") {
          if (action === '*') {
            return _ref2 = !false, __indexOf.call((function() {
              var _i, _len, _results;
              _results = [];
              for (_i = 0, _len = controlledActions.length; _i < _len; _i++) {
                act = controlledActions[_i];
                _results.push(addPermission(id, act, channels));
              }
              return _results;
            })(), _ref2) >= 0;
          } else {
            a = p[action] != null ? p[action] : p[action] = {};
            for (_i = 0, _len = channels.length; _i < _len; _i++) {
              c = channels[_i];
              a[c] = true;
            }
            return true;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    };
    removePermission = function(id, action, channel) {
      var p, _ref;
      p = permissions[id];
      if (channel == null) {
        delete p[action];
        return true;
      } else if (!(p != null ? (_ref = p[action]) != null ? _ref[channel] : void 0 : void 0)) {
        return false;
      } else {
        delete p[action][channel];
        return true;
      }
    };
    hasPermission = function(id, action, channel) {
      var p, _ref;
      p = ((_ref = permissions[id]) != null ? _ref[action] : void 0) || {};
      if ((channel != null) && (p[channel] || p["__all__"])) {
        return true;
      } else {
        console.warn("'" + id + "' has no permissions for '" + action + "' with '" + channel + "'");
        return false;
      }
    };
    grantAction = function(sb, action, method, args) {
      var c, channel, p;
      if ((args != null ? args.length : void 0) > 0) {
        channel = args[0];
      }
      p = channel instanceof Array ? ((function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = channel.length; _i < _len; _i++) {
          c = channel[_i];
          if (!hasPermission(sb.instanceId, action, c)) {
            _results.push(c);
          }
        }
        return _results;
      })()).length === 0 : hasPermission(sb.instanceId, action, channel);
      if (p === true) {
        return method.apply(sb, args);
      } else {
        return false;
      }
    };
    tweakSandboxMethod = function(sb, methodName) {
      var originalMethod;
      originalMethod = sb[methodName];
      if (typeof originalMethod === "function") {
        return sb[methodName] = function() {
          return grantAction(sb, methodName, originalMethod, arguments);
        };
      }
    };
    core.permission = {
      add: addPermission,
      remove: removePermission
    };
    return {
      init: function(sb) {
        var a, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = controlledActions.length; _i < _len; _i++) {
          a = controlledActions[_i];
          _results.push(tweakSandboxMethod(sb, a));
        }
        return _results;
      }
    };
  };

  if ((typeof define !== "undefined" && define !== null ? define.amd : void 0) != null) {
    define(function() {
      return plugin;
    });
  } else if ((typeof window !== "undefined" && window !== null ? window.scaleApp : void 0) != null) {
    window.scaleApp.plugins.permission = plugin;
  } else if ((typeof module !== "undefined" && module !== null ? module.exports : void 0) != null) {
    module.exports = plugin;
  }

}).call(this);
