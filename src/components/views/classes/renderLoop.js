// renderLoop.js


import { isArray, isFunction, isObject } from "../../../utils/typeChecks"
import { xMap } from "../../../utils/utilities"


export default class RenderLoop {
  renderQ = new xMap()
  rendered = []
  renderLog = false
  dropFrames = true
  graphs = []
  range = {}
  status = false
  core = undefined

  constructor (config) {
    if (!isObject(config)) throw new Error(`class RenderLoop requires a config of type object`)
    this.renderLog = config?.renderLog || false
    this.dropFrames = config?.dropFrames || true
    this.graphs = (isArray(config?.graphs)) ? [...config.graphs] : []
    this.range = (isObject(config?.range)) ? config.range : {}
    this.core = config?.core || this.range?.core
  }

  queueFrame(range = this.range, graphs = this.graphs, update = false) {
    if (this.renderQ.size > 1 && this.dropFrames)
      update = this.dropFrame() || update;

    const frameID = performance.now();
    range = range.snapshot();
    this.renderQ.set(frameID, { graphs, range, update });

    return frameID;
  }

  dropFrame(frame = -1) {
    let update = false;
    if (frame === -1) frame = this.renderQ.lastKey();
    if (this.renderQ.size > 1 && this.renderQ.has(frame)) {
      update = this.renderQ.get(frame).update;
      this.renderQ.delete(frame);
    }
    return update;
  }

  expungeFrames() {
    this.renderQ.clear();
  }

  getFrame(frame = 0) {
    if (this.renderQ.has(frame)) return this.renderQ.get(frame);
    // return first frame
    else return this.renderQ.firstValue();
  }

  frameDone() {
    if (this.renderQ.size === 0) return;
    const key = this.renderQ.firstKey();
    if (this.renderLog) this.rendered.push([key, performance.now()]);
    this.renderQ.delete(key);
  }

  start() {
    this.status = true;
    requestAnimationFrame(this.execute.bind(this));
  }

  stop() {
    this.status = false;
    this.renderQ.clear();
  }

  execute() {
    if (!this.status) return

    try {
      requestAnimationFrame(this.execute.bind(this))

      // any frames to render?
      if (this.renderQ.size === 0) return

      const [ID, frame] = this.renderQ.firstEntry()

      if (!frame.range?.snapshot) return
      for (let graph of frame.graphs) {
        
        if (isFunction(graph.draw) &&
            graph?.status !== "destroyed") 
          graph.draw(frame.range, frame.update)

        if (isFunction(graph.render) &&
          graph?.status !== "destroyed") 
          graph.render()
      }

      this.frameDone()
    } catch (error) {
      this.core.error(error)
    }
  }
}

// export default renderLoop
