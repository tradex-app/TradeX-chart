class ThreadWorker {
  constructor(self, opts={isNode: false}) {

      console.info(`AsyncThreadWorker.ThreadWorker`);

      this._isNode = opts.isNode;

      this._worker = self;

      if (this._isNode) {
          const { parentPort } = global.require('worker_threads');
          this._parentPort = parentPort;
          parentPort.on('message', e => this._onMessage(e));
      } else {
          self.onmessage = e => this._onMessage(e.data);
      }

      this.onCreate(opts);
  }
  onCreate(opts) {}

  _onMessage(e) {
      const { id, data } = e;
      this.onRequest(id, data);
  }

  // abstract
  onRequest(id, payload) {}

  _sendResponse(id, data, opts={}) {
      const defaults = {
          transferables: [],
          error: undefined,
      };
      const actual = Object.assign({}, defaults, opts);
      const error = actual.error;
      const api = this._isNode ? this._parentPort : this._worker;
      api.postMessage({
          id: id,
          result: { data, error },
      }, actual.transferables.length > 0 ? actual.transferables : undefined);
  }
  sendResponse(id, payload=undefined, transferables=[]) {
      this._sendResponse(id, payload, { transferables });
  }
  sendError(id, error) {
      this._sendResponse(id, undefined, { error });
  }
}

class Thread {
  constructor(path, opts={isNode: false, optsNode: undefined}) {
      console.info(`AsyncThreadWorker.Thread`);

      this._isNode = opts.isNode;

      let _worker;
      if (this._isNode) {
          // https://nodejs.org/api/worker_threads.html#worker_threads_new_worker_filename_options
          const { Worker } = global.require('worker_threads');
          _worker = new Worker(path, opts.optsNode);
      } else {
          _worker = new Worker(path);
      }

      this._worker = _worker;

      this._rrRequest = {};

      if (this._isNode) {
          _worker.on('message', e => this._onMessage(e));
          _worker.on('error', e => this._onError(e));
      } else {
          _worker.onmessage = e => this._onMessage(e.data);
          _worker.onerror = e => this._onError(e.data);
      }
  }
  _onMessage(e) {
      const { id, result } = e;
      console.log('result for id:', id);

      const { data, error } = result;
      if (id in this._rrRequest) {
          const { res, rej } = this._rrRequest[id];
          delete this._rrRequest[id];
          error ? rej(error) : res(data);
      } else {
          console.log('nop; invalid request id:', id);
      }
  }
  _onError(e) {
      console.log('_onError(): e:', e);
      this._cancelPendingRequests();
  }
  _sendRequest(data, opts={}) {
      const defaults = {
          transferables: [],
      };
      const actual = Object.assign({}, defaults, opts);
      return new Promise((res, rej) => {
          let id;
          do {
              id = `req-id-${Math.random()}`;
          } while (id in this._rrRequest);

          console.log('_sendRequest(): id:', id);
          this._rrRequest[id] = { res, rej };

          if (this._worker) {
              this._worker.postMessage({ id, data },
                  actual.transferables.length > 0 ? actual.transferables : undefined);
          } else {
              console.log('_sendRequest(): nop (worker already terminated?)');
          }
      });
  }
  sendRequest(payload=undefined, transferables=[]) {
      return this._sendRequest(payload, { transferables });
  }
  getWorker() {
      return this._worker;
  }
  _cancelPendingRequests() {
      let count = 0;
      Object.entries(this._rrRequest).forEach(([id, rr]) => {
          rr.rej(`canceled: ${id}`);
          delete this._rrRequest[id];
          count += 1;
      });
      console.log(`_cancelPendingRequests(): canceled ${count} req(s)`);

      if (Object.keys(this._rrRequest).length !== 0) {
          throw 'panic: the rr map should have been cleared!';
      }
  }
  terminate() {
      this._cancelPendingRequests();

      let promise = null;
      if (this._isNode) {
          // https://nodejs.org/api/worker_threads.html#worker_threads_worker_terminate
          promise = this._worker.terminate(); // "a Promise for the exit code"
      } else {
          // https://developer.mozilla.org/en-US/docs/Web/API/Worker/terminate
          this._worker.terminate();
      }

      this._worker = null;

      return promise || undefined;
  }
}

const AsyncThreadWorker = { ThreadWorker, Thread };
export default AsyncThreadWorker;