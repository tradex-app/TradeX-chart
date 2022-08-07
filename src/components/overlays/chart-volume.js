// chart-volume.js

import VolumeBar from "../primitives/volume";
import { round } from "../../utils/number";

export default class chartVolume extends VolumeBar {

  #target
  #scene
  #config
  #xAxis
  #yAxis

  constructor(target, xAxis, yAxis, config) {

    super(target.scene, config)

    this.#target = target
    this.#scene = target.scene
    this.#config = config
    this.#xAxis = xAxis
    this.#config.maxVolumeH = config?.maxVolumeH || 100
  }

  draw(range) {
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

    let o = (range.indexStart - 1 < 0) ? 0 : 1
    let v = range.indexStart - o
    let i = range.Length + o
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

