// chart-volume.js

import VolumeBar from "../primitives/volume";
import { round } from "../../utils/number";
import { BUFFERSIZE } from "../../definitions/chart"

export default class chartVolume extends VolumeBar {

  #parent
  #core
  #config
  #theme
  #xAxis
  #yAxis
  #target
  #scene
  #volH

  constructor(target, xAxis=false, yAxis=false, theme, parent) {

    super(target.scene, theme)

    this.#parent = parent
    this.#core = parent.core
    this.#target = target
    this.#scene = target.scene
    this.#theme = theme
    this.#xAxis = xAxis
    this.#yAxis = yAxis

    this.#theme.maxVolumeH = theme?.maxVolumeH || 100
  }

  get xAxis() { return this.#xAxis || this.#parent.time.xAxis }
  get yAxis() { return this.#yAxis || this.#parent.scale.yAxis }
  set position(p) { this.#target.setPosition(p[0], p[1]) }

  draw(range=this.#core.range) {

    this.#scene.clear()

    const data = range.data
    const zeroPos = this.scene.height
    const offset = this.xAxis.smoothScrollOffset || 0
    const volume = {
      x: 0 + offset - this.xAxis.candleW,
      w: this.xAxis.candleW,
      z: zeroPos
    }
    const volH = Math.floor(zeroPos * this.#theme.maxVolumeH / 100)

    let o = this.#core.rangeScrollOffset
    let v = range.indexStart - o
    let i = range.Length + o + 1
    let x
    let maxVol = 0
  
    while(i--) {
      x = range.value( v )
      if (x[4] !== null) {
        maxVol = (x[5] > maxVol) ? x[5] : maxVol
      }
      v++
    }

    v = range.indexStart - o
    i = range.Length + o + 1

    while(i--) {
      x = range.value( v )
      if (x[4] !== null) {
        volume.h = volH - (volH * ((maxVol - x[5]) / maxVol))
        volume.raw = data[v]
        super.draw(volume)
      }
      v++
      volume.x = volume.x + volume.w
    }
  }

}

