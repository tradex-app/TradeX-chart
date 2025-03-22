"use strict";

const __INIT__ = () => {
  let _scriptDir;
  if (typeof document !== "undefined" && document.currentScript) {
    _scriptDir = document.currentScript.src;
  } else if (typeof __filename !== "undefined") {
    _scriptDir = __filename;
  }

  const Module = {};

  let readyPromiseResolve, readyPromiseReject;
  Module.ready = new Promise((resolve, reject) => {
    readyPromiseResolve = resolve;
    readyPromiseReject = reject;
  });

  const moduleOverrides = { ...Module };

  const quit_ = (status, toThrow) => {
    throw toThrow;
  };

  const ENVIRONMENT_IS_WEB = typeof window === "object";
  const ENVIRONMENT_IS_WORKER = typeof importScripts === "function";
  const ENVIRONMENT_IS_NODE = typeof process === "object" && typeof process.versions === "object" && typeof process.versions.node === "string";

  let scriptDirectory = "";

  const locateFile = (path) => {
    if (Module.locateFile) {
      return Module.locateFile(path, scriptDirectory);
    }
    return scriptDirectory + path;
  };

  let read_, readAsync, readBinary;

  if (ENVIRONMENT_IS_NODE) {
    const read_ = (filename, binary) => {
      const nodeFS = require("fs");
      const nodePath = require("path");
      filename = nodePath.normalize(filename);
      return nodeFS.readFileSync(filename, binary ? null : "utf8");
    };

    const readBinary = (filename) => {
      const ret = read_(filename, true);
      if (!ret.buffer) {
        ret = new Uint8Array(ret);
      }
      return ret;
    };

    const readAsync = (filename, onload, onerror) => {
      const nodeFS = require("fs");
      const nodePath = require("path");
      filename = nodePath.normalize(filename);
      nodeFS.readFile(filename, (err, data) => {
        if (err) onerror(err);
        else onload(data.buffer);
      });
    };

    // Update program and arguments based on process.argv.
    if (process.argv.length > 1) {
      thisProgram = process.argv[1].replace(/\\/g, "/");
    }
    const arguments_ = process.argv.slice(2);

    // Handle uncaught exceptions and unhandled rejections.
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
    // Web or Worker environment setup.
    if (ENVIRONMENT_IS_WORKER) {
      scriptDirectory = self.location.href;
    } else if (typeof document !== "undefined" && document.currentScript) {
      scriptDirectory = document.currentScript.src;
    }
    if (_scriptDir) {
      scriptDirectory = _scriptDir;
    }

    const read_ = (url) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, false);
      xhr.send(null);
      return xhr.responseText;
    };

    const readBinary = (url) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, false);
      xhr.responseType = "arraybuffer";
      xhr.send(null);
      return new Uint8Array(xhr.response);
    };

    const readAsync = (url, onload, onerror) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = "arraybuffer";
      xhr.onload = () => {
        if (xhr.status === 200 || (xhr.status === 0 && xhr.response)) {
          onload(xhr.response);
          return;
        }
        onerror();
      };

      xhr.onerror = onerror;
      xhr.send(null);
    };

    const setWindowTitle = (title) => {
      document.title = title;
    };
  }

  const out = Module.print || console.log.bind(console);
  const err = Module.printErr || console.warn.bind(console);

  // Restore module overrides.
  for (const key in moduleOverrides) {
    if (moduleOverrides.hasOwnProperty(key)) {
      Module[key] = moduleOverrides[key];
    }
  }
  moduleOverrides = null;

  // Update arguments and program if provided in Module.
  if (Module.arguments) arguments_ = Module.arguments;
  if (Module.thisProgram) thisProgram = Module.thisProgram;
  if (Module.quit) quit_ = Module.quit;

  // Stack alignment constant.
  const STACK_ALIGN = 16;

  // Function to convert a JavaScript function to a WebAssembly function.
  const convertJsFunctionToWasm = (func, sig) => {
    if (typeof WebAssembly.Function === "function") {
      const typeNames = {
        i: "i32",
        j: "i64",
        f: "f32",
        d: "f64",
      };

      const type = {
        parameters: [],
        results: sig === "v" ? [] : [typeNames[sig]],
      };

      for (let i = 1; i < sig.length; ++i) {
        type.parameters.push(typeNames[sig[i]]);
      }
      return new WebAssembly.Function(type, func);
    }

    // Fallback for older environments.
    // ...
  };

  // Other functions and logic...
};
