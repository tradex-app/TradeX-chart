// volume.js
// draws a single volume bar

import { defaultTheme } from "../../definitions/style"

export default class VolumeBar {

  constructor(scene, theme) {
    this.scene = scene
    this.ctx = this.scene.context
    this.width = this.scene.width
    this.cfg = ("volume" in theme) ? theme.volume : theme
  }

  draw(data) {
    const ctx = this.ctx;
    const hilo = data.raw[4] >= data.raw[1];
    const barColour = hilo ? this.cfg.UpColour: this.cfg.DnColour

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