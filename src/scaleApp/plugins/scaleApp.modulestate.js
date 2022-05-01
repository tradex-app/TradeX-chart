(function() {
  var plugin;

  plugin = function(core) {
    var s;
    core.state = s = new core.Mediator(true);
    return {
      init: function(sb) {
        return s.emit("init/" + sb.moduleId + "/" + sb.instanceId, {
          instanceId: sb.instanceId,
          moduleId: sb.moduleId
        });
      },
      destroy: function(sb) {
        return s.emit("destroy/" + sb.moduleId + "/" + sb.instanceId, {
          instanceId: sb.instanceId,
          moduleId: sb.moduleId
        });
      }
    };
  };

  if ((typeof define !== "undefined" && define !== null ? define.amd : void 0) != null) {
    define(function() {
      return plugin;
    });
  } else if ((typeof window !== "undefined" && window !== null ? window.scaleApp : void 0) != null) {
    window.scaleApp.plugins.modulestate = plugin;
  } else if ((typeof module !== "undefined" && module !== null ? module.exports : void 0) != null) {
    module.exports = plugin;
  }

}).call(this);
