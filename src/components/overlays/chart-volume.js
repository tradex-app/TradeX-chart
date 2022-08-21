// chart-volume.js

import VolumeBar from "../primitives/volume";
import { round } from "../../utils/number";
import { BUFFERSIZE } from "../../definitions/chart"

export default class chartVolume extends VolumeBar {

  #target
  #scene
  #config
  #xAxis
  #yAxis
  #core

  constructor(target, xAxis, yAxis, config) {

    super(target.scene, config)

    this.#target = target
    this.#scene = target.scene
    this.#config = config
    this.#xAxis = xAxis
    this.#core = xAxis.mediator.api.core
    this.#config.maxVolumeH = config?.maxVolumeH || 100
  }

  draw(range=this.#core.range) {
    this.#scene.clear()

    const data = range.data
    const zeroPos = this.scene.height
    const offset = this.#xAxis.smoothScrollOffset || 0
    const volume = {
      x: 0 + offset - this.#xAxis.candleW,
      w: this.#xAxis.candleW,
      z: zeroPos
    }

    const volH = Math.floor(zeroPos * this.#config.maxVolumeH / 100)
    const maxVol = range.volumeMax

    let o = this.#xAxis.rangeScrollOffset
    let v = range.indexStart - o
    let i = range.Length + o + 1
    let x

    while(i) {
      x = range.value( v )
      if (x[4] !== null) {
        volume.h = volH - ((maxVol - x[5]) * volH / maxVol)
        volume.raw = data[v]
        super.draw(volume)
      }
      v++
      i--
      volume.x = volume.x + volume.w
    }
  }

}

