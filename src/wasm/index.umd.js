(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.TA_LIB = {}));
})(this, function (exports) {
"use strict";
var __INIT__ = (function () {
  var _scriptDir =
    typeof document !== "undefined" && document.currentScript
      ? document.currentScript.src
      : undefined;
  if (typeof __filename !== "undefined") _scriptDir = _scriptDir || __filename;
  return function (__INIT__) {
    __INIT__ = __INIT__ || {};

    var Module = typeof __INIT__ !== "undefined" ? __INIT__ : {};
    var readyPromiseResolve, readyPromiseReject;
    Module["ready"] = new Promise(function (resolve, reject) {
      readyPromiseResolve = resolve;
      readyPromiseReject = reject;
    });
    var moduleOverrides = {};
    var key;
    for (key in Module) {
      if (Module.hasOwnProperty(key)) {
        moduleOverrides[key] = Module[key];
      }
    }
    var arguments_ = [];
    var thisProgram = "./this.program";
    var quit_ = function (status, toThrow) {
      throw toThrow;
    };
    var ENVIRONMENT_IS_WEB = typeof window === "object";
    var ENVIRONMENT_IS_WORKER = typeof importScripts === "function";
    var ENVIRONMENT_IS_NODE =
      typeof process === "object" &&
      typeof process.versions === "object" &&
      typeof process.versions.node === "string";
    var scriptDirectory = "";
    function locateFile(path) {
      if (Module["locateFile"]) {
        return Module["locateFile"](path, scriptDirectory);
      }
      return scriptDirectory + path;
    }
    var read_, readAsync, readBinary, setWindowTitle;
    function logExceptionOnExit(e) {
      if (e instanceof ExitStatus) return;
      var toLog = e;
      err("exiting due to exception: " + toLog);
    }
    var nodeFS;
    var nodePath;
    if (ENVIRONMENT_IS_NODE) {
      if (ENVIRONMENT_IS_WORKER) {
        scriptDirectory = require("path").dirname(scriptDirectory) + "/";
      } else {
        scriptDirectory = __dirname + "/";
      }
      read_ = function shell_read(filename, binary) {
        if (!nodeFS) nodeFS = require("fs");
        if (!nodePath) nodePath = require("path");
        filename = nodePath["normalize"](filename);
        return nodeFS["readFileSync"](filename, binary ? null : "utf8");
      };
      readBinary = function readBinary(filename) {
        var ret = read_(filename, true);
        if (!ret.buffer) {
          ret = new Uint8Array(ret);
        }
        assert(ret.buffer);
        return ret;
      };
      readAsync = function readAsync(filename, onload, onerror) {
        if (!nodeFS) nodeFS = require("fs");
        if (!nodePath) nodePath = require("path");
        filename = nodePath["normalize"](filename);
        nodeFS["readFile"](filename, function (err, data) {
          if (err) onerror(err);
          else onload(data.buffer);
        });
      };
      if (process["argv"].length > 1) {
        thisProgram = process["argv"][1].replace(/\\/g, "/");
      }
      arguments_ = process["argv"].slice(2);
      process["on"]("uncaughtException", function (ex) {
        if (!(ex instanceof ExitStatus)) {
          throw ex;
        }
      });
      process["on"]("unhandledRejection", function (reason) {
        throw reason;
      });
      quit_ = function (status, toThrow) {
        if (keepRuntimeAlive()) {
          process["exitCode"] = status;
          throw toThrow;
        }
        logExceptionOnExit(toThrow);
        process["exit"](status);
      };
      Module["inspect"] = function () {
        return "[Emscripten Module object]";
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
      {
        read_ = function (url) {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url, false);
          xhr.send(null);
          return xhr.responseText;
        };
        if (ENVIRONMENT_IS_WORKER) {
          readBinary = function (url) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, false);
            xhr.responseType = "arraybuffer";
            xhr.send(null);
            return new Uint8Array(xhr.response);
          };
        }
        readAsync = function (url, onload, onerror) {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url, true);
          xhr.responseType = "arraybuffer";
          xhr.onload = function () {
            if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) {
              onload(xhr.response);
              return;
            }
            onerror();
          };
          xhr.onerror = onerror;
          xhr.send(null);
        };
      }
      setWindowTitle = function (title) {
        document.title = title;
      };
    } else {
    }
    var out = Module["print"] || console.log.bind(console);
    var err = Module["printErr"] || console.warn.bind(console);
    for (key in moduleOverrides) {
      if (moduleOverrides.hasOwnProperty(key)) {
        Module[key] = moduleOverrides[key];
      }
    }
    moduleOverrides = null;
    if (Module["arguments"]) arguments_ = Module["arguments"];
    if (Module["thisProgram"]) thisProgram = Module["thisProgram"];
    if (Module["quit"]) quit_ = Module["quit"];
    var STACK_ALIGN = 16;
    function convertJsFunctionToWasm(func, sig) {
      if (typeof WebAssembly.Function === "function") {
        var typeNames = { i: "i32", j: "i64", f: "f32", d: "f64" };
        var type = {
          parameters: [],
          results: sig[0] == "v" ? [] : [typeNames[sig[0]]],
        };
        for (var i = 1; i < sig.length; ++i) {
          type.parameters.push(typeNames[sig[i]]);
        }
        return new WebAssembly.Function(type, func);
      }
      var typeSection = [1, 0, 1, 96];
      var sigRet = sig.slice(0, 1);
      var sigParam = sig.slice(1);
      var typeCodes = { i: 127, j: 126, f: 125, d: 124 };
      typeSection.push(sigParam.length);
      for (var i = 0; i < sigParam.length; ++i) {
        typeSection.push(typeCodes[sigParam[i]]);
      }
      if (sigRet == "v") {
        typeSection.push(0);
      } else {
        typeSection = typeSection.concat([1, typeCodes[sigRet]]);
      }
      typeSection[1] = typeSection.length - 2;
      var bytes = new Uint8Array(
        [0, 97, 115, 109, 1, 0, 0, 0].concat(
          typeSection,
          [2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0]
        )
      );
      var module = new WebAssembly.Module(bytes);
      var instance = new WebAssembly.Instance(module, { e: { f: func } });
      var wrappedFunc = instance.exports["f"];
      return wrappedFunc;
    }
    var freeTableIndexes = [];
    var functionsInTableMap;
    function getEmptyTableSlot() {
      if (freeTableIndexes.length) {
        return freeTableIndexes.pop();
      }
      try {
        wasmTable.grow(1);
      } catch (err) {
        if (!(err instanceof RangeError)) {
          throw err;
        }
        throw "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.";
      }
      return wasmTable.length - 1;
    }
    function updateTableMap(offset, count) {
      for (var i = offset; i < offset + count; i++) {
        var item = getWasmTableEntry(i);
        if (item) {
          functionsInTableMap.set(item, i);
        }
      }
    }
    function addFunction(func, sig) {
      if (!functionsInTableMap) {
        functionsInTableMap = new WeakMap();
        updateTableMap(0, wasmTable.length);
      }
      if (functionsInTableMap.has(func)) {
        return functionsInTableMap.get(func);
      }
      var ret = getEmptyTableSlot();
      try {
        setWasmTableEntry(ret, func);
      } catch (err) {
        if (!(err instanceof TypeError)) {
          throw err;
        }
        var wrapped = convertJsFunctionToWasm(func, sig);
        setWasmTableEntry(ret, wrapped);
      }
      functionsInTableMap.set(func, ret);
      return ret;
    }
    var dynamicLibraries = Module["dynamicLibraries"] || [];
    var wasmBinary;
    if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];
    var noExitRuntime = Module["noExitRuntime"] || true;
    if (typeof WebAssembly !== "object") {
      abort("no native wasm support detected");
    }
    var wasmMemory;
    var ABORT = false;
    var EXITSTATUS;
    function assert(condition, text) {
      if (!condition) {
        abort("Assertion failed: " + text);
      }
    }
    function getCFunc(ident) {
      var func = Module["_" + ident];
      assert(
        func,
        "Cannot call unknown function " + ident + ", make sure it is exported"
      );
      return func;
    }
    function ccall(ident, returnType, argTypes, args, opts) {
      var toC = {
        string: function (str) {
          var ret = 0;
          if (str !== null && str !== undefined && str !== 0) {
            var len = (str.length << 2) + 1;
            ret = stackAlloc(len);
            stringToUTF8(str, ret, len);
          }
          return ret;
        },
        array: function (arr) {
          var ret = stackAlloc(arr.length);
          writeArrayToMemory(arr, ret);
          return ret;
        },
      };
      function convertReturnValue(ret) {
        if (returnType === "string") return UTF8ToString(ret);
        if (returnType === "boolean") return Boolean(ret);
        return ret;
      }
      var func = getCFunc(ident);
      var cArgs = [];
      var stack = 0;
      if (args) {
        for (var i = 0; i < args.length; i++) {
          var converter = toC[argTypes[i]];
          if (converter) {
            if (stack === 0) stack = stackSave();
            cArgs[i] = converter(args[i]);
          } else {
            cArgs[i] = args[i];
          }
        }
      }
      var ret = func.apply(null, cArgs);
      function onDone(ret) {
        if (stack !== 0) stackRestore(stack);
        return convertReturnValue(ret);
      }
      ret = onDone(ret);
      return ret;
    }
    var ALLOC_STACK = 1;
    function allocate(slab, allocator) {
      var ret;
      if (allocator == ALLOC_STACK) {
        ret = stackAlloc(slab.length);
      } else {
        ret = _malloc(slab.length);
      }
      if (slab.subarray || slab.slice) {
        HEAPU8.set(slab, ret);
      } else {
        HEAPU8.set(new Uint8Array(slab), ret);
      }
      return ret;
    }
    var UTF8Decoder =
      typeof TextDecoder !== "undefined" ? new TextDecoder("utf8") : undefined;
    function UTF8ArrayToString(heap, idx, maxBytesToRead) {
      var endIdx = idx + maxBytesToRead;
      var endPtr = idx;
      while (heap[endPtr] && !(endPtr >= endIdx)) ++endPtr;
      if (endPtr - idx > 16 && heap.subarray && UTF8Decoder) {
        return UTF8Decoder.decode(heap.subarray(idx, endPtr));
      } else {
        var str = "";
        while (idx < endPtr) {
          var u0 = heap[idx++];
          if (!(u0 & 128)) {
            str += String.fromCharCode(u0);
            continue;
          }
          var u1 = heap[idx++] & 63;
          if ((u0 & 224) == 192) {
            str += String.fromCharCode(((u0 & 31) << 6) | u1);
            continue;
          }
          var u2 = heap[idx++] & 63;
          if ((u0 & 240) == 224) {
            u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
          } else {
            u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heap[idx++] & 63);
          }
          if (u0 < 65536) {
            str += String.fromCharCode(u0);
          } else {
            var ch = u0 - 65536;
            str += String.fromCharCode(55296 | (ch >> 10), 56320 | (ch & 1023));
          }
        }
      }
      return str;
    }
    function UTF8ToString(ptr, maxBytesToRead) {
      return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
    }
    function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
      if (!(maxBytesToWrite > 0)) return 0;
      var startIdx = outIdx;
      var endIdx = outIdx + maxBytesToWrite - 1;
      for (var i = 0; i < str.length; ++i) {
        var u = str.charCodeAt(i);
        if (u >= 55296 && u <= 57343) {
          var u1 = str.charCodeAt(++i);
          u = (65536 + ((u & 1023) << 10)) | (u1 & 1023);
        }
        if (u <= 127) {
          if (outIdx >= endIdx) break;
          heap[outIdx++] = u;
        } else if (u <= 2047) {
          if (outIdx + 1 >= endIdx) break;
          heap[outIdx++] = 192 | (u >> 6);
          heap[outIdx++] = 128 | (u & 63);
        } else if (u <= 65535) {
          if (outIdx + 2 >= endIdx) break;
          heap[outIdx++] = 224 | (u >> 12);
          heap[outIdx++] = 128 | ((u >> 6) & 63);
          heap[outIdx++] = 128 | (u & 63);
        } else {
          if (outIdx + 3 >= endIdx) break;
          heap[outIdx++] = 240 | (u >> 18);
          heap[outIdx++] = 128 | ((u >> 12) & 63);
          heap[outIdx++] = 128 | ((u >> 6) & 63);
          heap[outIdx++] = 128 | (u & 63);
        }
      }
      heap[outIdx] = 0;
      return outIdx - startIdx;
    }
    function stringToUTF8(str, outPtr, maxBytesToWrite) {
      return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
    }
    function lengthBytesUTF8(str) {
      var len = 0;
      for (var i = 0; i < str.length; ++i) {
        var u = str.charCodeAt(i);
        if (u >= 55296 && u <= 57343)
          u = (65536 + ((u & 1023) << 10)) | (str.charCodeAt(++i) & 1023);
        if (u <= 127) ++len;
        else if (u <= 2047) len += 2;
        else if (u <= 65535) len += 3;
        else len += 4;
      }
      return len;
    }
    function allocateUTF8OnStack(str) {
      var size = lengthBytesUTF8(str) + 1;
      var ret = stackAlloc(size);
      stringToUTF8Array(str, HEAP8, ret, size);
      return ret;
    }
    function writeArrayToMemory(array, buffer) {
      HEAP8.set(array, buffer);
    }
    var buffer,
      HEAP8,
      HEAPU8,
      HEAP16,
      HEAPU16,
      HEAP32,
      HEAPU32,
      HEAPF32,
      HEAPF64;
    function updateGlobalBufferAndViews(buf) {
      buffer = buf;
      Module["HEAP8"] = HEAP8 = new Int8Array(buf);
      Module["HEAP16"] = HEAP16 = new Int16Array(buf);
      Module["HEAP32"] = HEAP32 = new Int32Array(buf);
      Module["HEAPU8"] = HEAPU8 = new Uint8Array(buf);
      Module["HEAPU16"] = HEAPU16 = new Uint16Array(buf);
      Module["HEAPU32"] = HEAPU32 = new Uint32Array(buf);
      Module["HEAPF32"] = HEAPF32 = new Float32Array(buf);
      Module["HEAPF64"] = HEAPF64 = new Float64Array(buf);
    }
    var INITIAL_MEMORY = Module["INITIAL_MEMORY"] || 16777216;
    if (Module["wasmMemory"]) {
      wasmMemory = Module["wasmMemory"];
    } else {
      wasmMemory = new WebAssembly.Memory({
        initial: INITIAL_MEMORY / 65536,
        maximum: INITIAL_MEMORY / 65536,
      });
    }
    if (wasmMemory) {
      buffer = wasmMemory.buffer;
    }
    INITIAL_MEMORY = buffer.byteLength;
    updateGlobalBufferAndViews(buffer);
    var wasmTable = new WebAssembly.Table({ initial: 1, element: "anyfunc" });
    var __ATPRERUN__ = [];
    var __ATINIT__ = [];
    var __ATMAIN__ = [];
    var __ATPOSTRUN__ = [];
    var runtimeInitialized = false;
    var runtimeExited = false;
    var runtimeKeepaliveCounter = 0;
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
    var runDependencies = 0;
    var runDependencyWatcher = null;
    var dependenciesFulfilled = null;
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
          var callback = dependenciesFulfilled;
          dependenciesFulfilled = null;
          callback();
        }
      }
    }
    Module["preloadedImages"] = {};
    Module["preloadedAudios"] = {};
    Module["preloadedWasm"] = {};
    function abort(what) {
      {
        if (Module["onAbort"]) {
          Module["onAbort"](what);
        }
      }
      what = "Aborted(" + what + ")";
      err(what);
      ABORT = true;
      EXITSTATUS = 1;
      what += ". Build with -s ASSERTIONS=1 for more info.";
      var e = new WebAssembly.RuntimeError(what);
      readyPromiseReject(e);
      throw e;
    }
    var dataURIPrefix = "data:application/octet-stream;base64,";
    function isDataURI(filename) {
      return filename.startsWith(dataURIPrefix);
    }
    function isFileURI(filename) {
      return filename.startsWith("file://");
    }
    var wasmBinaryFile;
    wasmBinaryFile = "talib.wasm";
    if (!isDataURI(wasmBinaryFile)) {
      wasmBinaryFile = locateFile(wasmBinaryFile);
    }
    function getBinary(file) {
      try {
        if (file == wasmBinaryFile && wasmBinary) {
          return new Uint8Array(wasmBinary);
        }
        if (readBinary) {
          return readBinary(file);
        } else {
          throw "both async and sync fetching of the wasm failed";
        }
      } catch (err) {
        abort(err);
      }
    }
    function getBinaryPromise() {
      if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
        if (typeof fetch === "function" && !isFileURI(wasmBinaryFile)) {
          return fetch(wasmBinaryFile, { credentials: "same-origin" })
            .then(function (response) {
              if (!response["ok"]) {
                throw (
                  "failed to load wasm binary file at '" + wasmBinaryFile + "'"
                );
              }
              return response["arrayBuffer"]();
            })
            .catch(function () {
              return getBinary(wasmBinaryFile);
            });
        } else {
          if (readAsync) {
            return new Promise(function (resolve, reject) {
              readAsync(
                wasmBinaryFile,
                function (response) {
                  resolve(new Uint8Array(response));
                },
                reject
              );
            });
          }
        }
      }
      return Promise.resolve().then(function () {
        return getBinary(wasmBinaryFile);
      });
    }
    function createWasm() {
      var info = {
        env: asmLibraryArg,
        wasi_snapshot_preview1: asmLibraryArg,
        "GOT.mem": new Proxy(asmLibraryArg, GOTHandler),
        "GOT.func": new Proxy(asmLibraryArg, GOTHandler),
      };
      function receiveInstance(instance, module) {
        var exports = instance.exports;
        exports = relocateExports(exports, 1024);
        Module["asm"] = exports;
        var metadata = getDylinkMetadata(module);
        if (metadata.neededDynlibs) {
          dynamicLibraries = metadata.neededDynlibs.concat(dynamicLibraries);
        }
        mergeLibSymbols(exports, "main");
        addOnInit(Module["asm"]["__wasm_call_ctors"]);
        removeRunDependency("wasm-instantiate");
      }
      addRunDependency("wasm-instantiate");
      function receiveInstantiationResult(result) {
        receiveInstance(result["instance"], result["module"]);
      }
      function instantiateArrayBuffer(receiver) {
        return getBinaryPromise()
          .then(function (binary) {
            return WebAssembly.instantiate(binary, info);
          })
          .then(function (instance) {
            return instance;
          })
          .then(receiver, function (reason) {
            err("failed to asynchronously prepare wasm: " + reason);
            abort(reason);
          });
      }
      function instantiateAsync() {
        if (
          !wasmBinary &&
          typeof WebAssembly.instantiateStreaming === "function" &&
          !isDataURI(wasmBinaryFile) &&
          !isFileURI(wasmBinaryFile) &&
          typeof fetch === "function"
        ) {
          return fetch(wasmBinaryFile, { credentials: "same-origin" }).then(
            function (response) {
              var result = WebAssembly.instantiateStreaming(response, info);
              return result.then(receiveInstantiationResult, function (reason) {
                err("wasm streaming compile failed: " + reason);
                err("falling back to ArrayBuffer instantiation");
                return instantiateArrayBuffer(receiveInstantiationResult);
              });
            }
          );
        } else {
          return instantiateArrayBuffer(receiveInstantiationResult);
        }
      }
      if (Module["instantiateWasm"]) {
        try {
          var exports = Module["instantiateWasm"](info, receiveInstance);
          return exports;
        } catch (e) {
          err("Module.instantiateWasm callback failed with error: " + e);
          return false;
        }
      }
      instantiateAsync().catch(readyPromiseReject);
      return {};
    }
    var GOT = {};
    var GOTHandler = {
      get: function (obj, symName) {
        if (!GOT[symName]) {
          GOT[symName] = new WebAssembly.Global({
            value: "i32",
            mutable: true,
          });
        }
        return GOT[symName];
      },
    };
    function callRuntimeCallbacks(callbacks) {
      while (callbacks.length > 0) {
        var callback = callbacks.shift();
        if (typeof callback == "function") {
          callback(Module);
          continue;
        }
        var func = callback.func;
        if (typeof func === "number") {
          if (callback.arg === undefined) {
            getWasmTableEntry(func)();
          } else {
            getWasmTableEntry(func)(callback.arg);
          }
        } else {
          func(callback.arg === undefined ? null : callback.arg);
        }
      }
    }
    function getDylinkMetadata(binary) {
      var offset = 0;
      var end = 0;
      function getU8() {
        return binary[offset++];
      }
      function getLEB() {
        var ret = 0;
        var mul = 1;
        while (1) {
          var byte = binary[offset++];
          ret += (byte & 127) * mul;
          mul *= 128;
          if (!(byte & 128)) break;
        }
        return ret;
      }
      function getString() {
        var len = getLEB();
        offset += len;
        return UTF8ArrayToString(binary, offset - len, len);
      }
      var name = "dylink.0";
      if (binary instanceof WebAssembly.Module) {
        var dylinkSection = WebAssembly.Module.customSections(binary, name);
        if (dylinkSection.length === 0) {
          name = "dylink";
          dylinkSection = WebAssembly.Module.customSections(binary, name);
        }
        assert(dylinkSection.length != 0, "need dylink section");
        binary = new Uint8Array(dylinkSection[0]);
        end = binary.length;
      } else {
        var int32View = new Uint32Array(
          new Uint8Array(binary.subarray(0, 24)).buffer
        );
        assert(int32View[0] == 1836278016, "need to see wasm magic number");
        assert(binary[8] === 0, "need the dylink section to be first");
        offset = 9;
        var section_size = getLEB();
        end = offset + section_size;
        name = getString();
      }
      var customSection = { neededDynlibs: [], tlsExports: {} };
      if (name == "dylink") {
        customSection.memorySize = getLEB();
        customSection.memoryAlign = getLEB();
        customSection.tableSize = getLEB();
        customSection.tableAlign = getLEB();
        var neededDynlibsCount = getLEB();
        for (var i = 0; i < neededDynlibsCount; ++i) {
          var name = getString();
          customSection.neededDynlibs.push(name);
        }
      } else {
        assert(name === "dylink.0");
        var WASM_DYLINK_MEM_INFO = 1;
        var WASM_DYLINK_NEEDED = 2;
        var WASM_DYLINK_EXPORT_INFO = 3;
        var WASM_SYMBOL_TLS = 256;
        while (offset < end) {
          var subsectionType = getU8();
          var subsectionSize = getLEB();
          if (subsectionType === WASM_DYLINK_MEM_INFO) {
            customSection.memorySize = getLEB();
            customSection.memoryAlign = getLEB();
            customSection.tableSize = getLEB();
            customSection.tableAlign = getLEB();
          } else if (subsectionType === WASM_DYLINK_NEEDED) {
            var neededDynlibsCount = getLEB();
            for (var i = 0; i < neededDynlibsCount; ++i) {
              var name = getString();
              customSection.neededDynlibs.push(name);
            }
          } else if (subsectionType === WASM_DYLINK_EXPORT_INFO) {
            var count = getLEB();
            while (count--) {
              var name = getString();
              var flags = getLEB();
              if (flags & WASM_SYMBOL_TLS) {
                customSection.tlsExports[name] = 1;
              }
            }
          } else {
            offset += subsectionSize;
          }
        }
      }
      assert(offset == end);
      return customSection;
    }
    function getWasmTableEntry(funcPtr) {
      return wasmTable.get(funcPtr);
    }
    function handleException(e) {
      if (e instanceof ExitStatus || e == "unwind") {
        return EXITSTATUS;
      }
      quit_(1, e);
    }
    function asmjsMangle(x) {
      var unmangledSymbols = ["stackAlloc", "stackSave", "stackRestore"];
      return x.indexOf("dynCall_") == 0 || unmangledSymbols.includes(x)
        ? x
        : "_" + x;
    }
    function mergeLibSymbols(exports, libName) {
      for (var sym in exports) {
        if (!exports.hasOwnProperty(sym)) {
          continue;
        }
        if (!asmLibraryArg.hasOwnProperty(sym)) {
          asmLibraryArg[sym] = exports[sym];
        }
        var module_sym = asmjsMangle(sym);
        if (!Module.hasOwnProperty(module_sym)) {
          Module[module_sym] = exports[sym];
        }
      }
    }
    var LDSO = { loadedLibsByName: {}, loadedLibsByHandle: {} };
    function dynCallLegacy(sig, ptr, args) {
      var f = Module["dynCall_" + sig];
      return args && args.length
        ? f.apply(null, [ptr].concat(args))
        : f.call(null, ptr);
    }
    function dynCall(sig, ptr, args) {
      if (sig.includes("j")) {
        return dynCallLegacy(sig, ptr, args);
      }
      return getWasmTableEntry(ptr).apply(null, args);
    }
    function createInvokeFunction(sig) {
      return function () {
        var sp = stackSave();
        try {
          return dynCall(
            sig,
            arguments[0],
            Array.prototype.slice.call(arguments, 1)
          );
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0 && e !== "longjmp") throw e;
          _setThrew(1, 0);
        }
      };
    }
    var ___heap_base = 5247776;
    Module["___heap_base"] = ___heap_base;
    function getMemory(size) {
      if (runtimeInitialized) return _malloc(size);
      var ret = ___heap_base;
      var end = (ret + size + 15) & -16;
      ___heap_base = end;
      GOT["__heap_base"].value = end;
      return ret;
    }
    function isInternalSym(symName) {
      return [
        "__cpp_exception",
        "__c_longjmp",
        "__wasm_apply_data_relocs",
        "__dso_handle",
        "__tls_size",
        "__tls_align",
        "__set_stack_limits",
        "emscripten_tls_init",
        "__wasm_init_tls",
        "__wasm_call_ctors",
      ].includes(symName);
    }
    function updateGOT(exports, replace) {
      for (var symName in exports) {
        if (isInternalSym(symName)) {
          continue;
        }
        var value = exports[symName];
        if (symName.startsWith("orig$")) {
          symName = symName.split("$")[1];
          replace = true;
        }
        if (!GOT[symName]) {
          GOT[symName] = new WebAssembly.Global({
            value: "i32",
            mutable: true,
          });
        }
        if (replace || GOT[symName].value == 0) {
          if (typeof value === "function") {
            GOT[symName].value = addFunction(value);
          } else if (typeof value === "number") {
            GOT[symName].value = value;
          } else if (typeof value === "bigint") {
            GOT[symName].value = Number(value);
          } else {
            err("unhandled export type for `" + symName + "`: " + typeof value);
          }
        }
      }
    }
    function relocateExports(exports, memoryBase, replace) {
      var relocated = {};
      for (var e in exports) {
        var value = exports[e];
        if (typeof value === "object") {
          value = value.value;
        }
        if (typeof value === "number") {
          value += memoryBase;
        }
        relocated[e] = value;
      }
      updateGOT(relocated, replace);
      return relocated;
    }
    function resolveGlobalSymbol(symName, direct) {
      var sym;
      if (direct) {
        sym = asmLibraryArg["orig$" + symName];
      }
      if (!sym) {
        sym = asmLibraryArg[symName];
      }
      if (!sym) {
        sym = Module[asmjsMangle(symName)];
      }
      if (!sym && symName.startsWith("invoke_")) {
        sym = createInvokeFunction(symName.split("_")[1]);
      }
      return sym;
    }
    function alignMemory(size, alignment) {
      return Math.ceil(size / alignment) * alignment;
    }
    function loadWebAssemblyModule(binary, flags, handle) {
      var metadata = getDylinkMetadata(binary);
      function loadModule() {
        var needsAllocation = !handle || !HEAP8[(handle + 24) >> 0];
        if (needsAllocation) {
          var memAlign = Math.pow(2, metadata.memoryAlign);
          memAlign = Math.max(memAlign, STACK_ALIGN);
          var memoryBase = metadata.memorySize
            ? alignMemory(getMemory(metadata.memorySize + memAlign), memAlign)
            : 0;
          var tableBase = metadata.tableSize ? wasmTable.length : 0;
          if (handle) {
            HEAP8[(handle + 24) >> 0] = 1;
            HEAP32[(handle + 28) >> 2] = memoryBase;
            HEAP32[(handle + 32) >> 2] = metadata.memorySize;
            HEAP32[(handle + 36) >> 2] = tableBase;
            HEAP32[(handle + 40) >> 2] = metadata.tableSize;
          }
        } else {
          memoryBase = HEAP32[(handle + 28) >> 2];
          tableBase = HEAP32[(handle + 36) >> 2];
        }
        var tableGrowthNeeded =
          tableBase + metadata.tableSize - wasmTable.length;
        if (tableGrowthNeeded > 0) {
          wasmTable.grow(tableGrowthNeeded);
        }
        var moduleExports;
        function resolveSymbol(sym) {
          var resolved = resolveGlobalSymbol(sym, false);
          if (!resolved) {
            resolved = moduleExports[sym];
          }
          return resolved;
        }
        var proxyHandler = {
          get: function (stubs, prop) {
            switch (prop) {
              case "__memory_base":
                return memoryBase;
              case "__table_base":
                return tableBase;
            }
            if (prop in asmLibraryArg) {
              return asmLibraryArg[prop];
            }
            if (!(prop in stubs)) {
              var resolved;
              stubs[prop] = function () {
                if (!resolved) resolved = resolveSymbol(prop, true);
                return resolved.apply(null, arguments);
              };
            }
            return stubs[prop];
          },
        };
        var proxy = new Proxy({}, proxyHandler);
        var info = {
          "GOT.mem": new Proxy({}, GOTHandler),
          "GOT.func": new Proxy({}, GOTHandler),
          env: proxy,
          wasi_snapshot_preview1: proxy,
        };
        function postInstantiation(instance) {
          updateTableMap(tableBase, metadata.tableSize);
          moduleExports = relocateExports(instance.exports, memoryBase);
          if (!flags.allowUndefined) {
            reportUndefinedSymbols();
          }
          var init = moduleExports["__wasm_call_ctors"];
          if (init) {
            if (runtimeInitialized) {
              init();
            } else {
              __ATINIT__.push(init);
            }
          }
          return moduleExports;
        }
        if (flags.loadAsync) {
          if (binary instanceof WebAssembly.Module) {
            var instance = new WebAssembly.Instance(binary, info);
            return Promise.resolve(postInstantiation(instance));
          }
          return WebAssembly.instantiate(binary, info).then(function (result) {
            return postInstantiation(result.instance);
          });
        }
        var module =
          binary instanceof WebAssembly.Module
            ? binary
            : new WebAssembly.Module(binary);
        var instance = new WebAssembly.Instance(module, info);
        return postInstantiation(instance);
      }
      if (flags.loadAsync) {
        return metadata.neededDynlibs
          .reduce(function (chain, dynNeeded) {
            return chain.then(function () {
              return loadDynamicLibrary(dynNeeded, flags);
            });
          }, Promise.resolve())
          .then(function () {
            return loadModule();
          });
      }
      metadata.neededDynlibs.forEach(function (dynNeeded) {
        loadDynamicLibrary(dynNeeded, flags);
      });
      return loadModule();
    }
    function loadDynamicLibrary(lib, flags, handle) {
      if (lib == "__main__" && !LDSO.loadedLibsByName[lib]) {
        LDSO.loadedLibsByName[lib] = {
          refcount: Infinity,
          name: "__main__",
          module: Module["asm"],
          global: true,
        };
      }
      flags = flags || { global: true, nodelete: true };
      var dso = LDSO.loadedLibsByName[lib];
      if (dso) {
        if (flags.global && !dso.global) {
          dso.global = true;
          if (dso.module !== "loading") {
            mergeLibSymbols(dso.module, lib);
          }
        }
        if (flags.nodelete && dso.refcount !== Infinity) {
          dso.refcount = Infinity;
        }
        dso.refcount++;
        if (handle) {
          LDSO.loadedLibsByHandle[handle] = dso;
        }
        return flags.loadAsync ? Promise.resolve(true) : true;
      }
      dso = {
        refcount: flags.nodelete ? Infinity : 1,
        name: lib,
        module: "loading",
        global: flags.global,
      };
      LDSO.loadedLibsByName[lib] = dso;
      if (handle) {
        LDSO.loadedLibsByHandle[handle] = dso;
      }
      function loadLibData(libFile) {
        if (flags.fs && flags.fs.findObject(libFile)) {
          var libData = flags.fs.readFile(libFile, { encoding: "binary" });
          if (!(libData instanceof Uint8Array)) {
            libData = new Uint8Array(libData);
          }
          return flags.loadAsync ? Promise.resolve(libData) : libData;
        }
        if (flags.loadAsync) {
          return new Promise(function (resolve, reject) {
            readAsync(
              libFile,
              function (data) {
                resolve(new Uint8Array(data));
              },
              reject
            );
          });
        }
        if (!readBinary) {
          throw new Error(
            libFile +
              ": file not found, and synchronous loading of external files is not available"
          );
        }
        return readBinary(libFile);
      }
      function getLibModule() {
        if (
          Module["preloadedWasm"] !== undefined &&
          Module["preloadedWasm"][lib] !== undefined
        ) {
          var libModule = Module["preloadedWasm"][lib];
          return flags.loadAsync ? Promise.resolve(libModule) : libModule;
        }
        if (flags.loadAsync) {
          return loadLibData(lib).then(function (libData) {
            return loadWebAssemblyModule(libData, flags, handle);
          });
        }
        return loadWebAssemblyModule(loadLibData(lib), flags, handle);
      }
      function moduleLoaded(libModule) {
        if (dso.global) {
          mergeLibSymbols(libModule, lib);
        }
        dso.module = libModule;
      }
      if (flags.loadAsync) {
        return getLibModule().then(function (libModule) {
          moduleLoaded(libModule);
          return true;
        });
      }
      moduleLoaded(getLibModule());
      return true;
    }
    function reportUndefinedSymbols() {
      for (var symName in GOT) {
        if (GOT[symName].value == 0) {
          var value = resolveGlobalSymbol(symName, true);
          if (typeof value === "function") {
            GOT[symName].value = addFunction(value, value.sig);
          } else if (typeof value === "number") {
            GOT[symName].value = value;
          } else {
            assert(
              false,
              "bad export type for `" + symName + "`: " + typeof value
            );
          }
        }
      }
    }
    function preloadDylibs() {
      if (!dynamicLibraries.length) {
        reportUndefinedSymbols();
        return;
      }
      addRunDependency("preloadDylibs");
      dynamicLibraries
        .reduce(function (chain, lib) {
          return chain.then(function () {
            return loadDynamicLibrary(lib, {
              loadAsync: true,
              global: true,
              nodelete: true,
              allowUndefined: true,
            });
          });
        }, Promise.resolve())
        .then(function () {
          reportUndefinedSymbols();
          removeRunDependency("preloadDylibs");
        });
    }
    function setWasmTableEntry(idx, func) {
      wasmTable.set(idx, func);
    }
    var ___memory_base = new WebAssembly.Global(
      { value: "i32", mutable: false },
      1024
    );
    var ___stack_pointer = new WebAssembly.Global(
      { value: "i32", mutable: true },
      5247776
    );
    var ___table_base = new WebAssembly.Global(
      { value: "i32", mutable: false },
      1
    );
    function abortOnCannotGrowMemory(requestedSize) {
      abort("OOM");
    }
    function _emscripten_resize_heap(requestedSize) {
      var oldSize = HEAPU8.length;
      requestedSize = requestedSize >>> 0;
      abortOnCannotGrowMemory(requestedSize);
    }
    var asmLibraryArg = {
      __heap_base: ___heap_base,
      __indirect_function_table: wasmTable,
      __memory_base: ___memory_base,
      __stack_pointer: ___stack_pointer,
      emscripten_resize_heap: _emscripten_resize_heap,
      memory: wasmMemory,
    };
    var asm = createWasm();
    var ___wasm_call_ctors = (Module["___wasm_call_ctors"] = function () {
      return (___wasm_call_ctors = Module["___wasm_call_ctors"] =
        Module["asm"]["__wasm_call_ctors"]).apply(null, arguments);
    });
    var _TA_ACCBANDS = (Module["_TA_ACCBANDS"] = function () {
      return (_TA_ACCBANDS = Module["_TA_ACCBANDS"] =
        Module["asm"]["TA_ACCBANDS"]).apply(null, arguments);
    });
    var _malloc = (Module["_malloc"] = function () {
      return (_malloc = Module["_malloc"] = Module["asm"]["malloc"]).apply(
        null,
        arguments
      );
    });
    var _free = (Module["_free"] = function () {
      return (_free = Module["_free"] = Module["asm"]["free"]).apply(
        null,
        arguments
      );
    });
    var _TA_SMA = (Module["_TA_SMA"] = function () {
      return (_TA_SMA = Module["_TA_SMA"] = Module["asm"]["TA_SMA"]).apply(
        null,
        arguments
      );
    });
    var _TA_ACOS = (Module["_TA_ACOS"] = function () {
      return (_TA_ACOS = Module["_TA_ACOS"] = Module["asm"]["TA_ACOS"]).apply(
        null,
        arguments
      );
    });
    var _TA_AD = (Module["_TA_AD"] = function () {
      return (_TA_AD = Module["_TA_AD"] = Module["asm"]["TA_AD"]).apply(
        null,
        arguments
      );
    });
    var _TA_ADD = (Module["_TA_ADD"] = function () {
      return (_TA_ADD = Module["_TA_ADD"] = Module["asm"]["TA_ADD"]).apply(
        null,
        arguments
      );
    });
    var _TA_ADOSC = (Module["_TA_ADOSC"] = function () {
      return (_TA_ADOSC = Module["_TA_ADOSC"] =
        Module["asm"]["TA_ADOSC"]).apply(null, arguments);
    });
    var _TA_ADX = (Module["_TA_ADX"] = function () {
      return (_TA_ADX = Module["_TA_ADX"] = Module["asm"]["TA_ADX"]).apply(
        null,
        arguments
      );
    });
    var _TA_ADXR = (Module["_TA_ADXR"] = function () {
      return (_TA_ADXR = Module["_TA_ADXR"] = Module["asm"]["TA_ADXR"]).apply(
        null,
        arguments
      );
    });
    var _TA_APO = (Module["_TA_APO"] = function () {
      return (_TA_APO = Module["_TA_APO"] = Module["asm"]["TA_APO"]).apply(
        null,
        arguments
      );
    });
    var _TA_MA = (Module["_TA_MA"] = function () {
      return (_TA_MA = Module["_TA_MA"] = Module["asm"]["TA_MA"]).apply(
        null,
        arguments
      );
    });
    var _TA_AROON = (Module["_TA_AROON"] = function () {
      return (_TA_AROON = Module["_TA_AROON"] =
        Module["asm"]["TA_AROON"]).apply(null, arguments);
    });
    var _TA_AROONOSC = (Module["_TA_AROONOSC"] = function () {
      return (_TA_AROONOSC = Module["_TA_AROONOSC"] =
        Module["asm"]["TA_AROONOSC"]).apply(null, arguments);
    });
    var _TA_ASIN = (Module["_TA_ASIN"] = function () {
      return (_TA_ASIN = Module["_TA_ASIN"] = Module["asm"]["TA_ASIN"]).apply(
        null,
        arguments
      );
    });
    var _TA_ATAN = (Module["_TA_ATAN"] = function () {
      return (_TA_ATAN = Module["_TA_ATAN"] = Module["asm"]["TA_ATAN"]).apply(
        null,
        arguments
      );
    });
    var _TA_ATR = (Module["_TA_ATR"] = function () {
      return (_TA_ATR = Module["_TA_ATR"] = Module["asm"]["TA_ATR"]).apply(
        null,
        arguments
      );
    });
    var _TA_TRANGE = (Module["_TA_TRANGE"] = function () {
      return (_TA_TRANGE = Module["_TA_TRANGE"] =
        Module["asm"]["TA_TRANGE"]).apply(null, arguments);
    });
    var _TA_AVGDEV = (Module["_TA_AVGDEV"] = function () {
      return (_TA_AVGDEV = Module["_TA_AVGDEV"] =
        Module["asm"]["TA_AVGDEV"]).apply(null, arguments);
    });
    var _TA_AVGPRICE = (Module["_TA_AVGPRICE"] = function () {
      return (_TA_AVGPRICE = Module["_TA_AVGPRICE"] =
        Module["asm"]["TA_AVGPRICE"]).apply(null, arguments);
    });
    var _TA_BBANDS = (Module["_TA_BBANDS"] = function () {
      return (_TA_BBANDS = Module["_TA_BBANDS"] =
        Module["asm"]["TA_BBANDS"]).apply(null, arguments);
    });
    var _TA_STDDEV = (Module["_TA_STDDEV"] = function () {
      return (_TA_STDDEV = Module["_TA_STDDEV"] =
        Module["asm"]["TA_STDDEV"]).apply(null, arguments);
    });
    var _TA_BETA = (Module["_TA_BETA"] = function () {
      return (_TA_BETA = Module["_TA_BETA"] = Module["asm"]["TA_BETA"]).apply(
        null,
        arguments
      );
    });
    var _TA_BOP = (Module["_TA_BOP"] = function () {
      return (_TA_BOP = Module["_TA_BOP"] = Module["asm"]["TA_BOP"]).apply(
        null,
        arguments
      );
    });
    var _TA_CCI = (Module["_TA_CCI"] = function () {
      return (_TA_CCI = Module["_TA_CCI"] = Module["asm"]["TA_CCI"]).apply(
        null,
        arguments
      );
    });
    var _TA_CDL2CROWS = (Module["_TA_CDL2CROWS"] = function () {
      return (_TA_CDL2CROWS = Module["_TA_CDL2CROWS"] =
        Module["asm"]["TA_CDL2CROWS"]).apply(null, arguments);
    });
    var _TA_CDL3BLACKCROWS = (Module["_TA_CDL3BLACKCROWS"] = function () {
      return (_TA_CDL3BLACKCROWS = Module["_TA_CDL3BLACKCROWS"] =
        Module["asm"]["TA_CDL3BLACKCROWS"]).apply(null, arguments);
    });
    var _TA_CDL3INSIDE = (Module["_TA_CDL3INSIDE"] = function () {
      return (_TA_CDL3INSIDE = Module["_TA_CDL3INSIDE"] =
        Module["asm"]["TA_CDL3INSIDE"]).apply(null, arguments);
    });
    var _TA_CDL3LINESTRIKE = (Module["_TA_CDL3LINESTRIKE"] = function () {
      return (_TA_CDL3LINESTRIKE = Module["_TA_CDL3LINESTRIKE"] =
        Module["asm"]["TA_CDL3LINESTRIKE"]).apply(null, arguments);
    });
    var _TA_CDL3OUTSIDE = (Module["_TA_CDL3OUTSIDE"] = function () {
      return (_TA_CDL3OUTSIDE = Module["_TA_CDL3OUTSIDE"] =
        Module["asm"]["TA_CDL3OUTSIDE"]).apply(null, arguments);
    });
    var _TA_CDL3STARSINSOUTH = (Module["_TA_CDL3STARSINSOUTH"] = function () {
      return (_TA_CDL3STARSINSOUTH = Module["_TA_CDL3STARSINSOUTH"] =
        Module["asm"]["TA_CDL3STARSINSOUTH"]).apply(null, arguments);
    });
    var _TA_CDL3WHITESOLDIERS = (Module["_TA_CDL3WHITESOLDIERS"] = function () {
      return (_TA_CDL3WHITESOLDIERS = Module["_TA_CDL3WHITESOLDIERS"] =
        Module["asm"]["TA_CDL3WHITESOLDIERS"]).apply(null, arguments);
    });
    var _TA_CDLABANDONEDBABY = (Module["_TA_CDLABANDONEDBABY"] = function () {
      return (_TA_CDLABANDONEDBABY = Module["_TA_CDLABANDONEDBABY"] =
        Module["asm"]["TA_CDLABANDONEDBABY"]).apply(null, arguments);
    });
    var _TA_CDLADVANCEBLOCK = (Module["_TA_CDLADVANCEBLOCK"] = function () {
      return (_TA_CDLADVANCEBLOCK = Module["_TA_CDLADVANCEBLOCK"] =
        Module["asm"]["TA_CDLADVANCEBLOCK"]).apply(null, arguments);
    });
    var _TA_CDLBELTHOLD = (Module["_TA_CDLBELTHOLD"] = function () {
      return (_TA_CDLBELTHOLD = Module["_TA_CDLBELTHOLD"] =
        Module["asm"]["TA_CDLBELTHOLD"]).apply(null, arguments);
    });
    var _TA_CDLBREAKAWAY = (Module["_TA_CDLBREAKAWAY"] = function () {
      return (_TA_CDLBREAKAWAY = Module["_TA_CDLBREAKAWAY"] =
        Module["asm"]["TA_CDLBREAKAWAY"]).apply(null, arguments);
    });
    var _TA_CDLCLOSINGMARUBOZU = (Module["_TA_CDLCLOSINGMARUBOZU"] =
      function () {
        return (_TA_CDLCLOSINGMARUBOZU = Module["_TA_CDLCLOSINGMARUBOZU"] =
          Module["asm"]["TA_CDLCLOSINGMARUBOZU"]).apply(null, arguments);
      });
    var _TA_CDLCONCEALBABYSWALL = (Module["_TA_CDLCONCEALBABYSWALL"] =
      function () {
        return (_TA_CDLCONCEALBABYSWALL = Module["_TA_CDLCONCEALBABYSWALL"] =
          Module["asm"]["TA_CDLCONCEALBABYSWALL"]).apply(null, arguments);
      });
    var _TA_CDLCOUNTERATTACK = (Module["_TA_CDLCOUNTERATTACK"] = function () {
      return (_TA_CDLCOUNTERATTACK = Module["_TA_CDLCOUNTERATTACK"] =
        Module["asm"]["TA_CDLCOUNTERATTACK"]).apply(null, arguments);
    });
    var _TA_CDLDARKCLOUDCOVER = (Module["_TA_CDLDARKCLOUDCOVER"] = function () {
      return (_TA_CDLDARKCLOUDCOVER = Module["_TA_CDLDARKCLOUDCOVER"] =
        Module["asm"]["TA_CDLDARKCLOUDCOVER"]).apply(null, arguments);
    });
    var _TA_CDLDOJI = (Module["_TA_CDLDOJI"] = function () {
      return (_TA_CDLDOJI = Module["_TA_CDLDOJI"] =
        Module["asm"]["TA_CDLDOJI"]).apply(null, arguments);
    });
    var _TA_CDLDOJISTAR = (Module["_TA_CDLDOJISTAR"] = function () {
      return (_TA_CDLDOJISTAR = Module["_TA_CDLDOJISTAR"] =
        Module["asm"]["TA_CDLDOJISTAR"]).apply(null, arguments);
    });
    var _TA_CDLDRAGONFLYDOJI = (Module["_TA_CDLDRAGONFLYDOJI"] = function () {
      return (_TA_CDLDRAGONFLYDOJI = Module["_TA_CDLDRAGONFLYDOJI"] =
        Module["asm"]["TA_CDLDRAGONFLYDOJI"]).apply(null, arguments);
    });
    var _TA_CDLENGULFING = (Module["_TA_CDLENGULFING"] = function () {
      return (_TA_CDLENGULFING = Module["_TA_CDLENGULFING"] =
        Module["asm"]["TA_CDLENGULFING"]).apply(null, arguments);
    });
    var _TA_CDLEVENINGDOJISTAR = (Module["_TA_CDLEVENINGDOJISTAR"] =
      function () {
        return (_TA_CDLEVENINGDOJISTAR = Module["_TA_CDLEVENINGDOJISTAR"] =
          Module["asm"]["TA_CDLEVENINGDOJISTAR"]).apply(null, arguments);
      });
    var _TA_CDLEVENINGSTAR = (Module["_TA_CDLEVENINGSTAR"] = function () {
      return (_TA_CDLEVENINGSTAR = Module["_TA_CDLEVENINGSTAR"] =
        Module["asm"]["TA_CDLEVENINGSTAR"]).apply(null, arguments);
    });
    var _TA_CDLGAPSIDESIDEWHITE = (Module["_TA_CDLGAPSIDESIDEWHITE"] =
      function () {
        return (_TA_CDLGAPSIDESIDEWHITE = Module["_TA_CDLGAPSIDESIDEWHITE"] =
          Module["asm"]["TA_CDLGAPSIDESIDEWHITE"]).apply(null, arguments);
      });
    var _TA_CDLGRAVESTONEDOJI = (Module["_TA_CDLGRAVESTONEDOJI"] = function () {
      return (_TA_CDLGRAVESTONEDOJI = Module["_TA_CDLGRAVESTONEDOJI"] =
        Module["asm"]["TA_CDLGRAVESTONEDOJI"]).apply(null, arguments);
    });
    var _TA_CDLHAMMER = (Module["_TA_CDLHAMMER"] = function () {
      return (_TA_CDLHAMMER = Module["_TA_CDLHAMMER"] =
        Module["asm"]["TA_CDLHAMMER"]).apply(null, arguments);
    });
    var _TA_CDLHANGINGMAN = (Module["_TA_CDLHANGINGMAN"] = function () {
      return (_TA_CDLHANGINGMAN = Module["_TA_CDLHANGINGMAN"] =
        Module["asm"]["TA_CDLHANGINGMAN"]).apply(null, arguments);
    });
    var _TA_CDLHARAMI = (Module["_TA_CDLHARAMI"] = function () {
      return (_TA_CDLHARAMI = Module["_TA_CDLHARAMI"] =
        Module["asm"]["TA_CDLHARAMI"]).apply(null, arguments);
    });
    var _TA_CDLHARAMICROSS = (Module["_TA_CDLHARAMICROSS"] = function () {
      return (_TA_CDLHARAMICROSS = Module["_TA_CDLHARAMICROSS"] =
        Module["asm"]["TA_CDLHARAMICROSS"]).apply(null, arguments);
    });
    var _TA_CDLHIGHWAVE = (Module["_TA_CDLHIGHWAVE"] = function () {
      return (_TA_CDLHIGHWAVE = Module["_TA_CDLHIGHWAVE"] =
        Module["asm"]["TA_CDLHIGHWAVE"]).apply(null, arguments);
    });
    var _TA_CDLHIKKAKE = (Module["_TA_CDLHIKKAKE"] = function () {
      return (_TA_CDLHIKKAKE = Module["_TA_CDLHIKKAKE"] =
        Module["asm"]["TA_CDLHIKKAKE"]).apply(null, arguments);
    });
    var _TA_CDLHIKKAKEMOD = (Module["_TA_CDLHIKKAKEMOD"] = function () {
      return (_TA_CDLHIKKAKEMOD = Module["_TA_CDLHIKKAKEMOD"] =
        Module["asm"]["TA_CDLHIKKAKEMOD"]).apply(null, arguments);
    });
    var _TA_CDLHOMINGPIGEON = (Module["_TA_CDLHOMINGPIGEON"] = function () {
      return (_TA_CDLHOMINGPIGEON = Module["_TA_CDLHOMINGPIGEON"] =
        Module["asm"]["TA_CDLHOMINGPIGEON"]).apply(null, arguments);
    });
    var _TA_CDLIDENTICAL3CROWS = (Module["_TA_CDLIDENTICAL3CROWS"] =
      function () {
        return (_TA_CDLIDENTICAL3CROWS = Module["_TA_CDLIDENTICAL3CROWS"] =
          Module["asm"]["TA_CDLIDENTICAL3CROWS"]).apply(null, arguments);
      });
    var _TA_CDLINNECK = (Module["_TA_CDLINNECK"] = function () {
      return (_TA_CDLINNECK = Module["_TA_CDLINNECK"] =
        Module["asm"]["TA_CDLINNECK"]).apply(null, arguments);
    });
    var _TA_CDLINVERTEDHAMMER = (Module["_TA_CDLINVERTEDHAMMER"] = function () {
      return (_TA_CDLINVERTEDHAMMER = Module["_TA_CDLINVERTEDHAMMER"] =
        Module["asm"]["TA_CDLINVERTEDHAMMER"]).apply(null, arguments);
    });
    var _TA_CDLKICKINGBYLENGTH = (Module["_TA_CDLKICKINGBYLENGTH"] =
      function () {
        return (_TA_CDLKICKINGBYLENGTH = Module["_TA_CDLKICKINGBYLENGTH"] =
          Module["asm"]["TA_CDLKICKINGBYLENGTH"]).apply(null, arguments);
      });
    var _TA_CDLKICKING = (Module["_TA_CDLKICKING"] = function () {
      return (_TA_CDLKICKING = Module["_TA_CDLKICKING"] =
        Module["asm"]["TA_CDLKICKING"]).apply(null, arguments);
    });
    var _TA_CDLLADDERBOTTOM = (Module["_TA_CDLLADDERBOTTOM"] = function () {
      return (_TA_CDLLADDERBOTTOM = Module["_TA_CDLLADDERBOTTOM"] =
        Module["asm"]["TA_CDLLADDERBOTTOM"]).apply(null, arguments);
    });
    var _TA_CDLLONGLEGGEDDOJI = (Module["_TA_CDLLONGLEGGEDDOJI"] = function () {
      return (_TA_CDLLONGLEGGEDDOJI = Module["_TA_CDLLONGLEGGEDDOJI"] =
        Module["asm"]["TA_CDLLONGLEGGEDDOJI"]).apply(null, arguments);
    });
    var _TA_CDLLONGLINE = (Module["_TA_CDLLONGLINE"] = function () {
      return (_TA_CDLLONGLINE = Module["_TA_CDLLONGLINE"] =
        Module["asm"]["TA_CDLLONGLINE"]).apply(null, arguments);
    });
    var _TA_CDLMARUBOZU = (Module["_TA_CDLMARUBOZU"] = function () {
      return (_TA_CDLMARUBOZU = Module["_TA_CDLMARUBOZU"] =
        Module["asm"]["TA_CDLMARUBOZU"]).apply(null, arguments);
    });
    var _TA_CDLMATCHINGLOW = (Module["_TA_CDLMATCHINGLOW"] = function () {
      return (_TA_CDLMATCHINGLOW = Module["_TA_CDLMATCHINGLOW"] =
        Module["asm"]["TA_CDLMATCHINGLOW"]).apply(null, arguments);
    });
    var _TA_CDLMATHOLD = (Module["_TA_CDLMATHOLD"] = function () {
      return (_TA_CDLMATHOLD = Module["_TA_CDLMATHOLD"] =
        Module["asm"]["TA_CDLMATHOLD"]).apply(null, arguments);
    });
    var _TA_CDLMORNINGDOJISTAR = (Module["_TA_CDLMORNINGDOJISTAR"] =
      function () {
        return (_TA_CDLMORNINGDOJISTAR = Module["_TA_CDLMORNINGDOJISTAR"] =
          Module["asm"]["TA_CDLMORNINGDOJISTAR"]).apply(null, arguments);
      });
    var _TA_CDLMORNINGSTAR = (Module["_TA_CDLMORNINGSTAR"] = function () {
      return (_TA_CDLMORNINGSTAR = Module["_TA_CDLMORNINGSTAR"] =
        Module["asm"]["TA_CDLMORNINGSTAR"]).apply(null, arguments);
    });
    var _TA_CDLONNECK = (Module["_TA_CDLONNECK"] = function () {
      return (_TA_CDLONNECK = Module["_TA_CDLONNECK"] =
        Module["asm"]["TA_CDLONNECK"]).apply(null, arguments);
    });
    var _TA_CDLPIERCING = (Module["_TA_CDLPIERCING"] = function () {
      return (_TA_CDLPIERCING = Module["_TA_CDLPIERCING"] =
        Module["asm"]["TA_CDLPIERCING"]).apply(null, arguments);
    });
    var _TA_CDLRICKSHAWMAN = (Module["_TA_CDLRICKSHAWMAN"] = function () {
      return (_TA_CDLRICKSHAWMAN = Module["_TA_CDLRICKSHAWMAN"] =
        Module["asm"]["TA_CDLRICKSHAWMAN"]).apply(null, arguments);
    });
    var _TA_CDLRISEFALL3METHODS = (Module["_TA_CDLRISEFALL3METHODS"] =
      function () {
        return (_TA_CDLRISEFALL3METHODS = Module["_TA_CDLRISEFALL3METHODS"] =
          Module["asm"]["TA_CDLRISEFALL3METHODS"]).apply(null, arguments);
      });
    var _TA_CDLSEPARATINGLINES = (Module["_TA_CDLSEPARATINGLINES"] =
      function () {
        return (_TA_CDLSEPARATINGLINES = Module["_TA_CDLSEPARATINGLINES"] =
          Module["asm"]["TA_CDLSEPARATINGLINES"]).apply(null, arguments);
      });
    var _TA_CDLSHOOTINGSTAR = (Module["_TA_CDLSHOOTINGSTAR"] = function () {
      return (_TA_CDLSHOOTINGSTAR = Module["_TA_CDLSHOOTINGSTAR"] =
        Module["asm"]["TA_CDLSHOOTINGSTAR"]).apply(null, arguments);
    });
    var _TA_CDLSHORTLINE = (Module["_TA_CDLSHORTLINE"] = function () {
      return (_TA_CDLSHORTLINE = Module["_TA_CDLSHORTLINE"] =
        Module["asm"]["TA_CDLSHORTLINE"]).apply(null, arguments);
    });
    var _TA_CDLSPINNINGTOP = (Module["_TA_CDLSPINNINGTOP"] = function () {
      return (_TA_CDLSPINNINGTOP = Module["_TA_CDLSPINNINGTOP"] =
        Module["asm"]["TA_CDLSPINNINGTOP"]).apply(null, arguments);
    });
    var _TA_CDLSTALLEDPATTERN = (Module["_TA_CDLSTALLEDPATTERN"] = function () {
      return (_TA_CDLSTALLEDPATTERN = Module["_TA_CDLSTALLEDPATTERN"] =
        Module["asm"]["TA_CDLSTALLEDPATTERN"]).apply(null, arguments);
    });
    var _TA_CDLSTICKSANDWICH = (Module["_TA_CDLSTICKSANDWICH"] = function () {
      return (_TA_CDLSTICKSANDWICH = Module["_TA_CDLSTICKSANDWICH"] =
        Module["asm"]["TA_CDLSTICKSANDWICH"]).apply(null, arguments);
    });
    var _TA_CDLTAKURI = (Module["_TA_CDLTAKURI"] = function () {
      return (_TA_CDLTAKURI = Module["_TA_CDLTAKURI"] =
        Module["asm"]["TA_CDLTAKURI"]).apply(null, arguments);
    });
    var _TA_CDLTASUKIGAP = (Module["_TA_CDLTASUKIGAP"] = function () {
      return (_TA_CDLTASUKIGAP = Module["_TA_CDLTASUKIGAP"] =
        Module["asm"]["TA_CDLTASUKIGAP"]).apply(null, arguments);
    });
    var _TA_CDLTHRUSTING = (Module["_TA_CDLTHRUSTING"] = function () {
      return (_TA_CDLTHRUSTING = Module["_TA_CDLTHRUSTING"] =
        Module["asm"]["TA_CDLTHRUSTING"]).apply(null, arguments);
    });
    var _TA_CDLTRISTAR = (Module["_TA_CDLTRISTAR"] = function () {
      return (_TA_CDLTRISTAR = Module["_TA_CDLTRISTAR"] =
        Module["asm"]["TA_CDLTRISTAR"]).apply(null, arguments);
    });
    var _TA_CDLUNIQUE3RIVER = (Module["_TA_CDLUNIQUE3RIVER"] = function () {
      return (_TA_CDLUNIQUE3RIVER = Module["_TA_CDLUNIQUE3RIVER"] =
        Module["asm"]["TA_CDLUNIQUE3RIVER"]).apply(null, arguments);
    });
    var _TA_CDLUPSIDEGAP2CROWS = (Module["_TA_CDLUPSIDEGAP2CROWS"] =
      function () {
        return (_TA_CDLUPSIDEGAP2CROWS = Module["_TA_CDLUPSIDEGAP2CROWS"] =
          Module["asm"]["TA_CDLUPSIDEGAP2CROWS"]).apply(null, arguments);
      });
    var _TA_CDLXSIDEGAP3METHODS = (Module["_TA_CDLXSIDEGAP3METHODS"] =
      function () {
        return (_TA_CDLXSIDEGAP3METHODS = Module["_TA_CDLXSIDEGAP3METHODS"] =
          Module["asm"]["TA_CDLXSIDEGAP3METHODS"]).apply(null, arguments);
      });
    var _TA_CEIL = (Module["_TA_CEIL"] = function () {
      return (_TA_CEIL = Module["_TA_CEIL"] = Module["asm"]["TA_CEIL"]).apply(
        null,
        arguments
      );
    });
    var _TA_CMO = (Module["_TA_CMO"] = function () {
      return (_TA_CMO = Module["_TA_CMO"] = Module["asm"]["TA_CMO"]).apply(
        null,
        arguments
      );
    });
    var _TA_CORREL = (Module["_TA_CORREL"] = function () {
      return (_TA_CORREL = Module["_TA_CORREL"] =
        Module["asm"]["TA_CORREL"]).apply(null, arguments);
    });
    var _TA_COS = (Module["_TA_COS"] = function () {
      return (_TA_COS = Module["_TA_COS"] = Module["asm"]["TA_COS"]).apply(
        null,
        arguments
      );
    });
    var _TA_COSH = (Module["_TA_COSH"] = function () {
      return (_TA_COSH = Module["_TA_COSH"] = Module["asm"]["TA_COSH"]).apply(
        null,
        arguments
      );
    });
    var _TA_DEMA = (Module["_TA_DEMA"] = function () {
      return (_TA_DEMA = Module["_TA_DEMA"] = Module["asm"]["TA_DEMA"]).apply(
        null,
        arguments
      );
    });
    var _TA_DIV = (Module["_TA_DIV"] = function () {
      return (_TA_DIV = Module["_TA_DIV"] = Module["asm"]["TA_DIV"]).apply(
        null,
        arguments
      );
    });
    var _TA_DX = (Module["_TA_DX"] = function () {
      return (_TA_DX = Module["_TA_DX"] = Module["asm"]["TA_DX"]).apply(
        null,
        arguments
      );
    });
    var _TA_EMA = (Module["_TA_EMA"] = function () {
      return (_TA_EMA = Module["_TA_EMA"] = Module["asm"]["TA_EMA"]).apply(
        null,
        arguments
      );
    });
    var _TA_EXP = (Module["_TA_EXP"] = function () {
      return (_TA_EXP = Module["_TA_EXP"] = Module["asm"]["TA_EXP"]).apply(
        null,
        arguments
      );
    });
    var _TA_FLOOR = (Module["_TA_FLOOR"] = function () {
      return (_TA_FLOOR = Module["_TA_FLOOR"] =
        Module["asm"]["TA_FLOOR"]).apply(null, arguments);
    });
    var _TA_HT_DCPERIOD = (Module["_TA_HT_DCPERIOD"] = function () {
      return (_TA_HT_DCPERIOD = Module["_TA_HT_DCPERIOD"] =
        Module["asm"]["TA_HT_DCPERIOD"]).apply(null, arguments);
    });
    var _TA_HT_DCPHASE = (Module["_TA_HT_DCPHASE"] = function () {
      return (_TA_HT_DCPHASE = Module["_TA_HT_DCPHASE"] =
        Module["asm"]["TA_HT_DCPHASE"]).apply(null, arguments);
    });
    var _TA_HT_PHASOR = (Module["_TA_HT_PHASOR"] = function () {
      return (_TA_HT_PHASOR = Module["_TA_HT_PHASOR"] =
        Module["asm"]["TA_HT_PHASOR"]).apply(null, arguments);
    });
    var _TA_HT_SINE = (Module["_TA_HT_SINE"] = function () {
      return (_TA_HT_SINE = Module["_TA_HT_SINE"] =
        Module["asm"]["TA_HT_SINE"]).apply(null, arguments);
    });
    var _TA_HT_TRENDLINE = (Module["_TA_HT_TRENDLINE"] = function () {
      return (_TA_HT_TRENDLINE = Module["_TA_HT_TRENDLINE"] =
        Module["asm"]["TA_HT_TRENDLINE"]).apply(null, arguments);
    });
    var _TA_HT_TRENDMODE = (Module["_TA_HT_TRENDMODE"] = function () {
      return (_TA_HT_TRENDMODE = Module["_TA_HT_TRENDMODE"] =
        Module["asm"]["TA_HT_TRENDMODE"]).apply(null, arguments);
    });
    var _TA_IMI = (Module["_TA_IMI"] = function () {
      return (_TA_IMI = Module["_TA_IMI"] = Module["asm"]["TA_IMI"]).apply(
        null,
        arguments
      );
    });
    var _TA_KAMA = (Module["_TA_KAMA"] = function () {
      return (_TA_KAMA = Module["_TA_KAMA"] = Module["asm"]["TA_KAMA"]).apply(
        null,
        arguments
      );
    });
    var _TA_LINEARREG_ANGLE = (Module["_TA_LINEARREG_ANGLE"] = function () {
      return (_TA_LINEARREG_ANGLE = Module["_TA_LINEARREG_ANGLE"] =
        Module["asm"]["TA_LINEARREG_ANGLE"]).apply(null, arguments);
    });
    var _TA_LINEARREG = (Module["_TA_LINEARREG"] = function () {
      return (_TA_LINEARREG = Module["_TA_LINEARREG"] =
        Module["asm"]["TA_LINEARREG"]).apply(null, arguments);
    });
    var _TA_LINEARREG_INTERCEPT = (Module["_TA_LINEARREG_INTERCEPT"] =
      function () {
        return (_TA_LINEARREG_INTERCEPT = Module["_TA_LINEARREG_INTERCEPT"] =
          Module["asm"]["TA_LINEARREG_INTERCEPT"]).apply(null, arguments);
      });
    var _TA_LINEARREG_SLOPE = (Module["_TA_LINEARREG_SLOPE"] = function () {
      return (_TA_LINEARREG_SLOPE = Module["_TA_LINEARREG_SLOPE"] =
        Module["asm"]["TA_LINEARREG_SLOPE"]).apply(null, arguments);
    });
    var _TA_LN = (Module["_TA_LN"] = function () {
      return (_TA_LN = Module["_TA_LN"] = Module["asm"]["TA_LN"]).apply(
        null,
        arguments
      );
    });
    var _TA_LOG10 = (Module["_TA_LOG10"] = function () {
      return (_TA_LOG10 = Module["_TA_LOG10"] =
        Module["asm"]["TA_LOG10"]).apply(null, arguments);
    });
    var _TA_WMA = (Module["_TA_WMA"] = function () {
      return (_TA_WMA = Module["_TA_WMA"] = Module["asm"]["TA_WMA"]).apply(
        null,
        arguments
      );
    });
    var _TA_TEMA = (Module["_TA_TEMA"] = function () {
      return (_TA_TEMA = Module["_TA_TEMA"] = Module["asm"]["TA_TEMA"]).apply(
        null,
        arguments
      );
    });
    var _TA_TRIMA = (Module["_TA_TRIMA"] = function () {
      return (_TA_TRIMA = Module["_TA_TRIMA"] =
        Module["asm"]["TA_TRIMA"]).apply(null, arguments);
    });
    var _TA_MAMA = (Module["_TA_MAMA"] = function () {
      return (_TA_MAMA = Module["_TA_MAMA"] = Module["asm"]["TA_MAMA"]).apply(
        null,
        arguments
      );
    });
    var _TA_T3 = (Module["_TA_T3"] = function () {
      return (_TA_T3 = Module["_TA_T3"] = Module["asm"]["TA_T3"]).apply(
        null,
        arguments
      );
    });
    var _TA_MACD = (Module["_TA_MACD"] = function () {
      return (_TA_MACD = Module["_TA_MACD"] = Module["asm"]["TA_MACD"]).apply(
        null,
        arguments
      );
    });
    var _TA_MACDEXT = (Module["_TA_MACDEXT"] = function () {
      return (_TA_MACDEXT = Module["_TA_MACDEXT"] =
        Module["asm"]["TA_MACDEXT"]).apply(null, arguments);
    });
    var _TA_MACDFIX = (Module["_TA_MACDFIX"] = function () {
      return (_TA_MACDFIX = Module["_TA_MACDFIX"] =
        Module["asm"]["TA_MACDFIX"]).apply(null, arguments);
    });
    var _TA_MAVP = (Module["_TA_MAVP"] = function () {
      return (_TA_MAVP = Module["_TA_MAVP"] = Module["asm"]["TA_MAVP"]).apply(
        null,
        arguments
      );
    });
    var _TA_MAX = (Module["_TA_MAX"] = function () {
      return (_TA_MAX = Module["_TA_MAX"] = Module["asm"]["TA_MAX"]).apply(
        null,
        arguments
      );
    });
    var _TA_MAXINDEX = (Module["_TA_MAXINDEX"] = function () {
      return (_TA_MAXINDEX = Module["_TA_MAXINDEX"] =
        Module["asm"]["TA_MAXINDEX"]).apply(null, arguments);
    });
    var _TA_MEDPRICE = (Module["_TA_MEDPRICE"] = function () {
      return (_TA_MEDPRICE = Module["_TA_MEDPRICE"] =
        Module["asm"]["TA_MEDPRICE"]).apply(null, arguments);
    });
    var _TA_MFI = (Module["_TA_MFI"] = function () {
      return (_TA_MFI = Module["_TA_MFI"] = Module["asm"]["TA_MFI"]).apply(
        null,
        arguments
      );
    });
    var _TA_MIDPOINT = (Module["_TA_MIDPOINT"] = function () {
      return (_TA_MIDPOINT = Module["_TA_MIDPOINT"] =
        Module["asm"]["TA_MIDPOINT"]).apply(null, arguments);
    });
    var _TA_MIDPRICE = (Module["_TA_MIDPRICE"] = function () {
      return (_TA_MIDPRICE = Module["_TA_MIDPRICE"] =
        Module["asm"]["TA_MIDPRICE"]).apply(null, arguments);
    });
    var _TA_MIN = (Module["_TA_MIN"] = function () {
      return (_TA_MIN = Module["_TA_MIN"] = Module["asm"]["TA_MIN"]).apply(
        null,
        arguments
      );
    });
    var _TA_MININDEX = (Module["_TA_MININDEX"] = function () {
      return (_TA_MININDEX = Module["_TA_MININDEX"] =
        Module["asm"]["TA_MININDEX"]).apply(null, arguments);
    });
    var _TA_MINMAX = (Module["_TA_MINMAX"] = function () {
      return (_TA_MINMAX = Module["_TA_MINMAX"] =
        Module["asm"]["TA_MINMAX"]).apply(null, arguments);
    });
    var _TA_MINMAXINDEX = (Module["_TA_MINMAXINDEX"] = function () {
      return (_TA_MINMAXINDEX = Module["_TA_MINMAXINDEX"] =
        Module["asm"]["TA_MINMAXINDEX"]).apply(null, arguments);
    });
    var _TA_MINUS_DI = (Module["_TA_MINUS_DI"] = function () {
      return (_TA_MINUS_DI = Module["_TA_MINUS_DI"] =
        Module["asm"]["TA_MINUS_DI"]).apply(null, arguments);
    });
    var _TA_MINUS_DM = (Module["_TA_MINUS_DM"] = function () {
      return (_TA_MINUS_DM = Module["_TA_MINUS_DM"] =
        Module["asm"]["TA_MINUS_DM"]).apply(null, arguments);
    });
    var _TA_MOM = (Module["_TA_MOM"] = function () {
      return (_TA_MOM = Module["_TA_MOM"] = Module["asm"]["TA_MOM"]).apply(
        null,
        arguments
      );
    });
    var _TA_MULT = (Module["_TA_MULT"] = function () {
      return (_TA_MULT = Module["_TA_MULT"] = Module["asm"]["TA_MULT"]).apply(
        null,
        arguments
      );
    });
    var _TA_NATR = (Module["_TA_NATR"] = function () {
      return (_TA_NATR = Module["_TA_NATR"] = Module["asm"]["TA_NATR"]).apply(
        null,
        arguments
      );
    });
    var _TA_OBV = (Module["_TA_OBV"] = function () {
      return (_TA_OBV = Module["_TA_OBV"] = Module["asm"]["TA_OBV"]).apply(
        null,
        arguments
      );
    });
    var _TA_PLUS_DI = (Module["_TA_PLUS_DI"] = function () {
      return (_TA_PLUS_DI = Module["_TA_PLUS_DI"] =
        Module["asm"]["TA_PLUS_DI"]).apply(null, arguments);
    });
    var _TA_PLUS_DM = (Module["_TA_PLUS_DM"] = function () {
      return (_TA_PLUS_DM = Module["_TA_PLUS_DM"] =
        Module["asm"]["TA_PLUS_DM"]).apply(null, arguments);
    });
    var _TA_PPO = (Module["_TA_PPO"] = function () {
      return (_TA_PPO = Module["_TA_PPO"] = Module["asm"]["TA_PPO"]).apply(
        null,
        arguments
      );
    });
    var _TA_ROC = (Module["_TA_ROC"] = function () {
      return (_TA_ROC = Module["_TA_ROC"] = Module["asm"]["TA_ROC"]).apply(
        null,
        arguments
      );
    });
    var _TA_ROCP = (Module["_TA_ROCP"] = function () {
      return (_TA_ROCP = Module["_TA_ROCP"] = Module["asm"]["TA_ROCP"]).apply(
        null,
        arguments
      );
    });
    var _TA_ROCR100 = (Module["_TA_ROCR100"] = function () {
      return (_TA_ROCR100 = Module["_TA_ROCR100"] =
        Module["asm"]["TA_ROCR100"]).apply(null, arguments);
    });
    var _TA_ROCR = (Module["_TA_ROCR"] = function () {
      return (_TA_ROCR = Module["_TA_ROCR"] = Module["asm"]["TA_ROCR"]).apply(
        null,
        arguments
      );
    });
    var _TA_RSI = (Module["_TA_RSI"] = function () {
      return (_TA_RSI = Module["_TA_RSI"] = Module["asm"]["TA_RSI"]).apply(
        null,
        arguments
      );
    });
    var _TA_SAR = (Module["_TA_SAR"] = function () {
      return (_TA_SAR = Module["_TA_SAR"] = Module["asm"]["TA_SAR"]).apply(
        null,
        arguments
      );
    });
    var _TA_SAREXT = (Module["_TA_SAREXT"] = function () {
      return (_TA_SAREXT = Module["_TA_SAREXT"] =
        Module["asm"]["TA_SAREXT"]).apply(null, arguments);
    });
    var _TA_SIN = (Module["_TA_SIN"] = function () {
      return (_TA_SIN = Module["_TA_SIN"] = Module["asm"]["TA_SIN"]).apply(
        null,
        arguments
      );
    });
    var _TA_SINH = (Module["_TA_SINH"] = function () {
      return (_TA_SINH = Module["_TA_SINH"] = Module["asm"]["TA_SINH"]).apply(
        null,
        arguments
      );
    });
    var _TA_SQRT = (Module["_TA_SQRT"] = function () {
      return (_TA_SQRT = Module["_TA_SQRT"] = Module["asm"]["TA_SQRT"]).apply(
        null,
        arguments
      );
    });
    var _TA_STOCH = (Module["_TA_STOCH"] = function () {
      return (_TA_STOCH = Module["_TA_STOCH"] =
        Module["asm"]["TA_STOCH"]).apply(null, arguments);
    });
    var _TA_STOCHF = (Module["_TA_STOCHF"] = function () {
      return (_TA_STOCHF = Module["_TA_STOCHF"] =
        Module["asm"]["TA_STOCHF"]).apply(null, arguments);
    });
    var _TA_STOCHRSI = (Module["_TA_STOCHRSI"] = function () {
      return (_TA_STOCHRSI = Module["_TA_STOCHRSI"] =
        Module["asm"]["TA_STOCHRSI"]).apply(null, arguments);
    });
    var _TA_SUB = (Module["_TA_SUB"] = function () {
      return (_TA_SUB = Module["_TA_SUB"] = Module["asm"]["TA_SUB"]).apply(
        null,
        arguments
      );
    });
    var _TA_SUM = (Module["_TA_SUM"] = function () {
      return (_TA_SUM = Module["_TA_SUM"] = Module["asm"]["TA_SUM"]).apply(
        null,
        arguments
      );
    });
    var _TA_TAN = (Module["_TA_TAN"] = function () {
      return (_TA_TAN = Module["_TA_TAN"] = Module["asm"]["TA_TAN"]).apply(
        null,
        arguments
      );
    });
    var _TA_TANH = (Module["_TA_TANH"] = function () {
      return (_TA_TANH = Module["_TA_TANH"] = Module["asm"]["TA_TANH"]).apply(
        null,
        arguments
      );
    });
    var _TA_TRIX = (Module["_TA_TRIX"] = function () {
      return (_TA_TRIX = Module["_TA_TRIX"] = Module["asm"]["TA_TRIX"]).apply(
        null,
        arguments
      );
    });
    var _TA_TSF = (Module["_TA_TSF"] = function () {
      return (_TA_TSF = Module["_TA_TSF"] = Module["asm"]["TA_TSF"]).apply(
        null,
        arguments
      );
    });
    var _TA_TYPPRICE = (Module["_TA_TYPPRICE"] = function () {
      return (_TA_TYPPRICE = Module["_TA_TYPPRICE"] =
        Module["asm"]["TA_TYPPRICE"]).apply(null, arguments);
    });
    var _TA_ULTOSC = (Module["_TA_ULTOSC"] = function () {
      return (_TA_ULTOSC = Module["_TA_ULTOSC"] =
        Module["asm"]["TA_ULTOSC"]).apply(null, arguments);
    });
    var _TA_VAR = (Module["_TA_VAR"] = function () {
      return (_TA_VAR = Module["_TA_VAR"] = Module["asm"]["TA_VAR"]).apply(
        null,
        arguments
      );
    });
    var _TA_WCLPRICE = (Module["_TA_WCLPRICE"] = function () {
      return (_TA_WCLPRICE = Module["_TA_WCLPRICE"] =
        Module["asm"]["TA_WCLPRICE"]).apply(null, arguments);
    });
    var _TA_WILLR = (Module["_TA_WILLR"] = function () {
      return (_TA_WILLR = Module["_TA_WILLR"] =
        Module["asm"]["TA_WILLR"]).apply(null, arguments);
    });
    var stackSave = (Module["stackSave"] = function () {
      return (stackSave = Module["stackSave"] =
        Module["asm"]["stackSave"]).apply(null, arguments);
    });
    var stackRestore = (Module["stackRestore"] = function () {
      return (stackRestore = Module["stackRestore"] =
        Module["asm"]["stackRestore"]).apply(null, arguments);
    });
    var stackAlloc = (Module["stackAlloc"] = function () {
      return (stackAlloc = Module["stackAlloc"] =
        Module["asm"]["stackAlloc"]).apply(null, arguments);
    });
    var _setThrew = (Module["_setThrew"] = function () {
      return (_setThrew = Module["_setThrew"] =
        Module["asm"]["setThrew"]).apply(null, arguments);
    });
    Module["ccall"] = ccall;
    Module["allocate"] = allocate;
    var calledRun;
    function ExitStatus(status) {
      this.name = "ExitStatus";
      this.message = "Program terminated with exit(" + status + ")";
      this.status = status;
    }
    var calledMain = false;
    dependenciesFulfilled = function runCaller() {
      if (!calledRun) run();
      if (!calledRun) dependenciesFulfilled = runCaller;
    };
    function callMain(args) {
      var entryFunction = Module["_main"];
      if (!entryFunction) return;
      args = args || [];
      var argc = args.length + 1;
      var argv = stackAlloc((argc + 1) * 4);
      HEAP32[argv >> 2] = allocateUTF8OnStack(thisProgram);
      for (var i = 1; i < argc; i++) {
        HEAP32[(argv >> 2) + i] = allocateUTF8OnStack(args[i - 1]);
      }
      HEAP32[(argv >> 2) + argc] = 0;
      try {
        var ret = entryFunction(argc, argv);
        exit(ret, true);
        return ret;
      } catch (e) {
        return handleException(e);
      } finally {
        calledMain = true;
      }
    }
    var dylibsLoaded = false;
    function run(args) {
      args = args || arguments_;
      if (runDependencies > 0) {
        return;
      }
      if (!dylibsLoaded) {
        preloadDylibs();
        dylibsLoaded = true;
        if (runDependencies > 0) {
          return;
        }
      }
      preRun();
      if (runDependencies > 0) {
        return;
      }
      function doRun() {
        if (calledRun) return;
        calledRun = true;
        Module["calledRun"] = true;
        if (ABORT) return;
        initRuntime();
        preMain();
        readyPromiseResolve(Module);
        if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();
        if (shouldRunNow) callMain(args);
        postRun();
      }
      if (Module["setStatus"]) {
        Module["setStatus"]("Running...");
        setTimeout(function () {
          setTimeout(function () {
            Module["setStatus"]("");
          }, 1);
          doRun();
        }, 1);
      } else {
        doRun();
      }
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
    var shouldRunNow = true;
    if (Module["noInitialRun"]) shouldRunNow = false;
    run();

    return __INIT__.ready;
  };
})();
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cdl3Outside = exports.CDL3OUTSIDE = exports.cdl3LineStrike = exports.CDL3LINESTRIKE = exports.cdl3Inside = exports.CDL3INSIDE = exports.cdl3BlackCrows = exports.CDL3BLACKCROWS = exports.cdl2Crows = exports.CDL2CROWS = exports.cci = exports.CCI = exports.bop = exports.BOP = exports.beta = exports.BETA = exports.bbands = exports.BBANDS = exports.avgPrice = exports.AVGPRICE = exports.avgDev = exports.AVGDEV = exports.atr = exports.ATR = exports.atan = exports.ATAN = exports.asin = exports.ASIN = exports.aroonOsc = exports.AROONOSC = exports.aroon = exports.AROON = exports.apo = exports.APO = exports.adxr = exports.ADXR = exports.adx = exports.ADX = exports.adOsc = exports.ADOSC = exports.add = exports.ADD = exports.ad = exports.AD = exports.acos = exports.ACOS = exports.accBands = exports.ACCBANDS = exports.init = exports.MAType = void 0;
exports.cdlHikkakeMod = exports.CDLHIKKAKEMOD = exports.cdlHikkake = exports.CDLHIKKAKE = exports.cdlHignWave = exports.CDLHIGHWAVE = exports.cdlHaramiCross = exports.CDLHARAMICROSS = exports.cdlHarami = exports.CDLHARAMI = exports.cdlHangingMan = exports.CDLHANGINGMAN = exports.cdlHammer = exports.CDLHAMMER = exports.cdlGravestoneDoji = exports.CDLGRAVESTONEDOJI = exports.cdlGapSideSideWhite = exports.CDLGAPSIDESIDEWHITE = exports.cdlEveningStar = exports.CDLEVENINGSTAR = exports.cdlEveningDojiStar = exports.CDLEVENINGDOJISTAR = exports.cdlEngulfing = exports.CDLENGULFING = exports.cdlDragonflyDoji = exports.CDLDRAGONFLYDOJI = exports.cdlDojiStar = exports.CDLDOJISTAR = exports.cdlDoji = exports.CDLDOJI = exports.cdlDarkCloudCover = exports.CDLDARKCLOUDCOVER = exports.cdlCounterAttack = exports.CDLCOUNTERATTACK = exports.cdlConcealBabysWall = exports.CDLCONCEALBABYSWALL = exports.cdlClosingMarubozu = exports.CDLCLOSINGMARUBOZU = exports.cdlBreakaway = exports.CDLBREAKAWAY = exports.cdlBeltHold = exports.CDLBELTHOLD = exports.cdlAdvanceBlock = exports.CDLADVANCEBLOCK = exports.cdlAbandonedBaby = exports.CDLABANDONEDBABY = exports.cdl3WhiteSoldiers = exports.CDL3WHITESOLDIERS = exports.cdl3StarsInSouth = exports.CDL3STARSINSOUTH = void 0;
exports.cdlTakuri = exports.CDLTAKURI = exports.cdlStickSandwhich = exports.CDLSTICKSANDWICH = exports.cdlStalledPattern = exports.CDLSTALLEDPATTERN = exports.cdlSpinningTop = exports.CDLSPINNINGTOP = exports.cdlShortLine = exports.CDLSHORTLINE = exports.cdlShootingStar = exports.CDLSHOOTINGSTAR = exports.cdlSeperatingLines = exports.CDLSEPARATINGLINES = exports.cdlRiseFall3Methods = exports.CDLRISEFALL3METHODS = exports.cdlRickshawMan = exports.CDLRICKSHAWMAN = exports.cdlPiercing = exports.CDLPIERCING = exports.cdlOnNeck = exports.CDLONNECK = exports.cdlMorningStar = exports.CDLMORNINGSTAR = exports.cdlMorningDojiStar = exports.CDLMORNINGDOJISTAR = exports.cdlMatHold = exports.CDLMATHOLD = exports.cdlMatchingLow = exports.CDLMATCHINGLOW = exports.cdlMarubozu = exports.CDLMARUBOZU = exports.cdlLongLine = exports.CDLLONGLINE = exports.cdlLongLeggedDoji = exports.CDLLONGLEGGEDDOJI = exports.cdlLadderBottom = exports.CDLLADDERBOTTOM = exports.cdlKickingByLength = exports.CDLKICKINGBYLENGTH = exports.cdlKicking = exports.CDLKICKING = exports.cdlInvertedHammer = exports.CDLINVERTEDHAMMER = exports.cdlInNeck = exports.CDLINNECK = exports.cdlIdentical3Crows = exports.CDLIDENTICAL3CROWS = exports.cdlHomingPigeon = exports.CDLHOMINGPIGEON = void 0;
exports.kama = exports.KAMA = exports.imi = exports.IMI = exports.htTrendMode = exports.HT_TRENDMODE = exports.htTrendline = exports.HT_TRENDLINE = exports.htSine = exports.HT_SINE = exports.htPhasor = exports.HT_PHASOR = exports.htDcPhase = exports.HT_DCPHASE = exports.htDcPeriod = exports.HT_DCPERIOD = exports.floor = exports.FLOOR = exports.exp = exports.EXP = exports.ema = exports.EMA = exports.dx = exports.DX = exports.div = exports.DIV = exports.dema = exports.DEMA = exports.cosh = exports.COSH = exports.cos = exports.COS = exports.correl = exports.CORREL = exports.cmo = exports.CMO = exports.ceil = exports.CEIL = exports.cdlXSideGap3Methods = exports.CDLXSIDEGAP3METHODS = exports.cdlUpsideGap2Crows = exports.CDLUPSIDEGAP2CROWS = exports.cdlUnique3River = exports.CDLUNIQUE3RIVER = exports.cdlTristar = exports.CDLTRISTAR = exports.cdlThrusting = exports.CDLTHRUSTING = exports.cdlTasukiGap = exports.CDLTASUKIGAP = void 0;
exports.mom = exports.MOM = exports.minusDM = exports.MINUS_DM = exports.minusDI = exports.MINUS_DI = exports.minMaxIndex = exports.MINMAXINDEX = exports.minMax = exports.MINMAX = exports.minIndex = exports.MININDEX = exports.min = exports.MIN = exports.midPrice = exports.MIDPRICE = exports.midPoint = exports.MIDPOINT = exports.mfi = exports.MFI = exports.medPrice = exports.MEDPRICE = exports.maxIndex = exports.MAXINDEX = exports.max = exports.MAX = exports.movingAverageVariablePeriod = exports.MAVP = exports.mama = exports.MAMA = exports.macdFix = exports.MACDFIX = exports.macdExt = exports.MACDEXT = exports.macd = exports.MACD = exports.movingAverage = exports.MA = exports.log10 = exports.LOG10 = exports.ln = exports.LN = exports.linearRegSlope = exports.LINEARREG_SLOPE = exports.linearRegIntercept = exports.LINEARREG_INTERCEPT = exports.linearRegAngle = exports.LINEARREG_ANGLE = exports.linearReg = exports.LINEARREG = void 0;
exports.tan = exports.TAN = exports.t3 = exports.T3 = exports.sum = exports.SUM = exports.sub = exports.SUB = exports.stochRsi = exports.STOCHRSI = exports.stochF = exports.STOCHF = exports.stoch = exports.STOCH = exports.stdDev = exports.STDDEV = exports.sqrt = exports.SQRT = exports.sma = exports.SMA = exports.sinh = exports.SINH = exports.sin = exports.SIN = exports.sarExt = exports.SAREXT = exports.sar = exports.SAR = exports.rsi = exports.RSI = exports.rocR100 = exports.ROCR100 = exports.rocR = exports.ROCR = exports.rocP = exports.ROCP = exports.roc = exports.ROC = exports.ppo = exports.PPO = exports.plusDM = exports.PLUS_DM = exports.plusDI = exports.PLUS_DI = exports.obv = exports.OBV = exports.natr = exports.NATR = exports.mult = exports.MULT = void 0;
exports.TAFuncs = exports.wma = exports.WMA = exports.willR = exports.WILLR = exports.wclPrice = exports.WCLPRICE = exports.variance = exports.VAR = exports.ultOsc = exports.ULTOSC = exports.typPrice = exports.TYPPRICE = exports.tsf = exports.TSF = exports.trix = exports.TRIX = exports.trima = exports.TRIMA = exports.trueRange = exports.TRANGE = exports.tema = exports.TEMA = exports.tanh = exports.TANH = void 0;
const API = { "ACCBANDS": { "name": "ACCBANDS", "camelCaseName": "accBands", "group": "Overlap Studies", "description": "Acceleration Bands", "inputs": [{ "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 20, "hint": "Number of period", "type": "Integer", "range": { "min": 2, "max": 100000 } }], "outputs": [{ "name": "upperBand", "type": "Double[]", "plotHint": "limit_upper" }, { "name": "middleBand", "type": "Double[]", "plotHint": "line" }, { "name": "lowerBand", "type": "Double[]", "plotHint": "limit_lower" }] }, "ACOS": { "name": "ACOS", "camelCaseName": "acos", "group": "Math Transform", "description": "Vector Trigonometric ACos", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "AD": { "name": "AD", "camelCaseName": "ad", "group": "Volume Indicators", "description": "Chaikin A/D Line", "inputs": [{ "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }, { "name": "volume", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "ADD": { "name": "ADD", "camelCaseName": "add", "group": "Math Operators", "description": "Vector Arithmetic Add", "inputs": [{ "name": "inReal0", "type": "Double[]" }, { "name": "inReal1", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "ADOSC": { "name": "ADOSC", "camelCaseName": "adOsc", "group": "Volume Indicators", "description": "Chaikin A/D Oscillator", "inputs": [{ "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }, { "name": "volume", "type": "Double[]" }], "options": [{ "name": "fastPeriod", "displayName": "Fast Period", "defaultValue": 3, "hint": "Number of period for the fast MA", "type": "Integer", "range": { "min": 2, "max": 100000 } }, { "name": "slowPeriod", "displayName": "Slow Period", "defaultValue": 10, "hint": "Number of period for the slow MA", "type": "Integer", "range": { "min": 2, "max": 100000 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "ADX": { "name": "ADX", "camelCaseName": "adx", "group": "Momentum Indicators", "description": "Average Directional Movement Index", "inputs": [{ "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 14, "hint": "Number of period", "type": "Integer", "range": { "min": 2, "max": 100000 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "ADXR": { "name": "ADXR", "camelCaseName": "adxr", "group": "Momentum Indicators", "description": "Average Directional Movement Index Rating", "inputs": [{ "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 14, "hint": "Number of period", "type": "Integer", "range": { "min": 2, "max": 100000 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "APO": { "name": "APO", "camelCaseName": "apo", "group": "Momentum Indicators", "description": "Absolute Price Oscillator", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [{ "name": "fastPeriod", "displayName": "Fast Period", "defaultValue": 12, "hint": "Number of period for the fast MA", "type": "Integer", "range": { "min": 2, "max": 100000 } }, { "name": "slowPeriod", "displayName": "Slow Period", "defaultValue": 26, "hint": "Number of period for the slow MA", "type": "Integer", "range": { "min": 2, "max": 100000 } }, { "name": "MAType", "displayName": "MA Type", "defaultValue": 0, "hint": "Type of Moving Average", "type": "MAType" }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "AROON": { "name": "AROON", "camelCaseName": "aroon", "group": "Momentum Indicators", "description": "Aroon", "inputs": [{ "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 14, "hint": "Number of period", "type": "Integer", "range": { "min": 2, "max": 100000 } }], "outputs": [{ "name": "aroonDown", "type": "Double[]", "plotHint": "line_dash" }, { "name": "aroonUp", "type": "Double[]", "plotHint": "line" }] }, "AROONOSC": { "name": "AROONOSC", "camelCaseName": "aroonOsc", "group": "Momentum Indicators", "description": "Aroon Oscillator", "inputs": [{ "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 14, "hint": "Number of period", "type": "Integer", "range": { "min": 2, "max": 100000 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "ASIN": { "name": "ASIN", "camelCaseName": "asin", "group": "Math Transform", "description": "Vector Trigonometric ASin", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "ATAN": { "name": "ATAN", "camelCaseName": "atan", "group": "Math Transform", "description": "Vector Trigonometric ATan", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "ATR": { "name": "ATR", "camelCaseName": "atr", "group": "Volatility Indicators", "description": "Average True Range", "inputs": [{ "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 14, "hint": "Number of period", "type": "Integer", "range": { "min": 1, "max": 100000 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "AVGDEV": { "name": "AVGDEV", "camelCaseName": "avgDev", "group": "Price Transform", "description": "Average Deviation", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 14, "hint": "Number of period", "type": "Integer", "range": { "min": 2, "max": 100000 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "AVGPRICE": { "name": "AVGPRICE", "camelCaseName": "avgPrice", "group": "Price Transform", "description": "Average Price", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "BBANDS": { "name": "BBANDS", "camelCaseName": "bbands", "group": "Overlap Studies", "description": "Bollinger Bands", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 5, "hint": "Number of period", "type": "Integer", "range": { "min": 2, "max": 100000 } }, { "name": "nbDevUp", "displayName": "Deviations up", "defaultValue": 2, "hint": "Deviation multiplier for upper band", "type": "Double", "range": { "min": -3e+37, "max": 3e+37 } }, { "name": "nbDevDn", "displayName": "Deviations down", "defaultValue": 2, "hint": "Deviation multiplier for lower band", "type": "Double", "range": { "min": -3e+37, "max": 3e+37 } }, { "name": "MAType", "displayName": "MA Type", "defaultValue": 0, "hint": "Type of Moving Average", "type": "MAType" }], "outputs": [{ "name": "upperBand", "type": "Double[]", "plotHint": "limit_upper" }, { "name": "middleBand", "type": "Double[]", "plotHint": "line" }, { "name": "lowerBand", "type": "Double[]", "plotHint": "limit_lower" }] }, "BETA": { "name": "BETA", "camelCaseName": "beta", "group": "Statistic Functions", "description": "Beta", "inputs": [{ "name": "inReal0", "type": "Double[]" }, { "name": "inReal1", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 5, "hint": "Number of period", "type": "Integer", "range": { "min": 1, "max": 100000 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "BOP": { "name": "BOP", "camelCaseName": "bop", "group": "Momentum Indicators", "description": "Balance Of Power", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "CCI": { "name": "CCI", "camelCaseName": "cci", "group": "Momentum Indicators", "description": "Commodity Channel Index", "inputs": [{ "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 14, "hint": "Number of period", "type": "Integer", "range": { "min": 2, "max": 100000 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "CDL2CROWS": { "name": "CDL2CROWS", "camelCaseName": "cdl2Crows", "group": "Pattern Recognition", "description": "Two Crows", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDL3BLACKCROWS": { "name": "CDL3BLACKCROWS", "camelCaseName": "cdl3BlackCrows", "group": "Pattern Recognition", "description": "Three Black Crows", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDL3INSIDE": { "name": "CDL3INSIDE", "camelCaseName": "cdl3Inside", "group": "Pattern Recognition", "description": "Three Inside Up/Down", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDL3LINESTRIKE": { "name": "CDL3LINESTRIKE", "camelCaseName": "cdl3LineStrike", "group": "Pattern Recognition", "description": "Three-Line Strike ", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDL3OUTSIDE": { "name": "CDL3OUTSIDE", "camelCaseName": "cdl3Outside", "group": "Pattern Recognition", "description": "Three Outside Up/Down", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDL3STARSINSOUTH": { "name": "CDL3STARSINSOUTH", "camelCaseName": "cdl3StarsInSouth", "group": "Pattern Recognition", "description": "Three Stars In The South", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDL3WHITESOLDIERS": { "name": "CDL3WHITESOLDIERS", "camelCaseName": "cdl3WhiteSoldiers", "group": "Pattern Recognition", "description": "Three Advancing White Soldiers", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLABANDONEDBABY": { "name": "CDLABANDONEDBABY", "camelCaseName": "cdlAbandonedBaby", "group": "Pattern Recognition", "description": "Abandoned Baby", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [{ "name": "penetration", "displayName": "Penetration", "defaultValue": 0.3, "hint": "Percentage of penetration of a candle within another candle", "type": "Double", "range": { "min": 0, "max": 3e+37 } }], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLADVANCEBLOCK": { "name": "CDLADVANCEBLOCK", "camelCaseName": "cdlAdvanceBlock", "group": "Pattern Recognition", "description": "Advance Block", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLBELTHOLD": { "name": "CDLBELTHOLD", "camelCaseName": "cdlBeltHold", "group": "Pattern Recognition", "description": "Belt-hold", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLBREAKAWAY": { "name": "CDLBREAKAWAY", "camelCaseName": "cdlBreakaway", "group": "Pattern Recognition", "description": "Breakaway", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLCLOSINGMARUBOZU": { "name": "CDLCLOSINGMARUBOZU", "camelCaseName": "cdlClosingMarubozu", "group": "Pattern Recognition", "description": "Closing Marubozu", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLCONCEALBABYSWALL": { "name": "CDLCONCEALBABYSWALL", "camelCaseName": "cdlConcealBabysWall", "group": "Pattern Recognition", "description": "Concealing Baby Swallow", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLCOUNTERATTACK": { "name": "CDLCOUNTERATTACK", "camelCaseName": "cdlCounterAttack", "group": "Pattern Recognition", "description": "Counterattack", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLDARKCLOUDCOVER": { "name": "CDLDARKCLOUDCOVER", "camelCaseName": "cdlDarkCloudCover", "group": "Pattern Recognition", "description": "Dark Cloud Cover", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [{ "name": "penetration", "displayName": "Penetration", "defaultValue": 0.5, "hint": "Percentage of penetration of a candle within another candle", "type": "Double", "range": { "min": 0, "max": 3e+37 } }], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLDOJI": { "name": "CDLDOJI", "camelCaseName": "cdlDoji", "group": "Pattern Recognition", "description": "Doji", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLDOJISTAR": { "name": "CDLDOJISTAR", "camelCaseName": "cdlDojiStar", "group": "Pattern Recognition", "description": "Doji Star", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLDRAGONFLYDOJI": { "name": "CDLDRAGONFLYDOJI", "camelCaseName": "cdlDragonflyDoji", "group": "Pattern Recognition", "description": "Dragonfly Doji", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLENGULFING": { "name": "CDLENGULFING", "camelCaseName": "cdlEngulfing", "group": "Pattern Recognition", "description": "Engulfing Pattern", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLEVENINGDOJISTAR": { "name": "CDLEVENINGDOJISTAR", "camelCaseName": "cdlEveningDojiStar", "group": "Pattern Recognition", "description": "Evening Doji Star", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [{ "name": "penetration", "displayName": "Penetration", "defaultValue": 0.3, "hint": "Percentage of penetration of a candle within another candle", "type": "Double", "range": { "min": 0, "max": 3e+37 } }], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLEVENINGSTAR": { "name": "CDLEVENINGSTAR", "camelCaseName": "cdlEveningStar", "group": "Pattern Recognition", "description": "Evening Star", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [{ "name": "penetration", "displayName": "Penetration", "defaultValue": 0.3, "hint": "Percentage of penetration of a candle within another candle", "type": "Double", "range": { "min": 0, "max": 3e+37 } }], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLGAPSIDESIDEWHITE": { "name": "CDLGAPSIDESIDEWHITE", "camelCaseName": "cdlGapSideSideWhite", "group": "Pattern Recognition", "description": "Up/Down-gap side-by-side white lines", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLGRAVESTONEDOJI": { "name": "CDLGRAVESTONEDOJI", "camelCaseName": "cdlGravestoneDoji", "group": "Pattern Recognition", "description": "Gravestone Doji", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLHAMMER": { "name": "CDLHAMMER", "camelCaseName": "cdlHammer", "group": "Pattern Recognition", "description": "Hammer", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLHANGINGMAN": { "name": "CDLHANGINGMAN", "camelCaseName": "cdlHangingMan", "group": "Pattern Recognition", "description": "Hanging Man", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLHARAMI": { "name": "CDLHARAMI", "camelCaseName": "cdlHarami", "group": "Pattern Recognition", "description": "Harami Pattern", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLHARAMICROSS": { "name": "CDLHARAMICROSS", "camelCaseName": "cdlHaramiCross", "group": "Pattern Recognition", "description": "Harami Cross Pattern", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLHIGHWAVE": { "name": "CDLHIGHWAVE", "camelCaseName": "cdlHignWave", "group": "Pattern Recognition", "description": "High-Wave Candle", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLHIKKAKE": { "name": "CDLHIKKAKE", "camelCaseName": "cdlHikkake", "group": "Pattern Recognition", "description": "Hikkake Pattern", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLHIKKAKEMOD": { "name": "CDLHIKKAKEMOD", "camelCaseName": "cdlHikkakeMod", "group": "Pattern Recognition", "description": "Modified Hikkake Pattern", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLHOMINGPIGEON": { "name": "CDLHOMINGPIGEON", "camelCaseName": "cdlHomingPigeon", "group": "Pattern Recognition", "description": "Homing Pigeon", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLIDENTICAL3CROWS": { "name": "CDLIDENTICAL3CROWS", "camelCaseName": "cdlIdentical3Crows", "group": "Pattern Recognition", "description": "Identical Three Crows", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLINNECK": { "name": "CDLINNECK", "camelCaseName": "cdlInNeck", "group": "Pattern Recognition", "description": "In-Neck Pattern", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLINVERTEDHAMMER": { "name": "CDLINVERTEDHAMMER", "camelCaseName": "cdlInvertedHammer", "group": "Pattern Recognition", "description": "Inverted Hammer", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLKICKING": { "name": "CDLKICKING", "camelCaseName": "cdlKicking", "group": "Pattern Recognition", "description": "Kicking", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLKICKINGBYLENGTH": { "name": "CDLKICKINGBYLENGTH", "camelCaseName": "cdlKickingByLength", "group": "Pattern Recognition", "description": "Kicking - bull/bear determined by the longer marubozu", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLLADDERBOTTOM": { "name": "CDLLADDERBOTTOM", "camelCaseName": "cdlLadderBottom", "group": "Pattern Recognition", "description": "Ladder Bottom", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLLONGLEGGEDDOJI": { "name": "CDLLONGLEGGEDDOJI", "camelCaseName": "cdlLongLeggedDoji", "group": "Pattern Recognition", "description": "Long Legged Doji", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLLONGLINE": { "name": "CDLLONGLINE", "camelCaseName": "cdlLongLine", "group": "Pattern Recognition", "description": "Long Line Candle", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLMARUBOZU": { "name": "CDLMARUBOZU", "camelCaseName": "cdlMarubozu", "group": "Pattern Recognition", "description": "Marubozu", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLMATCHINGLOW": { "name": "CDLMATCHINGLOW", "camelCaseName": "cdlMatchingLow", "group": "Pattern Recognition", "description": "Matching Low", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLMATHOLD": { "name": "CDLMATHOLD", "camelCaseName": "cdlMatHold", "group": "Pattern Recognition", "description": "Mat Hold", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [{ "name": "penetration", "displayName": "Penetration", "defaultValue": 0.5, "hint": "Percentage of penetration of a candle within another candle", "type": "Double", "range": { "min": 0, "max": 3e+37 } }], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLMORNINGDOJISTAR": { "name": "CDLMORNINGDOJISTAR", "camelCaseName": "cdlMorningDojiStar", "group": "Pattern Recognition", "description": "Morning Doji Star", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [{ "name": "penetration", "displayName": "Penetration", "defaultValue": 0.3, "hint": "Percentage of penetration of a candle within another candle", "type": "Double", "range": { "min": 0, "max": 3e+37 } }], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLMORNINGSTAR": { "name": "CDLMORNINGSTAR", "camelCaseName": "cdlMorningStar", "group": "Pattern Recognition", "description": "Morning Star", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [{ "name": "penetration", "displayName": "Penetration", "defaultValue": 0.3, "hint": "Percentage of penetration of a candle within another candle", "type": "Double", "range": { "min": 0, "max": 3e+37 } }], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLONNECK": { "name": "CDLONNECK", "camelCaseName": "cdlOnNeck", "group": "Pattern Recognition", "description": "On-Neck Pattern", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLPIERCING": { "name": "CDLPIERCING", "camelCaseName": "cdlPiercing", "group": "Pattern Recognition", "description": "Piercing Pattern", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLRICKSHAWMAN": { "name": "CDLRICKSHAWMAN", "camelCaseName": "cdlRickshawMan", "group": "Pattern Recognition", "description": "Rickshaw Man", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLRISEFALL3METHODS": { "name": "CDLRISEFALL3METHODS", "camelCaseName": "cdlRiseFall3Methods", "group": "Pattern Recognition", "description": "Rising/Falling Three Methods", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLSEPARATINGLINES": { "name": "CDLSEPARATINGLINES", "camelCaseName": "cdlSeperatingLines", "group": "Pattern Recognition", "description": "Separating Lines", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLSHOOTINGSTAR": { "name": "CDLSHOOTINGSTAR", "camelCaseName": "cdlShootingStar", "group": "Pattern Recognition", "description": "Shooting Star", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLSHORTLINE": { "name": "CDLSHORTLINE", "camelCaseName": "cdlShortLine", "group": "Pattern Recognition", "description": "Short Line Candle", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLSPINNINGTOP": { "name": "CDLSPINNINGTOP", "camelCaseName": "cdlSpinningTop", "group": "Pattern Recognition", "description": "Spinning Top", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLSTALLEDPATTERN": { "name": "CDLSTALLEDPATTERN", "camelCaseName": "cdlStalledPattern", "group": "Pattern Recognition", "description": "Stalled Pattern", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLSTICKSANDWICH": { "name": "CDLSTICKSANDWICH", "camelCaseName": "cdlStickSandwhich", "group": "Pattern Recognition", "description": "Stick Sandwich", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLTAKURI": { "name": "CDLTAKURI", "camelCaseName": "cdlTakuri", "group": "Pattern Recognition", "description": "Takuri (Dragonfly Doji with very long lower shadow)", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLTASUKIGAP": { "name": "CDLTASUKIGAP", "camelCaseName": "cdlTasukiGap", "group": "Pattern Recognition", "description": "Tasuki Gap", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLTHRUSTING": { "name": "CDLTHRUSTING", "camelCaseName": "cdlThrusting", "group": "Pattern Recognition", "description": "Thrusting Pattern", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLTRISTAR": { "name": "CDLTRISTAR", "camelCaseName": "cdlTristar", "group": "Pattern Recognition", "description": "Tristar Pattern", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLUNIQUE3RIVER": { "name": "CDLUNIQUE3RIVER", "camelCaseName": "cdlUnique3River", "group": "Pattern Recognition", "description": "Unique 3 River", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLUPSIDEGAP2CROWS": { "name": "CDLUPSIDEGAP2CROWS", "camelCaseName": "cdlUpsideGap2Crows", "group": "Pattern Recognition", "description": "Upside Gap Two Crows", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CDLXSIDEGAP3METHODS": { "name": "CDLXSIDEGAP3METHODS", "camelCaseName": "cdlXSideGap3Methods", "group": "Pattern Recognition", "description": "Upside/Downside Gap Three Methods", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "CEIL": { "name": "CEIL", "camelCaseName": "ceil", "group": "Math Transform", "description": "Vector Ceil", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "CMO": { "name": "CMO", "camelCaseName": "cmo", "group": "Momentum Indicators", "description": "Chande Momentum Oscillator", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 14, "hint": "Number of period", "type": "Integer", "range": { "min": 2, "max": 100000 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "CORREL": { "name": "CORREL", "camelCaseName": "correl", "group": "Statistic Functions", "description": "Pearson's Correlation Coefficient (r)", "inputs": [{ "name": "inReal0", "type": "Double[]" }, { "name": "inReal1", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 30, "hint": "Number of period", "type": "Integer", "range": { "min": 1, "max": 100000 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "COS": { "name": "COS", "camelCaseName": "cos", "group": "Math Transform", "description": "Vector Trigonometric Cos", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "COSH": { "name": "COSH", "camelCaseName": "cosh", "group": "Math Transform", "description": "Vector Trigonometric Cosh", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "DEMA": { "name": "DEMA", "camelCaseName": "dema", "group": "Overlap Studies", "description": "Double Exponential Moving Average", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 30, "hint": "Number of period", "type": "Integer", "range": { "min": 2, "max": 100000 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "DIV": { "name": "DIV", "camelCaseName": "div", "group": "Math Operators", "description": "Vector Arithmetic Div", "inputs": [{ "name": "inReal0", "type": "Double[]" }, { "name": "inReal1", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "DX": { "name": "DX", "camelCaseName": "dx", "group": "Momentum Indicators", "description": "Directional Movement Index", "inputs": [{ "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 14, "hint": "Number of period", "type": "Integer", "range": { "min": 2, "max": 100000 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "EMA": { "name": "EMA", "camelCaseName": "ema", "group": "Overlap Studies", "description": "Exponential Moving Average", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 30, "hint": "Number of period", "type": "Integer", "range": { "min": 2, "max": 100000 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "EXP": { "name": "EXP", "camelCaseName": "exp", "group": "Math Transform", "description": "Vector Arithmetic Exp", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "FLOOR": { "name": "FLOOR", "camelCaseName": "floor", "group": "Math Transform", "description": "Vector Floor", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "HT_DCPERIOD": { "name": "HT_DCPERIOD", "camelCaseName": "htDcPeriod", "group": "Cycle Indicators", "description": "Hilbert Transform - Dominant Cycle Period", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "HT_DCPHASE": { "name": "HT_DCPHASE", "camelCaseName": "htDcPhase", "group": "Cycle Indicators", "description": "Hilbert Transform - Dominant Cycle Phase", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "HT_PHASOR": { "name": "HT_PHASOR", "camelCaseName": "htPhasor", "group": "Cycle Indicators", "description": "Hilbert Transform - Phasor Components", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [], "outputs": [{ "name": "inPhase", "type": "Double[]", "plotHint": "line" }, { "name": "quadrature", "type": "Double[]", "plotHint": "line_dash" }] }, "HT_SINE": { "name": "HT_SINE", "camelCaseName": "htSine", "group": "Cycle Indicators", "description": "Hilbert Transform - SineWave", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [], "outputs": [{ "name": "sine", "type": "Double[]", "plotHint": "line" }, { "name": "leadSine", "type": "Double[]", "plotHint": "line_dash" }] }, "HT_TRENDLINE": { "name": "HT_TRENDLINE", "camelCaseName": "htTrendline", "group": "Overlap Studies", "description": "Hilbert Transform - Instantaneous Trendline", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "HT_TRENDMODE": { "name": "HT_TRENDMODE", "camelCaseName": "htTrendMode", "group": "Cycle Indicators", "description": "Hilbert Transform - Trend vs Cycle Mode", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "IMI": { "name": "IMI", "camelCaseName": "imi", "group": "Momentum Indicators", "description": "Intraday Momentum Index", "inputs": [{ "name": "open", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 14, "hint": "Number of period", "type": "Integer", "range": { "min": 2, "max": 100000 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "KAMA": { "name": "KAMA", "camelCaseName": "kama", "group": "Overlap Studies", "description": "Kaufman Adaptive Moving Average", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 30, "hint": "Number of period", "type": "Integer", "range": { "min": 2, "max": 100000 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "LINEARREG": { "name": "LINEARREG", "camelCaseName": "linearReg", "group": "Statistic Functions", "description": "Linear Regression", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 14, "hint": "Number of period", "type": "Integer", "range": { "min": 2, "max": 100000 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "LINEARREG_ANGLE": { "name": "LINEARREG_ANGLE", "camelCaseName": "linearRegAngle", "group": "Statistic Functions", "description": "Linear Regression Angle", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 14, "hint": "Number of period", "type": "Integer", "range": { "min": 2, "max": 100000 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "LINEARREG_INTERCEPT": { "name": "LINEARREG_INTERCEPT", "camelCaseName": "linearRegIntercept", "group": "Statistic Functions", "description": "Linear Regression Intercept", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 14, "hint": "Number of period", "type": "Integer", "range": { "min": 2, "max": 100000 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "LINEARREG_SLOPE": { "name": "LINEARREG_SLOPE", "camelCaseName": "linearRegSlope", "group": "Statistic Functions", "description": "Linear Regression Slope", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 14, "hint": "Number of period", "type": "Integer", "range": { "min": 2, "max": 100000 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "LN": { "name": "LN", "camelCaseName": "ln", "group": "Math Transform", "description": "Vector Log Natural", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "LOG10": { "name": "LOG10", "camelCaseName": "log10", "group": "Math Transform", "description": "Vector Log10", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "MA": { "name": "MA", "camelCaseName": "movingAverage", "group": "Overlap Studies", "description": "Moving average", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 30, "hint": "Number of period", "type": "Integer", "range": { "min": 1, "max": 100000 } }, { "name": "MAType", "displayName": "MA Type", "defaultValue": 0, "hint": "Type of Moving Average", "type": "MAType" }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "MACD": { "name": "MACD", "camelCaseName": "macd", "group": "Momentum Indicators", "description": "Moving Average Convergence/Divergence", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [{ "name": "fastPeriod", "displayName": "Fast Period", "defaultValue": 12, "hint": "Number of period for the fast MA", "type": "Integer", "range": { "min": 2, "max": 100000 } }, { "name": "slowPeriod", "displayName": "Slow Period", "defaultValue": 26, "hint": "Number of period for the slow MA", "type": "Integer", "range": { "min": 2, "max": 100000 } }, { "name": "signalPeriod", "displayName": "Signal Period", "defaultValue": 9, "hint": "Smoothing for the signal line (nb of period)", "type": "Integer", "range": { "min": 1, "max": 100000 } }], "outputs": [{ "name": "MACD", "type": "Double[]", "plotHint": "line" }, { "name": "MACDSignal", "type": "Double[]", "plotHint": "line_dash" }, { "name": "MACDHist", "type": "Double[]", "plotHint": "histogram" }] }, "MACDEXT": { "name": "MACDEXT", "camelCaseName": "macdExt", "group": "Momentum Indicators", "description": "MACD with controllable MA type", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [{ "name": "fastPeriod", "displayName": "Fast Period", "defaultValue": 12, "hint": "Number of period for the fast MA", "type": "Integer", "range": { "min": 2, "max": 100000 } }, { "name": "fastMAType", "displayName": "Fast MA", "defaultValue": 0, "hint": "Type of Moving Average for fast MA", "type": "MAType" }, { "name": "slowPeriod", "displayName": "Slow Period", "defaultValue": 26, "hint": "Number of period for the slow MA", "type": "Integer", "range": { "min": 2, "max": 100000 } }, { "name": "slowMAType", "displayName": "Slow MA", "defaultValue": 0, "hint": "Type of Moving Average for slow MA", "type": "MAType" }, { "name": "signalPeriod", "displayName": "Signal Period", "defaultValue": 9, "hint": "Smoothing for the signal line (nb of period)", "type": "Integer", "range": { "min": 1, "max": 100000 } }, { "name": "signalMAType", "displayName": "Signal MA", "defaultValue": 0, "hint": "Type of Moving Average for signal line", "type": "MAType" }], "outputs": [{ "name": "MACD", "type": "Double[]", "plotHint": "line" }, { "name": "MACDSignal", "type": "Double[]", "plotHint": "line_dash" }, { "name": "MACDHist", "type": "Double[]", "plotHint": "histogram" }] }, "MACDFIX": { "name": "MACDFIX", "camelCaseName": "macdFix", "group": "Momentum Indicators", "description": "Moving Average Convergence/Divergence Fix 12/26", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [{ "name": "signalPeriod", "displayName": "Signal Period", "defaultValue": 9, "hint": "Smoothing for the signal line (nb of period)", "type": "Integer", "range": { "min": 1, "max": 100000 } }], "outputs": [{ "name": "MACD", "type": "Double[]", "plotHint": "line" }, { "name": "MACDSignal", "type": "Double[]", "plotHint": "line_dash" }, { "name": "MACDHist", "type": "Double[]", "plotHint": "histogram" }] }, "MAMA": { "name": "MAMA", "camelCaseName": "mama", "group": "Overlap Studies", "description": "MESA Adaptive Moving Average", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [{ "name": "fastLimit", "displayName": "Fast Limit", "defaultValue": 0.5, "hint": "Upper limit use in the adaptive algorithm", "type": "Double", "range": { "min": 0.01, "max": 0.99 } }, { "name": "slowLimit", "displayName": "Slow Limit", "defaultValue": 0.05, "hint": "Lower limit use in the adaptive algorithm", "type": "Double", "range": { "min": 0.01, "max": 0.99 } }], "outputs": [{ "name": "MAMA", "type": "Double[]", "plotHint": "line" }, { "name": "FAMA", "type": "Double[]", "plotHint": "line_dash" }] }, "MAVP": { "name": "MAVP", "camelCaseName": "movingAverageVariablePeriod", "group": "Overlap Studies", "description": "Moving average with variable period", "inputs": [{ "name": "inReal", "type": "Double[]" }, { "name": "inPeriods", "type": "Double[]" }], "options": [{ "name": "minPeriod", "displayName": "Minimum Period", "defaultValue": 2, "hint": "Value less than minimum will be changed to Minimum period", "type": "Integer", "range": { "min": 2, "max": 100000 } }, { "name": "maxPeriod", "displayName": "Maximum Period", "defaultValue": 30, "hint": "Value higher than maximum will be changed to Maximum period", "type": "Integer", "range": { "min": 2, "max": 100000 } }, { "name": "MAType", "displayName": "MA Type", "defaultValue": 0, "hint": "Type of Moving Average", "type": "MAType" }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "MAX": { "name": "MAX", "camelCaseName": "max", "group": "Math Operators", "description": "Highest value over a specified period", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 30, "hint": "Number of period", "type": "Integer", "range": { "min": 2, "max": 100000 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "MAXINDEX": { "name": "MAXINDEX", "camelCaseName": "maxIndex", "group": "Math Operators", "description": "Index of highest value over a specified period", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 30, "hint": "Number of period", "type": "Integer", "range": { "min": 2, "max": 100000 } }], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "MEDPRICE": { "name": "MEDPRICE", "camelCaseName": "medPrice", "group": "Price Transform", "description": "Median Price", "inputs": [{ "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "MFI": { "name": "MFI", "camelCaseName": "mfi", "group": "Momentum Indicators", "description": "Money Flow Index", "inputs": [{ "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }, { "name": "volume", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 14, "hint": "Number of period", "type": "Integer", "range": { "min": 2, "max": 100000 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "MIDPOINT": { "name": "MIDPOINT", "camelCaseName": "midPoint", "group": "Overlap Studies", "description": "MidPoint over period", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 14, "hint": "Number of period", "type": "Integer", "range": { "min": 2, "max": 100000 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "MIDPRICE": { "name": "MIDPRICE", "camelCaseName": "midPrice", "group": "Overlap Studies", "description": "Midpoint Price over period", "inputs": [{ "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 14, "hint": "Number of period", "type": "Integer", "range": { "min": 2, "max": 100000 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "MIN": { "name": "MIN", "camelCaseName": "min", "group": "Math Operators", "description": "Lowest value over a specified period", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 30, "hint": "Number of period", "type": "Integer", "range": { "min": 2, "max": 100000 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "MININDEX": { "name": "MININDEX", "camelCaseName": "minIndex", "group": "Math Operators", "description": "Index of lowest value over a specified period", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 30, "hint": "Number of period", "type": "Integer", "range": { "min": 2, "max": 100000 } }], "outputs": [{ "name": "output", "type": "Integer[]", "plotHint": "line" }] }, "MINMAX": { "name": "MINMAX", "camelCaseName": "minMax", "group": "Math Operators", "description": "Lowest and highest values over a specified period", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 30, "hint": "Number of period", "type": "Integer", "range": { "min": 2, "max": 100000 } }], "outputs": [{ "name": "min", "type": "Double[]", "plotHint": "line" }, { "name": "max", "type": "Double[]", "plotHint": "line" }] }, "MINMAXINDEX": { "name": "MINMAXINDEX", "camelCaseName": "minMaxIndex", "group": "Math Operators", "description": "Indexes of lowest and highest values over a specified period", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 30, "hint": "Number of period", "type": "Integer", "range": { "min": 2, "max": 100000 } }], "outputs": [{ "name": "minIdx", "type": "Integer[]", "plotHint": "line" }, { "name": "maxIdx", "type": "Integer[]", "plotHint": "line" }] }, "MINUS_DI": { "name": "MINUS_DI", "camelCaseName": "minusDI", "group": "Momentum Indicators", "description": "Minus Directional Indicator", "inputs": [{ "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 14, "hint": "Number of period", "type": "Integer", "range": { "min": 1, "max": 100000 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "MINUS_DM": { "name": "MINUS_DM", "camelCaseName": "minusDM", "group": "Momentum Indicators", "description": "Minus Directional Movement", "inputs": [{ "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 14, "hint": "Number of period", "type": "Integer", "range": { "min": 1, "max": 100000 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "MOM": { "name": "MOM", "camelCaseName": "mom", "group": "Momentum Indicators", "description": "Momentum", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 10, "hint": "Number of period", "type": "Integer", "range": { "min": 1, "max": 100000 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "MULT": { "name": "MULT", "camelCaseName": "mult", "group": "Math Operators", "description": "Vector Arithmetic Mult", "inputs": [{ "name": "inReal0", "type": "Double[]" }, { "name": "inReal1", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "NATR": { "name": "NATR", "camelCaseName": "natr", "group": "Volatility Indicators", "description": "Normalized Average True Range", "inputs": [{ "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 14, "hint": "Number of period", "type": "Integer", "range": { "min": 1, "max": 100000 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "OBV": { "name": "OBV", "camelCaseName": "obv", "group": "Volume Indicators", "description": "On Balance Volume", "inputs": [{ "name": "inReal", "type": "Double[]" }, { "name": "volume", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "PLUS_DI": { "name": "PLUS_DI", "camelCaseName": "plusDI", "group": "Momentum Indicators", "description": "Plus Directional Indicator", "inputs": [{ "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 14, "hint": "Number of period", "type": "Integer", "range": { "min": 1, "max": 100000 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "PLUS_DM": { "name": "PLUS_DM", "camelCaseName": "plusDM", "group": "Momentum Indicators", "description": "Plus Directional Movement", "inputs": [{ "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 14, "hint": "Number of period", "type": "Integer", "range": { "min": 1, "max": 100000 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "PPO": { "name": "PPO", "camelCaseName": "ppo", "group": "Momentum Indicators", "description": "Percentage Price Oscillator", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [{ "name": "fastPeriod", "displayName": "Fast Period", "defaultValue": 12, "hint": "Number of period for the fast MA", "type": "Integer", "range": { "min": 2, "max": 100000 } }, { "name": "slowPeriod", "displayName": "Slow Period", "defaultValue": 26, "hint": "Number of period for the slow MA", "type": "Integer", "range": { "min": 2, "max": 100000 } }, { "name": "MAType", "displayName": "MA Type", "defaultValue": 0, "hint": "Type of Moving Average", "type": "MAType" }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "ROC": { "name": "ROC", "camelCaseName": "roc", "group": "Momentum Indicators", "description": "Rate of change : ((price/prevPrice)-1)*100", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 10, "hint": "Number of period", "type": "Integer", "range": { "min": 1, "max": 100000 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "ROCP": { "name": "ROCP", "camelCaseName": "rocP", "group": "Momentum Indicators", "description": "Rate of change Percentage: (price-prevPrice)/prevPrice", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 10, "hint": "Number of period", "type": "Integer", "range": { "min": 1, "max": 100000 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "ROCR": { "name": "ROCR", "camelCaseName": "rocR", "group": "Momentum Indicators", "description": "Rate of change ratio: (price/prevPrice)", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 10, "hint": "Number of period", "type": "Integer", "range": { "min": 1, "max": 100000 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "ROCR100": { "name": "ROCR100", "camelCaseName": "rocR100", "group": "Momentum Indicators", "description": "Rate of change ratio 100 scale: (price/prevPrice)*100", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 10, "hint": "Number of period", "type": "Integer", "range": { "min": 1, "max": 100000 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "RSI": { "name": "RSI", "camelCaseName": "rsi", "group": "Momentum Indicators", "description": "Relative Strength Index", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 14, "hint": "Number of period", "type": "Integer", "range": { "min": 2, "max": 100000 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "SAR": { "name": "SAR", "camelCaseName": "sar", "group": "Overlap Studies", "description": "Parabolic SAR", "inputs": [{ "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }], "options": [{ "name": "acceleration", "displayName": "Acceleration Factor", "defaultValue": 0.02, "hint": "Acceleration Factor used up to the Maximum value", "type": "Double", "range": { "min": 0, "max": 3e+37 } }, { "name": "maximum", "displayName": "AF Maximum", "defaultValue": 0.2, "hint": "Acceleration Factor Maximum value", "type": "Double", "range": { "min": 0, "max": 3e+37 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "SAREXT": { "name": "SAREXT", "camelCaseName": "sarExt", "group": "Overlap Studies", "description": "Parabolic SAR - Extended", "inputs": [{ "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }], "options": [{ "name": "startValue", "displayName": "Start Value", "defaultValue": 0, "hint": "Start value and direction. 0 for Auto, >0 for Long, <0 for Short", "type": "Double", "range": { "min": -3e+37, "max": 3e+37 } }, { "name": "offsetOnReverse", "displayName": "Offset on Reverse", "defaultValue": 0, "hint": "Percent offset added/removed to initial stop on short/long reversal", "type": "Double", "range": { "min": 0, "max": 3e+37 } }, { "name": "accelerationInitLong", "displayName": "AF Init Long", "defaultValue": 0.02, "hint": "Acceleration Factor initial value for the Long direction", "type": "Double", "range": { "min": 0, "max": 3e+37 } }, { "name": "accelerationLong", "displayName": "AF Long", "defaultValue": 0.02, "hint": "Acceleration Factor for the Long direction", "type": "Double", "range": { "min": 0, "max": 3e+37 } }, { "name": "accelerationMaxLong", "displayName": "AF Max Long", "defaultValue": 0.2, "hint": "Acceleration Factor maximum value for the Long direction", "type": "Double", "range": { "min": 0, "max": 3e+37 } }, { "name": "accelerationInitShort", "displayName": "AF Init Short", "defaultValue": 0.02, "hint": "Acceleration Factor initial value for the Short direction", "type": "Double", "range": { "min": 0, "max": 3e+37 } }, { "name": "accelerationShort", "displayName": "AF Short", "defaultValue": 0.02, "hint": "Acceleration Factor for the Short direction", "type": "Double", "range": { "min": 0, "max": 3e+37 } }, { "name": "accelerationMaxShort", "displayName": "AF Max Short", "defaultValue": 0.2, "hint": "Acceleration Factor maximum value for the Short direction", "type": "Double", "range": { "min": 0, "max": 3e+37 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "SIN": { "name": "SIN", "camelCaseName": "sin", "group": "Math Transform", "description": "Vector Trigonometric Sin", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "SINH": { "name": "SINH", "camelCaseName": "sinh", "group": "Math Transform", "description": "Vector Trigonometric Sinh", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "SMA": { "name": "SMA", "camelCaseName": "sma", "group": "Overlap Studies", "description": "Simple Moving Average", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 30, "hint": "Number of period", "type": "Integer", "range": { "min": 2, "max": 100000 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "SQRT": { "name": "SQRT", "camelCaseName": "sqrt", "group": "Math Transform", "description": "Vector Square Root", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "STDDEV": { "name": "STDDEV", "camelCaseName": "stdDev", "group": "Statistic Functions", "description": "Standard Deviation", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 5, "hint": "Number of period", "type": "Integer", "range": { "min": 2, "max": 100000 } }, { "name": "nbDev", "displayName": "Deviations", "defaultValue": 1, "hint": "Nb of deviations", "type": "Double", "range": { "min": -3e+37, "max": 3e+37 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "STOCH": { "name": "STOCH", "camelCaseName": "stoch", "group": "Momentum Indicators", "description": "Stochastic", "inputs": [{ "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [{ "name": "fastK_Period", "displayName": "Fast-K Period", "defaultValue": 5, "hint": "Time period for building the Fast-K line", "type": "Integer", "range": { "min": 1, "max": 100000 } }, { "name": "slowK_Period", "displayName": "Slow-K Period", "defaultValue": 3, "hint": "Smoothing for making the Slow-K line. Usually set to 3", "type": "Integer", "range": { "min": 1, "max": 100000 } }, { "name": "slowK_MAType", "displayName": "Slow-K MA", "defaultValue": 0, "hint": "Type of Moving Average for Slow-K", "type": "MAType" }, { "name": "slowD_Period", "displayName": "Slow-D Period", "defaultValue": 3, "hint": "Smoothing for making the Slow-D line", "type": "Integer", "range": { "min": 1, "max": 100000 } }, { "name": "slowD_MAType", "displayName": "Slow-D MA", "defaultValue": 0, "hint": "Type of Moving Average for Slow-D", "type": "MAType" }], "outputs": [{ "name": "slowK", "type": "Double[]", "plotHint": "line_dash" }, { "name": "slowD", "type": "Double[]", "plotHint": "line_dash" }] }, "STOCHF": { "name": "STOCHF", "camelCaseName": "stochF", "group": "Momentum Indicators", "description": "Stochastic Fast", "inputs": [{ "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [{ "name": "fastK_Period", "displayName": "Fast-K Period", "defaultValue": 5, "hint": "Time period for building the Fast-K line", "type": "Integer", "range": { "min": 1, "max": 100000 } }, { "name": "fastD_Period", "displayName": "Fast-D Period", "defaultValue": 3, "hint": "Smoothing for making the Fast-D line. Usually set to 3", "type": "Integer", "range": { "min": 1, "max": 100000 } }, { "name": "fastD_MAType", "displayName": "Fast-D MA", "defaultValue": 0, "hint": "Type of Moving Average for Fast-D", "type": "MAType" }], "outputs": [{ "name": "fastK", "type": "Double[]", "plotHint": "line" }, { "name": "fastD", "type": "Double[]", "plotHint": "line" }] }, "STOCHRSI": { "name": "STOCHRSI", "camelCaseName": "stochRsi", "group": "Momentum Indicators", "description": "Stochastic Relative Strength Index", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 14, "hint": "Number of period", "type": "Integer", "range": { "min": 2, "max": 100000 } }, { "name": "fastK_Period", "displayName": "Fast-K Period", "defaultValue": 5, "hint": "Time period for building the Fast-K line", "type": "Integer", "range": { "min": 1, "max": 100000 } }, { "name": "fastD_Period", "displayName": "Fast-D Period", "defaultValue": 3, "hint": "Smoothing for making the Fast-D line. Usually set to 3", "type": "Integer", "range": { "min": 1, "max": 100000 } }, { "name": "fastD_MAType", "displayName": "Fast-D MA", "defaultValue": 0, "hint": "Type of Moving Average for Fast-D", "type": "MAType" }], "outputs": [{ "name": "fastK", "type": "Double[]", "plotHint": "line" }, { "name": "fastD", "type": "Double[]", "plotHint": "line" }] }, "SUB": { "name": "SUB", "camelCaseName": "sub", "group": "Math Operators", "description": "Vector Arithmetic Substraction", "inputs": [{ "name": "inReal0", "type": "Double[]" }, { "name": "inReal1", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "SUM": { "name": "SUM", "camelCaseName": "sum", "group": "Math Operators", "description": "Summation", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 30, "hint": "Number of period", "type": "Integer", "range": { "min": 2, "max": 100000 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "T3": { "name": "T3", "camelCaseName": "t3", "group": "Overlap Studies", "description": "Triple Exponential Moving Average (T3)", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 5, "hint": "Number of period", "type": "Integer", "range": { "min": 2, "max": 100000 } }, { "name": "VFactor", "displayName": "Volume Factor", "defaultValue": 0.7, "hint": "Volume Factor", "type": "Double", "range": { "min": 0, "max": 1 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "TAN": { "name": "TAN", "camelCaseName": "tan", "group": "Math Transform", "description": "Vector Trigonometric Tan", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "TANH": { "name": "TANH", "camelCaseName": "tanh", "group": "Math Transform", "description": "Vector Trigonometric Tanh", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "TEMA": { "name": "TEMA", "camelCaseName": "tema", "group": "Overlap Studies", "description": "Triple Exponential Moving Average", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 30, "hint": "Number of period", "type": "Integer", "range": { "min": 2, "max": 100000 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "TRANGE": { "name": "TRANGE", "camelCaseName": "trueRange", "group": "Volatility Indicators", "description": "True Range", "inputs": [{ "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "TRIMA": { "name": "TRIMA", "camelCaseName": "trima", "group": "Overlap Studies", "description": "Triangular Moving Average", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 30, "hint": "Number of period", "type": "Integer", "range": { "min": 2, "max": 100000 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "TRIX": { "name": "TRIX", "camelCaseName": "trix", "group": "Momentum Indicators", "description": "1-day Rate-Of-Change (ROC) of a Triple Smooth EMA", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 30, "hint": "Number of period", "type": "Integer", "range": { "min": 1, "max": 100000 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "TSF": { "name": "TSF", "camelCaseName": "tsf", "group": "Statistic Functions", "description": "Time Series Forecast", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 14, "hint": "Number of period", "type": "Integer", "range": { "min": 2, "max": 100000 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "TYPPRICE": { "name": "TYPPRICE", "camelCaseName": "typPrice", "group": "Price Transform", "description": "Typical Price", "inputs": [{ "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "ULTOSC": { "name": "ULTOSC", "camelCaseName": "ultOsc", "group": "Momentum Indicators", "description": "Ultimate Oscillator", "inputs": [{ "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [{ "name": "timePeriod1", "displayName": "First Period", "defaultValue": 7, "hint": "Number of bars for 1st period.", "type": "Integer", "range": { "min": 1, "max": 100000 } }, { "name": "timePeriod2", "displayName": "Second Period", "defaultValue": 14, "hint": "Number of bars fro 2nd period", "type": "Integer", "range": { "min": 1, "max": 100000 } }, { "name": "timePeriod3", "displayName": "Third Period", "defaultValue": 28, "hint": "Number of bars for 3rd period", "type": "Integer", "range": { "min": 1, "max": 100000 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "VAR": { "name": "VAR", "camelCaseName": "variance", "group": "Statistic Functions", "description": "Variance", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 5, "hint": "Number of period", "type": "Integer", "range": { "min": 1, "max": 100000 } }, { "name": "nbDev", "displayName": "Deviations", "defaultValue": 1, "hint": "Nb of deviations", "type": "Double", "range": { "min": -3e+37, "max": 3e+37 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "WCLPRICE": { "name": "WCLPRICE", "camelCaseName": "wclPrice", "group": "Price Transform", "description": "Weighted Close Price", "inputs": [{ "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "WILLR": { "name": "WILLR", "camelCaseName": "willR", "group": "Momentum Indicators", "description": "Williams' %R", "inputs": [{ "name": "high", "type": "Double[]" }, { "name": "low", "type": "Double[]" }, { "name": "close", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 14, "hint": "Number of period", "type": "Integer", "range": { "min": 2, "max": 100000 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] }, "WMA": { "name": "WMA", "camelCaseName": "wma", "group": "Overlap Studies", "description": "Weighted Moving Average", "inputs": [{ "name": "inReal", "type": "Double[]" }], "options": [{ "name": "timePeriod", "displayName": "Time Period", "defaultValue": 30, "hint": "Number of period", "type": "Integer", "range": { "min": 2, "max": 100000 } }], "outputs": [{ "name": "output", "type": "Double[]", "plotHint": "line" }] } };
var __INIT__ = __INIT__;
let TA_WASM;
function cArray(Module, size) {
    const offset = Module._malloc(size * 8);
    Module.HEAPF64.set(new Float64Array(size), offset / 8);
    return {
        data: Module.HEAPF64.subarray(offset / 8, offset / 8 + size),
        offset: offset,
    };
}
const TA_RET_CODE = {
    0: 'TA_SUCCESS',
    1: 'TA_LIB_NOT_INITIALIZE',
    2: 'TA_BAD_PARAM',
    3: 'TA_ALLOC_ERR',
    4: 'TA_GROUP_NOT_FOUND',
    5: 'TA_FUNC_NOT_FOUND',
    6: 'TA_INVALID_HANDLE',
    7: 'TA_INVALID_PARAM_HOLDER',
    8: 'TA_INVALID_PARAM_HOLDER_TYPE',
    9: 'TA_INVALID_PARAM_FUNCTION',
    10: 'TA_INPUT_NOT_ALL_INITIALIZE',
    11: 'TA_OUTPUT_NOT_ALL_INITIALIZE',
    12: 'TA_OUT_OF_RANGE_START_INDEX',
    13: 'TA_OUT_OF_RANGE_END_INDEX',
    14: 'TA_INVALID_LIST_TYPE',
    15: 'TA_BAD_OBJECT',
    16: 'TA_NOT_SUPPORTED',
    5000: 'TA_INTERNAL_ERROR',
    [0xffff]: 'TA_UNKNOWN_ERR',
};
function callFunc(api, params) {
    const funcIdent = `TA_${api.name}`;
    if (!TA_WASM)
        throw Error(`${api.name}() called before initialization.`);
    const ccallArgsLen = 2 +
        api.inputs.length +
        api.options.length +
        2 +
        api.outputs.length;
    const argTypesToCcall = new Array(ccallArgsLen).fill('number');
    for (const { name } of api.inputs) {
        if (!Array.isArray(params[name])) {
            if (params[name] === undefined)
                throw Error(`Bad Param: "${name}" is required`);
            throw Error(`Bad Param: "${name}" should be array of number`);
        }
    }
    for (const { name, defaultValue, range } of api.options) {
        if (params[name] === undefined) {
            params[name] = defaultValue;
        }
        else if (range &&
            (params[name] < range.min || params[name] > range.max)) {
            throw Error(`Bad Param: "${name}" out of range (min: ${range.min}, max: ${range.max})`);
        }
    }
    let { startIdx, endIdx } = params;
    if (startIdx === undefined)
        startIdx = 0;
    const reqParamsLen = api.inputs.map(({ name }) => params[name].length);
    if (endIdx === undefined) {
        endIdx = Math.min(...reqParamsLen);
    }
    const argsToCcall = [startIdx, endIdx];
    const arraysToRelease = [];
    api.inputs.forEach(({ name }) => {
        const argArray = cArray(TA_WASM, endIdx - startIdx);
        const paramArray = params[name];
        for (const i in paramArray)
            argArray.data[i] = paramArray[i];
        arraysToRelease.push(argArray);
        argsToCcall.push(argArray.offset);
    });
    api.options.forEach(({ name }) => argsToCcall.push(params[name]));
    argsToCcall.push(0);
    argsToCcall.push(0);
    const outputs = api.outputs.map(({ name }) => {
        const argArray = cArray(TA_WASM, endIdx - startIdx);
        arraysToRelease.push(argArray);
        argsToCcall.push(argArray.offset);
        return { name, array: argArray };
    });
    const retCode = TA_WASM.ccall(funcIdent, 'number', argTypesToCcall, argsToCcall);
    arraysToRelease.forEach((arr) => TA_WASM._free(arr.offset));
    const result = outputs.reduce((result, current) => {
        result[current.name] = Array.from(current.array.data);
        return result;
    }, {});
    if (retCode === 0) {
        return result;
    }
    else {
        throw Error('[C_ERROR] ' + TA_RET_CODE[retCode]);
    }
}
var MAType;
(function (MAType) {
    MAType[MAType["SMA"] = 0] = "SMA";
    MAType[MAType["EMA"] = 1] = "EMA";
    MAType[MAType["WMA"] = 2] = "WMA";
    MAType[MAType["DEMA"] = 3] = "DEMA";
    MAType[MAType["TEMA"] = 4] = "TEMA";
    MAType[MAType["TRIMA"] = 5] = "TRIMA";
    MAType[MAType["KAMA"] = 6] = "KAMA";
    MAType[MAType["MAMA"] = 7] = "MAMA";
    MAType[MAType["T3"] = 8] = "T3";
})(MAType = exports.MAType || (exports.MAType = {}));
function init(wasmBinaryFilePath) {
    if (TA_WASM)
        return Promise.resolve(TA_WASM);
    if (wasmBinaryFilePath && typeof wasmBinaryFilePath !== 'string') {
        return Promise.reject(new Error('Invalid argument, "init(wasmBinaryFilePath)" expects a string that specifies the location of wasm binary file'));
    }
    const locateFile = wasmBinaryFilePath ? () => wasmBinaryFilePath : undefined;
    return __INIT__({ locateFile })
        .then((Module) => (TA_WASM = Module))
        .catch((e) => {
        let message = 'TA-Lib WASM runtime init fail.';
        if (e && e.message) {
            message += '\nError: \n' + e.message;
        }
        else {
            message +=
                'Unknown reason. Perhaps you specify the wrong file path to wasm binary?';
        }
        throw new Error(message);
    });
}
exports.init = init;
let __ACCBANDS_API__ = API['ACCBANDS'];
function ACCBANDS(params) {
    return callFunc(__ACCBANDS_API__, params);
}
exports.ACCBANDS = ACCBANDS;
exports.accBands = ACCBANDS;
let __ACOS_API__ = API['ACOS'];
function ACOS(params) {
    return callFunc(__ACOS_API__, params);
}
exports.ACOS = ACOS;
exports.acos = ACOS;
let __AD_API__ = API['AD'];
function AD(params) {
    return callFunc(__AD_API__, params);
}
exports.AD = AD;
exports.ad = AD;
let __ADD_API__ = API['ADD'];
function ADD(params) {
    return callFunc(__ADD_API__, params);
}
exports.ADD = ADD;
exports.add = ADD;
let __ADOSC_API__ = API['ADOSC'];
function ADOSC(params) {
    return callFunc(__ADOSC_API__, params);
}
exports.ADOSC = ADOSC;
exports.adOsc = ADOSC;
let __ADX_API__ = API['ADX'];
function ADX(params) {
    return callFunc(__ADX_API__, params);
}
exports.ADX = ADX;
exports.adx = ADX;
let __ADXR_API__ = API['ADXR'];
function ADXR(params) {
    return callFunc(__ADXR_API__, params);
}
exports.ADXR = ADXR;
exports.adxr = ADXR;
let __APO_API__ = API['APO'];
function APO(params) {
    return callFunc(__APO_API__, params);
}
exports.APO = APO;
exports.apo = APO;
let __AROON_API__ = API['AROON'];
function AROON(params) {
    return callFunc(__AROON_API__, params);
}
exports.AROON = AROON;
exports.aroon = AROON;
let __AROONOSC_API__ = API['AROONOSC'];
function AROONOSC(params) {
    return callFunc(__AROONOSC_API__, params);
}
exports.AROONOSC = AROONOSC;
exports.aroonOsc = AROONOSC;
let __ASIN_API__ = API['ASIN'];
function ASIN(params) {
    return callFunc(__ASIN_API__, params);
}
exports.ASIN = ASIN;
exports.asin = ASIN;
let __ATAN_API__ = API['ATAN'];
function ATAN(params) {
    return callFunc(__ATAN_API__, params);
}
exports.ATAN = ATAN;
exports.atan = ATAN;
let __ATR_API__ = API['ATR'];
function ATR(params) {
    return callFunc(__ATR_API__, params);
}
exports.ATR = ATR;
exports.atr = ATR;
let __AVGDEV_API__ = API['AVGDEV'];
function AVGDEV(params) {
    return callFunc(__AVGDEV_API__, params);
}
exports.AVGDEV = AVGDEV;
exports.avgDev = AVGDEV;
let __AVGPRICE_API__ = API['AVGPRICE'];
function AVGPRICE(params) {
    return callFunc(__AVGPRICE_API__, params);
}
exports.AVGPRICE = AVGPRICE;
exports.avgPrice = AVGPRICE;
let __BBANDS_API__ = API['BBANDS'];
function BBANDS(params) {
    return callFunc(__BBANDS_API__, params);
}
exports.BBANDS = BBANDS;
exports.bbands = BBANDS;
let __BETA_API__ = API['BETA'];
function BETA(params) {
    return callFunc(__BETA_API__, params);
}
exports.BETA = BETA;
exports.beta = BETA;
let __BOP_API__ = API['BOP'];
function BOP(params) {
    return callFunc(__BOP_API__, params);
}
exports.BOP = BOP;
exports.bop = BOP;
let __CCI_API__ = API['CCI'];
function CCI(params) {
    return callFunc(__CCI_API__, params);
}
exports.CCI = CCI;
exports.cci = CCI;
let __CDL2CROWS_API__ = API['CDL2CROWS'];
function CDL2CROWS(params) {
    return callFunc(__CDL2CROWS_API__, params);
}
exports.CDL2CROWS = CDL2CROWS;
exports.cdl2Crows = CDL2CROWS;
let __CDL3BLACKCROWS_API__ = API['CDL3BLACKCROWS'];
function CDL3BLACKCROWS(params) {
    return callFunc(__CDL3BLACKCROWS_API__, params);
}
exports.CDL3BLACKCROWS = CDL3BLACKCROWS;
exports.cdl3BlackCrows = CDL3BLACKCROWS;
let __CDL3INSIDE_API__ = API['CDL3INSIDE'];
function CDL3INSIDE(params) {
    return callFunc(__CDL3INSIDE_API__, params);
}
exports.CDL3INSIDE = CDL3INSIDE;
exports.cdl3Inside = CDL3INSIDE;
let __CDL3LINESTRIKE_API__ = API['CDL3LINESTRIKE'];
function CDL3LINESTRIKE(params) {
    return callFunc(__CDL3LINESTRIKE_API__, params);
}
exports.CDL3LINESTRIKE = CDL3LINESTRIKE;
exports.cdl3LineStrike = CDL3LINESTRIKE;
let __CDL3OUTSIDE_API__ = API['CDL3OUTSIDE'];
function CDL3OUTSIDE(params) {
    return callFunc(__CDL3OUTSIDE_API__, params);
}
exports.CDL3OUTSIDE = CDL3OUTSIDE;
exports.cdl3Outside = CDL3OUTSIDE;
let __CDL3STARSINSOUTH_API__ = API['CDL3STARSINSOUTH'];
function CDL3STARSINSOUTH(params) {
    return callFunc(__CDL3STARSINSOUTH_API__, params);
}
exports.CDL3STARSINSOUTH = CDL3STARSINSOUTH;
exports.cdl3StarsInSouth = CDL3STARSINSOUTH;
let __CDL3WHITESOLDIERS_API__ = API['CDL3WHITESOLDIERS'];
function CDL3WHITESOLDIERS(params) {
    return callFunc(__CDL3WHITESOLDIERS_API__, params);
}
exports.CDL3WHITESOLDIERS = CDL3WHITESOLDIERS;
exports.cdl3WhiteSoldiers = CDL3WHITESOLDIERS;
let __CDLABANDONEDBABY_API__ = API['CDLABANDONEDBABY'];
function CDLABANDONEDBABY(params) {
    return callFunc(__CDLABANDONEDBABY_API__, params);
}
exports.CDLABANDONEDBABY = CDLABANDONEDBABY;
exports.cdlAbandonedBaby = CDLABANDONEDBABY;
let __CDLADVANCEBLOCK_API__ = API['CDLADVANCEBLOCK'];
function CDLADVANCEBLOCK(params) {
    return callFunc(__CDLADVANCEBLOCK_API__, params);
}
exports.CDLADVANCEBLOCK = CDLADVANCEBLOCK;
exports.cdlAdvanceBlock = CDLADVANCEBLOCK;
let __CDLBELTHOLD_API__ = API['CDLBELTHOLD'];
function CDLBELTHOLD(params) {
    return callFunc(__CDLBELTHOLD_API__, params);
}
exports.CDLBELTHOLD = CDLBELTHOLD;
exports.cdlBeltHold = CDLBELTHOLD;
let __CDLBREAKAWAY_API__ = API['CDLBREAKAWAY'];
function CDLBREAKAWAY(params) {
    return callFunc(__CDLBREAKAWAY_API__, params);
}
exports.CDLBREAKAWAY = CDLBREAKAWAY;
exports.cdlBreakaway = CDLBREAKAWAY;
let __CDLCLOSINGMARUBOZU_API__ = API['CDLCLOSINGMARUBOZU'];
function CDLCLOSINGMARUBOZU(params) {
    return callFunc(__CDLCLOSINGMARUBOZU_API__, params);
}
exports.CDLCLOSINGMARUBOZU = CDLCLOSINGMARUBOZU;
exports.cdlClosingMarubozu = CDLCLOSINGMARUBOZU;
let __CDLCONCEALBABYSWALL_API__ = API['CDLCONCEALBABYSWALL'];
function CDLCONCEALBABYSWALL(params) {
    return callFunc(__CDLCONCEALBABYSWALL_API__, params);
}
exports.CDLCONCEALBABYSWALL = CDLCONCEALBABYSWALL;
exports.cdlConcealBabysWall = CDLCONCEALBABYSWALL;
let __CDLCOUNTERATTACK_API__ = API['CDLCOUNTERATTACK'];
function CDLCOUNTERATTACK(params) {
    return callFunc(__CDLCOUNTERATTACK_API__, params);
}
exports.CDLCOUNTERATTACK = CDLCOUNTERATTACK;
exports.cdlCounterAttack = CDLCOUNTERATTACK;
let __CDLDARKCLOUDCOVER_API__ = API['CDLDARKCLOUDCOVER'];
function CDLDARKCLOUDCOVER(params) {
    return callFunc(__CDLDARKCLOUDCOVER_API__, params);
}
exports.CDLDARKCLOUDCOVER = CDLDARKCLOUDCOVER;
exports.cdlDarkCloudCover = CDLDARKCLOUDCOVER;
let __CDLDOJI_API__ = API['CDLDOJI'];
function CDLDOJI(params) {
    return callFunc(__CDLDOJI_API__, params);
}
exports.CDLDOJI = CDLDOJI;
exports.cdlDoji = CDLDOJI;
let __CDLDOJISTAR_API__ = API['CDLDOJISTAR'];
function CDLDOJISTAR(params) {
    return callFunc(__CDLDOJISTAR_API__, params);
}
exports.CDLDOJISTAR = CDLDOJISTAR;
exports.cdlDojiStar = CDLDOJISTAR;
let __CDLDRAGONFLYDOJI_API__ = API['CDLDRAGONFLYDOJI'];
function CDLDRAGONFLYDOJI(params) {
    return callFunc(__CDLDRAGONFLYDOJI_API__, params);
}
exports.CDLDRAGONFLYDOJI = CDLDRAGONFLYDOJI;
exports.cdlDragonflyDoji = CDLDRAGONFLYDOJI;
let __CDLENGULFING_API__ = API['CDLENGULFING'];
function CDLENGULFING(params) {
    return callFunc(__CDLENGULFING_API__, params);
}
exports.CDLENGULFING = CDLENGULFING;
exports.cdlEngulfing = CDLENGULFING;
let __CDLEVENINGDOJISTAR_API__ = API['CDLEVENINGDOJISTAR'];
function CDLEVENINGDOJISTAR(params) {
    return callFunc(__CDLEVENINGDOJISTAR_API__, params);
}
exports.CDLEVENINGDOJISTAR = CDLEVENINGDOJISTAR;
exports.cdlEveningDojiStar = CDLEVENINGDOJISTAR;
let __CDLEVENINGSTAR_API__ = API['CDLEVENINGSTAR'];
function CDLEVENINGSTAR(params) {
    return callFunc(__CDLEVENINGSTAR_API__, params);
}
exports.CDLEVENINGSTAR = CDLEVENINGSTAR;
exports.cdlEveningStar = CDLEVENINGSTAR;
let __CDLGAPSIDESIDEWHITE_API__ = API['CDLGAPSIDESIDEWHITE'];
function CDLGAPSIDESIDEWHITE(params) {
    return callFunc(__CDLGAPSIDESIDEWHITE_API__, params);
}
exports.CDLGAPSIDESIDEWHITE = CDLGAPSIDESIDEWHITE;
exports.cdlGapSideSideWhite = CDLGAPSIDESIDEWHITE;
let __CDLGRAVESTONEDOJI_API__ = API['CDLGRAVESTONEDOJI'];
function CDLGRAVESTONEDOJI(params) {
    return callFunc(__CDLGRAVESTONEDOJI_API__, params);
}
exports.CDLGRAVESTONEDOJI = CDLGRAVESTONEDOJI;
exports.cdlGravestoneDoji = CDLGRAVESTONEDOJI;
let __CDLHAMMER_API__ = API['CDLHAMMER'];
function CDLHAMMER(params) {
    return callFunc(__CDLHAMMER_API__, params);
}
exports.CDLHAMMER = CDLHAMMER;
exports.cdlHammer = CDLHAMMER;
let __CDLHANGINGMAN_API__ = API['CDLHANGINGMAN'];
function CDLHANGINGMAN(params) {
    return callFunc(__CDLHANGINGMAN_API__, params);
}
exports.CDLHANGINGMAN = CDLHANGINGMAN;
exports.cdlHangingMan = CDLHANGINGMAN;
let __CDLHARAMI_API__ = API['CDLHARAMI'];
function CDLHARAMI(params) {
    return callFunc(__CDLHARAMI_API__, params);
}
exports.CDLHARAMI = CDLHARAMI;
exports.cdlHarami = CDLHARAMI;
let __CDLHARAMICROSS_API__ = API['CDLHARAMICROSS'];
function CDLHARAMICROSS(params) {
    return callFunc(__CDLHARAMICROSS_API__, params);
}
exports.CDLHARAMICROSS = CDLHARAMICROSS;
exports.cdlHaramiCross = CDLHARAMICROSS;
let __CDLHIGHWAVE_API__ = API['CDLHIGHWAVE'];
function CDLHIGHWAVE(params) {
    return callFunc(__CDLHIGHWAVE_API__, params);
}
exports.CDLHIGHWAVE = CDLHIGHWAVE;
exports.cdlHignWave = CDLHIGHWAVE;
let __CDLHIKKAKE_API__ = API['CDLHIKKAKE'];
function CDLHIKKAKE(params) {
    return callFunc(__CDLHIKKAKE_API__, params);
}
exports.CDLHIKKAKE = CDLHIKKAKE;
exports.cdlHikkake = CDLHIKKAKE;
let __CDLHIKKAKEMOD_API__ = API['CDLHIKKAKEMOD'];
function CDLHIKKAKEMOD(params) {
    return callFunc(__CDLHIKKAKEMOD_API__, params);
}
exports.CDLHIKKAKEMOD = CDLHIKKAKEMOD;
exports.cdlHikkakeMod = CDLHIKKAKEMOD;
let __CDLHOMINGPIGEON_API__ = API['CDLHOMINGPIGEON'];
function CDLHOMINGPIGEON(params) {
    return callFunc(__CDLHOMINGPIGEON_API__, params);
}
exports.CDLHOMINGPIGEON = CDLHOMINGPIGEON;
exports.cdlHomingPigeon = CDLHOMINGPIGEON;
let __CDLIDENTICAL3CROWS_API__ = API['CDLIDENTICAL3CROWS'];
function CDLIDENTICAL3CROWS(params) {
    return callFunc(__CDLIDENTICAL3CROWS_API__, params);
}
exports.CDLIDENTICAL3CROWS = CDLIDENTICAL3CROWS;
exports.cdlIdentical3Crows = CDLIDENTICAL3CROWS;
let __CDLINNECK_API__ = API['CDLINNECK'];
function CDLINNECK(params) {
    return callFunc(__CDLINNECK_API__, params);
}
exports.CDLINNECK = CDLINNECK;
exports.cdlInNeck = CDLINNECK;
let __CDLINVERTEDHAMMER_API__ = API['CDLINVERTEDHAMMER'];
function CDLINVERTEDHAMMER(params) {
    return callFunc(__CDLINVERTEDHAMMER_API__, params);
}
exports.CDLINVERTEDHAMMER = CDLINVERTEDHAMMER;
exports.cdlInvertedHammer = CDLINVERTEDHAMMER;
let __CDLKICKING_API__ = API['CDLKICKING'];
function CDLKICKING(params) {
    return callFunc(__CDLKICKING_API__, params);
}
exports.CDLKICKING = CDLKICKING;
exports.cdlKicking = CDLKICKING;
let __CDLKICKINGBYLENGTH_API__ = API['CDLKICKINGBYLENGTH'];
function CDLKICKINGBYLENGTH(params) {
    return callFunc(__CDLKICKINGBYLENGTH_API__, params);
}
exports.CDLKICKINGBYLENGTH = CDLKICKINGBYLENGTH;
exports.cdlKickingByLength = CDLKICKINGBYLENGTH;
let __CDLLADDERBOTTOM_API__ = API['CDLLADDERBOTTOM'];
function CDLLADDERBOTTOM(params) {
    return callFunc(__CDLLADDERBOTTOM_API__, params);
}
exports.CDLLADDERBOTTOM = CDLLADDERBOTTOM;
exports.cdlLadderBottom = CDLLADDERBOTTOM;
let __CDLLONGLEGGEDDOJI_API__ = API['CDLLONGLEGGEDDOJI'];
function CDLLONGLEGGEDDOJI(params) {
    return callFunc(__CDLLONGLEGGEDDOJI_API__, params);
}
exports.CDLLONGLEGGEDDOJI = CDLLONGLEGGEDDOJI;
exports.cdlLongLeggedDoji = CDLLONGLEGGEDDOJI;
let __CDLLONGLINE_API__ = API['CDLLONGLINE'];
function CDLLONGLINE(params) {
    return callFunc(__CDLLONGLINE_API__, params);
}
exports.CDLLONGLINE = CDLLONGLINE;
exports.cdlLongLine = CDLLONGLINE;
let __CDLMARUBOZU_API__ = API['CDLMARUBOZU'];
function CDLMARUBOZU(params) {
    return callFunc(__CDLMARUBOZU_API__, params);
}
exports.CDLMARUBOZU = CDLMARUBOZU;
exports.cdlMarubozu = CDLMARUBOZU;
let __CDLMATCHINGLOW_API__ = API['CDLMATCHINGLOW'];
function CDLMATCHINGLOW(params) {
    return callFunc(__CDLMATCHINGLOW_API__, params);
}
exports.CDLMATCHINGLOW = CDLMATCHINGLOW;
exports.cdlMatchingLow = CDLMATCHINGLOW;
let __CDLMATHOLD_API__ = API['CDLMATHOLD'];
function CDLMATHOLD(params) {
    return callFunc(__CDLMATHOLD_API__, params);
}
exports.CDLMATHOLD = CDLMATHOLD;
exports.cdlMatHold = CDLMATHOLD;
let __CDLMORNINGDOJISTAR_API__ = API['CDLMORNINGDOJISTAR'];
function CDLMORNINGDOJISTAR(params) {
    return callFunc(__CDLMORNINGDOJISTAR_API__, params);
}
exports.CDLMORNINGDOJISTAR = CDLMORNINGDOJISTAR;
exports.cdlMorningDojiStar = CDLMORNINGDOJISTAR;
let __CDLMORNINGSTAR_API__ = API['CDLMORNINGSTAR'];
function CDLMORNINGSTAR(params) {
    return callFunc(__CDLMORNINGSTAR_API__, params);
}
exports.CDLMORNINGSTAR = CDLMORNINGSTAR;
exports.cdlMorningStar = CDLMORNINGSTAR;
let __CDLONNECK_API__ = API['CDLONNECK'];
function CDLONNECK(params) {
    return callFunc(__CDLONNECK_API__, params);
}
exports.CDLONNECK = CDLONNECK;
exports.cdlOnNeck = CDLONNECK;
let __CDLPIERCING_API__ = API['CDLPIERCING'];
function CDLPIERCING(params) {
    return callFunc(__CDLPIERCING_API__, params);
}
exports.CDLPIERCING = CDLPIERCING;
exports.cdlPiercing = CDLPIERCING;
let __CDLRICKSHAWMAN_API__ = API['CDLRICKSHAWMAN'];
function CDLRICKSHAWMAN(params) {
    return callFunc(__CDLRICKSHAWMAN_API__, params);
}
exports.CDLRICKSHAWMAN = CDLRICKSHAWMAN;
exports.cdlRickshawMan = CDLRICKSHAWMAN;
let __CDLRISEFALL3METHODS_API__ = API['CDLRISEFALL3METHODS'];
function CDLRISEFALL3METHODS(params) {
    return callFunc(__CDLRISEFALL3METHODS_API__, params);
}
exports.CDLRISEFALL3METHODS = CDLRISEFALL3METHODS;
exports.cdlRiseFall3Methods = CDLRISEFALL3METHODS;
let __CDLSEPARATINGLINES_API__ = API['CDLSEPARATINGLINES'];
function CDLSEPARATINGLINES(params) {
    return callFunc(__CDLSEPARATINGLINES_API__, params);
}
exports.CDLSEPARATINGLINES = CDLSEPARATINGLINES;
exports.cdlSeperatingLines = CDLSEPARATINGLINES;
let __CDLSHOOTINGSTAR_API__ = API['CDLSHOOTINGSTAR'];
function CDLSHOOTINGSTAR(params) {
    return callFunc(__CDLSHOOTINGSTAR_API__, params);
}
exports.CDLSHOOTINGSTAR = CDLSHOOTINGSTAR;
exports.cdlShootingStar = CDLSHOOTINGSTAR;
let __CDLSHORTLINE_API__ = API['CDLSHORTLINE'];
function CDLSHORTLINE(params) {
    return callFunc(__CDLSHORTLINE_API__, params);
}
exports.CDLSHORTLINE = CDLSHORTLINE;
exports.cdlShortLine = CDLSHORTLINE;
let __CDLSPINNINGTOP_API__ = API['CDLSPINNINGTOP'];
function CDLSPINNINGTOP(params) {
    return callFunc(__CDLSPINNINGTOP_API__, params);
}
exports.CDLSPINNINGTOP = CDLSPINNINGTOP;
exports.cdlSpinningTop = CDLSPINNINGTOP;
let __CDLSTALLEDPATTERN_API__ = API['CDLSTALLEDPATTERN'];
function CDLSTALLEDPATTERN(params) {
    return callFunc(__CDLSTALLEDPATTERN_API__, params);
}
exports.CDLSTALLEDPATTERN = CDLSTALLEDPATTERN;
exports.cdlStalledPattern = CDLSTALLEDPATTERN;
let __CDLSTICKSANDWICH_API__ = API['CDLSTICKSANDWICH'];
function CDLSTICKSANDWICH(params) {
    return callFunc(__CDLSTICKSANDWICH_API__, params);
}
exports.CDLSTICKSANDWICH = CDLSTICKSANDWICH;
exports.cdlStickSandwhich = CDLSTICKSANDWICH;
let __CDLTAKURI_API__ = API['CDLTAKURI'];
function CDLTAKURI(params) {
    return callFunc(__CDLTAKURI_API__, params);
}
exports.CDLTAKURI = CDLTAKURI;
exports.cdlTakuri = CDLTAKURI;
let __CDLTASUKIGAP_API__ = API['CDLTASUKIGAP'];
function CDLTASUKIGAP(params) {
    return callFunc(__CDLTASUKIGAP_API__, params);
}
exports.CDLTASUKIGAP = CDLTASUKIGAP;
exports.cdlTasukiGap = CDLTASUKIGAP;
let __CDLTHRUSTING_API__ = API['CDLTHRUSTING'];
function CDLTHRUSTING(params) {
    return callFunc(__CDLTHRUSTING_API__, params);
}
exports.CDLTHRUSTING = CDLTHRUSTING;
exports.cdlThrusting = CDLTHRUSTING;
let __CDLTRISTAR_API__ = API['CDLTRISTAR'];
function CDLTRISTAR(params) {
    return callFunc(__CDLTRISTAR_API__, params);
}
exports.CDLTRISTAR = CDLTRISTAR;
exports.cdlTristar = CDLTRISTAR;
let __CDLUNIQUE3RIVER_API__ = API['CDLUNIQUE3RIVER'];
function CDLUNIQUE3RIVER(params) {
    return callFunc(__CDLUNIQUE3RIVER_API__, params);
}
exports.CDLUNIQUE3RIVER = CDLUNIQUE3RIVER;
exports.cdlUnique3River = CDLUNIQUE3RIVER;
let __CDLUPSIDEGAP2CROWS_API__ = API['CDLUPSIDEGAP2CROWS'];
function CDLUPSIDEGAP2CROWS(params) {
    return callFunc(__CDLUPSIDEGAP2CROWS_API__, params);
}
exports.CDLUPSIDEGAP2CROWS = CDLUPSIDEGAP2CROWS;
exports.cdlUpsideGap2Crows = CDLUPSIDEGAP2CROWS;
let __CDLXSIDEGAP3METHODS_API__ = API['CDLXSIDEGAP3METHODS'];
function CDLXSIDEGAP3METHODS(params) {
    return callFunc(__CDLXSIDEGAP3METHODS_API__, params);
}
exports.CDLXSIDEGAP3METHODS = CDLXSIDEGAP3METHODS;
exports.cdlXSideGap3Methods = CDLXSIDEGAP3METHODS;
let __CEIL_API__ = API['CEIL'];
function CEIL(params) {
    return callFunc(__CEIL_API__, params);
}
exports.CEIL = CEIL;
exports.ceil = CEIL;
let __CMO_API__ = API['CMO'];
function CMO(params) {
    return callFunc(__CMO_API__, params);
}
exports.CMO = CMO;
exports.cmo = CMO;
let __CORREL_API__ = API['CORREL'];
function CORREL(params) {
    return callFunc(__CORREL_API__, params);
}
exports.CORREL = CORREL;
exports.correl = CORREL;
let __COS_API__ = API['COS'];
function COS(params) {
    return callFunc(__COS_API__, params);
}
exports.COS = COS;
exports.cos = COS;
let __COSH_API__ = API['COSH'];
function COSH(params) {
    return callFunc(__COSH_API__, params);
}
exports.COSH = COSH;
exports.cosh = COSH;
let __DEMA_API__ = API['DEMA'];
function DEMA(params) {
    return callFunc(__DEMA_API__, params);
}
exports.DEMA = DEMA;
exports.dema = DEMA;
let __DIV_API__ = API['DIV'];
function DIV(params) {
    return callFunc(__DIV_API__, params);
}
exports.DIV = DIV;
exports.div = DIV;
let __DX_API__ = API['DX'];
function DX(params) {
    return callFunc(__DX_API__, params);
}
exports.DX = DX;
exports.dx = DX;
let __EMA_API__ = API['EMA'];
function EMA(params) {
    return callFunc(__EMA_API__, params);
}
exports.EMA = EMA;
exports.ema = EMA;
let __EXP_API__ = API['EXP'];
function EXP(params) {
    return callFunc(__EXP_API__, params);
}
exports.EXP = EXP;
exports.exp = EXP;
let __FLOOR_API__ = API['FLOOR'];
function FLOOR(params) {
    return callFunc(__FLOOR_API__, params);
}
exports.FLOOR = FLOOR;
exports.floor = FLOOR;
let __HT_DCPERIOD_API__ = API['HT_DCPERIOD'];
function HT_DCPERIOD(params) {
    return callFunc(__HT_DCPERIOD_API__, params);
}
exports.HT_DCPERIOD = HT_DCPERIOD;
exports.htDcPeriod = HT_DCPERIOD;
let __HT_DCPHASE_API__ = API['HT_DCPHASE'];
function HT_DCPHASE(params) {
    return callFunc(__HT_DCPHASE_API__, params);
}
exports.HT_DCPHASE = HT_DCPHASE;
exports.htDcPhase = HT_DCPHASE;
let __HT_PHASOR_API__ = API['HT_PHASOR'];
function HT_PHASOR(params) {
    return callFunc(__HT_PHASOR_API__, params);
}
exports.HT_PHASOR = HT_PHASOR;
exports.htPhasor = HT_PHASOR;
let __HT_SINE_API__ = API['HT_SINE'];
function HT_SINE(params) {
    return callFunc(__HT_SINE_API__, params);
}
exports.HT_SINE = HT_SINE;
exports.htSine = HT_SINE;
let __HT_TRENDLINE_API__ = API['HT_TRENDLINE'];
function HT_TRENDLINE(params) {
    return callFunc(__HT_TRENDLINE_API__, params);
}
exports.HT_TRENDLINE = HT_TRENDLINE;
exports.htTrendline = HT_TRENDLINE;
let __HT_TRENDMODE_API__ = API['HT_TRENDMODE'];
function HT_TRENDMODE(params) {
    return callFunc(__HT_TRENDMODE_API__, params);
}
exports.HT_TRENDMODE = HT_TRENDMODE;
exports.htTrendMode = HT_TRENDMODE;
let __IMI_API__ = API['IMI'];
function IMI(params) {
    return callFunc(__IMI_API__, params);
}
exports.IMI = IMI;
exports.imi = IMI;
let __KAMA_API__ = API['KAMA'];
function KAMA(params) {
    return callFunc(__KAMA_API__, params);
}
exports.KAMA = KAMA;
exports.kama = KAMA;
let __LINEARREG_API__ = API['LINEARREG'];
function LINEARREG(params) {
    return callFunc(__LINEARREG_API__, params);
}
exports.LINEARREG = LINEARREG;
exports.linearReg = LINEARREG;
let __LINEARREG_ANGLE_API__ = API['LINEARREG_ANGLE'];
function LINEARREG_ANGLE(params) {
    return callFunc(__LINEARREG_ANGLE_API__, params);
}
exports.LINEARREG_ANGLE = LINEARREG_ANGLE;
exports.linearRegAngle = LINEARREG_ANGLE;
let __LINEARREG_INTERCEPT_API__ = API['LINEARREG_INTERCEPT'];
function LINEARREG_INTERCEPT(params) {
    return callFunc(__LINEARREG_INTERCEPT_API__, params);
}
exports.LINEARREG_INTERCEPT = LINEARREG_INTERCEPT;
exports.linearRegIntercept = LINEARREG_INTERCEPT;
let __LINEARREG_SLOPE_API__ = API['LINEARREG_SLOPE'];
function LINEARREG_SLOPE(params) {
    return callFunc(__LINEARREG_SLOPE_API__, params);
}
exports.LINEARREG_SLOPE = LINEARREG_SLOPE;
exports.linearRegSlope = LINEARREG_SLOPE;
let __LN_API__ = API['LN'];
function LN(params) {
    return callFunc(__LN_API__, params);
}
exports.LN = LN;
exports.ln = LN;
let __LOG10_API__ = API['LOG10'];
function LOG10(params) {
    return callFunc(__LOG10_API__, params);
}
exports.LOG10 = LOG10;
exports.log10 = LOG10;
let __MA_API__ = API['MA'];
function MA(params) {
    return callFunc(__MA_API__, params);
}
exports.MA = MA;
exports.movingAverage = MA;
let __MACD_API__ = API['MACD'];
function MACD(params) {
    return callFunc(__MACD_API__, params);
}
exports.MACD = MACD;
exports.macd = MACD;
let __MACDEXT_API__ = API['MACDEXT'];
function MACDEXT(params) {
    return callFunc(__MACDEXT_API__, params);
}
exports.MACDEXT = MACDEXT;
exports.macdExt = MACDEXT;
let __MACDFIX_API__ = API['MACDFIX'];
function MACDFIX(params) {
    return callFunc(__MACDFIX_API__, params);
}
exports.MACDFIX = MACDFIX;
exports.macdFix = MACDFIX;
let __MAMA_API__ = API['MAMA'];
function MAMA(params) {
    return callFunc(__MAMA_API__, params);
}
exports.MAMA = MAMA;
exports.mama = MAMA;
let __MAVP_API__ = API['MAVP'];
function MAVP(params) {
    return callFunc(__MAVP_API__, params);
}
exports.MAVP = MAVP;
exports.movingAverageVariablePeriod = MAVP;
let __MAX_API__ = API['MAX'];
function MAX(params) {
    return callFunc(__MAX_API__, params);
}
exports.MAX = MAX;
exports.max = MAX;
let __MAXINDEX_API__ = API['MAXINDEX'];
function MAXINDEX(params) {
    return callFunc(__MAXINDEX_API__, params);
}
exports.MAXINDEX = MAXINDEX;
exports.maxIndex = MAXINDEX;
let __MEDPRICE_API__ = API['MEDPRICE'];
function MEDPRICE(params) {
    return callFunc(__MEDPRICE_API__, params);
}
exports.MEDPRICE = MEDPRICE;
exports.medPrice = MEDPRICE;
let __MFI_API__ = API['MFI'];
function MFI(params) {
    return callFunc(__MFI_API__, params);
}
exports.MFI = MFI;
exports.mfi = MFI;
let __MIDPOINT_API__ = API['MIDPOINT'];
function MIDPOINT(params) {
    return callFunc(__MIDPOINT_API__, params);
}
exports.MIDPOINT = MIDPOINT;
exports.midPoint = MIDPOINT;
let __MIDPRICE_API__ = API['MIDPRICE'];
function MIDPRICE(params) {
    return callFunc(__MIDPRICE_API__, params);
}
exports.MIDPRICE = MIDPRICE;
exports.midPrice = MIDPRICE;
let __MIN_API__ = API['MIN'];
function MIN(params) {
    return callFunc(__MIN_API__, params);
}
exports.MIN = MIN;
exports.min = MIN;
let __MININDEX_API__ = API['MININDEX'];
function MININDEX(params) {
    return callFunc(__MININDEX_API__, params);
}
exports.MININDEX = MININDEX;
exports.minIndex = MININDEX;
let __MINMAX_API__ = API['MINMAX'];
function MINMAX(params) {
    return callFunc(__MINMAX_API__, params);
}
exports.MINMAX = MINMAX;
exports.minMax = MINMAX;
let __MINMAXINDEX_API__ = API['MINMAXINDEX'];
function MINMAXINDEX(params) {
    return callFunc(__MINMAXINDEX_API__, params);
}
exports.MINMAXINDEX = MINMAXINDEX;
exports.minMaxIndex = MINMAXINDEX;
let __MINUS_DI_API__ = API['MINUS_DI'];
function MINUS_DI(params) {
    return callFunc(__MINUS_DI_API__, params);
}
exports.MINUS_DI = MINUS_DI;
exports.minusDI = MINUS_DI;
let __MINUS_DM_API__ = API['MINUS_DM'];
function MINUS_DM(params) {
    return callFunc(__MINUS_DM_API__, params);
}
exports.MINUS_DM = MINUS_DM;
exports.minusDM = MINUS_DM;
let __MOM_API__ = API['MOM'];
function MOM(params) {
    return callFunc(__MOM_API__, params);
}
exports.MOM = MOM;
exports.mom = MOM;
let __MULT_API__ = API['MULT'];
function MULT(params) {
    return callFunc(__MULT_API__, params);
}
exports.MULT = MULT;
exports.mult = MULT;
let __NATR_API__ = API['NATR'];
function NATR(params) {
    return callFunc(__NATR_API__, params);
}
exports.NATR = NATR;
exports.natr = NATR;
let __OBV_API__ = API['OBV'];
function OBV(params) {
    return callFunc(__OBV_API__, params);
}
exports.OBV = OBV;
exports.obv = OBV;
let __PLUS_DI_API__ = API['PLUS_DI'];
function PLUS_DI(params) {
    return callFunc(__PLUS_DI_API__, params);
}
exports.PLUS_DI = PLUS_DI;
exports.plusDI = PLUS_DI;
let __PLUS_DM_API__ = API['PLUS_DM'];
function PLUS_DM(params) {
    return callFunc(__PLUS_DM_API__, params);
}
exports.PLUS_DM = PLUS_DM;
exports.plusDM = PLUS_DM;
let __PPO_API__ = API['PPO'];
function PPO(params) {
    return callFunc(__PPO_API__, params);
}
exports.PPO = PPO;
exports.ppo = PPO;
let __ROC_API__ = API['ROC'];
function ROC(params) {
    return callFunc(__ROC_API__, params);
}
exports.ROC = ROC;
exports.roc = ROC;
let __ROCP_API__ = API['ROCP'];
function ROCP(params) {
    return callFunc(__ROCP_API__, params);
}
exports.ROCP = ROCP;
exports.rocP = ROCP;
let __ROCR_API__ = API['ROCR'];
function ROCR(params) {
    return callFunc(__ROCR_API__, params);
}
exports.ROCR = ROCR;
exports.rocR = ROCR;
let __ROCR100_API__ = API['ROCR100'];
function ROCR100(params) {
    return callFunc(__ROCR100_API__, params);
}
exports.ROCR100 = ROCR100;
exports.rocR100 = ROCR100;
let __RSI_API__ = API['RSI'];
function RSI(params) {
    return callFunc(__RSI_API__, params);
}
exports.RSI = RSI;
exports.rsi = RSI;
let __SAR_API__ = API['SAR'];
function SAR(params) {
    return callFunc(__SAR_API__, params);
}
exports.SAR = SAR;
exports.sar = SAR;
let __SAREXT_API__ = API['SAREXT'];
function SAREXT(params) {
    return callFunc(__SAREXT_API__, params);
}
exports.SAREXT = SAREXT;
exports.sarExt = SAREXT;
let __SIN_API__ = API['SIN'];
function SIN(params) {
    return callFunc(__SIN_API__, params);
}
exports.SIN = SIN;
exports.sin = SIN;
let __SINH_API__ = API['SINH'];
function SINH(params) {
    return callFunc(__SINH_API__, params);
}
exports.SINH = SINH;
exports.sinh = SINH;
let __SMA_API__ = API['SMA'];
function SMA(params) {
    return callFunc(__SMA_API__, params);
}
exports.SMA = SMA;
exports.sma = SMA;
let __SQRT_API__ = API['SQRT'];
function SQRT(params) {
    return callFunc(__SQRT_API__, params);
}
exports.SQRT = SQRT;
exports.sqrt = SQRT;
let __STDDEV_API__ = API['STDDEV'];
function STDDEV(params) {
    return callFunc(__STDDEV_API__, params);
}
exports.STDDEV = STDDEV;
exports.stdDev = STDDEV;
let __STOCH_API__ = API['STOCH'];
function STOCH(params) {
    return callFunc(__STOCH_API__, params);
}
exports.STOCH = STOCH;
exports.stoch = STOCH;
let __STOCHF_API__ = API['STOCHF'];
function STOCHF(params) {
    return callFunc(__STOCHF_API__, params);
}
exports.STOCHF = STOCHF;
exports.stochF = STOCHF;
let __STOCHRSI_API__ = API['STOCHRSI'];
function STOCHRSI(params) {
    return callFunc(__STOCHRSI_API__, params);
}
exports.STOCHRSI = STOCHRSI;
exports.stochRsi = STOCHRSI;
let __SUB_API__ = API['SUB'];
function SUB(params) {
    return callFunc(__SUB_API__, params);
}
exports.SUB = SUB;
exports.sub = SUB;
let __SUM_API__ = API['SUM'];
function SUM(params) {
    return callFunc(__SUM_API__, params);
}
exports.SUM = SUM;
exports.sum = SUM;
let __T3_API__ = API['T3'];
function T3(params) {
    return callFunc(__T3_API__, params);
}
exports.T3 = T3;
exports.t3 = T3;
let __TAN_API__ = API['TAN'];
function TAN(params) {
    return callFunc(__TAN_API__, params);
}
exports.TAN = TAN;
exports.tan = TAN;
let __TANH_API__ = API['TANH'];
function TANH(params) {
    return callFunc(__TANH_API__, params);
}
exports.TANH = TANH;
exports.tanh = TANH;
let __TEMA_API__ = API['TEMA'];
function TEMA(params) {
    return callFunc(__TEMA_API__, params);
}
exports.TEMA = TEMA;
exports.tema = TEMA;
let __TRANGE_API__ = API['TRANGE'];
function TRANGE(params) {
    return callFunc(__TRANGE_API__, params);
}
exports.TRANGE = TRANGE;
exports.trueRange = TRANGE;
let __TRIMA_API__ = API['TRIMA'];
function TRIMA(params) {
    return callFunc(__TRIMA_API__, params);
}
exports.TRIMA = TRIMA;
exports.trima = TRIMA;
let __TRIX_API__ = API['TRIX'];
function TRIX(params) {
    return callFunc(__TRIX_API__, params);
}
exports.TRIX = TRIX;
exports.trix = TRIX;
let __TSF_API__ = API['TSF'];
function TSF(params) {
    return callFunc(__TSF_API__, params);
}
exports.TSF = TSF;
exports.tsf = TSF;
let __TYPPRICE_API__ = API['TYPPRICE'];
function TYPPRICE(params) {
    return callFunc(__TYPPRICE_API__, params);
}
exports.TYPPRICE = TYPPRICE;
exports.typPrice = TYPPRICE;
let __ULTOSC_API__ = API['ULTOSC'];
function ULTOSC(params) {
    return callFunc(__ULTOSC_API__, params);
}
exports.ULTOSC = ULTOSC;
exports.ultOsc = ULTOSC;
let __VAR_API__ = API['VAR'];
function VAR(params) {
    return callFunc(__VAR_API__, params);
}
exports.VAR = VAR;
exports.variance = VAR;
let __WCLPRICE_API__ = API['WCLPRICE'];
function WCLPRICE(params) {
    return callFunc(__WCLPRICE_API__, params);
}
exports.WCLPRICE = WCLPRICE;
exports.wclPrice = WCLPRICE;
let __WILLR_API__ = API['WILLR'];
function WILLR(params) {
    return callFunc(__WILLR_API__, params);
}
exports.WILLR = WILLR;
exports.willR = WILLR;
let __WMA_API__ = API['WMA'];
function WMA(params) {
    return callFunc(__WMA_API__, params);
}
exports.WMA = WMA;
exports.wma = WMA;
exports.TAFuncs = { "ACCBANDS": ACCBANDS, "ACOS": ACOS, "AD": AD, "ADD": ADD, "ADOSC": ADOSC, "ADX": ADX, "ADXR": ADXR, "APO": APO, "AROON": AROON, "AROONOSC": AROONOSC, "ASIN": ASIN, "ATAN": ATAN, "ATR": ATR, "AVGDEV": AVGDEV, "AVGPRICE": AVGPRICE, "BBANDS": BBANDS, "BETA": BETA, "BOP": BOP, "CCI": CCI, "CDL2CROWS": CDL2CROWS, "CDL3BLACKCROWS": CDL3BLACKCROWS, "CDL3INSIDE": CDL3INSIDE, "CDL3LINESTRIKE": CDL3LINESTRIKE, "CDL3OUTSIDE": CDL3OUTSIDE, "CDL3STARSINSOUTH": CDL3STARSINSOUTH, "CDL3WHITESOLDIERS": CDL3WHITESOLDIERS, "CDLABANDONEDBABY": CDLABANDONEDBABY, "CDLADVANCEBLOCK": CDLADVANCEBLOCK, "CDLBELTHOLD": CDLBELTHOLD, "CDLBREAKAWAY": CDLBREAKAWAY, "CDLCLOSINGMARUBOZU": CDLCLOSINGMARUBOZU, "CDLCONCEALBABYSWALL": CDLCONCEALBABYSWALL, "CDLCOUNTERATTACK": CDLCOUNTERATTACK, "CDLDARKCLOUDCOVER": CDLDARKCLOUDCOVER, "CDLDOJI": CDLDOJI, "CDLDOJISTAR": CDLDOJISTAR, "CDLDRAGONFLYDOJI": CDLDRAGONFLYDOJI, "CDLENGULFING": CDLENGULFING, "CDLEVENINGDOJISTAR": CDLEVENINGDOJISTAR, "CDLEVENINGSTAR": CDLEVENINGSTAR, "CDLGAPSIDESIDEWHITE": CDLGAPSIDESIDEWHITE, "CDLGRAVESTONEDOJI": CDLGRAVESTONEDOJI, "CDLHAMMER": CDLHAMMER, "CDLHANGINGMAN": CDLHANGINGMAN, "CDLHARAMI": CDLHARAMI, "CDLHARAMICROSS": CDLHARAMICROSS, "CDLHIGHWAVE": CDLHIGHWAVE, "CDLHIKKAKE": CDLHIKKAKE, "CDLHIKKAKEMOD": CDLHIKKAKEMOD, "CDLHOMINGPIGEON": CDLHOMINGPIGEON, "CDLIDENTICAL3CROWS": CDLIDENTICAL3CROWS, "CDLINNECK": CDLINNECK, "CDLINVERTEDHAMMER": CDLINVERTEDHAMMER, "CDLKICKING": CDLKICKING, "CDLKICKINGBYLENGTH": CDLKICKINGBYLENGTH, "CDLLADDERBOTTOM": CDLLADDERBOTTOM, "CDLLONGLEGGEDDOJI": CDLLONGLEGGEDDOJI, "CDLLONGLINE": CDLLONGLINE, "CDLMARUBOZU": CDLMARUBOZU, "CDLMATCHINGLOW": CDLMATCHINGLOW, "CDLMATHOLD": CDLMATHOLD, "CDLMORNINGDOJISTAR": CDLMORNINGDOJISTAR, "CDLMORNINGSTAR": CDLMORNINGSTAR, "CDLONNECK": CDLONNECK, "CDLPIERCING": CDLPIERCING, "CDLRICKSHAWMAN": CDLRICKSHAWMAN, "CDLRISEFALL3METHODS": CDLRISEFALL3METHODS, "CDLSEPARATINGLINES": CDLSEPARATINGLINES, "CDLSHOOTINGSTAR": CDLSHOOTINGSTAR, "CDLSHORTLINE": CDLSHORTLINE, "CDLSPINNINGTOP": CDLSPINNINGTOP, "CDLSTALLEDPATTERN": CDLSTALLEDPATTERN, "CDLSTICKSANDWICH": CDLSTICKSANDWICH, "CDLTAKURI": CDLTAKURI, "CDLTASUKIGAP": CDLTASUKIGAP, "CDLTHRUSTING": CDLTHRUSTING, "CDLTRISTAR": CDLTRISTAR, "CDLUNIQUE3RIVER": CDLUNIQUE3RIVER, "CDLUPSIDEGAP2CROWS": CDLUPSIDEGAP2CROWS, "CDLXSIDEGAP3METHODS": CDLXSIDEGAP3METHODS, "CEIL": CEIL, "CMO": CMO, "CORREL": CORREL, "COS": COS, "COSH": COSH, "DEMA": DEMA, "DIV": DIV, "DX": DX, "EMA": EMA, "EXP": EXP, "FLOOR": FLOOR, "HT_DCPERIOD": HT_DCPERIOD, "HT_DCPHASE": HT_DCPHASE, "HT_PHASOR": HT_PHASOR, "HT_SINE": HT_SINE, "HT_TRENDLINE": HT_TRENDLINE, "HT_TRENDMODE": HT_TRENDMODE, "IMI": IMI, "KAMA": KAMA, "LINEARREG": LINEARREG, "LINEARREG_ANGLE": LINEARREG_ANGLE, "LINEARREG_INTERCEPT": LINEARREG_INTERCEPT, "LINEARREG_SLOPE": LINEARREG_SLOPE, "LN": LN, "LOG10": LOG10, "MA": MA, "MACD": MACD, "MACDEXT": MACDEXT, "MACDFIX": MACDFIX, "MAMA": MAMA, "MAVP": MAVP, "MAX": MAX, "MAXINDEX": MAXINDEX, "MEDPRICE": MEDPRICE, "MFI": MFI, "MIDPOINT": MIDPOINT, "MIDPRICE": MIDPRICE, "MIN": MIN, "MININDEX": MININDEX, "MINMAX": MINMAX, "MINMAXINDEX": MINMAXINDEX, "MINUS_DI": MINUS_DI, "MINUS_DM": MINUS_DM, "MOM": MOM, "MULT": MULT, "NATR": NATR, "OBV": OBV, "PLUS_DI": PLUS_DI, "PLUS_DM": PLUS_DM, "PPO": PPO, "ROC": ROC, "ROCP": ROCP, "ROCR": ROCR, "ROCR100": ROCR100, "RSI": RSI, "SAR": SAR, "SAREXT": SAREXT, "SIN": SIN, "SINH": SINH, "SMA": SMA, "SQRT": SQRT, "STDDEV": STDDEV, "STOCH": STOCH, "STOCHF": STOCHF, "STOCHRSI": STOCHRSI, "SUB": SUB, "SUM": SUM, "T3": T3, "TAN": TAN, "TANH": TANH, "TEMA": TEMA, "TRANGE": TRANGE, "TRIMA": TRIMA, "TRIX": TRIX, "TSF": TSF, "TYPPRICE": TYPPRICE, "ULTOSC": ULTOSC, "VAR": VAR, "WCLPRICE": WCLPRICE, "WILLR": WILLR, "WMA": WMA };
\n})
