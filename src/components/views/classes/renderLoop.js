// renderLoop.js

import { isArray, isFunction, isObject } from "../../../utils/typeChecks"
import { firstItemInMap, firstKeyInMap, firstValueInMap, lastKeyInMap } from "../../../utils/utilities"


const renderLoop = {
  renderQ: new Map(),
  rendered: [],
  renderLog: false,
  dropFrames: true,
  graphs: [],
  range: {},

  init: function (config) {
    if (!isObject(config)) return
    this.renderLog = config?.renderLog || false
    this.dropFrames = config?.dropFrames || true
    this.graphs = (isArray(config?.graphs)) ? [...config.graphs] : []
    this.range = (isObject(config?.range)) ? config.range : {}
  },

  queueFrame: function (range=this.range, graphs=this.graphs, update=false) {
    if (this.renderQ.size > 1 && this.dropFrames) this.dropFrame()

    const frameID = Date.now()
    range = range.snapshot()
    this.renderQ.set(frameID, {graphs, range, update})

    return frameID
  },

  dropFrame: function (frame=-1) {
    if (frame === -1) frame = lastKeyInMap(this.renderQ)
    if (this.renderQ.size > 1 && this.renderQ.has(frame)) {
      this.renderQ.delete(frame)
    }
  },

  getFrame: function (frame=0) {
    if (this.renderQ.has(frame)) return this.renderQ.get(frame)
    // return first frame
    else return firstValueInMap(this.renderQ)
  },

  frameDone: function () {
    if (this.renderQ.size === 0) return
    const key = firstKeyInMap(this.renderQ)
    if (this.renderLog) this.rendered.push([key, Date.now()])
    this.renderQ.delete(key)
  },

  start: function () {
    requestAnimationFrame(this.execute.bind(this))
  },

  execute: function () {
    requestAnimationFrame(this.execute.bind(this))

    // any frames to render?
    if (this.renderQ.size === 0) return

    const [ID, frame] = firstItemInMap(this.renderQ)

    if (frame.range.constructor.name !== "RangeSnapshot") return

    for (let entry of frame.graphs) {
      if (isFunction(entry.draw)) entry.draw(frame.range, frame.update)
    }

    for (let entry of frame.graphs) {
      if (isFunction(entry.render)) entry.render()
    }

    this.frameDone()
  }
}

export default renderLoop
