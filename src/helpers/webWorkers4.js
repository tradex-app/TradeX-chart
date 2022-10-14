export default function thread(fn, ...args) {
  if (!window.Worker) throw Promise.reject(
    new ReferenceError(`WebWorkers aren't available.`)
  );

  const fnWorker = `
  self.onmessage = function(message) {
    self.postMessage(
      (${fn.toString()}).apply(null, message.data)
    );
  }`;

  return new Promise((resolve, reject) => {
    try {
      const blob = new Blob([fnWorker], { type: 'text/javascript' });
      const blobUrl = window.URL.createObjectURL(blob);
      const worker = new Worker(blobUrl);
      window.URL.revokeObjectURL(blobUrl);
      
      worker.onmessage = result => {
        resolve(result.data);
        worker.terminate();
      };

      worker.onerror = error => {
        reject(error);
        worker.terminate();
      };

      worker.postMessage(args);
    } catch (error) {
      reject(error);
    }
  });
}

