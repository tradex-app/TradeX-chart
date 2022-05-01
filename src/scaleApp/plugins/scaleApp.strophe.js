
/*
Copyright (c) 2012 - 2014 Markus Kohlhase <mail@markus-kohlhase.de>
 */

(function() {
  var CACHE_PREFIX, DEFAULT_PATH, DEFAULT_PORT, DEFAULT_PROTOCOL, clearData, create_connection_obj, get_bosh_url, hasConnectionData, key2cache, plugin, restoreData, saveData, statusCodeToString;

  DEFAULT_PATH = "http-bind/";

  DEFAULT_PROTOCOL = "http";

  DEFAULT_PORT = 5280;

  CACHE_PREFIX = "scaleApp.xmpp.cache.";

  get_bosh_url = function(opt) {
    var domain;
    domain = document.domain;
    if (typeof opt === "object") {
      if (opt.port) {
        opt.port = opt.port * 1;
        if (isNaN(opt.port)) {
          console.warn("the defined port " + opt.port + " is not a number.");
          opt.port = null;
        }
      }
      if (opt.host && opt.port && opt.path) {
        return "" + opt.protocol + "://" + opt.host + ":" + opt.port + "/" + opt.path;
      }
      if (opt.host && opt.port && !opt.path) {
        return "" + opt.protocol + "://" + opt.host + ":" + opt.port + "/" + DEFAULT_PATH;
      }
      if (opt.host && !opt.port && opt.path) {
        return "" + opt.protocol + "://" + opt.host + "/" + opt.path;
      }
      if (opt.host && !opt.port && !opt.path) {
        return "" + opt.protocol + "://" + opt.host + "/" + DEFAULT_PATH;
      }
      if (!opt.host && opt.port && opt.path) {
        return "" + opt.protocol + "://" + domain + ":" + opt.port + "/" + opt.path;
      }
      if (!opt.host && opt.port && !opt.path) {
        return "" + opt.protocol + "://" + domain + ":" + opt.port + "/" + DEFAULT_PATH;
      }
      if (!opt.host && !opt.port && opt.path) {
        return "" + opt.protocol + "://" + domain + "/" + opt.path;
      }
      if (!opt.host && !opt.port && !opt.path) {
        return "" + opt.protocol + "://" + domain + "/" + DEFAULT_PATH;
      }
    }
    return "http://" + domain + "/" + DEFAULT_PATH;
  };

  create_connection_obj = function(opt) {
    return new Strophe.Connection(get_bosh_url({
      path: opt.path,
      host: opt.host,
      port: opt.port,
      protocol: opt.protocol
    }));
  };

  key2cache = function(k) {
    return "" + CACHE_PREFIX + k;
  };

  saveData = function(conn, opt) {
    var k, _i, _j, _len, _len1, _ref, _ref1, _results;
    if (typeof sessionStorage === "undefined" || sessionStorage === null) {
      return;
    }
    _ref = ["jid", "sid", "rid"];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      k = _ref[_i];
      if (conn[k] != null) {
        sessionStorage[key2cache(k)] = conn[k];
      }
    }
    _ref1 = ["host", "port", "path", "protocol"];
    _results = [];
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      k = _ref1[_j];
      if (opt[k] != null) {
        _results.push(sessionStorage[key2cache(k)] = opt[k]);
      }
    }
    return _results;
  };

  clearData = function() {
    var k, _i, _len, _ref, _results;
    if (typeof sessionStorage === "undefined" || sessionStorage === null) {
      return;
    }
    _ref = ["jid", "sid", "rid", "host", "port", "path", "protocol"];
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      k = _ref[_i];
      _results.push(sessionStorage.removeItem(key2cache(k)));
    }
    return _results;
  };

  restoreData = function() {
    var j, k, o, _i, _len, _ref, _results;
    if (typeof sessionStorage === "undefined" || sessionStorage === null) {
      return;
    }
    o = {};
    _ref = ["jid", "sid", "rid", "host", "port", "path", "protocol"];
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      k = _ref[_i];
      j = key2cache(k);
      if (sessionStorage[j]) {
        _results.push(o[k] = sessionStorage[j]);
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  hasConnectionData = function(opt) {
    var k, _i, _len, _ref;
    _ref = ["jid", "sid", "rid"];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      k = _ref[_i];
      if (!opt[k] || opt[k] === 'null' || opt[k] === 'undefined') {
        return false;
      }
    }
    return true;
  };

  statusCodeToString = function(s) {
    switch (s) {
      case 0:
        return "Error";
      case 1:
        return "Connecting";
      case 2:
        return "Connection failed";
      case 3:
        return "Authenticating";
      case 4:
        return "Authentication failed";
      case 5:
        return "Connected";
      case 6:
        return "Disconnected";
      case 7:
        return "Disconnecting";
      case 8:
        return "Reconnected";
    }
  };

  plugin = function(core) {
    var attach_connection, connection, connection_options, disconnect, login, mediator, onConnected, on_connection_change, resetPlugin, updatePlugin;
    if (typeof window === "undefined" || window === null) {
      throw new Error("This plugin only can be used in the browser");
    }
    if (window.Strophe == null) {
      console.warn("This plugin requires strophe.js");
    }
    mediator = new core.Mediator;
    connection = null;
    resetPlugin = function() {
      core.xmpp.connection = null;
      return core.xmpp.jid = "";
    };
    updatePlugin = function(conn) {
      core.xmpp.connection = conn;
      return core.xmpp.jid = conn.jid;
    };
    onConnected = function() {
      var e, fn, onunload, _i, _j, _len, _len1, _ref, _ref1;
      fn = function(ev) {
        if (ev.keyCode === 27) {
          return typeof ev.preventDefault === "function" ? ev.preventDefault() : void 0;
        }
      };
      onunload = function() {
        if (connection) {
          return saveData(connection, connection_options);
        } else {
          return clearData();
        }
      };
      if (document.addEventListener != null) {
        _ref = ["keydown", "keypress", "keyup"];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          e = _ref[_i];
          document.addEventListener(e, fn, false);
        }
        window.addEventListener("unload", onunload, false);
      } else if (document.attachEvent != null) {
        _ref1 = ["onkeydown", "onkeypress", "onkeyup"];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          e = _ref1[_j];
          document.attachEvent(e, fn);
        }
        document.attachEvent("onunload", onunload);
      }
      return connection.send($pres());
    };
    on_connection_change = function(status) {
      var s;
      console.info("xmpp status changed: " + statusCodeToString(status));
      s = Strophe.Status;
      switch (status) {
        case s.ERROR:
          resetPlugin();
          return mediator.emit("error", "an error occoured");
        case s.CONNECTING:
          resetPlugin();
          return mediator.emit("connecting");
        case s.CONNFAIL:
          resetPlugin();
          return mediator.emit("error", "could not connect to xmpp server");
        case s.AUTHENTICATING:
          resetPlugin();
          return mediator.emit("authenticating");
        case s.AUTHFAIL:
          resetPlugin();
          return mediator.emit("authfail");
        case s.CONNECTED:
          updatePlugin(connection);
          onConnected();
          return mediator.emit("connected");
        case s.DISCONNECTED:
          clearData();
          resetPlugin();
          return mediator.emit("disconnected");
        case s.DISCONNECTING:
          resetPlugin();
          return mediator.emit("disconnecting");
        case s.ATTACHED:
          updatePlugin(connection);
          onConnected();
          return mediator.emit("attached");
      }
    };
    attach_connection = function(opt) {
      connection = create_connection_obj(opt);
      return connection.attach(opt.jid, opt.sid, opt.rid, on_connection_change, 60);
    };
    connection_options = restoreData();
    if (connection_options && hasConnectionData(connection_options)) {
      attach_connection(connection_options);
    } else {
      mediator.emit("disconnected");
      connection_options = {
        host: document.domain,
        port: DEFAULT_PORT,
        path: DEFAULT_PATH,
        protocol: DEFAULT_PROTOCOL,
        jid: null,
        sid: null,
        rid: null
      };
    }
    login = function(jid, pw, opt) {
      if (opt != null) {
        if (opt.path) {
          connection_options.path = opt.path;
        }
        if (opt.port) {
          connection_options.port = opt.port;
        }
        if (opt.host) {
          connection_options.host = opt.host;
        }
        if (opt.protocol) {
          connection_options.protocol = opt.protocol;
        }
      }
      connection = create_connection_obj(connection_options);
      return connection.connect(jid, pw, on_connection_change);
    };
    disconnect = function() {
      var e;
      console.debug("try to disconnect");
      if ((connection != null ? connection.connected : void 0) === true) {
        try {
          connection.send($pres({
            type: "unavailable"
          }));
          connection.pause();
          connection.disconnect();
        } catch (_error) {
          e = _error;
        }
      }
      return clearData();
    };
    core.xmpp = {
      jid: "",
      connection: null,
      login: login,
      logout: disconnect,
      on: function() {
        return mediator.on.apply(mediator, arguments);
      },
      off: function() {
        return mediator.off.apply(mediator, arguments);
      },
      _mediator: mediator
    };
    return null;
  };

  if ((typeof define !== "undefined" && define !== null ? define.amd : void 0) != null) {
    define(function() {
      return plugin;
    });
  } else if ((typeof window !== "undefined" && window !== null ? window.scaleApp : void 0) != null) {
    window.scaleApp.plugins.xmpp = plugin;
  } else if ((typeof module !== "undefined" && module !== null ? module.exports : void 0) != null) {
    module.exports = plugin;
  }

}).call(this);
