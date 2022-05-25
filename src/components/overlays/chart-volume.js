// chart-volume.js

import VolumeBar from "../primitives/volume";

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
    const data = range.data
    const zeroPos = this.scene.height
    const volume = {
      x: 0,
      w: this.#xAxis.width / range.Length,
      z: zeroPos
    }

    const volH = Math.floor(zeroPos * this.#config.maxVolumeH / 100)
    const maxVol = range.volumeMax

    let v = range.indexStart
    let i = range.Length

    while(i) {
      volume.h = (maxVol - data[v][5]) * volH / maxVol
      volume.raw = data[v]
      super.draw(volume)
      v++
      i--
      volume.x = volume.x + volume.w
    }
  }

}

