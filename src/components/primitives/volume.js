// volume.js
// draws a single volume bar

import { VolumeStyle } from "../../definitions/style";


export default class VolumeBar {

  constructor(scene, config) {
    this.scene = scene
    this.ctx = this.scene.context
    this.width = this.scene.width
    this.cfg = config
    this.cfg.colourVolumeUp = this.cfg?.colourVolumeUp || VolumeStyle.COLOUR_VOLUME_UP
    this.cfg.colourVolumeDn = this.cfg?.colourVolumeDn || VolumeStyle.COLOUR_VOLUME_DN
  }

  draw(data) {
    const ctx = this.ctx;
    const hilo = data.raw[4] >= data.raw[1];
    const barColour = hilo ? this.cfg.colourVolumeDn : this.cfg.colourVolumeUp;
    const zeroPos = data.z;
    const maxPos = Math.floor((zeroPos * this.cfg.onchartVolumeH) / 100);

    ctx.save();
    ctx.strokeStyle = barColour;
    ctx.fillStyle = barColour;

    ctx.fillRect(
      Math.floor(data.x),
      Math.floor(data.z - data.h),
      Math.floor(data.w),
      Math.floor(data.h)
    );

    ctx.restore();

  }
  
}