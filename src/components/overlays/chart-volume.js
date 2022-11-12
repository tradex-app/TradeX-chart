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

  constructor(target, xAxis, yAxis, theme, parent) {

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

  draw(update=false, range=this.#core.range) {

    // if (this.#core.scrollPos != this.#core.bufferPx * -1 && 
    //     this.#core.scrollPos != 0 && 
    //                   update != true) 
    // { return }

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
    const maxVol = range.volumeMax

    let o = this.#core.rangeScrollOffset
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

