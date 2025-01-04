let __INIT__ = (() => {
  let _scriptDir = typeof document !== "undefined" && document.currentScript
    ? document.currentScript.src
    : undefined;
  if (typeof __filename !== "undefined") _scriptDir = _scriptDir || __filename;

  return function (__INIT__) {
    __INIT__ = __INIT__ || {};

    let Module = typeof __INIT__ !== "undefined" ? __INIT__ : {};
    let readyPromiseResolve, readyPromiseReject;

    Module["ready"] = new Promise((resolve, reject) => {
      readyPromiseResolve = resolve;
      readyPromiseReject = reject;
    });

    let moduleOverrides = {};
    for (let key in Module) {
      if (Module.hasOwnProperty(key)) {
        moduleOverrides[key] = Module[key];
      }
    }

    let arguments_ = [];
    let thisProgram = "./this.program";
    let quit_ = (status, toThrow) => {
      throw toThrow;
    };

    let ENVIRONMENT_IS_WEB = typeof window === "object";
    let ENVIRONMENT_IS_WORKER = typeof importScripts === "function";
    let ENVIRONMENT_IS_NODE =
      typeof process === "object" &&
      typeof process.versions === "object" &&
      typeof process.versions.node === "string";

    let scriptDirectory = "";
    
    function locateFile(path) {
      if (Module["locateFile"]) {
        return Module["locateFile"](path, scriptDirectory);
      }
      return scriptDirectory + path;
    }

    let read_, readAsync, readBinary, setWindowTitle;

    if (ENVIRONMENT_IS_NODE) {
      if (ENVIRONMENT_IS_WORKER) {
        scriptDirectory = require("path").dirname(scriptDirectory) + "/";
      } else {
        scriptDirectory = __dirname + "/";
      }

      read_ = (filename, binary) => {
        if (!nodeFS) nodeFS = require("fs");
        if (!nodePath) nodePath = require("path");
        filename = nodePath.normalize(filename);
        return nodeFS.readFileSync(filename, binary ? null : "utf8");
      };

      readBinary = (filename) => {
        let ret = read_(filename, true);
        if (!ret.buffer) {
          ret = new Uint8Array(ret);
        }
        return ret;
      };

      readAsync = (filename, onload, onerror) => {
        if (!nodeFS) nodeFS = require("fs");
        if (!nodePath) nodePath = require("path");
        filename = nodePath.normalize(filename);
        nodeFS.readFile(filename, (err, data) => {
          if (err) onerror(err);
          else onload(data.buffer);
        });
      };

      if (process.argv.length > 1) {
        thisProgram = process.argv[1].replace(/\\/g, "/");
      }
      arguments_ = process.argv.slice(2);

      process.on("uncaughtException", (ex) => {
        if (!(ex instanceof ExitStatus)) {
          throw ex;
        }
      });

      process.on("unhandledRejection", (reason) => {
        throw reason;
      });

      quit_ = (status, toThrow) => {
        if (keepRuntimeAlive()) {
          process.exitCode = status;
          throw toThrow;
        }
        logExceptionOnExit(toThrow);
        process.exit(status);
      };
    } else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
      if (ENVIRONMENT_IS_WORKER) {
        scriptDirectory = self.location.href;
      } else if (typeof document !== "undefined" && document.currentScript) {
        scriptDirectory = document.currentScript.src;
      }
      if (_scriptDir) {
        scriptDirectory = _scriptDir;
      }
      if (scriptDirectory.indexOf("blob:") !== 0) {
        scriptDirectory = scriptDirectory.substr(
          0,
          scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1
        );
      } else {
        scriptDirectory = "";
      }

      read_ = (url) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, false);
        xhr.send(null);
        return xhr.responseText;
      };

      if (ENVIRONMENT_IS_WORKER) {
        readBinary = (url) => {
          let xhr = new XMLHttpRequest();
          xhr.open("GET", url, false);
          xhr.responseType = "arraybuffer";
          xhr.send(null);
          return new Uint8Array(xhr.response);
        };
      }

      readAsync = (url, onload, onerror) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.responseType = "arraybuffer";
        xhr.onload = () => {
          if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) {
            onload(xhr.response);
            return;
          }
          onerror();
        };
        xhr.onerror = onerror;
        xhr.send(null);
      };

      setWindowTitle = (title) => {
        document.title = title;
      };
    }

    let out = Module["print"] || console.log.bind(console);
    let err = Module["printErr"] || console.warn.bind(console);

    for (let key in moduleOverrides) {
      if (moduleOverrides.hasOwnProperty(key)) {
        Module[key] = moduleOverrides[key];
      }
    }

    moduleOverrides = null;

    if (Module["arguments"]) arguments_ = Module["arguments"];
    if (Module["thisProgram"]) thisProgram = Module["thisProgram"];
    if (Module["quit"]) quit_ = Module["quit"];

    let STACK_ALIGN = 16;

    // Other functions and variables can be similarly converted

    let runtimeInitialized = false;
    let runtimeExited = false;
    let runtimeKeepaliveCounter = 0;

    function keepRuntimeAlive() {
      return noExitRuntime || runtimeKeepaliveCounter > 0;
    }

    function preRun() {
      if (Module["preRun"]) {
        if (typeof Module["preRun"] == "function")
          Module["preRun"] = [Module["preRun"]];
        while (Module["preRun"].length) {
          addOnPreRun(Module["preRun"].shift());
        }
      }
      callRuntimeCallbacks(__ATPRERUN__);
    }

    function initRuntime() {
      runtimeInitialized = true;
      callRuntimeCallbacks(__ATINIT__);
    }

    function preMain() {
      callRuntimeCallbacks(__ATMAIN__);
    }

    function exitRuntime() {
      runtimeExited = true;
    }

    function postRun() {
      if (Module["postRun"]) {
        if (typeof Module["postRun"] == "function")
          Module["postRun"] = [Module["postRun"]];
        while (Module["postRun"].length) {
          addOnPostRun(Module["postRun"].shift());
        }
      }
      callRuntimeCallbacks(__ATPOSTRUN__);
    }

    function addOnPreRun(cb) {
      __ATPRERUN__.unshift(cb);
    }

    function addOnInit(cb) {
      __ATINIT__.unshift(cb);
    }

    function addOnPostRun(cb) {
      __ATPOSTRUN__.unshift(cb);
    }

    let runDependencies = 0;
    let runDependencyWatcher = null;
    let dependenciesFulfilled = null;

    function addRunDependency(id) {
      runDependencies++;
      if (Module["monitorRunDependencies"]) {
        Module["monitorRunDependencies"](runDependencies);
      }
    }

    function removeRunDependency(id) {
      runDependencies--;
      if (Module["monitorRunDependencies"]) {
        Module["monitorRunDependencies"](runDependencies);
      }
      if (runDependencies == 0) {
        if (runDependencyWatcher !== null) {
          clearInterval(runDependencyWatcher);
          runDependencyWatcher = null;
        }
        if (dependenciesFulfilled) {
          let callback = dependenciesFulfilled;
          dependenciesFulfilled = null;
          callback();
        }
      }
    }

    // Other functions and variables...

    function run(args) {
      args = args || arguments_;
      if (runDependencies > 0) {
        return;
      }
      preRun();
      if (runDependencies > 0) {
        return;
      }
      initRuntime();
      preMain();
      readyPromiseResolve(Module);
      if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();
      if (shouldRunNow) callMain(args);
      postRun();
    }

    Module["run"] = run;

    function exit(status, implicit) {
      EXITSTATUS = status;
      if (keepRuntimeAlive()) {
      } else {
        exitRuntime();
      }
      procExit(status);
    }

    function procExit(code) {
      EXITSTATUS = code;
      if (!keepRuntimeAlive()) {
        if (Module["onExit"]) Module["onExit"](code);
        ABORT = true;
      }
      quit_(code, new ExitStatus(code));
    }

    if (Module["preInit"]) {
      if (typeof Module["preInit"] == "function")
        Module["preInit"] = [Module["preInit"]];
      while (Module["preInit"].length > 0) {
        Module["preInit"].pop()();
      }
    }

    let shouldRunNow = true;
    if (Module["noInitialRun"]) shouldRunNow = false;
    run();

    return __INIT__.ready;
  };
})();

class ExitStatus {
  constructor(status) {
    this.name = "ExitStatus";
    this.message = `Program terminated with exit(${status})`;
    this.status = status;
  }
}

// Additional functions and variables can be converted similarly
