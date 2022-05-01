(function() {
  var plugin,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  plugin = function(core, options) {
    var install, methods;
    if (options == null) {
      options = {};
    }
    methods = ["register", "start", "stop", "on", "off", "emit"];
    install = function(sb, subCore) {
      var fn, _fn, _i, _len;
      sb.sub = {};
      _fn = (function(_this) {
        return function(fn) {
          return sb.sub[fn] = function() {
            subCore[fn].apply(subCore, arguments);
            return sb;
          };
        };
      })(this);
      for (_i = 0, _len = methods.length; _i < _len; _i++) {
        fn = methods[_i];
        _fn(fn);
      }
      if (subCore.permission != null) {
        return sb.sub.permission = {
          add: subCore.permission.add,
          remove: subCore.permission.remove
        };
      }
    };
    return {
      init: function(sb, opt, done) {
        var SubSandbox, p, plugins, subCore, _i, _j, _len, _len1, _ref, _ref1, _ref2;
        sb._subCore = subCore = new core.constructor;
        subCore._parentCore = core;
        if (options.useGlobalMediator) {
          core._mediator.installTo(subCore._mediator, true);
        } else if (options.mediator != null) {
          if ((_ref = options.mediator) != null) {
            if (typeof _ref.installTo === "function") {
              _ref.installTo(subCore._mediator, true);
            }
          }
        }
        subCore.Sandbox = SubSandbox = (function(_super) {
          __extends(SubSandbox, _super);

          function SubSandbox() {
            return SubSandbox.__super__.constructor.apply(this, arguments);
          }

          return SubSandbox;

        })(core.Sandbox);
        plugins = [];
        if (options.inherit) {
          _ref1 = core._plugins;
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            p = _ref1[_i];
            plugins.push({
              plugin: p.creator,
              options: p.options
            });
          }
        }
        if (options.use instanceof Array) {
          _ref2 = options.use;
          for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
            p = _ref2[_j];
            plugins.push(p);
          }
        } else if (typeof options.use === "function") {
          plugins.push(options.use);
        }
        return subCore.use(plugins).boot(function(err) {
          if (err) {
            return done(err);
          }
          install(sb, subCore);
          return done();
        });
      },
      destroy: function(sb) {
        return sb._subCore.stop();
      }
    };
  };

  if ((typeof define !== "undefined" && define !== null ? define.amd : void 0) != null) {
    define(function() {
      return plugin;
    });
  } else if ((typeof window !== "undefined" && window !== null ? window.scaleApp : void 0) != null) {
    window.scaleApp.plugins.submodule = plugin;
  } else if ((typeof module !== "undefined" && module !== null ? module.exports : void 0) != null) {
    module.exports = plugin;
  }

}).call(this);
