// Volume.js

import Indicator from "../components/overlays/indicator"
import VolumeBar from "../components/primitives/volume";
import { bRound, limit } from "../utils/number";
import { uid } from "../utils/utilities";
import { YAXIS_TYPE } from "../definitions/chart";
import { defaultTheme } from "../definitions/style";
import { candleW } from "../components/primitives/candle";

/**
 * Volume
 * @export
 * @class Volume
 * @extends {Indicator}
 */
export default class Volume extends Indicator {

  get name() { return 'Volume' }
  shortName = 'VOL'
  checkParamCount = false
  scaleOverlay = true
  definition = {
    meta: {
      style: {
        up: {colour: {value: "#388E3C"}},
        dn: {colour: {value: "#D32F2F"}},
        height: {percent: {value: 15}}
      }
    }
  }

  #defaultStyle = defaultTheme.volume
  #volumeBar
  #primaryPane = "both"

  
  static version = "1.0"
  static inCnt = 0
  static primaryPane = "both"
  static scale = YAXIS_TYPE.percent

  static defaultStyle = {
    up: {colour: {value: "#388E3C"}},
    dn: {colour: {value: "#D32F2F"}},
    height: {percent: {value: 15}}
  }

  /**
   * Creates an instance of Volume.
   * @param {Object} target - canvas scene
   * @param {Object} xAxis - timeline axis instance
   * @param {Object} yAxis - scale axis instance
   * @param {Object} config - theme / styling
   * @param {Object} parent - chart pane instance that hosts the indicator
   * @param {Object} params - contains minimum of overlay instance
   * @memberof Volume
   */
  // constructor (target, overlay, xAxis, yAxis, config) {

  constructor (target, xAxis=false, yAxis=false, config, parent, params)  {

    super (target, xAxis, yAxis, config, parent, params) 

    Volume.inCnt++
    const overlay = params.overlay

    this.id = params.overlay?.id || uid(this.shortName)
    this.#defaultStyle = {...this.defaultStyle, ...this.theme.volume}
    this.style = (overlay?.settings?.style) ? {...this.#defaultStyle, ...overlay.settings.style} : {...this.#defaultStyle, ...config.style}

    if (this.chart.type === "primaryPane") {
      this.style.Height = limit(this.style.Height, 0, 100) || 100;
      this.#primaryPane = true
    }
    else {
      this.style.Height = 100;
      this.#primaryPane = false
    }

    this.mStyle.up.colour.value = this.style.UpColour
    this.mStyle.dn.colour.value = this.style.DnColour
    this.mStyle.height.percent.value = this.style.Height

    this.#volumeBar = new VolumeBar(target.scene, this.mStyle)

    // indicator legend
    this.addLegend()
    // config dialogue
    this.configDialogue.start()
  }

  get primaryPane() { return this.#primaryPane }
  get defaultStyle() { return this.#defaultStyle }
  get mStyle() { return this.definition.meta.style }


  /**
 * return inputs required to display indicator legend on chart pane
 * @param {Array} [pos=this.chart.cursorPos] - optional
 * @returns {Object} - {inputs, colours, labels}
 */
  legendInputs(pos=this.chart.cursorPos) {
    if (this.range.dataLength == 0) return false

    const idx = super.Timeline.xPos2Index(pos[0])
    const index = limit(idx, 0, this.range.data.length - 1)
    const ohlcv = this.range.data[index]
    const theme = this.chart.theme.candle
    const colours = (ohlcv[4] >= ohlcv[1]) ?
    [this.mStyle.up.colour.value.slice(0,7)] :
    [this.mStyle.dn.colour.value.slice(0,7)];
    const inputs = {"V": this.scale.nicePrice(ohlcv[5])}
    return {inputs, colours}
  }

  // nothing to calculate
  calcIndicatorHistory() {

  }

  draw(range=this.range) {
    // no update required
    if (range.dataLength < 2 ) return false
    if (!this.mustUpdate()) return false

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
    const volH = Math.floor(zeroPos * this.mStyle.height.percent.value / 100)

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