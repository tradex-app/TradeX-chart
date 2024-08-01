// chart-volume.js

import Overlay from "./overlay"
import VolumeBar from "../primitives/volume";
import { bRound, limit } from "../../utils/number";
import { candleW } from "../primitives/candle";


export default class chartVolume extends Overlay {

  #volumeBar
  #volH

  constructor(target, xAxis=false, yAxis=false, theme, parent, params) {

    super(target, xAxis, yAxis, theme, parent, params)

    this.#volumeBar = new VolumeBar(target.scene, theme)
    this.theme.volume.Height = limit(theme?.volume?.Height, 0, 100) || 100
  }

  set position(p) { this.target.setPosition(p[0], p[1]) }

  draw(range=this.core.range) {

    if (!super.mustUpdate()) return

    this.scene.clear()

    const data = range.data
    const zeroPos = this.scene.height
    const offset = this.xAxis.smoothScrollOffset || 0

    let w = Math.max(this.xAxis.candleW -1, 1)
        w = candleW(w)

    const volume = {
      x: 0 + offset - this.xAxis.candleW,
      w: w,
      z: zeroPos
    }
    const volH = Math.floor(zeroPos * this.theme.volume.Height / 100)

    let o = this.core.rangeScrollOffset
    let v = range.indexStart - o
    let i = range.Length + (o * 2)
    let j = i
    let u = v
    let x
    let maxVol = 0
  
    while(j--) {
      x = range.value( u )
      if (x[4] !== null) {
        maxVol = (x[5] > maxVol) ? x[5] : maxVol
      }
      u++
    }

    while(i--) {
      x = range.value( v )
      volume.x = bRound(this.xAxis.xPos(x[0]) - (w / 2))
      if (x[4] !== null) {
        volume.h = volH - (volH * ((maxVol - x[5]) / maxVol))
        volume.raw = data[v]
        this.#volumeBar.draw(volume)
      }
      v++
    }

    super.updated()
  }

}

