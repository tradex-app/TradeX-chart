(function() {
  var plugin, _base,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  plugin = function(core) {
    var StateMachine, enterChannel, leaveChannel;
    leaveChannel = function(state) {
      return "" + state + "/leave";
    };
    enterChannel = function(state) {
      return "" + state + "/enter";
    };
    StateMachine = (function(_super) {
      __extends(StateMachine, _super);

      function StateMachine(opts) {
        var id, t, _ref;
        if (opts == null) {
          opts = {};
        }
        this.fire = __bind(this.fire, this);
        StateMachine.__super__.constructor.call(this);
        this.states = [];
        this.transitions = {};
        if (opts.states != null) {
          this.addState(opts.states);
        }
        if (opts.start != null) {
          this.addState(opts.start);
          this.start = opts.start;
          this.current = opts.start;
          this.emit(enterChannel(this.start));
        }
        if (opts.transitions != null) {
          _ref = opts.transitions;
          for (id in _ref) {
            t = _ref[id];
            this.addTransition(id, t);
          }
        }
      }

      StateMachine.prototype.start = null;

      StateMachine.prototype.current = null;

      StateMachine.prototype.exit = null;

      StateMachine.prototype.addState = function(id, opt) {
        var k, s, success, v;
        if (opt == null) {
          opt = {};
        }
        if (id instanceof Array) {
          return !(__indexOf.call((function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = id.length; _i < _len; _i++) {
              s = id[_i];
              _results.push(this.addState(s));
            }
            return _results;
          }).call(this), false) >= 0);
        } else if (typeof id === "object") {
          return !(__indexOf.call((function() {
            var _results;
            _results = [];
            for (k in id) {
              v = id[k];
              _results.push(this.addState(k, v));
            }
            return _results;
          }).call(this), false) >= 0);
        } else {
          if (typeof id !== "string") {
            return false;
          }
          if (__indexOf.call(this.states, id) >= 0) {
            return false;
          }
          this.states.push(id);
          success = [];
          if (opt.enter != null) {
            success.push(this.on(enterChannel(id), opt.enter));
          }
          if (opt.leave != null) {
            success.push(this.on(leaveChannel(id), opt.leave));
          }
          return !(__indexOf.call(success, false) >= 0);
        }
      };

      StateMachine.prototype.addTransition = function(id, edge) {
        var err, i, _ref;
        if (!((typeof id === "string") && (typeof edge.to === "string") && (this.transitions[id] == null) && (_ref = edge.to, __indexOf.call(this.states, _ref) >= 0))) {
          return false;
        }
        if (edge.from instanceof Array) {
          err = __indexOf.call((function() {
            var _i, _len, _ref1, _results;
            _ref1 = edge.from;
            _results = [];
            for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
              i = _ref1[_i];
              _results.push(__indexOf.call(this.states, i) >= 0);
            }
            return _results;
          }).call(this), false) >= 0;
          if (err !== false) {
            return false;
          }
        } else if (typeof edge.from !== "string") {
          return false;
        }
        this.transitions[id] = {
          from: edge.from,
          to: edge.to
        };
        return true;
      };

      StateMachine.prototype.onEnter = function(state, cb) {
        var _ref;
        if (_ref = !state, __indexOf.call(this.states, _ref) >= 0) {
          return false;
        }
        return this.on(enterChannel(state), cb);
      };

      StateMachine.prototype.onLeave = function(state, cb) {
        var _ref;
        if (_ref = !state, __indexOf.call(this.states, _ref) >= 0) {
          return false;
        }
        return this.on(leaveChannel(state), cb);
      };

      StateMachine.prototype.fire = function(id, callback) {
        var t;
        if (callback == null) {
          callback = function() {};
        }
        t = this.transitions[id];
        if (!((t != null) && this.can(id))) {
          return false;
        }
        this.emit(leaveChannel(this.current), t, (function(_this) {
          return function(err) {
            if (err != null) {
              return callback(err);
            } else {
              return _this.emit(enterChannel(t.to), t, function(err) {
                if (err == null) {
                  _this.current = t.to;
                }
                return callback(err);
              });
            }
          };
        })(this));
        return true;
      };

      StateMachine.prototype.can = function(id) {
        var t, _ref;
        t = this.transitions[id];
        return (t != null ? t.from : void 0) === this.current || (_ref = this.current, __indexOf.call(t.from, _ref) >= 0) || t.from === "*";
      };

      return StateMachine;

    })(core.Mediator);
    return core.StateMachine = StateMachine;
  };

  if ((typeof define !== "undefined" && define !== null ? define.amd : void 0) != null) {
    define(function() {
      return plugin;
    });
  } else if ((typeof window !== "undefined" && window !== null ? window.scaleApp : void 0) != null) {
    if ((_base = window.scaleApp.plugins).state == null) {
      _base.state = plugin;
    }
  } else if ((typeof module !== "undefined" && module !== null ? module.exports : void 0) != null) {
    module.exports = plugin;
  }

}).call(this);
