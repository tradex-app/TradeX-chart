// renderLoop.js


import { isArray, isFunction, isObject } from "../../../utils/typeChecks"
import { xMap } from "../../../utils/utilities"


const renderLoop = {
  renderQ: new xMap(),
  rendered: [],
  renderLog: false,
  dropFrames: true,
  graphs: [],
  range: {},
  status: false,

  init: function (config) {
    if (!isObject(config)) return
    this.renderLog = config?.renderLog || false
    this.dropFrames = config?.dropFrames || true
    this.graphs = (isArray(config?.graphs)) ? [...config.graphs] : []
    this.range = (isObject(config?.range)) ? config.range : {}
  },

  queueFrame: function (range=this.range, graphs=this.graphs, update=false) {
    if (this.renderQ.size > 1 && this.dropFrames) 
      update = this.dropFrame() || update

    const frameID = Date.now()
    range = range.snapshot()
    this.renderQ.set(frameID, {graphs, range, update})

    return frameID
  },

  dropFrame: function (frame=-1) {
    let update = false
    if (frame === -1) frame = this.renderQ.lastKey()
    if (this.renderQ.size > 1 && this.renderQ.has(frame)) {
      update = frame.update
      this.renderQ.delete(frame)
    }
    return update
  },

  expungeFrames() {
    this.renderQ.clear()
  },

  getFrame: function (frame=0) {
    if (this.renderQ.has(frame)) return this.renderQ.get(frame)
    // return first frame
    else return this.renderQ.firstValue()
  },

  frameDone: function () {
    if (this.renderQ.size === 0) return
    const key = this.renderQ.firstKey()
    if (this.renderLog) this.rendered.push([key, Date.now()])
    this.renderQ.delete(key)
  },

  start: function () {
    this.status = true
    requestAnimationFrame(this.execute.bind(this))
  },

  stop: function () {
    this.status = false
    this.renderQ.clear()
  },

  execute: function () {
    if (!this.status) return

    requestAnimationFrame(this.execute.bind(this))

    // any frames to render?
    if (this.renderQ.size === 0) return

    const [ID, frame] = this.renderQ.firstEntry()

    if (!frame.range?.snapshot) return
    for (let graph of frame.graphs) {
      if (isFunction(graph.draw) &&
          graph?.status !== "destroyed") 
        graph.draw(frame.range, frame.update)
    }

    for (let graph of frame.graphs) {
      if (isFunction(graph.render) &&
          graph?.status !== "destroyed") 
        graph.render()
    }

    this.frameDone()
  }
}

export default renderLoop
