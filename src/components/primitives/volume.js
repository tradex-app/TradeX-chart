// volume.js
// draws a single volume bar

import { defaultTheme } from "../../definitions/style"

export default class VolumeBar {

  constructor(scene, config) {
    this.scene = scene
    this.ctx = this.scene.context
    this.width = this.scene.width
    this.cfg = {...defaultTheme, ...config}
  }

  draw(data) {
    const ctx = this.ctx;
    const hilo = data.raw[4] >= data.raw[1];
    const barColour = hilo ? this.cfg.volume.UpColour: this.cfg.volume.DnColour

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